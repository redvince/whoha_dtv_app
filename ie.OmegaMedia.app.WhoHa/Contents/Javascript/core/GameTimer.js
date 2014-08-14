/* Core Javascript Prototype file: GameTimer.js
*  Author: Vincent Redmond
*  Desc: Contains the code to encapsulate WHo?Ha Game Timer logic.  
*  Date : 2014/07/30
*/
//Initialise Game Timer instance properties
function GameTimer () {
	//this.startTimer = false;
	this.mins;
	this.minutes;
	this.secs;
	this.seconds;
	this.startClock = null;
	this.isPaused = null;	
	this.clockSound = new SoundBank();
}
//Overwrite prototype/constructor and define all methods
//Function names self explanatory
GameTimer.prototype = {
	constructor: GameTimer,
	//function to send countdown timer values to MAF Message system
	//and then decrement by one second
	decrement:function () {
		if (this.isPaused) {
			return;
		} else if (this.secs === 0) {
			this.clockSound.playEndSound();
			this.seconds =  '00';
			MAF.messages.store('numbers', [this.minutes,this.seconds]);
			clearInterval(this.startClock);
			setTimeout(function() {
				//time is up, delay loading round summary view 
				//and resetting timer values in game view
				MAF.application.loadView("view-SummaryView");
				MAF.messages.store('numbers', ['02','00']);
			}, 1000);
			return;
		} else {
			if (this.secs < 10) {
				//formatting display value
				this.seconds = '0' + this.secs;
			} else if (this.secs < 59) {
				this.seconds = this.secs;
			} else {
				//calls own functions to get timer values
				this.minutes = '0' + this.getMinutes();
				this.seconds = this.getSeconds();
				if (this.seconds < 10) {
					//formatting display value
					this.seconds = '0' + this.seconds;
				}
			}
			//send countdown timer values to the MAF Message System
			MAF.messages.store('numbers', [this.minutes,this.seconds]);
			//occurances of warning sound
			if ((this.secs === 60) || (this.secs === 30) || (this.secs === 10) || (this.secs === 9) || (this.secs <= 3)) {
				this.clockSound.playWarningSound();

			}
			this.clockSound.playTickSound();
			//decrement
			this.secs--;
		}
	},
	getMinutes:function () {
		//Divided secs by 60 and round down
		this.mins = Math.floor(this.secs / 60);
		return this.mins;
	},
	getSeconds:function () {
		//Subtract the minutes (as seconds) from total remaining seconds 
		return this.secs - Math.round(this.mins * 60);
	},
	stopCountdown:function () {
		clearInterval(this.startClock);
		MAF.messages.store('numbers', ['02','00']);
		this.isPaused = false;
	},
	pauseCountdown:function () {
		clearInterval(this.startClock);
		this.isPaused = true;
	},
	unPauseCountdown:function () {
		var self = this;
		this.startClock = setInterval(function(){self.decrement();},1000);
		this.isPaused = false;
	},
	startCountdown:function (setMinutes) {
		this.isPaused = false;
		//offset a second delay
		this.secs = (setMinutes * 60) -1;
		var self = this;
		//decrement function every second
		this.startClock = setInterval(function(){self.decrement();},1000);
	}
};
//Create instance of Game Timer Object
var gameTimer = new GameTimer();
