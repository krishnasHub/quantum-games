# To do

Start here. This is the hand-off between sessions.

## Where things stand (2026-10-17)

- **Collapse is done (version 2).** It is a build-then-play puzzle game with six levels, running on a real Schrödinger simulation. The tests pass (`node collapse/tests/verify-levels.js`, about 25 seconds).
  - Version 1 (real-time steering plus random measurement) failed its playtest: the goal was unclear, there was nothing to figure out, and the result came down to luck. DESIGN.md has the details.
  - No one has played version 2 yet.
- **The repo is pushed** to https://github.com/krishnasHub/quantum-games (`main`).
- **The landing page** (`index.html`) has one tile, for Collapse. The tile looks like the game's title screen, and clicking it opens the game.

## Next

1. **Switch on GitHub Pages** (the user does this; the GitHub CLI isn't installed here). Go to https://github.com/krishnasHub/quantum-games/settings/pages, set Source to "Deploy from a branch", choose `main` and `/ (root)`, and click Save. Then check that https://krishnashub.github.io/quantum-games/ and `/collapse/` load. As of 2026-10-17 both returned 404.
2. **Playtest Collapse version 2.** Things to watch for:
   - Are the star thresholds fair? They are set from the reference solutions in `tests/solutions.js`, and a player may find better setups.
   - Is each level's insight discoverable from the brief, before using the hint?
   - Are the controls clear (turn = click a placed part, remove = right-click)?
3. **Design Dark Port (game 2)** with the user, starting from the proposal in DESIGN.md: interference puzzles on an optical table with single photons, including the bomb tester and the delayed-choice eraser. Open questions: puzzle levels only or also a sandbox, and whether to limit the photons per level.
4. **Design Spooky Action (game 3)** with the user: Bell's CHSH game. Open question: an AI partner or hot-seat play? A live two-device version would need a server, which breaks the one-file rule.

## Rules for every new game

- **One standalone HTML file** in its own folder (`<game>/index.html`), so it works on GitHub Pages with no server. Use a server only for a very strong reason.
- **An almost static title screen** with New Game, Info and Controls.
- **A real puzzle, not luck.** Every level states its goal in one sentence and needs one insight. Tests prove that the reference solution succeeds and that the tempting wrong ideas ("traps") fall short.
- **A tile on the landing page** that looks like the game's title screen and opens the game.
- **Physics in a pure `<script id="engine">` block**, verified by Node tests in `<game>/tests/`.

## Ideas parked

- Collapse: more levels, such as a lens (a potential well that focuses the wave) or level-specific barrier heights.
- Collapse: a sandbox mode with free parts.
- Collapse: show where the probability went after a run (a heatmap of what was lost).
