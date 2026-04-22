const Storage = {
    // Schlüssel für den LocalStorage
    DB_NAME: 'TERMINAL_RPG_DATA',

    save(data) {
        try {
            const jsonData = JSON.stringify(data);
            localStorage.setItem(this.DB_NAME, jsonData);
        } catch (e) {
            console.error("Speichern fehlgeschlagen:", e);
        }
    },

    load() {
        try {
            const data = localStorage.getItem(this.DB_NAME);
            return data ? JSON.parse(data) : null;
        } catch (e) {
            console.error("Laden fehlgeschlagen:", e);
            return null;
        }
    },

    clear() {
        localStorage.removeItem(this.DB_NAME);
        location.reload(); // Spiel neu starten
    }
};