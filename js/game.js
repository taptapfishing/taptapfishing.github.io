fishingGame.Game = function (game) {

    //  When a State is added to Phaser it automatically has the following properties set on it, even if they already exist:

    this.game;      //  a reference to the currently running game (Phaser.Game)
    this.add;       //  used to add sprites, text, groups, etc (Phaser.GameObjectFactory)
    this.camera;    //  a reference to the game camera (Phaser.Camera)
    this.cache;     //  the game cache (Phaser.Cache)
    this.input;     //  the global input manager. You can access this.input.keyboard, this.input.mouse, as well from it. (Phaser.Input)
    this.load;      //  for preloading assets (Phaser.Loader)
    this.math;      //  lots of useful common math operations (Phaser.Math)
    this.sound;     //  the sound manager - add a sound, play one, set-up markers, etc (Phaser.SoundManager)
    this.stage;     //  the game stage (Phaser.Stage)
    this.time;      //  the clock (Phaser.Time)
    this.tweens;    //  the tween manager (Phaser.TweenManager)
    this.state;     //  the state manager (Phaser.StateManager)
    this.world;     //  the game world (Phaser.World)
    this.particles; //  the particle manager (Phaser.Particles)
    this.physics;   //  the physics manager (Phaser.Physics)
    this.rnd;       //  the repeatable random number generator (Phaser.RandomDataGenerator)
    SCR_W = 400;
    SCR_H = 600;
    this._gameMode = 0;
    lastFailed = false;

    //  You can use any of these from any function within this State.
    //  But do consider them as being 'reserved words', i.e. don't create a property for your own game called "world" or you'll over-write the world reference.
    this.gameBackground = 0;
    fish = function(_type,_x,_y, _rDir, _lane) {
      this.render = 0;
      this.position = [_x,_y];
      this.type = _type;
      this.speed = 1.0;
      this.danger = false;
      this.dir = _rDir;
      this.lane = _lane;
      this.anim = 0;
      this.lootPTS = 10;

      switch(this.lane)
      {
        case 0:
        this.speed = 2.0;
        this.lootPTS = 15;
        break;
        case 2:
        this.speed = 2.0;
        this.lootPTS = 15;
        break;
        case spawners.lanesBorders.length-1:
        this.speed = 0.5;
        this.lootPTS = 5;
        break;
        default:
        this.speed = 1.0;
        break;
      }

      this.setUp = function() {

        switch(this.type)
        {
          case 0:
          this.render = game.add.sprite(this.position[0],this.position[1],'fishG');
          this.danger = false;
          //console.log(this.render.x);
          break;
          case 1:
          this.render = game.add.sprite(this.position[0],this.position[1],'fishB');
          this.danger = true;
        //  console.log(this.render.x);
          break;

          case 2:
          this.render = game.add.sprite(this.position[0],this.position[1],'fishGold');
          this.danger = false;
          this.speed = 4.0;
          this.lootPTS = 100;
        //  console.log(this.render.x);
          break;

          case 3:
          this.render = game.add.sprite(this.position[0],this.position[1],'fishF');
          this.danger = false;
          this.speed = 1.5;
          this.lootPTS = -5;
        //  console.log(this.render.x);
          break;
        }
        if(this.danger)this.lootPTS = -150;
        this.render.y -= this.render.height;
        this.anim = this.render.animations.add('swimL', [0,1], 4, true);
        this.anim = this.render.animations.add('swimR', [2,3], 4, true);

      //  console.log(this.render.x);
      }

      this.move = function()
      {
        if(this.dir == 'r')
        {
          this.render.x += this.speed;
          this.render.play('swimR');
        }
        else if(this.dir == 'l')
        {
          this.render.x -= this.speed;
          this.render.play('swimL');
        }

      }
      this.update = function () {
        this.move();
      }
    };

    this.bubbleManager ={
  		emitter : 0,

  		init : function()
  		{
  			this.emitter = game.add.emitter(200, 640, 96);
  			this.emitter.width = 400;
  			this.emitter.makeParticles('bubble');

  			this.emitter.minParticleScale = 0.1;
  			this.emitter.maxParticleScale = 0.75;

  			this.emitter.setYSpeed(-100, -500);
  			this.emitter.setXSpeed(-5, 5);

  			this.emitter.minRotation = 0;
  			this.emitter.maxRotation = 1.0;

  			this.emitter.start(false, 2000, 5, 0);
  		},
  	};

    soundManager = {
  			music : null,
  			isMuted : false,
  			globalVolume : game.state.states['VStore'].soundVolume,
  			muteMusic : function()
  			{

    				if(!this.isMuted)
    				{
              game.state.states['VStore'].soundVolume = 0;
              game.state.states['VStore'].is_Muted = true;
    					this.globalVolume= game.state.states['VStore'].soundVolume;

    					game.state.states['VStore'].music.volume = this.globalVolume;
              game.state.states['VStore'].muteFrame = 1;
    					gameInfo.muteButton.frame = game.state.states['VStore'].muteFrame;
    					//game.state.states['Game'].muteButton.frame = 1;
    				}
    				else
    				{
    					this.globalVolume=1;
              game.state.states['VStore'].soundVolume = 1;
              game.state.states['VStore'].is_Muted = false;
    					this.music.volume = game.state.states['VStore'].soundVolume;
              game.state.states['VStore'].music.volume = this.globalVolume;
              game.state.states['VStore'].muteFrame = 0;
    					gameInfo.muteButton.frame = game.state.states['VStore'].muteFrame;
    					//game.state.states['Game'].muteButton.frame = 0;
    					}
              //console.log(game.state.states['VStore'].is_Muted);
    				this.isMuted = !this.isMuted;
          /*  game.state.states['VStore'].muteCanClick = false;
              game.time.events.add(1000, function(){game.state.states['VStore'].muteCanClick = true;
            }, this);*/

  			},
  	};

gameCommentary = function(x,y,isGood,pValue)
{
  this.comments = ['Uuups!','Weak!','Be careful!','Can be better...','Faster!','Yeeah!','Great!','Woow!','Unbelieveble!','OMG!!!','TAKE MY POINTS!','SUPERFISHERMAN!'];
  this.render = 0;
  this.active = false;
  this.x= x;
  this.y = y;
  this.isGood = isGood;
  this.pValue = pValue;
  this.speed = 1;

  this.setComment = function()
  {
    var rText = 0;
    var color = '#0F0';
    if(this.pValue > 0)
    {
      rText = Math.floor(Math.random()*this.comments.length-1)+3;
      if(rText > this.comments.length-1)rText = this.comments.length-2;
      if(rText < 5) rText = 5;
    }
    else {
        rText = Math.floor(Math.random()*5);
        color = '#F00';
    }

    this.x = Math.floor(Math.random() * 320);
    if(this.x >= 160 && this.x <= 220)
    {
      var rOff = Math.floor(Math.random() * 2);
      if(rOff == 0) this.x -= 80;
      else this.x+= 80;
    }
    this.y = 360;
    this.y += Math.floor(Math.random() * 256);

    //this.y += 250;
    var txt = this.comments[rText]+'\n';
    if(this.pValue > 0) txt += '+'+ this.pValue;
    else txt += this.pValue;
    this.render = game.add.text(this.x,this.y,txt,{ font: '20px Frijole', fill: color, align: 'center' });
    if(this.render.y+this.render.height >= 580) this.render.y -= (this.render.y+this.render.height) - 560;
    if(this.render.x + this.render.width >= 400) this.render.x -= (this.render.x+this.render.width -384 );

    this.render.stroke = '#000000';
    this.render.strokeThickness = 3;
    this.render.fill = color;
    this.active = true;
    this.speed = Math.floor(Math.random() * 3)+2;

    game.time.events.add(2000, function(){ this.render.kill();this.active = false; },this);
  }

  this.update = function()
  {
  /*  if(this.render.x < gameInfo.pointsRender.x + 64)
    {
      this.render.x++;
    }*/
      if(this.render.alpha > 0.01) this.render.alpha -= 0.01;
      else
      {
          this.render.visible = false;
        this.active = false;
      }
  /*  else if(this.render.x >= gameInfo.pointsRender.x + 48 && this.render.y < gameInfo.pointsRender.y)
    {
      this.render.kill();
      this.active = false;
    }*/
  }
};

commentManager = {
  commentRenders : [],

  addComment : function(isGood, pValue,x,y)
  {
    var tCmt = new gameCommentary(x,y,isGood,pValue);
  //  console.log(tCmt.pValue);
    //tCmt.setComment();
    this.commentRenders.push(tCmt);
    this.commentRenders[this.commentRenders.length-1].setComment();
    //console.log(this.commentRenders[this.commentRenders.length-1].pValue);
  },

  update : function()
  {
    for(var i = 0; i< this.commentRenders.length; i++)
    {
      /*if(this.commentRenders[i].active)*/
       this.commentRenders[i].update();
      if(!this.commentRenders[i].active)
      {
        this.commentRenders.splice(i,1);
      }
    }
  }
};

gameInfo ={
  pointsValue : 0,
  pointsRender : 0,
  timeBar : [0,0],
  timeBarRect : 0,
  timeBar_startingW : 0,
  clockRender : 0,
  muteButton : 0,

  init : function()
  {
    this.pointsRender = game.add.text(SCR_W,8,'Score\n'+0,{ font: '20px Frijole', fill: '#000', align: 'center' });
    //this.pointsRender.x -= this.pointsRender.width;
    this.clockRender = game.add.text(0,this.pointsRender.y,'Time:',{ font: '20px Frijole', fill: '#000', align: 'center' });

    for(var i = 0; i< 2; i++)
    {
      this.timeBar[i] = game.add.sprite(this.clockRender.x ,this.clockRender.y+this.clockRender.height,'timeBar');

      //this.timeBar[i].y -= this.timeBar[i].height/2;
      this.timeBar[i].frame = i;
    }
    this.clockRender.x = (this.timeBar[0].x + this.timeBar[0].width/2 - this.clockRender.width/2);
    this.timeBar_startingW = this.timeBar[1].width;
    this.timeBarRect = new Phaser.Rectangle(0,0,this.timeBar[1].width,this.timeBar[1].height);
    this.pointsRender.x = (SCR_W - this.pointsRender.width) - this.clockRender.x;

    this.muteButton = game.add.button(8, 600, 'soundMute');
    this.muteButton.scale.setTo(0.4,0.4);
    this.muteButton.y -= this.muteButton.height;
    this.muteButton.frame = game.state.states['VStore'].muteFrame;
    game.state.states['VStore'].muteCanClick=true;
		this.muteButton.onInputDown.add(function(){
      //console.log(game.state.states['VStore'].muteCanClick);
      if(game.state.states['VStore'].muteCanClick)
      {
        soundManager.muteMusic();

        game.state.states['VStore'].muteCanClick=false;
        game.time.events.add(1000, function(){   game.state.states['VStore'].muteCanClick=true;},this);

      }
    }, this);

    this.addPoints(0);

  },

  addPoints : function(add_pts)
  {

    this.pointsValue+= add_pts;
    if(game.state.states['Game']._gameMode ==1)
    {
      this.pointsRender.text = 'Score\n'+this.pointsValue+'/'+game.state.states['VStore'].minimalScoreChallenge;
    }
    else this.pointsRender.text = 'Score\n'+this.pointsValue+'/'+levelManager.requiredPoints;
    this.pointsRender.x = (SCR_W - this.pointsRender.width) - this.clockRender.x;
  },

  updateTimeBar : function()
  {
    var percentage = levelManager.levelElapsed/levelManager.timeForLevel;
    //console.log(percentage + '%');
    var currentWidthBar = Math.ceil(this.timeBar_startingW - (this.timeBar_startingW * percentage));

    this.timeBarRect.width = currentWidthBar;
    this.timeBar[1].crop(this.timeBarRect);

  //  console.log(currentWidthBar);


  },
};

levelManager = {
  remainingFishes : 0,
  fishAmount : 999,
  currentLevel : 0,
  rodsAmount : 3,
  requiredPointsStart : 400,
  requiredPoints : 400,
  fishCooldown : [1750,1500,1150],
  currentCooldown :0,

  timeForLevel : 120,
  levelElapsed : 0,
  levelEnded : false,
  timeCounter : 0,

  initTimer : function()
  {
    //this.timeCounter = game.time.create(false);

  },

  startCount : function()
  {
      //game.time.events.repeat(Phaser.SECOND,120, levelManager.countSec, this);
      /*this.timeCounter =*/ game.time.events.repeat(1000,this.timeForLevel, function(){levelManager.countSec();
      //  console.log(levelManager.timeCounter.duration);
      }, this);
      //console.log(this.timeForLevel);
  },

  countSec : function()
  {
    this.levelElapsed += 1;
    //console.log(this.levelElapsed);
    if(this.levelElapsed == this.timeForLevel)
    {
      this.levelEnded = true;
    }
    gameInfo.updateTimeBar();
  },

  prepareLevel : function()
  {
    this.currentLevel = game.state.states['VStore'].currentLevel;

    this.levelEnded = false;
    this.remainingFishes = this.fishAmount;
    this.requiredPoints = this.requiredPointsStart;

    if(this.currentLevel <= 3)
    {
      this.rodsAmount = 1;
      this.currentCooldown = 0;
      this.timeForLevel = 12;
      this.requiredPoints = 0;
      /*this.timeForLevel = 120;
      this.requiredPoints = 0;*/
    }
    else if(this.currentLevel <= 6 && this.currentLevel > 3)
    {
      this.rodsAmount = 2;
      this.currentCooldown = 1;
      this.timeForLevel = 150;
      this.requiredPoints = 800;
    }
    else if(this.currentLevel <= 9 && this.currentLevel > 6)
    {
      this.rodsAmount = 3;
      this.currentCooldown = 2;
      this.timeForLevel = 180;
      this.requiredPoints = 1200;
    }
  if(game.state.states['Game']._gameMode == 0)
    {
      game.state.states['VStore'].minimalScoreChallenge = this.requiredPoints;
      //console.log(game.state.states['VStore'].minimalScoreChallenge);
    }
    //console.log(this.rodsAmount);
  },

  nextLevel : function()
  {
    fishingRods.gameOver = false;
    gameInfo.addPoints(-gameInfo.pointsValue);
    game.time.removeAll();
    this.levelElapsed = 0;
    //this.timeCounter.removeAll();
    //this.timeCounter.stop(false);
    if(this.currentLevel < 9)this.currentLevel++;
    this.prepareLevel();
    spawners.tidyUp();
    fishingRods.init(this.rodsAmount);


    //  this.timeCounter = game.time.events.add(this.timeForLevel,function(){levelManager.levelEnded = true;},this);
    this.startCount();
    spawners.startSpawning(this.remainingFishes);

  },

  restartLevel : function()
  {
    this.currentLevel = this.currentLevel-1;
    //game.time.events.remove(this.timeCounter);


    this.nextLevel();
  //  console.log('restarting level '+this.currentLevel);
    fishingRods.gameOver = false;
  },

  checkForGoal : function()
  {
    if(this.levelElapsed == this.timeForLevel)
    {
      this.levelEnded = true;

    //  console.log('ended');
    }

    if(this.levelEnded)
    {
      //if(this.remainingFishes == 0)
      //{
        //tutaj zamiast remainingFishes dać czas do końca
        if(gameInfo.pointsValue >= game.state.states['VStore'].minimalScoreChallenge)
        {

          //game.time.events.add(3000, function(){levelManager.nextLevel();}, this); // old
          game.state.states['VStore'].levelFailed = false;
          game.state.states['VStore'].levelScore = gameInfo.pointsValue;
          game.time.events.add(500, function(){ game.state.start('Summary');}, this);
        }
        else fishingRods.gameOver = true;
    }//level ended
    if(fishingRods.gameOver)
    {
    //  console.log('Poor!');
      //display something here and switch to next level
      //game.time.events.add(3000, function(){levelManager.restartLevel();}, this);
      game.state.states['VStore'].levelFailed = true;
        game.state.states['VStore'].levelScore = gameInfo.pointsValue;
      game.time.events.add(500, function(){ game.state.start('Summary');}, this);
    }
  },

};

splash = function(x,y){
  this.render = game.add.sprite(x,y,'splash');
  this.render.x -= this.render.width/2;
  this.render.y -= this.render.height/2;
  this.anim = this.render.animations.add('bubble',[0,1,2,3,4],4,true);
  this.anim.onComplete.add(function(){this.render.kill();},this);
  this.anim.play(8,false,true);
  /*
  var tSplash = game.add.sprite(this.fishes[_id].render.x,this.fishes[_id].render.y,'splash');
  this.splash.push(tSplash);
  var tAnim = this.splash[this.splash.length-1].animations.add('bubble', [0,1,2,3], 4, true);
  tAnim.onComplete.add(function(){this.splash[this.splash.length-1].kill();},this);
  this.splash[this.splash.length-1].play('bubble');
  */
};

  spawners ={
      fishes : [],
      lanes : [],
      lanesBorders : [],
      splash : [],

      tidyUp : function()
      {
        if(this.fishes.length > 0)
        {
          for(var i = this.fishes.length-1; i>= 0; i--)
          {
            this.fishes[0].render.kill();
            this.fishes.shift();
          }
        }
      },

      initLanes : function()
      {
        //tidy up
        if(this.lanes.length> 0)
        {
          for(var i = this.lanes.length-1; i>=0; i--)
          {
            this.lanesBorders[0].kill();
            this.lanesBorders.shift();
            this.lanes.shift();
          }
        }

        for(var i = 0, bound= 208; i< 4; i++, bound += 64)
        {
          this.lanes.push(bound);
          this.lanesBorders.push(0);
          this.lanesBorders[this.lanesBorders.length-1] = game.add.sprite(0,bound,'laneLine');
          this.lanesBorders[this.lanesBorders.length-1].y -= this.lanesBorders[this.lanesBorders.length-1].height;
          this.lanesBorders[this.lanesBorders.length-1].visible = false;
        }
      },

      spawnFish : function()
      {
        //temp
        var tDir = 'r';
        var xPos = -32;
        var rType =  Math.floor(Math.random() * 16);
        if(rType <= 7) rType = 0;
        else if(rType > 7 && rType <= 10) rType = 3;
        else if(rType >10 && rType <15) rType = 1;

        else if(rType == 15) rType = 2;
        var randomLane = Math.floor(Math.random() * this.lanes.length);
        var randomDir = Math.floor(Math.random() * 2)+1;
        if(randomDir == 1)
        {
          tDir = 'r';
          xPos = -32;
        }
        else
        {
          tDir = 'l';
          xPos = 400;
        }
        var tFish = new fish(rType,xPos,this.lanes[randomLane] - 8,tDir,randomLane);

        //tFish.setUp(0,0,24,'r');
        this.fishes.push(tFish);
        this.fishes[this.fishes.length-1].setUp();
        levelManager.remainingFishes-=1;
      //  console.log(levelManager.remainingFishes + 'remain');
      },
      killFish : function(byColliderBound, _id)
      {
        if(byColliderBound)
        {

          this.fishes[_id].render.kill();
          this.fishes.splice(_id,1);

          //this.spawnFish();
        }
        else {

          var tSplash = new splash(this.fishes[_id].render.x+this.fishes[_id].render.width/2,this.fishes[_id].render.y+this.fishes[_id].render.height/2);
          this.splash.push(tSplash);
          this.fishes[_id].render.kill();
          this.fishes.splice(_id,1);
        //  this.spawnFish();

        }
      },

      startSpawning : function(value)
      {
          game.time.events.repeat(levelManager.fishCooldown[levelManager.currentCooldown],value, function(){spawners.spawnFish();
          //  console.log(levelManager.timeCounter.duration);
          }, this);
      },

      update : function()
      {
        for(var i  = 0; i< this.fishes.length; i++)
        {
          this.fishes[i].update();
          if(this.fishes[i].render.x < -96 || this.fishes[i].render.x + this.fishes[i].render.width >= 480)
          {
            if(!this.fishes[i].danger)
            {
              commentManager.addComment(true,-this.fishes[i].lootPTS,this.fishes[i].render.x,this.fishes[i].render.y);
              gameInfo.addPoints(-(this.fishes[i].lootPTS));
            }
            this.killFish(true,i);
            break;
          }
        }

        for(var i = 0; i< this.splash.length; i++)
        {
          if(!this.splash[i].render.alive)
          {
            this.splash.splice(i,1);
          }
        }
      },

    };


  fishingRods = {
    renders : [],
    //positions : [96,200,304],
    positions : [160,200,240],
    baits : [],
    gameOver : false,

    init : function(numberOfRods)
    {
      //tidyUp
      if(this.baits.length > 0)
      {
        //console.log(this.baits.length);
        for(var i = this.baits.length-1; i>= 0; i--)
        {
          this.baits[0].tidyUp();
          this.baits.shift();
          //console.log('tidy x'+i);
        }
      }
      if(this.renders.length > 0)
      {
        /*for(var i = 0; i< this.renders.length; i++)
        {
          this.renders[i].baits[i].tidyUp();
        }*/
        for(var i = this.renders.length-1; i>= 0; i--)
        {
          //this.renders[0].baits.shift();
          this.renders[0].kill();
          this.renders.shift();
        }
      }

      if(numberOfRods == 3)
      {
        for(var i = 0; i< numberOfRods; i++)
        {
          this.renders.push(0);
          this.renders[this.renders.length-1] = game.add.sprite(this.positions[i],0,'fishingRod');
          this.renders[this.renders.length-1].x -= this.renders[this.renders.length-1].width/2;

          this.baits.push(0);
          this.baits[this.baits.length-1] = new bait();
          this.baits[this.baits.length-1].rodID=i;
          this.baits[this.baits.length-1].init(spawners.lanesBorders.length,i);

        }
      }

      else if(numberOfRods == 2)
      {
        for(var i = 0, x =0; i< numberOfRods; i++,x += 2)
        {
          this.renders.push(0);
          this.renders[this.renders.length-1] = game.add.sprite(this.positions[x],0,'fishingRod');
          this.renders[this.renders.length-1].x -= this.renders[this.renders.length-1].width/2;

          this.baits.push(0);
          this.baits[this.baits.length-1] = new bait();
          this.baits[this.baits.length-1].rodID=i;
          this.baits[this.baits.length-1].init(spawners.lanesBorders.length,x);

        }
      }

      else if(numberOfRods == 1)
      {
        for(var i = 0; i< numberOfRods; i++)
        {
          this.renders.push(0);
          this.renders[this.renders.length-1] = game.add.sprite(this.positions[1],0,'fishingRod');
          this.renders[this.renders.length-1].x -= this.renders[this.renders.length-1].width/2;

          this.baits.push(0);
          this.baits[this.baits.length-1] = new bait();
          this.baits[this.baits.length-1].rodID=i;
          this.baits[this.baits.length-1].init(spawners.lanesBorders.length,1);

        }
      }


      //console.lo
    },
  };//wędki

  bait = function(){

    this.holders = [];
    this.aciveBaitID = 0;
    this.alive = true;
    this.rodID = 0;

    this.tidyUp = function()
    {
      if(this.holders.length > 0)
      {
        //tidy up
        for(var i = this.holders.length-1; i>= 0; i--)
        {
          this.holders[0].kill();
          this.holders.shift();

        //  console.log('tidyibg'+i);
        }

      }
    },

    this.init = function(numberOfBaits, rodID)
    {
    //  this.rodID = rodID;
      var k = rodID;
        for(var i = 0; i< 4; i++)
        {
          this.holders.push(0);
          this.holders[this.holders.length-1] = game.add.sprite(fishingRods.positions[k],spawners.lanesBorders[i].y,'bait');
          this.holders[this.holders.length-1].scale.setTo(0.75,0.75);
          this.holders[this.holders.length-1].x -= (this.holders[this.holders.length-1].width/2);
          this.holders[this.holders.length-1].y -= (this.holders[this.holders.length-1].height);
        }

      this.changeActive(0);
    }

    this.changeActive = function(newActiveID)
    {
      if(this.alive)
      {
        this.aciveBaitID = newActiveID;
        this.holders[this.aciveBaitID].frame = 1;

        for(var i = 0; i< this.holders.length; i++)
        {
          if(this.aciveBaitID != i) this.holders[i].frame =0;
        }
        if(fishingRods.renders.length>0)
        {
          fishingRods.renders[this.rodID].height = this.holders[this.aciveBaitID].y+4;
        //  console.log(fishingRods.renders[this.rodID].height + ' rod '+this.rodID);
        }
      }
    }
  };//bait

};

