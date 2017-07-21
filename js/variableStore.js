fishingGame.variableStore = function (game) {
  levelFailed = false;
  currentLevel = 0;
  soundVolume = 1;
  levelScore = 0;
  muteClickCooldown = 500;
  muteCanClick = true;
  loadOnce = false;
  topRank = 'please wait...';
  minimalScoreChallenge = 0;
  bestLevelScore = 0;
  userName = 'Guest';
  muteFrame = 0;
  is_Muted = false;
  music = 0;
  pop = 0;
  hpop = 0;
  hsound =0;
  overallRank = 0;
  logoLink = 0;
  moreGamesHREF = 0;
  logoSpilHREF = 0;
}
fishingGame.variableStore.prototype = {

	create: function () {

		//	We've already preloaded our assets, so let's kick right into the Main Menu itself.
		//	Here all we're doing is playing some music and adding a picture and button
		//	Naturally I expect you to do something significantly better :)


	},

	update: function () {

		//	Do some nice funky main menu effect here


	},



};
