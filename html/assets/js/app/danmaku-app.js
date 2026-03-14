import { DANMAKU_SYNC_INTERVAL_MS } from '../config/constants.js';
import { postDanmaku, fetchDanmakuList } from '../services/danmaku-http-service.js';
import { createDanmaku } from '../ui/danmaku-renderer.js';
import { getDanmakuPool, appendDanmaku, mergeDanmakuPool } from '../state/danmaku-pool-store.js';
import { startInfiniteLoop } from '../runtime/danmaku-loop-runner.js';
import { bindSendEvents } from '../ui/send-events-binder.js';

export function bootstrapDanmakuApp() {
    const container = document.getElementById('danmakuContainer');
    const input = document.getElementById('danmakuInput');
    const sendBtn = document.getElementById('sendBtn');

    async function sendDanmaku() {
        const text = input.value.trim();
        if (!text) return;

        createDanmaku(container, text);
        appendDanmaku(text);
        input.value = '';

        try {
            await postDanmaku(text);
            console.log('Transmission sent.');
        } catch (e) {
            console.error('Transmission failed:', e);
        }
    }

    async function syncWithServer() {
        try {
            const data = await fetchDanmakuList();
            mergeDanmakuPool(data);
        } catch (e) {
            console.log('Server Unreachable, using local cache.');
        }
    }

    bindSendEvents(input, sendBtn, sendDanmaku);

    (async () => {
        await syncWithServer();
        startInfiniteLoop(container, getDanmakuPool);
        setInterval(syncWithServer, DANMAKU_SYNC_INTERVAL_MS);
    })();
}
