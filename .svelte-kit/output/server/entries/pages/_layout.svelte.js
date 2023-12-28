import { c as create_ssr_component, v as validate_component } from "../../chunks/ssr.js";
import { computePosition, autoUpdate, offset, shift, flip, arrow } from "@floating-ui/dom";
import { w as writable } from "../../chunks/index2.js";
import "../../chunks/ProgressBar.svelte_svelte_type_style_lang.js";
const app$1 = "";
const app = "";
const storePopup = writable(void 0);
const Nav = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  return `<nav><div class="grid grid-cols-3 border-2 mb-4 bg-white"><div class="col-span-1 flex place-content-start p-4"><div class="font-sans"> <div class="btn-lg inline-block" data-svelte-h="svelte-1d8ts14"><a href="/dashboard"><div class="text-2xl">Dashboard</div></a></div> <div class="btn-lg inline-block" data-svelte-h="svelte-86hbww"><a href="/pricing"><div class="text-2xl">Pricing</div></a></div> ${data.role === "ADMIN" || data.role === "GOD" ? `<div class="btn-lg inline-block" data-svelte-h="svelte-ylltza"><a href="/admin"><div class="text-2xl">Admin</div></a></div>` : ``}</div></div> <div class="col-span-1 text-5xl text-center m-auto align-middle font-semibold" data-svelte-h="svelte-1rby79p"><a href="/">Dis<span class="text-7xl line- text-red-500">.</span>scription</a></div> <div class="col-span-1 flex place-content-end p-4"><div class="font-sans">${data.userId == null ? `<div class="inline-block" data-svelte-h="svelte-1hd45eq"><a href="/login"><div class="btn-lg variant-filled">Login</div></a></div> <div class="inline-block" data-svelte-h="svelte-srs8rl"><a href="/regisitor"><div class="btn-lg variant-filled">Sign-up</div></a></div>` : `<form method="post" action="/login?/signout" class="inline-block" data-svelte-h="svelte-1rcqavb"><button type="submit" class="btn-lg variant-filled">Logout</button></form> <div class="inline-block" data-svelte-h="svelte-nmz2xa"><a href="/profile"><div class="btn-lg variant-filled">Profile</div></a></div>`}</div></div></div></nav>`;
});
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  storePopup.set({
    computePosition,
    autoUpdate,
    offset,
    shift,
    flip,
    arrow
  });
  let { data } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  return `<content>${validate_component(Nav, "Nav").$$render($$result, { data }, {}, {})} <container>${slots.default ? slots.default({}) : ``}</container></content>`;
});
export {
  Layout as default
};
