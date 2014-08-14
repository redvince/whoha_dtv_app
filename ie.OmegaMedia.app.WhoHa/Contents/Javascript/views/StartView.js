/* Javascript View file: StartView.js
*  Authors: Vincent Redmond, Gary Reid
*  Desc: Sidebar windowed view displaying Start Game Content 
*  Date : 2014/07/30
*/
var StartView = new MAF.Class({
	ClassName: 'StartView',

	Extends: MAF.system.SidebarView,

	initialize: function () {
		this.parent();
	},
	//View is loaded in the DOM tree, called once, when the view is created
	//Most elements are created and appended
	createView: function () {
		
		var view = this;
		//Creates base image component/element to hold background image
		this.elements.startBackground = new MAF.element.Image({
			src: 'Images/Start/Getready_background.png',
			styles:{
				width: 600,
				height: 980,
				hAlign: "center"
			}
		}).appendTo(this);
		//Creates a button component without any default styling
		//Used for navigation and styled from Start Image Assets Folder
		this.elements.readyButton = new MAF.element.Button({
			styles:{
				width: 117,
				height: 101,
				backgroundImage: 'Images/Start/Ready_off.png',				
				hAlign: "center",
				vOffset: 632
			},
			events:{
				onSelect: function () {
					//Plays sound and loads Start View
					gameSounds.playStartGameSound();
					MAF.application.loadView("view-GameView");
				},
				onFocus: function () {
					//Animates button state and plays game sound
					gameSounds.playMoveCursorSound();
					view.elements.readyButton.animate({
						backgroundImage: 'Images/Start/Ready_on.png',
						duration: animateLength
					});
				},
				onBlur: function () {
					//Animates button state
					view.elements.readyButton.animate({
						backgroundImage: 'Images/Start/Ready_off.png',
						duration: animateLength
					});
				}
			}
		}).appendTo(this);
		//Creates a button component without any default styling
		//Used for navigation and styled from Start Image Assets Folder
		this.elements.backButton = new MAF.element.Button({
			styles:{
				width: 161,
				height: 81,
				backgroundImage: 'Images/Start/Back_off.png',
				hOffset: 59.5,
				vOffset: this.elements.readyButton.outerHeight + 7
			},
			events:{
				onSelect: function () {
					//if game is in play, it is a menu button
					if (game.inPlay) {
						gameSounds.playSelectButtonSound(1);
						//Boolean used so focus does not trigger sound on return to view
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
										//Return to view
										gameSounds.playSelectButtonSound(3);
										view.elements.centreButton.focus();
									}	
								}									
							]
						}).show();
					} else {
						//back button to Start Settings View
						gameSounds.playSelectButtonSound(2);
						MAF.application.loadView("view-StartSettingsView");
					}
				},
				onFocus: function () {
					gameSounds.playMoveCursorSound();
					//Animates button state accordingly
					if (game.inPlay) {
						view.elements.backButton.animate({
							backgroundImage: 'Images/Start/Menu_on.png',
							duration: animateLength
						});
					} else {
						view.elements.backButton.animate({
							backgroundImage: 'Images/Start/Back_on.png',
							duration: animateLength
						});
					}
				},
				onBlur: function () {
					//Animates button state accordingly
					if (game.inPlay) {
						view.elements.backButton.animate({
							backgroundImage: 'Images/Start/Menu_off.png',
							duration: animateLength
						});
					} else {
						view.elements.backButton.animate({
							backgroundImage: 'Images/Start/Back_off.png',
							duration: animateLength
						});
					}
				}
			}
		}).appendTo(this);
		//Creates a button component without any default styling
		//Styled from Start Image Assets Folder
		this.elements.centreButton = new MAF.element.Button({
			styles:{
				width: 133,
				height: 81,
				backgroundImage: 'Images/Start/Centre_off.png',
				hOffset: this.elements.backButton.outerWidth + 7,
				vOffset: this.elements.readyButton.outerHeight + 7
			},
			events:{
				onFocus: function () {
					//Animates button state and plays game sound
					gameSounds.playMoveCursorSound();
					view.elements.centreButton.animate({
						backgroundImage: 'Images/Start/Centre_on.png',
						duration: animateLength
					});
				},
				onBlur: function () {
					//Animates button state and sets sound boolean
					gameSounds.playSound = true;
					view.elements.centreButton.animate({
						backgroundImage: 'Images/Start/Centre_off.png',
						duration: animateLength
					});
				}
			}
		}).appendTo(this);
		//Creates a button component without any default styling
		//Used for navigation and styled from Start Image Assets Folder
		this.elements.exitButton = new MAF.element.Button({
			styles:{
				width: 161,
				height: 81,
				backgroundImage: 'Images/Start/Exit_off.png',
				hOffset: this.elements.centreButton.outerWidth + 7,
				vOffset: this.elements.readyButton.outerHeight + 7
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
									//Alert to say Bye
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
						backgroundImage: 'Images/Start/Exit_on.png',
						duration: animateLength
					});
				},
				onBlur: function () {
					//Animates button state
					view.elements.exitButton.animate({
						backgroundImage: 'Images/Start/Exit_off.png',
						duration: animateLength
					});
				}
			}
		}).appendTo(this);
		//Creates a (disabled) button component without any default styling
		//Used for navigation and styled from Start Image Assets Folder
		this.elements.downButton = new MAF.element.Button({
			styles:{
				width: 117,
				height: 101,
				backgroundImage: 'Images/Start/Down_Neutral.png',
				hAlign: "center",
				vOffset: this.elements.centreButton.outerHeight + 7
			}
		}).appendTo(this).setDisabled(true);
	},
	//Called everytime the user visits the view
	updateView: function () {
		//boolean used so initial button focus does not trigger game sound
		gameSounds.playSound = false;
		this.elements.centreButton.focus();
		//If a game is in play, Back Button becomes a Menu Button
		if (game.inPlay) {
			this.elements.backButton.setStyles({backgroundImage: 'Images/Start/Menu_off.png'});
		} else {
			this.elements.backButton.setStyles({backgroundImage: 'Images/Start/Back_off.png'});
		}
	}
});