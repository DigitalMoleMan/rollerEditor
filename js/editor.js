Editor = new class {
    constructor() {
        this.activeTool = () => tools[toolSelect.value];
        this.activeLevel = new Level({
            name: level[0].name,
            tiles: new Array,
            doors: new Array
        });

        this.cursorX = () => Math.floor(mouse.x / 16);
        this.cursorY = () => Math.floor(mouse.y / 16);

        canvas.addEventListener("mousedown", () => this.activeTool().mouseDown());
        canvas.addEventListener("mouseup", () => this.activeTool().mouseUp());
        canvas.addEventListener("mousemove", () => this.activeTool().mouseMove());
    }

    newLevel() {
        this.activeLevel = new Level();
        scrollX = 0;
        scrollY = 0;
    }

    openLevel(e) {
        var input = e.target;

        var reader = new FileReader();
        reader.onload = () => {
            this.activeLevel = new Level(JSON.parse(reader.result));
        }
        reader.readAsText(input.files[0]);
    }

    saveLevel() {
        var levelString = JSON.stringify(this.activeLevel);
        console.log(levelString);
        /*
        var exportData = 'data:text/json;charset=utf-8,';
        exportData += escape(levelString);
        var encodedUri = encodeURI(exportData);
        window.open(encodedUri);
        */

        var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(levelString);
        var dlAnchorElem = document.createElement('a');
        dlAnchorElem.setAttribute("href", dataStr);
        dlAnchorElem.setAttribute("download", "level.json");
        dlAnchorElem.click();
    }
}