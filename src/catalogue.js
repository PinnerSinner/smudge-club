// The rack. Every toy is a canvas, and the notes pencilled on the back are its how-to-use.
// Rename the site by changing SITE: everything (covers, discs, page title) reads from it.

import dripFeed from './toys/drip-feed.js';
import goldenRepair from './toys/golden-repair.js';
import sediment from './toys/sediment.js';
import endpaper from './toys/endpaper.js';
import steamedUp from './toys/steamed-up.js';
import hallOfMirrors from './toys/hall-of-mirrors.js';
import wallpaperGroup from './toys/wallpaper-group.js';
import wordsmear from './toys/wordsmear.js';
import rightAngles from './toys/right-angles.js';
import dontLift from './toys/dont-lift.js';
import twinDials from './toys/twin-dials.js';
import raked from './toys/raked.js';
import squint from './toys/squint.js';
import scratchTrack from './toys/scratch-track.js';
import highlyStrung from './toys/highly-strung.js';
import lowRes from './toys/low-res.js';
import wordWheel from './toys/word-wheel.js';
import spinCycle from './toys/spin-cycle.js';
import wetOnWet from './toys/wet-on-wet.js';
import foldHere from './toys/fold-here.js';
import leadlight from './toys/leadlight.js';
import longExposure from './toys/long-exposure.js';
import slowGrowth from './toys/slow-growth.js';

export const SITE = { name: 'Smudge Club', prefix: 'SC' };
export const MAKER = { name: 'Marcoverse', url: 'https://marcoverse.co.uk' };

const T = (id, title, genre, glow, accent, blurb, tracks, mount) => ({ id, title, genre, glow, accent, blurb, tracks, mount });

