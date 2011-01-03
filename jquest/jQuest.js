jQuest = {};

jQuest.playgroundWidth = 800;
jQuest.playgroundHeight = 600;
jQuest.viewCounter = 0;
jQuest.itemCounter = 0;

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
        backgroundImage:  "",
        views:            {},
        items:            {}
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
    this.items = options.items;

    this.setLeft = function(view) {
        if (this.views['left']) {
            return this;
        }
        this.views['left'] = view;
        view.setRight(this);
        return this;
    };

    this.setRight = function(view) {
        if (this.views['right']) {
            return this;
        }
        this.views['right'] = view;
        view.setLeft(this);
        return this;
    };

    this.setForward = function(view) {
        if (this.views['forward']) {
            return this;
        }
        this.views['forward'] = view;
        view.setBackward(this);
        return this;
    };

    this.setBackward = function(view) {
        if (this.views['backward']) {
            return this;
        }
        this.views['backward'] = view;
        view.setForward(this);
        return this;
    };

    this.hide = function() {
        $.each(this.items, function() {
            this.hide();
        });
        $("#" + this.name).fadeOut();
    };

    this.show = function() {
        $("#" + this.name).fadeIn();
        $.each(this.items, function() {
            this.show();
        });
    };

    this.flicker = function() {
        $.each(this.items, function() {
            this.flicker();
        });
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

    this.addItem = function(item, itemOptions, callback) {
        console.log('add item')
        this.group.addSprite(item.name, itemOptions, callback);
        this.items[item.name] = item;
        jQuest.util.log("Item with name '" + item.name + "' added to '" + this.name + "'");
    };

    this.init = function(self) {
        self.group.addSprite(self.name, {
            animation: new $.gameQuery.Animation({ imageURL: backgroundImage }),
            width: jQuest.playgroundWidth,
            height: jQuest.playgroundHeight
        });

        self.hide();

        jQuest.util.log("new View created with name '" + self.name + "'");
    }(this);

};

jQuest.Item = function(view, options) {

    this.view = view;
    var defaults = {
        name:   "item",
        image:  "",
        posx:   0,
        posy:   0,
        width:  100,
        height: 100
    };
    options = $.extend(defaults, options);

    this.name = options.name;
    if (this.name == "item") {
        this.name = "item" + jQuest.itemCounter;
        jQuest.itemCounter++;
    }
    var image = options.image;
    var posx = options.posx;
    var posy = options.posy;
    var width = options.width;
    var height = options.height;

    this.hide = function() {
        $("#" + this.name).fadeOut();
    };

    this.show = function() {
        $("#" + this.name).fadeIn();
    };

    this.flicker = function() {
        $("#" + this.name).animate({ opacity: 0.5 }, 'fast').animate({ opacity: 1.0 }, 'fast');
    };

    this.init = function(self) {
        self.view.addItem(self, {
            height: height,
            width: width,
            posx: posx,
            posy: posy
        }, function() {
            $("#" + self.name).append("<img src=\"" + image + "\" width=\"" + width + "\" height=\"" + height + "\"/>");
            $("#" + self.name).css('cursor', 'pointer');
            self.hide();
        });
    }(this);
};

jQuest.Game = function(initialView) {

    this.currentView = initialView;

    this.init = function(self) {

        $(document).keyup(function(e) {
            switch (e.keyCode) {
                case 37:
                    self.currentView = self.currentView.move('left');
                    break;
                case 38:
                    self.currentView = self.currentView.move('forward');
                    break;
                case 39:
                    self.currentView = self.currentView.move('right');
                    break;
                case 40:
                    self.currentView = self.currentView.move('backward');
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