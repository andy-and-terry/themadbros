/**
 * app.js – Main script for the TMB landing page.
 *
 * Responsibilities:
 *  - Dismiss the full-screen splash screen after an initial delay.
 *  - Fade in the main content once the splash has faded out.
 *  - Disable the browser right-click context menu site-wide.
 */

document.addEventListener("DOMContentLoaded", () => {
  const splash = document.getElementById("splash");
  const main = document.getElementById("main-content");

  // Begin fading out the splash overlay after 2 seconds.
  setTimeout(() => {
    splash.classList.add("fade-out");

    // Hide the splash element entirely once the CSS transition (2 s) completes,
    // then reveal the main content.
    setTimeout(() => {
      splash.style.display = "none";
      main.style.opacity = "1";
    }, 2000);
  }, 2000);
});

// Prevent the default browser context menu across the whole page.
document.addEventListener("contextmenu", (event) => event.preventDefault());
