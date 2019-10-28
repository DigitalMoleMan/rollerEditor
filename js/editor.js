class Editor {
    constructor() {
        this.activeTool = () => tools[toolSelect.value];
        this.activeLevel = new Level();

        this.cursorX = () => pxToTiles(mouse.x);
        this.cursorY = () => pxToTiles(mouse.y);

        this.scrollX = 0;
        this.scrollY = 0;

        this.cursorTileX = () => this.cursorX() + this.scrollX;
        this.cursorTileY = () => this.cursorY() + this.scrollY;

        canvas.addEventListener("mousedown", (e) => this.activeTool().mouseDown(e));
        canvas.addEventListener("mouseup", (e) => {
            this.activeTool().mouseUp(e)
            this.saveLevelToLocalStorage('test', this.activeLevel);
        });
        canvas.addEventListener("mousemove", (e) => this.activeTool().mouseMove(e));

        document.addEventListener('KeyW', () => this.scrollY--);
        document.addEventListener('KeyA', () => this.scrollX--);
        document.addEventListener('KeyS', () => this.scrollY++);
        document.addEventListener('KeyD', () => this.scrollX++);
    }


    /**
     * Resets the editor to a blank slate.
     */
    newLevel() {
        if (confirm("Are you sure?")) {
            this.activeLevel = new Level();
            scrollX = 0;
            scrollY = 0;

            this.saveLevelToLocalStorage('test', this.activeLevel);
        }
    }

    setActiveLevel(level) {
        this.activeLevel = level;
    }

    /**
     * 
     * @param {File} inputFile 
     */
    async setActiveLevelFromFile(inputFile) {
        var levelData = await this.getLevelDataFromFile(inputFile);
        this.setActiveLevel(new Level(levelData));
    }

    /**
     * Converts a JSON file input to an object.
     * @param {File} inputFile JSON.
     * @returns {Object} level data as an object.
     */
    getLevelDataFromFile = inputFile => {
        return new Promise(resolve => {
            var reader = new FileReader();
            reader.onload = () => resolve(JSON.parse(reader.result));
            reader.readAsText(inputFile);
        });
    };

    /**
     * Downloads level in a JSON file.
     * @param {Level} level 
     */
    saveLevelToJSON(level) {
        var levelString = JSON.stringify(level);
        console.log(levelString);
        var dataStr =
            "data:text/json;charset=utf-8," + encodeURIComponent(levelString);
        var dlAnchorElem = document.createElement("a");
        dlAnchorElem.setAttribute("href", dataStr);
        dlAnchorElem.setAttribute("download", "level.json");
        dlAnchorElem.click();
    }

    saveLevelToLocalStorage(name, level) {
        localStorage.setItem(`rollerEditor_${name}`, JSON.stringify(level));
    }

    loadLevelFromLocalStorage(name) {
var level = new Level();
      
            var data = JSON.parse(localStorage.getItem(`rollerEditor_${name}`));
        //   console.log(data.tiles);
            level.name = data.name;
            data.tiles.forEach(tile => level.tiles.push(new Tile(tile.typeId, tile.type, tile.x, tile.y)));
            this.setActiveLevel(level);


        return level;
    }

    draw() {

        this.activeTool().draw();
        Renderer.saveState();
        Renderer.ctx.translate(tilesToPx(-this.scrollX), tilesToPx(-this.scrollY));

        this.activeLevel.draw();
        Renderer.restoreState();
    }
};

Editor = new Editor();