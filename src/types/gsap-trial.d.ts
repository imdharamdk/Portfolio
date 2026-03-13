declare module "gsap-trial/SplitText" {
  export class SplitText {
    constructor(target: any, vars?: any);
    chars: HTMLElement[];
    words: HTMLElement[];
    lines: HTMLElement[];
    revert(): void;
  }
}

declare module "gsap-trial/ScrollSmoother" {
  import type { ScrollTriggerStatic } from "gsap/ScrollTrigger";

  export interface ScrollSmootherVars {
    wrapper?: string | Element;
    content?: string | Element;
    smooth?: number;
    speed?: number;
    effects?: boolean;
    autoResize?: boolean;
    ignoreMobileResize?: boolean;
  }

  export class ScrollSmoother {
    static create(vars?: ScrollSmootherVars): ScrollSmoother;
    static get(): ScrollSmoother | null;
    static refresh(soft?: boolean): void;
    scrollTop(value?: number): number;
    scrollTo(
      target: string | Element | number,
      smooth?: boolean,
      position?: string
    ): void;
    paused(state?: boolean): boolean;
    refresh(soft?: boolean): void;
    scrollTrigger?: ScrollTriggerStatic;
  }
}
