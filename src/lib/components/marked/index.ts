import CodeRenderer from './code-renderer.svelte';
import CodespanRenderer from './codespan-renderer.svelte';
import HeadingRenderer from './heading-renderer.svelte';
import LinkRenderer from './link-renderer.svelte';
import ListRenderer from './list-renderer.svelte';

const renderers = {
	code: CodeRenderer,
	codespan: CodespanRenderer,
	link: LinkRenderer,
	list: ListRenderer,
	heading: HeadingRenderer
};

export { CodeRenderer, CodespanRenderer, LinkRenderer, ListRenderer, HeadingRenderer, renderers };
