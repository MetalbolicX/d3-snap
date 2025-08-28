import { defineConfig } from "tsdown";

export default defineConfig({
  entry: ["src/index.ts"],
  platform: "node",
  format: ["esm", "cjs"],
  external: ["d3", "jsdom"],
  dts: true,
  minify: true,
  fixedExtension: true
});
