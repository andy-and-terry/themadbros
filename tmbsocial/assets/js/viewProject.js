const params = new URLSearchParams(window.location.search);
const file = params.get("file");

if (!file) {
  document.body.innerHTML = "Project not found.";
} else {
  fetch("projects/" + file)
    .then(r => r.json())
    .then(p => {
      document.getElementById("project").innerHTML = `
        <h1>${p.title}</h1>
        <p><b>By:</b> ${p.author}</p>
        <iframe src="${p.url}" width="100%" height="600"></iframe>
        <p>${p.description}</p>
        <p><b>Tags:</b> ${p.tags.join(", ")}</p>
        <a href="${p.url}" target="_blank">Open in new tab</a>
      `;
    });
}
