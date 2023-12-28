

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export const imports = ["_app/immutable/nodes/0.361df7d5.js","_app/immutable/chunks/scheduler.58aff345.js","_app/immutable/chunks/index.fa3032d8.js"];
export const stylesheets = ["_app/immutable/assets/0.8e91c9d0.css"];
export const fonts = [];
