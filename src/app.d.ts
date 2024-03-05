import type { RemauthServerClient } from '$lib/server/remauth';

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			remauth: RemauthServerClient;
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
