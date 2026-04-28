function Bullet(x, y) {
    this.x = x;
    this.y = y;
    this.width = 3;
    this.height = 3;
    this.color = '#f00';
    this.active = true;
    this.x_velocity = 0;
    this.y_velocity = -5;
}

Bullet.prototype.render = function (context) {
    context.fillStyle = this.color;
    context.fillRect(this.x, this.y, this.width, this.height);
};

Bullet.prototype.update = function (canvas) {
    this.x += this.x_velocity;
    this.y += this.y_velocity;
    this.active = this.active &&
                    this.x >= 0 && this.x <= canvas.width &&
                    this.y >= 0 && this.y <= canvas.height;
};

var player_bullets = [];

function Ranger (canvas) {
    this.height = 32;
    this.width = 32;
    this.x = (canvas.width / 2) - (this.width / 2);
    this.y = canvas.height - (this.height + 10);
    this.active = true;
}

Ranger.prototype.render = function (context, shipSprite) {
    var sx = 40,
        sy = 40;
    context.drawImage(shipSprite, sx, sy, 180, 180,
                        this.x, this.y, this.width, this.height);
};

Ranger.prototype.update = function (canvas, keyDowns) {
    var key;
    for (key in keyDowns) {
        key = Number(key);
        if (key === 37) { // left arrow
            if (this.x <= 0) {
                this.x = 0;
            } else {
                this.x -= 4;
            }
        } else if (key === 39) { // right arrow
            if ((this.x + this.width) >= canvas.width) {
                this.x = canvas.width - this.width;
            } else {
                this.x += 4;
            }
        } else if (key === 32) { // space bar
            this.shoot();
        }
    }
};

Ranger.prototype.shoot = function () {
    var x_bullet_position = this.x + (this.width / 2),
        y_bullet_position = this.y + (this.height / 2);
    player_bullets.push(new Bullet(x_bullet_position, y_bullet_position));
};

Ranger.prototype.explode = function () {
    this.active = false;
};

var enemies = [];

function Enemy (x, y) {
    this.height = 32;
    this.width = 32;
    this.x = x;
    this.y = y;
    this.x_velocity = 0;
    this.y_velocity = 0;
    this.active = true;
    this.selector = Math.floor(Math.random() * 3);
}

Enemy.prototype.render = function (context, alienSprite) {
    var sx = 38 * this.selector,
        sy = 0;
    context.drawImage(alienSprite, sx, sy, 40, 40,
                        this.x, this.y, this.width, this.height);
};

Enemy.prototype.update = function (canvas) {
    this.x += this.x_velocity;
    this.y += this.y_velocity;
    this.active = this.active &&
                    this.x >= 0 && this.x <= canvas.width &&
                    this.y >= 0 && this.y <= canvas.height;
};

Enemy.prototype.explode = function () {
    this.active = false;
};

function box_collision (a, b) {
    return a.x < (b.x + b.width) && (a.x + a.width) > b.x &&
        a.y < (b.y + b.height) && (a.y + a.height) > b.y;
}

function enemy_collisions (player) {
    // player kills
    player_bullets.forEach(function (bullet) {
        enemies.forEach(function (enemy) {
            if (box_collision(bullet, enemy)) {
                enemy.explode();
                bullet.active = false;
            }
        });
    });

    // enemy kills
    enemies.forEach(function (enemy) {
        if (box_collision(enemy, player)){
            enemy.explode();
            player.explode();
        }
    });
}

var animate = window.requestAnimationFrame ||
              window.webkitRequestAnimationFrame ||
              window.mozRequestAnimationFrame ||
              function (callback) { window.setTimeout(callback, 1000 / 60); };
var canvas = document.createElement('canvas');
var context = canvas.getContext('2d');
canvas.width = 600;
canvas.height = 400;
var alienSprite = new Image();
alienSprite.src = '/static/media/images/aliensprite.png';
var shipSprite = new Image();
shipSprite.src = '/static/media/images/ships.png';
var player;
var keyDowns = {};

var initialize = function () {
    player = new Ranger(canvas);
    
    var x = 80,
        y = 0;
    
    while (enemies.length < 55) {
        if (enemies.length % 11 === 0) {
            x = 80;
            y += 40;
        }
        enemies.push(new Enemy(x, y));
        x += 40;
    }
};

var update = function () {
    context.fillStyle = '#1f1f1f';
    context.fillRect(0, 0, canvas.width, canvas.height);

    player.update(canvas, keyDowns);

    player_bullets.forEach(function (bullet) {
        bullet.update(canvas);
    });

    player_bullets = player_bullets.filter(function (bullet) {
        return bullet.active;
    });

    enemies.forEach(function (enemy) {
        enemy.update(canvas);
    });

    enemies = enemies.filter(function (enemy) {
        return enemy.active;
    });

    enemy_collisions(player);
};

var render = function () {
    if (player.active) {
        player.render(context, shipSprite);

        player_bullets.forEach(function (bullet) {
            bullet.render(context);
        });

        enemies.forEach(function (enemy) {
            enemy.render(context, alienSprite);
        });
    } else {
        context.font = '40px Verdana';
        context.fillStyle = '#f00';
        context.fillText('Game Over', canvas.width / 5, canvas.height / 3);
    }
};

var step = function () {
    update();
    render();
    animate(step);
};

window.addEventListener('keydown', function (event) {
    keyDowns[event.keyCode] = true;
});

window.addEventListener('keyup', function (event) {
    delete keyDowns[event.keyCode];
});

window.onload = function () {
    document.body.appendChild(canvas);
    initialize();
    animate(step);
};
