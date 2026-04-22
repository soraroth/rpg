// ==========================================
// 1. CHARAKTER DATEN (Zustand der Anwendung)
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
// 2. ELEMENTE AUS DEM HTML HOLEN (Caching)
// ==========================================
// Wir speichern die Referenzen einmalig ab, um Performance zu sparen.
const hpAnzeige = document.getElementById("hp-wert");
const wasserAnzeige = document.getElementById("wasser-wert");
const levelAnzeige = document.getElementById("level-wert");
const xpAnzeige = document.getElementById("xp-wert");
const xpZielAnzeige = document.getElementById("xp-ziel");
const manaAnzeige = document.getElementById("mana-wert");
const countdownAnzeige = document.getElementById("countdown-wert");

// ==========================================
// 3. LOGIK-FUNKTIONEN (Algorithmen)
// ==========================================

/**
 * Berechnet das Trinken von Wasser.
 * Bei Erreichen des Ziels gibt es HP-Bonus.
 */
function trinkeWasser(menge) {
    char.wasserEingenommen += menge;
    
    if (char.wasserEingenommen >= char.wasserZiel) {
        alert("Quest abgeschlossen: Du bist hydriert! +10 HP");
        char.hp = Math.min(char.hp + 10, char.maxHp); // Heilen, aber nicht über MaxHP
        char.wasserEingenommen = 0; // Reset für den nächsten Durchlauf
    }
    updateUI();
}

/**
 * Berechnet XP-Gewinn und den Level-Up-Algorithmus.
 */
function lerne(punkte) {
    char.xp += punkte;
    
    // Level-Up Check (Schleife, falls man genug XP für mehrere Level bekommt)
    while (char.xp >= char.xpBisLevelUp) {
        char.level += 1;
        char.xp -= char.xpBisLevelUp; 

        // EXPONENTIELLER ALGORITHMUS: +20% Schwierigkeit pro Level
        char.xpBisLevelUp = Math.round(char.xpBisLevelUp * 1.2);
        
        alert("LEVEL UP! Du bist jetzt Level " + char.level + "\nNächstes Ziel: " + char.xpBisLevelUp + " XP");
    }
    updateUI();
}

/**
 * Verbraucht Mana für Freizeit-Aktivitäten.
 */
function zocken(kosten) {
    if (char.mana >= kosten) {
        char.mana -= kosten;
        alert("Runde gezockt! Stress abgebaut, Mana verbraucht.");
    } else {
        alert("Du bist zu erschöpft zum Zocken. Lern erst mal was!");
    }
    updateUI();
}

/**
 * Berechnet die verbleibenden Tage bis zur Prüfung.
 */
function updateCountdown() {
    const jetzt = new Date();
    const differenz = char.pruefungsDatum - jetzt;
    
    // Umrechnung: ms -> s -> min -> h -> tage
    const tageNoch = Math.floor(differenz / (1000 * 60 * 60 * 24));

    if (countdownAnzeige) {
        countdownAnzeige.innerText = tageNoch > 0 ? tageNoch : "Viel Erfolg!";
    }
}

// ==========================================
// 4. UI-AKTUALISIERUNG (Darstellung)
// ==========================================

function updateUI() {
    // Texte aktualisieren
    hpAnzeige.innerText = char.hp;
    wasserAnzeige.innerText = char.wasserEingenommen;
    levelAnzeige.innerText = char.level;
    xpAnzeige.innerText = char.xp;
    xpZielAnzeige.innerText = char.xpBisLevelUp;
    manaAnzeige.innerText = char.mana;

    // Dynamische Farben für die HP (Visuelles Feedback)
    if (char.hp > 50) {
        hpAnzeige.style.color = "green";
    } else if (char.hp > 20) {
        hpAnzeige.style.color = "orange";
    } else {
        hpAnzeige.style.color = "red";
        hpAnzeige.style.fontWeight = "bold";
    }
}

// ==========================================
// 5. START DER ANWENDUNG
// ==========================================

// Den Countdown jede Sekunde aktualisieren
setInterval(updateCountdown, 1000);

// Initialer Aufruf beim Laden der Seite
updateCountdown();
updateUI();