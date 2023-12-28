import * as server from '../entries/pages/admin/history/__id__/_page.server.ts.js';

export const index = 15;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/admin/history/__id__/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/admin/history/[[id]]/+page.server.ts";
export const imports = ["_app/immutable/nodes/15.0983c8f6.js","_app/immutable/chunks/scheduler.f5bd93bf.js","_app/immutable/chunks/index.972eeafd.js","_app/immutable/chunks/crud.8cfe1856.js","_app/immutable/chunks/each.e59479a4.js"];
export const stylesheets = [];
export const fonts = [];
