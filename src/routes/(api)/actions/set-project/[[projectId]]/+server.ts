import type { RequestHandler } from '@sveltejs/kit';
import { zod } from 'sveltekit-superforms/adapters';
import { actionResult, superValidate } from 'sveltekit-superforms';
import { ProjectsController } from '$shared/modules/projects/projects.controller';
import { setProjectSchema } from '$shared/modules/projects/schemas/set-project.schema';

export const POST: RequestHandler = async (event) => {
	const {
		request,
		params: { projectId }
	} = event;

	const form = await superValidate(request, zod(setProjectSchema));

	if (!form.valid) return actionResult('failure', { form }, 400);

	const { name, description } = form.data;

	try {
		console.log(projectId);
		await ProjectsController.set({ name, description }, projectId);
	} catch (e) {
		return actionResult('failure', { message: e ?? 'Internal error', form }, 400);
	}

	return actionResult('success', { form });
};
