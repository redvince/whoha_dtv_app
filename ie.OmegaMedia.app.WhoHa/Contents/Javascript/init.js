include('Javascript/views/MenuView.js');
include('Javascript/views/StartView.js');
include('Javascript/views/StartSettingsView.js');
include('Javascript/views/HowView.js');
include('Javascript/views/AboutView.js');
include('Javascript/views/GameView.js');
include('Javascript/views/SummaryView.js');
include('Javascript/views/WinnersView.js');
include('Javascript/views/CreditsView.js');

include('Javascript/core/Theme.js');
include('Javascript/core/SoundBank.js');
include('Javascript/core/Game.js');
include('Javascript/core/Team.js');
include('Javascript/core/GameTimer.js');
include('Javascript/core/ImageBank.js');

MAF.application.init({
	views: [
		{ id: 'view-MenuView', viewClass: MenuView },
		{ id: 'view-StartView', viewClass: StartView },
		{ id: 'view-StartSettingsView', viewClass: StartSettingsView },
		{ id: 'view-HowView', viewClass: HowView },
		{ id: 'view-GameView', viewClass: GameView },
		{ id: 'view-AboutView', viewClass: AboutView },
		{ id: 'view-SummaryView', viewClass: SummaryView },
		{ id: 'view-WinnersView', viewClass: WinnersView },
		{ id: 'view-CreditsView', viewClass: CreditsView },
		{ id: 'view-About', viewClass: MAF.views.AboutBox }
	],
	defaultViewId: 'view-MenuView',
	settingsViewId: 'view-About'
});