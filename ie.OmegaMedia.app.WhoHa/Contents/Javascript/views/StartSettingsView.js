/* Javascript View file: StartSettingsView.js
*  Authors: Vincent Redmond, Gary Reid
*  Desc: Sidebar windowed view displaying Game Settings Content 
*  Date : 2014/07/30
*/
var StartSettingsView = new MAF.Class({
	ClassName: 'StartSettingsView',

	Extends: MAF.system.SidebarView,

	initialize: function () {
		this.parent();
	},
	//View is loaded in the DOM tree, called once, when the view is created
	//Most elements are created and appended
	createView: function () {

		var view = this;
		//Creates base image component/element to hold background image
		this.elements.startSettingsBackground = new MAF.element.Image({
			src: 'Images/Settings/Difficulty_background.png',
			styles:{
				width: 600,
				height: 980,
				hAlign: "center"
			}
		}).appendTo(this);
		//Creates a button component without any default styling
		//Used for navigation and styled from Settings Image Assets Folder
		this.elements.bigKidsButton = new MAF.element.Button({
			styles:{				
				width: 117,
				height: 101,
				backgroundImage: 'Images/Settings/Bigkids_off.png',
				hAlign: "center",
				vOffset: 632
			},
			events:{
				onSelect: function () {
					//Sets Game Type and loads Start View
					gameSounds.playSelectButtonSound(2);
					game.setGameType("adult");
					MAF.application.loadView("view-StartView");
				},
				onFocus: function () {
					//Animates button state and plays game sound
					gameSounds.playMoveCursorSound();
					view.elements.bigKidsButton.animate({
						backgroundImage: 'Images/Settings/Bigkids_on.png',
						duration: animateLength
					});
				},
				onBlur: function () {
					//Animates button state
					view.elements.bigKidsButton.animate({
						backgroundImage: 'Images/Settings/Bigkids_off.png',
						duration: animateLength
					});
				}
			}
		}).appendTo(this);

		//Creates a (disabled) button component without any default styling
		//Used for navigation and styled from Settings Image Assets Folder
		this.elements.leftButton = new MAF.element.Button({
			styles:{
				width: 161,
				height: 81,
				backgroundImage: 'Images/Settings/Left_neutral.png',
				hOffset: 59.5,
				vOffset: this.elements.bigKidsButton.outerHeight + 7
			}
		}).appendTo(this).setDisabled(true);
		//Creates a button component without any default styling
		//Styled from Settings Image Assets Folder
		this.elements.centreButton = new MAF.element.Button({
			styles:{
				width: 133,
				height: 81,
				backgroundImage: 'Images/Settings/Centre_off.png',
				hOffset: this.elements.leftButton.outerWidth + 7,
				vOffset: this.elements.bigKidsButton.outerHeight + 7
			},
			events:{
				onFocus: function () {
					//Animates button state and plays game sound
					gameSounds.playMoveCursorSound();
					view.elements.centreButton.animate({
						backgroundImage: 'Images/Settings/Centre_on.png',
						duration: animateLength
					});
				},
				onBlur: function () {
					//Animates button state and sets sound boolean 
					gameSounds.playSound = true;
					view.elements.centreButton.animate({
						backgroundImage: 'Images/Settings/Centre_off.png',
						duration: animateLength
					});
				}
			}
		}).appendTo(this);
		//Creates a (disabled) button component without any default styling
		//Used for navigation and styled from Settings Image Assets Folder
		this.elements.RightButton = new MAF.element.Button({
			styles:{
				width: 161,
				height: 81,
				backgroundImage: 'Images/Settings/Right_neutral.png',
				hOffset: this.elements.centreButton.outerWidth + 7,
				vOffset: this.elements.bigKidsButton.outerHeight + 7
			}
		}).appendTo(this).setDisabled(true);
		//Creates a button component without any default styling
		//Used for navigation and styled from Settings Image Assets Folder
		this.elements.littleKidsButton = new MAF.element.Button({
			styles:{				
				width: 117,
				height: 101,
				backgroundImage: 'Images/Settings/Littlekids_off.png',	
				hAlign: "center",
				vOffset: this.elements.centreButton.outerHeight + 7
			},
			events:{
				onSelect: function () {
					//Sets Game Type and loads Start View
					gameSounds.playSelectButtonSound(2);
					game.setGameType("family");
					MAF.application.loadView("view-StartView");
				},
				onFocus: function () {
					//Animates button state and plays game sound
					gameSounds.playMoveCursorSound();
					view.elements.littleKidsButton.animate({
						backgroundImage: 'Images/Settings/Littlekids_on.png',
						duration: animateLength
					});
				},
				onBlur: function () {
					//Animates button state
					view.elements.littleKidsButton.animate({
						backgroundImage: 'Images/Settings/Littlekids_off.png',
						duration: animateLength
					});
				}
			}
		}).appendTo(this);
	},
	//Called everytime the user visits the view
	updateView: function () {
		//boolean used so initial button focus does not trigger game sound
		gameSounds.playSound = false;
		this.elements.centreButton.focus();	
	}
});