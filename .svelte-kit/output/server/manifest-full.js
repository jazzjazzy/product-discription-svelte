export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.png","images/pexels-kampus-production-7289707.jpg","uploads/20221017_123529.jpg","uploads/20230719_160934.jpg","uploads/Etsy_logo.svg.jpg","uploads/Etsy_logo.svg.png","uploads/IMG_5150.jpeg","uploads/angle-dice.JPG","uploads/angle-side-by-side.JPG","uploads/il_75x75.5448494428_m3ww.avif","uploads/il_75x75.5448494428_m3ww.jpg","uploads/il_794xN.3637980128_73dg (1).avif","uploads/il_794xN.3637980128_73dg (1).jpg","uploads/il_794xN.3637980128_73dg.avif","uploads/il_794xN.3637980128_73dg.jpg","uploads/main-dice.JPG","uploads/replicate-prediction-6qhrjibb7qp26o7xb3azup7exe.jpg","uploads/replicate-prediction-6qhrjibb7qp26o7xb3azup7exe.png","uploads/replicate-prediction-cvwrbhtbsr34eahe23d2wgjjza.jpg","uploads/replicate-prediction-cvwrbhtbsr34eahe23d2wgjjza.png","uploads/replicate-prediction-xbqpz6lbilovwkt47wrn2fykim.jpg","uploads/replicate-prediction-xbqpz6lbilovwkt47wrn2fykim.png","uploads/replicate-prediction-xkybitlb3ozxks7yodr65nvbjq.jpg","uploads/replicate-prediction-xkybitlb3ozxks7yodr65nvbjq.png"]),
	mimeTypes: {".png":"image/png",".jpg":"image/jpeg",".jpeg":"image/jpeg",".JPG":"image/jpeg",".avif":"image/avif"},
	_: {
		client: {"start":"_app/immutable/entry/start.610f7dbe.js","app":"_app/immutable/entry/app.514b6fba.js","imports":["_app/immutable/entry/start.610f7dbe.js","_app/immutable/chunks/scheduler.f5bd93bf.js","_app/immutable/chunks/singletons.4f4ecd92.js","_app/immutable/chunks/index.b26b719a.js","_app/immutable/chunks/paths.c7e26ca7.js","_app/immutable/chunks/parse.bee59afc.js","_app/immutable/entry/app.514b6fba.js","_app/immutable/chunks/scheduler.f5bd93bf.js","_app/immutable/chunks/index.972eeafd.js"],"stylesheets":[],"fonts":[]},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js')),
			__memo(() => import('./nodes/3.js')),
			__memo(() => import('./nodes/4.js')),
			__memo(() => import('./nodes/5.js')),
			__memo(() => import('./nodes/6.js')),
			__memo(() => import('./nodes/7.js')),
			__memo(() => import('./nodes/8.js')),
			__memo(() => import('./nodes/9.js')),
			__memo(() => import('./nodes/10.js')),
			__memo(() => import('./nodes/11.js')),
			__memo(() => import('./nodes/12.js')),
			__memo(() => import('./nodes/13.js')),
			__memo(() => import('./nodes/14.js')),
			__memo(() => import('./nodes/15.js')),
			__memo(() => import('./nodes/16.js')),
			__memo(() => import('./nodes/17.js')),
			__memo(() => import('./nodes/18.js'))
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 4 },
				endpoint: null
			},
			{
				id: "/admin",
				pattern: /^\/admin\/?$/,
				params: [],
				page: { layouts: [0,3,], errors: [1,,], leaf: 14 },
				endpoint: null
			},
			{
				id: "/admin/history/[[id]]",
				pattern: /^\/admin\/history(?:\/([^/]+))?\/?$/,
				params: [{"name":"id","optional":true,"rest":false,"chained":true}],
				page: { layouts: [0,3,], errors: [1,,], leaf: 15 },
				endpoint: null
			},
			{
				id: "/admin/pricing/[[id]]",
				pattern: /^\/admin\/pricing(?:\/([^/]+))?\/?$/,
				params: [{"name":"id","optional":true,"rest":false,"chained":true}],
				page: { layouts: [0,3,], errors: [1,,], leaf: 16 },
				endpoint: null
			},
			{
				id: "/admin/session/[[id]]",
				pattern: /^\/admin\/session(?:\/([^/]+))?\/?$/,
				params: [{"name":"id","optional":true,"rest":false,"chained":true}],
				page: { layouts: [0,3,], errors: [1,,], leaf: 17 },
				endpoint: null
			},
			{
				id: "/admin/user/[[id]]",
				pattern: /^\/admin\/user(?:\/([^/]+))?\/?$/,
				params: [{"name":"id","optional":true,"rest":false,"chained":true}],
				page: { layouts: [0,3,], errors: [1,,], leaf: 18 },
				endpoint: null
			},
			{
				id: "/api/admin/history",
				pattern: /^\/api\/admin\/history\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/api/admin/history/_server.ts.js'))
			},
			{
				id: "/api/admin/pricing",
				pattern: /^\/api\/admin\/pricing\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/api/admin/pricing/_server.ts.js'))
			},
			{
				id: "/api/admin/sessions",
				pattern: /^\/api\/admin\/sessions\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/api/admin/sessions/_server.ts.js'))
			},
			{
				id: "/api/admin/users",
				pattern: /^\/api\/admin\/users\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/api/admin/users/_server.ts.js'))
			},
			{
				id: "/api/discriptor",
				pattern: /^\/api\/discriptor\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/api/discriptor/_server.ts.js'))
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
			},
			{
				id: "/(app)/(payments)/checkout",
				pattern: /^\/checkout\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 8 },
				endpoint: null
			},
			{
				id: "/(app)/(payments)/checkout/complete",
				pattern: /^\/checkout\/complete\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 9 },
				endpoint: null
			},
			{
				id: "/(app)/(payments)/checkout/payment",
				pattern: /^\/checkout\/payment\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 10 },
				endpoint: null
			},
			{
				id: "/(app)/dashboard",
				pattern: /^\/dashboard\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 12 },
				endpoint: null
			},
			{
				id: "/(app)/(auth)/forgotten",
				pattern: /^\/forgotten\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 5 },
				endpoint: null
			},
			{
				id: "/(app)/(auth)/login",
				pattern: /^\/login\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 6 },
				endpoint: null
			},
			{
				id: "/(app)/(auth)/login/facebook",
				pattern: /^\/login\/facebook\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/(app)/(auth)/login/facebook/_server.ts.js'))
			},
			{
				id: "/(app)/(auth)/login/facebook/callback",
				pattern: /^\/login\/facebook\/callback\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/(app)/(auth)/login/facebook/callback/_server.ts.js'))
			},
			{
				id: "/(app)/(auth)/login/google",
				pattern: /^\/login\/google\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/(app)/(auth)/login/google/_server.ts.js'))
			},
			{
				id: "/(app)/(auth)/login/google/callback",
				pattern: /^\/login\/google\/callback\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/(app)/(auth)/login/google/callback/_server.ts.js'))
			},
			{
				id: "/(app)/(payments)/pricing",
				pattern: /^\/pricing\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 11 },
				endpoint: null
			},
			{
				id: "/(app)/profile",
				pattern: /^\/profile\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 13 },
				endpoint: null
			},
			{
				id: "/(app)/(auth)/regisitor",
				pattern: /^\/regisitor\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 7 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		}
	}
}
})();
