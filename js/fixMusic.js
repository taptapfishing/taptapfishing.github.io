fishingGame.fixMusic = function (game) {
background = 0;
playButton = 0;
label = 0;
text = 0;

topRankedRender = 0;
topRankedTxt = 0;
}
fishingGame.fixMusic.prototype = {

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

    background = game.add.sprite(0,0,'titlepage');




		game.state.states['VStore'].is_Muted = false;


    playButton = game.add.button(200, 600, 'play', function(){

      game.state.start('MainMenu');}    ,this);

    playButton.x -= playButton.width/2;
		playButton.y -= playButton.height;
    //playButton.y -= playButton.height/2;
    label = game.add.text(playButton.x+playButton.width/2,playButton.y + playButton.height/2,'RETURN',{ font: '28px Frijole', fill: '#FFF', align: 'center' });
    label.x -= label.width/2;
    label.y -= label.height/2;
		playButton.visible = false;
		label.visible = false;

		text = game.add.text(200,16,'Play again and\nboost your score!\n',{ font: '28px Frijole', fill: '#FFF', align: 'center' });
		text.x -= text.width/2;

		topRankedTxt = 'Top players overall:\n\n';
		topRankedRender = game.add.text(text.x + text.width/2,text.y + text.height+32,topRankedTxt,{ font: '20px Frijole', fill: '#FFF', align: 'center' });
		topRankedRender.x -= topRankedRender.width/2;
		topRankedRender.y -= topRankedRender.height/2;

		var scoreBoardService  = new App42ScoreBoard();

		var userName = game.state.states['VStore'].userName;
		var overrank = game.state.states['VStore'].overallRank
		var result;
		scoreBoardService.saveUserScore('taptapfishingoverall', userName, overrank, {
				success: function (object) {
					//  $(".success").show();
						var gameObj = JSON.parse(object)
					//  $('#success').html("score for the user saved");
					//  jAlert('Score for user successfully saved', "Save User Score");

				},
				error: function (error) {

				}
		});
		  game.time.events.add(1500,function(){scoreBoardService.getTopNRankers('taptapfishingoverall', 10,{
			success: function(object)
			{
			 var scorelist = "";
					var tapgame = JSON.parse(object);
					result = tapgame.app42.response.games.game;
					var scoreList = result.scores.score;

					if (scoreList instanceof Array) {
									for (var i = 0, k=i+1; i < scoreList.length; i++,k++) {
										topRankedTxt += k.toString();
										topRankedTxt += ('.'+scoreList[i].userName+' - ' + scoreList[i].value.toString());
										topRankedTxt += '\n';
									}
									topRankedRender.text = topRankedTxt;
									topRankedRender.x = 200 - topRankedRender.width/2;
									//playButton.y =topRankedRender.y+topRankedRender.height+8;
									//label.x =playButton.x+playButton.width/2 - label.width/2;
									//label.y =playButton.y + playButton.height/2 - label.height/2;
								}
						//document.getElementById("leaderboard").innerHTML = "<table width = \"100%\"><tr><td colspan = \"2\"><strong>TOP SCORES</strong></td>"+scorelist+"</table>";
			},
			error: function(error) {
				topRankedTxt += 'connection error';
				topRankedRender.text = topRankedTxt;
				topRankedRender.x = 200 - topRankedRender.width/2;
				/*playButton.y =topRankedRender.y+topRankedRender.height+8;
				label.x =playButton.x+playButton.width/2 - label.width/2;
				label.y =playButton.y + playButton.height/2 - label.height/2;*/
			}
	});},this);

	game.time.events.add(3000,function(){playButton.visible = true;label.visible = true;},this);


	},

	update: function () {

		//	Do some nice funky main menu effect here
    //console.log(game.state.states['VStore'].hsound.state());
    /*if(game.state.states['VStore'].hsound.state() == 'loaded' && !game.state.states['VStore'].loadOnce)
    {
      game.state.states['VStore'].loadOnce = true;
      console.log(game.state.states['VStore'].hsound.state());
    }*/

	},

	startGame: function () {

		//	Ok, the Play Button has been clicked or touched, so let's stop the music (otherwise it'll carry on playing)



		//	And start the actual game
		this.state.start('Game');

	}

};
