function setup() {
    jQuest.createPlayground($("#playground"));

    var views = $.playground().addGroup("views", {width: jQuest.playgroundWidth, height: jQuest.playgroundHeight});

    var west = new jQuest.View({
        name: "westWall",
        group: views,
        backgroundImage: "img/views/room-wall-west.png"
    });
    var westDetail = new jQuest.View({
        name: "westDetail",
        group: views,
        backgroundImage: "img/views/room-wall-west-detail.png"
    });
    var north = new jQuest.View({
        name: "northWall",
        group: views,
        backgroundImage: "img/views/room-wall-north.png"
    });
    var northDetail = new jQuest.View({
        name: "northDetail",
        group: views,
        backgroundImage: "img/views/room-wall-north-detail.png"
    });
    var east = new jQuest.View({
        name: "eastWall",
        group: views,
        backgroundImage: "img/views/room-wall-east.png"
    });
    var eastDetail = new jQuest.View({
        name: "eastDetail",
        group: views,
        backgroundImage: "img/views/room-wall-east-detail.png"
    });

    west.setForward(westDetail).setRight(north);
    north.setForward(northDetail).setRight(east);
    east.setForward(eastDetail);

    window.game = new jQuest.Game(west);
}

$(document).ready(function() {
    jQuest.playgroundWidth = 450;
    jQuest.playgroundHeight = 400;

    setup();
    jQuest.startGame();
});