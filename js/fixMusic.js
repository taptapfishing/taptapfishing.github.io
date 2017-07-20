fishingGame.fixMusic = function (game) {
background = 0;
playButton = 0;
label = 0;
}
fishingGame.fixMusic.prototype = {

	create: function () {
    background = game.add.sprite(0,0,'titlepage');

  /*  if(!game.state.states['VStore'].loadOnce)
		{
      game.state.states['VStore'].hsound=    new Howl({
     src: ['assets/sfx/loop.ogg'],
     autoplay: false,
     loop: true,
     volume: game.state.states['VStore'].soundVolume,
     onend: function() {
       console.log('Finished!');
     }

   });
   game.state.states['VStore'].hpop=    new Howl({
  src: ['assets/sfx/pop.ogg'],
  autoplay: false,
  loop: false,
  volume: game.state.states['VStore'].soundVolume,
  onend: function() {
    console.log('Finished!');
  }
});*/

			//game.state.states['VStore'].music = this.add.audio('titleMusic');
			//game.state.states['VStore'].pop = this.add.audio('pop');
			//game.state.states['VStore'].loadOnce = true;

//		}
		game.state.states['VStore'].is_Muted = false;


    playButton = game.add.button(200, 200, 'play', function(){

      game.state.states['VStore'].hsound.play();



    //  if (/*(this.game.device.android && this.game.device.chrome && this.game.device.chromeVersion >= 55) ||*/ !this.game.device.desktop)
      /*{
        game.state.states['VStore'].pop.play();
        game.state.states['VStore'].music.play('',0,game.state.states['VStore'].soundVolume,true);
  			game.state.states['VStore'].music.onLoop.add(function(){game.state.states['VStore'].music.play('', 0, game.state.states['VStore'].soundVolume, true); }, this);
      }*/
      game.state.start('MainMenu');
      console.log('click');}
      ,this);
    playButton.x -= playButton.width/2;
    playButton.y -= playButton.height/2;
    label = game.add.text(playButton.x+playButton.width/2,playButton.y + playButton.height/2,'READY',{ font: '28px Frijole', fill: '#FFF', align: 'center' });
    label.x -= label.width/2;
    label.y -= label.height/2;
		//	We've already preloaded our assets, so let's kick right into the Main Menu itself.
		//	Here all we're doing is playing some music and adding a picture and button
		//	Naturally I expect you to do something significantly better :)



	},

	update: function () {

		//	Do some nice funky main menu effect here
    //console.log(game.state.states['VStore'].hsound.state());
    if(game.state.states['VStore'].hsound.state() == 'loaded' && !game.state.states['VStore'].loadOnce)
    {
      game.state.states['VStore'].loadOnce = true;
      console.log(game.state.states['VStore'].hsound.state());
    }

	},

	startGame: function () {

		//	Ok, the Play Button has been clicked or touched, so let's stop the music (otherwise it'll carry on playing)



		//	And start the actual game
		this.state.start('Game');

	}

};
