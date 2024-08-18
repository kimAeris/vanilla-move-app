import { Component } from "../core/heropy";

interface State {
  [key: string]: unknown; // heropy.ts의 state 속성의 type은 인덱싱 가능한 타입이므로 똑같이 해줘야 한다.
  menus: {
    name: string;
    href: string;
  }[];
}
export default class TheHeader extends Component {
  public state!: State; // 초기 데이터가 존재하지 않지만 할당 단언을 통해 데이터가 할당이 된 것처럼 선언함
  constructor() {
    super({
      tagName: "header",
      state: {
        menus: [
          {
            name: "Search",
            href: "#/",
          },
          {
            name: "Movie",
            href: "#/movie?id=tt4520988",
          },
          {
            name: "About",
            href: "#/about",
          },
        ],
      },
    });
    window.addEventListener("popstate", () => {
      this.render();
    });
  }
  render() {
    this.el.innerHTML = /* html */ `
      <a
        href="#/"
        class="logo">
        <span>OMDbAPI</span>.COM
      </a>
      <nav>
        <ul>
          ${this.state.menus
            .map((menu) => {
              const href = menu.href.split("?")[0];
              const hash = location.hash.split("?")[0];
              const isActive = href === hash;
              return /* html */ `
              <li>
                <a
                  class="${isActive ? "active" : ""}"
                  href="${menu.href}">
                  ${menu.name}
                </a>
              </li>`;
            })
            .join("")}
        </ul>
      </nav>
      <a href="#/about" class="user">
        <img src="https://heropy.blog/css/images/logo.png" alt="User">
      </a>
    `;
  }
}