export const RELEASES = [
  T('drip-feed', 'Drip Feed', 'Wet enamel, thrown', '#e8452d', '#e8452d',
    'Fling gloss enamel at a floor-bound canvas. Speed makes spatter, stillness makes pools, and the light follows your hand across the wet paint.',
    ['Fling (drag fast)', 'Pool (hold still)', 'Run (tilt the canvas)', 'Change the tin', 'Wait for it to dry'], dripFeed),
  T('golden-repair', 'Golden Repair', 'Ceramics, broken on purpose', '#c9962e', '#d9a93a',
    'Strike a glazed bowl until it gives, gather the pieces, and watch every seam fill with molten metal. It ends up better than it started.',
    ['Strike (tap the bowl)', 'Gather (drag pieces home)', 'Pour the seam', 'Choose your metal', 'Throw a new bowl'], goldenRepair),
  T('sediment', 'Sediment', 'Falling grains, glass bottle', '#d98a3d', '#e29a4c',
    'Pour coloured sand into a bottle, then do what the seaside craftsmen do: push a stick down the glass to pull the layers into mountains.',
    ['Pour (hold to fall)', 'Poke (stick down the side)', 'Tilt the bottle', 'Swap the sand', 'Cork it'], sediment),
  T('endpaper', 'Endpaper', 'Ink on water, lifted', '#2f6f8f', '#3b8bb3',
    'Float ink on a still bath, drag a comb through it, then lay down the paper and lift off a print, like the inside cover of an old hardback.',
    ['Drop (tap the water)', 'Rake (drag the comb)', 'Stir (swirl)', 'Lay the paper', 'Skim and start again'], endpaper),
  T('steamed-up', 'Steamed Up', 'Finger on cold glass', '#3a5f8a', '#6c9bd2',
    'A window on a wet night. Draw with your finger and the city comes back into focus. Drops gather, run, and the fog creeps back in.',
    ['Wipe (draw on the glass)', 'Run (drops find their way)', 'Breathe (fog it again)', 'Change the view', 'Leave it to mist'], steamedUp),
  T('hall-of-mirrors', 'Hall of Mirrors', 'Light, multiplied', '#7a3df0', '#a06bff',
    'Every stroke is caught by a ring of mirrors and thrown back in glowing colour. Set the whole thing turning and paint on the wheel.',
    ['Draw (one becomes many)', 'Add mirrors', 'Reflect or rotate', 'Set it turning', 'Change the light'], hallOfMirrors),
  T('wallpaper-group', 'Wallpaper Group', 'Seventeen ways to repeat', '#2f9e77', '#38b58a',
    'Draw in one cell and the whole plane answers. Slide, turn and glide through the symmetry groups that wallpaper has been quietly using for centuries.',
    ['Draw (in any tile)', 'Pick a symmetry', 'Show the seams', 'Scale the tile', 'Choose the paper'], wallpaperGroup),
  T('wordsmear', 'Wordsmear', 'Poems along a wet line', '#c23b5a', '#e0557a',
    'The brush is loaded with language. Write your own line and paint with it, as letters swell when you slow down and thin when you hurry.',
    ['Type your verse', 'Paint (letters follow)', 'Slow down to shout', 'Pick a typeface', 'Turn the page'], wordsmear),
  T('right-angles', 'Right Angles', 'Neoplastic boogie', '#d8312c', '#e23a33',
    'Split the plane, fill the rooms with primaries, then press play: small coloured cars set off down your black lines and the painting starts to swing.',
    ['Split (drag across a room)', 'Fill (tap a room)', 'Nudge the lines', 'Boogie (press play)', 'Whitewash'], rightAngles),
  T('dont-lift', "Don't Lift", 'One continuous line', '#b8a98c', '#c9b48a',
    'You get one line. It starts when you touch down and ends for good when you let go. Then the pen plays your hesitation back to you.',
    ['Touch down', 'Keep going', "Don't lift", 'Watch the replay', 'Take a new sheet'], dontLift),
  T('twin-dials', 'Twin Dials', 'Two knobs, one stubborn line', '#27b36a', '#35d07e',
    'One dial runs left and right, the other up and down. Diagonals take patience. Curves take practice. Shake the whole unit to start again.',
    ['Left dial (across)', 'Right dial (up and down)', 'Arrow keys work too', 'Switch the screen', 'Shake it clean'], twinDials),
  T('raked', 'Raked', 'Dry garden, low sun', '#a89878', '#c2b08c',
    'Comb pale gravel into furrows, set down your stones and let the ripples wrap around them. Drag the sun across the sky to rake the light as well.',
    ['Rake (drag through)', 'Set a stone', 'Ripple (tap a stone)', 'Change the tines', 'Move the sun'], raked),
  T('squint', 'Squint', 'Optical mixing, dot by dot', '#e0a526', '#efb93a',
    'The brush lays down evenly spaced dots of pure colour. Up close they are confetti. Press Squint and your eyes do the mixing.',
    ['Dab (dots keep their distance)', 'Layer two colours', 'Change the dot', 'Squint', 'Count your dots'], squint),
  T('scratch-track', 'Scratch Track', 'Black wax over foil', '#6b3df0', '#8b5cf6',
    'Scrape through the black and find the shimmering foil underneath. Curls of wax fall away, and the colours shift as your hand moves.',
    ['Scrape (black comes off)', 'Change the nib', 'Pick the foil', 'Blow the flakes', 'Wax it over'], scratchTrack),
  T('highly-strung', 'Highly Strung', 'Pins, thread, pitch', '#c8486e', '#e65f87',
    'Hammer in pins and wind thread between them, then pluck it. Every string rings at a pitch set by its length, so your picture is also an instrument.',
    ['Pin (tap to place)', 'Wind (drag pin to pin)', 'Pluck (flick a thread)', 'Times tables', 'Change the thread'], highlyStrung),
  T('low-res', 'Low Res', 'Sixteen colours, four frames', '#2d8fd5', '#3fa7f0',
    'A tiny grid and a limited palette. Then the twist: flip through four frames with onion skins and your drawing starts to walk.',
    ['Pixel (click the grid)', 'Fill and dither', 'Mirror mode', 'Onion skin', 'Play the flipbook'], lowRes),
  T('word-wheel', 'Word Wheel', 'Language, in the round', '#b44ac0', '#cf62dc',
    'Paint with words, and the words are mirrored around the centre. Small letters build into rose windows you can almost read.',
    ['Type the mantra', 'Paint from the middle', 'Add spokes', 'Mirror the letters', 'Change the ink'], wordWheel),
  T('spin-cycle', 'Spin Cycle', 'Paint on a turntable', '#e0308a', '#f04a9c',
    'Fairground spin art. Squeeze paint onto a spinning card and it races outward in comet tails. Hit the brake to see what you made.',
    ['Squeeze (hold on the card)', 'Throttle (speed it up)', 'Reverse', 'Brake', 'New card'], spinCycle),
  T('wet-on-wet', 'Wet on Wet', 'Ink meets damp paper', '#55606a', '#8a97a3',
    'Load a brush with sumi ink and touch it to damp paper. The ink crawls off along the fibres on its own, and you are only partly in charge.',
    ['Touch (ink blooms)', 'Wet the paper', 'Load the brush', 'Dry it off', 'Fresh sheet'], wetOnWet),
  T('fold-here', 'Fold Here', 'The inkblot test', '#3c3c46', '#9a9aa8',
    'Dab ink on one half of the sheet, fold it shut, and press. Open it up and a stranger creature looks back. The analyst has notes.',
    ['Dab (on the left)', 'Fold and press', 'Open it up', 'Read the verdict', 'Blot again'], foldHere),
  T('leadlight', 'Leadlight', 'Stained glass, backlit', '#2a7fbf', '#3a9ae0',
    'Draw the lead, pour coloured glass into the gaps, then drag the sun across the window and watch it throw colour.',
    ['Lead (draw the lines)', 'Glaze (tap a pane)', 'Pick the glass', 'Move the sun', 'Reglaze'], leadlight),
  T('long-exposure', 'Long Exposure', 'Sparkler on a slow shutter', '#e8892b', '#f59e3f',
    'Hold the shutter open and write on the dark with a sparkler. Light stacks up, trails hang in the air, and nothing goes away until you close it.',
    ['Write (light stacks)', 'Change the sparkler', 'Hold the shutter', 'Add sparks', 'Close the shutter'], longExposure),
  T('slow-growth', 'Slow Growth', 'Two chemicals, one reef', '#1fa8a0', '#2cc4ba',
    'Seed a dish with a touch and two reacting chemicals grow coral, fingerprints and mitosis from nothing. You are gardening a mathematical equation.',
    ['Seed (touch the dish)', 'Pick a species', 'Change the dye', 'Speed the clock', 'Sterilise'], slowGrowth),
];

