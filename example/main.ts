import { D3Snap } from "../src/index.ts";
import { TimeChart } from "vizible-cartesian"

// Example 1: Create a simple SVG with a circle
const node1 = new D3Snap();
const svg1 = node1.createSVG(200, 200);
svg1
  .append("circle")
  .attr("cx", 100)
  .attr("cy", 100)
  .attr("r", 80)
  .attr("fill", "skyblue");
console.log("SVG with circle:\n", node1.svgToString);

// Example 2: Create SVG with custom styles
const node2 = new D3Snap({
  styles: "circle { stroke: red; stroke-width: 4; }",
});
const svg2 = node2.createSVG(150, 150);
svg2
  .append("circle")
  .attr("cx", 75)
  .attr("cy", 75)
  .attr("r", 50)
  .attr("fill", "yellow");
console.log("SVG with styled circle:\n", node2.svgToString);

// Example 3: Serialize the DOM to HTML
const node3 = new D3Snap({
  container: /*html*/"<div id='chart'></div>",
  selector: "#chart",
});
const svg3 = node3.createSVG(100, 100);
svg3
  .append("rect")
  .attr("x", 10)
  .attr("y", 10)
  .attr("width", 80)
  .attr("height", 80)
  .attr("fill", "green");
console.log("Serialized HTML:\n", node3.html);

// Example 4: Get chart HTML for a selected element
const node4 = new D3Snap({
  container: /*html*/"<figure><svg></svg></figure>",
  selector: "svg",
});
const svg4 = node4.createSVG(800, 600);

const data = [
  { date: new Date("2023-01-01"), sales: 100, cost: 80 },
  { date: new Date("2023-02-01"), sales: 120, cost: 90 },
  { date: new Date("2023-03-01"), sales: 150, cost: 110 },
  { date: new Date("2023-04-01"), sales: 170, cost: 130 },
  { date: new Date("2023-05-01"), sales: 200, cost: 150 },
];

const chart = new TimeChart(data, {
  xSerie: { key: "date" },
  ySeries: [
    { key: "sales", name: "Sales", color: "blue" },
    { key: "cost", name: "Cost", color: "orange" },
  ],
});

chart.renderSeries(svg4);
console.log("Chart HTML:\n", node4.html);
