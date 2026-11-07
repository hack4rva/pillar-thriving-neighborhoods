/**
 * Colors for the WebGL scene.
 *
 * The DOM is themed by CSS custom properties in styles/main.css. Three.js
 * materials and SpriteText cannot read those, so the canvas palette lives here
 * and is kept in sync with the stylesheet by hand. Change one, change both.
 */
export const CANVAS = {
  /** Matches --bg so the canvas and the surrounding chrome read as one surface. */
  background: '#f7f9fc',
  /** Fog of War bleaches the canvas rather than darkening it. */
  backgroundFog: '#ffffff',

  labelText: '#1b2432',
  labelTextSelected: '#0b1220',
  labelBackground: 'rgba(255,255,255,0.72)',
  labelBackgroundSelected: 'rgba(255,255,255,0.94)',

  /** Fog of War: unverified material washes out toward the paper. */
  hazeNode: '#c3ccda',
  hazeLink: '#cbd3e0',
  /** Disputed stays loud in both themes — it is an alarm, not a shade. */
  disputed: '#c62828',
  disputedFill: '#e8a9a3',
  disputedGlow: '#7a1010',

  /**
   * Undocumented endpoints. On a dark canvas these were holes; on a light one
   * they are pale ghosts wearing a violet aura, so they still read as the
   * strangest thing on screen without becoming the darkest.
   */
  voidFill: '#ddd2fb',
  voidGlow: '#7c5cff',
  voidHalo: '#b7a2ff',

  questionMarker: '#a15c00',
  questionStroke: '#fff8e8',

  moneyParticle: '#1f8a3f',

  tooltipBackground: '#ffffff',
  tooltipBorder: '#d5dceb',
  tooltipText: '#1b2432',
  tooltipMuted: '#5b6980',
  tooltipMoney: '#177a37',
} as const;