// How each toy sounds: `timbre` is the noise under your hand, `bed` is the room around it.
const SOUND = {
  'drip-feed': ['bristle', 'studio'], 'golden-repair': ['none', 'studio'], sediment: ['sand', 'wind'], endpaper: ['water', 'water'],
  'steamed-up': ['glass', 'rain'], 'hall-of-mirrors': ['shimmer', 'night'], 'wallpaper-group': ['pencil', 'studio'], wordsmear: ['pencil', 'studio'],
  'right-angles': ['none', 'studio'], 'dont-lift': ['pencil', 'studio'], 'twin-dials': ['none', 'hum'], raked: ['sand', 'wind'],
  squint: ['chalk', 'studio'], 'scratch-track': ['scratch', 'studio'], 'highly-strung': ['none', 'night'], 'low-res': ['none', 'hum'],
  'word-wheel': ['pencil', 'night'], 'spin-cycle': ['bristle', 'studio'], 'wet-on-wet': ['water', 'water'], 'fold-here': ['bristle', 'studio'],
  leadlight: ['glass', 'studio'], 'long-exposure': ['sizzle', 'night'], 'slow-growth': ['water', 'water'],
};

RELEASES.forEach((r, i) => {
  r.index = i;
  r.cat = `${SITE.prefix} ${String(i + 1).padStart(3, '0')}`;
  [r.timbre, r.bed] = SOUND[r.id];
});
