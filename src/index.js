import './main.sass'

import { TweenMax, Expo } from 'gsap/TweenMax'

require('./video/1.mp4')
require('./video/2.mp4')
require('./video/3.mp4')
require('./video/4.mp4')
require('./video/5.mp4')

require('./video/1.vtt')
require('./video/2.vtt')
require('./video/3.vtt')
require('./video/4.vtt')
require('./video/5.vtt')

require('./audio/1.mp3')
require('./audio/2.mp3')
require('./audio/3.mp3')
require('./audio/4.mp3')
require('./audio/5.mp3')
require('./audio/6.mp3')
require('./audio/7.mp3')
require('./audio/8.mp3')
require('./audio/9.mp3')
require('./audio/10.mp3')

require('./images/1-1.svg')
require('./images/3-1.svg')
require('./images/3-2.svg')
require('./images/3-3.svg')
require('./images/4-1.svg')
require('./images/4-2.svg')
require('./images/4-3.svg')
require('./images/4-4.svg')
require('./images/4-5.svg')
require('./images/5-1.svg')
require('./images/5-2.svg')
require('./images/5-3-1.svg')
require('./images/5-3-2.svg')
require('./images/6-1.svg')
require('./images/6-2.svg')
require('./images/6-3-1.svg')
require('./images/6-3-2.svg')
require('./images/7-1.svg')
require('./images/7-2.svg')
require('./images/7-3.svg')
require('./images/8-1.svg')
require('./images/8-2.svg')
require('./images/9-1.svg')
require('./images/10-1.svg')
require('./images/11-1.svg')
require('./images/12-1.svg')
require('./images/17-1.svg')
require('./images/22-1.svg')
require('./images/22-2.svg')
require('./images/22-3.svg')
require('./images/22-4.svg')
require('./images/23-1.svg')
require('./images/24-1.svg')
require('./images/24-2.svg')
require('./images/24-3.svg')
require('./images/24-4.svg')
require('./images/25-1.svg')
require('./images/26-1.svg')
require('./images/jhso-logo-en.svg')

