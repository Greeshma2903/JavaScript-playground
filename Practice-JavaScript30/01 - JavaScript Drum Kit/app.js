"use strict";

const buttons = document.querySelectorAll(".key");

function callAudio(audio) {
  if (!audio) return;
  audio.currentTime = 0;
  audio.play();
}

const removeTransition = function (e) {
  if (e.propertyName !== "transform") {
    // skip if it's not transform property
    return;
  }
  this.classList.remove("playing");
};

// using keyboard
window.addEventListener("keydown", function (e) {
  buttons.forEach(function (btn) {
    if (btn.dataset.key == e.key) {
      const audio = document.querySelector(`audio[data-key="${e.key}"]`);
      callAudio(audio);
      btn.classList.add("playing");
      btn.addEventListener("transitionend", removeTransition);
    }
  });
});

// on click
buttons.forEach(function (btn) {
  btn.addEventListener("click", function (e) {
    const audio = document.querySelector(
      `audio[data-key="${e.currentTarget.dataset.key}"]`
    );
    callAudio(audio);
    btn.classList.add("playing");
    btn.addEventListener("transitionend", removeTransition);
  });
});

// NOTE
/*
-> using 'removeTransition' function, we can control the animation time using CSS (instead of both CSS and JS), instead of using setTimeout

-> dataset/data attributes - used to set custom attributes/data in HTML (which do take visual space)

-> audio.currentTime - this allows the audio to be played repeatedly without waiting for it complete

-> transitionend 
*/
