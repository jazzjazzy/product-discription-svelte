import { c as create_ssr_component, v as validate_component } from "../../../../../chunks/ssr.js";
import { C as Crud } from "../../../../../chunks/crud.js";
const title = "History";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  let history = data.history;
  let id = history.userId;
  const textareas = [
    `image_description`,
    `shop_description`,
    `product_description`,
    "generated_title",
    `generated_description`,
    `generated_keywords`
  ];
  const dates = ["created_at", "updated_at", "deleted_at"];
  const jsonStr = ["generated_json"];
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  return `${validate_component(Crud, "Crud").$$render(
    $$result,
    {
      rawData: history,
      jsonStr,
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
