# d3-snap

<div align="center">
  <img src="./docs/_media/d3-snap.svg" alt="d3-snap Logo" width="200" height="200" />
</div>

> `d3-snap` Don't limit yourself just to the browser. Visualize your data also on the server.

**Supported Versions:**

![d3.js](https://img.shields.io/badge/d3.js->=7.x.x-blue)
![jsdom](https://img.shields.io/badge/jsdom->=26.x.x-blue)

## Features

- Capture d3.js visualizations on the server.
- Easy integration with existing d3.js projects.

## 🚀 Quick Installation

### Download Dependencies

Download the `d3-snap` package from npm:

```sh
npm i d3-snap
```

## 🙌 Hello World Example

Here's a simple example of how to use `d3-snap`:

1. Create a file named `main.mjs` in your `src` folder.
2. Add the following code to `main.mjs`:

```js
import { D3Snap } from "d3-snap";

const node = new D3Snap({
  container: "<section><svg></svg></section>",
  selector: "svg",
});
const svg = node.createSVG(50, 50);
svg
  .append("text")
  .text("Hello, D3!")
  .attr("x", 10)
  .attr("y", 20);

console.log("Svg message: ", node.svgToString);
```

## 📚 Documentation

<div align="center">

  [![view - Documentation](https://img.shields.io/badge/view-Documentation-blue?style=for-the-badge)](https://metalbolicx.github.io/d3-snap/)

</div>

## ✍ Do you want to learn more?

- Learn more about [d3.js](https://d3js.org/).

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Technologies used

<table style="border: none;">
  <tr>
    <td align="center">
      <a href="https://github.com/jsdom/jsdom?tab=readme-ov-file" target="_blank">
        <img src="https://raw.githubusercontent.com/jsdom/jsdom/refs/heads/main/logo.svg" alt="JsDom" width="42" height="42" /><br/>
        <b>JsDom</b><br/>
      </a>
    </td>
    <td align="center">
      <a href="https://d3js.org/" target="_blank">
        <img src="https://upload.wikimedia.org/wikipedia/commons/1/15/Logo_D3.svg" alt="D3.js" width="42" height="42" /><br/>
        <b>D3.js</b><br/>
      </a>
    </td>
  </tr>
</table>

## License

Released under [MIT](/LICENSE) by [@MetalbolicX](https://github.com/MetalbolicX).
