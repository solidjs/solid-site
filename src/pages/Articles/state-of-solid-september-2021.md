A lot of exciting things have been going in the Solid in the last few months since the 1.0 release.

Let's start with some big news.

---

## Netlify joins up as an Official Deployment Partner

![Alt Text](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/w00wmhamyf0r5ek6b901.png)

We are super excited to announce that Netlify has come on board as a Deployment partner and sponsor for the project. They will be contributing [$500 a month](https://opencollective.com/solid) towards the development and growth of Solid.

We will be adding the [Deploy with Netlify](https://www.netlify.com/blog/2016/11/29/introducing-the-deploy-to-netlify-button/) to our official [starter templates](https://github.com/solidjs/templates) to make it easier than ever to deploy Solid applications.

---

## 1.0 Release and Response

We've had an incredible response to the 1.0 release. It is great to see years of work come to fruition. See what some of the voices in the industry have been saying about Solid:

{% twitter 1409811453696118786 %}

{% twitter 1409592349370560513 %}

{% twitter 1409599364838920200 %}

{% twitter 1413972672342528017 %}

{% twitter 1424876545823318020 %}

---

## Expanding the Team

I started this project and ran it on my own for many years but it had definitely grown beyond me. We've been expanding the team. Since I've never formally introduced the rest of the team I will take the opportunity now:

David Di Biase - Web Site/Community Manager

Alexandre Mouton Brady - Templates/Integrations

Milo M. - Tooling

Ryan Turnquist - Router/Libraries

Dan Jutan - Documentation/Training

There are also a small group of contributors making some great adds to Solid's ecosystem. You can see [bios here](https://www.solidjs.com/contributors).

---

## Growing Ecosystem

Every day it seems like new libraries are coming out that showcase what you can do with Solid. So I thought I'd highlight a few of them.

[Solid Primitives](https://github.com/davedbase/solid-primitives) - Our "React Use". A set of high-quality reusable primitives.

[Solid Flip](https://github.com/otonashixav/solid-flip) - A new animation library that makes it easier than ever to do flip animations.

[Solid DND](https://github.com/thisbeyond/solid-dnd) - Drag and drop port of dnd-kit made to leverage Solid's fine-grained reactivity.

[@felte/solid](https://github.com/pablo-abc/felte/blob/main/packages/solid/README.md) - A port of the Felte form library for Svelte available in Solid.

[Solid URQL](https://github.com/Acidic9/solid-urql) - A URQL wrapper to make using GraphQL in Solid easier than ever.

While not complete, there are several Component libraries currently being worked on:
[Solid Headless](https://github.com/LXSMNSYC/solid-headless)
[Solid Blocks](https://github.com/atk/solid-blocks)

And recently with the question of DSL a few projects have been attempting to bring Svelte-like syntax into Solid:
[Babel Plugin Solid Labels](https://github.com/LXSMNSYC/babel-plugin-solid-labels)
[Babel Plugin Undestructure](https://github.com/orenelbaum/babel-plugin-solid-undestructure)

Interested in seeing more. Check out the [Resources section](https://www.solidjs.com/resources) of the website or the community-driven [Awesome Solid](https://github.com/one-aalam/awesome-solid-js).

---

## Translations

We could have never anticipated the interest in translations right out the gate but so much great work being done by contributors. We now have documentation on [solidjs.com](https://solidjs.com) available in 10 languages.

The full tutorials are being translated as well and are currently available in English, Japanese, and Chinese.

Thanks so much to:
Gaving Cong 🇨🇳
Jun Shindo 🇯🇵
David Di Biase 🇮🇹
Candido Sales Gomez 🇧🇷
Steven Yung 🇫🇷
Mehdi (MidouWebDev) 🇫🇷
Athif Humam 🇮🇩
Alex Lohr 🇩🇪
Pheianox 🇷🇺

---

## Content Explosion

In a similar vein, the amount of new Solid content that has been pouring in has been amazing. Honestly, there is so much between featured on [Fireship](https://www.youtube.com/watch?v=cuHDQhDhvPE), to the many independent streams and interviews/podcasts I participated in. But here's a couple that really stood out:

### Articles

[Introduction to the Solid JavaScript Library by Charlie Gerard](https://css-tricks.com/introduction-to-the-solid-javascript-library/) - CSS-Tricks
One of the best introductions we've seen written to date. A really good overview of all the core features.

[SolidJS said stiffly: I am more react than React by Kasong](https://segmentfault.com/a/1190000040275257/en) - Segment Fault
Despite the translation, you can get the humor of this article which provides some great examples to illustrate Solid's approach.

### Podcasts

[SolidJS with Ryan Carniato](https://podrocket.logrocket.com/solidjs) - PodRocket
We talk about a lot more than just Solid but trends in frontend in general.

[React vs Svelte vs Solid & MicroFrontends | Ryan Carniato](https://show.nikoskatsikanis.com/episodes/ryan-carniato) - Nikos Show
This podcast talks about developments in compilers and in server-side rendering in JavaScript Frameworks.

### Videos

{% youtube OqcHoLWyyIw %}

{% youtube StLjM0Ki6iA %}

And if you haven't seen it yet check out my talk at React Finland which is a great introduction to SolidJS for those coming from a React background.

{% youtube 2iK9zzhSKo4 %}

I've also started streaming on [my Youtube channel](https://www.youtube.com/channel/UCLLVlcmcCP4CUe7xSqVEnxw). So if you are interested in the inner workings of the framework could be worth checking out.

---

## Current Development

New things are coming down the pipeline for Solid in the coming months. Mostly we want to make it easier for people to approach using Solid. For that reason, there are 3 things we are working on that we feel will aid in that process a lot.

### Documentation

While my tireless nights writing those over a couple months in the spring got us here, we can do better. Dan Jutan has been doing a great job focusing on the language to make the tutorials more accessible to developers with all levels of familiarity. We are also working on more beginner-focused, long-form tutorials to help onboarding people newer to web development.

### Server Side Rendering

Consolidating and generalizing on use cases to make it easier to use Solid in a variety of projects. This will include better documentation and rounding out a lot of the rough edges. The flagship experience for Single Page App SSR will be present through our new [Solid Start](https://github.com/solidjs/solid-start) project which is an official minimal Meta-Framework built on top of [Vite](https://vitejs.dev/) with support of deploying to various platforms. But this work will also include better support for integration with [Astro](https://astro.build/) for those interested in Multi-Page Apps. So no matter what type of web application you are building we have you covered.

### Reactive Performance

Finally, I'm personally doing a rework and optimization of our core reactive system. The last time I gave it a good tune was back in February 2020. We've added a lot of features since then and it's time to streamline out the edge cases and improve performance. This is especially important as we look to support custom renderers, for things like WebGL or native.

---

And that's it for now. We're going to be doing these updates more often in the future. So much incredible stuff has been going on and I can only imagine what more we will have to share next time.
