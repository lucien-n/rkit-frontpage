import { superValidate } from 'sveltekit-superforms';
import type { PageServerLoad } from './$types';
import { zod } from 'sveltekit-superforms/adapters';
import { setProjectSchema } from '$shared/modules/projects/schemas/set-project.schema';

export const load: PageServerLoad = async () => {
	return {
		form: await superValidate(zod(setProjectSchema))
	};
};
