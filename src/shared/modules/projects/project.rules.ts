import type { Rule } from '$shared/helpers/types';
import type { Project } from './project.entity';

export default {
	field: {
		name: {
			min: 3,
			max: 48
		},
		description: {
			min: 0,
			max: 1024
		},
		repo: {
			min: 1,
			max: 64
		},
		branch: {
			min: 1,
			max: 64
		}
	}
} satisfies Rule<Project, 'name' | 'description' | 'repo' | 'branch'>;
