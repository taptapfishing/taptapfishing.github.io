fishingGame.tutorial = function (game) {

	skipButton = null;
	skipLabel = null;
	background = null;

  tips = ['Tap on the fishing rod\nto change active bait.','Be fast to catch as much\ngold and green fishes\nas you can.','Catch: \n\n\n\ngreen (+5,+10,+15) points\ngold (+100 points)\n\nAvoid: \n\n\n\nblue (-5) points\npink (-150 and broken rod)','Get best scores, get more\nfishing rods!\nBe on the top\nof leaderboard!','Enter your nick:\nleft-right to change\ncurrent nick letter\nup-down to change letter\n\n','NORMAL MODE\nJust catch fishes and score\nat least minimal level score.'];

  tipsManager = {
    currentTip : -1,
    x : 48,
    y : 48,
    locked : false,
    lockedCooldown : 1000,
    tipRenderTxt : 0,
    screen_1_2 : 0,
    screen_3 : [0,0],

		nickName : 'xxxxxxxx',
		nickButtons : [0,0,0,0],
		nickRender : 0,

		currentPos : 8,
		letters : ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'
		,'0','1','2','3','4','5','6','7','8','9'],
		currentLetter : 35,
		clickLocked : false,
		clickLockedCooldown : 500,
		changeLetter : function(to_prev)
		{
			if(!this.clickLocked)
			{
				if(to_prev)
				{
					if(this.currentLetter >0)
					{
						this.currentLetter -= 1;
					}
					else this.currentLetter = this.letters.length-1;
				}
				else{
					if(this.currentLetter < this.letters.length-1)
					{
						this.currentLetter += 1;
					}
					else this.currentLetter = 0;
				}
				this.clickLocked = true;
				game.time.events.add(150,function(){this.clickLocked = false;},this);
			}


			//this.nickName[this.currentPos] = this.letters[this.currentLetter];
//			this.nickName.replaceAt(this.currentPos,this.letters[this.currentLetter]);
				this.nickName = replaceAt(this.nickName,this.currentPos,this.letters[this.currentLetter]);

			this.nickRender.text = this.nickName;

		},
		changePosition : function(to_prev)
		{
			if(!this.clickLocked)
			{
				if(to_prev)
				{
					if(this.currentPos >0)
					{
						this.currentPos -= 1;
					}
					else this.currentPos = this.nickName.length-1;
				}
				else {
					if(this.currentPos < this.nickName.length-1)
					{
						this.currentPos += 1;
					}
					else this.currentPos = 0;
				}
				for(var i = 0; i< this.currentPos;i++)this.nickRender.addColor('#fff',i);
				 this.nickRender.addColor('#0f0',this.currentPos);
				 for(var i = this.currentPos+1; i< this.nickName.length;i++)this.nickRender.addColor('#fff',i);
				this.clickLocked = true;
				game.time.events.add(this.clickLockedCooldown/2,function(){this.clickLocked = false;},this);
			}

		},


    nextTip : function()
    {
			if(game.state.states['Game']._gameMode == 1)
			{
				tips[tips.length-1] = 'CHALLENGE MODE\nCatch fishes and score\nat least minimal level score.\nMinimal score needed to\nunlock next level is always\n3rd best score from\nthe level-leaderboard.\nBe the best one!';
			}
			else {
				tips[tips.length-1] = 'NORMAL MODE\nJust catch fishes and score\nat least minimal level score.';
			}

			this.nickRender.visible = false;
			for(var i = 0; i< 4; i++)
			{
				this.nickButtons[i].visible = false;
			}
      if(!this.locked)
      {
        if(this.currentTip < tips.length-1)
        {
          this.currentTip += 1;


          this.tipRenderTxt.text = tips[this.currentTip];
          this.tipRenderTxt.x = 200 - this.tipRenderTxt.width/2;
          this.locked = true;
          game.time.events.add(this.lockedCooldown, function(){this.locked = false;    }, this);
					if(this.currentTip == 5)
					{
						for(var i = 0; i< 4; i++)
						{
							this.nickButtons[i].visible = false;
							this.nickButtons[i].frame = i;
						}

						this.screen_1_2.visible = true;
						this.nickRender.visible = false;
						this.screen_1_2.frame = 3+1;
						if(game.state.states['Game']._gameMode == 1)
						{
							this.screen_1_2.scale.setTo(0.4,0.4);
						}
						//this.screen_1_2.x = 200 - this.screen_1_2.width/2;
						this.screen_1_2.x = 32;
						this.screen_1_2.y = this.tipRenderTxt.y + this.tipRenderTxt.height + 24;
					}

          if(this.currentTip < 2 )
          {
            for(var i = 0; i<2; i++) this.screen_3[i].visible = false;
            this.screen_1_2.visible = true;
            this.screen_1_2.frame = this.currentTip+1;
            this.screen_1_2.x = 200 - this.screen_1_2.width/2;
            this.screen_1_2.y = this.tipRenderTxt.y + this.tipRenderTxt.height + 24;
          }
          else if(this.currentTip == 2)
          {
            for(var i = 0; i<2; i++)
            {
              this.screen_3[i].visible = true;
              this.screen_3[i].frame = i;
              this.screen_3[i].x = 200 - this.screen_3[i].width/2;
            }
              this.screen_3[0].y = this.tipRenderTxt.y + 48;
              this.screen_3[1].y = this.tipRenderTxt.y + 288;
            this.screen_1_2.visible = false;
          }
          else if(this.currentTip == 3) {
            for(var i = 0; i<2; i++)
            {
              this.screen_3[i].visible = false;
            }
            this.screen_1_2.visible = true;
            this.screen_1_2.frame = 2+1;
            this.screen_1_2.x = 200 - this.screen_1_2.width/2;
            this.screen_1_2.y = this.tipRenderTxt.y + this.tipRenderTxt.height + 24;
          }
					else if(this.currentTip == 4)
					{
						this.changePosition(false);
						for(var i = 0; i< 4; i++)
						{
							this.nickButtons[i].visible = true;
							this.nickButtons[i].frame = i;
						}

						this.screen_1_2.visible = false;
						this.nickRender.visible = true;
						this.nickRender.x = 200- this.nickRender.width/2;
						this.nickRender.y = 300- this.nickRender.height/2;
					}

        }
        else {
					game.state.states['VStore'].userName = this.nickName;
					game.state.start('Break');
        }
      }
    },

  };

}
fishingGame.tutorial.prototype = {

	create: function () {

background = game.add.sprite(0,0,'titlepage');

tipsManager.tipRenderTxt = game.add.text(200, 48,tips[tipsManager.currentTip],{ font: '20px Frijole', fill: '#FFF', align: 'center', wordWrapWidth: 400 });

tipsManager.tipRenderTxt.stroke = '#000000';
tipsManager.tipRenderTxt.strokeThickness = 4;
tipsManager.tipRenderTxt.fill = '#fff';

tipsManager.screen_1_2 = game.add.sprite(200,300,'gamebg');
tipsManager.screen_1_2.scale.setTo(0.5,0.5);
tipsManager.screen_3[0] = game.add.sprite(200,300,'decoFishOld');
tipsManager.screen_3[1] = game.add.sprite(200,300,'decoFishOld');

tipsManager.nickRender = game.add.text(200, 300,tipsManager.nickName,{ font: '32px Frijole', fill: '#FFF', align: 'center', wordWrapWidth: 400 });
for(var i = 0; i< 4; i++)
{
	tipsManager.nickButtons[i] = game.add.button(200,350, 'letterB');
	tipsManager.nickButtons[i].scale.setTo(0.3,0.3);
}

tipsManager.nickButtons[1].onInputDown.add(function(){tipsManager.changePosition(true);},this);
tipsManager.nickButtons[0].onInputDown.add(function(){tipsManager.changePosition(false);},this);
tipsManager.nickButtons[2].onInputDown.add(function(){tipsManager.changeLetter(false);},this);
tipsManager.nickButtons[3].onInputDown.add(function(){tipsManager.changeLetter(true);},this);



tipsManager.nickButtons[2].x = 200 - tipsManager.nickButtons[1].width/2 ;
tipsManager.nickButtons[2].y = 350;
tipsManager.nickButtons[3].x = tipsManager.nickButtons[2].x ;
tipsManager.nickButtons[3].y = tipsManager.nickButtons[2].y+tipsManager.nickButtons[2].height;

tipsManager.nickButtons[1].x = tipsManager.nickButtons[2].x - tipsManager.nickButtons[2].width;
tipsManager.nickButtons[1].y = tipsManager.nickButtons[3].y;
tipsManager.nickButtons[0].x = tipsManager.nickButtons[3].x + (tipsManager.nickButtons[3].width);
tipsManager.nickButtons[0].y = tipsManager.nickButtons[3].y;


tipsManager.nextTip();



skipButton = game.add.button(320, 540, 'play',function(){tipsManager.nextTip();}, this, 1, 0, 0);
skipButton.scale.setTo(0.5,0.5);

skipButton.x -= skipButton.width/2;
skipButton.y -= skipButton.height/2;

skipLabel = game.add.text(skipButton.x + skipButton.width/2, skipButton.y+skipButton.height/2,'Next',{ font: '28px Frijole', fill: '#FFF', align: 'center' });
skipLabel.scale.setTo(0.5,0.5);
skipLabel.x -= skipLabel.width/2;
skipLabel.y -= skipLabel.height/2;

game.state.states['VStore'].soundVolume = 0;

		//	We've already preloaded our assets, so let's kick right into the Main Menu itself.
		//	Here all we're doing is playing some music and adding a picture and button
		//	Naturally I expect you to do something significantly better :)


	},

	update: function () {

		//	Do some nice funky main menu effect here


	},

	startGame: function () {

		//	Ok, the Play Button has been clicked or touched, so let's stop the music (otherwise it'll carry on playing)



		//	And start the actual game
		this.state.start('Game');

	}

};
