/* Core Javascript Prototype file: ImageBank.js
*  Author: Vincent Redmond
*  Desc: Contains the code to encapsulate WHo?Ha Game Image logic and make requests
*  to Server Side Web API
*  Date : 2014/07/30
*/
//Initialise Image Bank instance properties
function ImageBank () {
	//Web API address, change to where you decide to host and add endpoint "/whohaWebService/image/get_big_kids_images"
	this.adultServiceUrl = 'http://upc.webelevate.net/service/whohaWebService/image/get_big_kids_images';
	//Web API address, change to where you decide to host and add endpoint "/whohaWebService/image/get_kids_images"
	this.kidsServiceUrl = 'http://upc.webelevate.net/service/whohaWebService/image/get_kids_images';
	//Change to where you decide to host game images folder
	this.imageUrl = 'http://upc.webelevate.net/vinny/gameImages/';
	this.adultIndex = 0;
	this.familyIndex = 0;
	this.adultSize;
	this.familySize;
	this.adultImages;
	this.familyImages;
}
//Overwrite prototype/constructor and define all methods
//Function names self explanatory
ImageBank.prototype = {
	constructor: ImageBank,
	handleError:function () {
		new MAF.dialogs.Alert({
			title: 'Error...',
			message: 'Are you connected to the Web?',
			buttons: [
				{ label: 'Restart Game',
					callback: function () {
						MAF.application.exit();
					}
				}								
			]
		}).show();
	},
	getAdultImages:function () {
		var self = this;
		new Request({
			url: this.adultServiceUrl,
			onSuccess: function (json) {
				self.adultImages = JSON.parse(json);
				//shuffle array of images				
				self.shuffle(self.adultImages);
			},
			onFailure: function (error) {
				console.log('failure', error);
				self.handleError();
			},
			onError: function (error) {
				console.log('error', error);
				self.handleError();
			}
		}).send();
	},
	getFamilyImages:function () {
		var self = this;
		new Request({
			url: this.kidsServiceUrl,
			onSuccess: function (json) {
				self.familyImages = JSON.parse(json);
				self.shuffle(self.familyImages);				
			},
			onFailure: function (error) {
				console.log('failure', error);
				self.handleError();
			},
			onError: function (error) {
				console.log('error', error);
				self.handleError();
			}
		}).send();
	},
	getNextAdultImage:function () {
		//use index to return next image file name
		if (this.adultIndex < this.adultImages.length) {
			this.adultIndex++;
			return this.imageUrl + this.adultImages[this.adultIndex-1].imagePath;
		} else {
			//end of images reached, reset index
			this.adultIndex = 1;
			return this.imageUrl + this.adultImages[this.adultIndex-1].imagePath;
		}		
	},
	getNextFamilyImage:function () {
		if (this.familyIndex < this.familyImages.length) {
			this.familyIndex++;
			return this.imageUrl + this.familyImages[this.familyIndex-1].imagePath;
		} else {
			this.familyIndex = 1;
			return this.imageUrl + this.familyImages[this.familyIndex-1].imagePath;
		}
	},
	//Fisher-Yates Shuffle
	shuffle:function (array) {
		var currentIndex = array.length, temporaryValue, randomIndex;
		// While there remain elements to shuffle
		while (0 !== currentIndex) {
			// Pick a remaining element
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex -= 1;
			// And swap it with the current element
			temporaryValue = array[currentIndex];
			array[currentIndex] = array[randomIndex];
			array[randomIndex] = temporaryValue;
		}
		return array;
	}
};
//Create instance of Image Bank Object
var gameImages = new ImageBank();