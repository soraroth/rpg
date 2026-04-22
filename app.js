// ==========================================
// CHARAKTER STATS (In einem Objekt gebündelt)
// ==========================================
const char = {
    level: 1,
    xp: 0,
    xpBisLevelUp: 100,
    hp: 100,
    wasserEingenommen: 0,
    mana: 50,
    wasserZiel: 2500,
    pruefungsDatum: new Date("2026-09-30")
};

// ==========================================
// FUNKTIONEN
// ==========================================

function trinkeWasser(menge) {
    char.wasserEingenommen += menge;
    
    if (char.wasserEingenommen >= char.wasserZiel) {
        alert("Quest abgeschlossen: Du bist hydriert! +10 HP");
        char.hp += 10;
        char.wasserEingenommen = 0; // Reset für den nächsten Tag?
    }
    updateUI();
}

function lerne(punkte) {
    char.xp += punkte;
    
    if (char.xp >= char.xpBisLevelUp) {
        char.level += 1;
        char.xp -= char.xpBisLevelUp; // Rest-XP behalten
        char.xpBisLevelUp += 50;      // Schwierigkeit erhöhen
        alert("LEVEL UP! Du bist jetzt Level " + char.level);
    }
    updateUI();
}

function zocken(kosten) {
    if (char.mana >= kosten) {
        char.mana -= kosten;
        alert("Runde gezockt! Mana verbraucht.");
    } else {
        alert("Du bist zu erschöpft zum Zocken!");
    }
    updateUI();
}

// Countdown-Logik
setInterval(function() {
    const jetzt = new Date();
    const differenz = char.pruefungsDatum - jetzt;
    const tageNoch = Math.floor(differenz / (1000 * 60 * 60 * 24));

    const anzeige = document.getElementById("countdown-wert");
    if (anzeige) {
        anzeige.innerText = tageNoch;
    }
}, 1000);

// UI-Update Funktion
function updateUI() {
    document.getElementById("hp-wert").innerText = char.hp;
    document.getElementById("wasser-wert").innerText = char.wasserEingenommen;
    document.getElementById("level-wert").innerText = char.level;
    document.getElementById("xp-wert").innerText = char.xp;
    document.getElementById("xp-ziel").innerText = char.xpBisLevelUp;
    document.getElementById("mana-wert").innerText = char.mana;
}

// Initialer Aufruf, damit beim Starten alles geladen ist
updateUI();