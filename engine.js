/**
 * CORE ENGINE MODULE - REPAIR VERSION
 */
const Engine = {
    lastTime: 0,
    playerEl: document.getElementById('player'),
    logEl: document.getElementById('terminal-log'),

    start() {
        console.log("> Engine: Systeme werden hochgefahren...");
        // Sicherstellen, dass die UI einmal initial gezeichnet wird
        this.updateUI(); 
        requestAnimationFrame((time) => this.loop(time));
    },

    loop(currentTime) {
        // Delta Time für flüssige Bewegungen
        const deltaTime = currentTime - this.lastTime;
        this.lastTime = currentTime;

        // 1. BEWEGUNG (Greift auf Player-Modul zu)
        Player.updateMovement();

        // 2. KAMERA (Greift auf World-Modul zu)
        World.updateCamera();

        // 3. RENDERING (Spieler-Position im Viewport)
        this.playerEl.style.transform = `translate(${Player.data.pos.x}px, ${Player.data.pos.y}px)`;

        // 4. UI UPDATES
        this.updateUI();

        // Nächsten Frame anfordern
        requestAnimationFrame((time) => this.loop(time));
    },

    updateUI() {
        const s = Player.data.stats;
        // Check ob Elemente existieren, um Fehler zu vermeiden
        if(document.getElementById('hp-wert')) {
            document.getElementById('hp-wert').innerText = Math.round(s.hp);
            document.getElementById('mana-wert').innerText = Math.round(s.mana);
            document.getElementById('level-wert').innerText = s.level;
            
            document.getElementById('bar-hp').style.width = (s.hp / s.maxHp * 100) + "%";
            document.getElementById('bar-mana').style.width = (s.mana / s.maxMana * 100) + "%";
            document.getElementById('bar-xp').style.width = (s.xp / s.xpTarget * 100) + "%";
        }
    }
};

// MOTOR STARTEN
Engine.start();