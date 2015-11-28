// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.width = 80;
};


Enemy.prototype.update = function (dt) {
    this.x += this.speed * dt;
    //TODO: Handles collision with the Player (you need to implement)
    if (this.y === player.y) {
        if (this.x < player.x + player.width && this.x + this.width > player.x) {
            player.start();
        }
    }
};

// Draw the enemy on the screen
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y) {
    this.sprite = 'images/char-cat-girl.png';
    this.x = x;
    this.y = y;
    this.width = 80;
};

Player.prototype.start = function(){
    this.x = 200;
    this.y = 370;
};

Player.prototype.update = function(dt) {

};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(key){
    if (key === 'up') {
        this.y = this.y - 80;
    } else if (key === 'down' && this.y < 370) {
        this.y = this.y + 80;
    } else if (key === 'left' && this.x > 40) {
        this.x = this.x - 101;
    } else if (key === 'right' && this.x < 360) {
        this.x = this.x + 101;
    }
    if (this.y === -30){
        this.start();
    }
    if (this.x === -80){
        this.start();
    }

    //TODO: Recall that the player cannot move off screen (so you will need to check for that and handle appropriately).

    //TODO: (you can write a separate reset Player method to handle that).
};

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
var enemyPositions = [50, 130, 210, 290];

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var allEnemies = [];
//Enemy loop, creates enemies after a second
function createEnemyLoop(){
    allEnemies.push(new Enemy(-100, enemyPositions[getRandomInt(0, 4)], getRandomInt(90, 220)));
    setTimeout(createEnemyLoop, 1000);
}
setTimeout(createEnemyLoop, 1000);


// Place the player object in a variable called player
var player = new Player(200, 370);



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});

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
