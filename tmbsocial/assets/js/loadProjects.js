/**
 * loadProjects.js – Fetches the project list for TMB Social and renders cards.
 *
 * Flow:
 *  1. Fetch `projects/projects.json` – an array of individual project filenames.
 *  2. For each filename, fetch the corresponding project JSON object.
 *  3. Build an HTML card for each project and append it to #feed.
 *
 * Error handling:
 *  - If the project index or any individual project file cannot be loaded,
 *    a short error message is appended to #feed instead of crashing silently.
 */

const BASE = "projects/";

/**
 * Renders a single project card and appends it to the feed element.
 *
 * @param {HTMLElement} feed    - The container element for all cards.
 * @param {Object}      project - Parsed project JSON object.
 * @param {string}      file    - Filename used to build the "Open" link.
 */
function renderCard(feed, project, file) {
  const card = document.createElement("div");
  card.className = "card";

  // Use a fallback for missing optional fields.
  const tagsText = Array.isArray(project.tags) ? project.tags.join(", ") : "";

  card.innerHTML = `
    <img src="${project.thumbnail}" alt="${project.title} thumbnail">
    <h3>${project.title}</h3>
    <p>${project.description}</p>
    <small>By ${project.author}</small><br>
    ${tagsText ? `<small>Tags: ${tagsText}</small><br>` : ""}
    <a href="view.html?file=${file}">Open</a>
  `;
  feed.appendChild(card);
}

// Fetch the project index and load each project file.
fetch(BASE + "projects.json")
  .then((res) => {
    if (!res.ok) {
      throw new Error(`Failed to load project index (HTTP ${res.status})`);
    }
    return res.json();
  })
  .then((files) => {
    const feed = document.getElementById("feed");

    files.forEach((file) => {
      fetch(BASE + file)
        .then((r) => {
          if (!r.ok) {
            throw new Error(`Failed to load project "${file}" (HTTP ${r.status})`);
          }
          return r.json();
        })
        .then((project) => renderCard(feed, project, file))
        .catch((err) => {
          // Show a per-card error rather than leaving the feed empty.
          const errEl = document.createElement("p");
          errEl.textContent = `Could not load project "${file}": ${err.message}`;
          feed.appendChild(errEl);
        });
    });
  })
  .catch((err) => {
    const feed = document.getElementById("feed");
    feed.textContent = `Could not load projects: ${err.message}`;
  });
