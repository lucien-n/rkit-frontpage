import type { StringFieldOptions } from 'remult';
import type { FieldRule } from './types';

export const getStringOptions = (rule: FieldRule): StringFieldOptions => ({
	minLength: rule.min,
	maxLength: rule.max
});

export const validateStringLength = (str: string, rule: FieldRule) =>
	str.length >= rule.min && str.length <= rule.max;

export const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);
