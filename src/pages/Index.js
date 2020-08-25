
import global from "../components/App.scss"
import styles from "./Index.scss"

const Index = () => (
  <section class={styles.wrap}>
    <div class={styles.center}>
      <img class={styles.logo} src="/assets/img/logo/without-wordmark/logo.svg" />
      <div class="content">
        <img class={styles.wordmark} src="/assets/img/logo/wordmark/logo.svg" />
        <h1>Reactive JavaScript Framework</h1>
        <p>
          Solid is a declarative Javascript library for creating user interfaces.
          It does not use a Virtual DOM. Instead it opts to compile its templates
          down to real DOM nodes and wrap updates in fine grained reactions.
        </p>
        <b>
          We're busy preparing for a website launch. Hold tight!
        </b>
        <br/>
        <br/>
        <a href="https://github.com/ryansolid/solid" class={`${global.button} ${styles.github}`}>Github</a>
        <a href="https://www.reddit.com/r/solidjs" class={`${global.button} ${styles.reddit}`}>Reddit</a>
        <a href="https://discord.com/invite/solidjs" class={`${global.button} ${styles.discord}`}>Discord</a>
      </div>
    </div>
    <div class={`${styles.block} ${styles.bottomLeft} ${styles.shadow}`}></div>
    <div class={`${styles.block} ${styles.topRight} ${styles.shadow}`}></div>
    <div class={`${styles.block} ${styles.upper} ${styles.shadow}`}></div>
    <div class={`${styles.block} ${styles.lower} ${styles.shadow}`}></div>
  </section>
);

export default Index;
