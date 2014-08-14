/* Javascript View file: AboutView.js
*  Authors: Vincent Redmond, Gary Reid
*  Desc: Sidebar windowed view displaying content about Team Omega 
*  Date : 2014/07/30
*/
var AboutView = new MAF.Class({
	ClassName: 'AboutView',

	Extends: MAF.system.SidebarView,

	initialize: function () {
		this.parent();
	},
	//View is loaded in the DOM tree, called once, when the view is created
	//Most elements are created and appended
	createView: function () {
		var view = this;
		//Creates base image component/element to hold background image
		this.elements.aboutBackground = new MAF.element.Image({
			src: 'Images/About/About_background.png',
			styles:{
				width: 600,
				height: 980,
				hAlign: "center"
			}
		}).appendTo(this);
		//Creates a (disabled) button component without any default styling
		//Used for navigation and styled from About Image Assets Folder
		this.elements.upButton = new MAF.element.Button({
			styles:{
				width: 117,
				height: 101,
				backgroundImage: 'Images/About/Up_Neutral.png',
				hAlign: "center",
				vOffset: 632
			}
		}).appendTo(this).setDisabled(true);
		//Creates a button component without any default styling
		//Used for navigation and styled from About Image Assets Folder
		this.elements.backButton = new MAF.element.Button({
			styles:{
				width: 161,
				height: 81,
				backgroundImage: 'Images/About/Back_off.png',
				hOffset: 59.5,
				vOffset: this.elements.upButton.outerHeight + 7
			},
			events:{
				onSelect: function () {
					//Loads Menu when selected
					MAF.application.loadView("view-MenuView");
				},
				onFocus: function () {
					//Animates button state and plays game sound
					gameSounds.playMoveCursorSound();
					view.elements.backButton.animate({
						backgroundImage: 'Images/About/Back_on.png',
						duration: animateLength
					});
				},
				onBlur: function () {
					//Animates button state
					view.elements.backButton.animate({
						backgroundImage: 'Images/About/Back_off.png',
						duration: animateLength
					});
				}
			}
		}).appendTo(this);
		//Creates a button component without any default styling
		//Styled from About Image Assets Folder
		this.elements.centreButton = new MAF.element.Button({
			styles:{
				width: 133,
				height: 81,
				backgroundImage: 'Images/About/Centre_off.png',
				hOffset: this.elements.backButton.outerWidth + 7,
				vOffset: this.elements.upButton.outerHeight + 7
			},
			events:{
				onFocus: function () {
					//Animates button state and plays game sound
					gameSounds.playMoveCursorSound();
					view.elements.centreButton.animate({
						backgroundImage: 'Images/About/Centre_on.png',
						duration: animateLength
					});
				},
				onBlur: function () {
					//Animates button state and sets sound boolean 
					gameSounds.playSound = true;
					view.elements.centreButton.animate({
						backgroundImage: 'Images/About/Centre_off.png',
						duration: animateLength
					});
				}
			}
		}).appendTo(this);
		//Creates a button component without any default styling
		//Used for navigation and styled from About Image Assets Folder
		this.elements.startButton = new MAF.element.Button({
			styles:{
				width: 161,
				height: 81,
				backgroundImage: 'Images/About/Start_off.png',
				hOffset: this.elements.centreButton.outerWidth + 7,
				vOffset: this.elements.upButton.outerHeight + 7
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
						backgroundImage: 'Images/About/Start_on.png',
						duration: animateLength
					});
				},
				onBlur: function () {
					//Animates button state 
					view.elements.startButton.animate({
						backgroundImage: 'Images/About/Start_off.png',
						duration: animateLength
					});				
				}
			}

		}).appendTo(this);
		//Creates a (disabled) button component without any default styling
		//Used for navigation and styled from About Image Assets Folder
		this.elements.downButton = new MAF.element.Button({
			styles:{
				width: 117,
				height: 101,
				backgroundImage: 'Images/About/Down_Neutral.png',
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
	}
});