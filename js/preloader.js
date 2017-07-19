
fishingGame.Preloader = function (game) {

	this.background = null;
	this.preloadBar = null;

	this.ready = false;

};

fishingGame.Preloader.prototype = {

	preload: function () {


		//	These are the assets we loaded in Boot.js
		//	A nice sparkly background and a loading progress bar
		this.background = this.add.sprite(0, 0, 'preloaderBackground');
		this.preloadBar = this.add.sprite(200, 300, 'preloaderBar');
		this.preloadBar.x -= this.preloadBar.width/2;
		this.preloadBar.y -= this.preloadBar.height/2;

		//	This sets the preloadBar sprite as a loader sprite.
		//	What that does is automatically crop the sprite from 0 to full-width
		//	as the files below are loaded in.
		this.load.setPreloadSprite(this.preloadBar);

		this.load.image('logo','assets/gui/logoA.png');

    this.load.spritesheet('fishG','assets/fishG.png',60,45);
    this.load.spritesheet('fishB','assets/fishB.png',60,45);
		this.load.spritesheet('fishF','assets/fishF.png',60,45);
		this.load.spritesheet('fishGold','assets/fishGold.png',60,45);
		//this.load.spritesheet('decoFish','assets/fishBG1.png',60,45);

		this.load.spritesheet('splash','assets/splash.png',80,80);
		this.load.spritesheet('letterB','assets/gui/letterB.png',180,190);

		this.load.spritesheet('decoFish','assets/fishBG2.png',109,67);
		this.load.spritesheet('bubble','assets/bubble.png',32,32);
    this.load.image('laneLine','assets/laneLine.png');
		this.load.image('gamebg','assets/gamebg.png');
		this.load.image('fishingRod','assets/fishingRod.png');

		this.load.spritesheet('tutorial1','assets/how.png',400,600);
		this.load.spritesheet('tutorial2','assets/how2.png',120,45);

		this.load.spritesheet('play','assets/gui/button.png',288,130);
		this.load.spritesheet('soundMute','assets/gui/sound.png',358/2,190);


//		this.load.image('clock','assets/clock.png');
		this.load.spritesheet('timeBar','assets/timeBar.png',236/2,32);
		this.load.spritesheet('bait','assets/bait2.png',23,63);


    this.load.spritesheet('titlepage', 'assets/menuLoadBG.png',400,600);
    this.load.audio('titleMusic', ['assets/sfx/loop.ogg']);

		//	Here we load the rest of the assets our game needs.
		//	As this is just a Project Template I've not provided these assets, swap them for your own.
		//this.load.image('titlepage', 'assets/title.jpg');
		/*
		this.load.audio('titleMusic', ['audio/main_menu.mp3']);
		this.load.bitmapFont('caslon', 'fonts/caslon.png', 'fonts/caslon.xml');
    */
		//	+ lots of other required assets here

	},

	create: function () {

		//	Once the load has finished we disable the crop because we're going to sit in the update loop for a short while as the music decodes
		this.preloadBar.cropEnabled = false;

	},

	update: function () {

		//	You don't actually need to do this, but I find it gives a much smoother game experience.
		//	Basically it will wait for our audio file to be decoded before proceeding to the MainMenu.
		//	You can jump right into the menu if you want and still play the music, but you'll have a few
		//	seconds of delay while the mp3 decodes - so if you need your music to be in-sync with your menu
		//	it's best to wait for it to decode here first, then carry on.

		//	If you don't have any music in your game then put the game.state.start line into the create function and delete
		//	the update function completely.

		if (this.cache.isSoundDecoded('titleMusic') && this.ready == false)
		{
			this.ready = true;
			this.state.start('MainMenu');
		}

	}

};
