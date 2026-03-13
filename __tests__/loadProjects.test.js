/**
 * loadProjects.test.js
 *
 * Unit tests for the loadProjects module.
 *
 * @jest-environment jsdom
 */

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Resets the DOM, mocks fetch with the given implementation, then
 * evaluates loadProjects.js so its top-level fetch call runs.
 *
 * @param {Function} fetchMock - Jest mock for global.fetch
 * @returns {Promise<void>}
 */
async function setup(fetchMock) {
  document.body.innerHTML = '<div id="feed"></div>';
  global.fetch = fetchMock;
  jest.resetModules();
  require("../tmbsocial/assets/js/loadProjects.js");
  // Allow all chained promises to settle.
  await new Promise((resolve) => setTimeout(resolve, 30));
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe("loadProjects.js", () => {
  afterEach(() => {
    jest.resetModules();
    delete global.fetch;
  });

  test("renders a card for each project returned by the index", async () => {
    const project = {
      title: "My Project",
      author: "Andy",
      thumbnail: "https://example.com/thumb.png",
      description: "Cool project.",
      tags: ["fun"],
      url: "https://example.com",
    };

    // First call → project index; subsequent calls → individual project files.
    const fetchMock = jest
      .fn()
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(["project1.json"]),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(project),
      });

    await setup(fetchMock);

    const feed = document.getElementById("feed");
    expect(feed.innerHTML).toContain("My Project");
    expect(feed.innerHTML).toContain("Andy");
    expect(feed.querySelector(".card")).not.toBeNull();
  });

  test("shows an error message when the project index fails to load", async () => {
    const fetchMock = jest.fn().mockResolvedValue({
      ok: false,
      status: 500,
      json: () => Promise.resolve([]),
    });

    await setup(fetchMock);

    const feed = document.getElementById("feed");
    expect(feed.textContent).toContain("Could not load projects");
  });

  test("shows a per-card error when an individual project file fails", async () => {
    const fetchMock = jest
      .fn()
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(["bad.json"]),
      })
      .mockResolvedValueOnce({
        ok: false,
        status: 404,
        json: () => Promise.resolve({}),
      });

    await setup(fetchMock);

    const feed = document.getElementById("feed");
    expect(feed.textContent).toContain('Could not load project "bad.json"');
  });

  test("renders tags when present on a project", async () => {
    const project = {
      title: "Tagged Project",
      author: "Terry",
      thumbnail: "",
      description: "Has tags.",
      tags: ["alpha", "beta"],
    };

    const fetchMock = jest
      .fn()
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(["tagged.json"]),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(project),
      });

    await setup(fetchMock);

    expect(document.getElementById("feed").innerHTML).toContain("alpha, beta");
  });
});
