/**Project: Project 2 - Simple Game with Tilemap
 * Name: Jeffrey Kedda
 * Description: this is a simple tile map game of size 800x800 displayed on
 * a 400x400 canvas with 1 main character,
 * 20 prizes to collect, 10 rocks, and 6 enemies. Each size of each object is 20 pixels
 * The main character must collect all 20 prizes (chests) to complete the game without getting touched
 * by the enemies (ninjas). The rocks provide a bouncing mechanism where each the enemy and main character
 * must move around the rocks
 * Controls: 
   Use the arrow keys to move
 * 
 */


class player {
    constructor(x, y, s) {
        this.x = x;
        this.y = y;
        this.speed = s;
        this.currentSpeed = s;
        this.horizontalSpeed = s;
        this.verticalSpeed = s;
    }
    draw() {
        fill(231, 223, 150);
        noStroke();
        rect(this.x - 10, this.y - 10, 20, 20);
        fill(0);
        rect(this.x - 5, this.y - 4, 3, 3);
        rect(this.x + 3, this.y - 4, 3, 3);
        rect(this.x - 2.5, this.y + 5, 7, 3);
        fill(208, 57, 49);
        rect(this.x - 10, this.y - 10, 20, 5);
    }
    move() {
        if (keyIsDown(LEFT_ARROW) || keyIsDown(RIGHT_ARROW) || keyIsDown(UP_ARROW) || keyIsDown(DOWN_ARROW)) {
            if (keyIsDown(LEFT_ARROW) && this.x > 20) {
                this.x -= 3;
                this.currentSpeed = this.s;
                this.horizonalSpeed = -1;
                this.verticalSpeed = 0;
            } else if (keyIsDown(RIGHT_ARROW) && this.x < 760) {
                this.x += 3;
                this.currentSpeed = this.s;
                this.horizonalSpeed = 1;
                this.verticalSpeed = 0;
            } else if (keyIsDown(UP_ARROW) && this.y > 20) {
                this.y -= 3;
                this.currentSpeed = this.s;
                this.horizonalSpeed = 0;
                this.verticalSpeed = 1;
            } else if (keyIsDown(DOWN_ARROW) && this.y < 760) {
                this.y += 3;
                this.currentSpeed = this.s;
                this.horizonalSpeed = 0;
                this.verticalSpeed = -1;
            }

        } else {
            this.currentSpeed = 0;
        }
    }
    checkCollision() {
        for (var i = 0; i < game.objects.length; i++) {
            if (game.objects[i].obj === 1) { //border
                //already satisfied
            } else if (game.objects[i].obj === 2) { //rock
                if (dist(game.objects[i].x, game.objects[i].y, this.x, this.y) < 20) {
                    if (this.currentSpeed != 0 && this.verticalSpeed > 0) { //20
                        this.y += 4;
                        game.yCor -= 4;
                    }
                    if (this.currentSpeed != 0 && this.verticalSpeed < 0) { //760
                        this.y -= 4;
                        game.yCor += 4;
                    }
                    if (this.currentSpeed != 0 && this.horizonalSpeed > 0) { //760
                        this.x -= 4;
                        game.xCor += 4;
                    }
                    if (this.currentSpeed != 0 && this.horizonalSpeed < 0) { //20
                        this.x += 4;
                        game.xCor -= 4;
                    }
                }
            } else if (game.objects[i].obj === 3) { //chest
                //already satisfie
            }
        }
    }
}
class enemy {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.hit = 0;
        this.horizontalSpeed = 1;
        this.verticalSpeed = 1;
        this.currentSpeed = 0;
        //this.lockMovement = 0;
    }
    draw() {
        fill(255);
        rect(this.x - 10, this.y - 10, 20, 20); 
        fill(0);
        rect(this.x - 10, this.y - 10, 20, 5);
        fill(255, 0, 0);
        rect(this.x - 5, this.y - 4, 3, 3);
        rect(this.x + 3, this.y - 4, 3, 3);
        fill(0);
        rect(this.x - 10, this.y, 20, 10);
    }
    move(playerOne) {
        if (dist(this.x, this.y, playerOne.x, playerOne.y) < 200 && this.hit == 0) {
            //moving right
            if (this.x < playerOne.x && this.x < 760) {
                this.x = this.x + 1;
                this.horizontalSpeed = 1;
                this.verticalSpeed = 0;
                this.currentSpeed = 1;
            }
            //moving left
            if (this.x > playerOne.x && this.x > 20) {
                this.x = this.x - 1;
                this.horizontalSpeed = -1;
                this.verticalSpeed = 0;
                this.currentSpeed = 1;
            }
            //moving down
            if (this.y < playerOne.y && this.y < 760) {
                this.y = this.y + 1;
                this.horizontalSpeed = 0;
                this.verticalSpeed = -1;
                this.currentSpeed = 1;
            }
            //moving up
            if (this.y > playerOne.y && this.x > 20) {
                this.y = this.y - 1;
                this.horizontalSpeed = 0;
                this.verticalSpeed = 1;
                this.currentSpeed = 1;
            }
        } else {
            //wandering enemy
            if (second() % 2 == 0 && this.x < 760) {
                this.x = 1 + this.x;
            } else if (this.x > 20) {
                this.x = -1 + this.x;
            }
        }
        if (dist(this.x, this.y, playerOne.x, playerOne.y) < 20 && this.hit == 0) {
            this.hit = 1;
            game.gameOver = 1;
        }
    }

    checkCollision() {
        for (var i = 0; i < game.objects.length; i++) {
            if (game.objects[i].obj === 1) { //border
                //already satisfied
            } else if (game.objects[i].obj === 2) { //rock
                if (dist(game.objects[i].x, game.objects[i].y, this.x, this.y) < 25) {
                    //moving down
                    if (this.currentSpeed != 0 && this.verticalSpeed < 0) { //20
                        this.horizontalSpeed = 0;
                        this.verticalSpeed = -1;
                        this.currentSpeed = 1;
                        this.y -= 3;
                    }
                    //moving up
                    else if (this.currentSpeed != 0 && this.verticalSpeed > 0) { //760
                        this.horizontalSpeed = 0;
                        this.verticalSpeed = 1;
                        this.currentSpeed = 1;
                        this.y += 3;
                    }
                    //moving right
                    else if (this.currentSpeed != 0 && this.horizonalSpeed > 0) { //760
                        this.horizontalSpeed = 1;
                        this.verticalSpeed = 0;
                        this.currentSpeed = 1;
                        this.x -= 3;
                    }
                    //moving left
                    else if (this.currentSpeed != 0 && this.horizonalSpeed < 0) { //20
                        this.horizontalSpeed = -1;
                        this.verticalSpeed = 0;
                        this.currentSpeed = 1;
                        this.x += 3;
                    } else {
                        this.horizontalSpeed = -1;
                        this.verticalSpeed = 0;
                        this.currentSpeed = 1;
                        this.x -= 3;
                    }
                }
            } else if (game.objects[i].obj === 3) { //chest
                //already satisfie
            }
        }
    }
}
class border {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    draw(x, y) {
        this.x = x;
        this.y = y;
        fill(150, 75, 0);
        rect(this.x - 10, this.y - 10, 20, 20);
        fill(0, 0, 0);
        rect(this.x, this.y, 1, 1);
        rect(this.x + 5, this.y + 4, 1, 1);
        rect(this.x - 5, this.y - 3, 1, 1);
        rect(this.x + 6, this.y + 1, 1, 1);
        rect(this.x + 6, this.y - 5, 1, 1);
        rect(this.x + 1, this.y + 7, 1, 1);
    }
} // ONE
class rock {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    draw(x, y) {
        this.x = x;
        this.y = y;
        fill(128, 128, 128);
        rect(this.x - 10, this.y - 10, 20, 20);
        fill(0, 0, 0);
        rect(this.x, this.y, 1, 1);
        rect(this.x + 5, this.y + 4, 1, 1);
        rect(this.x - 5, this.y - 3, 1, 1);
        rect(this.x + 6, this.y + 1, 1, 1);
        rect(this.x + 6, this.y - 5, 1, 1);
        rect(this.x + 1, this.y + 7, 1, 1);

    }
} // TWO
class chest {
    constructor(x, y, img) {
        this.x = x;
        this.y = y;
        this.img = img;
        this.hit = 0;
    }

