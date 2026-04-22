const player = {
    x: 100,
    y: 100,
    speed: 5,
    stats: Storage.load() || {
        hp: 100,
        mana: 50,
        level: 1,
        xp: 0
    }
};

function movePlayer(keys) {
    if (keys['w']) player.y -= player.speed;
    if (keys['s']) player.y += player.speed;
    if (keys['a']) player.x -= player.speed;
    if (keys['d']) player.x += player.speed;
    
    // Position speichern
    Storage.save(player.stats);
}