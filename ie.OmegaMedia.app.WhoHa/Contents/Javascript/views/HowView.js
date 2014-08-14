/* Javascript View file: HowView.js
*  Authors: Vincent Redmond, Gary Reid
*  Desc: Sidebar windowed view displaying How To Play Content 
*  Date : 2014/07/30
*/
var HowView = new MAF.Class({
	ClassName: 'HowView',

	Extends: MAF.system.SidebarView,

	initialize: function () {
		this.parent();
	},
	//View is loaded in the DOM tree, called once, when the view is created
	//Most elements are created and appended
	createView: function () {
		var view = this;
		//first step of instructions
		this.step = 1;
		//Creates empty space base component/element to hold background image
		this.elements.howToBackground = new MAF.control.EmptySpace({
			styles:{
				width: 600,
				height: 980,
				backgroundImage: 'Images/HowTo/Howto_background1.png',
				hAlign: "center"
			}
		}).appendTo(this);
	
		//Creates a button component without any default styling
		//Used for stepping through instructions and styled from HowTo Image Assets Folder
		this.elements.stepButton = new MAF.element.Button({
			styles:{
				width: 117,
				height: 101,
				backgroundImage: 'Images/HowTo/Step2_off.png',
				hAlign: "center",
				vOffset: 632
			},
			events:{
				onSelect: function () {
					//enable step down button
					//updates step buttons and background image instructions accordingly
					view.elements.stepDownButton.setDisabled(false);
					gameSounds.playSelectButtonSound(3);
					switch (view.step) {
						case 1:
							view.elements.howToBackground.animate({
								backgroundImage: 'Images/HowTo/Howto_background2.png',
								duration: animateLength
							});
							view.elements.stepButton.animate({
								backgroundImage: 'Images/HowTo/Step3_off.png',
								duration: animateLength
							});
							view.elements.stepDownButton.animate({
								backgroundImage: 'Images/HowTo/Step1_down_off.png',
								duration: animateLength
							});
							view.step++;
							break;
						case 2:
							view.elements.stepButton.setDisabled(true);
							view.elements.howToBackground.animate({
								backgroundImage: 'Images/HowTo/Howto_background3.png',
								duration: animateLength
							});
							view.elements.stepButton.animate({
								backgroundImage: 'Images/HowTo/Up_Neutral.png',
								duration: animateLength
							});
							view.elements.stepDownButton.animate({
								backgroundImage: 'Images/HowTo/Step2_down_off.png',
								duration: animateLength
							});
							view.step++;
							break;
						default:
							break;
					}
					//boolean used so button focus does not trigger game sound
					gameSounds.playSound = false;
					view.elements.centreButton.focus();
				},
				onFocus: function () {
					//Animates button state according to step and plays game sound
					gameSounds.playMoveCursorSound();
					switch (view.step) {
						case 1:
							view.elements.stepButton.animate({
								backgroundImage: 'Images/HowTo/Step2_on.png',
								duration: animateLength
							});
							break;
						case 2:
							view.elements.stepButton.animate({
								backgroundImage: 'Images/HowTo/Step3_on.png',
								duration: animateLength
							});
							break;
						case 3:
							view.elements.stepButton.animate({
								backgroundImage: 'Images/HowTo/Up_on.png',
								duration: animateLength
							});
							break;
						default:
							break;
					}					
				},
				onBlur: function () {
					//Animates button state according to step
					switch (view.step) {
						case 1:
							view.elements.stepButton.animate({
								backgroundImage: 'Images/HowTo/Step2_off.png',
								duration: animateLength
							});
							break;
						case 2:
							view.elements.stepButton.animate({
								backgroundImage: 'Images/HowTo/Step3_off.png',
								duration: animateLength
							});
							break;
						case 3:
							view.elements.stepButton.animate({
								backgroundImage: 'Images/HowTo/Up_Neutral.png',
								duration: animateLength
							});
							break;
						default:
							break;
					}
				}
			}
		}).appendTo(this);
		//Creates a button component without any default styling
		//Used for navigation and styled from HowTo Image Assets Folder
		this.elements.backButton = new MAF.element.Button({
			styles:{
				width: 161,
				height: 81,
				backgroundImage: 'Images/HowTo/Back_off.png',
				hOffset: 59.5,
				vOffset: this.elements.stepButton.outerHeight + 7
			},
			events:{
				onSelect: function () {
					//Loads Main Menu
					MAF.application.loadView("view-MenuView");
				},
				onFocus: function () {
					//Animates button and plays game sound
					gameSounds.playMoveCursorSound();
					view.elements.backButton.animate({
						backgroundImage: 'Images/HowTo/Back_on.png',
						duration: animateLength
					});
				},
				onBlur: function () {
					//Animates button and plays game sound
					view.elements.backButton.animate({
						backgroundImage: 'Images/HowTo/Back_off.png',
						duration: animateLength
					});
				}
			}
		}).appendTo(this);
		//Creates a button component without any default styling
		//Styled from HowTo Image Assets Folder
		this.elements.centreButton = new MAF.element.Button({
			styles:{
				width: 133,
				height: 81,
				backgroundImage: 'Images/HowTo/Centre_off.png',
				vOffset: this.elements.stepButton.outerHeight + 7,
				hOffset: this.elements.backButton.outerWidth + 7
			},
			events:{
				onFocus: function () {
					//Animates button state and plays game sound
					gameSounds.playMoveCursorSound();
					view.elements.centreButton.animate({
						backgroundImage: 'Images/HowTo/Centre_on.png',
						duration: animateLength
					});
				},
				onBlur: function () {
					//Animates button state and sets sound boolean 
					gameSounds.playSound = true;
					view.elements.centreButton.animate({
						backgroundImage: 'Images/HowTo/Centre_off.png',
						duration: animateLength
					});
				}
			}
		}).appendTo(this);
		//Creates a button component without any default styling
		//Used for navigation and styled from HowTo Image Assets Folder
		this.elements.startButton = new MAF.element.Button({
			styles:{
				width: 161,
				height: 81,
				backgroundImage: 'Images/HowTo/Start_off.png',
				vOffset: this.elements.stepButton.outerHeight + 7,
				hOffset: this.elements.centreButton.outerWidth + 7
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
						backgroundImage: 'Images/HowTo/Start_on.png',
						duration: animateLength
					});
				},
				onBlur: function () {
					//Animates button state
					view.elements.startButton.animate({
						backgroundImage: 'Images/HowTo/Start_off.png',
						duration: animateLength
					});
				}
			}
		}).appendTo(this);
		//Creates a (disabled) button component without any default styling
		//Used for stepping through instructions and styled from HowTo Image Assets Folder
		this.elements.stepDownButton = new MAF.element.Button({
			styles:{
				width: 117,
				height: 101,
				backgroundImage: 'Images/HowTo/Down_Neutral.png',
				hAlign: 'center',
				vOffset: this.elements.centreButton.outerHeight + 7
			},
			events:{
				onSelect: function () {
					//enable step button
					//updates step buttons and background image instructions accordingly
					gameSounds.playSelectButtonSound(3);
					view.elements.stepButton.setDisabled(false);
					switch (view.step) {
						case 2:
							view.elements.stepDownButton.setDisabled(true);
							view.elements.howToBackground.animate({
								backgroundImage: 'Images/HowTo/Howto_background1.png',
								duration: animateLength
							});
							view.elements.stepButton.animate({
								backgroundImage: 'Images/HowTo/Step2_off.png',
								duration: animateLength
							});
							view.elements.stepDownButton.animate({
								backgroundImage: 'Images/HowTo/Down_Neutral.png',
								duration: animateLength
							});
							view.step--;
							break;
						case 3:
							view.elements.howToBackground.animate({
								backgroundImage: 'Images/HowTo/Howto_background2.png',
								duration: animateLength
							});
							view.elements.stepButton.animate({
								backgroundImage: 'Images/HowTo/Step3_off.png',
								duration: animateLength
							});
							view.elements.stepDownButton.animate({
								backgroundImage: 'Images/HowTo/Step1_down_off.png',
								duration: animateLength
							});
							view.step--;
							break;
						default:
							break;
					}
					//boolean used so button focus does not trigger game sound
					gameSounds.playSound = false;
					view.elements.centreButton.focus();
				},
				onFocus: function () {
					//Animates button state according to step and plays game sound
					gameSounds.playMoveCursorSound();
					switch (view.step) {
						case 1:
							view.elements.stepDownButton.animate({
								backgroundImage: 'Images/HowTo/Down_on.png',
								duration: animateLength
							});
							break;
						case 2:
							view.elements.stepDownButton.animate({
								backgroundImage: 'Images/HowTo/Step1_down_on.png',
								duration: animateLength
							});
							break;
						case 3:
							view.elements.stepDownButton.animate({
								backgroundImage: 'Images/HowTo/Step2_down_on.png',
								duration: animateLength
							});
							break;
						default:
								break;
					}
				},
				onBlur: function () {
					//Animates button state according to step
					switch (view.step) {
						case 1:
							view.elements.stepDownButton.animate({
								backgroundImage: 'Images/HowTo/Down_Neutral.png',
								duration: animateLength
							});
							break;
						case 2:
							view.elements.stepDownButton.animate({
								backgroundImage: 'Images/HowTo/Step1_down_off.png',
								duration: animateLength
							});
							break;
						case 3:
							view.elements.stepDownButton.animate({
								backgroundImage: 'Images/HowTo/Step2_down_off.png',
								duration: animateLength
							});
							break;
						default:
							break;
					}
				}
			}
		}).appendTo(this).setDisabled(true);
	},
	//Called everytime the user visits the view
	updateView: function () {
		//Set up default button states when view is visited
		this.elements.stepDownButton.setDisabled(true);
		this.elements.stepButton.setDisabled(false);
		this.elements.howToBackground.animate({
			backgroundImage: 'Images/HowTo/Howto_background1.png',
			duration: animateLength
		});
		this.elements.stepButton.animate({
			backgroundImage: 'Images/HowTo/Step2_off.png',
			duration: animateLength
		});
		this.elements.stepDownButton.animate({
			backgroundImage: 'Images/HowTo/Down_Neutral.png',
			duration: animateLength
		});
		//default step 1
		this.step = 1;
		//boolean used so initial button focus does not trigger game sound
		gameSounds.playSound = false;
		this.elements.centreButton.focus();	
	}
});