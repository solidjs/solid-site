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
2. Change diretory into your local copy: `cd solid-site`
3. Install the dependencies: `yarn install`

### Available commands

- `yarn install`: Install the dependencies
- `yarn dev`: Start the dev server
- `yarn build`: Build the project
- `yarn format`: Format the whole project with prettier
- `yarn deploy:dev`: Helper method to deploy to dev
- `yarn deploy:prod`: Helper method to deploy to prod
- `yarn fetch:releases`: Fetch the latest releases as MD and transforms them to JSON (see below for more)

## Additional information

#### How do I update the documentation?

First you need to generate a [github token](https://github.com/settings/tokens) and add it to a `.env` file at the root of the project in the `GITHUB_TOKEN` variable.

You can copy, paste and rename the [.env.example](./.env.example) at the root of the project to get going faster.

There's a [fetchReleases.ts](./scripts/fetchReleases.ts) script in the [scripts](./scripts) folder .

You can use it by issuing the command `yarn fetch:releases` which will download all the releases's markdown files and convert them into a json files in the `public/api` folder. These files will be used as json endpoinds to fetch the documentation from the client.

#### How do I change the highlight theme?

The scripts mentionned above uses [shiki](https://github.com/shikijs/shiki) to process the code which in turn uses VSCode tokens. Therefore any VSCode theme can be applied.

All you have to do is retrieve the JSON file describing the them in your favorite theme (see [./scripts/blink-light.json](scripts/blink-light.json) for an example), paste it into the [scripts](./scripts) folder and refer to it in the [fetchReleases.ts](./scripts/fetchReleases.ts) file around line 30: `const theme = await loadTheme(resolve(__dirname, 'your-theme.json'));`.

## Credits

- [Solid](https://github.com/solidjs/solid) - The view library
- [TailwindCSS](https://tailwindcss.com/) - For all the styles
- [Cloudflare Wrangler](https://github.com/cloudflare/wrangler) - Cloudflare Wrangler to deploy to Workers
- [vite](http://vitejs.dev/) - For the bundler / dev server
- [yarn](https://yarnpkg.com/) - The package manager
- [shiki](https://github.com/shikijs/shiki) - For the code highlight

## Contributions

We are actively accepting contributions to improve the Solid website. We accept PRs that are well structured, have formatting applied and follow the general structure of the site. If you have any questions, want to report a bug or a general concern, feel free to reach us on Github Issues or Discord.

## Sponsors

Thank you to our generous and helpful sponsors. If you're interested in sponsoring Solid, reach out to us on Discord.

- [Cloudflare](https://www.cloudflare.com/)
- [Builder.io](https://www.builder.io/)
- [SauceLabs](https://saucelabs.com/)
