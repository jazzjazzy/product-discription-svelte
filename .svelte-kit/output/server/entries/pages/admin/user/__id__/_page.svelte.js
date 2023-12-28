import { c as create_ssr_component, v as validate_component } from "../../../../../chunks/ssr.js";
import { C as Crud } from "../../../../../chunks/crud.js";
const title = "User";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  let user = data.user;
  let id = data.userId;
  const textareas = ["description", "list"];
  const dates = ["created_at", "updated_at", "deleted_at"];
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  return `${validate_component(Crud, "Crud").$$render(
    $$result,
    {
      rawData: user,
      id,
      textareas,
      dates,
      title
    },
    {},
    {}
  )}`;
});
export {
  Page as default
};
