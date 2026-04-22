/**
 * CORE ENGINE MODULE
 * Verbindet Player, World, Input und Storage zu einem lebendigen Spiel.
 */
const Engine = {
    lastTime: 0,
    saveTimer: 0,
    playerEl: document.getElementById('player'),
    logEl: document.getElementById('terminal-log'),

    /**
     * Startet den Game-Loop
     */
    start() {
        console.log("> Engine: Systeme werden hochgefahren...");
        requestAnimationFrame((time) => this.loop(time));
    },

    /**
     * Der Haupt-Loop (läuft mit ca. 60 FPS)
     */
    loop(currentTime) {
        // Delta Time berechnen (Zeit zwischen zwei Frames)
        const deltaTime = currentTime - this.lastTime;
        this.lastTime = currentTime;

        // 1. INPUT & BEWEGUNG
        Player.updateMovement();

        // 2. WELT-LOGIK & KAMERA
        World.updateCamera();

        // 3. KOLLISION & INTERAKTION
        this.handleInteractions();

        // 4. RENDERING (Spieler-Position im Viewport)
        this.renderPlayer();

        // 5. UI UPDATES
        this.updateUI();

        // 6. AUTO-SAVE (Alle 5 Sekunden)
        this.handleAutoSave(deltaTime);

        // Nächsten Frame anfordern
        requestAnimationFrame((time) => this.loop(time));
    },

    /**
     * Verarbeitet die Nähe zu Objekten
     */
    handleInteractions() {
        const activeEntity = World.checkCollisions();
        
        if (activeEntity) {
            this.log(`Nähe: ${activeEntity.label} | [E] zum Interagieren`);
            
            if (Input.isPressed('e')) {
                this.executeInteraction(activeEntity);
            }
        } else {
            // Standard-Nachricht wenn nichts passiert
            if (this.saveTimer > 1000) this.log("System stabil. Erkunde das Netzwerk...");
        }
    },

    /**
     * Logik für verschiedene Objekt-Typen
     */
    executeInteraction(ent) {
        switch(ent.type) {
            case 'terminal':
                if (Player.data.stats.mana >= 5) {
                    Player.gainXP(10);
                    Player.modifyStat('mana', -2);
                    this.log(`> Hacke ${ent.label}... +10 XP | -2 Mana`);
                } else {
                    this.log("> ERROR: Mana zu niedrig für Compiler-Vorgang!");
                }
                break;
            case 'coffee':
                Player.modifyStat('mana', 5);
                this.log("> Kaffee konsumiert. Mana regeneriert.");
                break;
            case 'server':
                Player.gainXP(50);
                Player.modifyStat('hp', -10);
                this.log("> Große Datenbank synchronisiert. Stressfaktor hoch! -10 HP");
                break;
        }
    },

    /**
     * UI mit den Player-Stats synchronisieren
     */
    updateUI() {
        const s = Player.data.stats;
        
        // Texte aktualisieren
        document.getElementById('hp-wert').innerText = Math.round(s.hp);
        document.getElementById('mana-wert').innerText = Math.round(s.mana);
        document.getElementById('xp-wert').innerText = Math.round(s.xp);
        document.getElementById('xp-ziel').innerText = s.xpTarget;
        document.getElementById('level-wert').innerText = s.level;

        // Balken skalieren
        document.getElementById('bar-hp').style.width = (s.hp / s.maxHp * 100) + "%";
        document.getElementById('bar-mana').style.width = (s.mana / s.maxMana * 100) + "%";
        document.getElementById('bar-xp').style.width = (s.xp / s.xpTarget * 100) + "%";
    },

    renderPlayer() {
        // Der Spieler wird relativ zur Welt gezeichnet
        this.playerEl.style.transform = `translate(${Player.data.pos.x}px, ${Player.data.pos.y}px)`;
    },

    log(msg) {
        // Nur loggen wenn die Nachricht neu ist, um Spam zu vermeiden
        if (this.logEl.innerText !== `> ${msg}`) {
            this.logEl.innerText = `> ${msg}`;
        }
    },

    handleAutoSave(dt) {
        this.saveTimer += dt;
        if (this.saveTimer >= 5000) { // Alle 5 Sek
            Storage.save(Player.data);
            console.log("> System: Auto-Save durchgeführt.");
            this.saveTimer = 0;
        }
    }
};

// MOTOR STARTEN
Engine.start();