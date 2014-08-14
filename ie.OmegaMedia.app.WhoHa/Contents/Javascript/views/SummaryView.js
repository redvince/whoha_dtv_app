/* Javascript View file: SummaryView.js
*  Authors: Vincent Redmond, Gary Reid
*  Desc: Sidebar windowed view displaying Round Summary Content 
*  Date : 2014/07/30
*/
var SummaryView = new MAF.Class({
	ClassName: 'SummaryView',

	Extends: MAF.system.SidebarView,

	initialize: function () {
		this.parent();
	},
	//View is loaded in the DOM tree, called once, when the view is created
	//Most elements are created and appended
	createView: function () {
		var view = this;
		//Creates base image component/element to hold background image
		this.elements.summaryBackground = new MAF.element.Image({
			src: '/Images/Summary/Summary_background2.png',
			styles:{
				width: 600,
				height: 980,
				hAlign: "center"
			}
		}).appendTo(this);
		//Creates a button component without any default styling
		//Used for navigation and styled from Summary Image Assets Folder
		this.elements.readyButton = new MAF.element.Button({
			styles:{
				width: 117,
				height: 101,
				backgroundImage: 'Images/Summary/Ready_off.png',				
				hAlign: "center",
				vOffset: 632
			},
			events:{
				onSelect: function () {
					//Save Round score
					if (game.teamA) {
						teamA.saveRoundScore();
					} else {
						teamB.saveRoundScore();
					}
					//If all rounds have been played load Winners View
					//Otherwise Load Start View
					if (game.isGameFinished()) {
						gameSounds.playClapSound();
						MAF.application.loadView("view-WinnersView");
					} else {
						//Switch Teams and reset Skip count
						game.switchTeam();
						game.resetSkips();
						gameSounds.playSelectButtonSound(4);
						MAF.application.loadView("view-StartView");
					}
				},
				onFocus: function () {
					gameSounds.playMoveCursorSound();
					//Animates button state accordingly
					if (game.isGameFinished()) {
						view.elements.readyButton.animate({
							backgroundImage: 'Images/Summary/Next_on.png',
							duration: animateLength
						});
					} else {
					view.elements.readyButton.animate({
						backgroundImage: 'Images/Summary/Ready_on.png',
						duration: animateLength
						});
					}
				},
				onBlur: function () {
					//Animates button state accordingly
					if (game.isGameFinished()) {
						view.elements.readyButton.animate({
							backgroundImage: 'Images/Summary/Next_off.png',
							duration: animateLength
						});
					} else {
						view.elements.readyButton.animate({
							backgroundImage: 'Images/Summary/Ready_off.png',
							duration: animateLength
						});
					}
				}
			}
		}).appendTo(this);
		//Creates a button component without any default styling
		//Used for navigation and styled from Summary Image Assets Folder
		this.elements.mainMenuButton = new MAF.element.Button({
			styles:{
				width: 161,
				height: 81,
				backgroundImage: 'Images/Summary/Menu_off.png',
				hOffset: 59.5,
				vOffset: this.elements.readyButton.outerHeight + 7
			},
			events:{
				onSelect: function () {
					gameSounds.playSelectButtonSound(1);
					//Booleans used so focus does not trigger sound on return to view
					gameSounds.playSound = false;
					gameSounds.playSummarySound = false;
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
					gameSounds.playMoveCursorSound();
					//Animates button state accordingly
					view.elements.mainMenuButton.animate({
						backgroundImage: 'Images/Summary/Menu_on.png',
						duration: animateLength
					});
				},
				onBlur: function () {
					//Animates button state accordingly
					view.elements.mainMenuButton.animate({
						backgroundImage: 'Images/Summary/Menu_off.png',
						duration: animateLength
					});
				}
			}
		}).appendTo(this);
		//Creates a button component without any default styling
		//Styled from Summary Image Assets Folder
		this.elements.centreButton = new MAF.element.Button({
			styles:{
				width: 133,
				height: 81,
				backgroundImage: 'Images/Summary/Centre_off.png',
				hOffset: this.elements.mainMenuButton.outerWidth + 7,
				vOffset: this.elements.readyButton.outerHeight + 7
			},
			events:{
				onFocus: function () {
					//Animates button state and plays game sound
					gameSounds.playSummaryCursorSound();
					view.elements.centreButton.animate({
						backgroundImage: 'Images/Summary/Centre_on.png',
						duration: animateLength
					});
				},
				onBlur: function () {
					//Animates button state and sets sound boolean
					gameSounds.playSummarySound = true;
					gameSounds.playSound = true;
					view.elements.centreButton.animate({
						backgroundImage: 'Images/Summary/Centre_off.png',
						duration: animateLength
					});
				}
			}
		}).appendTo(this);
		//Creates a button component without any default styling
		//Used for navigation and styled from Summary Image Assets Folder
		this.elements.exitButton = new MAF.element.Button({
			styles:{
				width: 161,
				height: 81,
				backgroundImage: 'Images/Summary/Exit_off.png',
				hOffset: this.elements.centreButton.outerWidth + 7,
				vOffset: this.elements.readyButton.outerHeight + 7
			},
			events:{
				onSelect: function () {
					gameSounds.playSelectButtonSound(1);
					//Booleans used so focus does not trigger sound on return to view
					gameSounds.playSound = false;
					gameSounds.playSummarySound = false;
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
						backgroundImage: 'Images/Summary/Exit_on.png',
						duration: animateLength
					});
				},
				onBlur: function () {
					//Animates button state and plays game sound
					view.elements.exitButton.animate({
						backgroundImage: 'Images/Summary/Exit_off.png',
						duration: animateLength
					});
				}
			}
		}).appendTo(this);
		//Creates a (disabled) button component without any default styling
		//Used for navigation and styled from Summary Image Assets Folder
		this.elements.downButton = new MAF.element.Button({
			styles:{
				width: 117,
				height: 101,
				backgroundImage: 'Images/Summary/Down_Neutral.png',
				hAlign: "center",
				vOffset: this.elements.centreButton.outerHeight + 7
			}
		}).appendTo(this).setDisabled(true);
		//Creates base image component/element to hold Scoreboard image
		this.elements.summaryHolder = new MAF.element.Image({
			src: 'Images/Summary/Scoreboard.png',
			styles:{
				width: 550,
				height: 380,				
				hAlign: "center",
				vOffset: 15
			}
		}).appendTo(this);
		//Creates base image component/element to hold next team image
		this.elements.nextTeamHolder = new MAF.element.Image({
			src: 'Images/Summary/Team_B_ready.png',
			styles:{
				width: 426,
				height: 48,				
				hAlign: "center",
				vOffset: 410
			}
		}).appendTo(this);

		//Creates base text component/element to hold which Team
		this.elements.scoreHeader = new MAF.element.Text({
			styles:{
				width: 550,
				height: 100,
				fontSize: 150,
				color: 'rgba(0,0,0,.9)',
				hAlign: "center",
				anchorStyle: 'center',
				vOffset: 60
			}
		}).appendTo(this);
		//Creates base text component/element to hold Team Score
		this.elements.scoreText = new MAF.element.Text({
			styles:{
				width: 550,
				height: 90,
				fontSize: 140,
				color: 'rgba(0,0,0,.9)',
				hAlign: "center",
				anchorStyle: 'center',
				vOffset: 215
			}
		}).appendTo(this);		
	},
	//Called everytime the user visits the view
	updateView: function () {
		//booleans used so initial button focus does not trigger game sound
		gameSounds.playSummarySound = false;
		gameSounds.playSound = false;
		this.elements.centreButton.focus();
		//Sets elements accordingly if all rounds have been played
		if (game.isGameFinished()) {
			this.elements.readyButton.setStyles({backgroundImage: 'Images/Summary/Next_off.png'});
			this.elements.nextTeamHolder.setSource('Images/Summary/Final_score_next.png');
			this.elements.scoreHeader.setText("Team B");
			this.elements.scoreText.setText(teamB.getCurrentRoundScore());
		} else {
			this.elements.readyButton.setStyles({backgroundImage: 'Images/Summary/Ready_off.png'});
			//Sets elements according to team
			if (game.teamA) {
				this.elements.scoreHeader.setText("Team A");
				this.elements.scoreText.setText(teamA.getCurrentRoundScore());
				this.elements.nextTeamHolder.setSource('Images/Summary/Team_B_ready.png');
			} else {
				this.elements.scoreHeader.setText("Team B");
				this.elements.scoreText.setText(teamB.getCurrentRoundScore());
				this.elements.nextTeamHolder.setSource('Images/Summary/Team_A_ready.png');
			}
		}
	}
});