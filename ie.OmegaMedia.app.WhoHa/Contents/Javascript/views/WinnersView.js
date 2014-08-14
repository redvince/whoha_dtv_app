/* Javascript View file: WinnersView.js
*  Authors: Vincent Redmond, Gary Reid
*  Desc: Sidebar windowed view displaying Game Winners Content 
*  Date : 2014/07/30
*/
var WinnersView = new MAF.Class({
	ClassName: 'WinnersView',

	Extends: MAF.system.SidebarView,

	initialize: function () {
		this.parent();
	},
	//View is loaded in the DOM tree, called once, when the view is created
	//Most elements are created and appended
	createView: function () {

		var view = this;
		//Creates base image component/element to hold background image
		this.elements.winnersBackground = new MAF.element.Image({
			src: 'Images/Winner/Winner_background.png',
			styles:{
				width: 600,
				height: 980,
				hAlign: "center"
			}
		}).appendTo(this);
		//Creates a button component without any default styling
		//Used for navigation and styled from Winner Image Assets Folder
		this.elements.newGameButton = new MAF.element.Button({
			styles:{
				width: 117,
				height: 101,
				backgroundImage: 'Images/Winner/Newgame_off.png',				
				hAlign: "center",
				vOffset: 632
			},
			events:{
				onSelect: function () {
					//Clears scores and continues(resets) game
					teamA.clearGameScores();
					teamB.clearGameScores();
					game.continueGame();
					gameSounds.playSelectButtonSound(5);
					//Loads Start View
					MAF.application.loadView("view-StartView");
				},
				onFocus: function () {
					//Animates button state accordingly
					gameSounds.playMoveCursorSound();
					view.elements.newGameButton.animate({
						backgroundImage: 'Images/Winner/Newgame_on.png',
						duration: animateLength
					});
				},
				onBlur: function () {
					//Animates button state accordingly
					view.elements.newGameButton.animate({
						backgroundImage: 'Images/Winner/Newgame_off.png',
						duration: animateLength
					});
				}
			}
		}).appendTo(this);
		//Creates a button component without any default styling
		//Used for navigation and styled from Winner Image Assets Folder
		this.elements.mainMenuButton = new MAF.element.Button({
			styles:{
				width: 161,
				height: 81,
				backgroundImage: 'Images/Winner/Menu_off.png',
				hOffset: 59.5,
				vOffset: this.elements.newGameButton.outerHeight + 7
			},
			events:{
				onSelect: function () {
					gameSounds.playSelectButtonSound(1);
					//Booleans used so focus does not trigger sound on return to view
					gameSounds.playSound = false;
					//Show dialogue looking for confirmation
					new MAF.dialogs.Alert({
						title: 'Main Menu?',
						message: '(Quit Current Game)',
						buttons: [
							{ label: 'Yes',
								callback: function () {
									//Load Menu
									MAF.application.loadView("view-MenuView");
								}
							},
							{ label: 'No',
								callback: function () {
									gameSounds.playSelectButtonSound(3);
									view.elements.centreButton.focus();
								}	
							}									
						]
					}).show();
				},
				onFocus: function () {
					//Animates button state 
					gameSounds.playMoveCursorSound();
					view.elements.mainMenuButton.animate({
						backgroundImage: 'Images/Winner/Menu_on.png',
						duration: animateLength
					});
				},
				onBlur: function () {
					//Animates button state accordingly
					view.elements.mainMenuButton.animate({
						backgroundImage: 'Images/Winner/Menu_off.png',
						duration: animateLength
					});
				}
			}
		}).appendTo(this);
		//Creates a button component without any default styling
		//Styled from Winner Image Assets Folder
		this.elements.centreButton = new MAF.element.Button({
			styles:{
				width: 133,
				height: 81,
				backgroundImage: 'Images/Winner/Centre_off.png',
				hOffset: this.elements.mainMenuButton.outerWidth + 7,
				vOffset: this.elements.newGameButton.outerHeight + 7
			},
			events:{
				onFocus: function () {
					//Animates button state and plays game sound
					gameSounds.playMoveCursorSound();
					view.elements.centreButton.animate({
						backgroundImage: 'Images/Winner/Centre_on.png',
						duration: animateLength
					});
				},
				onBlur: function () {
					//Animates button state and sets sound boolean
					gameSounds.playSound = true;
					view.elements.centreButton.animate({
						backgroundImage: 'Images/Winner/Centre_off.png',
						duration: animateLength
					});
				}
			}
		}).appendTo(this);
		//Creates a button component without any default styling
		//Used for navigation and styled from Winner Image Assets Folder
		this.elements.exitButton = new MAF.element.Button({
			styles:{
				width: 161,
				height: 81,
				backgroundImage: 'Images/Winner/Exit_off.png',
				hOffset: this.elements.centreButton.outerWidth + 7,
				vOffset: this.elements.newGameButton.outerHeight + 7
			},
			events:{
				onSelect: function () {
					gameSounds.playSelectButtonSound(1);
					//Boolean used so focus does not trigger sound on return to view
					gameSounds.playSound = false;
					//Show dialogue looking for confirmation
					new MAF.dialogs.Alert({
						title: 'Exit App?',
						buttons: [
							{ label: 'Yes',
								callback: function () {
									new MAF.dialogs.Alert({
										title: 'Bye now!!!',
										buttons: []
									}).show();
									gameSounds.playExitGameSound();
									//Uses MAF function to exit after 1.5 seconds
									setTimeout(function(){MAF.application.exit();}, 1500);
								}
							},
							{ label: 'No',
								callback: function () {
									gameSounds.playSelectButtonSound(3);
									view.elements.centreButton.focus();
								}	
							}									
						]
					}).show();
				},
				onFocus: function () {
					//Animates button state and plays game sound
					gameSounds.playMoveCursorSound();
					view.elements.exitButton.animate({
						backgroundImage: 'Images/Winner/Exit_on.png',
						duration: animateLength
					});
				

				},
				onBlur: function () {
					//Animates button state
					view.elements.exitButton.animate({
						backgroundImage: 'Images/Winner/Exit_off.png',
						duration: animateLength
					});
				}
			}
		}).appendTo(this);
		//Creates a (disabled) button component without any default styling
		//Used for navigation and styled from Winner Image Assets Folder
		this.elements.downButton = new MAF.element.Button({
			styles:{
				width: 117,
				height: 101,
				backgroundImage: 'Images/Winner/Down_Neutral.png',
				hAlign: "center",
				vOffset: this.elements.centreButton.outerHeight + 7
			}
		}).appendTo(this).setDisabled(true);
		//Creates base image component/element to hold Winner image
		this.elements.winnerHolder = new MAF.element.Image({
			src: 'Images/Winner/Winners.png',
			styles:{
				width: 550,
				height: 380,				
				hAlign: "center",
				vOffset: 15
			}
		}).appendTo(this);
		//Creates base image component/element to hold Team Result image
		this.elements.resultHolder = new MAF.element.Image({
			styles:{
				width: 309,
				height: 82,				
				hAlign: "center",
				vOffset: 115
			}
		}).appendTo(this);
		//Creates base text component/element to hold Final Team Score
		this.elements.finalScore = new MAF.element.Text({
			styles:{
				width: 600,
				fontSize: 65,
				color: 'rgba(0,0,0,.9)',
				hAlign: "center",
				vOffset: 395,
				anchorStyle: 'center'		
			}
		}).appendTo(this);		
	},
	//Called everytime the user visits the view
	updateView: function () {
		//boolean used so initial button focus does not trigger game sound
		gameSounds.playSound = false;
		this.elements.centreButton.focus();
		//Sets elements accordingly depending on Final Scores
		if (teamA.getGameScore() > teamB.getGameScore()) {
			this.elements.resultHolder.setSource('Images/Winner/TeamA.png');
			this.elements.finalScore.setText('Final Score : ' + teamA.getGameScore());
		} else if (teamA.getGameScore() === teamB.getGameScore()) {
			this.elements.resultHolder.setSource('Images/Winner/Draw.png');
			this.elements.finalScore.setText('Final Score : ' + teamA.getGameScore());
		} else {
			this.elements.resultHolder.setSource('Images/Winner/TeamB.png');
			this.elements.finalScore.setText('Final Score : ' + teamB.getGameScore());
		}
	
	}
});