jQuest = {};

jQuest.playgroundWidth = 800;
jQuest.playgroundHeight = 600;
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
        name:             "view",
        group:            $.playground(),
        backgroundImage:  "img/views/default.png",
        views:            {}
    };
    options = $.extend(defaults, options);

    this.name = options.name;
    if (this.name == "view") {
        this.name = "view" + jQuest.viewCounter;
        jQuest.viewCounter++;
    }
    this.group = options.group;
    var backgroundImage = options.backgroundImage;
    this.views = options.views;

    this.setView = function(direction, view) {
        this.views[direction] = view;
        return this;
    };

    this.hide = function() {
        jQuest.util.log("hiding view '" + this.name + "'");
        $("#" + this.name).fadeOut();
    };

    this.show = function() {
        jQuest.util.log("showing view '" + this.name + "'");
        $("#" + this.name).fadeIn();
    };

    this.flicker = function() {
        $("#" + this.name).animate({ opacity: 0.5 }, 'fast').animate({ opacity: 1.0 }, 'fast');
    };

    this.move = function(direction) {
        var view = this.views[direction];
        if (view == undefined) {
            this.flicker();
            return this;
        }

        this.hide();
        view.show();

        return view;
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

};

jQuest.Game = function(initialView) {

    this.currentView = initialView;

    this.move = function(direction) {
        this.currentView = this.currentView.move(direction);
    };

    this.init = function(self) {

        $(document).keyup(function(e) {
            switch (e.keyCode) {
                case 37:
                    jQuest.util.log('moving left')
                    self.move('left');
                    break;
                case 38:
                    self.move('forward');
                    break;
                case 39:
                    jQuest.util.log('moving right')
                    self.move('right');
                    break;
                case 40:
                    self.move('backward');
                    break;
            }
        });

        self.currentView.show();
    }(this);
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