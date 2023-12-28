import { c as create_ssr_component, b as add_attribute, e as escape } from "../../../../chunks/ssr.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  let { form } = $$props;
  let user = data.user;
  let passwordForm;
  let updateUserForm;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  if ($$props.form === void 0 && $$bindings.form && form !== void 0)
    $$bindings.form(form);
  return `<div class="container py-10 px-4 flex justify-center"><div class="w-1/2 grid gap-7"><card-main><card-header data-svelte-h="svelte-wkidl1"><h3>Profile</h3></card-header> <card-body><form method="post" action="?/updateUser"${add_attribute("this", updateUserForm, 0)}><div><label for="firstname" data-svelte-h="svelte-j8xuhq">First name</label> <div><input type="text" name="firstname" class="w-full"${add_attribute("value", user.firstname, 0)}></div></div> <div><label for="surname" data-svelte-h="svelte-vsg6vo">Surname</label> <div><input type="text" name="surname" class="w-full"${add_attribute("value", user.surname, 0)}></div></div> <div><label for="email" data-svelte-h="svelte-1p9d3fm">Email</label> <div><input type="email" name="email" class="w-full"${add_attribute("value", user.email, 0)}></div></div></form></card-body> <card-footer><button class="btn variant-filled-secondary" data-svelte-h="svelte-129siny">Upate Profile</button></card-footer></card-main> <card-main><card-header data-svelte-h="svelte-3qa5xp"><h3>Change Password</h3></card-header> <card-body>${form && form.status == 411 ? `<div role="alert"><div class="bg-red-500 text-white font-bold rounded-t px-4 py-2" data-svelte-h="svelte-cl3axs">Error Message</div> <div class="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700"><p>${escape(form.body?.error)}</p></div></div>` : ``} <form method="post" action="?/changePassword"${add_attribute("this", passwordForm, 0)} data-svelte-h="svelte-1i9e4kn"><div><label for="oldpassword">Current Password</label> <div class="w-full"><input type="password" name="oldpassword" class="w-full"></div></div> <div><label for="newpassword">New Password</label> <div><input type="password" name="newpassword" class="w-full"></div></div> <div><label for="confirmpassword">Confirm Password</label> <div><input type="password" name="confirmpassword" class="w-full"></div></div></form></card-body> <card-footer><button class="btn variant-filled-secondary" data-svelte-h="svelte-rxf2d">Change Password</button></card-footer></card-main> <card-main data-svelte-h="svelte-v2qxb2"><card-header><h3>Single Sign-in Account</h3></card-header> <card-body>Your current account is using Single Sign in see details below
				<div class="grid grid-cols-12 m-5 border border-green-500"><div class="col-span-1 p-5 bg-green-600">G</div> <div class="col-span-11 p-5">jsjazzau@gmail.com</div></div></card-body></card-main> <card-main data-svelte-h="svelte-3nujfz"><card-header><h3>Cancel Subscription</h3></card-header> <card-body>Once your account is deleted, all of its resources and data will be permanently deleted.
				Before deleting your account, please download any data or information that you wish to
				retain.</card-body> <card-footer><form method="post" action="?/cancelSub"><button type="submit" class="btn variant-filled-secondary">Cancel Subscription</button></form></card-footer></card-main> <card-main data-svelte-h="svelte-1bl0oxn"><card-header><h3>Delete Account</h3></card-header> <card-body>Once your account is deleted, all of its resources and data will be permanently deleted.
				Before deleting your account, please download any data or information that you wish to
				retain.</card-body> <card-footer><form method="post" action="?/deleteAccount"><button class="btn variant-filled-secondary">Delete Accoount</button></form></card-footer></card-main></div></div>`;
});
export {
  Page as default
};
