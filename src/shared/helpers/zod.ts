import { z, type ZodType } from 'zod';
import type { FieldRule } from './types';
import { capitalize } from './helpers';

export const parseZSchema = <Schema extends ZodType>(input: z.infer<Schema>, schema: Schema) => {
	const result = schema.safeParse(input);
	if (!result.success) {
		throw result.error.issues[0].message;
	}

	return result.data as z.infer<Schema>;
};

export const getZString = (name: string, { min, max }: FieldRule): z.ZodString => {
	const capitalizedName = capitalize(name);
	const zString = z
		.string({
			invalid_type_error: `${capitalizedName} needs to be a string`,
			required_error: `${capitalizedName} is required`
		})
		.min(min, `${capitalizedName} needs to be at least ${min} characters`)
		.max(max, `${capitalizedName} needs to be at most ${max} characters`);

	return zString;
};
