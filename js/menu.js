
fishingGame.MainMenu = function (game) {


	this.playButtons = [null,null];
	this.moreGames = null;
	this.moreLabel = null;
	this.labels = [null,null];
	this.bgLayers = [null,null];
	this.logo = null;
	this.logoLabel = null;
	this.spilLogo = null;

	soundManager = {
			music : null,
			isMuted : false,
			globalVolume : 1,
			muteSound : 0,

			muteMusic : function()
			{

					if(!this.isMuted)
					{

						this.globalVolume=0;
						this.music.volume = this.globalVolume;
						game.state.states['VStore'].muteFrame = 1;
						game.state.states['VStore'].is_Muted = true;
						//console.log(game.state.states['VStore'].is_Muted);
						this.muteSound.frame = game.state.states['VStore'].muteFrame;

						//game.state.states['Game'].muteButton.frame = 1;
					}
					else
					{
						this.globalVolume=1;
						this.music.volume = this.globalVolume;
						game.state.states['VStore'].muteFrame = 0;
						game.state.states['VStore'].is_Muted = false;
						this.muteSound.frame = game.state.states['VStore'].muteFrame;

						//game.state.states['Game'].muteButton.frame = 0;
						}
					this.isMuted = !this.isMuted;
					game.state.states['VStore'].is_Muted = this.isMuted;

					//this.canClick = false;
					//game.time.events.add(this.clickCooldown, function(){this.canClick = true;}, this);

			},
	};

	decorationFish = function(_dir,_scale,_speed)
	{
		this.dir = _dir;
		this.scale = _scale;
		this.speed = _speed;
		this.x = -32;


		this.render = game.add.sprite(this.x,Math.floor(Math.random() * 600),'decoFish');
		if(this.dir == 'r')
		{
			this.render.x = -128;
			this.render.frame = 0;
		}
		else
		{
			this.render.x = 448;
			this.render.frame = 1;
		}
		this.render.scale.setTo(this.scale,this.scale);
		//this.render.outOfBoundsKill = false;
		this.move = function()
		{
			if(this.dir == 'r')this.render.x+= this.speed;
			else this.render.x -= this.speed;
		}

	}

	this.decorationFishes ={
		renders : [],


		addFish : function() {
			var randomScale = Math.floor(Math.random() * 3)+1;
			var finalScale = 0.75 - (randomScale/10);
			var randDir = Math.floor(Math.random() * 2);
			var rD = 'r';
			if(randDir ==0) rD = 'l';
			var tFish = new decorationFish(rD,finalScale,Math.floor(Math.random()*3+1));
			this.renders.push(tFish);
		},
		update : function()
		{
			for(var i = 0; i< this.renders.length; i++)
			{
				if(this.renders[i].render.x < -140 || this.renders[i].render.x > 500)
				{
					if(this.renders[i].dir == 'r') this.renders[i].render.x = -128;
					else this.renders[i].render.x = 448;
					//this.renders[i].y = Math.floor(Math.random() * 400);
					//console.log(this.renders[i].render.y+', '+this.renders[i].render.x );
				}
				this.renders[i].move();
			}
		},
	};

	this.bubbleManager ={
		emitter : 0,

		init : function()
		{
			this.emitter = game.add.emitter(200, 640, 100);
			this.emitter.width = 400;
			this.emitter.makeParticles('bubble');

			this.emitter.minParticleScale = 0.1;
			this.emitter.maxParticleScale = 0.75;

			this.emitter.setYSpeed(-300, -500);
			this.emitter.setXSpeed(-5, 5);

			this.emitter.minRotation = 0;
			this.emitter.maxRotation = 1.0;

			this.emitter.start(false, 1500, 5, 0);
		},
	};

}
fishingGame.MainMenu.prototype = {

		create: function () {

if(!game.state.states['VStore'].loadOnce)
				{
					game.time.events.add(2000,function(){
						game.load.image('brand',game.state.states['VStore'].logoLink);
						game.load.start();
						//console.log(game.state.states['VStore'].logoLink);
					},this);
					game.state.states['VStore'].overallRank = 0;
					//console.log(game.state.states['VStore'].overallRank);
		      game.state.states['VStore'].hsound=    new Howl({
		     src: ['assets/sfx/loop1.ogg','assets/sfx/loop1.aac','assets/sfx/loop1.mp3'],
		     autoplay: true,
		     loop: true,
		     volume: game.state.states['VStore'].soundVolume,
		     onend: function() {
		       //console.log('Finished!');
		     }

		   });
		   game.state.states['VStore'].hpop=    new Howl({
		  src: ['assets/sfx/pop.ogg','assets/sfx/pop.mp3'],
		  autoplay: false,
		  loop: false,
		  volume: game.state.states['VStore'].soundVolume,
		  onend: function() {
		   // console.log('Finished!');
		  }
		});
	}

		//tubyło
		game.state.states['VStore'].is_Muted = false;

		//soundManager.music = this.add.audio('titleMusic');


		this.bgLayers[0] = this.add.sprite(0, 0, 'titlepage');
		this.bgLayers[0].frame = 0;
		for(var i = 0; i< 20; i++) this.decorationFishes.addFish();
		this.bubbleManager.init();
		this.bgLayers[1] = this.add.sprite(0, 0, 'titlepage');
		this.bgLayers[1].frame = 1;

		this.logo = game.add.sprite(200,16,'logo');
		//this.logo.scale.setTo(0.6,0.6);
		this.logo.x -= this.logo.width/2;
		this.logoLabel = game.add.text(this.logo.x+this.logo.width/2,this.logo.y+this.logo.height/2,
		'TAP-TAP\nFishing',{ font: '28px Frijole', fill: '#FFF', align: 'center' });
		/*this.logoLabel.stroke = '#000000';
		this.logoLabel.strokeThickness = 4;
		this.logoLabel.fill = '#fff';*/
		this.logoLabel.x -= this.logoLabel.width/2;
		this.logoLabel.y -= this.logoLabel.height/2;

	game.time.events.add(2500,function(){	this.spilLogo = game.add.button(400,600,'brand',game.state.states['VStore'].logoSpilHREF);
	//this.spilLogo.onInputDown.add(game.state.states['VStore'].logoSpilHREF,this);
		this.spilLogo.x -= this.spilLogo.width;
		this.spilLogo.y -= this.spilLogo.height;
	},this);


var scale = 0.65;
		//this.playButton = game.add.button(200,300,'play');
		for(var i = 0; i< 2; i++)
		{

			if(i == 0)
			{
				this.playButtons[i] = game.add.button(200, 240, 'play', function(){game.state.states['Game']._gameMode = 0;game.state.states['VStore'].currentLevel = 0;
				//soundManager.music.stop();
				game.state.start('tutorial');}, this, 1, 0, 0);
				this.playButtons[i].scale.setTo(scale,scale);
				this.playButtons[i].x -= this.playButtons[i].width/2;
				this.playButtons[i].y -= this.playButtons[i].height/2;

				this.labels[i] = game.add.text(this.playButtons[i].x+this.playButtons[i].width/2,this.playButtons[i].y+this.playButtons[i].height/2,
				'JUST PLAY',{ font: '21px Frijole', fill: '#FFF', align: 'center' });
				//this.labels[i].scale.setTo(scale,scale);
				this.labels[i].x -= this.labels[i].width/2;
				this.labels[i].y -= this.labels[i].height/2;
			}
			else {
				this.playButtons[i] = game.add.button(200, 300, 'play', function(){
					game.state.states['Game']._gameMode = 1;
					game.state.states['VStore'].currentLevel = 0;
					/*soundManager.music.stop();*/
					 game.state.start('tutorial');}, this, 1, 0, 0);
				this.playButtons[i].scale.setTo(scale,scale);
				this.playButtons[i].x = this.playButtons[i-1].x;
				this.playButtons[i].y = this.playButtons[i-1].y + this.playButtons[i-1].height + 24;

				this.labels[i] = game.add.text(this.playButtons[i].x+this.playButtons[i].width/2,this.playButtons[i].y+this.playButtons[i].height/2,
				'CHALLENGE',{ font: '20px Frijole', fill: '#FFF', align: 'center' });
				this.labels[i].x -= this.labels[i].width/2;
				this.labels[i].y -= this.labels[i].height/2;
			}
		}

		this.moreGames = game.add.button(this.playButtons[1].x, this.playButtons[1].y+this.playButtons[1].height+24, 'play', game.state.states['VStore'].moreGamesHREF,this, 1, 0, 0);
		this.moreGames.scale.setTo(scale,scale);
		this.moreLabel =  game.add.text(this.moreGames.x+this.moreGames.width/2,this.moreGames.y+this.moreGames.height/2,
		'MORE GAMES',{ font: '16px Frijole', fill: '#FFF', align: 'center' });
		this.moreLabel.x -= this.moreLabel.width/2;
		this.moreLabel.y -= this.moreLabel.height/2;

		//this.playButton.events.onInputDown.add(function(){game.state.start('Game');});

		game.state.states['VStore'].muteCanClick = true;
		soundManager.muteSound = game.add.button(8, 600, 'soundMute');
		soundManager.muteSound.scale.setTo(0.4,0.4);
		soundManager.muteSound.y -= soundManager.muteSound.height;
		soundManager.muteSound.frame = game.state.states['VStore'].muteFrame;
		soundManager.muteSound.onInputDown.add(function(){
				if(game.state.states['VStore'].muteCanClick)
				{
					game.state.states['VStore'].muteCanClick = false;
					game.time.events.add(1000, function(){game.state.states['VStore'].muteCanClick = true;
								}, this);

					soundManager.muteMusic();
						if(soundManager.muteSound.frame == 0)
						{
							soundManager.muteSound.frame=1;
							game.state.states['VStore'].is_Muted = true;
						}
						else
						{
							soundManager.muteSound.frame = 0;
							game.state.states['VStore'].is_Muted = false;
						}
						//console.log('co to kurwa '+ game.state.states['VStore'].is_Muted);
					}
				}
			,this);


		//soundManager.music.play();
		/*if(!game.state.states['VStore'].is_Muted && game.device.desktop)
		{
			game.state.states['VStore'].music.play('',0,soundManager.globalVolume,true);
			game.state.states['VStore'].music.onLoop.add(function(){game.state.states['VStore'].music.play('', 0, soundManager.globalVolume, true); }, this);
		}*/

		//soundManager.music.play('', 0, soundManager.globalVolume, true);
		//soundManager.music.onLoop.add(function(){soundManager.music.play('', 0, soundManager.globalVolume, true); }, this);

	},

	update: function () {

		//	Do some nice funky main menu effect here
		 /* if(this.game.input.activePointer.isDown)
			{
				if(this.game.device != this.game.desktop)
				{
					if (this.game.scale.isFullScreen)
					{
							this.game.scale.stopFullScreen();
					}
					else
					{
							this.game.scale.startFullScreen(false);
					}
				}
			}*/
			if(game.state.states['VStore'].hsound.state() == 'loaded' && !game.state.states['VStore'].loadOnce)
	    {
	      game.state.states['VStore'].loadOnce = true;
	      //console.log(game.state.states['VStore'].hsound.state());
				//	game.state.states['VStore'].hsound.play();
	    }

		this.decorationFishes.update();

	},

	startGame: function () {

		//	Ok, the Play Button has been clicked or touched, so let's stop the music (otherwise it'll carry on playing)



		//	And start the actual game
		this.state.start('Game');

	}

};
