import { getZString } from '$shared/helpers/zod';
import { z } from 'zod';
import tagRules from '../tag.rules';

export const setTagSchema = z
	.object({
		id: z.string().cuid().optional(),
		label: getZString('label', tagRules.field.label).optional(),
		url: z.string().url().optional()
	})
	.refine(
		({ id, ...rest }) =>
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			id || Object.entries(rest).every(([_key, value]) => ![undefined, ''].includes(value as never))
	);

export type SetTagSchema = typeof setTagSchema;
export type SetTagInput = z.infer<SetTagSchema>;
