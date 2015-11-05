
// TODO: display scores within the browser and not only in the console log

//starting positions for the player, repeated when crosses the screen or
//collision with enemy
var START_X_PLAYER = 300;
var START_Y_PLAYER = 300;

/**
* @description Enemies our player must avoid defined here
* @param {number} this.x horizontal location of enemy
* @param {number} this.y vertical location of enemy
* @param {number} crawlSpeed of enemy
* @param {image} image of enemy
*///
var Enemy = function(x, y, crawlSpeed) {
    'use strict';

    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.crawlSpeed = crawlSpeed;

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.bug = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    'use strict';

    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.crawlSpeed * dt;

    //enemies scroll left to right on canvas
    if (this.x >= 500) {
        this.x = 0;
    }

    // Check for collision with enemies or barrier-walls
    collision(this);
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    'use strict';
    ctx.drawImage(Resources.get(this.bug), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
/**
* @description Player created on each reset of the player's position
* @param {number} this.x horizontal location of player
* @param {number} this.y vertical location of player
* @param {number} this.lengthStride distance travelled by each step of the player
* @param {image} this.boy image of player
**/

var Player = function(x, y, walkSpeed) {
    'use strict';
    this.x = x;
    this.y = y;
    this.lengthStride = 50;
    this.boy = 'images/char-boy.png';
};

// Player.prototype.update function not needed as boys position does not
// change based on time, but input. however it needs to be defined to prevent
// the game and javascript from breaking.
Player.prototype.update = function() {
    'use strict';

};

// Draw the player on the screen, required method for game
Player.prototype.render = function() {
    'use strict';

    ctx.drawImage(Resources.get(this.boy), this.x, this.y);
};

//Changes the position of the boy on the canvas based on the current location
Player.prototype.handleInput = function(keyPress) {
    'use strict';

    if (keyPress == 'left') {
        player.x -= player.lengthStride;
    }
    if (keyPress == 'up') {
        player.y -= player.lengthStride;
    }
    if (keyPress == 'right') {
        player.x += player.lengthStride;
    }
    if (keyPress == 'down') {
        player.y += player.lengthStride;
    }
    console.log('keyPress is: ' + keyPress);
};

var collision = function(anEnemy) {
    'use strict';

    // checks for collision between enemy and player
    // checks for an overlap of the player and the enemy in any dimension
    if (
        player.y + 41 >= anEnemy.y &&
        player.x <= anEnemy.x + 63 &&
        player.y  <= anEnemy.y + 62 &&
        player.x + 65 >= anEnemy.x)  {
        console.log('collided');
        player.x = START_X_PLAYER;
        player.y = START_Y_PLAYER;
    }

    // check for player reaching top of canvas and winning the game
    // if player wins, add 1 to the level
    // pass game level as an argument to the increaseDifficulty function
    if (player.y + 30 <= 0) {
        player.x = START_X_PLAYER;
        player.y = START_Y_PLAYER;
        console.log('wowser, you got across'+ ' you\'re at level ' + gameLevel);

        gameLevel += 1;
        increaseDifficulty(gameLevel);

    }

    // check if player runs into left, bottom, or right canvas walls
    // prevent player from moving beyond canvas wall boundaries
    if (player.y > 383 ) {
        player.y = 383;
    }
    if (player.x > 402.5) {
        player.x = 402.5;
    }
    if (player.x < 0) {
        player.x = 0;
    }
};

// Increase number of enemies on screen based on  game Level
var increaseDifficulty = function(gameLevel) {
    'use strict';

    // remove all previous enemies on canvas
    allEnemies.length = 0;

    // load new set of enemies
    for (var i = 0; i <= (gameLevel-2); i++) {
        var enemy = new Enemy(0, Math.random() * 184 + 50, Math.random() * 256);

        allEnemies.push(enemy);
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
// Enemy randomly placed vertically within section of canvas
// Declare new  gameLevel
// Starts the game
var allEnemies = [];
var player = new Player(START_X_PLAYER, START_Y_PLAYER);
var START_SPEED = 10;
var randomYEnemy = Math.random() * 184 + 50;
var enemy = new Enemy(0, randomYEnemy, START_SPEED);
var gameLevel = 2;

allEnemies.push(enemy);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    'use strict';

    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
    console.log(allowedKeys[e.keyCode]);
});
