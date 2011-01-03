function setup() {
    jQuest.createPlayground($("#playground"));

    var views = $.playground().addGroup("views", {width: jQuest.playgroundWidth, height: jQuest.playgroundHeight});

    var west = new jQuest.View({
        name: "west",
        group: views,
        backgroundImage: "img/views/room-wall-west.png"
    });
    var north = new jQuest.View({
        name: "north",
        group: views,
        backgroundImage: "img/views/room-wall-north.png"
    });
    var east = new jQuest.View({
        name: "east",
        group: views,
        backgroundImage: "img/views/room-wall-east.png"
    });

    west.setView('right', north);
    north.setView('left', west).setView('right', east);
    east.setView('left', north);

    window.game = new jQuest.Game(west);
}

$(document).ready(function() {
    jQuest.playgroundWidth = 450;
    jQuest.playgroundHeight = 400;

    setup();
    jQuest.startGame();
});