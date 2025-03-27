import './style.css'
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'

import { text1 } from './data.js'

const $ = (element) => document.querySelector(element)
const $$ = (element) => document.querySelector(element)

// results section
const results = $('#results')

// game section
const game = $('#game')
const timer = $('#timer')
const paragraph = $('#letters')
const input = $('#input')

const INITIAL_TIME = 30

let words = text1.split('')
let currentTime = INITIAL_TIME
let isPlaying

initGame()
initEvents()

function initGame() {
  game.style.display = 'flex'
  results.style.display = 'none'

  isPlaying = false

  timer.textContent = 30
  let gameWords = words.map((letter, index) => {
    return `<span class="letter">${letter}</span>`
  })
  paragraph.innerHTML = gameWords.join('')

  const firstWord = $('span.letter')
  firstWord.classList.add('active')
}

function initEvents() {
  document.addEventListener('keydown', startPlaying)
  document.addEventListener('keydown', onkeyDown)
  document.addEventListener('keydown', onkeyUp)
}

function startPlaying() {
  input.focus()
  if (!isPlaying) {
    isPlaying = true
    const gameInterval = setInterval(() => {
      currentTime--
      timer.textContent = currentTime
      if (currentTime == 0) {
        clearInterval(gameInterval)
        gameOver()
      }
    }, 1000)
  }
}

function onkeyDown(event) {
  const active = $('span.active')

  let { key } = event

  if (key === 'Backspace') {
  }
}

function onkeyUp(event) {
  let active = $('span.active')
  let activeContent = active.innerText.trim()
  console.log(activeContent)
  let { key } = event

  if (key === activeContent) {
    active.classList.add('correct')
  } else {
    active.classList.add('incorrect')
  }
  let nextWord = active.nextElementSibling
  nextWord.classList.add('active')
  active.classList.remove('active')
}

function gameOver() {
  game.style.display = 'none'
  results.style.display = 'flex'
  currentTime = 0

  const correctLetters = $$('span.correct')
}
