import { getZString } from '$shared/helpers/zod';
import { z } from 'zod';
import projectRules from '../project.rules';

export const setProjectSchema = z
	.object({
		id: z.string().cuid().optional(),
		name: getZString('name', projectRules.field.name).optional(),
		description: getZString('description', projectRules.field.description).optional(),
		repo: getZString('repo', projectRules.field.repo).optional(),
		branch: getZString('branch', projectRules.field.branch).optional(),
		hidden: z.boolean().default(false).optional()
	})
	.refine(
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		({ id, ...rest }) => id || Object.entries(rest).every(([_key, value]) => value !== undefined)
	);

export type SetProjectSchema = typeof setProjectSchema;
export type SetProjectInput = z.infer<SetProjectSchema>;
