import type { Rule } from '$shared/helpers/types';
import type { Tag } from './tag.entity';

export default {
	field: {
		label: {
			min: 1,
			max: 32
		}
	}
} satisfies Rule<Tag, 'label'>;
