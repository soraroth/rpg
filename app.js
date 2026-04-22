// ==========================================
// 1. CHARAKTER DATEN
// ==========================================
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

// ==========================================
// 2. ELEMENTE & CANVAS SETUP
// ==========================================
const hpAnzeige = document.getElementById("hp-wert");
const wasserAnzeige = document.getElementById("wasser-wert");
const levelAnzeige = document.getElementById("level-wert");
const xpAnzeige = document.getElementById("xp-wert");
const xpZielAnzeige = document.getElementById("xp-ziel");
const manaAnzeige = document.getElementById("mana-wert");
const countdownAnzeige = document.getElementById("countdown-wert");

const canvas = document.getElementById('wasser-canvas');
const ctx = canvas.getContext('2d');
let animationWave = 0;

// ==========================================
// 3. LOGIK-FUNKTIONEN
// ==========================================

function trinkeWasser(menge) {
    char.wasserEingenommen += menge;
    if (char.wasserEingenommen >= char.wasserZiel) {
        alert("Hydriert! +10 HP");
        char.hp = Math.min(char.hp + 10, char.maxHp);
        char.wasserEingenommen = 0;
    }
    updateUI();
}

function lerne(punkte, manaKosten) {
    if (char.mana < manaKosten) {
        char.hp -= 10;
        alert("Kein Mana! Burnout droht: -10 HP");
        if (char.hp <= 0) { alert("Game Over!"); location.reload(); return; }
    } else {
        char.mana -= manaKosten;
    }
    char.xp += punkte;
    while (char.xp >= char.xpBisLevelUp) {
        char.level++;
        char.xp -= char.xpBisLevelUp;
        char.xpBisLevelUp = Math.round(char.xpBisLevelUp * 1.2);
    }
    updateUI();
}

/** HERAUSFORDERUNG GELÖST: Zocken regeneriert jetzt Mana! **/
function zocken(regeneration) {
    if (char.mana >= char.maxMana) {
        alert("Dein Mana ist schon voll! Geh lieber lernen.");
    } else {
        char.mana = Math.min(char.mana + regeneration, char.maxMana);
        alert("Pause gemacht! Mana regeneriert.");
    }
    updateUI();
}

// ==========================================
// 4. ANIMATION (Das flüssige Wasser)
// ==========================================
function drawWater() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Berechne Füllhöhe (0 bis 1)
    const fillPercent = char.wasserEingenommen / char.wasserZiel;
    const height = canvas.height * fillPercent;
    
    ctx.fillStyle = "rgba(0, 122, 204, 0.4)";
    ctx.beginPath();
    
    // Einfache Sinus-Welle
    for (let x = 0; x <= canvas.width; x++) {
        const y = Math.sin(x * 0.05 + animationWave) * 5;
        ctx.lineTo(x, canvas.height - height + y);
    }
    
    ctx.lineTo(canvas.width, canvas.height);
    ctx.lineTo(0, canvas.height);
    ctx.fill();
    
    animationWave += 0.05;
    requestAnimationFrame(drawWater);
}

// Canvas-Größe anpassen
function resizeCanvas() {
    canvas.width = canvas.parentElement.offsetWidth;
    canvas.height = canvas.parentElement.offsetHeight;
}

// ==========================================
// 5. START
// ==========================================
window.addEventListener('resize', resizeCanvas);
resizeCanvas();
drawWater();
updateUI();

function updateUI() {
    hpAnzeige.innerText = char.hp;
    wasserAnzeige.innerText = char.wasserEingenommen;
    levelAnzeige.innerText = char.level;
    xpAnzeige.innerText = char.xp;
    xpZielAnzeige.innerText = char.xpBisLevelUp;
    manaAnzeige.innerText = char.mana;
    // Farben wie gehabt...
}