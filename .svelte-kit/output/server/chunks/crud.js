import { c as create_ssr_component, e as escape, h as each, b as add_attribute } from "./ssr.js";
function formatDateForInputField(isoDateString) {
  const date = new Date(isoDateString);
  return date.toISOString().split("T")[0];
}
function formatTimeForInputField(isoDateString) {
  const time = new Date(isoDateString);
  return time.toISOString().split("T")[1].substring(0, 5);
}
const Crud = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { rawData = {} } = $$props;
  let { id = {} } = $$props;
  let { textareas = [] } = $$props;
  let { dates = [] } = $$props;
  let { jsonStr = [] } = $$props;
  let { title = "Title" } = $$props;
  const entries = Object.entries(rawData);
  if ($$props.rawData === void 0 && $$bindings.rawData && rawData !== void 0)
    $$bindings.rawData(rawData);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  if ($$props.textareas === void 0 && $$bindings.textareas && textareas !== void 0)
    $$bindings.textareas(textareas);
  if ($$props.dates === void 0 && $$bindings.dates && dates !== void 0)
    $$bindings.dates(dates);
  if ($$props.jsonStr === void 0 && $$bindings.jsonStr && jsonStr !== void 0)
    $$bindings.jsonStr(jsonStr);
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  return ` <div class="pt-16 px-3 md:px-16 lg:px-16 xl:px-[32rem]"><card-main><card-header><h2 class="h2">${escape(title)}</h2></card-header> <form method="post"><section class="px-12">${each(entries, ([key, value]) => {
    return `<div class="py-4"><label class="h4 pb-3 uppercase"${add_attribute("for", key, 0)}>${escape(key)}</label> ${typeof value == "string" ? `${textareas.includes(key) ? `<textarea class="w-full h-32"${add_attribute("name", key, 0)}${add_attribute("id", key, 0)}>${escape(value, false)}</textarea>` : `<input class="w-full" type="text"${add_attribute("name", key, 0)}${add_attribute("id", key, 0)}${add_attribute("value", value, 0)}>`}` : ``} ${typeof value == "number" ? `<input class="w-full" type="number"${add_attribute("name", key, 0)}${add_attribute("id", key, 0)}${add_attribute("value", value, 0)} step="any">` : ``} ${typeof value == "boolean" ? `<input class="w-full" type="checkbox"${add_attribute("name", key, 0)}${add_attribute("id", key, 0)}${add_attribute("value", value, 0)}>` : ``} ${typeof value == "object" ? `${dates.includes(key) ? `<div class="grid grid-cols-2"><div class="col-span-1"><input class="w-full" type="date"${add_attribute("id", `date_${key}`, 0)}${add_attribute("name", `date_${key}`, 0)}${add_attribute("value", formatDateForInputField(value), 0)}></div> <div class="col-span-1"><input class="w-1/2" type="time"${add_attribute("id", `time_${key}`, 0)}${add_attribute("name", `time_${key}`, 0)}${add_attribute("value", formatTimeForInputField(value), 0)}></div> </div>` : `${jsonStr.includes(key) ? `<textarea class="w-full h-32"${add_attribute("name", key, 0)}${add_attribute("id", key, 0)}>${escape(JSON.stringify(value, null, 2), false)}</textarea>` : `<input class="w-full" type="text"${add_attribute("name", key, 0)}${add_attribute("id", key, 0)}${add_attribute("value", value, 0)}>`}`}` : ``} </div>`;
  })}</section> <card-footer>${id ? `<button class="btn variant-ghost-primary m-3" id="btn-update" formaction="?/update" data-svelte-h="svelte-qy9ibe">Update</button> <button class="btn variant-ghost-error m-3" id="btn-delete" formaction="?/delete" data-svelte-h="svelte-nwc2d4">Delete</button> <button class="btn variant-ghost-warning m-3" id="btn-cancel" data-svelte-h="svelte-145k2fj">Cancel</button>` : `<button class="btn variant-ghost-primary m-3" id="btn-save" formaction="?/create" data-svelte-h="svelte-p2eefb">Update</button> <button class="btn variant-ghost-warning m-3" id="btn-cancel" data-svelte-h="svelte-145k2fj">Cancel</button>`}</card-footer></form></card-main></div> `;
});
export {
  Crud as C
};
