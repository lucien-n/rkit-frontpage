import CodeRenderer from './renderers/code.svelte';
import CodespanRenderer from './renderers/codespan.svelte';
import HeadingRenderer from './renderers/heading.svelte';
import LinkRenderer from './renderers/link.svelte';

const renderers = {
	code: CodeRenderer,
	codespan: CodespanRenderer,
	link: LinkRenderer,
	heading: HeadingRenderer
};

export { CodeRenderer, CodespanRenderer, HeadingRenderer, LinkRenderer, renderers };
