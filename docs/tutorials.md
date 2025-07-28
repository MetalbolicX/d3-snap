# Tutorial

This tutorial will guide you through the basics of using the D3Snap library to create and manipulate SVG elements in a web application.

## Getting Started

To get started with D3Snap, you'll need to install the library and set up a basic HTML page.

1. **Installation**

   You can install D3Snap via npm:

   ```bash
   npm install d3-snap
   ```

2. **Basic Usage**

   Here's a simple example of how to create an SVG element using D3Snap:

   ```typescript
   import { D3Snap } from "d3-snap";

   const node = new D3Snap();
   const svg = node.createSVG(200, 200);
   svg.append("circle").attr("cx", 100).attr("cy", 100).attr("r", 80).attr("fill", "skyblue");

   console.log(node.svgToString());
   ```

## Creating SVG Elements

D3Snap makes it easy to create various SVG elements. You can create shapes like rectangles, circles, and lines with just a few lines of code.

### Example: Creating a Rectangle

```typescript
const rect = svg.append("rect").attr("x", 10).attr("y", 10).attr("width", 80).attr("height", 80).attr("fill", "green");
```

### Example: Creating a Line

```typescript
const line = svg.append("line").attr("x1", 0).attr("y1", 0).attr("x2", 200).attr("y2", 200).attr("stroke", "black");
```

## Styling SVG Elements

You can apply styles to your SVG elements using CSS. D3Snap allows you to define styles directly in the constructor.

### Example: Custom Styles

```typescript
const node = new D3Snap({
   styles: "circle { stroke: red; stroke-width: 4; }",
});
```

## Serialization

D3Snap provides methods to serialize your SVG elements to HTML or string format.

### Example: Get SVG as String

```typescript
const svgString = node.svgToString;
```

### Example: Get HTML

```typescript
const html = node.html;
```

## Working with Other Libraries

D3Snap can be integrated with other libraries like [`vizible-cartesian`](https://github.com/MetalbolicX/vizible-cartesian) that only needs a svg container for advanced data visualizations.

```typescript
import { D3Snap } from "d3-snap";
import { TimeChart } from "vizible-cartesian";

const node = new D3Snap();
const svg = node.createSVG(800, 600);

cconst data = [
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
console.log("Chart HTML:\n", node.html);
```
