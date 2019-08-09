# CircleGa

An homage to Galaga. Most of this was built over a 10-12 hour period. We will be adding to it though if it's fun.

## Starting the project

1. Open up the command prompt
2. `> cd to\the\directory\the\repo\is\in`
3. Run `bundle exec jekyll s`
4. The game is now running on `localhost:4000`

### TODO

- [x] Setup dev environment
- [x] Get player on screen
- [x] Player moves on screen
- [x] 2nd Player on screen
- [x] Players may collide
- [x] Enemy on screen
- [x] Shots can be fired
- [x] Shots hit enemy and player
- [x] Enemy moves on screen
- [x] Setup a fancy background
- [x] Limit shots fired
- [x] Create menu screen
- [x] Enemies move according to paths (a la Galaga)
- [x] Level editor allows modification of speed
- [x] Level editor allows modification of path
- [x] Level editor allows saving of path
- [x] Enemies move on Bezier curves
- [x] Level editor scene
- [x] Enemies collide with players again
- [x] Enemies collide with shots again
- [ ] Allow players to connect and move together
- [ ] Player collisions are better managed
	- [ ] It handles momentum
	- [ ] Momentum is lost in collision
	- [ ] Players can't move through each other
- [x] There is a screen that shows text
- [ ] Music plays while the screen shows the text
- [x] The first group of text is shown after the first level
- [x] List of enemies and their paths is set for first level
- [ ] There is a very short tutorial level that shows how to play
	- [ ] Explains movement via text
	- [ ] Explains firing via text
- [ ] Add multiple levels
- [ ] Change the text of the menu screen
- [ ] Combination of players spritesheet
- [ ] On connect--inverted color circle animation
- [ ] Explosion animations for players
- [ ] Explosion animation for aliens
- [ ] Death animation for the aliens
- [ ] Sound effect for shot fired by player
- [ ] Sound effect for shot fired by alien
- [ ] Sound effect for alien death
- [ ] Sound effect for alien explosion (could just be the same as player)

## Story

In a far and distant galaxy, an empire is growing. It holds its home star as its symbol, the representation of their dying god.

You play as a star commander, ordered by your distant Lord to eradicate an alien race. You are promised a piece of land in exchange for your services.

The game opens with a briefing, and then the opening level. Each level consists of a set of enemies to fight, and an intermittent screen that is either a report from your commanding lord, or an excerpt from an old text from a lost world.

### Why this story?

Various pieces of enlightenment philosophy and excerpts of literature about the genocide of the American Indians show up on screen between each of the levels. These excerpts, juxtaposed with the gameplay, intend to make a statement about what sorts of things become our past times, and what ways people benefit from systems that were created through horrific violence. Most of all, this horrific violence isn't even thought of by the people who actually benefit from such a system--hence a menu screen with an odd-looking DOS terminal.

## Notes

* Let's hide [this](https://www.youtube.com/watch?v=ARz6kYS12cg) somewhere. It was part of the inspiration for this game.
* [Guns](https://opengameart.org/content/4-projectile-launches)
* [Atmospheric sky sound](https://opengameart.org/content/red-eclipse-sounds)
* [Another gun sound](https://opengameart.org/content/residue-sfx)
* Down the line, let's use [Phoenix and Elixir](https://www.youtube.com/watch?v=I5L9_cXwBcU) for a multiplayer server
