# CircleGa

An homage to Galaga. Most of this was built over a 10-12 hour period. We will be adding to it though if it's fun.

## Starting the project

1. Open up the command prompt
2. `> cd to\the\directory\the\repo\is\in`
3. Run `bundle exec jekyll s`
4. The game is now running on `localhost:4000`

## Organization

The organization of the game is as follows:

* Tutorial level showing the ropes on how to play
* Level 1
* Story exposition 1
* Level 2
* Text exposition 1

And then

* Level
* Story
* Level
* Text

This can be boiled down to simply level, text, level, text, where each text is either a story beat or a citation.

## TODO

- [ ] Make the ring larger--covering almost the whole screen
	* It's hard to maneuver with too little space, and I'd like to explore having the ring be bigger

### Art and Animation

- [ ] Create a female alien sprite
- [ ] Create a child alien sprite
- [ ] Animate player movement
- [ ] Animate male alien
- [ ] Animate female alien
- [ ] Explosion animations for players
- [ ] Explosion animation for aliens
- [ ] Death animation for the aliens

### Story

- [ ] Who are the main characters?
- [ ] What is the main conflict?
- [ ] How does the story proceed?
- [ ] Write the tutorial segment
- [ ] Write the story beats

### Level design

- [ ] Explore level design space created by the rules of the game
- [ ] Change the text of the menu screen to whatever it is you decide, Andre
- [ ] Create a set of levels that teach the level design space and how to properly play the game

### Code

- [ ] Allow players to connect and move together
	- [ ] A single key for each flips connect/disconnect mode
	- [ ] A separate sprite with a lit side shows up
	- [ ] A separate sprite and connection animation plays/shows up

### Sound

- [ ] Sound effect for shot fired by player
- [ ] Sound effect for shot fired by alien
- [ ] Sound effect for alien death
- [ ] Sound effect for alien explosion (could just be the same as player)
- [ ] Sound effect for crashing into the other player (this helps make crashing appear as a negative consequence)

### Finished

Just to keep my spirits up, I'm putting everything we've finished here.

- [x] Fix how aliens come in
- [x] Music plays while the screen shows the text
	- [x] Create three separate pieces of music from the main machine rolls forward piece
- [x] Throw the texts we're going to use into the data directory instead of loading them all in memory
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
- [x] Player collisions are better managed
	- [x] It handles momentum
	- [x] Momentum is lost in collision
	- [x] Players can't move through each other
- [x] There is a screen that shows text
- [x] The first group of text is shown after the first level
- [x] List of enemies and their paths is set for first level
- [x] Enemies fire bullets at players at certain intervals
- [x] There is a very short tutorial level that shows how to play
	- [x] Explains movement via text
	- [x] Explains firing via text
	- [x] Tells you to fire at the natives via text

## Story

In a distant place in space, you control a drone dedicated to subjugation and eradication of other persons. Your drone is owned by a large trading company seeking
Uranium, and the guy who owns the company just happened to find some on a planet on the outskirts of a star system. You are ordered to go and destroy them.

This isn't explicitly explained to you, by the way. This is explained through opportunities to discuss with the mercenary leader. I haven't decided to what extent
the game will include a story here or if I'll build it into a bigger thing in something like Godot.

### Why this story?

Various pieces of enlightenment philosophy and excerpts of literature about the genocide of the American Indians show up on screen between each of the levels. These excerpts, juxtaposed with the gameplay, intend to make a statement about what sorts of things become our past times, and what ways people benefit from systems that were created through horrific violence. Most of all, this horrific violence isn't even thought of by the people who actually benefit from such a system--hence a menu screen with an odd-looking DOS terminal.

## Notes

* Let's hide [this](https://www.youtube.com/watch?v=ARz6kYS12cg) somewhere. It was part of the inspiration for this game.
* [Guns](https://opengameart.org/content/4-projectile-launches)
* [Atmospheric sky sound](https://opengameart.org/content/red-eclipse-sounds)
* [Another gun sound](https://opengameart.org/content/residue-sfx)
* Down the line, let's use [Phoenix and Elixir](https://www.youtube.com/watch?v=I5L9_cXwBcU) for a multiplayer server
* [Check out this thing about shaders!](https://www.dynetisgames.com/2018/12/09/shaders-phaser-3/)
