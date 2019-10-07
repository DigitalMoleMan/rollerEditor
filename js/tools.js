class Tile{
    constructor(x, y, sprite){
        this.x = x;
        this.y = y;
        this.sprite = sprite;
    }
}

class Block extends Tile{
    constructor(x, y){
        super(x, y, sprites.tiles.block);
    }
}


class Tool{
    constructor(eventActions = {}){
        this.eventActions = eventActions
    }

    readEvent(event){
        this.eventActions[event]();
    }
}
const tools = {
    TilePlacer: new class TilePlacer extends Tool{
        constructor() {
            super({
                mouseDown: () => this.setMouseDown(e)
            });
            this.mouseIsDown = false;
            this.mouseButton = undefined;
            this.toolbar = [

            ]
        }

        setMouseDown(){
            console.log(e);
        }

        mouseDown(e) {
            this.mouseIsDown = true;
            this.mouseButton = e.button;
            (this.mouseButton == 0) ? addTile() : removeTile();
        }

        mouseUp() {
            this.mouseIsDown = false;
        }

        mouseMove() {
            if (this.mouseIsDown) {
                (this.mouseButton == 0) ? addTile() : removeTile();
            }
        }

        
    }
}

addTile = () => {
    var onTile = Editor.activeLevel.tiles.filter((tile) => (tile.x == Editor.cursorX() + scrollX && tile.y == Editor.cursorY() + scrollY));
    if (onTile.length == 0) {

        Editor.activeLevel.tiles.push({
            type: tileSelect.value,
            x: Editor.cursorX() + scrollX,
            y: Editor.cursorY() + scrollY
        });
    }
}

removeTile = () => {
    var tileIndex = Editor.activeLevel.tiles.findIndex((tile) => (tile.x == Editor.cursorX() + scrollX && tile.y == Editor.cursorY() + scrollY));
if(tileIndex >= 0)   Editor.activeLevel.tiles.splice(tileIndex, 1);
}