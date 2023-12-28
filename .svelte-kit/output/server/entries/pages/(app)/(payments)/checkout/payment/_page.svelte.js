import { c as create_ssr_component } from "../../../../../../chunks/ssr.js";
import "@stripe/stripe-js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  let elements;
  console.log("element", elements);
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    $$rendered = `  <div class="flex flex-col"><h1 class="w-full" data-svelte-h="svelte-3m3tji">Payment</h1> <div class="w-full">${`Loading Stripe...`}</div></div>`;
  } while (!$$settled);
  return $$rendered;
});
export {
  Page as default
};
