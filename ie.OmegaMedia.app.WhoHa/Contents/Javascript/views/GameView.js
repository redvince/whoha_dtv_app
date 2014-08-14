/* Javascript View file: GameView.js
*  Authors: Vincent Redmond, Gary Reid
*  Desc: Fullscreen windowed view displaying Game Content 
*  Date : 2014/07/30
*/
var GameView = new MAF.Class({
	ClassName: 'GameView',

	Extends: MAF.system.FullscreenView,
	//add the listener catching changes in MAF Message system
	initialize: function () {
		this.parent();
		this.registerMessageCenterListenerCallback(this.dataHasChanged);
	},
	//listen for Messages with the value 'numbers'
	//Sent from the GameTimer Object to update Countdown clock
	dataHasChanged: function (event) {
		if(event.payload.key === 'numbers') {
			this.elements.clockLeft.setText(event.payload.value[0], true);
			this.elements.clockRight.setText(event.payload.value[1], true);
		}
	},
	//View is loaded in the DOM tree, called once, when the view is created
	//Most elements are created and appended
	createView: function () {
		var view = this;
		//Creates base image component/element to hold background image
		this.elements.gameBackground1 = new MAF.element.Image({
			src: '/Images/Game/Full_screen.png',
			styles:{
				width: 1920,
				height: 1080
			}
		}).appendTo(this);
		//Creates base image component/element to hold Logo image
		this.elements.gameLogo = new MAF.element.Image({
			src: '/Images/Game/Logo.png',
			styles:{
				width: 477,
				height: 232,
				vOffset: 85,
				hOffset: 90
			}
		}).appendTo(this);
		//Creates a button component without any default styling
		//Used record correct guess and styled from Game Image Assets Folder
		this.elements.correctButton = new MAF.element.Button({
			styles:{
				width: 117,
				height: 101,
				backgroundImage: 'Images/Game/Correct_off.png',
				vOffset: 718,
				hOffset: 272
			},
			events:{
				onSelect: function () {
					//Load new Image depending on game type
					if (game.adultGame) {
						view.elements.imageHolder.setSource(gameImages.getNextAdultImage());
					} else {
						view.elements.imageHolder.setSource(gameImages.getNextFamilyImage());
					}
					//Team saves correct guess
					if (game.teamA) {
						teamA.saveCorrectScore();
					} else {
						teamB.saveCorrectScore();
					}

					gameSounds.playWhoHaSound();
					//boolean used so button focus does not trigger game sound
					gameSounds.playSound = false;
					view.elements.centreButton.focus();
				},
				onFocus: function () {
					//Animates button state and plays game sound
					gameSounds.playMoveCursorSound();
					view.elements.correctButton.animate({
						backgroundImage: 'Images/Game/Correct_on.png',
						duration: animateLength
					});
				},
				onBlur: function () {
					//Animates button state
					view.elements.correctButton.animate({
						backgroundImage: 'Images/Game/Correct_off.png',
						duration: animateLength
					});
				}
			}
		}).appendTo(this);
		//Creates a button component without any default styling
		//Used for navigation and styled from Game Image Assets Folder
		this.elements.pauseButton = new MAF.element.Button({
			styles:{
				width: 161,
				height: 81,
				backgroundImage: 'Images/Game/Pause_off.png',
				hOffset: 96,
				vOffset: this.elements.correctButton.outerHeight + 7
			},
			events:{
				onSelect: function () {
					//Game Timer Object Pauses the countdown
					gameTimer.pauseCountdown();
					gameSounds.playSelectButtonSound(1);
					//booleans used so button focus does not trigger game sound
					gameSounds.playSound = false;
					//Show dialogue with options			
					new MAF.dialogs.Alert({
						title: 'Game Paused.',
						buttons: [
							{ label: 'Return To Game',
								callback: function () {
									//Returns to Game view and Unpauses Countdown
									gameSounds.playSelectButtonSound(3);
									view.elements.centreButton.focus();
									gameTimer.unPauseCountdown();
								}
							},
							{ label: 'Main Menu',
								callback: function () {
									//Loads Menu
									MAF.application.loadView("view-MenuView");
								}
							},
							{ label:  'Image Credits',
								callback: function () {
									//Loads Credits View
									gameSounds.playSelectButtonSound(2);
									MAF.application.loadView("view-CreditsView");
								}
							}
						]
					}).show();
				},
				onFocus: function () {
					//Animates button state and plays game sound
					gameSounds.playMoveCursorSound();
					view.elements.pauseButton.animate({
						backgroundImage: 'Images/Game/Pause_on.png',
						duration: animateLength
					});
				},
				onBlur: function () {
					//Animates button state 
					view.elements.pauseButton.animate({
						backgroundImage: 'Images/Game/Pause_off.png',
						duration: animateLength
					});
				}
			}
		}).appendTo(this);
		//Creates a button component without any default styling
		//Styled from Game Image Assets Folder
		this.elements.centreButton = new MAF.element.Button({
			styles:{
				width: 133,
				height: 81,
				backgroundImage: 'Images/Game/Centre_off.png',
				hOffset: this.elements.pauseButton.outerWidth + 7,
				vOffset: this.elements.correctButton.outerHeight + 7
			},
			events:{
				onFocus: function () {
					//Animates button state and plays game sound
					gameSounds.playMoveCursorSound();
					view.elements.centreButton.animate({
						backgroundImage: 'Images/Game/Centre_on.png',
						duration: animateLength
					});
				},
				onBlur: function () {
					//Animates button state and sets sound boolean
					gameSounds.playSound = true;
					view.elements.centreButton.animate({
						backgroundImage: 'Images/Game/Centre_off.png',
						duration: animateLength
					});
				}
			}
		}).appendTo(this);
		//Creates a button component without any default styling
		//Used for navigation and styled from Game Image Assets Folder
		this.elements.exitButton = new MAF.element.Button({
			styles:{
				width: 161,
				height: 81,
				backgroundImage: 'Images/Game/Exit_off.png',
				hOffset: this.elements.centreButton.outerWidth + 7,
				vOffset: this.elements.correctButton.outerHeight + 7
			},
			events:{
				onSelect: function () {
					//Pause countdown timer
					gameTimer.pauseCountdown();
					//Boolean used so focus does not trigger sound on return to view
					gameSounds.playSelectButtonSound(1);
					gameSounds.playSound = false;
					//Show dialogue looking for confirmation				
					new MAF.dialogs.Alert({
						title: 'Exit App?.',
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
									//unpause and return to game view
									gameSounds.playSelectButtonSound(3);
									view.elements.centreButton.focus();
									gameTimer.unPauseCountdown();
								}
							}
						]
					}).show();
				},
				onFocus: function () {
					//Animates button state and plays game sound
					gameSounds.playMoveCursorSound();
					view.elements.exitButton.animate({
						backgroundImage: 'Images/Game/Exit_on.png',
						duration: animateLength
					});
				},
				onBlur: function () {
					//Animates button state
					view.elements.exitButton.animate({
						backgroundImage: 'Images/Game/Exit_off.png',
						duration: animateLength
					});
				}
			}
		}).appendTo(this);
		//Creates a button component without any default styling
		//Used record skip and styled from Game Image Assets Folder
		this.elements.skipButton = new MAF.element.Button({
			styles:{
				width: 117,
				height: 101,
				backgroundImage: 'Images/Game/Skip_off.png',
				hOffset: 272,
				vOffset: this.elements.centreButton.outerHeight + 7
			},
			events:{
				onSelect: function () {
					//Load skip indicator image accordingly
					if (game.teamA) {
						switch (game.skips) {
							case 0:
								view.elements.clockHolder.animate({
									backgroundImage: 'Images/Game/TeamA_one_skip.png',
									duration: animateLength
								});
								break;
							case 1:
								view.elements.clockHolder.animate({
									backgroundImage: 'Images/Game/TeamA_two_skips.png',
									duration: animateLength
								});
								break;
							default:
								break;
						}
					} else {
						switch (game.skips) {
							case 0:
								view.elements.clockHolder.animate({
									backgroundImage: 'Images/Game/TeamB_one_skip.png',
									duration: animateLength
								});
								break;
							case 1:
								view.elements.clockHolder.animate({
									backgroundImage: 'Images/Game/TeamB_two_skips.png',
									duration: animateLength
								});
								break;
							default:
								break;
						}
					}
					//record skip
					game.saveSkip();
					//Max 3 skips allowed, stop countdown and load round summary
					if (game.skips === 3) {
						gameTimer.stopCountdown();
						gameSounds.playEndSound();
						MAF.application.loadView("view-SummaryView");

					} else {
						gameSounds.playSelectButtonSound(7);
						//Load new Image depending on game type
						if (game.adultGame) {
							view.elements.imageHolder.setSource(gameImages.getNextAdultImage());
						} else {
							view.elements.imageHolder.setSource(gameImages.getNextFamilyImage());
						}
					}
					
					gameSounds.playSound = false;
					view.elements.centreButton.focus();
				},
				onFocus: function () {
					//Animates button state and plays game sound
					gameSounds.playMoveCursorSound();
					view.elements.skipButton.animate({
						backgroundImage: 'Images/Game/Skip_on.png',
						duration: animateLength
					});
				},
				onBlur: function () {
					//Animates button state
					view.elements.skipButton.animate({
						backgroundImage: 'Images/Game/Skip_off.png',
						duration: animateLength
					});
				}
			}
		}).appendTo(this);
		//Creates base image component/element to hold next image to guess

		this.elements.imageHolder = new MAF.element.Image({
			styles:{
				width: 1008,
				height: 757,				
				hOffset: 766,
				vAlign: "center"
			}
		}).appendTo(this);
		//Creates empty component/element to hold clock image
		this.elements.clockHolder = new MAF.control.EmptySpace({
			styles:{
				width: 369,
				height: 156,
				backgroundImage: 'Images/Game/Clock.png',				
				hOffset: 146.5,
				vOffset: 500
			}
		}).appendTo(this);
		//Creates base text component/element to hold Clock Digits
		this.elements.clockLeft = new MAF.element.Text({
			label: '02',
			styles:{
				width: 90,
				height: 75,
				fontSize: 90,
				color: 'rgba(0,0,0,.9)',
				hOffset: 225,
				anchorStyle: 'justify',
				vOffset: 524
			}
		}).appendTo(this);
		//Creates base text component/element to hold Clock Colon
		this.elements.clockColon = new MAF.element.Text({
			label: ':',
			styles:{
				width: 90,
				height: 75,
				fontSize: 90,
				color: 'rgba(0,0,0,.9)',
				hOffset: 285,
				anchorStyle: 'center',
				vOffset: 524
			}
		}).appendTo(this);
		//Creates base text component/element to hold Clock Digits
		this.elements.clockRight = new MAF.element.Text({
			label: '00',
			styles:{
				width: 150,
				height: 75,
				fontSize: 90,
				color: 'rgba(0,0,0,.9)',
				hOffset: 346,
				anchorStyle: 'justify',
				vOffset: 524
			}
		}).appendTo(this);
	},
	//Called everytime the user visits the view
	updateView: function () {
		var view = this;
		game.playGame();
		//If view is visited from Credits view, Load the pause dialogue
		if (gameTimer.isPaused) {
			new MAF.dialogs.Alert({
				title: 'Game Paused.',
				buttons: [
					{ label: 'Return To Game',
						callback: function () {
							gameSounds.playSelectButtonSound(3);
							gameSounds.playSound = false;
							view.elements.centreButton.focus();
							gameTimer.unPauseCountdown();
						}
					},
					{ label: 'Main Menu',
						callback: function () {
							MAF.application.loadView("view-MenuView");
						}
					},
					{ label:  'Image Credits',
						callback: function () {
							gameSounds.playSelectButtonSound(2);
							MAF.application.loadView("view-CreditsView");
						}
					}
				]
			}).show();
		} else {
			//boolean used so initial button focus does not trigger game sound
			gameSounds.playSound = false;
			this.elements.centreButton.focus();
			//set default clock holder
			view.elements.clockHolder.setStyles({
				backgroundImage: 'Images/Game/Clock.png'
			});
			//Load new Image to guess depending on game type
			if (game.adultGame) {
				view.elements.imageHolder.setSource(gameImages.getNextAdultImage());
			} else {
				view.elements.imageHolder.setSource(gameImages.getNextFamilyImage());
			}
			//Start Countdown clock at 2 minutes
			gameTimer.startCountdown(2);
			//Record a Team playing a round
			if (game.teamA) {
				game.completeRoundTeamA();
			} else {
				game.completeRoundTeamB();
			}
		}
	}
});