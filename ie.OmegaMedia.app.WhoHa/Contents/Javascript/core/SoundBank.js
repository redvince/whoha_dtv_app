/* Core Javascript Prototype file: SoundBank.js
*  Author: Vincent Redmond
*  Desc: Contains the code to encapsulate WHo?Ha SoundBank logic.  
*  Date : 2014/07/30
*/
//Initialise Sound Bank instance properties
function SoundBank () {
	this.soundPath = 'apps/ie.OmegaMedia.app.WhoHa/Contents/Audio/';
	this.buttonClickSound = 'buttonClick';
	this.selectButtonSound = 'selectButton';
	this.exitGameSound = 'exitGame.wav';
	this.moveCursorSound = 'cursorClick.wav';
	this.startGameSound = 'playGame.wav';
	this.whoHaSound = 'whoHa.wav';
	this.tickSound = 'tick.wav';
	this.warningSound = 'clockWarning.wav';
	this.endSound = 'clockEnd.wav';
	this.clapSound = 'clap.wav';
	this.playSound = false;
	this.playSummarySound = false;
	this.soundOn = true;
}
//Overwrite prototype/constructor and define all methods
//Function names self explanatory
SoundBank.prototype = {
	constructor: SoundBank,
	toggleSound:function () {
		if (this.soundOn) {
			this.soundOn = false;
		} else {
			this.soundOn = true;
		}
	},
	playSelectButtonSound:function (number) {
		if (!this.soundOn) {
			return;
		}
		if (1 <= number && number <= 7) {
			var audio = new Audio(this.soundPath + this.selectButtonSound + number + '.wav');
			audio.play();
		} else {
			console.log("No such audio");
		}
	},
	playTickSound:function () {
		if (this.soundOn) {
			var audio = new Audio(this.soundPath + this.tickSound);
			audio.play();
		}
	},
	playEndSound:function () {
		if (this.soundOn) {
			var audio = new Audio(this.soundPath + this.endSound);
			audio.play();
		}
	},
	playWarningSound:function () {
		if (this.soundOn) {
			var audio = new Audio(this.soundPath + this.warningSound);
			audio.play();
		}
	},
	playClapSound:function () {
		if (this.soundOn) {
			var audio = new Audio(this.soundPath + this.clapSound);
			audio.play();
		}
	},
	playButtonClickSound:function (number) {
		if (!this.soundOn) {
			return;
		}
		if (1 <= number && number <= 3) {
			var audio = new Audio(this.soundPath + this.buttonClickSound + number + '.wav');
			audio.play();
		} else {
			console.log("No such audio");
		}
	},
	playExitGameSound:function () {
		if (this.soundOn) {
			var audio = new Audio(this.soundPath + this.exitGameSound);
			audio.play();
		}
	},
	playMoveCursorSound:function () {
		if ((!this.playSound) || (!this.soundOn)) {
			return;
		}
			var audio = new Audio(this.soundPath + this.moveCursorSound);
			audio.play();
	},
	playSummaryCursorSound:function () {
		if ((!this.playSummarySound) || (!this.soundOn)) {
			return;
		}
		var audio = new Audio(this.soundPath + this.moveCursorSound);
		audio.play();
	},
	playStartGameSound:function () {
		if (this.soundOn) {
			var audio = new Audio(this.soundPath + this.startGameSound);
			audio.play();
		}
	},
	playWhoHaSound:function () {
		if (this.soundOn) {
			var audio = new Audio(this.soundPath + this.whoHaSound);
			audio.play();
		}
	}
};
//Create instance of Sound Bank Object
var gameSounds = new SoundBank();