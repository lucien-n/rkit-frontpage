import { getZString } from '$shared/helpers/zod';
import { z } from 'zod';
import projectRules from '../project.rules';

export const setProjectSchema = z.object({
	name: getZString('name', projectRules.field.name),
	description: getZString('description', projectRules.field.description),
	repo: getZString('repo', projectRules.field.repo),
	branch: getZString('branch', projectRules.field.branch)
});

export type SetProjectSchema = typeof setProjectSchema;
export type SetProjectInput = z.infer<SetProjectSchema>;
