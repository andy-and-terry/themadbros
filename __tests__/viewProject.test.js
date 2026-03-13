/**
 * viewProject.test.js
 *
 * Unit tests for the viewProject module logic.
 *
 * @jest-environment jsdom
 */

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Resets the DOM, sets the page URL, mocks fetch, then evaluates
 * viewProject.js so its top-level code runs with the desired context.
 *
 * @param {string}   search     - Query string, e.g. "?file=project1.json"
 * @param {Function} fetchMock  - Jest mock for global.fetch
 * @returns {Promise<void>}     - Resolved once all micro-tasks settle.
 */
async function setup(search, fetchMock) {
  // Set up a minimal DOM with the element the module writes into.
  document.body.innerHTML = '<div id="project"></div>';

  // Replace window.location so window.location.search returns our value.
  delete window.location;
  window.location = { search };

  // Inject the fetch mock.
  global.fetch = fetchMock;

  // Re-require the module so its top-level code executes fresh each time.
  jest.resetModules();
  require("../tmbsocial/assets/js/viewProject.js");

  // Allow fetch promise chains to settle.
  await new Promise((resolve) => setTimeout(resolve, 20));
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe("viewProject.js", () => {
  afterEach(() => {
    jest.resetModules();
    delete global.fetch;
  });

  test("shows 'Project not found.' when no file param is given", async () => {
    await setup("", jest.fn());
    expect(document.body.innerHTML).toContain("Project not found.");
  });

  test("renders project details on a successful fetch", async () => {
    const mockProject = {
      title: "Test Project",
      author: "Andy",
      url: "https://example.com",
      description: "A test description.",
      tags: ["fun", "demo"],
    };

    const fetchMock = jest.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockProject),
    });

    await setup("?file=project1.json", fetchMock);

    const html = document.getElementById("project").innerHTML;
    expect(html).toContain("Test Project");
    expect(html).toContain("Andy");
    expect(html).toContain("fun, demo");
    expect(html).toContain("https://example.com");
  });

  test("shows error message when fetch returns a non-OK response", async () => {
    const fetchMock = jest.fn().mockResolvedValue({
      ok: false,
      status: 404,
      json: () => Promise.resolve({}),
    });

    await setup("?file=missing.json", fetchMock);

    const html = document.getElementById("project").innerHTML;
    expect(html).toContain("Failed to load project");
    expect(html).toContain("HTTP 404");
  });

  test("falls back to 'None' when tags field is missing", async () => {
    const mockProject = {
      title: "No Tags",
      author: "Terry",
      url: "https://example.com",
      description: "No tags here.",
      // tags intentionally omitted
    };

    const fetchMock = jest.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockProject),
    });

    await setup("?file=project-no-tags.json", fetchMock);

    const html = document.getElementById("project").innerHTML;
    expect(html).toContain("No Tags");
    expect(html).toContain("<b>Tags:</b> None");
  });
});
