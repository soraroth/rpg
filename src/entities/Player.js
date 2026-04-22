import { CONFIG } from '../utils/Config.js';
import { Storage } from '../utils/Storage.js';
import { Input } from '../core/Input.js';

export const Player = {
    data: {
        pos: { x: CONFIG.PLAYER.START_X, y: CONFIG.PLAYER.START_Y },
        stats: { hp: 100, maxHp: 100, mana: 50, maxMana: 50, level: 1, xp: 0, xpTarget: 100 }
    },
    init() {
        const saved = Storage.load();
        if (saved) this.data = saved;
    },
    updateMovement() {
        let dx = 0, dy = 0;
        if (Input.isPressed('w')) dy -= CONFIG.PLAYER.SPEED;
        if (Input.isPressed('s')) dy += CONFIG.PLAYER.SPEED;
        if (Input.isPressed('a')) dx -= CONFIG.PLAYER.SPEED;
        if (Input.isPressed('d')) dx += CONFIG.PLAYER.SPEED;
        this.data.pos.x += dx;
        this.data.pos.y += dy;
        
        // Grenzen
        this.data.pos.x = Math.max(0, Math.min(this.data.pos.x, CONFIG.WORLD.WIDTH - CONFIG.PLAYER.SIZE));
        this.data.pos.y = Math.max(0, Math.min(this.data.pos.y, CONFIG.WORLD.HEIGHT - CONFIG.PLAYER.SIZE));
    }
};