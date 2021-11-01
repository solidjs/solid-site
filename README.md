<p align="center">
  <img width="75px" src="./src/assets/logo.png" alt="Solid logo">
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

## Additional information

#### How do the documentation files work?

They're imported from the [Solid Docs](https://github.com/solidjs/solid-docs) package. There's a script there that builds the markdown files into consumable JSON files, and the package provides functions to load them.

## Credits

- [Solid](https://github.com/solidjs/solid) - The view library
- [TailwindCSS](https://tailwindcss.com/) - For all the styles
- [Cloudflare Wrangler](https://github.com/cloudflare/wrangler) - Cloudflare Wrangler to deploy to Workers
- [vite](http://vitejs.dev/) - For the bundler / dev server
- [yarn](https://yarnpkg.com/) - The package manager
- [shiki](https://github.com/shikijs/shiki) - For the code highlight

## Contributions

We are actively accepting contributions to improve the Solid website. We accept PRs that are well-structured, have formatting applied and follow the general structure of the site. If you have any questions, want to report a bug or a general concern, feel free to reach us on GitHub Issues or Discord.

## Sponsors

Thank you to our generous and helpful sponsors. If you're interested in sponsoring Solid, reach out to us on Discord.

- [Cloudflare](https://www.cloudflare.com/)
- [Builder.io](https://www.builder.io/)
- [SauceLabs](https://saucelabs.com/)
