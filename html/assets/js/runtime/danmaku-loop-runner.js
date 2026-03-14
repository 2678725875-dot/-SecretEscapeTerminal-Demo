import { DANMAKU_LOOP_INTERVAL_MS } from '../config/constants.js';
import { createDanmaku } from '../ui/danmaku-renderer.js';

export function startInfiniteLoop(container, getPool) {
    setInterval(() => {
        const pool = getPool();
        if (pool.length > 0) {
            const msg = pool[Math.floor(Math.random() * pool.length)];
            createDanmaku(container, msg);
        }
    }, DANMAKU_LOOP_INTERVAL_MS);
}
