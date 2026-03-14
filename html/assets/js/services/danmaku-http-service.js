import { SERVER_URL } from '../config/constants.js';

export async function postDanmaku(text) {
    await fetch(SERVER_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: text })
    });
}

export async function fetchDanmakuList() {
    const res = await fetch(SERVER_URL + '?t=' + new Date().getTime());
    return res.json();
}
