class Editor {
    constructor() {
        this.activeTool = () => tools[toolSelect.value];
        this.activeLevel = new Level();

        this.cursorX = () => Math.floor(mouse.x / 16);
        this.cursorY = () => Math.floor(mouse.y / 16);

        canvas.addEventListener("mousedown", (e) => this.activeTool().mouseDown(e));
        canvas.addEventListener("mouseup", (e) => this.activeTool().mouseUp(e));
        canvas.addEventListener("mousemove", (e) => this.activeTool().mouseMove(e));
        canvas.addEventListener("wheel", (e) => this.activeTool().wheel(e));
    }


    /**
     * Resets the editor to a blank slate.
     */
    newLevel() {
        if (confirm("Are you sure?")) {
            this.activeLevel = new Level();
            scrollX = 0;
            scrollY = 0;
        }
    }

    /**
     * 
     * @param {File} inputFile 
     */
    async setActiveLevelFromFile(inputFile) {
        var levelData = await this.getLevelDataFromFile(inputFile);
        this.activeLevel = new Level(levelData);
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
};

Editor = new Editor();