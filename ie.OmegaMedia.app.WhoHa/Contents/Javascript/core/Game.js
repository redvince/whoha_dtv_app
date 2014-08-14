/* Core Javascript Prototype file: Game.js
*  Author: Vincent Redmond
*  Desc: Contains the code to encapsulate WHo?Ha Game logic.  
*  Date : 2014/07/30
*/
//Initialise Game instance properties
function Game () {
	this.skips = 0;
	//Team A goes first
	this.teamA = true;
	this.teamB = false;
	this.adultGame = false;
	this.familyGame = false;
	this.currentRoundTeamA = 0;
	this.currentRoundTeamB = 0;
	this.inPlay = false;
}
//Overwrite prototype/constructor and define all methods
//Function names self explanatory
Game.prototype = {
	constructor: Game,
	switchTeam:function () {
		if (this.teamA) {
			this.teamA = false;
			this.teamB = true;
		} else {
			this.teamB = false;
			this.teamA = true;
		}
	},
	setGameType:function (type) {
		if (type === "adult") {
			this.adultGame = true;
			this.familyGame = false;
		} else {
			this.familyGame = true;
			this.adultGame = false;
		}
	},
	saveSkip:function () {
		this.skips++;
	},
	resetSkips:function () {
		this.skips = 0;
	},
	completeRoundTeamA:function () {
		this.currentRoundTeamA++;
	},
	completeRoundTeamB:function () {
		this.currentRoundTeamB++;
	},
	isGameFinished:function () {
		//Game finishes after three rounds each
		if ((this.currentRoundTeamA === 3) && (this.currentRoundTeamB === 3)) {
			return true;
		} else {
			return false;
		}
	},
	resetGame:function () {
		this.inPlay = false;
		this.skips = 0;
		this.teamA = true;
		this.teamB = false;
		this.currentRoundTeamA = 0;
		this.currentRoundTeamB = 0;
	},
	continueGame:function () {
		this.resetGame();
		this.inPlay = true;
	},
	playGame:function () {
		this.inPlay = true;
	}
};
//Create instance of Game Object
var game = new Game();
//global variable for animate length
var animateLength = 0.3;