class FileLoader{
    /**
     * 
     * @param {String} path image file path.
     * @returns {Image}
     */
    getImageFromFile(path){
        var img = new Image;
        img.src = path;
        return img;
    }
}

FileLoader = new FileLoader();

getImg = (path) => FileLoader.getImageFromFile(path);

const sprites = {
    background: {},
    npc: {},
    tiles: {
        block: getImg("img/tiles/block/block_0.png"),
        elevator: getImg("img/tiles/elevator.png"),
        hookpoint: getImg("img/tiles/hookpoint.png"),
        lamp: getImg("img/tiles/lamp.png"),
        platform: getImg("img/tiles/platform.png"),
        spikesFloor: getImg("img/tiles/spikes_floor.png"),
        spikesRoof: getImg("img/tiles/spikes_roof.png")
    },
}


