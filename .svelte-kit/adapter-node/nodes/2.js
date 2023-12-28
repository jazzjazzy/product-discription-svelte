import * as server from '../entries/pages/_page.server.ts.js';

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/+page.server.ts";
export const imports = ["_app/immutable/nodes/2.e4c47a43.js","_app/immutable/chunks/scheduler.58aff345.js","_app/immutable/chunks/index.fa3032d8.js","_app/immutable/chunks/singletons.a4eac5ea.js","_app/immutable/chunks/parse.bee59afc.js","_app/immutable/chunks/stores.fbc9e431.js"];
export const stylesheets = ["_app/immutable/assets/2.f120f77f.css"];
export const fonts = [];
