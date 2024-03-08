export const clickOutside = (node: HTMLElement) => {
	const handleClick = (event: MouseEvent) => {
		// @ts-expect-error temp
		if (node && !node.contains(event.target) && !event.defaultPrevented) {
			// @ts-expect-error temp
			node.dispatchEvent(new CustomEvent('click_outside', node));
		}
	};

	document.addEventListener('click', handleClick, true);

	return {
		destroy() {
			document.removeEventListener('click', handleClick, true);
		}
	};
};
