class Tool {
    constructor(eventActions = {}) {
        this.eventActions = eventActions
    }

    readEvent(event) {
        this.eventActions[event]();
    }
}
const tools = {
    TilePlacer: new class TilePlacer extends Tool {
        constructor() {
            super({
                mouseDown: () => this.setMouseDown(e)
            });
            this.mouseIsDown = false;
            this.mouseButton = undefined;
        }

        mouseDown(e) {
            this.mouseIsDown = true;
            this.mouseButton = e.button;
            if (this.mouseButton == 0) addTile(Editor.cursorTileX(), Editor.cursorTileY())
            else removeTile(Editor.cursorTileX(), Editor.cursorTileY());
        }

        mouseUp() {
            this.mouseIsDown = false;
        }

        mouseMove() {
            if (this.mouseIsDown) {
                if (this.mouseButton == 0) addTile(Editor.cursorTileX(), Editor.cursorTileY())
                else removeTile(Editor.cursorTileX(), Editor.cursorTileY());
            }
        }

        draw(){
            Renderer.img(sprites.tiles[tileSelect.value], tilesToPx(Editor.cursorX()), tilesToPx(Editor.cursorY()));
        }
    }
}

addTile = (x, y) => {
    var onTile = Editor.activeLevel.tiles.filter((tile) => (tile.x == x && tile.y == y));
    if (onTile.length == 0) Editor.activeLevel.tiles.push(new Block(x, y));
}

removeTile = (x, y) => {
    var tileIndex = Editor.activeLevel.tiles.findIndex((tile) => (tile.x == x && tile.y == y));
    if (tileIndex >= 0) Editor.activeLevel.tiles.splice(tileIndex, 1);
}