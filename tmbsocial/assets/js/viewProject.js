/**
 * viewProject.js – Loads and renders a single TMB Social project.
 *
 * Reads the `file` query-string parameter, fetches the corresponding JSON
 * from the `projects/` directory, and renders the project details into
 * the #project element.
 *
 * Error handling:
 *  - Missing or invalid `file` parameter: shows a "not found" message.
 *  - Network / parse errors: shown inline instead of a blank page.
 *  - Missing optional fields (e.g. `tags`): handled with safe fallbacks.
 */

const params = new URLSearchParams(window.location.search);
const file = params.get("file");

if (!file) {
  // No project file specified in the URL.
  document.body.innerHTML = "<p>Project not found.</p>";
} else {
  fetch("projects/" + file)
    .then((r) => {
      if (!r.ok) {
        throw new Error(`HTTP ${r.status}`);
      }
      return r.json();
    })
    .then((project) => {
      // Guard against missing tags array to prevent a runtime crash.
      const tagsText = Array.isArray(project.tags)
        ? project.tags.join(", ")
        : "None";

      document.getElementById("project").innerHTML = `
        <h1>${project.title}</h1>
        <p><b>By:</b> ${project.author}</p>
        <iframe src="${project.url}" width="100%" height="600" title="${project.title}"></iframe>
        <p>${project.description}</p>
        <p><b>Tags:</b> ${tagsText}</p>
        <a href="${project.url}" target="_blank" rel="noopener noreferrer">Open in new tab</a>
      `;
    })
    .catch((err) => {
      document.getElementById("project").innerHTML =
        `<p>Failed to load project: ${err.message}</p>`;
    });
}
