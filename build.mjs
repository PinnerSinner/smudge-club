// Bundles src/ into assets/app.js. `npm run build` once, `npm run dev` to watch + serve.
import * as esbuild from 'esbuild';

const opts = {
  entryPoints: ['src/main.js'],
  bundle: true,
  format: 'iife',
  target: 'es2020',
  outfile: 'assets/app.js',
  minify: !process.argv.includes('--serve'),
  sourcemap: process.argv.includes('--serve'),
  logLevel: 'info',
  // Embedded rather than linked: a file image would taint WebGL textures when index.html is double-clicked.
  loader: { '.png': 'dataurl' },
};

if (process.argv.includes('--serve')) {
  const ctx = await esbuild.context(opts);
  await ctx.watch();
  const { port } = await ctx.serve({ servedir: '.', port: 5199 });
  console.log(`Serving on http://localhost:${port}`);
} else {
  await esbuild.build(opts);
}
