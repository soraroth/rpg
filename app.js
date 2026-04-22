const char = {
    level: 1,
    xp: 0,
    xpBisLevelUp: 100,
    hp: 100,
    maxHp: 100,
    wasserEingenommen: 0,
    mana: 50,
    maxMana: 100,
    wasserZiel: 2500,
    pruefungsDatum: new Date("2026-09-30")
};

const logBox = document.getElementById("game-log");
const statsFenster = document.getElementById("stats-fenster");

// Hilfsfunktion für Nachrichten
function logMessage(text) {
    logBox.innerText = `> ${text}`;
}

function trinkeWasser(menge) {
    char.wasserEingenommen += menge;
    logMessage(`${menge}ml getrunken.`);
    if (char.wasserEingenommen >= char.wasserZiel) {
        logMessage("Quest abgeschlossen: Hydriert! +10 HP");
        char.hp = Math.min(char.hp + 10, char.maxHp);
        char.wasserEingenommen = 0;
    }
    updateUI();
}

function lerne(punkte, manaKosten) {
    if (char.mana < manaKosten) {
        char.hp -= 10;
        logMessage("BURNOUT! Zu wenig Mana. -10 HP!");
        statsFenster.classList.add("shake");
        setTimeout(() => statsFenster.classList.remove("shake"), 200);
        
        if (char.hp <= 0) {
            alert("Game Over!");
            location.reload();
            return;
        }
    } else {
        char.mana -= manaKosten;
        logMessage(`${punkte} XP gelernt.`);
    }

    char.xp += punkte;
    while (char.xp >= char.xpBisLevelUp) {
        char.level++;
        char.xp -= char.xpBisLevelUp;
        char.xpBisLevelUp = Math.round(char.xpBisLevelUp * 1.3);
        logMessage(`LEVEL UP! Du bist jetzt Level ${char.level}`);
    }
    updateUI();
}

function zocken(reg) {
    char.mana = Math.min(char.mana + reg, char.maxMana);
    logMessage(`Pause gemacht. +${reg} Mana regeneriert.`);
    updateUI();
}

function updateUI() {
    document.getElementById("hp-wert").innerText = char.hp;
    document.getElementById("mana-wert").innerText = char.mana;
    document.getElementById("xp-wert").innerText = char.xp;
    document.getElementById("xp-ziel").innerText = char.xpBisLevelUp;
    document.getElementById("level-wert").innerText = char.level;
    document.getElementById("wasser-wert").innerText = char.wasserEingenommen;

    // Balken berechnen
    document.getElementById("hp-bar").style.width = (char.hp / char.maxHp * 100) + "%";
    document.getElementById("mana-bar").style.width = (char.mana / char.maxMana * 100) + "%";
    document.getElementById("xp-bar").style.width = (char.xp / char.xpBisLevelUp * 100) + "%";
}

// Canvas Logik (wie vorher)...
const canvas = document.getElementById('wasser-canvas');
const ctx = canvas.getContext('2d');
let animationWave = 0;

function drawWater() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const height = canvas.height * (char.wasserEingenommen / char.wasserZiel);
    ctx.fillStyle = "rgba(0, 122, 204, 0.4)";
    ctx.beginPath();
    for (let x = 0; x <= canvas.width; x++) {
        const y = Math.sin(x * 0.05 + animationWave) * 5;
        ctx.lineTo(x, canvas.height - height + y);
    }
    ctx.lineTo(canvas.width, canvas.height); ctx.lineTo(0, canvas.height);
    ctx.fill();
    animationWave += 0.05;
    requestAnimationFrame(drawWater);
}

function resizeCanvas() {
    canvas.width = canvas.parentElement.offsetWidth;
    canvas.height = canvas.parentElement.offsetHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();
drawWater();
updateUI();