    draw(x, y) {
        this.x = x;
        this.y = y;
        if (this.hit === 0) {
            imageMode(CENTER);
            image(this.img, this.x, this.y, 20, 20);
        } else {
            this.hit = 1;
        }
    }
    draw(img) {
        if (this.hit === 0) {
            imageMode(CENTER);
            image(this.img, this.x, this.y, 20, 20);
        } else {
            this.img = img;
            imageMode(CENTER);
            image(this.img, this.x, this.y, 20, 20);
            this.hit = 1;
        }
    }
    detectPlayer(playerOne) {
        if (dist(this.x, this.y, playerOne.x, playerOne.y) < 20 && this.hit == 0) {
            this.hit = 1;
            chestCount++;
            console.log(chestCount);
        }
    }
} // THREE
class collisionObj {
    constructor(x, y, o) {
        this.x = x;
        this.y = y;
        this.obj = o;
    }
}
class gameObj {
    constructor() {
        this.tilemap = [
            "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",
            "w                                 r    w",
            "w       c               c              w",
            "w                                      w",
            "w        r               r       c     w",
            "w   c                                  w",
            "w                                      w",
            "w                                r     w",
            "w                                      w",
            "w           c                          w",
            "w                                      w",
            "w       r                   c          w",
            "w                                      w",
            "w                                      w",
            "w            c    r             c      w",
            "w                                      w",
            "w                                      w",
            "w                                      w",
            "w       c                   c          w",
            "w                  c                   w",
            "w                          r           w",
            "w                                      w",
            "w                                  c   w",
            "w                                      w",
            "w       c                              w",
            "w                                      w",
            "w       r          c         r    c    w",
            "w                                      w",
            "w                           c          w",
            "w                                      w",
            "w                                      w",
            "w       c                              w",
            "w                               c      w",
            "w                                      w",
            "w                                      w",
            "w               c                      w",
            "w                                 c    w",
            "w      r                               w",
            "w                                      w",
            "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",

        ];
        this.gameOver = -1;
        this.score = 0;
        this.currFrame = 0;
        this.yCor = -300;
        this.xCor = 0;
        this.objects = [];

    } // gameObj constructor
    initialize() {
        for (var i = 0; i < this.tilemap.length; i++) {
            for (var j = 0; j < this.tilemap[i].length; j++) {
                switch (this.tilemap[i][j]) {
                    case 'w':
                        this.objects.push(new collisionObj(j * 20 + 10, i * 20 + 1, 1));
                        break;
                    case 'r':
                        this.objects.push(new collisionObj(j * 20, i * 20, 2));
                        break;
                    case 'c':
                        this.objects.push(new collisionObj(j * 20 + 10, i * 20 + 10, 3));
                        chestObjects.push(new chest(j * 20 + 10, i * 20 + 10, images[0]));
                        break;
                }
            }
        }
    }
    drawBackground() {
        for (var i = 0; i < this.tilemap.length; i++) {
            for (var j = 0; j < this.tilemap[i].length; j++) {
                switch (this.tilemap[i][j]) {
                    case 'w':
                        borders.draw(j * 20, i * 20);
                        break;
                    case 'c':
                        chests.draw(j * 20, i * 20);
                        break;
                    case 'r':
                        rocks.draw(j * 20, i * 20);
                        break;
                }
            }
        }
        if (myPlayer.currentSpeed != 0 && myPlayer.horizonalSpeed == 0 && myPlayer.verticalSpeed > 0 && myPlayer.y > 20) { //20
            this.yCor += myPlayer.speed;
        }
        if (myPlayer.currentSpeed != 0 && myPlayer.horizonalSpeed == 0 && myPlayer.verticalSpeed < 0 && myPlayer.y < 760) { //760
            this.yCor -= myPlayer.speed;
        }
        if (myPlayer.currentSpeed != 0 && myPlayer.horizonalSpeed > 0 && myPlayer.verticalSpeed == 0 && myPlayer.x < 760) { //760
            this.xCor -= myPlayer.speed;
        }
        if (myPlayer.currentSpeed != 0 && myPlayer.horizonalSpeed < 0 && myPlayer.verticalSpeed == 0 && myPlayer.x > 20) { //20
            this.xCor += myPlayer.speed;
        }
    }
}

