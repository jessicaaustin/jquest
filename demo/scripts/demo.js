$(document).ready(function() {
    $("#playground").playground({
        height: 400,
        width: 450,
        keyTracker: true});

    window.game = new jQuest.Game(450, 400);

    $.playground().startGame(function() {
        jQuest.util.log('game loaded');
    });
});