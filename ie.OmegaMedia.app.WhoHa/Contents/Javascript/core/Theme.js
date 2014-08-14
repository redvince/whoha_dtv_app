/* Core Javascript styling file: Theme.js
*  Author: Vincent Redmond
*  Desc: Contains the code to style game elements.  
*  Date : 2014/07/30
*/
//Add font used in game
Theme.Fonts.add('MrBubbleFont', 'Fonts/MrBubbleFont');

Theme.set({
	view:{
		styles: {
			fontFamily: 'MrBubbleFont'
		}
	},
	'dialog > .frame':{
		normal:{
			styles:{
				fontFamily: 'MrBubbleFont',
				fontSize: '50px',
				color: '#000000',
				backgroundColor: 'rgba(241, 241, 241, .85) !important'
			}
		},
		focused:{
			styles:{
				backgroundColor:'#000000 !important'
			}
		}
	},
	'dialog > .frame > .frame':{
		normal:{
			styles:{
				fontSize: '17px',
				backgroundColor:'#7ac943 !important'
			}
		},
		focused:{
			styles:{
				backgroundColor:'#fcee21 !important'
			}
		}
	},
	'dialog > .frame > .text':{
		styles:{
			borderBottom: '0 !important'
		}
	},
	'AboutBoxView .AboutBoxViewMetadataAuthorNote':{
		styles:{
			//vOffset: '350px !important',
			//hOffset: '130px !important'
		}
	}
});