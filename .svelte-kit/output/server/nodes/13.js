import * as server from '../entries/pages/(app)/profile/_page.server.ts.js';

export const index = 13;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/(app)/profile/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/(app)/profile/+page.server.ts";
export const imports = ["_app/immutable/nodes/13.00224f8d.js","_app/immutable/chunks/scheduler.f5bd93bf.js","_app/immutable/chunks/index.972eeafd.js"];
export const stylesheets = [];
export const fonts = [];
