import { c as create_ssr_component, b as add_attribute } from "../../../../../chunks/ssr.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  let { form } = $$props;
  let loginForm;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  if ($$props.form === void 0 && $$bindings.form && form !== void 0)
    $$bindings.form(form);
  return `<div class="container flex justify-center"><card-main class="w-1/2"><card-header data-svelte-h="svelte-1goxfgc"><h1>Loggin</h1></card-header> ${data?.userId == null ? `<form method="post" action="?/signin"${add_attribute("this", loginForm, 0)}><card-body><div class="px-10"><label class="label text-xl py-1"><span data-svelte-h="svelte-1bg9cgq">Email</span> <input class="input variant-form-material p-6" type="email" name="email"${add_attribute("value", form?.email || "", 0)} placeholder="email"></label></div> <div class="px-10" data-svelte-h="svelte-1o1e7aj"><label class="label text-xl py-8"><span>Password</span> <input class="input variant-form-material p-6" type="password" name="password" id="id" placeholder="password"></label></div> ${form?.message ? `<p class="p-3 input-error warning" data-svelte-h="svelte-ou9v3n">Invalid user email or password, please confirm and try again</p>` : ``}</card-body> <card-footer class="px-0"><div class="grid grid-cols-2 px-10"><div class="col-span-1" data-svelte-h="svelte-374enl"><a href="/login/google">Sign in with google</a><br> <a href="/login/facebook">Sign in with facebook</a></div> <div class="col-span-1 flex justify-end"><button type="submit" class="btn-lg variant-filled-primary border" data-svelte-h="svelte-mtbzul">Log-in</button> <button type="button" class="btn-lg variant-outline-primary border" data-svelte-h="svelte-1eq8cel">Cancel</button></div></div></card-footer></form>` : `<form method="post" action="?/signout" data-svelte-h="svelte-1rxcd2g"><button type="submit" class="border">logout</button></form>`}</card-main></div>`;
});
export {
  Page as default
};
