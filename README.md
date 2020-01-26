# dest.MF

An homage to and deconstruction of Galaga.

## Project Setup

1. To help take care of everything in a nice fancy way we're going to use Webpack, which requires node. So to use the latest version of this project, install the LTS supported version of NodeJS [here](https://nodejs.org/en/download/)
	* Run the installer
	* Make sure you choose to install the other necessary tools (Python 2.7, Chocolatey, etc.)
2. Now [upgrade npm](https://matthewhorne.me/how-to-update-npm-on-windows-10/)
3. Open a git bash terminal
4. `cd to/the/directory/the/repo/is/in`
5. Run `npm install`. You should only need to do this once.

## Starting the project

You need git bash and a command to develop. This is what you'll do:

1. Open a git bash terminal
2. `cd to/the/directory/the/repo/is/in`
3. Run `npm run dev`
4. Open a command prompt window
5. `> cd to\the\directory\the\repo\is\in`
6. Run `bundle exec jekyll s`
7. The game is now running on `localhost:4000`

## Stefano's TODO List

- [ ] Left, right, death, and fire animations for the player
- [ ] Explore character designs with Andre
	* They'll be based off traditional garb of the Ute nation
- [ ] Discuss the main story beats with Andre and begin "background" design
	* I'm reluctant to call them backgrounds, since 

## TODO

Here's things we need to work on sooner rather than later:

- [ ] Use single melody for the entire thing--the opening melody should be used in text excerpts
- [ ] Make the ring larger--covering almost the whole screen
	* It's hard to maneuver with too little space, and I'd like to explore having the ring be bigger
- [ ] Consider causing stars to flash in the order enemies will go by so patterns are telegraphed to the player
- [ ] Change the text of the menu screen to whatever it is you decide, Andre

### Art and Animation

- [ ] Create a female alien sprite
- [ ] Create a child alien sprite
- [ ] Animate player movement
- [ ] Animate male alien
- [ ] Animate female alien
- [ ] Explosion animations for players
- [ ] Explosion animation for aliens
- [ ] Death animation for the aliens

### Sound

- [ ] Sound effect for shot fired by player
- [ ] Sound effect for shot fired by alien
- [ ] Sound effect for alien explosion (could just be the same as player)

### Finished

Just to keep my spirits up, I'm putting everything we've finished here.

- [x] Sound effect for alien death
- [x] Handle transitions in a better way
	* I like the idea of having to accept a transmission with the enter key when migrating to a communication scene, and the text just appearing on screen when it's time
- [x] Consider making a really big level editor screen size so you can modify paths more easily
	* This would open up the number of places stars could be
- [x] Consider dropping the second player altogether--it's not really something this experience warrants
- [x] Setup auto-stop
- [x] Make the communication scene use the arrow keys and enter
- [x] The first level is too long at 12 lines
- [x] The second and third levels are too short
- [x] Show level indicators
- [x] Crashing should cause a player to respawn
- [x] Explore level design space created by the rules of the game
- [x] Create a set of levels that teach the level design space and how to properly play the game
- [x] Who are the main characters?
- [x] What is the main conflict?
- [x] How does the story proceed?
- [x] Write the tutorial segment
- [x] Write the story beats
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
- [x] Figure out when the enemies will fire
	* When they pass through a green star, I think that's when they'll fire, and it's something the player can watch for

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
* [Check out this thing about shaders!](https://www.dynetisgames.com/2018/12/09/shaders-phaser-3/)

## Ideas

* The ending
	* When not killing anyone, have the end scene of the natives sitting and eating in camps with wagons--living, but not happy
	* When killing one or more, show the number of graves as a reflection of the number of men, women, and children
* The commissioner breaks the fourth wall and explains that the only way to win is to not play
* Two players and one leaves
	* Does not disrupt balance--the single player is now doing double duty
	* BALANCE FOR TWO PLAYERS--that's important, homie


> It's the Fight Club problem! Let's avoid the Fight Club problem!
>     -- Stefano
