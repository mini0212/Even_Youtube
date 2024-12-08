// 크기에 따른 버튼 표시
const searchButton = document.getElementById("search-button");
const leftSection = document.getElementsByClassName("left-section");
const middleSection = document.getElementsByClassName("middle-section");
const middleVoiceButton = document.querySelector(".voice-search-btn");
const rightSectionButtons = document.querySelectorAll(".right-section button");
const scrollContainer = document.querySelector(".navbar-menu");
const leftButton = document.querySelector(".scroll-btn.left");
const rightButton = document.querySelector(".scroll-btn.right");
const searchBackButton = document.getElementById("search-bar__back-button");

let isSearchClicked = false;

searchButton.addEventListener("click", () => {
	isSearchClicked = true;
	handleResize();
	leftSection[0].style.display = "none";
	middleSection[0].style.display = "flex";
	middleVoiceButton.style.display = "none";
	rightSectionButtons.forEach((button) => {
		if (button.id !== "voice-search-button") {
			button.style.display = "none";
		}
	});
});

searchBackButton.addEventListener("click", () => {
	isSearchClicked = false;
	handleResize();
});

// 화면 크기 감지 및 상태 조정
function handleResize() {
	const screen428 = window.matchMedia("(max-width: 428px)").matches;
	const screen656 = window.matchMedia(
		"(min-width: 429px) and (max-width: 656px)"
	).matches;
	const screen657 = window.matchMedia("(min-width: 657px)").matches;

	if (screen657) {
		isSearchClicked = false;
		searchBackButton.style.display = "none";
	}

	if (isSearchClicked) {
		searchBackButton.style.display = "inline";
		if (screen428) {
			handleButtonsHidden([]);
		} else if (screen656) {
			handleButtonsHidden(["voice-search-button"]);
		}
		return;
	}

	if (screen428) {
		leftSection[0].style.display = "flex";
		middleSection[0].style.display = "none";
		middleVoiceButton.style.display = "flex";
		handleButtonsHidden([
			"search-button",
			"upload-button",
			"user-profile-button",
		]);
	} else if (screen656) {
		leftSection[0].style.display = "flex";
		middleSection[0].style.display = "none";
		middleVoiceButton.style.display = "flex";
		handleButtonsHidden([
			"search-button",
			"voice-search-button",
			"upload-button",
			"notification-button",
			"user-profile-button",
		]);
	} else if (screen657) {
		leftSection[0].style.display = "flex";
		middleSection[0].style.display = "flex";
		middleVoiceButton.style.display = "flex";
		handleButtonsHidden([
			"upload-button",
			"notification-button",
			"user-profile-button",
		]);
	}
}

// 보여지는 버튼 핸들링
function handleButtonsHidden(buttonsID) {
	rightSectionButtons.forEach((button) => {
		if (buttonsID.includes(button.id)) {
			button.style.display = "flex";
		} else {
			button.style.display = "none";
		}
	});
}

// 초기 화면 크기 확인 및 설정
handleResize();

// 화면 크기 변경 시 이벤트 추가
window.addEventListener("resize", handleResize);

// 헤더 외부 클릭시 이벤트
const header = document.querySelector(".header");
document.addEventListener("click", (event) => {
	if (!header.contains(event.target)) {
		isSearchClicked = false;
		handleResize();
	}
});

// search-button 클릭 이벤트
const searchBarInput = document.getElementById("search-bar__input");

// 포커스 이벤트 처리
searchButton.addEventListener("click", () => {
	searchBarInput.focus();
});

// 엔터시 검색
const search = document.getElementById("search-btn");
searchBarInput.addEventListener("keydown", (event) => {
	if (event.key === "Enter") {
		search.click();
	}
})

// nav 클릭시 이벤트
const navbarItems = document.querySelectorAll(".navbar-item");

navbarItems.forEach((item) => {
	item.addEventListener("click", () => {
		navbarItems.forEach((item) => item.classList.remove("selected"));
		item.classList.add("selected");
	});
});

// scroll 버튼 이벤트
const scrollAmount = 200;

// Scroll 왼쪽 클릭시
leftButton.addEventListener("click", () => {
	scrollContainer.scrollBy({
		left: -scrollAmount,
	});
});

// Scroll 오른쪽 클릭시
rightButton.addEventListener("click", () => {
	scrollContainer.scrollBy({
		left: scrollAmount,
	});
});
