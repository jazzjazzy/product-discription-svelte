export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.png","uploads/20230719_160934.jpg","uploads/il_794xN.3637980128_73dg (1).avif","uploads/il_794xN.3637980128_73dg (1).jpg","uploads/il_794xN.3637980128_73dg.avif","uploads/il_794xN.3637980128_73dg.jpg","uploads/replicate-prediction-6qhrjibb7qp26o7xb3azup7exe.jpg","uploads/replicate-prediction-6qhrjibb7qp26o7xb3azup7exe.png","uploads/replicate-prediction-cvwrbhtbsr34eahe23d2wgjjza.jpg","uploads/replicate-prediction-cvwrbhtbsr34eahe23d2wgjjza.png","uploads/replicate-prediction-xbqpz6lbilovwkt47wrn2fykim.jpg","uploads/replicate-prediction-xbqpz6lbilovwkt47wrn2fykim.png","uploads/replicate-prediction-xkybitlb3ozxks7yodr65nvbjq.jpg","uploads/replicate-prediction-xkybitlb3ozxks7yodr65nvbjq.png"]),
	mimeTypes: {".png":"image/png",".jpg":"image/jpeg",".avif":"image/avif"},
	_: {
		client: {"start":"_app/immutable/entry/start.8ad9bd78.js","app":"_app/immutable/entry/app.317b73ba.js","imports":["_app/immutable/entry/start.8ad9bd78.js","_app/immutable/chunks/scheduler.58aff345.js","_app/immutable/chunks/singletons.a4eac5ea.js","_app/immutable/chunks/parse.bee59afc.js","_app/immutable/entry/app.317b73ba.js","_app/immutable/chunks/scheduler.58aff345.js","_app/immutable/chunks/index.fa3032d8.js"],"stylesheets":[],"fonts":[]},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js'))
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			},
			{
				id: "/api/replicate/image/discriptor",
				pattern: /^\/api\/replicate\/image\/discriptor\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/api/replicate/image/discriptor/_server.ts.js'))
			},
			{
				id: "/api/replicate/image/etsy",
				pattern: /^\/api\/replicate\/image\/etsy\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/api/replicate/image/etsy/_server.ts.js'))
			},
			{
				id: "/api/replicate/minigpt4",
				pattern: /^\/api\/replicate\/minigpt4\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/api/replicate/minigpt4/_server.ts.js'))
			}
		],
		matchers: async () => {
			
			return {  };
		}
	}
}
})();

export const prerendered = new Set([]);
