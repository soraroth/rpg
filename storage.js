const Storage = {
    save(data) {
        localStorage.setItem('rpg_savegame', JSON.stringify(data));
    },
    load() {
        const saved = localStorage.getItem('rpg_savegame');
        return saved ? JSON.parse(saved) : null;
    }
};