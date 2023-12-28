

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.49e7614a.js","_app/immutable/chunks/scheduler.f5bd93bf.js","_app/immutable/chunks/index.972eeafd.js","_app/immutable/chunks/singletons.4f4ecd92.js","_app/immutable/chunks/index.b26b719a.js","_app/immutable/chunks/paths.c7e26ca7.js"];
export const stylesheets = [];
export const fonts = [];
