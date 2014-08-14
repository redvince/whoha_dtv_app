/* Javascript View file: MenuView.js
*  Authors: Vincent Redmond, Gary Reid
*  Desc: Sidebar windowed view displaying Main Menu Content 
*  Date : 2014/07/30
*/
var MenuView = new MAF.Class({
	ClassName: 'MenuView',

	Extends: MAF.system.SidebarView,

	initialize: function () {
		this.parent();
	},
	//View is loaded in the DOM tree, called once, when the view is created
	//Most elements are created and appended
	createView: function () {
		//ImageBank connects to Web API
		gameImages.getAdultImages();
		gameImages.getFamilyImages();
		var view = this;
		//Creates base image component/element to hold background image
		this.elements.menuBackground = new MAF.element.Image({
			src: 'Images/Landing/Landing_background.png',
			styles:{
				width: 600,
				height: 980,
				hAlign: "center"
			}
		}).appendTo(this);
		//Creates a button component without any default styling
		//Used for navigation and styled from Landing Image Assets Folder
		this.elements.howToPlayButton = new MAF.element.Button({
			styles:{
				width: 117,
				height: 101,
				backgroundImage: 'Images/Landing/Howto_off.png',
				hAlign: "center",
				vOffset: 632
			},
			events:{
				onSelect: function () {
					//Loads How View when selected
					gameSounds.playSelectButtonSound(2);
					MAF.application.loadView("view-HowView");
				},
				onFocus: function () {
					//Animates button state and plays game sound
					gameSounds.playMoveCursorSound();
					view.elements.howToPlayButton.animate({
						backgroundImage: 'Images/Landing/Howto_on.png',
						duration: animateLength
					});
				},
				onBlur: function () {
					//Animates button state
					view.elements.howToPlayButton.animate({
						backgroundImage: 'Images/Landing/Howto_off.png',
						duration: animateLength
					});
				}
			}
		}).appendTo(this);
		//Creates a button component without any default styling
		//Used for navigation and styled from Landing Image Assets Folder
		this.elements.aboutButton = new MAF.element.Button({
			styles:{
				width: 161,
				height: 81,
				backgroundImage: 'Images/Landing/About_off.png',				
				hOffset: 59.5,
				vOffset: this.elements.howToPlayButton.outerHeight + 7
			},
			events:{
				onSelect: function () {
					//Loads About View when selected and plays game sound
					gameSounds.playSelectButtonSound(2);
					MAF.application.loadView("view-AboutView");
				},
				onFocus: function () {
					//Animates button state and plays game sound
					gameSounds.playMoveCursorSound();
					view.elements.aboutButton.animate({
						backgroundImage: 'Images/Landing/About_on.png',
						duration: animateLength
					});
				},
				onBlur: function () {
					//Animates button state
					view.elements.aboutButton.animate({
						backgroundImage: 'Images/Landing/About_off.png',
						duration: animateLength
					});
				}
			}
		}).appendTo(this);

		//Creates a button component without any default styling
		//Styled from Landing Image Assets Folder
		this.elements.centreButton = new MAF.element.Button({
			styles:{
				width: 133,
				height: 81,
				backgroundImage: 'Images/Landing/Centre_off.png',
				hOffset: this.elements.aboutButton.outerWidth + 7,
				vOffset: this.elements.howToPlayButton.outerHeight + 7
			},
			events:{
				onFocus: function () {
					//Animates button state and plays game sound
					gameSounds.playMoveCursorSound();
					view.elements.centreButton.animate({
						backgroundImage: 'Images/Landing/Centre_on.png',
						duration: animateLength
					});
				},
				onBlur: function () {
					//Animates button state and sets sound boolean 
					gameSounds.playSound = true;
					view.elements.centreButton.animate({
						backgroundImage: 'Images/Landing/Centre_off.png',
						duration: animateLength
					});
				}
			}
		}).appendTo(this);

		//Creates a button component without any default styling
		//Used for navigation and styled from Landing Image Assets Folder
		this.elements.startButton = new MAF.element.Button({
			styles:{
				width: 161,
				height: 81,
				backgroundImage: 'Images/Landing/Start_off.png',
				hOffset: this.elements.centreButton.outerWidth + 7,
				vOffset: this.elements.howToPlayButton.outerHeight + 7
			},
			events:{
				onSelect: function () {
					//Loads Start Settings when selected and plays game sound
					gameSounds.playSelectButtonSound(2);
					MAF.application.loadView("view-StartSettingsView");
				},
				onFocus: function () {
					//Animates button state and plays game sound
					gameSounds.playMoveCursorSound();
					view.elements.startButton.animate({
						backgroundImage: 'Images/Landing/Start_on.png',
						duration: animateLength
					});
				},
				onBlur: function () {
					//Animates button state
					view.elements.startButton.animate({
						backgroundImage: 'Images/Landing/Start_off.png',
						duration: animateLength
					});
				}
			}
		}).appendTo(this);
		//Creates a button component without any default styling
		//Used for sound settings and styled from Landing Image Assets Folder
		this.elements.soundsButton = new MAF.element.Button({
			styles:{				
				width: 117,
				height: 101,
				backgroundImage: 'Images/Landing/SoundsOn_off.png',	
				hAlign: "center",
				vOffset: this.elements.centreButton.outerHeight + 7
			},
			events:{
				onSelect: function () {
					////toggle sounds and refocus to centre button
					gameSounds.toggleSound();
					gameTimer.clockSound.toggleSound();
					view.elements.centreButton.focus();
				
				},
				onFocus: function () {
					//Animates button states accordingle and plays game sound
					gameSounds.playMoveCursorSound();
					if (gameSounds.soundOn) {
						view.elements.soundsButton.animate({
							backgroundImage: 'Images/Landing/SoundsOn_on.png',
							duration: animateLength
						});
					} else {
						view.elements.soundsButton.animate({
							backgroundImage: 'Images/Landing/SoundsOff_on.png',
							duration: animateLength
						});
					}
				},
				onBlur: function () {
					//Animates button states accordingly
					if (gameSounds.soundOn) {
						view.elements.soundsButton.animate({
							backgroundImage: 'Images/Landing/SoundsOn_off.png',
							duration: animateLength
						});
					} else {
						view.elements.soundsButton.animate({
							backgroundImage: 'Images/Landing/SoundsOff_off.png',
							duration: animateLength
						});
					}
				}
			}
		}).appendTo(this);
	},
	//Called everytime the user visits the view
	updateView: function () {
		//resets game, team and timer objects when view is visited from anywhere 
		teamA.clearGameScores();
		teamB.clearGameScores();
		game.resetGame();
		gameTimer.stopCountdown();
		//boolean used so initial button focus does not trigger game sound
		gameSounds.playSound = false;
		//Who?Ha sound eveytime view is visited
		gameSounds.playWhoHaSound();
		this.elements.centreButton.focus();	
	}
});