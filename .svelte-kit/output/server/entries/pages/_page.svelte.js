import { c as create_ssr_component, b as add_attribute } from "../../chunks/ssr.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  return `<div class="container py-10 px-4 w-2/3"><div class="grid grid-cols-2"><div class="col-span-1 content" data-svelte-h="svelte-16ob8u"><h1 class="text-5xl font-bold text-gray-900">Boost Your Sales with Compelling Product Descriptions</h1> <p class="text-gray-600">Craft persuasive product descriptions that captivate your customers and drive sales.</p></div> <div class="col-span-1"><img src="/images/pexels-kampus-production-7289707.jpg"${add_attribute("alt", data.title, 0)} class="w-full h-full object-cover object-center"></div></div></div>`;
});
export {
  Page as default
};