var game;
var myPlayer;
var rocks;
var borders;
var chests;
var enemies = [];
var chestObjects = [];
var images = [];
var chestCount = 0;
var keyArray = [];

function keyPressed() {
    keyArray[keyCode] = 1;
}
function keyReleased() {
    keyArray[keyCode] = 0;
} 
//char creation
function chestChar() {
    //outer layer of chest
    fill(139, 69, 19);
    rect(0, 0, 400, 400);
    //inner layer of ches
    fill(205, 133, 63);
    rect(50, 50, 300, 300);
    //gold band of chest
    fill(255, 215, 0);
    rect(0, 150, 400, 50);
    //silver lock of chest
    fill(192, 192, 192);
    rect(175, 130, 50, 115);

    images.push(get(0, 0, width, height));

    //outer layer of chest
    fill(107, 156, 88);
    rect(0, 0, 400, 400);
    noStroke();
    images.push(get(0, 0, width, height));
}
function setup() {
    createCanvas(400, 400);
    chestChar();
    //initialize variables
    game = new gameObj();
    myPlayer = new player(200, 500, 3);
    rocks = new rock(0, 0);
    borders = new border(0, 0);
    chests = new chest(10000, 10000, images[0]);
    enemies.push(new enemy(50, 750));
    enemies.push(new enemy(100, 200));
    enemies.push(new enemy(200, 750));
    enemies.push(new enemy(500, 100));
    enemies.push(new enemy(30, 300));
    enemies.push(new enemy(500, 500));
    game.initialize();
    
}
function draw() {

    //before game start
    if (game.gameOver === -1) {
        fill(255, 255, 255);
        text("Press space bar to play", 125, 200);
        if (keyArray[32] === 1) {
            game.gameOver = 0;
        }
    //game    
    } else if (game.gameOver === 0) {
        background(107, 156, 88);
        push();
        translate(game.xCor, game.yCor);
        game.drawBackground();
        //check and draw each prize
        for (var i = 0; i < chestObjects.length; i++) {
            chestObjects[i].detectPlayer(myPlayer);
            chestObjects[i].draw(images[1]);
        }
        //check and draw each enemy
        for (var i = 0; i < enemies.length; i++) {
            enemies[i].draw();
            enemies[i].checkCollision();
            enemies[i].move(myPlayer);
        }
        //move and draw main character
        myPlayer.draw();
        myPlayer.move();
        myPlayer.checkCollision();
        pop();
        fill(255, 255, 255);
        text("prizes collected: " + chestCount, 200, 10);
        if(chestCount == 10){
            game.gameOver = 2;
        }
    //Game Lost    
    } else if (game.gameOver == 1) {
        fill(255, 0, 0);
        textSize(40);
        text("You Lose", 100, 200);
    //Game Won    
    }else if (game.gameOver == 2){
        fill(255, 0, 0);
        textSize(40);
        text("You Win", 125, 200);
    }
}