fishingGame.gameBreak = function (game) {

	skipButton = null;
	skipLabel = null;
	background = null;

	breakManager ={
		beginB : function()
		{

		},
		endB : function(data)
		{
			if (data && data.completed) {

	 	}
			game.time.events.add(1000,function(){game.state.start('Game');},this);
		}
	};

}
fishingGame.gameBreak.prototype = {

	create: function () {

		var apiLevelName = 'taptapfishing';
    if(game.state.states['VStore'].currentLevel<= 3)
    {
      apiLevelName += '1';
    }
    else if(game.state.states['VStore'].currentLevel > 3 && game.state.states['VStore'].currentLevel<= 6)
    {
      apiLevelName += '2';
    }
    else if(game.state.states['VStore'].currentLevel > 6 && game.state.states['VStore'].currentLevel<= 9)
    {
      apiLevelName += '3';
    }


    if(game.state.states['Game']._gameMode == 1)
    {
      //console.log('gamemode1');
      var scoreBoardService = new App42ScoreBoard();
      scoreBoardService.getTopNRankers(apiLevelName, 3,{
          success: function(object)
          {
           var scorelist = "";
              var tapgame = JSON.parse(object);
              result = tapgame.app42.response.games.game;
              var scoreList = result.scores.score;

              if (scoreList instanceof Array) {
                //  scoreBoard.textResult += ('.'+this.top3[i].userName+' - ' + this.top3[i].value.toString());
                  game.state.states['VStore'].minimalScoreChallenge = scoreList[scoreList.length-1].value;

									//tu bym sie zastanowił nad zmianą score list length-1 na [3]
									game.state.states['VStore'].bestLevelScore = scoreList[0].value;
                  //console.log(game.state.states['VStore'].minimalScoreChallenge);
                  }
                //document.getElementById("leaderboard").innerHTML = "<table width = \"100%\"><tr><td colspan = \"2\"><strong>TOP SCORES</strong></td>"+scorelist+"</table>";
          },
          error: function(error) {
          }
      });
    }

background = game.add.sprite(0,0,'titlepage');

skipButton = game.add.button(320, 540, 'play',function(){game.state.start('Game');}, this, 1, 0, 0);
skipButton.scale.setTo(0.5,0.5);

skipButton.x -= skipButton.width/2;
skipButton.y -= skipButton.height/2;

skipLabel = game.add.text(skipButton.x + skipButton.width/2, skipButton.y+skipButton.height/2,'Skip Ad',{ font: '28px Frijole', fill: '#FFF', align: 'center' });
skipLabel.scale.setTo(0.5,0.5);
skipLabel.x -= skipLabel.width/2;
skipLabel.y -= skipLabel.height/2;
skipLabel.visible = false;
skipButton.visible = false;
game.state.states['VStore'].soundVolume = 0;
//game.state.states['VStore'].music.fadeOut(1000);
 if(!game.state.states['VStore'].is_Muted)
 {
	 	game.state.states['VStore'].hsound.fade(1.0,0.0,1000);
 }

game.time.events.add(8000,function(){game.state.start('Game');},this);
		//	We've already preloaded our assets, so let's kick right into the Main Menu itself.
		//	Here all we're doing is playing some music and adding a picture and button
		//	Naturally I expect you to do something significantly better :)

//GameAPI.GameBreak.request(breakManager.beginB, breakManager.endB);
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
