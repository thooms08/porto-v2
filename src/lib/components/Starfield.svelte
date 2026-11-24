<script lang="ts">
	import { onMount } from 'svelte';

	let canvas: HTMLCanvasElement | null = $state(null);

	onMount(() => {
		if (!canvas) return;
		const ctx = canvas.getContext('2d');
		if (!ctx) return;

		const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

		let width = 0;
		let height = 0;
		let raf = 0;
		let lastNow = 0;
		let time = 0; // detik berjalan (dipakai semua animasi)

		// ── Parallax mouse (halus, diinterpolasi) ──
		let mouseTX = 0;
		let mouseTY = 0;
		let mouseX = 0;
		let mouseY = 0;

		// Putaran galaksi: seluruh bintang berputar sangat pelan mengelilingi pusat layar
		const GALAXY_SPIN = 0.011; // rad/detik

		interface Star {
			x: number;
			y: number;
			z: number; // kedalaman 0..1 (1 = paling dekat → lebih besar & cepat)
			r: number;
			vx: number; // px/detik
			vy: number;
			wobbleAmp: number; // px/detik, membuat jalur bergelombang (kesana kemari)
			wobbleFreq: number;
			wobblePhase: number;
			wobblePhase2: number;
			baseAlpha: number;
			twinkleSpeed: number; // rad/detik
			twinklePhase: number;
			color: string;
		}

		interface Nebula {
			cx: number; cy: number;
			rw: number; rh: number;
			hue: number; alpha: number;
			// gerak melayang pelan
			driftX: number; driftY: number;
			speed: number; phase: number;
		}

		interface Shooting {
			x: number; y: number;
			vx: number; vy: number;
			life: number; maxLife: number;
			len: number;
		}

		const STAR_COLORS = [
			'232,235,248',
			'200,215,255',
			'255,245,220',
			'180,200,255',
			'255,255,255',
			'200,185,255',
		];

		const NEBULA_DEFS: Nebula[] = [
			{ cx: 0.10, cy: 0.15, rw: 0.35, rh: 0.30, hue: 230, alpha: 0.055, driftX: 0.05, driftY: 0.04, speed: 0.07, phase: 0.0 },
			{ cx: 0.85, cy: 0.70, rw: 0.38, rh: 0.32, hue: 255, alpha: 0.048, driftX: 0.05, driftY: 0.05, speed: 0.06, phase: 1.7 },
			{ cx: 0.50, cy: 0.42, rw: 0.28, rh: 0.26, hue: 240, alpha: 0.035, driftX: 0.06, driftY: 0.04, speed: 0.08, phase: 3.1 },
			{ cx: 0.92, cy: 0.12, rw: 0.22, rh: 0.20, hue: 265, alpha: 0.040, driftX: 0.04, driftY: 0.05, speed: 0.09, phase: 4.6 },
			{ cx: 0.22, cy: 0.88, rw: 0.28, rh: 0.22, hue: 220, alpha: 0.038, driftX: 0.05, driftY: 0.04, speed: 0.07, phase: 5.9 },
		];

		let stars: Star[] = [];
		let shooters: Shooting[] = [];
		let nextShooterAt = 3;

		function buildStars() {
			const count = width < 768 ? 90 : 190;
			stars = [];
			for (let i = 0; i < count; i++) {
				// z^2 → lebih banyak bintang jauh (kecil), sedikit bintang dekat (besar)
				const z = Math.pow(Math.random(), 1.6);
				const angle = Math.random() * Math.PI * 2;
				const speed = (4 + Math.random() * 10) * (0.35 + z * 1.1); // px/detik
				stars.push({
					x: Math.random() * width,
					y: Math.random() * height,
					z,
					r: 0.4 + z * 1.5,
					vx: Math.cos(angle) * speed,
					vy: Math.sin(angle) * speed,
					wobbleAmp: 3 + Math.random() * 9 * (0.4 + z),
					wobbleFreq: 0.15 + Math.random() * 0.45, // siklus ~2–7 detik
					wobblePhase: Math.random() * Math.PI * 2,
					wobblePhase2: Math.random() * Math.PI * 2,
					baseAlpha: 0.3 + Math.random() * 0.5 + z * 0.1,
					twinkleSpeed: 0.8 + Math.random() * 2.6,
					twinklePhase: Math.random() * Math.PI * 2,
					color: STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)],
				});
			}
		}

		function resize() {
			if (!canvas) return;
			const dpr = Math.min(window.devicePixelRatio || 1, 2);
			width = window.innerWidth;
			height = window.innerHeight;
			canvas.width = Math.round(width * dpr);
			canvas.height = Math.round(height * dpr);
			canvas.style.width = width + 'px';
			canvas.style.height = height + 'px';
			ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
			buildStars();
			if (prefersReduced) drawFrame(0);
		}

		function onMouseMove(e: MouseEvent) {
			mouseTX = (e.clientX / width - 0.5) * 2;
			mouseTY = (e.clientY / height - 0.5) * 2;
		}

		function spawnShooter() {
			const fromLeft = Math.random() > 0.5;
			const angle = (Math.random() * 20 + 15) * (Math.PI / 180); // miring turun
			const speed = 520 + Math.random() * 380;
			shooters.push({
				x: fromLeft ? Math.random() * width * 0.5 : width * 0.5 + Math.random() * width * 0.5,
				y: Math.random() * height * 0.45,
				vx: Math.cos(angle) * speed * (fromLeft ? 1 : -1),
				vy: Math.sin(angle) * speed,
				life: 0,
				maxLife: 0.9 + Math.random() * 0.5,
				len: 90 + Math.random() * 90,
			});
		}

		function drawNebulae() {
			for (const n of NEBULA_DEFS) {
				// melayang pelan + "bernapas"
				const cx = (n.cx + Math.sin(time * n.speed + n.phase) * n.driftX) * width;
				const cy = (n.cy + Math.cos(time * n.speed * 0.8 + n.phase) * n.driftY) * height;
				const breathe = 1 + 0.25 * Math.sin(time * n.speed * 1.6 + n.phase);
				const alpha = n.alpha * breathe;
				const rx = n.rw * width;
				const ry = n.rh * height;
				ctx!.save();
				ctx!.translate(cx, cy);
				ctx!.scale(1, ry / rx);
				const grad = ctx!.createRadialGradient(0, 0, 0, 0, 0, rx);
				grad.addColorStop(0,   `hsla(${n.hue}, 90%, 65%, ${alpha})`);
				grad.addColorStop(0.4, `hsla(${n.hue + 15}, 80%, 55%, ${alpha * 0.6})`);
				grad.addColorStop(1,   `hsla(${n.hue}, 70%, 40%, 0)`);
				ctx!.beginPath();
				ctx!.arc(0, 0, rx, 0, Math.PI * 2);
				ctx!.fillStyle = grad;
				ctx!.fill();
				ctx!.restore();
			}
		}

		function updateStars(dt: number) {
			const cx = width / 2;
			const cy = height / 2;
			const margin = 24;

			for (const s of stars) {
				// Gelombang: arah gerak berbelok pelan → bintang "berkelana" kesana kemari
				const wx = Math.cos(time * s.wobbleFreq + s.wobblePhase) * s.wobbleAmp;
				const wy = Math.sin(time * s.wobbleFreq * 0.85 + s.wobblePhase2) * s.wobbleAmp;

				// Putaran galaksi (komponen tangensial; bintang dekat berputar lebih cepat)
				const spin = GALAXY_SPIN * (0.4 + s.z);
				const sx = -(s.y - cy) * spin;
				const sy = (s.x - cx) * spin;

				s.x += (s.vx + wx + sx) * dt;
				s.y += (s.vy + wy + sy) * dt;

				// Keluar layar → muncul lagi dari sisi seberang (gerak tak berujung)
				if (s.x < -margin) s.x = width + margin;
				else if (s.x > width + margin) s.x = -margin;
				if (s.y < -margin) s.y = height + margin;
				else if (s.y > height + margin) s.y = -margin;
			}
		}

		function drawStars() {
			// parallax mouse: bintang dekat bergeser lebih jauh
			const px = mouseX * 18;
			const py = mouseY * 14;

			for (const s of stars) {
				const x = s.x - px * s.z;
				const y = s.y - py * s.z;

				const tw = Math.sin(time * s.twinkleSpeed + s.twinklePhase);
				const a = Math.max(0.08, Math.min(s.baseAlpha + tw * 0.32, 0.95));
				// ukuran ikut berdenyut tipis supaya terasa hidup
				const r = s.r * (1 + tw * 0.14);

				ctx!.fillStyle = `rgba(${s.color}, ${a.toFixed(3)})`;
				ctx!.beginPath();
				ctx!.arc(x, y, r, 0, Math.PI * 2);
				ctx!.fill();

				// Halo lembut pada bintang terang
				if (s.r > 1.2) {
					ctx!.fillStyle = `rgba(${s.color}, ${(a * 0.12).toFixed(3)})`;
					ctx!.beginPath();
					ctx!.arc(x, y, r * 3.2, 0, Math.PI * 2);
					ctx!.fill();

					// Kilau silang, panjangnya ikut berkedip
					ctx!.strokeStyle = `rgba(${s.color}, ${(a * 0.4).toFixed(3)})`;
					ctx!.lineWidth = 0.6;
					const len = s.r * (2.4 + tw * 1.2);
					ctx!.beginPath();
					ctx!.moveTo(x - len, y); ctx!.lineTo(x + len, y);
					ctx!.moveTo(x, y - len); ctx!.lineTo(x, y + len);
					ctx!.stroke();
				}
			}
		}

		function drawShooters(dt: number) {
			for (let i = shooters.length - 1; i >= 0; i--) {
				const m = shooters[i];
				m.life += dt;
				m.x += m.vx * dt;
				m.y += m.vy * dt;
				const t = m.life / m.maxLife;
				if (t >= 1) { shooters.splice(i, 1); continue; }

				const fade = Math.sin(Math.PI * t); // muncul → terang → hilang
				const mag = Math.hypot(m.vx, m.vy);
				const tx = m.x - (m.vx / mag) * m.len;
				const ty = m.y - (m.vy / mag) * m.len;

				const g = ctx!.createLinearGradient(m.x, m.y, tx, ty);
				g.addColorStop(0, `rgba(235,242,255,${(0.9 * fade).toFixed(3)})`);
				g.addColorStop(1, 'rgba(160,180,255,0)');
				ctx!.strokeStyle = g;
				ctx!.lineWidth = 1.4;
				ctx!.lineCap = 'round';
				ctx!.beginPath();
				ctx!.moveTo(m.x, m.y);
				ctx!.lineTo(tx, ty);
				ctx!.stroke();
			}
		}

		function drawFrame(dt: number) {
			ctx!.clearRect(0, 0, width, height);
			drawNebulae();
			if (!prefersReduced) updateStars(dt);
			drawStars();
			if (!prefersReduced) drawShooters(dt);
		}

		function loop(now: number) {
			// dt dalam detik, dibatasi agar tidak "loncat" setelah tab tidak aktif
			const dt = lastNow ? Math.min((now - lastNow) / 1000, 0.05) : 0;
			lastNow = now;

			if (!document.hidden) {
				time += dt;

				// mouse parallax mengikuti pelan (easing)
				mouseX += (mouseTX - mouseX) * Math.min(1, dt * 2.5);
				mouseY += (mouseTY - mouseY) * Math.min(1, dt * 2.5);

				// bintang jatuh muncul acak tiap beberapa detik
				if (time >= nextShooterAt) {
					spawnShooter();
					nextShooterAt = time + 5 + Math.random() * 9;
				}

				drawFrame(dt);
			}
			raf = requestAnimationFrame(loop);
		}

		resize();
		window.addEventListener('resize', resize, { passive: true });

		if (!prefersReduced) {
			window.addEventListener('mousemove', onMouseMove, { passive: true });
			raf = requestAnimationFrame(loop);
		}

		return () => {
			window.removeEventListener('resize', resize);
			window.removeEventListener('mousemove', onMouseMove);
			cancelAnimationFrame(raf);
		};
	});
</script>

<canvas bind:this={canvas} class="starfield" aria-hidden="true"></canvas>

<style>
	.starfield {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		pointer-events: none;
		z-index: 0;
	}
</style>