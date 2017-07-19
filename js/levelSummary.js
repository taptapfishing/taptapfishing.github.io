fishingGame.levelSummary = function (game) {
  continueButton = null;
  continueLabel = null;
  background = null;
  currentLevel = 0;
  failed = false;

  congratsLabel = null;
  congratsTxt = 'Congratulations!\nPrepare yourself for\nnext level!';
  leaderboardTxt = 'please wait...';


  scoreBoard ={
    top3 : null,
    textResult : '',
    saveScore : function(n)
    {
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
  		console.log(apiLevelName);

      var scoreBoardService = new App42ScoreBoard();
      this.textResult = '';
      leaderboardTxt = 'please wait...';
      if(n){

          //var scoreBoard = new App42ScoreBoard();
              var gameName = apiLevelName;
              var description = "gamed";
              var userName = game.state.states['VStore'].userName;
              if(userName == "Guest")
              {

                var rID = Math.floor(Math.random()*9999);
                userName += rID.toString();
                //console.log(userName);
              }
              var result;
              scoreBoardService.saveUserScore(gameName, userName, n, {
                  success: function (object) {
                    //  $(".success").show();
                      var gameObj = JSON.parse(object)
                    //  $('#success').html("score for the user saved");
                    //  jAlert('Score for user successfully saved', "Save User Score");

                  },
                  error: function (error) {

                  }
              });

              game.time.events.add(1500,function(){
                scoreBoardService.getTopNRankers("taptapfishing1", 3,{
                  success: function(object)
                  {
                   var scorelist = "";
                      var tapgame = JSON.parse(object);
                      result = tapgame.app42.response.games.game;
                      var scoreList = result.scores.score;
                      this.top3 = result.scores.score;
                      if (this.top3 instanceof Array) {
                              for (var i = 0, k=i+1; i < this.top3.length; i++,k++) {

                                //  console.log(scoreList[i].userName+' - ' + scoreList[i].value.toString());
                              //  console.log(scoreBoard.textResult);

                                scoreBoard.textResult += k.toString();
                                scoreBoard.textResult += ('.'+this.top3[i].userName+' - ' + this.top3[i].value.toString());
                                scoreBoard.textResult += '\n';
                                  //console.log(this.top3[i].userName+' - ' + this.top3[i].value.toString());
                              //  console.log(scoreBoard.textResult);
                              }
                              leaderboardTxt = scoreBoard.textResult;
                              game.state.states['VStore'].topRank = leaderboardTxt;
                              //console.log(game.state.states['VStore'].topRank);
                              congratsTxt += game.state.states['VStore'].topRank;
                              game.state.states['VStore'].bestLevelScore = scoreList[0].value;
                              if(game.state.states['VStore'].levelScore >= game.state.states['VStore'].bestLevelScore)
                              {
                                congratsTxt += '\nYOU BEAT BEST SCORE!!!11';
                              }

                              congratsLabel.text = congratsTxt;
                              console.log(congratsTxt.length);
                              if(game.state.states['VStore'].levelScore >= game.state.states['VStore'].bestLevelScore)
                              {
                                congratsLabel.addColor('#0f0',congratsTxt.length - 31);
                              }
                              congratsLabel.x = 200 - congratsLabel.width/2;

                          }
                        //document.getElementById("leaderboard").innerHTML = "<table width = \"100%\"><tr><td colspan = \"2\"><strong>TOP SCORES</strong></td>"+scorelist+"</table>";
                  },
                  error: function(error) {
                    congratsTxt += 'connection error';
                    congratsLabel.text = congratsTxt;
                    congratsLabel.x = 200 - congratsLabel.width/2;
                  }
              });
            },this);
                 }
                  },
  };

  actionManager = {

    next : function( is_failed)
    {
      if(is_failed == false)
      {
        if(game.state.states['VStore'].currentLevel < 8)
        {
          if(game.state.states['VStore'].currentLevel < 8)
          {
            game.state.states['VStore'].currentLevel += 4;
            game.state.start('Break');
          }
          else {
            game.state.states['VStore'].music.stop();
            game.state.start('MainMenu');
            //do testów!
          }
        }

      }
      else game.state.start('Break');
    },
  };

}
fishingGame.levelSummary.prototype = {

	create: function () {

		//	We've already preloaded our assets, so let's kick right into the Main Menu itself.
		//	Here all we're doing is playing some music and adding a picture and button
		//	Naturally I expect you to do something significantly better :)




      var t_failed = game.state.states['VStore'].levelFailed;
      var bLabel = 'bla';

          scoreBoard.saveScore(game.state.states['VStore'].levelScore);



          //console.log('po stronie summ vs '+ game.state.states['VStore'].levelFailed);

          if(!t_failed)
          {
            congratsTxt = 'Congratulations!\n'+game.state.states['VStore'].userName + ' scored: '+game.state.states['VStore'].levelScore;
              congratsTxt += '\nTop scores:\n';//+game.state.states['VStore'].topRank;
            //congratsTxt += game.state.states['VStore'].topRank;

            //console.log(scoreBoard.textResult);

            bLabel = 'CONTINUE';
          }
          else
          {
            congratsTxt = 'Ups!\nTry again!\nScored: '+game.state.states['VStore'].levelScore;
            congratsTxt += '\nTop scores:\n';//+game.state.states['VStore'].topRank;
            bLabel = 'RESTART';
          }



    background = game.add.sprite(0,0,'titlepage');
    //continueButton = game.add.button(200,300,'play');

    congratsLabel = game.add.text(200, 32,congratsTxt,{ font: '20px Frijole', fill: '#FFF', wordWrapWidth: 200, align: 'center' });
    congratsLabel.x -= congratsLabel.width/2;
    congratsLabel.stroke = '#000000';
    congratsLabel.strokeThickness = 6;
    congratsLabel.fill = '#fff';
    //congratsLabel.setShadow(congratsLabel.x-4,congratsLabel.y-4,'#000',5,true,true);


      continueButton = game.add.button(200, 400, 'play',function(){actionManager.next(t_failed);}, this, 1, 0, 0);

      continueButton.x -= continueButton.width/2;
      continueButton.y -= continueButton.height/2;

      continueLabel = game.add.text(continueButton.x + continueButton.width/2, continueButton.y+continueButton.height/2,bLabel,{ font: '28px Frijole', fill: '#FFF', align: 'center' });
      continueLabel.x -= continueLabel.width/2;
      continueLabel.y -= continueLabel.height/2;


  /*  continueButton.x -= continueButton.width/2;
    continueButton.y -= continueButton.height/2;
    continueLabel.x -= continueLabel.width/2;
    continueLabel.y -= continueLabel.height/2;*/

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
