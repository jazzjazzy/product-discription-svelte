import { O as OPENAI_API_KEY } from "../../../../../../chunks/private.js";
import OpenAI from "openai";
import { createParser } from "eventsource-parser";
import { customAlphabet } from "nanoid/non-secure";
function createEventStreamTransformer(customParser) {
  const textDecoder = new TextDecoder();
  let eventSourceParser;
  return new TransformStream({
    async start(controller) {
      eventSourceParser = createParser(
        (event) => {
          if ("data" in event && event.type === "event" && event.data === "[DONE]" || // Replicate doesn't send [DONE] but does send a 'done' event
          // @see https://replicate.com/docs/streaming
          event.event === "done") {
            controller.terminate();
            return;
          }
          if ("data" in event) {
            const parsedMessage = customParser ? customParser(event.data) : event.data;
            if (parsedMessage)
              controller.enqueue(parsedMessage);
          }
        }
      );
    },
    transform(chunk) {
      eventSourceParser.feed(textDecoder.decode(chunk));
    }
  });
}
function createCallbacksTransformer(cb) {
  const textEncoder = new TextEncoder();
  let aggregatedResponse = "";
  const callbacks = cb || {};
  return new TransformStream({
    async start() {
      if (callbacks.onStart)
        await callbacks.onStart();
    },
    async transform(message, controller) {
      controller.enqueue(textEncoder.encode(message));
      if (callbacks.onToken)
        await callbacks.onToken(message);
      if (callbacks.onCompletion)
        aggregatedResponse += message;
    },
    async flush() {
      const isOpenAICallbacks = isOfTypeOpenAIStreamCallbacks(callbacks);
      if (callbacks.onCompletion) {
        await callbacks.onCompletion(aggregatedResponse);
      }
      if (callbacks.onFinal && !isOpenAICallbacks) {
        await callbacks.onFinal(aggregatedResponse);
      }
    }
  });
}
function isOfTypeOpenAIStreamCallbacks(callbacks) {
  return "experimental_onFunctionCall" in callbacks;
}
function trimStartOfStreamHelper() {
  let isStreamStart = true;
  return (text) => {
    if (isStreamStart) {
      text = text.trimStart();
      if (text)
        isStreamStart = false;
    }
    return text;
  };
}
function AIStream(response, customParser, callbacks) {
  if (!response.ok) {
    if (response.body) {
      const reader = response.body.getReader();
      return new ReadableStream({
        async start(controller) {
          const { done, value } = await reader.read();
          if (!done) {
            const errorText = new TextDecoder().decode(value);
            controller.error(new Error(`Response error: ${errorText}`));
          }
        }
      });
    } else {
      return new ReadableStream({
        start(controller) {
          controller.error(new Error("Response error: No response body"));
        }
      });
    }
  }
  const responseBodyStream = response.body || createEmptyReadableStream();
  return responseBodyStream.pipeThrough(createEventStreamTransformer(customParser)).pipeThrough(createCallbacksTransformer(callbacks));
}
function createEmptyReadableStream() {
  return new ReadableStream({
    start(controller) {
      controller.close();
    }
  });
}
function readableFromAsyncIterable(iterable) {
  let it = iterable[Symbol.asyncIterator]();
  return new ReadableStream({
    async pull(controller) {
      const { done, value } = await it.next();
      if (done)
        controller.close();
      else
        controller.enqueue(value);
    },
    async cancel(reason) {
      var _a;
      await ((_a = it.return) == null ? void 0 : _a.call(it, reason));
    }
  });
}
customAlphabet(
  "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
  7
);
function createChunkDecoder(complex) {
  const decoder = new TextDecoder();
  if (!complex) {
    return function(chunk) {
      if (!chunk)
        return "";
      return decoder.decode(chunk, { stream: true });
    };
  }
  return function(chunk) {
    const decoded = decoder.decode(chunk, { stream: true }).split("\n");
    return decoded.map(getStreamStringTypeAndValue).filter(Boolean);
  };
}
var StreamStringPrefixes = {
  text: 0,
  function_call: 1,
  data: 2
  // user_err: 3?
};
var getStreamString = (type, value) => `${StreamStringPrefixes[type]}:${JSON.stringify(value)}
`;
var getStreamStringTypeAndValue = (line) => {
  const firstSeperatorIndex = line.indexOf(":");
  const prefix = line.slice(0, firstSeperatorIndex);
  const type = Object.keys(StreamStringPrefixes).find(
    (key2) => StreamStringPrefixes[key2] === Number(prefix)
  );
  const val = line.slice(firstSeperatorIndex + 1);
  let parsedVal = val;
  if (!val) {
    return { type, value: "" };
  }
  try {
    parsedVal = JSON.parse(val);
  } catch (e) {
    console.error("Failed to parse JSON value:", val);
  }
  return { type, value: parsedVal };
};
var COMPLEX_HEADER = "X-Experimental-Stream-Data";
function createStreamDataTransformer(experimental_streamData) {
  if (!experimental_streamData) {
    return new TransformStream({
      transform: async (chunk, controller) => {
        controller.enqueue(chunk);
      }
    });
  }
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();
  return new TransformStream({
    transform: async (chunk, controller) => {
      const message = decoder.decode(chunk);
      controller.enqueue(encoder.encode(getStreamString("text", message)));
    }
  });
}
function parseOpenAIStream() {
  const extract = chunkToText();
  return (data) => {
    return extract(JSON.parse(data));
  };
}
async function* streamable(stream) {
  const extract = chunkToText();
  for await (const chunk of stream) {
    const text = extract(chunk);
    if (text)
      yield text;
  }
}
function chunkToText() {
  const trimStartOfStream = trimStartOfStreamHelper();
  let isFunctionStreamingIn;
  return (json) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j;
    if (isChatCompletionChunk(json) && ((_c = (_b = (_a = json.choices[0]) == null ? void 0 : _a.delta) == null ? void 0 : _b.function_call) == null ? void 0 : _c.name)) {
      isFunctionStreamingIn = true;
      return `{"function_call": {"name": "${(_e = (_d = json.choices[0]) == null ? void 0 : _d.delta) == null ? void 0 : _e.function_call.name}", "arguments": "`;
    } else if (isChatCompletionChunk(json) && ((_h = (_g = (_f = json.choices[0]) == null ? void 0 : _f.delta) == null ? void 0 : _g.function_call) == null ? void 0 : _h.arguments)) {
      const argumentChunk = json.choices[0].delta.function_call.arguments;
      let escapedPartialJson = argumentChunk.replace(/\\/g, "\\\\").replace(/\//g, "\\/").replace(/"/g, '\\"').replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/\t/g, "\\t").replace(/\f/g, "\\f");
      return `${escapedPartialJson}`;
    } else if (isFunctionStreamingIn && (((_i = json.choices[0]) == null ? void 0 : _i.finish_reason) === "function_call" || ((_j = json.choices[0]) == null ? void 0 : _j.finish_reason) === "stop")) {
      isFunctionStreamingIn = false;
      return '"}}';
    }
    const text = trimStartOfStream(
      isChatCompletionChunk(json) && json.choices[0].delta.content ? json.choices[0].delta.content : isCompletion(json) ? json.choices[0].text : ""
    );
    return text;
  };
}
var __internal__OpenAIFnMessagesSymbol = Symbol("internal_openai_fn_messages");
function isChatCompletionChunk(data) {
  return "choices" in data && data.choices && data.choices[0] && "delta" in data.choices[0];
}
function isCompletion(data) {
  return "choices" in data && data.choices && data.choices[0] && "text" in data.choices[0];
}
function OpenAIStream(res, callbacks) {
  const cb = callbacks;
  let stream;
  if (Symbol.asyncIterator in res) {
    stream = readableFromAsyncIterable(streamable(res)).pipeThrough(
      createCallbacksTransformer(
        (cb == null ? void 0 : cb.experimental_onFunctionCall) ? {
          ...cb,
          onFinal: void 0
        } : {
          ...cb
        }
      )
    );
  } else {
    stream = AIStream(
      res,
      parseOpenAIStream(),
      (cb == null ? void 0 : cb.experimental_onFunctionCall) ? {
        ...cb,
        onFinal: void 0
      } : {
        ...cb
      }
    );
  }
  if (cb && cb.experimental_onFunctionCall) {
    const functionCallTransformer = createFunctionCallTransformer(cb);
    return stream.pipeThrough(functionCallTransformer);
  } else {
    return stream.pipeThrough(
      createStreamDataTransformer(cb == null ? void 0 : cb.experimental_streamData)
    );
  }
}
function createFunctionCallTransformer(callbacks) {
  const textEncoder = new TextEncoder();
  let isFirstChunk = true;
  let aggregatedResponse = "";
  let aggregatedFinalCompletionResponse = "";
  let isFunctionStreamingIn = false;
  let functionCallMessages = callbacks[__internal__OpenAIFnMessagesSymbol] || [];
  const isComplexMode = callbacks == null ? void 0 : callbacks.experimental_streamData;
  const decode = createChunkDecoder();
  return new TransformStream({
    async transform(chunk, controller) {
      const message = decode(chunk);
      aggregatedFinalCompletionResponse += message;
      const shouldHandleAsFunction = isFirstChunk && message.startsWith('{"function_call":');
      if (shouldHandleAsFunction) {
        isFunctionStreamingIn = true;
        aggregatedResponse += message;
        isFirstChunk = false;
        return;
      }
      if (!isFunctionStreamingIn) {
        controller.enqueue(
          isComplexMode ? textEncoder.encode(getStreamString("text", message)) : chunk
        );
        return;
      } else {
        aggregatedResponse += message;
      }
    },
    async flush(controller) {
      try {
        const isEndOfFunction = !isFirstChunk && callbacks.experimental_onFunctionCall && isFunctionStreamingIn;
        if (isEndOfFunction && callbacks.experimental_onFunctionCall) {
          isFunctionStreamingIn = false;
          const payload = JSON.parse(aggregatedResponse);
          const argumentsPayload = JSON.parse(payload.function_call.arguments);
          let newFunctionCallMessages = [
            ...functionCallMessages
          ];
          const functionResponse = await callbacks.experimental_onFunctionCall(
            {
              name: payload.function_call.name,
              arguments: argumentsPayload
            },
            (result) => {
              newFunctionCallMessages = [
                ...functionCallMessages,
                {
                  role: "assistant",
                  content: "",
                  function_call: payload.function_call
                },
                {
                  role: "function",
                  name: payload.function_call.name,
                  content: JSON.stringify(result)
                }
              ];
              return newFunctionCallMessages;
            }
          );
          if (!functionResponse) {
            controller.enqueue(
              textEncoder.encode(
                isComplexMode ? getStreamString("function_call", aggregatedResponse) : aggregatedResponse
              )
            );
            return;
          } else if (typeof functionResponse === "string") {
            controller.enqueue(
              isComplexMode ? textEncoder.encode(getStreamString("text", functionResponse)) : textEncoder.encode(functionResponse)
            );
            return;
          }
          const filteredCallbacks = {
            ...callbacks,
            onStart: void 0
          };
          callbacks.onFinal = void 0;
          const openAIStream = OpenAIStream(functionResponse, {
            ...filteredCallbacks,
            [__internal__OpenAIFnMessagesSymbol]: newFunctionCallMessages
          });
          const reader = openAIStream.getReader();
          while (true) {
            const { done, value } = await reader.read();
            if (done) {
              break;
            }
            controller.enqueue(value);
          }
        }
      } finally {
        if (callbacks.onFinal && aggregatedFinalCompletionResponse) {
          await callbacks.onFinal(aggregatedFinalCompletionResponse);
        }
      }
    }
  });
}
var StreamingTextResponse = class extends Response {
  constructor(res, init, data) {
    let processedStream = res;
    if (data) {
      processedStream = res.pipeThrough(data.stream);
    }
    super(processedStream, {
      ...init,
      status: 200,
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        [COMPLEX_HEADER]: data ? "true" : "false",
        ...init == null ? void 0 : init.headers
      }
    });
  }
};
new TextDecoder("utf-8");
const key = OPENAI_API_KEY;
async function POST({ request }) {
  const { imageDescription, productDescription, storeDescription } = await request.json();
  let messages = [
    {
      "role": "system",
      "content": "you are a professional Esty copie writer, writing a 500-word description of an image of a product discribed there store is discribed as " + storeDescription + " you are writing a description of the discribed product used to help a seller. from the description created write a title for etsy of 140 charaters but the first 50 should be about product, images, photography and design as well generate 13 keywords in a  comma-separate list and return the a title, a description and keyword \n\nTitle:Description:Keywords:"
    },
    {
      "role": "user",
      "content": "write me a 500 word Etsy description using this description of the image" + imageDescription + " and this description of the product" + productDescription
    }
  ];
  const openai = new OpenAI({
    apiKey: key
  });
  const response = await openai.chat.completions.create({
    model: "gpt-4",
    stream: true,
    messages
  });
  const stream = OpenAIStream(response);
  return new StreamingTextResponse(stream);
}
export {
  POST
};
