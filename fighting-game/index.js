const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

// Resize canvas 
canvas.width = 1024;
canvas.height = 576;

// Use canvas context for drawing shapes 
context.fillRect(0, 0, canvas.width, canvas.height);

// Gravity
const gravity = 0.7;

class Sprite{
    constructor({position, velocity}){
        this.position = position;
        this.velocity = velocity;
        this.width = 50;
        this.height = 150;
        this.lastKey;
    }

    draw(){
        context.fillStyle = 'red';
        context.fillRect(this.position.x, this.position.y, this.width, this.height);
    }

    update(){
        this.draw();
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;

        if(this.position.y + this.height + this.velocity.y >= canvas.height){
            this.velocity.y = 0;  
        }else{
            this.velocity.y += gravity;
        }
    }
}

const player = new Sprite(
    {
        position:{x: 0, y: 0},
        velocity:{x: 0, y: 10}
    }
);

const enemy = new Sprite(
    {
        position: {x: 400, y: 100},
        velocity: {x: 0, y: 0}
    }
);

const keys = {
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
    w: {
        pressed: false
    },
    ArrowLeft: {
        pressed: false
    },
    ArrowRight: {
        pressed: false
    },
    ArrowUp: {
        pressed: false
    }
}


function animate(){
    window.requestAnimationFrame(animate);
    context.fillStyle = 'black';
    context.fillRect(0, 0, canvas.width, canvas.height);
    player.update();
    enemy.update();

    player.velocity.x = 0;

    // Player Movement
    if(keys.a.pressed && player.lastKey === 'a'){
        player.velocity.x = -5;
    }else if(keys.d.pressed && player.lastKey === 'd'){
        player.velocity.x = 5;
    }

    enemy.velocity.x = 0;
    // Enemy Movement
    if(keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft'){
        enemy.velocity.x = -5;
    }else if(keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight'){
        enemy.velocity.x = 5;
    }
}

animate();

// Move player with event listen
window.addEventListener('keydown', (event) => {
    switch(event.key){
        case 'd':
            keys.d.pressed = true;
            player.lastKey = 'd';
            break;

        case 'a':
            keys.a.pressed = true;
            player.lastKey = 'a';
            break;

        case 'w':
            keys.w.pressed = true;
            player.velocity.y = -20;
            break;
        
        // Enemy keys
        case 'ArrowRight':
            keys.ArrowRight.pressed = true;
            enemy.lastKey = 'ArrowRight'
            break;
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = true;
            enemy.lastKey = 'ArrowLeft';
            break;

        case 'ArrowUp':
            keys.ArrowUp.pressed = true;
            enemy.velocity.y = -20;
            break;
        
    }
});

// Move player with event listen
window.addEventListener('keyup', (event) => {
    switch(event.key){
        case 'd':
            keys.d.pressed = false;
            break;

        case 'a':
            keys.a.pressed = false;
            break;
        case 'w':
            keys.w.pressed = false;
            break;
        // Enemy keys
        case 'ArrowRight':
            keys.ArrowRight.pressed = false;
            break;
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false;
            break;

        case 'ArrowUp':
            keys.ArrowUp.pressed = false;
            break;
    }
});