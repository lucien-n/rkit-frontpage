import CodeRenderer from './renderers/code.svelte';
import CodespanRenderer from './renderers/codespan.svelte';
import HeadingRenderer from './renderers/heading.svelte';
import LinkRenderer from './renderers/link.svelte';
import TextRenderer from './renderers/text.svelte';
import EmRenderer from './renderers/em.svelte';
import StrongRenderer from './renderers/strong.svelte';
import ParapgraphRenderer from './renderers/parapgraph.svelte';

const renderers = {
	code: CodeRenderer,
	codespan: CodespanRenderer,
	link: LinkRenderer,
	heading: HeadingRenderer,
	text: TextRenderer,
	em: EmRenderer,
	strong: StrongRenderer,
	paragraph: ParapgraphRenderer
};

export {
	CodeRenderer,
	CodespanRenderer,
	LinkRenderer,
	HeadingRenderer,
	TextRenderer,
	EmRenderer,
	StrongRenderer,
	ParapgraphRenderer,
	renderers
};
