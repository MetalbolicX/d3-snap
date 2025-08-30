import * as d3 from "d3";
import { JSDOM } from "jsdom";

/**
 * Fixes SVG tag names that jsdom lowercases.
 * @param text - The SVG string to fix.
 * @returns The fixed SVG string.
 */
const fixXmlCase = (text: string): string => {
  const tagNames = ["linearGradient", "radialGradient", "clipPath", "textPath"];
  return tagNames.reduce(
    (text, tagName) =>
      text.replace(
        new RegExp(`(<|</)${tagName.toLowerCase()}\\b`, "g"),
        (_, start) => `${start}${tagName}`
      ),
    text
  );
};

export interface D3SnapOptions {
  selector?: string;
  container?: string;
  styles?: string;
  canvasModule?: any;
}

/**
 * D3Node provides a virtual DOM for d3 visualizations.
 */
export class D3Snap {
  options: D3SnapOptions;
  #jsDom: JSDOM;
  #document: Document;
  #window: Window | null;
  #d3Element: d3.Selection<d3.BaseType, unknown, null, undefined>;
  #d3: typeof d3;

  /**
   * Creates a new D3Snap instance.
   * @param options - Configuration options for the D3Snap instance.
   * @param options.d3Module - Optional custom D3 module.
   * @param options.selector - CSS selector for the D3 element.
   * @param options.container - HTML container string for the D3 element.
   * @param options.styles - CSS styles to apply to the SVG.
   * @param options.canvasModule - Optional custom canvas module for creating HTMLCanvasElement.
   * @example
   * ```ts
   * const d3Snap = new D3Snap({
   *   selector: "#chart",
   *   container: '<div id="chart"></div>',
   *   styles: "svg { background: #fff; }"
   * });
   * const svg = d3Snap.createSVG(400, 300);
   * ```
   */
  constructor({
    d3Module = d3,
    selector = "",
    container = "",
    styles = "",
    canvasModule = "",
  }: D3SnapOptions & { d3Module?: typeof d3 } = {}) {
    const jsDom = container ? new JSDOM(container) : new JSDOM();
    const document = jsDom.window.document;
    const d3Instance = d3Module;
    const d3Element: any = selector
      ? d3Instance.select(document.body).select(selector)
      : d3Instance.select(document.body);

    this.options = { selector, container, styles, canvasModule };
    this.#jsDom = jsDom;
    this.#document = document;
    this.#window = document.defaultView;
    this.#d3Element = d3Element;
  }

  /**
   * Creates an SVG element with optional width, height, and attributes.
   * @param [width=800] - SVG width.
   * @param [height=600] - SVG height.
   * @param [attrs] - Additional attributes.
   * @returns The SVG selection.
   * @example
   * ```ts
   * const svg = d3Snap.createSVG(800, 600, { viewBox: "0 0 800 600" });
   * ```
   */
  public createSVG(
    width: number = 800,
    height: number = 600,
    attrs?: Record<string, string | number>
  ): d3.Selection<SVGSVGElement, unknown, null, undefined> {
  // ): d3.Selection<SVGSVGElement, null, d3.BaseType, undefined> {
    const svg = this.#d3Element
      .append("svg")
      // .selectAll("svg")
      // .data([null])
      // .join("svg")
      .attr("xmlns", "http://www.w3.org/2000/svg");

    if (width > 0 && height > 0) {
      svg.attr("width", width).attr("height", height);
    }

    if (attrs) {
      // Object.entries(attrs).forEach(([key, value]) => {
      //   svg.attr(key, value);
      // });
      for (const [key, value] of Object.entries(attrs)) {
        svg.attr(key, value);
      }
    }

    if (this.options.styles) {
      svg
        .append("defs")
        .append("style")
        .attr("type", "text/css")
        .text(`<![CDATA[ ${this.options.styles} ]]>`);
    }
    return svg;
  }

  /**
   * Creates a Canvas element using the provided canvas module.
   * @param [width=800] - Canvas width.
   * @param [height=600] - Canvas height.
   * @returns The Canvas instance.
   * @throws Error if the canvas module is not provided or does not support HTMLCanvasElement.
   * @example
   * ```ts
   * const canvas = d3Snap.createCanvas(800, 600);
   * ```
   */
  public createCanvas(width: number = 800, height: number = 600): any {
    const Canvas = this.options.canvasModule;
    if (!Canvas || !Canvas.version) {
      throw new Error("Install node-canvas for HTMLCanvasElement support.");
    }
    const canvas =
      parseInt(Canvas.version) >= 2
        ? new Canvas.Canvas(width, height)
        : new Canvas(width, height);
    this.options.canvasModule = canvas;
    return canvas;
  }

  /**
   * Returns the SVG string from the DOM.
   * @returns SVG string.
   */
  public get svgToString(): string {
    const svgNode = this.#d3Element.select("svg").node() as SVGSVGElement | null;
    return svgNode ? fixXmlCase(svgNode.outerHTML) : "";
  }

  /**
   * Serializes the DOM to HTML.
   * @returns HTML string.
   */
  public get html(): string {
    return this.#jsDom.serialize();
  }
  /**
   * Returns the chart HTML for the selected element.
   * @returns Chart HTML string.
   */
  public get chartToHTML(): string {
    const { selector } = this.options;
    if (!selector) {
      return "";
    }
    const element = this.#document.querySelector(selector);
    return element?.outerHTML ?? "";
  }

  /**
   * Returns the D3 module used in this instance.
   * @returns The D3 module.
   */
  public get d3() {
    return this.#d3;
  }
}
