# Quantum Games

Browser games built on real quantum mechanics. A sibling of the causal-games repo, with the same recipe.

- Every game is **one standalone HTML file** that can be pushed to GitHub Pages and shared. Use a server only if there is a very strong reason.
- Every game opens on an **almost static title screen** with New Game, Info and Controls.
- Keep the physics in a pure `<script id="engine">` block, and keep it verified: `node collapse/tests/verify-levels.js` (about 25 seconds).
- [DESIGN.md](DESIGN.md) has the plan for all three games and the tuning notes for Collapse.
