'use strict';
const main = document.querySelector('main');
const voicesSelect = document.getElementById('voices');
const textarea = document.getElementById('text');
const textBox = document.getElementById('text-box');
const readBtn = document.getElementById('read');
const toggleBtn = document.getElementById('toggle');
const closeBtn = document.getElementById('close');

const data = [
  {
    image: './img/drink.jpg',
    text: "I'm Thirsty",
  },
  {
    image: './img/food.jpg',
    text: "I'm Hungry",
  },
  {
    image: './img/tired.jpg',
    text: "I'm Tired",
  },
  {
    image: './img/hurt.jpg',
    text: "I'm Hurt",
  },
  {
    image: './img/happy.jpg',
    text: "I'm Happy",
  },
  {
    image: './img/angry.jpg',
    text: "I'm Angry",
  },
  {
    image: './img/sad.jpg',
    text: "I'm Sad",
  },
  {
    image: './img/scared.jpg',
    text: "I'm Scared",
  },
  {
    image: './img/outside.jpg',
    text: 'I Want To Go Outside',
  },
  {
    image: './img/home.jpg',
    text: 'I Want To Go Home',
  },
  {
    image: './img/school.jpg',
    text: 'I Want To Go To School',
  },
  {
    image: './img/grandma.jpg',
    text: 'I Want To Go To Grandmas',
  },
];

data.forEach(creatBox);

function creatBox(item) {
  const { image, text } = item;

  const boxEl = document.createElement('div');

  boxEl.classList.add('box');
  boxEl.innerHTML = `
      <img src="${image}" alt="${text}"/>
      <p class="info">${text}</p>
    `;

  boxEl.addEventListener('click', () => {
    setTextMessage(text);
    speakText();

    boxEl.classList.add('active');
    setTimeout(() => boxEl.classList.remove('active'), 1000);
  });

  main.appendChild(boxEl);
}

// Init voices
const messages = new SpeechSynthesisUtterance();

// Store voices
let voices = [];

function getVoices() {
  voices = speechSynthesis.getVoices();

  voices.forEach((voice) => {
    const option = document.createElement('option');

    option.value = voice.name;
    option.innerText = `${voice.name} ${voice.lang}`;

    voicesSelect.appendChild(option);
  });
}

// Set text
function setTextMessage(text) {
  messages.text = text;
}

// Speak text
function speakText() {
  speechSynthesis.speak(messages);
}

// Set voice
function setVoice(e) {
  messages.voice = voices.find((voice) => voice.name === e.target.value);
}

// Voices changed
speechSynthesis.addEventListener('voiceschanged', getVoices);

toggleBtn.addEventListener('click', () => textBox.classList.toggle('show'));

closeBtn.addEventListener('click', () => textBox.classList.remove('show'));

voicesSelect.addEventListener('change', setVoice);

readBtn.addEventListener('click', () => {
  setTextMessage(textarea.value);
  speakText();
});

getVoices();
