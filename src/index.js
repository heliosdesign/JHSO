import './main.scss'

import { TweenMax, Expo } from 'gsap/TweenMax'

window.onload = function() {
  let index = 1

  const slides = [...document.querySelectorAll('.slide')]
  const btnNext = [...document.querySelectorAll('.btn-next')]
  const btnPrev = [...document.querySelectorAll('.btn-prev')]

  function nextSlide() {
    TweenMax.to(`.slide-${index}`, 1, {
      x: '-100%',
      ease: Expo.easeInOut
    })

    index <= slides.length + 1 ? index++ : ''
  }

  function prevSlide() {
    TweenMax.to(`.slide-${index - 1}`, 1, {
      x: '0%',
      ease: Expo.easeInOut
    })

    index > 1 ? index-- : ''
  }

  btnNext.forEach(btn => {
    btn.addEventListener('click', nextSlide)
  })

  btnPrev.forEach(btn => {
    btn.addEventListener('click', prevSlide)
  })
}
