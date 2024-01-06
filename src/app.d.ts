// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		interface Locals {
			auth: import("lucia").AuthRequest;
		}
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface Platform {}
	}
	namespace Lucia {
		type Auth = import("$lib/server/lucia").Auth;
		type DatabaseUserAttributes = {
			firstname: string;
			surname: string;
			email: string;
			email_verified: boolean;
			role?: string;
			strip_customer_id?: string;
		};
		type DatabaseSessionAttributes = {
			name: string;
			plan?: string;
			role?: string;
			subscribed: boolean;
		};
	};
}

export { };
