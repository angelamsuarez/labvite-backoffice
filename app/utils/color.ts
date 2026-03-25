/**
 * Convert a hex color string to a normalized RGB tuple [0–1].
 */
export function hexToRgb(hex: string): [number, number, number] {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? [
        parseInt(result[1], 16) / 255,
        parseInt(result[2], 16) / 255,
        parseInt(result[3], 16) / 255,
      ]
    : [0, 0, 0];
}

/**
 * Recursively recolor every colour value inside a Lottie JSON object.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function recolorLottie(obj: any, targetColor: [number, number, number]): any {
  if (Array.isArray(obj)) {
    return obj.map((item) => recolorLottie(item, targetColor));
  } else if (obj && typeof obj === 'object') {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const updated: any = {};
    for (const key in obj) {
      if (key === 'c' && Array.isArray(obj[key]) && obj[key].length >= 3) {
        updated[key] = [...targetColor, obj[key][3] !== undefined ? obj[key][3] : 1];
      } else if (
        key === 'k' &&
        Array.isArray(obj[key]) &&
        obj[key].length >= 3 &&
        typeof obj[key][0] === 'number'
      ) {
        if (obj[key].length === 4 && obj[key][3] !== undefined) {
          updated[key] = [...targetColor, obj[key][3]];
        } else {
          updated[key] = recolorLottie(obj[key], targetColor);
        }
      } else {
        updated[key] = recolorLottie(obj[key], targetColor);
      }
    }
    return updated;
  }
  return obj;
}
