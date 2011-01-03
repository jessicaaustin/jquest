jQuest = {};

jQuest.OFFSCREEN = -10000;
jQuest.viewCounter = 0;

jQuest.View = function(options) {

    var defaults = {
        name: "view", // TODO use the name of the div created by gameQuery instead
        background:        new $.gameQuery.Animation({imageURL: 'img/views/default.png'}),
        views: {}
    };
    options = $.extend(defaults, options);

    this.name = options.name;
    this.background = options.background;
    var views = options.views;

    if (this.name == "view") {
        this.name = "view" + jQuest.viewCounter;
        jQuest.viewCounter++;
    }

    jQuest.util.log("new View created with name '" + this.name + "'");

    this.setView = function(direction, view) {
        views[direction] = view;
        return this;
    };

    this.hide = function() {
        jQuest.util.log("hiding view '" + this.name + "'");
        $("#" + this.name).css("top", jQuest.OFFSCREEN).css("left", jQuest.OFFSCREEN);
    };

    this.show = function(name) {
        jQuest.util.log("showing view '" + this.name + "'");
        $("#" + this.name).css("top", "").css("left", "");
    };

    this.move = function(direction) {
        switch (direction) {
            case 'forward':
                if (views.forward) return views.forward;
                break;
            case 'back':
                if (views.back) return views.back;
                break;
            case 'left':
                if (views.left) return views.left;
                break;
            case 'right':
                if (views.right) return views.right;
                break;
            default:
                jQuest.util.log('invalid direction: ' + direction)
        }
    };

};

jQuest.Game = function(playgroundWidth, playgroundHeight) {

    var setupViews = function(playgroundWidth, playgroundHeight) {
        var west = new jQuest.View({
            name: "west",
            background: new $.gameQuery.Animation({ imageURL: "img/views/room-wall-west.png"})
        });
        var north = new jQuest.View({
            name: "north",
            background: new $.gameQuery.Animation({ imageURL: "img/views/room-wall-north.png"})
        });
        var east = new jQuest.View({
            name: "east",
            background: new $.gameQuery.Animation({ imageURL: "img/views/room-wall-east.png"})
        });

        west.setView('right', north);
        north.setView('left', west).setView('right', east);
        east.setView('left', north);

        $.playground()
                .addGroup("views", {width: playgroundWidth, height: playgroundHeight})
                .addSprite("west", {animation: west.background,
                                       width: playgroundWidth, height: playgroundHeight})
                .addSprite("north", {animation: north.background,
                                        width: playgroundWidth, height: playgroundHeight})
                .addSprite("east", {animation: east.background,
                                       width: playgroundWidth, height: playgroundHeight});
        return [west, north, east];
    };

    this.getView = function(name) {
        for each (var view in this.views) {
            if (view.name == name) {
                return view;
            }
        }
    };

    this.views = setupViews(playgroundWidth, playgroundHeight);

    for each (var view in this.views) {
        view.hide();
    }
    this.getView("west").show();

    jQuest.util.log("new Game created");
};

jQuest.util = {
    log: function(message) {
        if (window.console) {
            var time = new Date();
            var pad = function(number) {
                return number < 10 ? "0" + number : number;
            };
            console.log("[" + pad(time.getHours()) + ":" + pad(time.getMinutes()) + ":" + pad(time.getSeconds()) + "] " +
                    message);
        }
    }
};