let warned = false;

window.addEventListener("scroll", () => {
    if (!warned) {
        alert("Loading… please don’t scroll yet 🙂");
        warned = true;
    }
});

document.addEventListener("DOMContentLoaded", ()=>{
  const splash = document.getElementById("splash");
  const main = document.getElementById("main-content");

  setTimeout(()=>{
    splash.classList.add("fade-out");
    setTimeout(()=>{
      splash.style.display="none";
      main.style.opacity="1";
    },5000);
  },5000);
});
document.addEventListener('contextmenu', event => event.preventDefault());
