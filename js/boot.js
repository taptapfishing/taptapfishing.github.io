var fishingGame = {};
WebFontConfig = {

    //  'active' means all requested fonts have finished loading
    //  We set a 1 second delay before calling 'createText'.
    //  For some reason if we don't the browser cannot render the text the first time it's created.
    active : function() { game.time.events.add(Phaser.Timer.SECOND*2, function () {

    }, this); },

    //  The Google Fonts we want to load (specify as many as you like in the array)
    google: {
      families: ['Frijole','Monofett']
    }

};

fishingGame.Boot = function (game) {

};

fishingGame.Boot.prototype = {

    init: function () {

        //  Unless you specifically know your game needs to support multi-touch I would recommend setting this to 1
        this.input.maxPointers = 1;

        //  Phaser will automatically pause if the browser tab the game is in loses focus. You can disable that here:
        this.stage.disableVisibilityChange = false;

        if (this.game.device.desktop)
        {
            //  If you have any desktop specific settings, they can go in here
            //this.scale.pageAlignHorizontally = true;

          //  this.game.stage.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;
          //  this.game.scale.setShowAll();
          	this.game.scale.pageAlignHorizontally = true;
          	this.game.scale.pageAlignVeritcally = true;
          //  this.game.scale.refresh();

            this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.scale.minWidth = 320;
            this.scale.minHeight = 568;
            this.scale.maxWidth = 400;
            this.scale.maxHeight = 600;
            this.game.scale.refresh();
        }
        else
        {
            //  Same goes for mobile settings.
            //  In this case we're saying "scale the game, no lower than 480x260 and no higher than 1024x768"
          /*  this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.scale.setMinMax(320, 480, 400, 600);
            this.scale.forceLandscape = true;
            this.scale.pageAlignHorizontally = true;*/


            //  this.game.stage.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;
            //  this.game.scale.setShowAll();
              this.game.scale.pageAlignHorizontally = false;
              this.game.scale.pageAlignVeritcally = false;
            //  this.game.scale.refresh();

              this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
              this.scale.minWidth = 320;
              //this.scale.minHeight = 568;
              this.scale.minHeight = 480;
              this.scale.maxWidth = 400;
              this.scale.maxHeight = 600;

              this.game.scale.refresh();
              this.game.canvas.id = 'canvas';
        }



    },

    preload: function () {

        //  Here we load the assets required for our preloader (in this case a background and a loading bar)
        game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');
        this.load.image('preloaderBackground', 'assets/menuLoadBG.png');
        this.load.image('preloaderBar', 'assets/progress.png');

    },

    create: function () {


        //  By this point the preloader assets have loaded to the cache, we've set the game settings
        //  So now let's start the real preloader going
        this.state.start('Preloader');

    }

};
