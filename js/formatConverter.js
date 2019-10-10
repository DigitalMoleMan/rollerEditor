class LevelFormatConverter{
    constructor(){

    }

    toNewFormat(level){
        console.log(level);

        convertedTiles = this.getConvertedTileArray(level.tiles);
        new Level(level.name,)
    }

    getConvertedTileArray(tiles){
        for(let y = 0; y < tiles.length; y++){
            let row = tiles[y];
            for(let x = 0; x < row.length; x++){
                let tile = {
                }
            }
        }

        return tileArray;
    }
}

lfc = new LevelFormatConverter();