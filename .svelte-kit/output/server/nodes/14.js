import * as server from '../entries/pages/admin/_page.server.ts.js';

export const index = 14;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/admin/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/admin/+page.server.ts";
export const imports = ["_app/immutable/nodes/14.d5d72cf9.js","_app/immutable/chunks/scheduler.f5bd93bf.js","_app/immutable/chunks/index.972eeafd.js","_app/immutable/chunks/ProgressBar.svelte_svelte_type_style_lang.8c991845.js","_app/immutable/chunks/index.b26b719a.js","_app/immutable/chunks/each.e59479a4.js"];
export const stylesheets = ["_app/immutable/assets/14.ea6950e1.css","_app/immutable/assets/ProgressBar.4f1e9ba5.css"];
export const fonts = [];
