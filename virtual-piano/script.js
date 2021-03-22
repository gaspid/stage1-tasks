const piano = document.querySelector(".piano");
const pianoКeys = document.querySelectorAll(".piano-key");
const btnContainer = document.querySelector(".btn-container");
const btn = document.querySelectorAll(".btn");
const btnLetters = document.querySelector(".btn-letters");
const btnNotes = document.querySelector(".btn-notes");
const btnFullScreen = document.querySelector(".fullscreen");
let mouseDown = false;

piano.addEventListener("mousedown", (e) => {
  if (e.target.classList.contains("piano-key")) {
    mouseDown = true;
    const note = e.target.dataset.note;
    const src = `assets/audio/${note}.mp3`;
    playAudio(src);

    pianoКeys.forEach((el) => {
      if (el.classList.contains("piano-key-active")) {
        el.classList.remove("piano-key-active");
        el.classList.remove("piano-key-active-pseudo");
      }
    });
    e.target.classList.add("piano-key-active");
    e.target.classList.add("piano-key-active-pseudo");
  }
});

piano.addEventListener("mouseover", (event) => {
  if (event.target.classList.contains("piano-key") && mouseDown) {
    const note = event.target.dataset.note;
    const src = `assets/audio/${note}.mp3`;
    playAudio(src);

    pianoКeys.forEach((el) => {
      if (el.classList.contains("piano-key-active")) {
        el.classList.remove("piano-key-active");
        el.classList.remove("piano-key-active-pseudo");
      }
    });
    event.target.classList.add("piano-key-active");
    event.target.classList.add("piano-key-active-pseudo");
  }
});

piano.addEventListener("mouseup", (e) => {
 
  if (e.target.classList.contains("piano-key")) {
    
    pianoКeys.forEach((el) => {
      if (el.classList.contains("piano-key-active")) {
        el.classList.remove("piano-key-active");
        el.classList.remove("piano-key-active-pseudo");
      }
    });
  }
});

piano.addEventListener("mouseout", (event) => {
  if (event.target.classList.contains("piano-key")) {
    pianoКeys.forEach((el) => {
      if (el.classList.contains("piano-key-active")) {
        el.classList.remove("piano-key-active");
        el.classList.remove("piano-key-active-pseudo");
      }
    });
  }
});

btnContainer.addEventListener("mousedown", (e) => {
  if (e.target.classList.contains("btn")) {
    btn.forEach((el) => {
      if (el.classList.contains("btn-active")) {
        el.classList.remove("btn-active");
      }
    });
    e.target.classList.add("btn-active");
  }
});

btnLetters.addEventListener("click", () => {
  pianoКeys.forEach((el) => {
    if (!el.classList.contains("piano-key-letter")) {
      el.classList.add("piano-key-letter");
    }
  });
});

btnNotes.addEventListener("click", () => {
  pianoКeys.forEach((el) => {
    if (el.classList.contains("piano-key-letter")) {
      el.classList.remove("piano-key-letter");
    }
  });
});

btnFullScreen.addEventListener("click", () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }
});

window.addEventListener("keydown", (event) => {
  if (!event.repeat) {
    pianoКeys.forEach((el) => {
      if (
        el.dataset.letter == String.fromCharCode(event.keyCode).toUpperCase()
      ) {
        const note = el.dataset.note;
        const src = `assets/audio/${note}.mp3`;
        playAudio(src);
        el.classList.add("piano-key-active");
      }
    });
  }
});

window.addEventListener("keyup", (event) => {
  pianoКeys.forEach((el) => {
    if (el.dataset.letter == String.fromCharCode(event.keyCode).toUpperCase()) {
      el.classList.remove("piano-key-active");
    }
  });
});


window.addEventListener("mouseup", (event) => {
  mouseDown = false;
});

function playAudio(src) {
  const audio = new Audio();
  audio.src = src;
  audio.currentTime = 0;
  audio.play();
}