fishingGame.Game.prototype = {

    create: function () {

        //  Honestly, just about anything could go here. It's YOUR game after all. Eat your heart out!
        //tutaj pakujemy rybki i wędkowanie oraz tory
        //if(game.state.states['VStore'].soundVolume == 0)game.state.states['VStore'].soundVolume = 1;
        if(!game.state.states['VStore'].loadOnce)
        {
        //  soundManager.music = this.add.audio('titleMusic');
      //    soundManager.music.stop();
      //		if(!soundManager.music.isPlaying) soundManager.music.play('', 0, game.state.states['VStore'].soundVolume, true);
      //		soundManager.music.onLoop.add(function(){soundManager.music.play('', 0, game.state.states['VStore'].soundVolume, true); }, this);
      //    game.state.states['VStore'].loadOnce = true;
        }
        gameBackground = this.game.add.sprite(0,0,'gamebg');
        gameInfo.init();
        levelManager.initTimer();
      spawners.initLanes();
      levelManager.nextLevel();

      if(!game.state.states['VStore'].is_Muted)game.state.states['VStore'].music.fadeIn(1000,true);
  		//soundManager.music.play();

      //this.bubbleManager.init();
      //console.log(this._gameMode);


    /*  for(var i = 0, t=3; i< 3; i++, t+= 2)
      {
        this.game.time.events.add(Phaser.Timer.SECOND*(t), function(){spawners.spawnFish();}, this);
      }*/

      //bait.init(spawners.lanesBorders.length);

    },
    collisionDetect : function()
    {
      for(var i = 0; i< spawners.fishes.length; i++)
      {
        for(var k = 0; k< fishingRods.baits.length; k++)
        {
          if(fishingRods.baits[k].alive)
          {

            /*if( (spawners.fishes[i].render.x >= fishingRods.baits[k].holders[spawners.fishes[i].lane].x && spawners.fishes[i].render.x  < fishingRods.baits[k].holders[spawners.fishes[i].lane].x + fishingRods.baits[k].holders[spawners.fishes[i].lane].width)
          || (spawners.fishes[i].render.x > fishingRods.baits[k].holders[spawners.fishes[i].lane].x + fishingRods.baits[k].holders[spawners.fishes[i].lane].width && spawners.fishes[i].render.x +spawners.fishes[i].render.width < fishingRods.baits[k].holders[spawners.fishes[i].lane].x) )*/
          if( (spawners.fishes[i].render.x + spawners.fishes[i].render.width >= fishingRods.baits[k].holders[spawners.fishes[i].lane].x && spawners.fishes[i].render.x + spawners.fishes[i].render.width/2 <= fishingRods.baits[k].holders[spawners.fishes[i].lane].x)
        || (spawners.fishes[i].render.x <= fishingRods.baits[k].holders[spawners.fishes[i].lane].x + fishingRods.baits[k].holders[spawners.fishes[i].lane].width && spawners.fishes[i].render.x +spawners.fishes[i].render.width/2 >= fishingRods.baits[k].holders[spawners.fishes[i].lane].x + fishingRods.baits[k].holders[spawners.fishes[i].lane].width) )
            {

              if(fishingRods.baits[k].aciveBaitID == spawners.fishes[i].lane)
              {
                if(spawners.fishes[i].danger)
                {
                  //console.log("game over");
                  commentManager.addComment(true,spawners.fishes[i].lootPTS,spawners.fishes[i].render.x,spawners.fishes[i].render.y);
                  gameInfo.addPoints(spawners.fishes[i].lootPTS);
                  fishingRods.baits[k].alive = false;
                  for(var x = 0; x< fishingRods.baits[k].holders.length; x++) fishingRods.baits[k].holders[x].visible = false;
                  for(var x = 0, continueLoop = true; x< fishingRods.baits.length; x++)
                  {
                    if(fishingRods.baits[x].alive)
                    {
                      continueLoop = false;
                    }
                    if(x == fishingRods.baits.length-1 && continueLoop == true)
                    {
                      fishingRods.gameOver = true;
                    //  console.log('game over');
                    }
                  }
                }
                else {
                  commentManager.addComment(true,spawners.fishes[i].lootPTS,spawners.fishes[i].render.x,spawners.fishes[i].render.y);
                  gameInfo.addPoints(spawners.fishes[i].lootPTS);
                  spawners.killFish(false,i);

                  break;
                }
              }
            }
            }
        }
      }

    },

    update: function () {

        //  Honestly, just about anything could go here. It's YOUR game after all. Eat your heart out!
        spawners.update();
        this.collisionDetect();

        levelManager.checkForGoal();
        commentManager.update();

        if(this.game.input.activePointer.isDown)
        	{
            var xP = this.game.input.activePointer.x;
            var yP = this.game.input.activePointer.y;
            var extendedArea = 16;
            for(var i =0; i< fishingRods.renders.length; i++)
            {
              for(var k = 0; k< fishingRods.baits[i].holders.length; k++)
              {
                if(xP >= fishingRods.baits[i].holders[k].x - extendedArea && xP <= fishingRods.baits[i].holders[k].x + fishingRods.baits[i].holders[k].width + extendedArea && yP >= fishingRods.baits[i].holders[k].y - extendedArea && yP <= fishingRods.baits[i].holders[k].y + fishingRods.baits[i].holders[k].height + extendedArea )
                {
                  fishingRods.baits[i].changeActive(k);
                }
              }
            }
          }


    },



    quitGame: function (pointer) {

        //  Here you should destroy anything you no longer need.
        //  Stop music, delete sprites, purge caches, free resources, all that good stuff.

        //  Then let's go back to the main menu.
        this.state.start('MainMenu');

    },



};
