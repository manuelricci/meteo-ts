import typescript from "@rollup/plugin-typescript";

export default {
	input: "src/app.ts",
	output: {
		file: "dist/main.js",
		format: "iife",
		sourcemap: true,
	},
	plugins: [typescript()]
}
