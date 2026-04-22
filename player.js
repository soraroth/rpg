const Player = {
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
        }
    },

    init() {
        const savedData = Storage.load();
        if (savedData && savedData.pos) {
            this.data = savedData;
            console.log("> System: Daten geladen.");
        } else {
            // Falls kein Savegame da ist, setze Startwerte aus der Config
            this.data.pos.x = CONFIG.PLAYER.START_X;
            this.data.pos.y = CONFIG.PLAYER.START_Y;
            console.log("> System: Initialer Start.");
        }
    },

    updateMovement() {
        let dx = 0;
        let dy = 0;

        if (Input.isPressed('w')) dy -= CONFIG.PLAYER.SPEED;
        if (Input.isPressed('s')) dy += CONFIG.PLAYER.SPEED;
        if (Input.isPressed('a')) dx -= CONFIG.PLAYER.SPEED;
        if (Input.isPressed('d')) dx += CONFIG.PLAYER.SPEED;

        // Diagonal-Check
        if (dx !== 0 && dy !== 0) {
            const factor = 1 / Math.sqrt(2);
            dx *= factor;
            dy *= factor;
        }

        this.data.pos.x += dx;
        this.data.pos.y += dy;

        // Weltrand-Kollision
        this.data.pos.x = Math.max(0, Math.min(this.data.pos.x, CONFIG.WORLD.WIDTH - CONFIG.PLAYER.SIZE));
        this.data.pos.y = Math.max(0, Math.min(this.data.pos.y, CONFIG.WORLD.HEIGHT - CONFIG.PLAYER.SIZE));
    },

    gainXP(amount) {
        this.data.stats.xp += amount;
        while (this.data.stats.xp >= this.data.stats.xpTarget) {
            this.data.stats.xp -= this.data.stats.xpTarget;
            this.data.stats.level++;
            this.data.stats.xpTarget = Math.round(this.data.stats.xpTarget * CONFIG.STATS.LEVEL_UP_MULTIPLIER);
            this.data.stats.maxHp += 10;
            this.data.stats.hp = this.data.stats.maxHp;
            console.log("Level Up!");
        }
    },

    modifyStat(stat, amount) {
        let maxStat = stat === 'hp' ? 'maxHp' : 'maxMana';
        this.data.stats[stat] = Math.max(0, Math.min(this.data.stats[stat] + amount, this.data.stats[maxStat]));
        
        if (this.data.stats.hp <= 0) {
            this.die();
        }
    },

    die() {
        alert("System-Crash! HP bei 0.");
        Storage.clear();
    }
};

Player.init();