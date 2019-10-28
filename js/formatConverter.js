class LevelFormatConverter{
    constructor(){

    }

    toNewFormat(level){
        console.log(level);

        var convertedTiles = this.getConvertedTileArray(level.layout);
        var convertedLevel = new Level({
            name: level.name, 
            tiles: convertedTiles
        });

        
        return convertedLevel;
    }

    getConvertedTileArray(tiles){
        var convertedTileArray = [];
        for(var y = 0; y < tiles.length; y++){
            var row = tiles[y];
            for(var x = 0; x < row.length; x++){
                var oldTile = row[x];

               var convertedTile = new Tile({
                    type: this.getConvertedTileType(oldTile),
                    x: x,
                    y: y
                });

                convertedTileArray.push(convertedTile);
            }
        }
        return convertedTileArray;
    }

    getConvertedTileType(oldTileType){
        switch (oldTileType){
            case 'X': return 'block';
            case '-': return 'platform';
            case '<': return 'elevator';
            case '>': return 'elevator';
            case '^': return 'elevator';
            case 'v': return 'elevator';
            case 'M': return 'spikes_floor';
            case 'W': return 'spikes_roof';
            case 'G': return 'hookpoint';
            case 'L': return 'lamp';
        }
    }
}

lfc = new LevelFormatConverter();