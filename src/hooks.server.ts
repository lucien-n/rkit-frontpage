import type { Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import { handleRemult } from './hooks/handleRemult';
import { handleAuth } from './hooks/handleAuth';

export const handle: Handle = sequence(handleAuth, handleRemult);
