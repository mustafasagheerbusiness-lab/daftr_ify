export const EASE = {
  outQuart: [0.25, 1, 0.5, 1],
  outExpo: [0.16, 1, 0.3, 1],
  inOutQuart: [0.76, 0, 0.24, 1],
} satisfies Record<string, [number, number, number, number]>;

export const DURATION = {
  fast: 0.2,
  base: 0.5,
  slow: 0.8,
  cine: 1.2,
} as const;

export const VIEWPORT = { once: true, amount: 0.3 } as const;