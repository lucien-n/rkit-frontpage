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
		}
	}
} satisfies Rule<Project, 'name' | 'description'>;
