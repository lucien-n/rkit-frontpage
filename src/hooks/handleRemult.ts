import { _api } from '$lib/server/remult';
import type { Handle } from '@sveltejs/kit';

export const handleRemult: Handle = async ({ event, resolve }) => {
	return await _api.withRemult(event, async () => await resolve(event));
};
