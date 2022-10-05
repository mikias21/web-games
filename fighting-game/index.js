const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

// Resize canvas 
canvas.width = 1024;
canvas.height = 576;

// Use canvas context for drawing shapes 
context.fillRect(0, 0, canvas.width, canvas.height);

// Gravity
const gravity = 0.7;

const background = new Sprite(
    {
        position: {x: 0, y: 0},
        imageSrc: "./img/background.png"
    }
);


const player = new Fighter(
    {
        position:{x: 0, y: 0},
        velocity:{x: 0, y: 10},
        offset: {
            x: 0,
            y: 0,
        }
    }
);

const enemy = new Fighter(
    {
        position: {x: 400, y: 100},
        velocity: {x: 0, y: 0},
        color:'blue',
        offset: {
            x: -50,
            y: 0,
        }
    },
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

let time = 60;
let timerId;
function decreaseTime(){
    if(time > 0){
        timerId = setTimeout(decreaseTime, 1000);
        time--;
        document.querySelector("#timer").innerHTML = time;
    }

    if(time === 0){
        determineWinner({player, enemy, timerId});   
    }
}

decreaseTime();


function animate(){
    window.requestAnimationFrame(animate);
    context.fillStyle = 'black';
    context.fillRect(0, 0, canvas.width, canvas.height);
    background.update();
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

    // detect collision
    if(rectangularCollision({rectangle1: player, rectangle2: enemy}) && (player.isAttacking)){
        player.isAttacking = false;
        enemy.health -= 20;
        document.querySelector('#enemyHealth').style.width = enemy.health + '%';
    }

    if(rectangularCollision({rectangle1: enemy, rectangle2: player}) && (enemy.isAttacking)){
        enemy.isAttacking = false;
        player.health -= 20;
        document.querySelector('#playerHealth').style.width = player.health + '%';
    }

    // end game based on health
    if(player.health <= 0 || enemy.health <= 0){
        determineWinner({player, enemy, timerId});
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
        case ' ':
            player.attack();
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
        
        case 'ArrowDown':
            enemy.isAttacking = true;
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