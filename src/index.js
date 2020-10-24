
require('normalize.css/normalize.css');
require('./styles/index.scss');

const {simple_roll, start} = require('./script/main.js');
const NavManager = require('./script/NavManager');

document.addEventListener("DOMContentLoaded", () => {
	for (let dice of [4, 6, 8, 10, 12, 20]) {
		setBtnListener(dice);
	}

	const diceButtons = document.querySelector('.dice-buttons');

	new NavManager({
		navPages: [
			{
				btn: document.getElementById('dice-roller-btn'),
				pageEl: document.querySelector('.dice-roller')
			},
			{
				btn: document.getElementById('multi-roller-btn'),
				pageEl: document.querySelector('.multi-roller')
			}
		],
		onPageSwitched: pageIndex => {
			diceButtons.style.display = (pageIndex === 0) ? "block" : "none";
		}
	});

	document.getElementById("roll-all-btn").addEventListener("click", start);

});


function setBtnListener(dice) {
	const btn = document.getElementById(`dice-${dice}`);
	if (btn) {
		btn.addEventListener('click', () => {
			simple_roll(dice);
		});
	}
}