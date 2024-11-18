const toggleFocusMode = document.getElementById('toggleFocusMode');
const focusStatus = document.getElementById('focusStatus');
const toggleAudio = document.getElementById('toggleAudio');

toggleFocusMode.addEventListener('click', () => {
    const isOn = focusStatus.textContent === 'On';
    focusStatus.textContent = isOn ? 'Off' : 'On';
    toggleFocusMode.setAttribute('aria-label', `Focus mode ${isOn ? 'desativado' : 'ativado'}`);
});


toggleAudio.addEventListener('click', () => {
    const isPressed = toggleAudio.getAttribute('aria-pressed') === 'true';
    toggleAudio.setAttribute('aria-pressed', !isPressed);
});
