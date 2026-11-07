# Smudge Club

Made by [Marcoverse](https://marcoverse.co.uk).

**Live:** https://smudge.marcoverse.co.uk

A rack of painted canvases you can pick up and paint on. Scroll the rack, drag a canvas to turn it over and read the notes on the back, and click to step up and paint.

## Run it

Double-click `index.html`: the bundle in `assets/` works straight from disk, so it needs no server. Everything works that way except Bring it to life.

To work on it:

```bash
npm install
npm run dev
```

That watches `src/` and serves the site on http://localhost:5199. `npm run build` makes the minified bundle.

## Deploying

GitHub Pages serves this repo straight from the root of `main`, so the built bundle is committed. Run `npm run build` before you push, or the live site won't change. The `CNAME` file holds the hostname, and the DNS needs a `CNAME` record from `smudge` to `pinnersinner.github.io`.

## Bring it to life (Higgsfield)

This turns a finished painting into a five second video using Higgsfield's image-to-video API. Higgsfield requires the key to stay on a server, so this needs `server.mjs`. GitHub Pages cannot hold a secret, so the button only appears when the site runs locally.

1. Create a key at https://console.higgsfield.ai and add some balance. The API balance is separate from a Higgsfield plan.
2. Copy `.env.example` to `.env` and paste in the key ID and secret.
3. Run `npm start` and open http://localhost:5200.

Each video costs real money, so the server stops at `HF_DAILY_LIMIT` videos a day (20 by default). The server binds to your own machine only. Before putting it on the public internet, add proper sign-in, or any visitor could spend your balance.

Paintings are uploaded to Higgsfield, which keeps files for about seven days.

## Rename the site

The name lives in one place: `SITE` at the top of `src/catalogue.js`, plus the `<title>` in `index.html`.

## How it fits together

| Path | What it does |
| --- | --- |
| `src/catalogue.js` | Every canvas: title, blurb, colours, the notes on its back, and how it sounds |
| `src/shelf.js` | The three.js rack, palettes and the step-up animation |
| `src/backdrop.js` | The far-off animated background |
| `src/wipe.js` | The painted transition between the rack and a toy |
| `src/sound.js` | All sound, synthesised live: interface, brush noise, one-shots and room ambience |
| `src/covers.js` | Every painting and the back of each canvas, drawn in code |
| `src/alive.js`, `server.mjs` | Bring it to life, and the small server that holds the Higgsfield key |
| `src/main.js` | Page shell, routing (`#/toy-id`), saving and hanging |
| `src/kit.js` | What each toy is built on: surfaces, pointer input, dock controls, undo |
| `src/gl.js` | Small WebGL2 helpers and the relief lighting shader |
| `src/toys/` | One file per toy |

## Add a toy

1. Create `src/toys/my-toy.js` exporting `mount(ctx)`. Use `ctx.surface()` for a canvas, `ctx.ui` for dock controls, and set `ctx.snapshot` so saving and hanging work.
2. Add it to `RELEASES` and `SOUND` in `src/catalogue.js`.
3. Add a painting to `ART` in `src/covers.js`, keyed by the toy's id.

## Licence and assets

Code: all rights reserved by the author unless a licence file says otherwise. The Marcoverse name and logo are Marco's own, so please don't reuse them. Fonts are open source under the SIL Open Font License, via Fontsource.

## Hanging your work

"Hang it" stores a small JPEG of your painting in the browser's local storage, and it then takes that canvas's place on the rack. It stays in that browser only.
