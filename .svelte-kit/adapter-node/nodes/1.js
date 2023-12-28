

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.936d97be.js","_app/immutable/chunks/scheduler.58aff345.js","_app/immutable/chunks/index.fa3032d8.js","_app/immutable/chunks/stores.fbc9e431.js","_app/immutable/chunks/singletons.a4eac5ea.js"];
export const stylesheets = [];
export const fonts = [];
