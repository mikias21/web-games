function rectangularCollision({rectangle1, rectangle2}){
    return(
        (rectangle1.attackBox.position.x + rectangle1.attackBox.width >= rectangle2.position.x) && 
        (rectangle1.attackBox.position.x <= rectangle2.position.x + rectangle2.width) &&
        (rectangle1.attackBox.position.y + rectangle1.attackBox.height >= rectangle2.position.y) &&
        (rectangle1.attackBox.position.y <= rectangle2.position.y + rectangle2.height)
    );
}

function determineWinner({player, enemy, timerId}){
    clearTimeout(timerId);
    document.querySelector('#status').style.display = 'flex';
    if(player.health === enemy.health){
        document.querySelector('#status').innerHTML = 'Tie';
    }else if(player.health > enemy.health){
        document.querySelector('#status').innerHTML = 'Player 1 wins';
    }else if(enemy.health > player.health){
        document.querySelector('#status').innerHTML = 'Player 2 wins';
    }
}