window.onload = function() {
  let index = 1

  // _ DOM REFERENCES *********************************************************

  const slides = document.querySelectorAll('.slide')
  const btnMenu = document.querySelectorAll('.btn-menu')
  const btnClose = document.querySelector('.btn-close')
  const btnNext = document.querySelectorAll('.btn-next')
  const btnPrev = document.querySelectorAll('.btn-prev')
  const videos = document.querySelectorAll('.video-media')
  const btnPlay = document.querySelectorAll('.btn-video.mod-play')
  const btnRestart = document.querySelectorAll('.btn-video.mod-restart')
  const btnSkip = document.querySelectorAll('.btn-video.mod-skip')
  const btnStopVideo = document.querySelectorAll('.btn-next.mod-stop')
  const btnYes = document.querySelectorAll('.btn-quiz.mod-yes')
  const btnNo = document.querySelectorAll('.btn-quiz.mod-no')
  const btnQuestionReset = document.querySelectorAll('.btn-prev.mod-question-reset')

  const btnNav = document.querySelectorAll('.btn-nav')

  const btnVoiceover = [...document.querySelectorAll('.btn-voiceover')]
  const audio = document.querySelector('.voiceover')

  // _ FUNCTIONS **************************************************************

  function updateNav() {
    btnNav.forEach(btn => btn.classList.remove('is-active'))

    if (index >= 1 && index < 4) {
      btnNav[0].classList.add('is-active')
    } else if (index === 4) {
      btnNav[1].classList.add('is-active')
    } else if (index === 5) {
      btnNav[2].classList.add('is-active')
    } else if (index === 6) {
      btnNav[3].classList.add('is-active')
    } else if (index >= 7 && index < 10) {
      btnNav[4].classList.add('is-active')
    } else if (index >= 10 && index < 12) {
      btnNav[5].classList.add('is-active')
    } else if (index >= 12 && index < 17) {
      btnNav[6].classList.add('is-active')
    } else if (index >= 17 && index < 22) {
      btnNav[7].classList.add('is-active')
    } else if (index >= 22 && index < 24) {
      btnNav[8].classList.add('is-active')
    } else if (index >= 24 && index < 26) {
      btnNav[9].classList.add('is-active')
    } else if (index >= 26) {
      btnNav[10].classList.add('is-active')
    }
  }

  function nextSlide() {
    audio.paused ? '' : audio.pause()

    TweenMax.set(`.slide-${index + 1} .slide-panel`, {
      display: 'flex'
    })

    TweenMax.to(`.slide-${index}`, 1, {
      x: '-100%',
      ease: Expo.easeInOut,
      onComplete: function() {
        TweenMax.set(`.slide-${index} .slide-panel`, {
          display: 'none',
          onComplete: function() {
            index <= slides.length + 1 ? index++ : ''
            audio.src = `./audio/${index}.mp3`
            updateNav()
          }
        })
      }
    })
  }

  function playVideo() {
    const video = document.querySelector(`.slide-${index} video`)
    const btnPlay = document.querySelector(`.slide-${index} .btn-video.mod-play`)

    if (video.paused) {
      video.play()
      btnPlay.innerHTML = `<i class="icon-pause"></i>`
    } else {
      video.pause()
      btnPlay.innerHTML = `<i class="icon-play"></i>`
    }
  }

  function restartVideo() {
    const video = document.querySelector(`.slide-${index} video`)
    const btnPlay = document.querySelector(`.slide-${index} .btn-video.mod-play`)

    if (video !== null) {
      video.pause()
      video.currentTime = 0
      btnPlay.innerHTML = `<i class="icon-play"></i>`
    }
  }

  function skipVideo() {
    const video = document.querySelector(`.slide-${index} video`)
    if (video.paused === true) return
    video.currentTime = video.currentTime + 5
    handleProgress()
  }

  function handleProgress() {
    const progressBar = document.querySelector(`.slide-${index} .video-progress-bar`)
    const video = document.querySelector(`.slide-${index} video`)

    const percent = (video.currentTime / video.duration) * 100
    progressBar.style.flexBasis = `${percent}%`
  }

  function answerQuestion() {
    const questionPanel = document.querySelector(`.slide-${index} .mod-question`)
    const answerPanel = document.querySelector(`.slide-${index} .mod-answer`)
    const answerHeading = document.querySelector(`.slide-${index} .mod-answer .type-heading`)

    if (this.dataset.correct === 'true') {
      answerHeading.textContent = 'Correct.'
      answerPanel.classList.add('mod-correct')
    } else {
      answerHeading.textContent = 'Incorrect.'
      answerPanel.classList.add('mod-incorrect')
    }

    TweenMax.to(questionPanel, 1, {
      opacity: 0,
      ease: Expo.easeInOut,
      onComplete: function() {
        questionPanel.style.display = 'none'
      }
    })
  }

  function resetQuestions() {
    const questions = document.querySelectorAll(`.mod-question`)

    questions.forEach(question => {
      TweenMax.set(question, { opacity: 1, display: 'flex' })
    })
  }

  function openNav() {
    TweenMax.set('nav', {
      display: 'flex'
    })

    TweenMax.to('nav', 1, {
      left: 0,
      ease: Expo.easeInOut,
      onComplete: function() {
        TweenMax.set(`.slide-${index} .slide-panel`, {
          display: 'none'
        })
      }
    })
  }

  function closeNav() {
    TweenMax.set(`.slide-${index} .slide-panel`, {
      display: 'flex'
    })

    TweenMax.to('nav', 1, {
      left: '-100%',
      ease: Expo.easeInOut,
      onComplete: function() {
        TweenMax.set('nav', {
          display: 'none'
        })
      }
    })
  }

  function switchPage() {
    audio.paused ? '' : audio.pause()
    index = parseInt(this.dataset.page)

    for (let i = 1; i < index; i++) {
      TweenMax.set(`.slide-${i}`, {
        x: '-100%'
      })
      TweenMax.set(`.slide-${i} .slide-panel`, {
        display: 'none'
      })
    }

    for (let i = index + 1; i <= slides.length; i++) {
      TweenMax.set(`.slide-${i}`, {
        x: '0%'
      })
      TweenMax.set(`.slide-${i} .slide-panel`, {
        display: 'none'
      })
    }

    TweenMax.set(`.slide-${index}`, {
      x: '0%'
    })

    TweenMax.set(`.slide-${index} .slide-panel`, {
      display: 'flex'
    })

    audio.src = `./audio/${index}.mp3`

    resetQuestions()
    closeNav()
    updateNav()
  }

  function playAudio() {
    audio.paused ? audio.play() : audio.pause()
  }

  // _ EVENT HANDLERS *********************************************************

  btnMenu.forEach(btn => {
    btn.addEventListener('click', openNav)
  })

  btnClose.addEventListener('click', closeNav)

  btnNext.forEach(btn => {
    btn.addEventListener('click', nextSlide)
  })

  btnPrev.forEach(btn => {
    btn.addEventListener('click', prevSlide)
  })

  btnYes.forEach(btn => {
    btn.addEventListener('click', answerQuestion)
  })

  btnNo.forEach(btn => {
    btn.addEventListener('click', answerQuestion)
  })

  btnQuestionReset.forEach(btn => {
    btn.addEventListener('click', resetQuestion)
  })

  btnPlay.forEach(btn => {
    btn.addEventListener('click', playVideo)
  })

  btnRestart.forEach(btn => {
    btn.addEventListener('click', restartVideo)
  })

  btnSkip.forEach(btn => {
    btn.addEventListener('click', skipVideo)
  })

  videos.forEach(video => {
    video.addEventListener('loadeddata', restartVideo)
    video.addEventListener('timeupdate', handleProgress)
  })

  btnStopVideo.forEach(btn => {
    btn.addEventListener('click', restartVideo)
  })

  btnNav.forEach(btn => {
    btn.addEventListener('click', switchPage)
  })

  btnVoiceover.forEach(btn => {
    btn.addEventListener('click', playAudio)
  })
}
