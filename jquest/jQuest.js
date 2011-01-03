jQuest = {};

jQuest.playgroundWidth = 800;
jQuest.playgroundHeight = 600;
jQuest.OFFSCREEN = -10000;
jQuest.viewCounter = 0;

jQuest.createPlayground = function(div) {
    div.playground({
        width: jQuest.playgroundWidth,
        height: jQuest.playgroundHeight,
        keyTracker: true});
    jQuest.util.log('playground created');
};

jQuest.startGame = function() {
    $.playground().startGame(function() {
        jQuest.util.log('game loaded');
    });
};

jQuest.View = function(options) {

    var defaults = {
        name:        "view",
        group:       $.playground(),
        backgroundImage:  "img/views/default.png",
        views:       {}
    };
    options = $.extend(defaults, options);

    this.name = options.name;
    if (this.name == "view") {
        this.name = "view" + jQuest.viewCounter;
        jQuest.viewCounter++;
    }
    this.group = options.group;
    var backgroundImage = options.backgroundImage;
    var views = options.views;

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

    this.init = function(self) {
        self.group.addSprite(self.name, {
            animation: new $.gameQuery.Animation({ imageURL: backgroundImage }),
            width: jQuest.playgroundWidth,
            height: jQuest.playgroundHeight
        });

        self.hide();

        jQuest.util.log("new self created with name '" + self.name + "'");
    }(this);

    return this;
};

jQuest.Game = function(currentView) {

    this.currentView = currentView;

    this.currentView.show();
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