import { c as create_ssr_component, k as createEventDispatcher, e as escape, b as add_attribute, h as each, v as validate_component } from "../../../chunks/ssr.js";
import "../../../chunks/ProgressBar.svelte_svelte_type_style_lang.js";
import "../../../chunks/index.js";
const Table = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let classesBase;
  let classesTable;
  createEventDispatcher();
  let { source } = $$props;
  let { interactive = false } = $$props;
  let { element = "table" } = $$props;
  let { text = "" } = $$props;
  let { color = "" } = $$props;
  let { regionHead = "" } = $$props;
  let { regionHeadCell = "" } = $$props;
  let { regionBody = "" } = $$props;
  let { regionCell = "" } = $$props;
  let { regionFoot = "" } = $$props;
  let { regionFootCell = "" } = $$props;
  if ($$props.source === void 0 && $$bindings.source && source !== void 0)
    $$bindings.source(source);
  if ($$props.interactive === void 0 && $$bindings.interactive && interactive !== void 0)
    $$bindings.interactive(interactive);
  if ($$props.element === void 0 && $$bindings.element && element !== void 0)
    $$bindings.element(element);
  if ($$props.text === void 0 && $$bindings.text && text !== void 0)
    $$bindings.text(text);
  if ($$props.color === void 0 && $$bindings.color && color !== void 0)
    $$bindings.color(color);
  if ($$props.regionHead === void 0 && $$bindings.regionHead && regionHead !== void 0)
    $$bindings.regionHead(regionHead);
  if ($$props.regionHeadCell === void 0 && $$bindings.regionHeadCell && regionHeadCell !== void 0)
    $$bindings.regionHeadCell(regionHeadCell);
  if ($$props.regionBody === void 0 && $$bindings.regionBody && regionBody !== void 0)
    $$bindings.regionBody(regionBody);
  if ($$props.regionCell === void 0 && $$bindings.regionCell && regionCell !== void 0)
    $$bindings.regionCell(regionCell);
  if ($$props.regionFoot === void 0 && $$bindings.regionFoot && regionFoot !== void 0)
    $$bindings.regionFoot(regionFoot);
  if ($$props.regionFootCell === void 0 && $$bindings.regionFootCell && regionFootCell !== void 0)
    $$bindings.regionFootCell(regionFootCell);
  classesBase = `${$$props.class || ""}`;
  classesTable = `${element} ${text} ${color}`;
  return `<div class="${"table-container " + escape(classesBase, true)}">  <table class="${[escape(classesTable, true), interactive ? "table-interactive" : ""].join(" ").trim()}"${add_attribute("role", interactive ? "grid" : "table", 0)}>  <thead class="${"table-head " + escape(regionHead, true)}"><tr>${each(source.head, (heading) => {
    return `<th${add_attribute("class", regionHeadCell, 0)} role="columnheader"><!-- HTML_TAG_START -->${heading}<!-- HTML_TAG_END --></th>`;
  })}</tr></thead>  <tbody class="${"table-body " + escape(regionBody, true)}">${each(source.body, (row, rowIndex) => {
    return `  <tr${add_attribute("aria-rowindex", rowIndex + 1, 0)}>${each(row, (cell, cellIndex) => {
      return ` <td${add_attribute("class", regionCell, 0)} role="gridcell"${add_attribute("aria-colindex", cellIndex + 1, 0)}${add_attribute("tabindex", cellIndex === 0 && interactive ? 0 : -1, 0)}><!-- HTML_TAG_START -->${Number(cell) === 0 ? cell : cell ? cell : "-"}<!-- HTML_TAG_END --> </td>`;
    })} </tr>`;
  })}</tbody>  ${source.foot ? `<tfoot class="${"table-foot " + escape(regionFoot, true)}"><tr>${each(source.foot, (cell) => {
    return `<td${add_attribute("class", regionFootCell, 0)}><!-- HTML_TAG_START -->${cell}<!-- HTML_TAG_END --></td>`;
  })}</tr></tfoot>` : ``}</table></div>`;
});
const infoBlock_svelte_svelte_type_style_lang = "";
const css = {
  code: ".mainbox.svelte-1iis6k9{@apply w-full h-full border-4 border-purple-600 rounded-xl flex justify-center items-center;;box-shadow:5px 5px 5px 5px rgba(126, 115, 115, 0.25)}",
  map: null
};
const InfoBlock = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { title } = $$props;
  let { value } = $$props;
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.value === void 0 && $$bindings.value && value !== void 0)
    $$bindings.value(value);
  $$result.css.add(css);
  return `<div class="mainbox svelte-1iis6k9"><div class=""><h3 class="text-xl text-center"><!-- HTML_TAG_START -->${title}<!-- HTML_TAG_END --></h3> <div class="text-7xl text-emerald-700 text-center font-semibold">${escape(value)}</div></div> </div>`;
});
const TableUsers = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let tableSimple = {
    head: [
      "id",
      "firstname",
      "surname",
      "email",
      "role",
      "status",
      "created_at",
      "updated_at"
    ],
    body: [],
    meta: [],
    foot: []
  };
  return `${validate_component(Table, "Table").$$render($$result, { interactive: true, source: tableSimple }, {}, {})}`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  let selectedComponent = "users";
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  return `<div class="grid grid-cols-8"><div class="col-span-1 px-3"><button class="${"my-3 px-3 btn " + escape(
    "variant-filled-primary",
    true
  ) + " w-full"}">Users</button><br> <button class="${"my-3 px-3 btn " + escape(
    "variant-outline-primary",
    true
  ) + " w-full"}">Sessions</button><br> <button class="${"my-3 px-3 btn " + escape(
    "variant-outline-primary",
    true
  ) + " w-full"}">History</button><br> <button class="${"my-3 px-3 btn " + escape(
    "variant-outline-primary",
    true
  ) + " w-full"}">Pricing</button><br></div> <div class="col-span-7"><div class="cols-span-4 grid grid-cols-4 gap-4 w-full h-[200px]"><div class="col-span-1">${validate_component(InfoBlock, "InfoBlock").$$render(
    $$result,
    {
      title: "Currenly online",
      value: data.online
    },
    {},
    {}
  )}</div> <div class="col-span-1">${validate_component(InfoBlock, "InfoBlock").$$render(
    $$result,
    {
      title: "New User 7 days",
      value: data.usersSevenDays
    },
    {},
    {}
  )}</div> <div class="col-span-1">${validate_component(InfoBlock, "InfoBlock").$$render(
    $$result,
    {
      title: "New Today",
      value: data.usersToday
    },
    {},
    {}
  )}</div> <div class="col-span-1">${validate_component(InfoBlock, "InfoBlock").$$render(
    $$result,
    {
      title: "Generated description<br /> past 7 days",
      value: data.historySevenDays
    },
    {},
    {}
  )}</div></div> <div class="p-9"><h1 class="h2 p-3 uppercase">${escape(selectedComponent)}</h1> ${`${validate_component(TableUsers, "TableUsers").$$render($$result, {}, {}, {})}`}</div></div></div>`;
});
export {
  Page as default
};
