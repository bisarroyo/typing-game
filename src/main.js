import './style.css'
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'

import { text1 } from './data.js'

const $ = (element) => document.querySelector(element)
const $$ = (element) => document.querySelectorAll(element)

// results section
const results = $('#results')
const wpmResult = $('#wpm-result')
const timeenlapsed = $('#time-enlapsed')

// game section
const game = $('#game')
const timer = $('#timer')
const paragraph = $('#letters')
const input = $('#input')
const wpm = $('#wpm')

// Constants
const INITIAL_TIME = 0

let letters = text1.split('')
let words = text1.split(' ')
let wordsAverage = parseInt(letters.length) / parseInt(words.length)
let currentTime = INITIAL_TIME
let isPlaying

initGame()
initEvents()

function initGame() {
  game.style.display = 'flex'
  results.style.display = 'none'

  isPlaying = false

  timer.textContent = INITIAL_TIME
  let gameWords = letters.map((letter, index) => {
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
      currentTime++
      timer.textContent = currentTime
      // if (currentTime == 0) {
      //   clearInterval(gameInterval)
      //   gameOver()
      // }
    }, 1000)
    const wpmCalc = setInterval(() => {
      wpm.innerText = calculateWordsPerMinute()
      if (!isPlaying) {
        clearInterval(wpmCalc)
      }
    }, 5000)
  }
}

function goPrevWord(activeElement) {
  let prevWord = activeElement.previousElementSibling
  // validate that is a word before the active element
  if (prevWord !== null) {
    prevWord.classList = 'letter active'
    activeElement.classList = 'letter'
  }
}
function goNextWord(activeElement) {
  let nextWord = activeElement.nextElementSibling
  // validate that is a word after the active element
  if (nextWord === null) {
    // if completes the las word the game will end
    gameOver()
  } else {
    nextWord.classList.add('active')
    activeElement.classList.remove('active')
  }
}
function onkeyDown(event) {
  const active = $('span.active')

  let { key } = event
  if (key === 'Backspace') {
    goPrevWord(active)
  }
}

function onkeyUp(event) {
  let active = $('span.active')
  let activeContent = active.innerText.trim()

  let { key } = event

  let validkey = key.length === 1 ? activeContent : 'invalid'
  if (validkey === 'invalid') {
    return
  }

  if (key === validkey) {
    active.classList.add('correct')
    goNextWord(active)
  } else {
    active.classList.add('incorrect')
    goNextWord(active)
  }
}

function gameOver() {
  isPlaying = false
  game.style.display = 'none'
  results.style.display = 'flex'

  wpmResult.innerText = calculateWordsPerMinute()
  timeenlapsed.innerText = currentTime
}
gameOver()

function calculateWordsPerMinute() {
  let correctWords = $$('.correct').length / wordsAverage
  console.log(correctWords)
  if (correctWords) {
    let result = Math.floor(correctWords / (currentTime / 60))
    return result
  }
  return 0
}
