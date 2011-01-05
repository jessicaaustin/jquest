function setupViews() {

    var west = new jQuest.View({
        name: "westWall",
        group: jQuest.game.views,
        backgroundImage: "img/views/room-wall-west.png"
    });
    var westDetail = new jQuest.View({
        name: "westDetail",
        group: jQuest.game.views,
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
        group: jQuest.game.views,
        backgroundImage: "img/views/room-wall-north.png"
    });
    var northDetail = new jQuest.View({
        name: "northDetail",
        group: jQuest.game.views,
        backgroundImage: "img/views/room-wall-north-detail.png"
    });
    var balcony = new jQuest.View({
        name: "balcony",
        group: jQuest.game.views,
        backgroundImage: "img/views/balcony.jpg"
    });
    var lock = new jQuest.Item(northDetail, {
        posx:   171,
        posy:   192,
        width:  100,
        height: 100
    });
    lock.setChangeViewAction(balcony);

    var east = new jQuest.View({
        name: "eastWall",
        group: jQuest.game.views,
        backgroundImage: "img/views/room-wall-east.png"
    });
    var eastDetail = new jQuest.View({
        name: "eastDetail",
        group: jQuest.game.views,
        backgroundImage: "img/views/room-wall-east-detail.png"
    });

    west.setForward(westDetail).setRight(north);
    north.setForward(northDetail).setRight(east);
    balcony.setBackward(northDetail);
    east.setForward(eastDetail);

    jQuest.game.setInitialView(west);
}

$(document).ready(function() {
    jQuest.viewWidth = 450;
    jQuest.viewHeight = 400;

    jQuest.game = new jQuest.Game($("#playground"));
    setupViews();
    jQuest.game.startGame();
});