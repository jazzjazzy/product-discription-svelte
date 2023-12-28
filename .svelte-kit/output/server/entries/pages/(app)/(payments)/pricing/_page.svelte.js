import { c as create_ssr_component, e as escape, h as each, v as validate_component } from "../../../../../chunks/ssr.js";
import { I as Icon } from "../../../../../chunks/Icon.js";
const _page_svelte_svelte_type_style_lang = "";
const css = {
  code: ".active.svelte-8jvazv{border:4px solid rgb(177, 144, 95);box-shadow:10px 10px 10px 10px rgba(126, 115, 115, 0.25)}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  let prices = data.prices;
  let currSubscription = data.currSubscription;
  let loggedIn = !!data.userId;
  let columns = 1;
  if (!!prices && prices.length > 1) {
    columns = prices.length;
  }
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  $$result.css.add(css);
  return `<div class="${"grid grid-cols-1 lg:grid-cols-" + escape(columns, true) + " gap-5 svelte-8jvazv"}">${!!prices ? `${each(prices, (price) => {
    return `<div class="col-span-1 border border-spacing-5"><card-main class="${["svelte-8jvazv", currSubscription == price.name ? "active" : ""].join(" ").trim()}"><card-header><h1 class="text-xl md:text-2xl lg:text-4xl w-full">${escape(price.name)}</h1> <h3 class="flex justify-center text-3xl sm:text-5-xl lg:text-6xl w-full pl-6"><div><span class="pr-2">$${escape(price.price)}</span><span class="text-lg pl-0" data-svelte-h="svelte-157z3f4">a month</span></div> </h3></card-header> <card-body><div class="py-3">${escape(price.description)}</div> ${each(JSON.parse(price.list), (listItem) => {
      return `<div class="py-3 font-bold"><div>${validate_component(Icon, "Icon").$$render(
        $$result,
        {
          icon: "heroicons-solid:thumb-up",
          class: "inline"
        },
        {},
        {}
      )}<span class="pl-2 h-full text-center">${escape(listItem)}</span></div> </div>`;
    })}</card-body> <card-footer class="flex justify-center"> ${currSubscription && loggedIn ? `${currSubscription == price.name ? ` <div class="border-4 border-x-orange-500 text-primary-900 p-3 rounded-lg" data-svelte-h="svelte-b5gkc2">Current Subscription
								</div>` : ` <a data-sveltekit-reload href="${"/checkout/payment?subtype=" + escape(currSubscription.toLocaleLowerCase(), true) + "&update=" + escape(price.name, true)}" class="btn variant-ringed-primary rounded-lg">Change to ${escape(price.name)}</a>`}` : `${!loggedIn ? ` <a href="/regisitor" class="btn variant-ringed-primary rounded-lg" data-svelte-h="svelte-qpqygy">Register</a>` : ` <a data-sveltekit-reload href="${"/checkout/payment?subtype=" + escape(price.name.toLocaleLowerCase(), true)}" class="btn variant-ringed-primary rounded-lg">Purchase ${escape(price.name)}</a>`}`} </card-footer></card-main> </div>`;
  })}` : `<card-main class="inline-block" data-svelte-h="svelte-1dc955s"><card-header><h1 class="text-3xl inline-grid">No prices found</h1></card-header> <card-body>There are no prices for this product.</card-body></card-main>`} </div>`;
});
export {
  Page as default
};
