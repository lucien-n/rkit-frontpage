import { setProjectSchema } from '$shared/modules/projects/schemas/set-project.schema';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import type { PageServerLoad } from './$types';
import { setTagSchema } from '$shared/modules/tags/schemas/set-tag.schema';

export const load: PageServerLoad = async () => {
	return {
		setProjectForm: await superValidate(zod(setProjectSchema)),
		setTagForm: await superValidate(zod(setTagSchema))
	};
};
