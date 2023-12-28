import * as server from '../entries/pages/admin/pricing/__id__/_page.server.ts.js';

export const index = 16;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/admin/pricing/__id__/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/admin/pricing/[[id]]/+page.server.ts";
export const imports = ["_app/immutable/nodes/16.1d6b81e0.js","_app/immutable/chunks/scheduler.f5bd93bf.js","_app/immutable/chunks/index.972eeafd.js","_app/immutable/chunks/crud.8cfe1856.js","_app/immutable/chunks/each.e59479a4.js"];
export const stylesheets = [];
export const fonts = [];
