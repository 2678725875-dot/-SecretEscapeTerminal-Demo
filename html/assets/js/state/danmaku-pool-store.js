let danmakuPool = ['System Booting...', 'Aesthetic of Order', 'Welcome Kezhe'];

export function getDanmakuPool() {
    return danmakuPool;
}

export function appendDanmaku(text) {
    danmakuPool.push(text);
}

export function mergeDanmakuPool(serverData) {
    if (serverData && serverData.length > 0) {
        danmakuPool = [...new Set([...danmakuPool, ...serverData])];
    }
}
