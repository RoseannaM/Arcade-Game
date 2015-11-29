//Constants
var yPositions = [50, 130, 210, 290]; //y positions for enemies and gems

var xPositions = [200, 99, 301, -2, 402]; //x positions for gems

var score;

var setScore = function (s) {
    score = s;
    $("#score").html("SCORE: " + score);
};

setScore(0);


// Enemies our player must avoid
var Enemy = function (x, y, speed) {
    this.sprite = 'images/enemy-bug-blue.png';
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.width = 60;
};

Enemy.prototype.update = function (dt) {
    this.x += this.speed * dt;
    if (this.y === player.y) {
        if (this.x < player.x + player.width && this.x + this.width > player.x) {//Axis-Aligned Bounding Box
            player.start();
        }
    }
};

// Draw the enemy on the screen
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//The player function, has an image, x & y position and width
var Player = function (x, y) {
    this.sprite = 'images/char-cat-girl.png';
    this.x = x;
    this.y = y;
    this.width = 80;
    this.initialx = x; //takes initial starting x position.
    this.initialy = y; //takes initial starting y position.
};

Player.prototype.start = function () {
    this.x = this.initialx;
    this.y = this.initialy;
    setScore(0);
};

Player.prototype.update = function (dt) {
};

Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//player movement and keeping player from moving off the canvas
Player.prototype.handleInput = function (key) {
    if (key === 'left' && this.x > 40) {
        this.x = this.x - 101;
    }
    else if (key === 'up') {
        this.y = this.y - 80;
    }
    else if (key === 'right' && this.x < 360) {
        this.x = this.x + 101;
    }
    else if (key === 'down' && this.y < 370) {
        this.y = this.y + 80;
    }
    if (this.y === -30) {
        this.start();
    }
    if (this.x === -80) {
        this.start();
    }
};

// Place the player object in a variable called player. Takes the initial start x & y position
var player = new Player(200, 370);


//Gem function and related functions
var Gem = function (xPositions, yPositions) {
    this.sprite = 'images/Gem Purple.png';
    this.xpos = xPositions;
    this.ypos = yPositions;
    this.randomPos();
};

Gem.prototype.randomPos = function () {
    this.x = this.xpos[getRandomInt(0, this.xpos.length - 1)]; //.length because list length changes, -1 to stop it choosing outside range.
    this.y = this.ypos[getRandomInt(0, this.ypos.length - 1)];
};

Gem.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Gem.prototype.update = function (dt) {
    //collisions
    if (this.y === player.y) {
        if (this.x === player.x) {
            this.randomPos();
            setScore(score + 10);
        }
    }
};

var allGems = [];

var createGem = function () {
    allGems.push(new Gem(xPositions, yPositions));
};
createGem();


function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

var allEnemies = [];

//Enemy loop, creates enemies after one second
function createEnemyLoop() {
    allEnemies.push(new Enemy(-100, yPositions[getRandomInt(0, 4)], getRandomInt(90, 220)));
    setTimeout(createEnemyLoop, 1000); //this makes the continuous loop
}
setTimeout(createEnemyLoop, 1000);


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});

//helps to calculate canvas positions
clickLocations = [];

function logClicks(x, y) {
    clickLocations.push(
        {
            x: x,
            y: y
        }
    );
    console.log('x location: ' + x + '; y location: ' + y);
}

$(document).click(function (event) {
    var x = event.pageX;
    var y = event.pageY;
    logClicks(x, y);
});
