const searchButton = document.getElementById('search-button');
const leftSection = document.getElementsByClassName('left-section');
const middleSection = document.getElementsByClassName('middle-section');
const middleVoiceButton = document.querySelector('.voice-search-btn');
const rightSectionButtons = document.querySelectorAll('.right-section button');

let isSearchClicked = false;

searchButton.addEventListener('click', () => {
	isSearchClicked = true;

	leftSection[0].style.display = 'none';
	middleSection[0].style.display = 'flex';
	middleVoiceButton.style.display = 'none';
	rightSectionButtons.forEach((button) => {
		if (button.id !== 'voice-search-button') {
			button.style.display = 'none';
		}
	});
});

// 화면 크기 감지 및 상태 조정
function handleResize() {
	const screen428 = window.matchMedia('(max-width: 428px)').matches;
	const screen656 = window.matchMedia(
		'(min-width: 429px) and (max-width: 656px)'
	).matches;
	const screen657 = window.matchMedia('(min-width: 657px)').matches;

	if (screen657) {
		isSearchClicked = false;
	}

	if (isSearchClicked) {
		if (screen428) {
			rightSectionButtons.forEach((button) => {
				button.style.display = 'none';
			});
		} else if (screen656) {
			rightSectionButtons.forEach((button) => {
				if (button.id === 'voice-search-button') {
					button.style.display = 'flex';
				} else {
					button.style.display = 'none';
				}
			});
		}
		return;
	}
	console.log(screen428, screen656, screen657);
	if (screen428) {
		leftSection[0].style.display = 'flex';
		middleSection[0].style.display = 'none';
		middleVoiceButton.style.display = 'flex';
		rightSectionButtons.forEach((button) => {
			if (
				button.id === 'voice-search-button' ||
				button.id === 'notification-button'
			) {
				button.style.display = 'none';
			} else {
				button.style.display = 'flex';
			}
		});
	} else if (screen656) {
		leftSection[0].style.display = 'flex';
		middleSection[0].style.display = 'none';
		middleVoiceButton.style.display = 'flex';
		rightSectionButtons.forEach((button) => {
			button.style.display = 'flex';
		});
	} else if (screen657) {
		leftSection[0].style.display = 'flex';
		middleSection[0].style.display = 'flex';
		middleVoiceButton.style.display = 'flex';
		rightSectionButtons.forEach((button) => {
			if (
				button.id === 'search-button' ||
				button.id === 'voice-search-button'
			) {
				button.style.display = 'none';
			} else {
				button.style.display = 'flex';
			}
		});
	}
}

// 초기 화면 크기 확인 및 설정
handleResize();

// 화면 크기 변경 시 이벤트 추가
window.addEventListener('resize', handleResize);
