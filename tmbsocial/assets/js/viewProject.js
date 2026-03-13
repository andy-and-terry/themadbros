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

/**
 * Escapes special HTML characters in a string to prevent XSS injection
 * when inserting untrusted values into innerHTML.
 *
 * @param {string} str - Raw string that may contain HTML special characters.
 * @returns {string}   - HTML-escaped string safe for use inside innerHTML.
 */
function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/**
 * Returns the URL only if it uses the http or https protocol,
 * otherwise returns an empty string to prevent javascript: URLs.
 *
 * @param {string} url - URL from project data.
 * @returns {string}   - Validated URL or empty string.
 */
function safeUrl(url) {
  try {
    const parsed = new URL(url);
    return parsed.protocol === "https:" || parsed.protocol === "http:"
      ? url
      : "";
  } catch {
    return "";
  }
}

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
        ? project.tags.map(escapeHtml).join(", ")
        : "None";

      const projectUrl = safeUrl(project.url);

      document.getElementById("project").innerHTML = `
        <h1>${escapeHtml(project.title)}</h1>
        <p><b>By:</b> ${escapeHtml(project.author)}</p>
        <iframe src="${escapeHtml(projectUrl)}" width="100%" height="600" title="${escapeHtml(project.title)}"></iframe>
        <p>${escapeHtml(project.description)}</p>
        <p><b>Tags:</b> ${tagsText}</p>
        <a href="${escapeHtml(projectUrl)}" target="_blank" rel="noopener noreferrer">Open in new tab</a>
      `;
    })
    .catch((err) => {
      document.getElementById("project").innerHTML =
        `<p>Failed to load project: ${escapeHtml(err.message)}</p>`;
    });
}
