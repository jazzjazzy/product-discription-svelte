import { c as create_ssr_component, e as escape, b as add_attribute, l as compute_slots, p as compute_rest_props, i as spread, q as escape_attribute_value, j as escape_object, s as setContext, g as getContext, v as validate_component } from "../../../../chunks/ssr.js";
import "../../../../chunks/ProgressBar.svelte_svelte_type_style_lang.js";
import "devalue";
import { I as Icon } from "../../../../chunks/Icon.js";
const cBase$3 = "flex flex-col";
const cRowMain = "grid items-center";
const cRowHeadline = "";
const cSlotLead = "flex-none flex justify-between items-center";
const cSlotDefault = "flex-auto";
const cSlotTrail = "flex-none flex items-center space-x-4";
const AppBar = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let classesBase;
  let classesRowMain;
  let classesRowHeadline;
  let classesSlotLead;
  let classesSlotDefault;
  let classesSlotTrail;
  let $$slots = compute_slots(slots);
  let { background = "bg-surface-100-800-token" } = $$props;
  let { border = "" } = $$props;
  let { padding = "p-4" } = $$props;
  let { shadow = "" } = $$props;
  let { spacing = "space-y-4" } = $$props;
  let { gridColumns = "grid-cols-[auto_1fr_auto]" } = $$props;
  let { gap = "gap-4" } = $$props;
  let { regionRowMain = "" } = $$props;
  let { regionRowHeadline = "" } = $$props;
  let { slotLead = "" } = $$props;
  let { slotDefault = "" } = $$props;
  let { slotTrail = "" } = $$props;
  let { label = "" } = $$props;
  let { labelledby = "" } = $$props;
  if ($$props.background === void 0 && $$bindings.background && background !== void 0)
    $$bindings.background(background);
  if ($$props.border === void 0 && $$bindings.border && border !== void 0)
    $$bindings.border(border);
  if ($$props.padding === void 0 && $$bindings.padding && padding !== void 0)
    $$bindings.padding(padding);
  if ($$props.shadow === void 0 && $$bindings.shadow && shadow !== void 0)
    $$bindings.shadow(shadow);
  if ($$props.spacing === void 0 && $$bindings.spacing && spacing !== void 0)
    $$bindings.spacing(spacing);
  if ($$props.gridColumns === void 0 && $$bindings.gridColumns && gridColumns !== void 0)
    $$bindings.gridColumns(gridColumns);
  if ($$props.gap === void 0 && $$bindings.gap && gap !== void 0)
    $$bindings.gap(gap);
  if ($$props.regionRowMain === void 0 && $$bindings.regionRowMain && regionRowMain !== void 0)
    $$bindings.regionRowMain(regionRowMain);
  if ($$props.regionRowHeadline === void 0 && $$bindings.regionRowHeadline && regionRowHeadline !== void 0)
    $$bindings.regionRowHeadline(regionRowHeadline);
  if ($$props.slotLead === void 0 && $$bindings.slotLead && slotLead !== void 0)
    $$bindings.slotLead(slotLead);
  if ($$props.slotDefault === void 0 && $$bindings.slotDefault && slotDefault !== void 0)
    $$bindings.slotDefault(slotDefault);
  if ($$props.slotTrail === void 0 && $$bindings.slotTrail && slotTrail !== void 0)
    $$bindings.slotTrail(slotTrail);
  if ($$props.label === void 0 && $$bindings.label && label !== void 0)
    $$bindings.label(label);
  if ($$props.labelledby === void 0 && $$bindings.labelledby && labelledby !== void 0)
    $$bindings.labelledby(labelledby);
  classesBase = `${cBase$3} ${background} ${border} ${spacing} ${padding} ${shadow} ${$$props.class ?? ""}`;
  classesRowMain = `${cRowMain} ${gridColumns} ${gap} ${regionRowMain}`;
  classesRowHeadline = `${cRowHeadline} ${regionRowHeadline}`;
  classesSlotLead = `${cSlotLead} ${slotLead}`;
  classesSlotDefault = `${cSlotDefault} ${slotDefault}`;
  classesSlotTrail = `${cSlotTrail} ${slotTrail}`;
  return `<div class="${"app-bar " + escape(classesBase, true)}" data-testid="app-bar" role="toolbar"${add_attribute("aria-label", label, 0)}${add_attribute("aria-labelledby", labelledby, 0)}> <div class="${"app-bar-row-main " + escape(classesRowMain, true)}"> ${$$slots.lead ? `<div class="${"app-bar-slot-lead " + escape(classesSlotLead, true)}">${slots.lead ? slots.lead({}) : ``}</div>` : ``}  <div class="${"app-bar-slot-default " + escape(classesSlotDefault, true)}">${slots.default ? slots.default({}) : ``}</div>  ${$$slots.trail ? `<div class="${"app-bar-slot-trail " + escape(classesSlotTrail, true)}">${slots.trail ? slots.trail({}) : ``}</div>` : ``}</div>  ${$$slots.headline ? `<div class="${"app-bar-row-headline " + escape(classesRowHeadline, true)}">${slots.headline ? slots.headline({}) : ``}</div>` : ``}</div>`;
});
const cBase$2 = "textarea relative flex justify-center items-center";
const cInput = "w-full absolute top-0 left-0 right-0 bottom-0 z-[1] opacity-0 disabled:!opacity-0 cursor-pointer";
const cInterface$1 = "flex justify-center items-center text-center";
const FileDropzone = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let classesBase;
  let classesInput;
  let classesInterface;
  let $$restProps = compute_rest_props($$props, [
    "files",
    "fileInput",
    "name",
    "border",
    "padding",
    "rounded",
    "regionInterface",
    "regionInterfaceText",
    "slotLead",
    "slotMessage",
    "slotMeta"
  ]);
  let $$slots = compute_slots(slots);
  let { files = void 0 } = $$props;
  let { fileInput = void 0 } = $$props;
  let { name } = $$props;
  let { border = "border-2 border-dashed" } = $$props;
  let { padding = "p-4 py-8" } = $$props;
  let { rounded = "rounded-container-token" } = $$props;
  let { regionInterface = "" } = $$props;
  let { regionInterfaceText = "" } = $$props;
  let { slotLead = "mb-4" } = $$props;
  let { slotMessage = "" } = $$props;
  let { slotMeta = "opacity-75" } = $$props;
  function prunedRestProps() {
    delete $$restProps.class;
    return $$restProps;
  }
  if ($$props.files === void 0 && $$bindings.files && files !== void 0)
    $$bindings.files(files);
  if ($$props.fileInput === void 0 && $$bindings.fileInput && fileInput !== void 0)
    $$bindings.fileInput(fileInput);
  if ($$props.name === void 0 && $$bindings.name && name !== void 0)
    $$bindings.name(name);
  if ($$props.border === void 0 && $$bindings.border && border !== void 0)
    $$bindings.border(border);
  if ($$props.padding === void 0 && $$bindings.padding && padding !== void 0)
    $$bindings.padding(padding);
  if ($$props.rounded === void 0 && $$bindings.rounded && rounded !== void 0)
    $$bindings.rounded(rounded);
  if ($$props.regionInterface === void 0 && $$bindings.regionInterface && regionInterface !== void 0)
    $$bindings.regionInterface(regionInterface);
  if ($$props.regionInterfaceText === void 0 && $$bindings.regionInterfaceText && regionInterfaceText !== void 0)
    $$bindings.regionInterfaceText(regionInterfaceText);
  if ($$props.slotLead === void 0 && $$bindings.slotLead && slotLead !== void 0)
    $$bindings.slotLead(slotLead);
  if ($$props.slotMessage === void 0 && $$bindings.slotMessage && slotMessage !== void 0)
    $$bindings.slotMessage(slotMessage);
  if ($$props.slotMeta === void 0 && $$bindings.slotMeta && slotMeta !== void 0)
    $$bindings.slotMeta(slotMeta);
  classesBase = `${cBase$2} ${border} ${padding} ${rounded} ${$$props.class ?? ""}`;
  classesInput = `${cInput}`;
  classesInterface = `${cInterface$1}`;
  return `<div class="${[
    "dropzone " + escape(classesBase, true),
    $$restProps.disabled ? "opacity-50" : ""
  ].join(" ").trim()}" data-testid="file-dropzone">  <input${spread(
    [
      { type: "file" },
      { name: escape_attribute_value(name) },
      {
        class: "dropzone-input " + escape(classesInput, true)
      },
      escape_object(prunedRestProps())
    ],
    {}
  )}>  <div class="${"dropzone-interface " + escape(classesInterface, true) + " " + escape(regionInterface, true)}"><div class="${"dropzone-interface-text " + escape(regionInterfaceText, true)}"> ${$$slots.lead ? `<div class="${"dropzone-lead " + escape(slotLead, true)}">${slots.lead ? slots.lead({}) : ``}</div>` : ``}  <div class="${"dropzone-message " + escape(slotMessage, true)}">${slots.message ? slots.message({}) : `<strong data-svelte-h="svelte-13uz6lq">Upload a file</strong> or drag and drop`}</div>  ${$$slots.meta ? `<small class="${"dropzone-meta " + escape(slotMeta, true)}">${slots.meta ? slots.meta({}) : ``}</small>` : ``}</div></div></div>`;
});
const cBase$1 = "space-y-4";
const cList = "flex overflow-x-auto hide-scrollbar";
const cPanel = "";
const TabGroup = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let classesBase;
  let classesList;
  let classesPanel;
  let $$slots = compute_slots(slots);
  let { justify = "justify-start" } = $$props;
  let { border = "border-b border-surface-400-500-token" } = $$props;
  let { active = "border-b-2 border-surface-900-50-token" } = $$props;
  let { hover = "hover:variant-soft" } = $$props;
  let { flex = "flex-none" } = $$props;
  let { padding = "px-4 py-2" } = $$props;
  let { rounded = "rounded-tl-container-token rounded-tr-container-token" } = $$props;
  let { spacing = "space-y-1" } = $$props;
  let { regionList = "" } = $$props;
  let { regionPanel = "" } = $$props;
  let { labelledby = "" } = $$props;
  let { panel = "" } = $$props;
  setContext("active", active);
  setContext("hover", hover);
  setContext("flex", flex);
  setContext("padding", padding);
  setContext("rounded", rounded);
  setContext("spacing", spacing);
  if ($$props.justify === void 0 && $$bindings.justify && justify !== void 0)
    $$bindings.justify(justify);
  if ($$props.border === void 0 && $$bindings.border && border !== void 0)
    $$bindings.border(border);
  if ($$props.active === void 0 && $$bindings.active && active !== void 0)
    $$bindings.active(active);
  if ($$props.hover === void 0 && $$bindings.hover && hover !== void 0)
    $$bindings.hover(hover);
  if ($$props.flex === void 0 && $$bindings.flex && flex !== void 0)
    $$bindings.flex(flex);
  if ($$props.padding === void 0 && $$bindings.padding && padding !== void 0)
    $$bindings.padding(padding);
  if ($$props.rounded === void 0 && $$bindings.rounded && rounded !== void 0)
    $$bindings.rounded(rounded);
  if ($$props.spacing === void 0 && $$bindings.spacing && spacing !== void 0)
    $$bindings.spacing(spacing);
  if ($$props.regionList === void 0 && $$bindings.regionList && regionList !== void 0)
    $$bindings.regionList(regionList);
  if ($$props.regionPanel === void 0 && $$bindings.regionPanel && regionPanel !== void 0)
    $$bindings.regionPanel(regionPanel);
  if ($$props.labelledby === void 0 && $$bindings.labelledby && labelledby !== void 0)
    $$bindings.labelledby(labelledby);
  if ($$props.panel === void 0 && $$bindings.panel && panel !== void 0)
    $$bindings.panel(panel);
  classesBase = `${cBase$1} ${$$props.class ?? ""}`;
  classesList = `${cList} ${justify} ${border} ${regionList}`;
  classesPanel = `${cPanel} ${regionPanel}`;
  return `  <div class="${"tab-group " + escape(classesBase, true)}" data-testid="tab-group"> <div class="${"tab-list " + escape(classesList, true)}" role="tablist"${add_attribute("aria-labelledby", labelledby, 0)}>${slots.default ? slots.default({}) : ``}</div>  ${$$slots.panel ? `<div class="${"tab-panel " + escape(classesPanel, true)}" role="tabpanel"${add_attribute("aria-labelledby", panel, 0)} tabindex="0">${slots.panel ? slots.panel({}) : ``}</div>` : ``}</div>`;
});
const cBase = "text-center cursor-pointer transition-colors duration-100";
const cInterface = "";
const Tab = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let selected;
  let classesActive;
  let classesBase;
  let classesInterface;
  let classesTab;
  let $$restProps = compute_rest_props($$props, [
    "group",
    "name",
    "value",
    "title",
    "controls",
    "regionTab",
    "active",
    "hover",
    "flex",
    "padding",
    "rounded",
    "spacing"
  ]);
  let $$slots = compute_slots(slots);
  let { group } = $$props;
  let { name } = $$props;
  let { value } = $$props;
  let { title = "" } = $$props;
  let { controls = "" } = $$props;
  let { regionTab = "" } = $$props;
  let { active = getContext("active") } = $$props;
  let { hover = getContext("hover") } = $$props;
  let { flex = getContext("flex") } = $$props;
  let { padding = getContext("padding") } = $$props;
  let { rounded = getContext("rounded") } = $$props;
  let { spacing = getContext("spacing") } = $$props;
  let elemInput;
  function prunedRestProps() {
    delete $$restProps.class;
    return $$restProps;
  }
  if ($$props.group === void 0 && $$bindings.group && group !== void 0)
    $$bindings.group(group);
  if ($$props.name === void 0 && $$bindings.name && name !== void 0)
    $$bindings.name(name);
  if ($$props.value === void 0 && $$bindings.value && value !== void 0)
    $$bindings.value(value);
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.controls === void 0 && $$bindings.controls && controls !== void 0)
    $$bindings.controls(controls);
  if ($$props.regionTab === void 0 && $$bindings.regionTab && regionTab !== void 0)
    $$bindings.regionTab(regionTab);
  if ($$props.active === void 0 && $$bindings.active && active !== void 0)
    $$bindings.active(active);
  if ($$props.hover === void 0 && $$bindings.hover && hover !== void 0)
    $$bindings.hover(hover);
  if ($$props.flex === void 0 && $$bindings.flex && flex !== void 0)
    $$bindings.flex(flex);
  if ($$props.padding === void 0 && $$bindings.padding && padding !== void 0)
    $$bindings.padding(padding);
  if ($$props.rounded === void 0 && $$bindings.rounded && rounded !== void 0)
    $$bindings.rounded(rounded);
  if ($$props.spacing === void 0 && $$bindings.spacing && spacing !== void 0)
    $$bindings.spacing(spacing);
  selected = value === group;
  classesActive = selected ? active : hover;
  classesBase = `${cBase} ${flex} ${padding} ${rounded} ${classesActive} ${$$props.class ?? ""}`;
  classesInterface = `${cInterface} ${spacing}`;
  classesTab = `${regionTab}`;
  return `<label${add_attribute("class", classesBase, 0)}${add_attribute("title", title, 0)}> <div class="${"tab " + escape(classesTab, true)}" data-testid="tab" role="tab"${add_attribute("aria-controls", controls, 0)}${add_attribute("aria-selected", selected, 0)}${add_attribute("tabindex", selected ? 0 : -1, 0)}> <div class="h-0 w-0 overflow-hidden"><input${spread(
    [
      { type: "radio" },
      { name: escape_attribute_value(name) },
      { value: escape_attribute_value(value) },
      escape_object(prunedRestProps()),
      { tabindex: "-1" }
    ],
    {}
  )}${add_attribute("this", elemInput, 0)}${value === group ? add_attribute("checked", true, 1) : ""}></div>  <div class="${"tab-interface " + escape(classesInterface, true)}">${$$slots.lead ? `<div class="tab-lead">${slots.lead ? slots.lead({}) : ``}</div>` : ``} <div class="tab-label">${slots.default ? slots.default({}) : ``}</div></div></div></label>`;
});
const InputProduct = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { productDescription: productDescription2 = "" } = $$props;
  if ($$props.productDescription === void 0 && $$bindings.productDescription && productDescription2 !== void 0)
    $$bindings.productDescription(productDescription2);
  return `<div class="card p-3 mt-3"><div class="card-header pt-0 px-0"><h3 class="pl-3 pb-2 font-semibold text-lg">Product Description
			<span class="w-2 cursor-pointer">${validate_component(Icon, "Icon").$$render($$result, { icon: "octicon:info-24", class: "inline" }, {}, {})}</span> <div class="card p-4 w-72 shadow-xl" data-popup="popupProductInfo" data-svelte-h="svelte-mfpc7j"><div class="py-3"><h4>Discribe the Product</h4></div> <div class="text-sm">In your description, focus on highlighting the finer details captured in the image that
					might not be immediately evident. This includes specifying the materials used in the
					product, which can give insights into its quality and texture. For example, if it&#39;s a
					wooden item, mention the type of wood and its finish; for a fabric product, describe the
					fabric type and feel. Additionally, provide accurate measurements or size information to
					help visualize the actual scale of the product. Such details are essential as they offer a
					more comprehensive understanding of the product, beyond what is visible in the image. They
					play a crucial role in setting the right expectations and attracting the right audience
					who appreciates these nuances.</div></div></h3></div> <div class="card-body"><textarea placeholder="Discribe the product in the image here..." class="w-full h-36 p-1 bg-gray-200 border-gray-300 focus:border-gray-400 focus:outline-0 focus:ring-1 rounded-xl">${escape(productDescription2 || "")}</textarea></div></div>`;
});
const InputStore = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { storeDescription: storeDescription2 = "" } = $$props;
  if ($$props.storeDescription === void 0 && $$bindings.storeDescription && storeDescription2 !== void 0)
    $$bindings.storeDescription(storeDescription2);
  return `<div class="card p-3"><div class="card-header pt-0 px-0"><h3 class="pl-3 pb-2 font-semibold text-lg">Shop Description
            <span class="w-2 cursor-pointer">${validate_component(Icon, "Icon").$$render($$result, { icon: "octicon:info-24", class: "inline" }, {}, {})}</span> <div class="arrow card p-4 w-72 shadow-xl" data-popup="popupShopInfo" data-svelte-h="svelte-rp6zqo"><div class="py-3"><h4>Discribe your shop</h4></div> <div class="text-sm">Provide a detailed description of what your shop offers, including the types
                    of products available. The more information you include, the better we can
                    tailor the description to appeal to your target audience. Be sure to mention
                    unique aspects that aren&#39;t immediately apparent just by looking at the
                    products.</div></div></h3></div> <div class="card-body"><textarea placeholder="Discribe your shop and what you sell here..." class="w-full h-36 p-1 bg-gray-200 border-gray-300 focus:border-gray-400 focus:outline-0 focus:ring-1 rounded-xl">${escape(storeDescription2 || "")}</textarea></div></div>`;
});
const TempSlider = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { temperature: temperature2 = 0.1 } = $$props;
  if ($$props.temperature === void 0 && $$bindings.temperature && temperature2 !== void 0)
    $$bindings.temperature(temperature2);
  return `<div class="grid grid-cols-2" data-svelte-h="svelte-1w5ekgb"><div class="col-span-1">Basic</div> <div class="col-span-1 text-right">Creative</div></div> <input type="range" min="0.0" max="1.0" step="0.1"${add_attribute("value", temperature2, 0)}> <p>Slider value: ${escape(temperature2.toFixed(1))}</p>`;
});
const TextSizeSlider = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { charatorCount: charatorCount2 = 500 } = $$props;
  if ($$props.charatorCount === void 0 && $$bindings.charatorCount && charatorCount2 !== void 0)
    $$bindings.charatorCount(charatorCount2);
  return `<div class="grid grid-cols-2" data-svelte-h="svelte-53gs0g"><div class="col-span-1">Small</div> <div class="col-span-1 text-right">Large</div></div> <input type="range" min="500" max="3000" step="100"${add_attribute("value", charatorCount2, 0)}> <p>Slider value: ${escape(charatorCount2.toFixed(1))}</p>`;
});
const CopyContentToClipBoard = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { element } = $$props;
  if ($$props.element === void 0 && $$bindings.element && element !== void 0)
    $$bindings.element(element);
  return `${`<div><button>${validate_component(Icon, "Icon").$$render(
    $$result,
    {
      icon: "ph:clipboard-text-fill",
      class: "text-2xl"
    },
    {},
    {}
  )}</button></div>`}`;
});
const ResultTitle = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { isEditable = false } = $$props;
  let { divTitle } = $$props;
  let { pageTitle = "" } = $$props;
  let { pageTitleCount = 0 } = $$props;
  if ($$props.isEditable === void 0 && $$bindings.isEditable && isEditable !== void 0)
    $$bindings.isEditable(isEditable);
  if ($$props.divTitle === void 0 && $$bindings.divTitle && divTitle !== void 0)
    $$bindings.divTitle(divTitle);
  if ($$props.pageTitle === void 0 && $$bindings.pageTitle && pageTitle !== void 0)
    $$bindings.pageTitle(pageTitle);
  if ($$props.pageTitleCount === void 0 && $$bindings.pageTitleCount && pageTitleCount !== void 0)
    $$bindings.pageTitleCount(pageTitleCount);
  return `${validate_component(AppBar, "AppBar").$$render(
    $$result,
    {
      padding: "0",
      gridColumns: "grid-cols-2",
      slotDefault: "place-self-left",
      slotTrail: "place-content-end"
    },
    {},
    {
      trail: () => {
        return `${isEditable ? `${validate_component(CopyContentToClipBoard, "CopyContentToClipBoard").$$render($$result, { element: "pageTitle" }, {}, {})}` : ``} `;
      },
      default: () => {
        return `<h2 class="flex justify-start text-2xl" data-svelte-h="svelte-3ft38l">Title</h2>`;
      }
    }
  )} <h1><div class="w-full p-3"${add_attribute("contenteditable", isEditable, 0)} data-type="title" data-clipboard="pageTitle"${add_attribute("this", divTitle, 0)}><!-- HTML_TAG_START -->${pageTitle}<!-- HTML_TAG_END --></div></h1> <div class="text-xs float-right text-red-500">${pageTitleCount > 0 ? `${escape(pageTitleCount)}` : ``}</div>`;
});
function newlineToBreak(text) {
  return text.replace(/\n/g, "<br>");
}
const ResultsDescription = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { isEditable = false } = $$props;
  let { divDescription } = $$props;
  let { pageDescription = "" } = $$props;
  let { pageDescriptionCount = 0 } = $$props;
  if ($$props.isEditable === void 0 && $$bindings.isEditable && isEditable !== void 0)
    $$bindings.isEditable(isEditable);
  if ($$props.divDescription === void 0 && $$bindings.divDescription && divDescription !== void 0)
    $$bindings.divDescription(divDescription);
  if ($$props.pageDescription === void 0 && $$bindings.pageDescription && pageDescription !== void 0)
    $$bindings.pageDescription(pageDescription);
  if ($$props.pageDescriptionCount === void 0 && $$bindings.pageDescriptionCount && pageDescriptionCount !== void 0)
    $$bindings.pageDescriptionCount(pageDescriptionCount);
  return `${validate_component(AppBar, "AppBar").$$render(
    $$result,
    {
      padding: "0",
      gridColumns: "grid-cols-2",
      slotDefault: "place-self-left",
      slotTrail: "place-content-end"
    },
    {},
    {
      trail: () => {
        return `${isEditable ? `${validate_component(CopyContentToClipBoard, "CopyContentToClipBoard").$$render($$result, { element: "pageDescription" }, {}, {})}` : ``} `;
      },
      default: () => {
        return `<h2 class="flex justify-start text-2xl" data-svelte-h="svelte-1gmitvh">Description</h2>`;
      }
    }
  )} <div class="w-full p-3"${add_attribute("contenteditable", isEditable, 0)} data-type="description" data-clipboard="pageDescription"${add_attribute("this", divDescription, 0)}><!-- HTML_TAG_START -->${newlineToBreak(pageDescription)}<!-- HTML_TAG_END --></div> <div class="text-xs float-right text-red-500">${pageDescriptionCount > 0 ? `<!-- HTML_TAG_START -->${pageDescriptionCount}<!-- HTML_TAG_END -->` : ``}</div>`;
});
const ResultKeywords = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { isEditable = false } = $$props;
  let { divKeywords } = $$props;
  let { pageKeywords = "" } = $$props;
  let { clearKeywords = "" } = $$props;
  if ($$props.isEditable === void 0 && $$bindings.isEditable && isEditable !== void 0)
    $$bindings.isEditable(isEditable);
  if ($$props.divKeywords === void 0 && $$bindings.divKeywords && divKeywords !== void 0)
    $$bindings.divKeywords(divKeywords);
  if ($$props.pageKeywords === void 0 && $$bindings.pageKeywords && pageKeywords !== void 0)
    $$bindings.pageKeywords(pageKeywords);
  if ($$props.clearKeywords === void 0 && $$bindings.clearKeywords && clearKeywords !== void 0)
    $$bindings.clearKeywords(clearKeywords);
  return `${validate_component(AppBar, "AppBar").$$render(
    $$result,
    {
      padding: "0",
      gridColumns: "grid-cols-2",
      slotDefault: "place-self-left",
      slotTrail: "place-content-end"
    },
    {},
    {
      trail: () => {
        return `${isEditable ? `${validate_component(CopyContentToClipBoard, "CopyContentToClipBoard").$$render($$result, { element: "pageKeywords" }, {}, {})}` : ``} `;
      },
      default: () => {
        return `<h2 class="flex justify-start text-2xl" data-svelte-h="svelte-3warvj">Keywords</h2>`;
      }
    }
  )} <div class="w-full p-3"${add_attribute("contenteditable", isEditable, 0)}${add_attribute("this", divKeywords, 0)}><!-- HTML_TAG_START -->${pageKeywords}<!-- HTML_TAG_END --></div> <div class="hidden" data-clipboard="pageKeywords"><!-- HTML_TAG_START -->${clearKeywords}<!-- HTML_TAG_END --></div>`;
});
const ResultJson = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { isEditable = true } = $$props;
  let { pageJson = "" } = $$props;
  if ($$props.isEditable === void 0 && $$bindings.isEditable && isEditable !== void 0)
    $$bindings.isEditable(isEditable);
  if ($$props.pageJson === void 0 && $$bindings.pageJson && pageJson !== void 0)
    $$bindings.pageJson(pageJson);
  return `${validate_component(AppBar, "AppBar").$$render(
    $$result,
    {
      padding: "0",
      gridColumns: "grid-cols-2",
      slotDefault: "place-self-left",
      slotTrail: "place-content-end"
    },
    {},
    {
      trail: () => {
        return `${isEditable ? `${validate_component(CopyContentToClipBoard, "CopyContentToClipBoard").$$render($$result, { element: "pageJson" }, {}, {})}` : ``} `;
      },
      default: () => {
        return `<h2 class="flex justify-start text-2xl" data-svelte-h="svelte-12hvrra">Json output</h2>`;
      }
    }
  )} <div class="w-full p-3"><pre id="json" data-clipboard="pageJson"><!-- HTML_TAG_START -->${pageJson}<!-- HTML_TAG_END --></pre></div>`;
});
const _page_svelte_svelte_type_style_lang = "";
const css = {
  code: "card-title.svelte-swcwyd,card-description.svelte-swcwyd,card-keywords.svelte-swcwyd,card-json.svelte-swcwyd{display:block;border:1px solid #ccc;@apply m-3 overflow-y-auto p-3;;& h3 {\n			@apply text-2xl;\n		};& h1 {\n			@apply text-4xl;\n		};& h2 {\n			@apply flex justify-start;\n		};& div {\n			@apply h-64 overflow-y-auto;\n		}}",
  map: null
};
let temperature = 0.2;
let charatorCount = 500;
let productDescription = "This is a dice tower with an inbuilt tray made from cherry wood and lined with a blue felt";
let storeDescription = "we are a store that sells equipment for board games, dice games and role-playing games, we sell dice towers and dice trays hand-made from exotic wood species ";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  let { form } = $$props;
  data.session;
  let success = false;
  let message = "";
  let imageUrl = "IMG_5150.jpeg";
  let tabSet = 0;
  let pageDescription = "";
  let divDescription;
  let pageTitle = "";
  let pageTitleCount = 0;
  let divTitle;
  let pageKeywords = "";
  let pageDescriptionCount = 0;
  let divKeywords;
  let pageJson = "";
  let isEditable = false;
  let buttonString = "Write Copy";
  let clearKeywords = "";
  let imageIsUpload = false;
  function handleImageTab(isUpload) {
    if (imageUrl) {
      tabSet = 2;
      imageIsUpload = isUpload;
    }
  }
  if (form) {
    let { success: statusform, message: messageform } = form;
    if (statusform) {
      imageUrl = messageform;
      handleImageTab(true);
    }
    success = statusform;
    message = messageform;
  }
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  if ($$props.form === void 0 && $$bindings.form && form !== void 0)
    $$bindings.form(form);
  $$result.css.add(css);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    $$rendered = `<main class="main"><div class="px-7"><div class="card"><div class="card-header p-6 mb-6 border-b-orange-500 border-b-2" data-svelte-h="svelte-1odvfpe"><h1 class="text-4xl">Esty Assistant</h1></div> <div class="cardbody px-5"><div class="grid gap-4 grid-cols-2"><div class="col-span-1">${validate_component(TabGroup, "TabGroup").$$render($$result, {}, {}, {
      panel: () => {
        return `${tabSet === 0 ? `<form id="uploadForm" action="?/upload" method="post" enctype="multipart/form-data"><div class="h-72">${validate_component(FileDropzone, "FileDropzone").$$render(
          $$result,
          {
            name: "file",
            class: "flex justify-center min-h-full"
          },
          {},
          {
            meta: () => {
              return `Upload an image that requires a discription to be generated
													${!success && message ? `<div class="bg-warning-700 text-red-700">${escape(message)}</div>` : ``} `;
            },
            message: () => {
              return `Image Requiring Description`;
            },
            lead: () => {
              return `<div class="w-full flex justify-center">${validate_component(Icon, "Icon").$$render(
                $$result,
                {
                  icon: "formkit:upload",
                  class: "text-4xl"
                },
                {},
                {}
              )}</div>`;
            }
          }
        )}</div></form>` : `${tabSet === 1 ? `<div class="h-72"><div class="card backdrop flex py-2 border-2 border-black h-full w-full items-center justify-center"><div class="card-body my-7 mx-3 w-full"><div class="w-full flex my-5 justify-center">${validate_component(Icon, "Icon").$$render($$result, { icon: "formkit:link", class: "text-4xl" }, {}, {})}</div> <div class="w-full text-center text-md" data-svelte-h="svelte-1azuyn9">Image Requiring Description</div> <div class="w-full text-center text-xs mt-1" data-svelte-h="svelte-ezepvm">link to an image that requires a discription to be generated</div> <input type="text" class="w-full mt-3 px-3 rounded-lg border-sky-100 border-black" placeholder="https:// Enter image url"${add_attribute("value", imageUrl, 0)}><br></div></div></div>` : `${tabSet === 2 ? `${imageUrl !== "" ? `${imageIsUpload ? `<img src="${"/uploads/" + escape(imageUrl, true)}" alt="original">` : `${imageUrl.includes("http") ? `<img${add_attribute("src", imageUrl, 0)} alt="original">` : ``}`}` : ``}` : ``}`}`} `;
      },
      default: () => {
        return `${validate_component(Tab, "Tab").$$render(
          $$result,
          { name: "tab1", value: 0, group: tabSet },
          {
            group: ($$value) => {
              tabSet = $$value;
              $$settled = false;
            }
          },
          {
            default: () => {
              return `<span><div class="w-full flex justify-center">${validate_component(Icon, "Icon").$$render(
                $$result,
                {
                  icon: "formkit:upload",
                  class: "text-4xl"
                },
                {},
                {}
              )}</div></span> <span data-svelte-h="svelte-1brphr3">Upload</span>`;
            }
          }
        )} ${validate_component(Tab, "Tab").$$render(
          $$result,
          { name: "tab2", value: 1, group: tabSet },
          {
            group: ($$value) => {
              tabSet = $$value;
              $$settled = false;
            }
          },
          {
            default: () => {
              return `<span><div class="w-full flex justify-center">${validate_component(Icon, "Icon").$$render(
                $$result,
                {
                  icon: "formkit:link",
                  class: "text-4xl flex alert-actions"
                },
                {},
                {}
              )}</div></span> <span data-svelte-h="svelte-aiw6h6">Link</span>`;
            }
          }
        )} ${imageUrl !== "" ? `${validate_component(Tab, "Tab").$$render(
          $$result,
          { name: "tab3", value: 2, group: tabSet },
          {
            group: ($$value) => {
              tabSet = $$value;
              $$settled = false;
            }
          },
          {
            default: () => {
              return `<span><div class="w-full flex justify-center">${validate_component(Icon, "Icon").$$render(
                $$result,
                {
                  icon: "mdi:image",
                  class: "text-4xl flex alert-actions"
                },
                {},
                {}
              )}</div></span> <span data-svelte-h="svelte-1hlc515">Image</span>`;
            }
          }
        )}` : ``}`;
      }
    })}</div> <div class="col-span-1">${validate_component(InputStore, "InputStore").$$render($$result, { storeDescription }, {}, {})} ${validate_component(InputProduct, "InputProduct").$$render($$result, { productDescription }, {}, {})} <div class="grid grid-cols-2"><div class="col-span-1 p-3 slider-container">${validate_component(TempSlider, "TemperatureSlider").$$render($$result, { temperature }, {}, {})}</div> <div class="col-span-1 p-3 slider-container">${validate_component(TextSizeSlider, "TextSizeSlider").$$render($$result, { charatorCount }, {}, {})}</div></div></div></div> <div class="w-full"><div class="flex justify-center"><button class="btn variant-filled my-2 w-4/6 text-fuchsia-400">${escape(buttonString)} ${``}</button></div> <card-title class="svelte-swcwyd">${validate_component(ResultTitle, "ResultsTitle").$$render(
      $$result,
      {
        isEditable,
        divTitle,
        pageTitle,
        pageTitleCount
      },
      {},
      {}
    )}</card-title> <card-description class="svelte-swcwyd">${validate_component(ResultsDescription, "ResultsDescription").$$render(
      $$result,
      {
        isEditable,
        divDescription,
        pageDescription,
        pageDescriptionCount
      },
      {},
      {}
    )}</card-description> <card-keywords class="svelte-swcwyd">${validate_component(ResultKeywords, "ResultsKeywords").$$render(
      $$result,
      {
        isEditable,
        divKeywords,
        pageKeywords,
        clearKeywords
      },
      {},
      {}
    )}</card-keywords> <card-json class="svelte-swcwyd">${validate_component(ResultJson, "ResultsJson").$$render($$result, { isEditable, pageJson }, {}, {})}</card-json></div></div></div></div> </main>`;
  } while (!$$settled);
  return $$rendered;
});
export {
  Page as default
};
