// Flag to ensure the scroll warning is only shown once
let warned = false;

// Warn users not to scroll while the splash screen is loading.
// Once warned, the flag prevents the alert from firing again.
window.addEventListener("scroll", () => {
  if (!warned) {
    alert("Loading… please don't scroll yet 🙂");
    warned = true;
  }
});

// Wait for the full HTML document to load before running splash logic
document.addEventListener("DOMContentLoaded", () => {
  const splash = document.getElementById("splash");
  const main = document.getElementById("main-content");

  // After 5 seconds, begin fading out the splash screen.
  // The "fade-out" class triggers the CSS opacity transition defined in style.css.
  setTimeout(() => {
    splash.classList.add("fade-out");

    // After the CSS fade-out transition completes (2s as per style.css),
    // fully hide the splash element and reveal the main content.
    setTimeout(() => {
      splash.style.display = "none";
      main.style.opacity = "1";
    }, 2000); // matches the `transition: opacity 2s ease` on #splash in style.css
  }, 5000); // wait 5 seconds before starting the fade
});

// Disable the right-click context menu to discourage easy asset copying
document.addEventListener("contextmenu", event => event.preventDefault());
