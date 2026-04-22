/**
 * WORLD & CAMERA MODULE
 * Verwaltet die Objekte der Welt und die Kameraperspektive.
 */
const World = {
    entities: [],
    viewport: { x: 0, y: 0 },
    
    // DOM Referenzen
    worldEl: document.getElementById('world'),
    viewportEl: document.getElementById('game-viewport'),

    /**
     * Initialisiert die Welt und erstellt die ersten Objekte
     */
    init() {
        // Weltgröße aus CONFIG setzen
        this.worldEl.style.width = CONFIG.WORLD.WIDTH + 'px';
        this.worldEl.style.height = CONFIG.WORLD.HEIGHT + 'px';

        // Beispiel-Objekte erstellen (Hier "klatschen" wir die Welt voll)
        this.addEntity(400, 300, 80, 50, 'terminal', 'Mainframe');
        this.addEntity(100, 500, 40, 40, 'coffee', 'Kaffeemaschine');
        this.addEntity(800, 200, 100, 60, 'server', 'Datenbank-Cluster');
        
        console.log(`> World: ${this.entities.length} Entitäten materialisiert.`);
    },

    /**
     * Erstellt ein neues interaktives Objekt in der Welt
     */
    addEntity(x, y, w, h, type, label) {
        const entity = { x, y, w, h, type, label };
        
        // Visuelles Element erstellen
        const el = document.createElement('div');
        el.className = `entity ${type}`;
        el.style.left = x + 'px';
        el.style.top = y + 'px';
        el.style.width = w + 'px';
        el.style.height = h + 'px';
        el.innerHTML = `<span class="entity-label">${label}</span>`;
        
        this.worldEl.appendChild(el);
        this.entities.push(entity);
    },

    /**
     * Kamera-Logik: Folgt dem Spieler sanft (Interpolation)
     */
    updateCamera() {
        // Ziel: Spieler in die Mitte des Viewports setzen
        const targetX = Player.data.pos.x - this.viewportEl.offsetWidth / 2 + CONFIG.PLAYER.SIZE / 2;
        const targetY = Player.data.pos.y - this.viewportEl.offsetHeight / 2 + CONFIG.PLAYER.SIZE / 2;

        // Viewport-Grenzen einhalten (Kamera stoppt am Weltrand)
        this.viewport.x = Math.max(0, Math.min(targetX, CONFIG.WORLD.WIDTH - this.viewportEl.offsetWidth));
        this.viewport.y = Math.max(0, Math.min(targetY, CONFIG.WORLD.HEIGHT - this.viewportEl.offsetHeight));

        // Welt-Div verschieben (Parallax-Effekt)
        this.worldEl.style.transform = `translate(${-this.viewport.x}px, ${-this.viewport.y}px)`;
    },

    /**
     * Prüft Kollisionen zwischen Spieler und allen Entitäten
     */
    checkCollisions() {
        const p = {
            x: Player.data.pos.x,
            y: Player.data.pos.y,
            w: CONFIG.PLAYER.SIZE,
            h: CONFIG.PLAYER.SIZE
        };

        for (let ent of this.entities) {
            if (p.x < ent.x + ent.w &&
                p.x + p.w > ent.x &&
                p.y < ent.y + ent.h &&
                p.y + p.h > ent.y) {
                return ent; // Gibt das Objekt zurück, mit dem wir kollidieren
            }
        }
        return null;
    }
};

// Initialisierung
World.init();