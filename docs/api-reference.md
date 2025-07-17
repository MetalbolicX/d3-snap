# API Reference

This page documents the core functions and types of the `d3-snap` module.

---

## D3Snap Object

The `D3Snap` object is the main entry point for using the `d3-snap` module. It provides methods to create DOM elements and a svg container to draw a data visualization.

### Constructor

Creates a new instance of `D3Snap`.

```ts
new D3Snap(options?: {
  selector?: string;
  container?: string;
  styles?: string;
  canvasModule?: any;
}): D3Snap;
```

#### Parameters

The constructor accepts an optional `options` object with the following properties:

- `selector` (string, optional): CSS selector for the element to attach the SVG or Canvas to. Defaults to an empty string (selects the body).
- `container` (string, optional): HTML string to initialize the virtual DOM. Defaults to an empty string (creates a blank DOM).
- `styles` (string, optional): CSS styles to inject into the SVG via a `<style>` tag.
- `canvasModule` (any, optional): The canvas module (such as `node-canvas`) to use for Canvas support.

#### Example

```ts
// Basic usage
import { D3Snap } from "d3-snap";

// Basic usage with SVG
const d3Snap = new D3Snap({
  selector: "#chart",
  container: '<div id="chart"></div>',
  styles: "svg { background: #fff; }"
});
const svg = d3Snap.createSVG(400, 300);
```

```ts
// Usage with Canvas (requires node-canvas)
import * as Canvas from "canvas";
const d3SnapCanvas = new D3Snap({
  selector: "#canvas-chart",
  container: '<div id="canvas-chart"></div>',
  canvasModule: Canvas
});
const canvas = d3SnapCanvas.createCanvas(400, 300);
```

#### Use Cases

- **Server-side SVG rendering**: Generate SVG charts in Node.js for static image export.
- **Injecting custom styles**: Add CSS directly to the SVG output.
- **Virtual DOM for testing**: Use a virtual DOM to test D3 visualizations without a browser.
- **Canvas rendering**: Create Canvas-based charts for image export or pixel manipulation.

## D3Snap Methods

### createSVG

Creates an SVG element with optional width, height, and attributes.
