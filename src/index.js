import './main.sass'

import { TweenMax, Expo } from 'gsap/TweenMax'

require('./video/1.mp4')
require('./video/2.mp4')
require('./video/3.mp4')
require('./video/4.mp4')
require('./video/5.mp4')

window.onload = function() {
  let index = 1

  // _ DOM REFERENCES *********************************************************

  const slides = document.querySelectorAll('.slide')
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

  // _ FUNCTIONS **************************************************************

  function nextSlide() {
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
          }
        })
      }
    })
  }

  function prevSlide() {
    TweenMax.set(`.slide-${index - 1} .slide-panel`, {
      display: 'flex'
    })

    TweenMax.to(`.slide-${index - 1}`, 1, {
      x: '0%',
      ease: Expo.easeInOut,
      onComplete: function() {
        TweenMax.set(`.slide-${index} .slide-panel`, {
          display: 'none',
          onComplete: function() {
            index > 1 ? index-- : ''
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
    video.pause()
    video.currentTime = 0
    btnPlay.innerHTML = `<i class="icon-play"></i>`
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

  function resetQuestion() {
    const question = document.querySelector(`.slide-${index - 1} .mod-question`)
    question.style.opacity = 1
    question.style.display = 'flex'
  }

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

  // _ EVENT HANDLERS *********************************************************

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
}
