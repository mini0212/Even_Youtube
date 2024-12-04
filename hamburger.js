const headerMenuButton = document.getElementById('header-menu');
const evenSidebar = document.querySelector('.even-sidebar');
const evenSidebarHeader = document.querySelector('.even-sidebar-header');
const sideHeaderMenuButton = document.getElementById('side-header-menu');
const evenMiniSidebar = document.querySelector('.even-mini-sidebar');
const mainContainer = document.querySelector('main');


// 사이드바 위에 마우스가 있을/없을 때 스크롤 비활성화/활성화
evenSidebar.addEventListener('mouseenter', () => {
	evenSidebar.style.overflowY = 'auto'; 
	evenSidebar.style.overflowX = 'hidden';
});

evenSidebar.addEventListener('mouseleave', () => {
	evenSidebar.style.overflowY = 'hidden'; 
	evenSidebar.style.overflowX = 'hidden';
});


// 화면의 가로 너비가 1312px 이하인지 확인하는 미디어 쿼리
const mediaQueryLarge = window.matchMedia('(min-width: 1313px)');
const mediaQueryMedium = window.matchMedia('(min-width: 792px) and (max-width: 1312px)');

let sidebarState = 'large'; // 초기 상태: 'large', 'mini', 'hidden'

// 초기 상태 설정
function initializeSidebar() {
    if (mediaQueryLarge.matches) {
        // 큰 화면일 때 초기 상태 설정
        sidebarState = 'large';
        evenSidebar.style.display = 'block';
				evenSidebar.style.left = '0';
        evenMiniSidebar.style.display = 'none';
        mainContainer.style.marginLeft = '240px';
				evenSidebar.classList.remove('overlay');
    } else if (mediaQueryMedium.matches) {
        // 중간 화면일 때 초기 상태 설정
        sidebarState = 'mini';
        evenSidebar.style.display = 'none';
        evenMiniSidebar.style.display = 'flex';
        mainContainer.style.marginLeft = '72px';
				evenSidebar.classList.remove('overlay');
    } else {
        // 작은 화면일 때 초기 상태 설정
        sidebarState = 'hidden';
        evenSidebar.style.display = 'none';
        evenMiniSidebar.style.display = 'none';
        mainContainer.style.marginLeft = '0';
				evenSidebar.classList.remove('overlay');
    }
		headerMenuButton.classList.remove('side-header__effect-round-button');
}

initializeSidebar();


// 미디어 쿼리 변경 시에도 초기화
mediaQueryLarge.addListener(() => {
	initializeSidebar();
});
mediaQueryMedium.addListener(() => {
	initializeSidebar();
});

function handleSidebarToggle() {
    if (mediaQueryLarge.matches) {
        // 큰 화면 (1313px 이상)에서 상태 전환
        if (sidebarState === 'large') {
            // 큰 사이드바에서 미니 사이드바로 변경
            evenSidebar.style.display = 'none';
            evenMiniSidebar.style.display = 'flex';
            mainContainer.style.marginLeft = '72px';
            sidebarState = 'mini';
        } else {
            // 미니 사이드바에서 큰 사이드바로 변경
            evenMiniSidebar.style.display = 'none';
            evenSidebar.style.display = 'block';
						evenSidebar.style.left = '0';
            // evenSidebar.style.position = 'relative';
            evenSidebar.style.overflowX = 'hidden';
            mainContainer.style.marginLeft = '240px';
						evenSidebar.classList.remove('overlay');
            sidebarState = 'large';
        }
				headerMenuButton.classList.remove('side-header__effect-round-button');
    } else {
			// 작은 상태 (1312px 이하)에서 상태 전환
			if (sidebarState === 'mini' || sidebarState === 'hidden') {
					// 미니 또는 숨김 상태에서 큰 사이드바 오버레이로 표시
					evenSidebar.style.display = 'block';
					evenSidebar.classList.add('overlay');
					evenMiniSidebar.style.display = 'none';
					evenSidebar.style.position = 'fixed';
					evenSidebar.style.overflowX = 'hidden';

					// 화면 밖에서 슬라이드 인
					setTimeout(() => {
						evenSidebar.style.left = '0';
					}, 1); // 약간의 딜레이를 주어 트랜지션이 잘 동작하도록 설정

					sidebarState = 'overlay';
					headerMenuButton.classList.add('side-header__effect-round-button');
			} else if (sidebarState === 'overlay') {
					hideOverlaySidebar();
					
			}
    }
}

function hideOverlaySidebar() {

	evenSidebar.style.left = '-240px'; // 화면 밖으로 슬라이드 아웃
	
	setTimeout(() => {
			// 오버레이 상태에서 원래 상태로 돌아가기
			evenSidebar.style.display = 'none';
			evenSidebar.classList.remove('overlay');

			// 이전 상태에 따라 원래 상태로 복구
			if (mediaQueryMedium.matches) {
					// 중간 화면일 때 미니 사이드바로 복구
					evenMiniSidebar.style.display = 'flex';
					mainContainer.style.marginLeft = '72px';
					sidebarState = 'mini';
			} else {
					// 작은 화면일 때 사이드바 숨김으로 복구
					mainContainer.style.marginLeft = '0';
					sidebarState = 'hidden';
			}

			// 오버레이 상태에서 벗어났으므로 버튼 클래스 제거
			headerMenuButton.classList.remove('side-header__effect-round-button');
		}, 150); 
}

// 사이드바 헤더 위에 마우스가 있을/없을 때 스크롤 비활성화/활성화
evenSidebarHeader.addEventListener('mouseenter', () => {
	evenSidebar.style.overflow = 'hidden';
});

evenSidebarHeader.addEventListener('mouseleave', () => {
	evenSidebar.style.overflow = 'auto';
});




// 햄버거 버튼에 클릭 이벤트 리스너 추가
headerMenuButton.addEventListener('click', handleSidebarToggle);
// 오버레이 상태 버튼 이벤트 리스너
sideHeaderMenuButton.addEventListener('click', hideOverlaySidebar);
