// ------------------- MUSIC PLAYER -------------------
const audio = document.getElementById("audio");
const playPauseBtn = document.getElementById("playPause");
const progressContainer = document.querySelector(".progress-container");
const progressBar = document.querySelector(".progress-bar");
const progressDot = document.querySelector(".progress-dot");
const timeDisplay = document.getElementById("timeDisplay");

let isPlaying = false;

playPauseBtn.addEventListener("click", () => {
  if (isPlaying) {
    audio.pause();
    playPauseBtn.textContent = "▶️";
  } else {
    audio.play();
    playPauseBtn.textContent = "⏸️";
  }
  isPlaying = !isPlaying;
});

audio.addEventListener("timeupdate", () => {
  const { currentTime, duration } = audio;
  const progressPercent = (currentTime / duration) * 100;
  progressBar.style.width = `${progressPercent}%`;
  progressDot.style.left = `${progressPercent}%`;

  let curMin = Math.floor(currentTime / 60);
  let curSec = Math.floor(currentTime % 60);
  let durMin = Math.floor(duration / 60);
  let durSec = Math.floor(duration % 60);

  if (curSec < 10) curSec = `0${curSec}`;
  if (durSec < 10) durSec = `0${durSec}`;

  timeDisplay.textContent = `${curMin}:${curSec} / ${durMin}:${durSec}`;
});

// ------------------- SONG SELECTOR -------------------
const songChoice = document.getElementById("songChoice");

songChoice.addEventListener("change", () => {
  audio.src = songChoice.value;      // change audio source
  audio.pause();                     // stop current song
  audio.currentTime = 0;             // reset time
  playPauseBtn.textContent = "▶️";   // reset play button icon
  isPlaying = false;                 // update state
});

// ------------------- SLIDER -------------------
const slides = document.querySelector(".slides");
const slideImages = document.querySelectorAll(".slides img");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");

let currentIndex = 0;
let autoplayInterval;

// Function to show a slide
function showSlide(index) {
  if (index < 0) currentIndex = slideImages.length - 1;
  else if (index >= slideImages.length) currentIndex = 0;
  else currentIndex = index;

  slides.style.transform = `translateX(-${currentIndex * 100}%)`;
}

// Autoplay function
function startAutoplay() {
  autoplayInterval = setInterval(() => {
    showSlide(currentIndex + 1);
  }, 5000); // 5 seconds
}

// Reset autoplay timer when buttons are clicked
function resetAutoplay() {
  clearInterval(autoplayInterval);
  startAutoplay();
}

// Button clicks
prevBtn.addEventListener("click", () => {
  showSlide(currentIndex - 1);
  resetAutoplay(); // reset timer
});

nextBtn.addEventListener("click", () => {
  showSlide(currentIndex + 1);
  resetAutoplay(); // reset timer
});

// Start autoplay initially
startAutoplay();

// Show first slide
showSlide(currentIndex);



// ------------------- TYPING EFFECT -------------------
const letterBox = document.querySelector(".letter-box");
const showLetterBtn = document.getElementById("show-letter-btn");
const typedText = document.getElementById("typed-text");
const text = `Hiiiiiii loveeeeee. \n\nHappy Birthday my first lovee. Today would be the second time nga nag celebrate tas imong bday,tho wala koy extravagant gift for you. Im very very very very happy nga we're still together despite all the arguments, quarrels nato, we may have said something that hurts us both, just know nga I loveee youuu sooooooooooo muchhh every minute every second. Language always falls short when I try to express the love I love feel for you. I'm doing my very best to make you happy. Basta lahams na lahams kita. I hope nga mokaon nakas saktong oras, dili kay tag dugay ka mokaon that makes me sad 😞😞 also let's do well sa atong pag skwela para makab ot nato atong mga wishes, dreams, wants, travels, lets prove your haters wrong HAHAHAHAHAHAHA\n\nHappy Birthday my future Engineer 🥳🥳🎉🎉😍😍\nI loveee youuu, Babyy（づ￣3￣）づ╭❤️～'`;

let charIndex = 0;

function type() {
  if (charIndex < text.length) {
    // Convert \n to <br>
    if (text.charAt(charIndex) === "\n") {
      typedText.innerHTML += "<br>";
    } else {
      typedText.innerHTML += text.charAt(charIndex);
    }
    charIndex++;
    setTimeout(type, 50);
  }
}

showLetterBtn.addEventListener("click", () => {
  // Show the letter box (like opening an envelope)
  letterBox.classList.add("show");

  // Hide the button
  showLetterBtn.style.display = "none";

  // Start typing the letter
  type();
});


// ------------------- SURPRISE BOXES (Image) -------------------
const boxes = document.querySelectorAll(".box");

// Create the image element for the popup
const surpriseImage = document.createElement("img");
surpriseImage.id = "surpriseImage";
surpriseImage.style.display = "none"; // hidden at first
surpriseImage.style.position = "fixed";
surpriseImage.style.top = "50%";
surpriseImage.style.left = "50%";
surpriseImage.style.transform = "translate(-50%, -50%)";
surpriseImage.style.maxWidth = "80%";
surpriseImage.style.maxHeight = "80%";
surpriseImage.style.borderRadius = "20px";
surpriseImage.style.boxShadow = "0 5px 20px rgba(0,0,0,0.5)";
surpriseImage.style.zIndex = "9999";
document.body.appendChild(surpriseImage);

let hideTimeout; // for 10-second auto-hide

boxes.forEach((box, index) => {
  box.addEventListener("click", () => {
    // Set image source based on box index
    surpriseImage.src = `sprs${index + 1}.jpg`; // sprs1.jpg, sprs2.jpg, sprs3.jpg
    surpriseImage.style.display = "block";

    // Clear any previous timeout
    clearTimeout(hideTimeout);

    // Hide after 10 seconds
    hideTimeout = setTimeout(() => {
      surpriseImage.style.display = "none";
    }, 5000);
  });
});

// Clicking outside the image hides it
document.addEventListener("click", (event) => {
  if (surpriseImage.style.display === "block" && event.target !== surpriseImage && !event.target.classList.contains("box")) {
    surpriseImage.style.display = "none";
    clearTimeout(hideTimeout);
  }
});

// Optional: clicking the image itself also hides it
surpriseImage.addEventListener("click", () => {
  surpriseImage.style.display = "none";
  clearTimeout(hideTimeout);
});

// ------------------- CONFETTI -------------------
const confettiCanvas = document.getElementById("confetti-canvas");
const myConfetti = confetti.create(confettiCanvas, { resize: true, useWorker: true });

window.addEventListener("load", () => {
  // Step 1: POP in the middle
  myConfetti({
    particleCount: 200,
    spread: 100,
    origin: { x: 0.5, y: 0.5 }
  });

  // Step 2: Start looping confetti rain that falls all the way down
  setTimeout(() => {
    (function frame() {
      myConfetti({
        particleCount: 5,       // more particles per frame
        angle: 90,              // straight down
        spread: 60,             // width of spread
        origin: { x: Math.random(), y: 0 },
        gravity: 1.2,           // stronger gravity for full fall
        scalar: 1.2,            // bigger confetti
        drift: 0.5              // slight horizontal drift
      });
      requestAnimationFrame(frame); // keeps looping forever
    })();
  }, 1000);
});

