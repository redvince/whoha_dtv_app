/* Javascript View file: CreditsView.js
*  Authors: Vincent Redmond
*  Desc: Sidebar windowed view displaying Image Credits Content 
*  Date : 2014/07/30
*/
var CreditsView = new MAF.Class({
	ClassName: 'CreditsView',

	Extends: MAF.system.SidebarView,

	initialize: function () {
		this.parent();
	},
	//View is loaded in the DOM tree, called once, when the view is created
	//Image Credit attribute elements are created and appended
	createView: function () {
		//Creates default back button to Game View
		var backButton = new MAF.control.BackButton({
			events:{
				onSelect: function(){
					gameSounds.playSelectButtonSound(1);
				}
			}
		}).appendTo(this);

		var titleHeader = new MAF.control.Header({
			label: 'Title',
			styles: {
				vOffset: backButton.outerHeight + 1
			}
		}).appendTo(this);

		this.elements.titleText = new MAF.element.TextField({
			styles: {
				vOffset: titleHeader.outerHeight + 1,
				wrap: true,
				anchorStyle: 'justify',
				hOffset: 20,
				width: this.width - 40,
				height: 100
			}
		}).appendTo(this);

		var authorHeader = new MAF.control.Header({
			label: 'Author',
			styles: {
				vOffset: this.elements.titleText.outerHeight + 1
			}
		}).appendTo(this);

		this.elements.authorText = new MAF.element.TextField({
			styles: {
				color: '#ddd',
				vOffset: authorHeader.outerHeight + 1,
				wrap: true,
				anchorStyle: 'justify',
				hOffset: 20,
				width: this.width - 40,
				height: 100
			}
		}).appendTo(this);

		var sourceHeader = new MAF.control.Header({
			label: 'Source',
			styles: {
				vOffset: this.elements.authorText.outerHeight + 1
			}
		}).appendTo(this);

		this.elements.sourceText = new MAF.element.TextField({
			styles: {
				color: '#ddd',
				vOffset: sourceHeader.outerHeight + 1,
				wrap: true,
				anchorStyle: 'justify',
				hOffset: 20,
				width: this.width - 40,
				height: 100
			}
		}).appendTo(this);

		var licenseHeader = new MAF.control.Header({
			label: 'License',
			styles: {
				vOffset: this.elements.sourceText.outerHeight + 1
			}
		}).appendTo(this);

		this.elements.licenseText = new MAF.element.TextField({
			styles: {
				color: '#ddd',
				vOffset: licenseHeader.outerHeight + 1,
				wrap: true,
				anchorStyle: 'justify',
				hOffset: 20,
				width: this.width - 40,
				height: 100
			}
		}).appendTo(this);

		var licenseUrlHeader = new MAF.control.Header({
			label: 'License URL',
			styles: {
				vOffset: this.elements.licenseText.outerHeight + 1
			}
		}).appendTo(this);

		this.elements.licenseUrlText = new MAF.element.TextField({
			styles: {
				color: '#ddd',
				vOffset: licenseUrlHeader.outerHeight + 1,
				wrap: true,
				anchorStyle: 'justify',
				hOffset: 20,
				width: this.width - 40,
				height: 100
			}
		}).appendTo(this);

		var modHeader = new MAF.control.Header({
			label: 'Modifications',
			styles: {
				vOffset: this.elements.licenseUrlText.outerHeight + 1
			}
		}).appendTo(this);

		this.elements.modText = new MAF.element.TextField({
			styles: {
				color: '#ddd',
				vOffset: modHeader.outerHeight + 1,
				wrap: true,
				anchorStyle: 'justify',
				hOffset: 20,
				width: this.width - 40
				//height: 100
			}
		}).appendTo(this);
	},
	//Called everytime the user visits the view
	updateView: function () {
		//Dynamically injects Image attributes depending on game type
		if (game.adultGame){
			this.elements.titleText.setText(gameImages.adultImages[gameImages.adultIndex-1].imageTitle);
			this.elements.authorText.setText(gameImages.adultImages[gameImages.adultIndex-1].author);
			this.elements.sourceText.setText(gameImages.adultImages[gameImages.adultIndex-1].location);
			this.elements.licenseText.setText(gameImages.adultImages[gameImages.adultIndex-1].license);
			this.elements.licenseUrlText.setText(gameImages.adultImages[gameImages.adultIndex-1].licenseUrl);
			this.elements.modText.setText(gameImages.adultImages[gameImages.adultIndex-1].modifications);
		}
		else{
			this.elements.titleText.setText(gameImages.familyImages[gameImages.familyIndex-1].imageTitle);
			this.elements.authorText.setText(gameImages.familyImages[gameImages.familyIndex-1].author);
			this.elements.sourceText.setText(gameImages.familyImages[gameImages.familyIndex-1].location);
			this.elements.licenseText.setText(gameImages.familyImages[gameImages.familyIndex-1].license);
			this.elements.licenseUrlText.setText(gameImages.familyImages[gameImages.familyIndex-1].licenseUrl);
			this.elements.modText.setText(gameImages.familyImages[gameImages.familyIndex-1].modifications);
		}
	}
});