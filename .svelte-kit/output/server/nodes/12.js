import * as server from '../entries/pages/(app)/dashboard/_page.server.ts.js';

export const index = 12;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/(app)/dashboard/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/(app)/dashboard/+page.server.ts";
export const imports = ["_app/immutable/nodes/12.b87f07ff.js","_app/immutable/chunks/scheduler.f5bd93bf.js","_app/immutable/chunks/index.972eeafd.js","_app/immutable/chunks/ProgressBar.svelte_svelte_type_style_lang.8c991845.js","_app/immutable/chunks/index.b26b719a.js","_app/immutable/chunks/Icon.5e5edd52.js","_app/immutable/chunks/parse.bee59afc.js","_app/immutable/chunks/singletons.4f4ecd92.js","_app/immutable/chunks/paths.c7e26ca7.js","_app/immutable/chunks/popup.71b02c70.js"];
export const stylesheets = ["_app/immutable/assets/12.df106bcf.css","_app/immutable/assets/ProgressBar.4f1e9ba5.css"];
export const fonts = [];
