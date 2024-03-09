import { getZString } from '$shared/helpers/zod';
import { z } from 'zod';
import projectRules from '../project.rules';

export const setProjectSchema = z
	.object({
		id: z.string().cuid().optional(),
		name: getZString('name', projectRules.field.name).default('').optional(),
		description: getZString('description', projectRules.field.description).default('').optional(),
		repo: getZString('repo', projectRules.field.repo).default('').optional(),
		branch: getZString('branch', projectRules.field.branch).default('').optional(),
		hidden: z.boolean().default(false).optional()
	})
	.refine(
		({ id, ...rest }) =>
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			id || Object.entries(rest).every(([_key, value]) => ![undefined, ''].includes(value as never))
	);

export type SetProjectSchema = typeof setProjectSchema;
export type SetProjectInput = z.infer<SetProjectSchema>;
