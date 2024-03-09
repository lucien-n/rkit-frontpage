import type { SelectOption } from '$ui/combobox/types';
import { toast } from 'svelte-sonner';

export const copyToClipboard = (
	text: string,
	onSuccess: (message: string, value: unknown) => void = () => undefined,
	onError: (message: string, reason: string) => void = () => undefined
) => {
	navigator.clipboard.writeText(text).then(
		(value) => onSuccess(`Successfully copied "${text}" to your clipboard`, value),
		(reason) => onError(`Error while copying "${text}" to your clipboard`, reason)
	);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const onFormFailure = (event: any) => {
	const { message } = event.detail.data;
	if (!message) return;
	toast.error(message);
};

export const getSelectOptions = (items: string[]): SelectOption[] =>
	items.map((item) => ({ label: item, value: item }));
