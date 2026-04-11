# The Mad Bros

A static website and creative projects hub for **The Mad Bros** — a kid-friendly creative company building apps, short films, paper crafts, and more.

## What's in this repo

| Path | Description |
|---|---|
| `index.html` / `app.js` / `style.css` | Main landing page |
| `tmbmovies/` | TMB Movies branch — trailers & short film listings |
| `xtreme-filming/` | TMB Xtreme Filming branch |
| `quickcode/` | TMB QuickCode — code snippets & dev helpers |
| `tmbsocial/` | TMB Social — community project showcase |
| `PAPER/` | P.A.P.E.R. branch (temporarily halted) |
| `cpbrcfe/` | Capybara Cafe — part of TMB history |
| `hiring/` | Hiring page |
| `uptime/` | Website uptime status |

## Quick start

The site is fully static — no build step required.

### View locally

Open `index.html` in any modern browser, **or** serve the folder with a simple
HTTP server to avoid cross-origin fetch errors in `tmbsocial/`:

```bash
# Python 3 (built-in)
python -m http.server 8080
# then open http://localhost:8080
```

### Install dev tools

The repository uses [ESLint](https://eslint.org/) for JavaScript linting and
[HTMLHint](https://htmlhint.com/) for HTML linting, plus [Jest](https://jestjs.io/)
for tests. Node.js ≥ 18 is required.

```bash
npm install
```

## Running the linters

```bash
# Lint all HTML files
npm run lint:html

# Lint all JavaScript files
npm run lint:js

# Run both
npm run lint
```

## Running tests

```bash
npm test
```

Tests live in `__tests__/` and cover the core JavaScript modules
(`loadProjects.js` and `viewProject.js`).

## CI

A GitHub Actions workflow (`.github/workflows/ci.yml`) runs linting and
tests automatically on every push and pull request to `main`.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for branch conventions, commit style,
and how to open a pull request.

## License

No license has been applied to this repository yet. The repository owner
should choose and add a license (e.g. MIT, CC BY-NC 4.0) before the
codebase is used or redistributed by others.
See [choosealicense.com](https://choosealicense.com/) for guidance.
