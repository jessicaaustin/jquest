function setupViews() {

    var west = new jQuest.View({
        name: "westWall",
        group: window.game.views,
        backgroundImage: "img/views/room-wall-west.png"
    });
    var westDetail = new jQuest.View({
        name: "westDetail",
        group: window.game.views,
        backgroundImage: "img/views/room-wall-west-detail.png"
    });
    var key = new jQuest.Item(westDetail, {
        image:  "img/items/key.gif",
        posx:   198,
        posy:   347,
        width:  40,
        height: 30
    });

    var north = new jQuest.View({
        name: "northWall",
        group: window.game.views,
        backgroundImage: "img/views/room-wall-north.png"
    });
    var northDetail = new jQuest.View({
        name: "northDetail",
        group: window.game.views,
        backgroundImage: "img/views/room-wall-north-detail.png"
    });
    var lock = new jQuest.Item(northDetail, {
        posx:   171,
        posy:   192,
        width:  100,
        height: 100
    });

    var east = new jQuest.View({
        name: "eastWall",
        group: window.game.views,
        backgroundImage: "img/views/room-wall-east.png"
    });
    var eastDetail = new jQuest.View({
        name: "eastDetail",
        group: window.game.views,
        backgroundImage: "img/views/room-wall-east-detail.png"
    });

    west.setForward(westDetail).setRight(north);
    north.setForward(northDetail).setRight(east);
    east.setForward(eastDetail);

    window.game.setInitialView(west);
}

$(document).ready(function() {
    jQuest.viewWidth = 600;
    jQuest.viewHeight = 400;

    window.game = new jQuest.Game($("#playground"));
    setupViews();
    window.game.startGame();
});