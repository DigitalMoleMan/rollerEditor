const tools = {
    TilePlacer: new class {
        constructor() {
            this.mouseIsDown = false;
            this.toolbar = [

            ]
        }
        mouseDown() {
            this.mouseIsDown = true;
            if (Editor.activeLevel.tiles.filter((tile) => (tile.x == Editor.cursorX() && tile.y == Editor.cursorY())).length == 0) {
                this.addTile();
            }
        }

        mouseUp() {
            this.mouseIsDown = false;
        }

        mouseMove() {
            if (this.mouseIsDown) {
                if (Editor.activeLevel.tiles.filter((tile) => (tile.x == Editor.cursorX() && tile.y == Editor.cursorY())).length == 0) {
                    this.addTile();
                }
            }
        }

        addTile() {
            Editor.activeLevel.tiles.push({
                type: tileSelect.value,
                x: Editor.cursorX(),
                y: Editor.cursorY()
            })
        }
    },
    TileRemover: new class {
        constructor() {
            this.mouseIsDown = false;
        }
        mouseDown() {
            this.mouseIsDown = true;
            if (Editor.activeLevel.tiles.filter((tile) => (tile.x == Editor.cursorX() && tile.y == Editor.cursorY())).length !== 0) this.removeTile();
        }

        mouseUp() {
            this.mouseIsDown = false;
        }

        mouseMove() {
            if (this.mouseIsDown) {
                if (Editor.activeLevel.tiles.filter((tile) => (tile.x == Editor.cursorX() && tile.y == Editor.cursorY())).length !== 0) this.removeTile();
            }
        }

        removeTile() {
            var tileIndex = Editor.activeLevel.tiles.findIndex((tile) => (tile.x == Editor.cursorX() && tile.y == Editor.cursorY()));
            Editor.activeLevel.tiles.splice(tileIndex, 1);
        }
    }
}