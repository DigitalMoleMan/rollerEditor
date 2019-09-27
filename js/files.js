getImg = (path) => {
    var img = new Image;
    img.src = path;
    return (img);
}

const sprites = {
    background: {},
    npc: {},
    tiles: {
        block: getImg("img/tiles/block/block_0.png"),
        elevator: getImg("img/tiles/elevator_0.png"),
        hookpoint: getImg("img/tiles/hookpoint.png"),
        lamp: getImg("img/tiles/lamp.png"),
        platform: getImg("img/tiles/platform.png"),
        spikesFloor: getImg("img/tiles/spikes_floor.png"),
        spikesRoof: getImg("img/tiles/spikes_roof.png")
    },
}