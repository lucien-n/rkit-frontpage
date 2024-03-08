type ClickOutsideOptions = {
	onClickOutside?: (event: MouseEvent) => void;
};

export const clickOutside = (node: HTMLElement, { onClickOutside }: ClickOutsideOptions = {}) => {
	const handleClick = (event: MouseEvent) => {
		// @ts-expect-error temp
		if (node && !node.contains(event.target) && !event.defaultPrevented) {
			onClickOutside && onClickOutside(event);
		}
	};

	document.addEventListener('click', handleClick, true);

	return {
		destroy() {
			document.removeEventListener('click', handleClick, true);
		}
	};
};
