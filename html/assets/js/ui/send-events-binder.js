export function bindSendEvents(input, sendBtn, onSend) {
    sendBtn.addEventListener('click', onSend);
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            onSend();
        }
    });
}
