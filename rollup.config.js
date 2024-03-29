import svelte from 'rollup-plugin-svelte'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import { terser } from 'rollup-plugin-terser'
import scss from 'rollup-plugin-scss'
import sveltePreprocess from 'svelte-preprocess'
import css from 'rollup-plugin-css-only';
import sass from 'sass';

const production = !process.env.ROLLUP_WATCH

export default {
	input: 'src/main.js',
	output: {
		sourcemap: true,
		format: 'iife',
		name: 'app',
		file: 'public/build/bundle.js'
	},
	plugins: [
		svelte({
      include: 'src/**/*.svelte',
      preprocess: sveltePreprocess({
        scss: {
          prependData: '@import "src/styles/_variables.scss";'
        }
      }),
      compilerOptions: {
        // enable run-time checks when not in production
        dev: !production,
      }
		}),


    // we'll extract any component CSS out into
    // a separate file - better for performance
    css({ output: 'bundle.css' }),

		// If you have external dependencies installed from
		// npm, you'll most likely need these plugins. In
		// some cases you'll need additional configuration -
		// consult the documentation for details:
		// https://github.com/rollup/plugins/tree/master/packages/commonjs
		resolve({
			browser: true,
			dedupe: ['svelte']
		}),

    commonjs(),

    scss({ sass, output: 'public/build/global.css' }),

		// If we're building for production (npm run build
		// instead of npm run dev), minify
		production && terser()
	],
	watch: {
		clearScreen: false
	}
}
