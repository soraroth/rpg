const keys = {};
window.addEventListener('keydown', e => keys[e.key.toLowerCase()] = true);
window.addEventListener('keyup', e => keys[e.key.toLowerCase()] = false);

const playerElement = document.getElementById('player');

function gameLoop() {
    movePlayer(keys);
    
    // Charakter auf dem Bildschirm zeichnen
    playerElement.style.left = player.x + 'px';
    playerElement.style.top = player.y + 'px';
    
    // UI Update (Balken)
    document.getElementById("hp-bar").style.width = player.stats.hp + "%";
    document.getElementById("mana-bar").style.width = player.stats.mana + "%";

    requestAnimationFrame(gameLoop);
}

gameLoop();