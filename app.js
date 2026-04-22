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
// 2. ELEMENTE AUS DEM HTML HOLEN
// ==========================================
const hpAnzeige = document.getElementById("hp-wert");
const wasserAnzeige = document.getElementById("wasser-wert");
const levelAnzeige = document.getElementById("level-wert");
const xpAnzeige = document.getElementById("xp-wert");
const xpZielAnzeige = document.getElementById("xp-ziel");
const manaAnzeige = document.getElementById("mana-wert");
const countdownAnzeige = document.getElementById("countdown-wert");

// ==========================================
// 3. LOGIK-FUNKTIONEN
// ==========================================

function trinkeWasser(menge) {
    char.wasserEingenommen += menge;
    if (char.wasserEingenommen >= char.wasserZiel) {
        alert("Quest abgeschlossen: Du bist hydriert! +10 HP");
        char.hp = Math.min(char.hp + 10, char.maxHp);
        char.wasserEingenommen = 0;
    }
    updateUI();
}

/**
 * Erweitertes Lernen: Kostet jetzt Mana. 
 * Wenn Mana 0 ist, verliert man HP (Burnout-Mechanik).
 */
function lerne(punkte, manaKosten) {
    // Burnout Check: Wenn nicht genug Mana da ist, geht's auf die HP
    if (char.mana < manaKosten) {
        char.hp -= 10;
        alert("Du hast kein Mana mehr! Das Lernen ist extrem anstrengend. -10 HP (Burnout-Gefahr!)");
        
        if (char.hp <= 0) {
            alert("Game Over! Du bist völlig ausgebrannt. Das RPG startet neu.");
            location.reload(); // Seite neu laden
            return;
        }
    } else {
        char.mana -= manaKosten;
    }

    char.xp += punkte;
    
    while (char.xp >= char.xpBisLevelUp) {
        char.level += 1;
        char.xp -= char.xpBisLevelUp; 
        char.xpBisLevelUp = Math.round(char.xpBisLevelUp * 1.2);
        alert("LEVEL UP! Du bist jetzt Level " + char.level);
    }
    updateUI();
}

/**
 * Zocken regeneriert im echten Leben Mana (Spaß), 
 * aber hier im Spiel ist es eine "Quest", die Mana verbraucht (Zeit).
 * Lass uns das später so umbauen, dass Zocken Mana REGENERIERT!
 */
function zocken(kosten) {
    if (char.mana >= kosten) {
        char.mana -= kosten;
        alert("Runde gezockt! Aber eigentlich solltest du Mana regenerieren...");
    } else {
        alert("Zu wenig Mana zum Zocken.");
    }
    updateUI();
}

function updateCountdown() {
    const jetzt = new Date();
    const differenz = char.pruefungsDatum - jetzt;
    const tageNoch = Math.floor(differenz / (1000 * 60 * 60 * 24));
    if (countdownAnzeige) {
        countdownAnzeige.innerText = tageNoch > 0 ? tageNoch : "Prüfung!";
    }
}

// ==========================================
// 4. UI-AKTUALISIERUNG
// ==========================================

function updateUI() {
    hpAnzeige.innerText = char.hp;
    wasserAnzeige.innerText = char.wasserEingenommen;
    levelAnzeige.innerText = char.level;
    xpAnzeige.innerText = char.xp;
    xpZielAnzeige.innerText = char.xpBisLevelUp;
    manaAnzeige.innerText = char.mana;

    // HP Farbe
    if (char.hp > 50) hpAnzeige.style.color = "green";
    else if (char.hp > 20) hpAnzeige.style.color = "orange";
    else hpAnzeige.style.color = "red";
    
    // Mana Farbe (Blau für Mana)
    manaAnzeige.style.color = "blue";
}

setInterval(updateCountdown, 1000);
updateCountdown();
updateUI();