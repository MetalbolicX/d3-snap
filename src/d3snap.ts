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
  d3Module?: typeof d3;
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
  d3: typeof d3;

  /**
   * Creates an instance of D3Snap.
   * @param options - Configuration options for D3Snap.
   * @param options.d3Module - The d3 module to use.
   * @param options.selector - The CSS selector for the d3 element.
   * @param options.container - The HTML container string.
   * @param options.styles - CSS styles to apply to the SVG.
   * @param options.canvasModule - The canvas module for creating Canvas elements.
   * @throws Error if the canvas module is not provided when creating a Canvas.
   * @example
   * ```ts
   * import { D3Snap } from 'd3-snap';
   * const d3Snap = new D3Snap({
   * d3Module: d3,
   * selector: '#my-chart',
   * container: '<div id="my-chart"></div>',
   * styles: 'svg { background: #fff; }',
   * });
   * const svg = d3Snap.createSVG(800, 600);
   * ```
   */
  constructor({
    d3Module = d3,
    selector = "",
    container = "",
    styles = "",
    canvasModule = "",
  }: D3SnapOptions = {}) {
    const jsDom = container ? new JSDOM(container) : new JSDOM();
    const document = jsDom.window.document;
    const d3Element: any = selector
      ? d3Module.select(document.body).select(selector)
      : d3Module.select(document.body);

    this.options = { d3Module, selector, container, styles, canvasModule };
    this.#jsDom = jsDom;
    this.#document = document;
    this.#window = document.defaultView;
    this.#d3Element = d3Element;
    this.d3 = d3Module;
  }

  /**
   * Creates an SVG element with optional width, height, and attributes.
   * @param width - SVG width.
   * @param height - SVG height.
   * @param attrs - Additional attributes.
   * @returns The SVG selection.
   * @example
   * ```ts
   * const svg = d3Snap.createSVG(800, 600);
   * ```
   */
  public createSVG(
    width?: number,
    height?: number,
    attrs?: Record<string, string | number>
  ): d3.Selection<SVGSVGElement, unknown, null, undefined> {
    const svg = this.#d3Element
      .append("svg")
      .attr("xmlns", "http://www.w3.org/2000/svg");

    if (width && height) {
      svg.attr("width", width).attr("height", height);
    }

    if (attrs) {
      Object.entries(attrs).forEach(([key, value]) => {
        svg.attr(key, value);
      });
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
   * @param width - Canvas width.
   * @param height - Canvas height.
   * @returns The Canvas instance.
   * @throws Error if the canvas module is not provided or does not support HTMLCanvasElement.
   * @example
   * ```ts
   * const canvas = d3Snap.createCanvas(800, 600);
   * ```
   */
  public createCanvas(width: number, height: number): any {
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
  public get svgString(): string {
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
  public get chartHTML(): string {
    const { selector } = this.options;
    if (!selector) {
      return "";
    }
    const element = this.#document.querySelector(selector);
    return element?.outerHTML ?? "";
  }
}
