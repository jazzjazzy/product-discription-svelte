import * as server from '../entries/pages/admin/session/__id__/_page.server.ts.js';

export const index = 17;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/admin/session/__id__/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/admin/session/[[id]]/+page.server.ts";
export const imports = ["_app/immutable/nodes/17.5cdc5a66.js","_app/immutable/chunks/scheduler.f5bd93bf.js","_app/immutable/chunks/index.972eeafd.js","_app/immutable/chunks/crud.8cfe1856.js","_app/immutable/chunks/each.e59479a4.js"];
export const stylesheets = [];
export const fonts = [];
