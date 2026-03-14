import { DANMAKU_TRACK_ROWS } from '../config/constants.js';

export function createDanmaku(container, text) {
    if (!text) return;

    const el = document.createElement('div');
    el.className = 'track';

    const isGlitch = Math.random() < 0.2;
    if (isGlitch) {
        el.innerHTML = `<span class="glitch-text">${text}</span>`;
    } else {
        el.innerText = text;
    }

    el.style.top = DANMAKU_TRACK_ROWS[Math.floor(Math.random() * DANMAKU_TRACK_ROWS.length)] + 'px';
    const duration = 12 + Math.random() * 6;
    el.style.animation = `scrollDanmaku ${duration}s linear forwards`;

    container.appendChild(el);
    setTimeout(() => el.remove(), duration * 1000);
}
