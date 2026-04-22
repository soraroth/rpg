import { Player } from '../entities/Player.js';
import { World } from './World.js';

export const Engine = {
    playerEl: document.getElementById('player'),
    start() { requestAnimationFrame((t) => this.loop(t)); },
    loop(t) {
        Player.updateMovement();
        World.updateCamera();
        this.render();
        requestAnimationFrame((t) => this.loop(t));
    },
    render() {
        this.playerEl.style.transform = `translate(${Player.data.pos.x}px, ${Player.data.pos.y}px)`;
    }
};