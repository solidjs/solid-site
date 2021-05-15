import type { Component } from 'solid-js';
import { Portal } from 'solid-js/web';
import wordmark from '../assets/wordmark.svg';

const Footer: Component = () => (
  <Portal mount={document.getElementById('footer')}>
		<div class="py-10 bg-solid-gray">
			<div class="px-3 lg:px-12 container text-white flex flex-col lg:flex-row items-center space-y-10 lg:space-y-0 lg:space-x-20">
				{/* We could make this a link and redirect to the media page */}
				<img class="w-32" src={wordmark} alt="Solid logo" />

				<div class="text-sm max-w-5xl">
					<p>
						Solid.js is an open-source project supported by a team of public contribitors. It's
						distributed&nbsp;
						<a
							class="text-gray-300 hover:underline"
							href="https://github.com/ryansolid/solid/blob/master/LICENSE"
						>
							under an MIT license
						</a>
						. This library and community are made possible by a&nbsp;
						<a class="text-gray-300 hover:underline" href="/contributors">
							core team and dedicated contributors
						</a>
						.
					</p>

					{/* TODO: Make this dynamic */}
					<p class="text-sm text-gray-400 mt-3">Last updated April 7, 2021 on Solid v0.25.0.</p>
				</div>
			</div>
		</div>
  </Portal>
);

export default Footer;
