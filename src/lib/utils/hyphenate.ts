const SOFT_HYPHEN = "\u00AD";
const VOWELS = "aeiou";
const DIGRAPHS = new Set(["ng", "ny", "sy", "kh", "gh"]);
const MIN_LEFT = 3;
const MIN_RIGHT = 3;
const MIN_WORD = 6;

const isVowel = (ch: string) => VOWELS.includes(ch);

function breakPoints(word: string): number[] {
  const lower = word.toLowerCase();
  const n = lower.length;
  const points: number[] = [];

  let i = 0;
  while (i < n) {
    if (isVowel(lower[i])) {
      i++;
      continue;
    }
    const s = i;
    while (i < n && !isVowel(lower[i])) i++;
    const e = i;

    if (s === 0 || e >= n) continue;

    const cluster = lower.slice(s, e);
    let at: number;
    if (cluster.length === 1) {
      at = s; // V-KV
    } else if (cluster.length === 2) {
      at = DIGRAPHS.has(cluster) ? s : s + 1;
    } else {
      at = DIGRAPHS.has(cluster.slice(0, 2)) ? s + 2 : s + 1;
    }

    if (at >= MIN_LEFT && n - at >= MIN_RIGHT) points.push(at);
  }
  return points;
}

function hyphenateWord(word: string): string {
  if (word.length < MIN_WORD || !/^\p{Lu}?\p{Ll}+$/u.test(word)) return word;

  const points = breakPoints(word);
  if (points.length === 0) return word;

  let out = "";
  let prev = 0;
  for (const p of points) {
    out += word.slice(prev, p) + SOFT_HYPHEN;
    prev = p;
  }
  return out + word.slice(prev);
}

export function softHyphenate(text: string, locale: string): string {
  if (locale !== "id" || !text) return text;
  return text.replace(/\p{L}+/gu, hyphenateWord);
}
