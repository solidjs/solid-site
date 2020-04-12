
import { createState } from "solid-js";
import Link from './Link.js';

import "./Menu.scss"

const Menu = ({ nav }) => {
  const [state, setState] = createState({ drawer: 'collapsed' });
  const expand = () => {
    setState('drawer', 'expanded');
  };
  const collapse = () => {
    setState('drawer', 'collapsed');
  };
  return <>
    <menu
      id="main"
      class={`shadow ${state.drawer }`}
      onmouseenter={expand}
      onmouseleave={collapse}>
      <div
        class="hamburger"
        class={state.drawer}
        onclick={ state.draw === true ? collapse : expand }>
        <div class="wrap">
          <div class="inner">
            <div class="bar1"></div>
            <div class="bar2"></div>
            <div class="bar3"></div>
          </div>
        </div>
      </div>
      <aside class="menu">
        { nav.map((item) => <>
          <p class="menu-label">{item.title}</p>
          <ul class="menu-list">
            { item.links.map((link) => (
              <li>
                <Link path={link.path} class="not-active">{link.label}</Link>
                { link.sublinks && (
                  <ul>
                    { link.sublinks.map((sublink) => (
                      <li><Link path={link.path}>{sublink.label}</Link></li>
                    )) }
                  </ul>
                ) }
              </li>
            )) }
          </ul>
        </>) }
      </aside>
    </menu>
  </>;
};

export default Menu;
