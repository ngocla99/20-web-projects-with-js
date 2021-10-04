'use strict';
const word = document.getElementById('word');
const text = document.getElementById('text');
const scoreEl = document.getElementById('score');
const timeEl = document.getElementById('time');
const endgameEl = document.getElementById('end-game-container');
const settingsBtn = document.getElementById('settings-btn');
const settings = document.getElementById('settings');
const settingsForm = document.getElementById('settings-form');
const difficultySelect = document.getElementById('difficulty');

const words = [
  'sigh',
  'tense',
  'airplane',
  'ball',
  'pies',
  'juice',
  'warlike',
  'bad',
  'north',
  'dependent',
  'steer',
  'silver',
  'highfalutin',
  'superficial',
  'quince',
  'eight',
  'feeble',
  'admit',
  'drag',
  'loving',
];

// Init word
let randomWord;

// Init score
let score = 0;

// Init time
let time = 10;

// Set difficulty to medium or ls
let difficulty =
  localStorage.getItem('difficulty') !== null
    ? localStorage.getItem('difficulty')
    : 'medium';

difficultySelect.value = difficulty;
text.focus();

const timeInterval = setInterval(updateTime, 1000);

// Generate random word
function getRandomWord() {
  return words[Math.floor(Math.random() * words.length)];
}

function upDateScore() {
  score++;
  scoreEl.innerText = score;
}

function updateTime() {
  time--;
  timeEl.innerText = `${time}s`;
  if (time === 0) {
    clearInterval(timeInterval);

    gameOver();
  }
}

function addWordToDOM() {
  randomWord = getRandomWord();
  word.innerText = randomWord;
}

// Game over, show end screen
function gameOver() {
  endgameEl.innerHTML = `
      <h1>Time ran out</h1>
      <p>Your final score is ${score}</p>
      <button onclick="location.reload()">Reload</button>
    `;

  endgameEl.style.display = 'flex';
}

addWordToDOM();

text.addEventListener('input', (e) => {
  const insertedText = e.target.value;
  if (insertedText === randomWord) {
    e.target.value = '';

    addWordToDOM();
    upDateScore();

    if (difficulty === 'hard') {
      time += 2;
    } else if (difficulty === 'medium') {
      time += 3;
    } else if (difficulty === 'easy') {
      time += 5;
    }
    updateTime();
  }
});

// Settings btn click
settingsBtn.addEventListener('click', () => settings.classList.toggle('hide'));

// Setting difficulty
settingsForm.addEventListener('change', (e) => {
  difficulty = e.target.value;
  localStorage.setItem('difficulty', difficulty);
  location.reload();
});
