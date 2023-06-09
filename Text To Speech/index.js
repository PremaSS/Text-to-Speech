const { speechSynthesis } = window;
const voicesSelect = document.getElementById('voices');
const rate = document.getElementById('rate');
const pitch = document.getElementById('pitch');
const text = document.getElementById('text');

let voices = [];

//Генерация списка голосовых движков
const generateVoices = () => {
    if (!window.speechSynthesis) {
        console.error('Speech Synthesis API is not available!');
        return;
    }
    voices = window.speechSynthesis.getVoices();// Получение списка голосовых движков

    const voicesList = voices
        .map((voice, index) => `<option value=${index}>${voice.name} (${voice.lang})</option>`)
        .join('');

    voicesSelect.innerHTML = voicesList;
};


//Воспроизведение
const speakVoices = () => {
    if (speechSynthesis.speaking) {
        console.error('speechSynthesis.speaking');
        return;
    }

    if (text.value !== '') {
        const ssUtterance = new SpeechSynthesisUtterance(text.value);

        ssUtterance.voice = voices[voicesSelect.value];
        ssUtterance.pitch = pitch.value;
        ssUtterance.rate = rate.value;

        speechSynthesis.speak(ssUtterance);
    }
};

generateVoices();// Вызов функции генерации


speechSynthesis.onvoiceschanged = () => generateVoices();

// Добавление обработчика клика на кнопку
const toggleButton = document.getElementById('btn-toggle');
toggleButton.addEventListener('click', () => {
    if (speechSynthesis.speaking) {
        speechSynthesis.cancel();
        toggleButton.innerHTML = 'Воспроизведение';
    } else {
        speakVoices();
        toggleButton.innerHTML = 'Остановить';
    }
});

rate.addEventListener('change', () => document.querySelector('.rate-value').innerHTML = rate.value);
pitch.addEventListener('change', () => document.querySelector('.pitch-value').innerHTML = pitch.value);

voicesSelect.addEventListener('change', speak);




