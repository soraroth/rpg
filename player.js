/**
 * PLAYER MODULE
 * Verwaltet den Zustand, die Bewegung und die Metriken des Charakters.
 */
const Player = {
    // 1. Initialer Zustand (wird durch Storage überschrieben, falls vorhanden)
    data: {
        pos: { x: CONFIG.PLAYER.START_X, y: CONFIG.PLAYER.START_Y },
        stats: {
            hp: CONFIG.STATS.INITIAL_HP,
            maxHp: CONFIG.STATS.INITIAL_HP,
            mana: CONFIG.STATS.INITIAL_MANA,
            maxMana: CONFIG.STATS.INITIAL_MANA,
            level: 1,
            xp: 0,
            xpTarget: CONFIG.STATS.BASE_XP
        },
        appearance: {
            color: '#39ff14',
            trail: [] // Für spätere Bewegungs-Effekte
        }
    },

    /**
     * Initialisiert den Spieler und lädt Spielstände
     */
    init() {
        const savedData = Storage.load();
        if (savedData) {
            this.data = savedData;
            console.log("> System: Spielstand erfolgreich aus dem Kernspeicher geladen.");
        } else {
            console.log("> System: Neuer Charakter im Terminal materialisiert.");
        }
    },

    /**
     * Berechnet die Bewegung basierend auf dem Input-Modul
     */
    updateMovement() {
        let dx = 0;
        let dy = 0;

        if (Input.isPressed('w')) dy -= CONFIG.PLAYER.SPEED;
        if (Input.isPressed('s')) dy += CONFIG.PLAYER.SPEED;
        if (Input.isPressed('a')) dx -= CONFIG.PLAYER.SPEED;
        if (Input.isPressed('d')) dx += CONFIG.PLAYER.SPEED;

        // Normierung der Diagonalgeschwindigkeit (Pythagoras), 
        // damit man diagonal nicht schneller läuft als geradeaus.
        if (dx !== 0 && dy !== 0) {
            const factor = 1 / Math.sqrt(2);
            dx *= factor;
            dy *= factor;
        }

        this.data.pos.x += dx;
        this.data.pos.y += dy;

        // Weltgrenzen-Check (Collision mit dem Rand)
        this.data.pos.x = Math.max(0, Math.min(this.data.pos.x, CONFIG.WORLD.WIDTH - CONFIG.PLAYER.SIZE));
        this.data.pos.y = Math.max(0, Math.min(this.data.pos.y, CONFIG.WORLD.HEIGHT - CONFIG.PLAYER.SIZE));
    },

    /**
     * Professioneller Level-Up Algorithmus
     * @param {number} amount - Die Menge an XP
     */
    gainXP(amount) {
        this.data.stats.xp += amount;
        
        // Während-Schleife für Mehrfach-Level-Ups
        while (this.data.stats.xp >= this.data.stats.xpTarget) {
            this.data.stats.xp -= this.data.stats.xpTarget;
            this.data.stats.level++;
            
            // Exponentielles Wachstum der XP-Kurve
            this.data.stats.xpTarget = Math.round(this.data.stats.xpTarget * CONFIG.STATS.LEVEL_UP_MULTIPLIER);
            
            // Stats verbessern sich beim Level-Up
            this.data.stats.maxHp += 10;
            this.data.stats.maxMana += 5;
            this.data.stats.hp = this.data.stats.maxHp; // Volle Heilung
            
            console.log(`> LEVEL UP: Erreicht Level ${this.data.stats.level}!`);
        }
    },

    /**
     * Verarbeitet Schaden oder Ressourcenverbrauch
     */
    modifyStat(stat, amount) {
        if (this.data.stats[stat] !== undefined) {
            this.data.stats[stat] = Math.max(0, Math.min(this.data.stats[stat] + amount, this.data.stats[`max${stat.charAt(0).toUpperCase()