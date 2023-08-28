import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";
import postcss from "rollup-plugin-postcss";
import image from "@rollup/plugin-image";
import json from "@rollup/plugin-json";
import scss from "rollup-plugin-scss";
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import packageJson from "./package.json" assert { type: "json" };


export default [
  {
    input: "src/index.tsx",
    output: [
      {
        file: packageJson.main,
        format: "cjs",
        sourcemap: true,
        inlineDynamicImports: true
      },
      {
        file: packageJson.module,
        format: "esm",
        sourcemap: true,
        inlineDynamicImports: true
      },
    ],
    plugins: [
      resolve({
        preferBuiltins: true
      }),
      peerDepsExternal(),
      commonjs(),
      typescript({ tsconfig: "./tsconfig.json" }),
      postcss(),
      image(),
      json(),
      scss({
        include: ["./src/assets/styles/*.scss"]
      }),
    ],
  },
  {
    input: "dist/esm/types/index.d.ts",
    output: [{ file: "dist/index.d.ts", format: "esm" }],
    plugins: [dts()],
    external: [/\.css$/,/\.scss$/],
  },
];