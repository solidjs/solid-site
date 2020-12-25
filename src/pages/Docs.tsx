
import type { Component } from 'solid-js';
import { createResource, Switch, Match } from 'solid-js';
import Nav from '../components/Nav';
import Header from '../components/Header';
import Markdown from '../components/Markdown';

const fetchMarkdown = id => () => fetch(`docs/md/v0.17.0/${id}.md`).then(r => r.text());

const Docs: Component = () => {
	let [markdown, loadMarkdown] = createResource();
	loadMarkdown(fetchMarkdown('components'));
	console.log(markdown);
	return (
		<div class="flex flex-col relative">
			<Nav showLogo={true} />
			<Header title="Documentation" />
			<div class="container grid my-10 grid-cols-12 gap-4">
				<div class="col-span-3">
					<div class="py-5 sticky" style={{ top: '8rem' }}>
						<div class="border rounded-md p-3 mb-4">
							Version 0.22.0
						</div>
					</div>
				</div>
				<div class="col-span-9 p-5" style={{ height: '150vh' }}>
					<h2 class="text-2xl border-b pb-3 mb-8 text-solid">Components</h2>
					<Switch fallback={"Failed to load markdown..."}>
						<Match when={markdown.loading}>Loading...</Match>
						<Match when={markdown()}>
							{(body) => <Markdown>{body}</Markdown>}
						</Match>
					</Switch>

				</div>
			</div>
		</div>
	);
};

export default Docs;
