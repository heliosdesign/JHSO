import './main.sass'

import { TweenMax, Expo } from 'gsap/TweenMax'

require('./video/1.mp4')

window.onload = function() {
  let index = 1

  // _ DOM REFERENCES *********************************************************

  const slides = [...document.querySelectorAll('.slide')]
  const btnNext = [...document.querySelectorAll('.btn-next')]
  const btnPrev = [...document.querySelectorAll('.btn-prev')]
  const video = document.querySelector('.video-media')
  const progressBar = document.querySelector('.video-progress-bar')
  const btnPlay = document.querySelector('.btn-video.mod-play')
  const btnRestart = document.querySelector('.btn-video.mod-restart')
  const btnSkip = document.querySelector('.btn-video.mod-skip')

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
    if (video.paused) {
      video.play()
      btnPlay.innerHTML = `<i class="icon-pause"></i>`
    } else {
      video.pause()
      btnPlay.innerHTML = `<i class="icon-play"></i>`
    }
  }

  function restartVideo() {
    video.pause()
    video.currentTime = 0
  }

  function skipVideo() {
    if (video.paused === true) return
    video.currentTime = video.currentTime + 5
    handleProgress()
  }

  function handleProgress() {
    const percent = (video.currentTime / video.duration) * 100
    progressBar.style.flexBasis = `${percent}%`
  }

  btnNext.forEach(btn => {
    btn.addEventListener('click', nextSlide)
  })

  btnPrev.forEach(btn => {
    btn.addEventListener('click', prevSlide)
  })

  // _ EVENT HANDLERS *********************************************************

  // btnPlay.addEventListener('click', playVideo)
  // btnRestart.addEventListener('click', restartVideo)
  // btnSkip.addEventListener('click', skipVideo)
  // video.addEventListener('loadeddata', restartVideo)
  // video.addEventListener('timeupdate', handleProgress)
}
