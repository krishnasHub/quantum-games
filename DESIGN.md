# Design

Three small games, each built on one piece of real quantum mechanics. They follow the same rules:

- **One standalone HTML file per game.** No build step, no server, no install, so each game can go on GitHub Pages and be shared as a link. Use a server only if there is a very strong reason.
- **A title screen first.** It is almost static and offers **New Game**, **Info** and **Controls**. Info explains the physics honestly: what is real, what is tuned, and what you could never see in a real lab.
- **Real physics, tuned for play.** Each game keeps the physics in a pure `<script id="engine">` block, so Node tests can check the physics and play the levels.

## 1. Collapse (built)

A puzzle game on a real 2D Schrödinger simulation (split-step Fourier, ħ = m = 1, a 256 × 128 grid). See [collapse/README.md](collapse/README.md).

- **Build, then play, with no dice.** Place parts, choose a launch, press Play. The exit and the traps are absorbing detectors, and the score is the share of the wave the exit catches. That is the Born-rule probability of being found there.
- **One insight per level:**
  - mirrors route the wave;
  - a wide packet beats a narrow one (Heisenberg);
  - repeated hits on a barrier add up (tunnelling inside a cavity);
  - a never-blinking watcher's gaze is a wall (Zeno).

### History: version 1 was an action game, and it didn't work

The first version had you steer the cloud with WASD and click to measure ("am I in this ring?"), with real random collapse. The playtest verdict: it was unclear what the goal was, and there was nothing to figure out. The best play was always to push toward the exit and click when the number was high, and the result came down to the dice. Version 2 removed both the steering and the randomness.

### Tuning notes

- How much a packet spreads per distance travelled scales with 1/(k·σ₀). Launches are k = 0.9 or 1.5 and σ₀ = 3 or 7 cells.
- Parts are 3 tiles (24 cells) long. A one-tile mirror deflected only 17% of a beam, because the wave goes round it.
- The default barrier (V = 1.35, 2 cells thick) passes about 13% per full-speed hit. The Tunnel level uses V = 1.15.
- A watcher's gaze uses the continuous-watching limit, so it is a hard wall. A partial, soft-edged gaze would slowly absorb the wave instead, which isn't the textbook effect.
- **Two slits were dropped as a scored puzzle.** In a wave this wide, aiming at the wall between the slits versus through one slit changed the score by only a few percent (13–17%), because most of the wave reflects. The stripes still appear on their own, but interference puzzles belong to Dark Port.

## 2. Dark Port (proposal: the optical table)

A puzzle game on an optical bench, built with the exact amplitudes of single photons. Collapse is about where a wave goes; Dark Port is about interference, the thing a wide wave in a box could not make into a crisp puzzle.

- **Pieces:** a photon source, 50/50 beam splitters, mirrors, phase plates (π/2, π), detectors and absorbers. You place them on a grid and fire one photon at a time.
- **The engine** follows complex amplitudes along every path, adds them where paths meet, and only rolls the dice at a detector. A toggle shows the amplitude arrows (Feynman's "little arrows").
- **The core trick (Mach–Zehnder):** two beam splitters send every photon to one detector and never to the other, the "dark port". Anything that reveals which path the photon took breaks that.
- **Level ideas:**
  1. Route a photon to the target with 100% certainty using interference.
  2. **The bomb tester (Elitzur–Vaidman).** Some boxes hold a bomb that a single photon sets off. Find the live bombs without setting them off: a click at the dark port proves a bomb is there, even though the photon never touched it.
  3. **The Zeno bomb tester.** Many weak rotations with the bomb watching push the success rate toward 100%. This links back to Collapse.
  4. **The delayed-choice quantum eraser.** Decide *after* the photon has passed whether to put in the last beam splitter. It looks like a choice now changing the past. It doesn't, and the level shows why. This links to the time-travel games in causal-games.
- **Open questions:** puzzle levels only, or also a sandbox? A limited budget of photons per level (each one is a risk with bombs around)?

## 3. Spooky Action (proposal: Bell's game)

A cooperative card game about entanglement and what Einstein called "spooky action at a distance".

- **The CHSH game.** A referee deals Alice and Bob one random bit each (x, y). They can't talk. Each answers one bit (a, b). They win the round if a XOR b = x AND y.
- **Act 1: classical.** Players pick any strategy table. Over 100 rounds, nothing beats 75%. The game proves it by checking all 16 strategies.
- **Act 2: quantum.** Each player gets one half of an entangled photon pair and a polarizer dial for each input bit. With the right angles (0° and 45° for Alice, 22.5° and −22.5° for Bob), the win rate climbs to cos²(π/8), about 85%. The game shows the live win rate against the 75% line.
- **Act 3: no signalling.** Try to use the entanglement to send Bob a message. Bob's own results stay 50/50 whatever Alice does, so spooky correlation is not communication.
- **Bonus rounds:** the GHZ (Mermin) game for three players, where quantum players win 100% of the time and classical players at most 75%, and possibly the magic square game.
- **Open questions:** single player with an AI partner, or two players hot-seat (or sharing one link)? A live two-device version would need a server, which breaks the one-file rule, so hot-seat or an AI partner fits better.
