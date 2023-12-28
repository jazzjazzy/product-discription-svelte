

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/(app)/_layout.svelte.js')).default;
export const imports = ["_app/immutable/nodes/2.dbc5a2a3.js","_app/immutable/chunks/scheduler.f5bd93bf.js","_app/immutable/chunks/index.972eeafd.js"];
export const stylesheets = [];
export const fonts = [];
