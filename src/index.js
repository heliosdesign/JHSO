import './main.scss'

import { TweenMax, Expo } from 'gsap/TweenMax'

window.onload = function() {
  let index = 1

  const slides = [...document.querySelectorAll('.slide')]
  const btnNext = [...document.querySelectorAll('.btn-next')]
  const btnPrev = [...document.querySelectorAll('.btn-prev')]

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

  btnNext.forEach(btn => {
    btn.addEventListener('click', nextSlide)
  })

  btnPrev.forEach(btn => {
    btn.addEventListener('click', prevSlide)
  })
}
