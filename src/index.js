// If you're reading this, you probably didn't write it.
// I'm sorry you have to see this, it could probably be done better.

// The following code is broken up into some main parts:
// 1 - Variables
// 2 - DOM References
// 3 - Functions
// 4 - Event Handlers

// I tried to comment this the best I could.

import './main.sass'

import { TweenMax, Expo } from 'gsap/TweenMax'

import './js/media-declarations'

window.onload = function() {
  // _ VARIABLES **************************************************************
  let index = 1 // Indicates what slide you are on. Super important!

  // _ DOM REFERENCES *********************************************************

  const slides = document.querySelectorAll('.slide') // All of the Slides - Kanye West.

  const btnMenu = document.querySelectorAll('.btn-menu') // Hamburger menus to open Nav.
  const btnNav = document.querySelectorAll('.btn-nav') // Section buttons inside Nav.
  const btnClose = document.querySelector('.btn-close') // Close button inside Nav.

  const btnNext = document.querySelectorAll('.btn-next') // Next slide buttons.

  const videos = document.querySelectorAll('.video-media') // Video elements.
  const btnPlay = document.querySelectorAll('.btn-video.mod-play') // Play video buttons.
  const btnRestart = document.querySelectorAll('.btn-video.mod-restart') // Restart video buttons.
  const btnSkip = document.querySelectorAll('.btn-video.mod-skip') // Skip video forward buttons.

  const btnYes = document.querySelectorAll('.btn-quiz.mod-yes') // Agree quiz buttons.
  const btnNo = document.querySelectorAll('.btn-quiz.mod-no') // Disagree quiz buttons.

  const audio = document.querySelector('.voiceover-audio') // Audio element
  const btnVoiceover = document.querySelectorAll('.btn-voiceover') // Play voiceover audio buttons.

  // _ FUNCTIONS **************************************************************

  // Open the nav.
  function openNav() {
    // Set the nav to display flex.
    TweenMax.set('nav', { display: 'flex' })

    // Bring the nav in from the left of the viewport.
    // Set the nav to display flex. (so buttons don't stay active when nav is open)
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

  // **************************************************************************

  // Close the nav.
  function closeNav() {
    // Set the current slide to display flex.
    TweenMax.set(`.slide-${index} .slide-panel`, { display: 'flex' })

    // Set the nav to move out of the viewport to the left.
    // Then, hide the nav (so buttons don't stay active when nav is closed.)
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

  // **************************************************************************

  // Update the Nav to highlight the section you're currently in.
  function updateNav() {
    // Remove each .is-active class from all sections.
    btnNav.forEach(btn => btn.classList.remove('is-active'))

    // Add the .is-active class to a particular button based on the current slide.
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

  // **************************************************************************

  // Go the the next slide.
  function nextSlide() {
    // Pause the audio if playing.
    audio.paused ? '' : audio.pause()

    // Set the next slide to display: flex
    TweenMax.set(`.slide-${index + 1} .slide-panel`, { display: 'flex' })

    // 1. Move the entire slide out of viewport to the left.
    // 2. When complete, hide that slide's content...
    // ...Then increase slide index, change audio src, update nav.
    TweenMax.to(`.slide-${index}`, 1, {
      x: '-100%',
      ease: Expo.easeInOut,
      onComplete: function() {
        TweenMax.set(`.slide-${index} .slide-panel`, {
          display: 'none'
        })

        index <= slides.length + 1 ? index++ : ''
        updateNav()
      }
    })
  }

  // **************************************************************************

  // Go to a specific slide.
  function switchPage() {
    // Pause the audio if playing.
    audio.paused ? '' : audio.pause()

    // Set the index to be the data-attribute of the button that was selected.
    index = parseInt(this.dataset.page)

    // Loop through all the slides before the selected slide to hide them.
    for (let i = 1; i < index; i++) {
      TweenMax.set(`.slide-${i}`, {
        x: '-100%'
      })
      TweenMax.set(`.slide-${i} .slide-panel`, {
        display: 'none'
      })
    }

    // Loop through all the slides after the selected slide to hide them.
    for (let i = index + 1; i <= slides.length; i++) {
      TweenMax.set(`.slide-${i}`, {
        x: '0%'
      })
      TweenMax.set(`.slide-${i} .slide-panel`, {
        display: 'none'
      })
    }

    // Set the selected slide to be in the viewport.
    TweenMax.set(`.slide-${index}`, {
      x: '0%'
    })

    // Set the selected slide to display flex.
    TweenMax.set(`.slide-${index} .slide-panel`, {
      display: 'flex'
    })

    // Reset the questions, update the nav, close the nav.
    resetQuestions()
    updateNav()
    closeNav()
  }

  // **************************************************************************

  // Reset the quiz questions when you change slides.
  function resetQuestions() {
    // Get all the slides that are quiz questions.
    const questions = document.querySelectorAll(`.mod-question`)

    // Set all the question panels of those slides to show.
    questions.forEach(question => {
      TweenMax.set(question, { opacity: 1, display: 'flex' })
    })
  }

  // **************************************************************************

  // Answer the quiz question.
  function answerQuestion() {
    // Get both the question/answer panels from current slide, as well as the answer heading.
    const questionPanel = document.querySelector(`.slide-${index} .mod-question`)
    const answerPanel = document.querySelector(`.slide-${index} .mod-answer`)
    const answerHeading = document.querySelector(`.slide-${index} .mod-answer .type-heading`)
    const answerVoiceoverBtn = document.querySelector(`.slide-${index} .mod-answer .btn-voiceover`)

    // If the button you clicked on has data-attribute of true...
    // ...set the heading to read "Correct.", add styling to answer panel.
    if (this.dataset.correct === 'true') {
      answerHeading.textContent = 'Correct.'
      answerPanel.classList.add('mod-correct')
      answerVoiceoverBtn.dataset.data = `${index}-A`
      // If the button you clicked on has data-attribute of false...
      // ...set the heading to read "Incorrect.", add styling to answer panel.
    } else {
      answerHeading.textContent = 'Incorrect.'
      answerPanel.classList.add('mod-incorrect')
      answerVoiceoverBtn.dataset.audio = `${index}-B`
    }

    // Set opacity of question panel to 0.
    // Then, hide the panel completely.
    TweenMax.to(questionPanel, 1, {
      opacity: 0,
      ease: Expo.easeInOut,
      onComplete: function() {
        TweenMax.set(questionPanel, { display: 'none' })
      }
    })
  }

  // **************************************************************************

  // Toggle video elemnt to play / pause.
  function playVideo() {
    if (!audio.paused) audio.pause()

    // Get the video and play button element from the current slide.
    const video = document.querySelector(`.slide-${index} video`)
    const btnPlay = document.querySelector(`.slide-${index} .btn-video.mod-play`)

    // If video is paused, play it & update icon...
    // or if video is playing, pause it & update icon.
    if (video.paused) {
      video.play()
      btnPlay.innerHTML = `<i class="icon-pause"></i>`
    } else {
      video.pause()
      btnPlay.innerHTML = `<i class="icon-play"></i>`
    }
  }

  // **************************************************************************

  // Restart the video.
  function restartVideo() {
    // Get the video and play button element from the current slide.
    const video = document.querySelector(`.slide-${index} video`)
    const btnPlay = document.querySelector(`.slide-${index} .btn-video.mod-play`)

    // If the video exists, pause it, rewind to beginning, and update icon.
    if (video !== null) {
      video.pause()
      video.currentTime = 0
      btnPlay.innerHTML = `<i class="icon-play"></i>`
    }
  }

  // **************************************************************************

  // Skip forward 5 seconds.
  function skipVideo() {
    // Get the video element from the current slide.
    const video = document.querySelector(`.slide-${index} video`)

    // If the video is playing, do nothing.
    if (video.paused === true) return

    // Otherwise, skip forward 5 seconds and update the video progress bar.
    video.currentTime = video.currentTime + 5
    handleProgress()
  }

  // **************************************************************************

  // Update video progress bar to match video progress.
  function handleProgress() {
    // Get the video and progress bar element from the current slide.
    const video = document.querySelector(`.slide-${index} video`)
    const progressBar = document.querySelector(`.slide-${index} .video-progress-bar`)

    // Calculate progress percentage based off the video's duration, update progress bar.
    const percent = (video.currentTime / video.duration) * 100
    progressBar.style.flexBasis = `${percent}%`
  }

  // **************************************************************************

  // Toggle the audio to play / pause.
  function playAudio() {
    const track = `./audio/${this.dataset.audio}.mp3`

    const video = document.querySelector(`.slide-${index} .slide-panel .video-media`)
    if (!video.paused) video.pause()

    if (audio.name != track) {
      audio.src = track
      audio.name = track
    }

    audio.paused ? audio.play() : audio.pause()
  }

  // _ EVENT HANDLERS *********************************************************

  btnMenu.forEach(btn => {
    btn.addEventListener('click', openNav)
  })

  btnNav.forEach(btn => {
    btn.addEventListener('click', switchPage)
  })

  btnClose.addEventListener('click', closeNav)

  btnNext.forEach(btn => {
    btn.addEventListener('click', nextSlide)
  })

  btnYes.forEach(btn => {
    btn.addEventListener('click', answerQuestion)
  })

  btnNo.forEach(btn => {
    btn.addEventListener('click', answerQuestion)
  })

  videos.forEach(video => {
    video.addEventListener('loadeddata', restartVideo)
    video.addEventListener('timeupdate', handleProgress)
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

  btnVoiceover.forEach(btn => {
    btn.addEventListener('click', playAudio)
  })
}
