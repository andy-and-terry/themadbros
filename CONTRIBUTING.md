# Contributing to The Mad Bros

Thank you for your interest in contributing! Here's how to get started.

## Branch conventions

| Type | Branch name format | Example |
|---|---|---|
| New feature | `feat/<short-description>` | `feat/add-games-page` |
| Bug fix | `fix/<short-description>` | `fix/tmbsocial-tag-crash` |
| Documentation | `docs/<short-description>` | `docs/update-readme` |
| CI / tooling | `ci/<short-description>` | `ci/add-htmlhint` |

Always branch off `main` and keep branches focused on a single topic.

## Commit style

Use short, present-tense commit messages:

```
fix: repair broken script tag in hiring.html
feat: add error handling to loadProjects.js
docs: add README and CONTRIBUTING
```

Prefix options: `feat`, `fix`, `docs`, `ci`, `style`, `refactor`, `test`.

## Pull request checklist

Before opening a PR, make sure:

- [ ] `npm run lint` passes with no errors
- [ ] `npm test` passes with no failures
- [ ] Your changes are limited to what the PR describes
- [ ] You have described *what* changed and *why* in the PR body
- [ ] Any breaking or opinionated changes are called out explicitly

## Development setup

```bash
# 1. Fork and clone the repo
git clone https://github.com/<your-username>/themadbros.git
cd themadbros

# 2. Install dev dependencies
npm install

# 3. Make your changes, then lint and test
npm run lint
npm test
```

## Reporting bugs

Open a GitHub Issue with:
- A short description of the bug
- Steps to reproduce
- Expected vs actual behaviour
- Browser/OS if it's a visual or layout issue
