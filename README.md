<p>
  <img width="100%" src="https://assets.solidjs.com/banner?project=Website&type=core" alt="Solid Docs">
</p>

# Solid Website

This is the source code for the solid website: [https://solidjs.com/](https://solidjs.com/)

## Getting started

The website is built with [Solid](https://github.com/solidjs/solid). In order to get going, you should be familiar with the core API of Solid and how it works on the surface.

### Prerequisites

- [yarn](https://yarnpkg.com/getting-started/install)

### Install

1. Clone the project locally: `git clone https://github.com/solidjs/solid-site`
2. Change directory into your local copy: `cd solid-site`
3. Install the dependencies: `yarn install`

### Available commands

- `yarn install`: Install the dependencies
- `yarn dev`: Start the dev server
- `yarn build`: Build the project
- `yarn build:sitemap`: Generate the `sitemap.xml` file
- `yarn format`: Format the whole project with prettier
- `yarn deploy:dev`: Helper method to deploy to dev
- `yarn deploy:prod`: Helper method to deploy to prod

### PWA Testing

Solid Site supports PWA and worker auto updating powered by Vite PWA Plugin. When testing `run yarn https-preview`. Running it the first time will ask to install the certificate if not yet done. Then open your Chrome and press F12 > Network Tab > browse to https://localhost. Wait until the network requests with gears at the begining stops downloading the SW precache, then on the same Network Tab just change `No throttling` option to `Offline`. All pages should work by pressing F5 (do not do a hard refresh Crtl + F5 as it will force the browser to go to the server and the Chrome Dinosaur will appear).

## Additional information

#### How do the documentation files work?

They're imported from the [Solid Docs](https://github.com/solidjs/solid-docs) package. There's a script there that builds the markdown files into consumable JSON files, and the package provides functions to load them.

## Credits

- [SolidJS](https://github.com/solidjs/solid) - Reactive Javascript UI library
- [TailwindCSS](https://tailwindcss.com/) - For all the styles
- [Cloudflare Wrangler](https://github.com/cloudflare/wrangler) - Cloudflare Wrangler to deploy to Workers
- [Vite](http://vitejs.dev/) - For the bundler / dev server
- [Yarn](https://yarnpkg.com/) - The package manager
- [Shiki](https://github.com/shikijs/shiki) - For the code highlight
- [Vite PWA](https://vite-plugin-pwa.netlify.app/) - For PWA functionality

## Contributions

We are actively accepting contributions to improve the Solid website. We accept PRs that are well-structured, have formatting applied and follow the general structure of the site. If you have any questions, want to report a bug or a general concern, feel free to reach us on GitHub Issues or Discord.

## Sponsors

Thank you to our generous and helpful sponsors. If you're interested in sponsoring Solid, reach out to us on Discord.

- [Cloudflare](https://www.cloudflare.com/)
- [Netlify](https://www.netlify.com/)
- [Builder.io](https://www.builder.io/)
- [SauceLabs](https://saucelabs.com/)
