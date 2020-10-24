class NavManager {
	constructor(props) {
		this.props = props;
		if (!this.props.navPages) {
			console.error('No navPages property provided!');
		}
		if (!this.props.onPageSwitched) {
			console.error('No onPageSwitched property provided!');
		}
		this.init();
	}

	init() {
		const pages = this.props.navPages;
		for (let i = 0; i < pages.length; i++) {
			pages[i].btn.addEventListener('click', () => {
				this.switchPage(i);
			});
		}

		this.hideAllPages();
		this.switchPage(0);
	}

	switchPage(pageIndex) {
		const pages = this.props.navPages;
		this.hideAllPages();
		pages[pageIndex].pageEl.style.display = "block";

		this.props.onPageSwitched(pageIndex);
	}

	hideAllPages() {
		const pages = this.props.navPages;
		for (let page of pages) {
			page.pageEl.style.display = "none";
		}
	}
}

module.exports = NavManager;