# Tutorial

We'll walk through the essential steps to get up and running with D3Snap, making your journey into data visualization smoother and more enjoyable 🖼️.

## Basic Usage Example 📝

Here's a simple example to create an SVG element with a blue circle using D3Snap:

```ts
import { D3Snap } from "d3-snap";

const node = new D3Snap();
const svg = node.createSVG(200, 200);
svg.append("circle")
  .attr("cx", 100)
  .attr("cy", 100)
  .attr("r", 80)
  .attr("fill", "skyblue");

console.log(node.svgToString());
```

### What’s Happening Here? 🧐

- We import the D3Snap class from the library.
- We create a new D3Snap instance, which sets up a virtual DOM.
- We create an SVG element with a width and height of 200 pixels.
- We append a circle to the SVG, setting its center, radius, and fill color.
- Finally, we print the SVG as a string, which you can use in your web app or save as a file.

## Working with Other Libraries 🤝

D3Snap can be seamlessly integrated with other visualization libraries, such as [`vizible-cartesian`](https://github.com/MetalbolicX/vizible-cartesian), which only requires an SVG container for advanced data visualizations. This makes it easy to combine D3Snap's virtual DOM with powerful charting tools! 📊

Below is an example where we use a `<figure>` tag as the container for our SVG chart, and apply custom styles for a polished look. We'll also show how to print the chart's HTML directly in the console using `console.log(node.html)`. This is especially useful for server-side rendering or exporting charts as HTML snippets.

```typescript
import { D3Snap } from "d3-snap";
import { TimeChart } from "vizible-cartesian";

const node = new D3Snap({
  container: '<figure id="chart"></figure>',
  selector: '#chart',
  styles: `
    figure#chart { background: #f9f9f9; border: 1px solid #ddd; padding: 1rem; }
    svg { font-family: Arial, sans-serif; }
    .legend { font-size: 14px; }
  `,
});

const svg = node.createSVG(800, 600);

const data = [
  { date: new Date("2020-01-01"), sales: 10, cost: 5 },
  { date: new Date("2020-02-01"), sales: 20, cost: 10 },
  { date: new Date("2020-03-01"), sales: 30, cost: 15 },
  { date: new Date("2020-04-01"), sales: 40, cost: 20 },
];

const chart = new TimeChart(svg, data, {
  xSerie: { field: ({ date }) => date as Date, label: "Date" },
  ySeries: [
    { field: ({ sales }) => sales as number, color: "#1f77b4", label: "Sales" },
    { field: ({ cost }) => cost as number, color: "#ff7f0e", label: "Cost" },
  ],
});

chart.renderXAxis("%d %b");
chart.renderYAxis();
chart.renderSeries();
chart.renderLegend();
chart.renderChartTitle("Sales and Cost Over Time");
chart.renderYAxisLabel("Sales");
chart.renderXAxisLabel("Date");

// Print the entire chart HTML (including the <figure> container) to the console
console.log("Chart HTML:\n", node.html);
```

### How does this work? 🛠️

- The `container` option sets up a `<figure>` element as the root for your chart, making it easy to style and embed in your app.
- The `styles` option injects custom CSS for the figure and SVG, so your chart looks great out of the box.
- The `console.log(node.html)` statement prints the full HTML, including the styled container and SVG, which is perfect for debugging or exporting your chart.

This approach is ideal for developers who want to integrate D3Snap with other charting libraries and need a flexible, styled container for their visualizations 🎨.
