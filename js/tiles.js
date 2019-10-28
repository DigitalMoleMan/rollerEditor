class Tile {
    constructor(typeId, type, x, y) {
        this.typeId = typeId;
        this.type = type;
        this.x = x;
        this.y = y;
    }

    draw() {
        Renderer.img(sprites.tiles[this.type], tilesToPx(this.x), tilesToPx(this.y));
    }
}

class Block extends Tile {
    constructor(x, y) {
        super(1, 'block', x, y);
    }
}

class Platform extends Tile {
    constructor(x, y) {
        super(2, 'platform', x, y)
    }
}