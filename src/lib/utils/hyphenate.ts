/**
 * Pemenggalan kata (soft hyphen) untuk teks bahasa Indonesia.
 *
 * Kenapa perlu: `hyphens: auto` di CSS bergantung pada kamus bawaan browser, dan
 * browser umumnya tidak punya kamus bahasa Indonesia. Akibatnya teks rata kiri-kanan
 * (`text-align: justify`) menghasilkan spasi antar kata yang melebar.
 *
 * Fungsi ini menyisipkan soft hyphen (U+00AD) di batas suku kata. Karakter itu tidak
 * terlihat kecuali browser memang memenggal kata di situ, dan diabaikan pembaca layar.
 * Untuk bahasa lain (mis. Inggris) teks dikembalikan apa adanya, karena browser sudah
 * bisa memenggalnya sendiri lewat `hyphens: auto` + atribut `lang`.
 *
 * Aturan suku kata (disederhanakan):
 *   V-KV        ma-kan
 *   V-KK-V      pen-ting   (pecah di antara dua konsonan)
 *   V-[ng|ny|sy|kh|gh]V   ma-nyak (gabungan huruf tidak dipisah)
 *   VKKKV       pecah setelah konsonan pertama (kon-struk-si), atau setelah ng/ny/sy/kh/gh
 *   Deret vokal (ai, au, oi, ...) tidak dipecah.
 */

const SOFT_HYPHEN = '\u00AD';
const VOWELS = 'aeiou';
const DIGRAPHS = new Set(['ng', 'ny', 'sy', 'kh', 'gh']);
const MIN_LEFT = 3; // huruf minimal sebelum tanda pemenggalan
const MIN_RIGHT = 3; // huruf minimal sesudah tanda pemenggalan
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
		// deret konsonan [s, e)
		const s = i;
		while (i < n && !isVowel(lower[i])) i++;
		const e = i;

		// hanya deret di antara dua vokal yang bisa dipecah
		if (s === 0 || e >= n) continue;

		const cluster = lower.slice(s, e);
		let at: number;
		if (cluster.length === 1) {
			at = s; // V-KV
		} else if (cluster.length === 2) {
			at = DIGRAPHS.has(cluster) ? s : s + 1; // V-[ng]V atau VK-KV
		} else {
			at = DIGRAPHS.has(cluster.slice(0, 2)) ? s + 2 : s + 1;
		}

		if (at >= MIN_LEFT && n - at >= MIN_RIGHT) points.push(at);
	}
	return points;
}

function hyphenateWord(word: string): string {
	// lewati singkatan / camelCase / nama teknologi (PostgreSQL, JavaScript, WFH, ...)
	if (word.length < MIN_WORD || !/^\p{Lu}?\p{Ll}+$/u.test(word)) return word;

	const points = breakPoints(word);
	if (points.length === 0) return word;

	let out = '';
	let prev = 0;
	for (const p of points) {
		out += word.slice(prev, p) + SOFT_HYPHEN;
		prev = p;
	}
	return out + word.slice(prev);
}

export function softHyphenate(text: string, locale: string): string {
	if (locale !== 'id' || !text) return text;
	return text.replace(/\p{L}+/gu, hyphenateWord);
}