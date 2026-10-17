# Quantum Games

Browser games built on real quantum mechanics. A sibling of the causal-games repo, with the same recipe. Live at https://krishnashub.github.io/quantum-games/ (GitHub Pages deploys from `main`, root folder).

- Start each session from [TODO.md](TODO.md). [DESIGN.md](DESIGN.md) has the design for every game and the tuning notes for Collapse.
- Every game is **one standalone HTML file** in its own folder, so it can go on GitHub Pages and be shared. Use a server only if there is a very strong reason.
- Every game opens on an **almost static title screen** with New Game, Info and Controls, and has a **tile on the landing page** (`index.html`) that looks like that title screen.
- Games are **real puzzles, not luck**: each level has a one-sentence goal and needs one insight. Tests prove that the solution works and that the traps fall short.
- Keep the physics in a pure `<script id="engine">` block, and keep it verified: `node collapse/tests/verify-levels.js` (about 25 seconds).
