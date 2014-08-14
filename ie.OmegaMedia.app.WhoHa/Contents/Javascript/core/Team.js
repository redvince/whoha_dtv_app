/* Core Javascript Prototype file: Team.js
*  Author: Vincent Redmond
*  Desc: Contains the code to encapsulate WHo?Ha Team logic.  
*  Date : 2014/07/30
*/
//Initialise Team instance properties
function Team (teamName) {
    this.name = teamName;
    this.gameScores = [];
    this.correctScore = 0;
    this.gameScore = 0;
}
//Overwrite prototype/constructor and define all methods
//Function names self explanatory
Team.prototype = {
    constructor: Team,
    saveCorrectScore:function () {
        this.correctScore++;
    },
    getCurrentRoundScore:function () {
        return this.correctScore;
    },
    saveRoundScore:function () {
        //array containing round scores
        this.gameScores.push(this.correctScore);
        this.clearCurrentRoundScores();
    },
    getGameScore:function () {
        this.gameScore = 0;
        //sum of round scores array
        for (var i = 0; i < this.gameScores.length; i++) {
            this.gameScore += this.gameScores[i];
        }
        return this.gameScore;
    },
    clearCurrentRoundScores:function () {
        this.correctScore = 0;
    },
    clearGameScores:function () {
        this.gameScores = [];
        this.correctScore = 0;
        this.incorrectScore = 0;
        this.gameScore = 0;
    }
};
//Create instances of Team Objects
var teamA = new Team("Team A");
var teamB = new Team("Team B");
