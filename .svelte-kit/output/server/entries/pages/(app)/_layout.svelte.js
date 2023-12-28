import { c as create_ssr_component } from "../../../chunks/ssr.js";
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<div class="pt-3 px-3 md:px-16 lg:px-16 xl:px-96">${slots.default ? slots.default({}) : ``}</div>`;
});
export {
  Layout as default
};
