/**
 * @file main.js
 * @description Central Entry Point & Bootloader für die Terminal RPG Engine.
 */

import { Engine } from './Engine.js';
import { Player } from '../entities/Player.js';
import { World } from './World.js';

/**
 * Initialisiert das System nach dem Laden des DOM.
 */
document.addEventListener('DOMContentLoaded', async () => {
    const terminal = document.getElementById('terminal-log');
    
    try {
        console.log("--- SYSTEM BOOT INITIATED ---");
        
        // 1. Initialisiere Welt-Entitäten
        World.init();
        
        // 2. Initialisiere Spieler-Daten (lädt ggf. Savegame)
        Player.init();
        
        // 3. Starte die Game-Engine
        Engine.start();
        
        if (terminal) {
            const p = document.createElement('p');
            p.className = 'sys-msg success';
            p.innerText = '> Kern-Module erfolgreich geladen. Engine aktiv.';
            terminal.appendChild(p);
        }

    } catch (error) {
        console.error("BOOT ERROR:", error);
        if (terminal) {
            terminal.innerHTML += `<p class="sys-msg error">> FATAL: ${error.message}</p>`;
        }
    }
});