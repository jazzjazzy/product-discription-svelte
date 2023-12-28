import * as server from '../entries/pages/(app)/(auth)/forgotten/_page.server.ts.js';

export const index = 5;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/(app)/(auth)/forgotten/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/(app)/(auth)/forgotten/+page.server.ts";
export const imports = ["_app/immutable/nodes/5.c0808264.js","_app/immutable/chunks/scheduler.f5bd93bf.js","_app/immutable/chunks/index.972eeafd.js"];
export const stylesheets = [];
export const fonts = [];
