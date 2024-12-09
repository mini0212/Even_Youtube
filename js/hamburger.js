const headerMenuButton = document.getElementById('header-menu');
const evenSidebar = document.querySelector('.even-sidebar');
const evenSidebarHeader = document.querySelector('.even-sidebar-header');
const sideHeaderMenuButton = document.getElementById('side-header-menu');
const evenMiniSidebar = document.querySelector('.even-mini-sidebar');
const mainContainer = document.querySelector('main');
const overlay = document.getElementById('overlay');

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
        sidebarState = 'large';
        evenSidebar.style.display = 'block';
        evenSidebar.style.left = '0';
        evenMiniSidebar.style.display = 'none';
        mainContainer.style.marginLeft = '240px';
        evenSidebar.classList.remove('overlay');
        overlay.style.display = 'none';
        document.body.style.overflow = 'auto';
    } else if (mediaQueryMedium.matches) {
        sidebarState = 'mini';
        evenSidebar.style.display = 'none';
        evenMiniSidebar.style.display = 'flex';
        mainContainer.style.marginLeft = '72px';
        evenSidebar.classList.remove('overlay');
        overlay.style.display = 'none';
        document.body.style.overflow = 'auto';
    } else {
        sidebarState = 'hidden';
        evenSidebar.style.display = 'none';
        evenMiniSidebar.style.display = 'none';
        mainContainer.style.marginLeft = '0';
        evenSidebar.classList.remove('overlay');
        overlay.style.display = 'none';
        document.body.style.overflow = 'auto';
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
        if (sidebarState === 'large') {
            evenSidebar.style.display = 'none';
            evenMiniSidebar.style.display = 'flex';
            mainContainer.style.marginLeft = '72px';
            sidebarState = 'mini';
        } else {
            evenMiniSidebar.style.display = 'none';
            evenSidebar.style.display = 'block';
            evenSidebar.style.left = '0';
            evenSidebar.style.overflowX = 'hidden';
            mainContainer.style.marginLeft = '240px';
            evenSidebar.classList.remove('overlay');
            sidebarState = 'large';
        }
        headerMenuButton.classList.remove('side-header__effect-round-button');
        overlay.style.display = 'none';
        document.body.style.overflow = 'auto';
    } else {
        if (sidebarState === 'mini' || sidebarState === 'hidden') {
            evenSidebar.style.display = 'block';
            evenSidebar.classList.add('overlay');
            evenMiniSidebar.style.display = 'none';
            evenSidebar.style.position = 'fixed';
            evenSidebar.style.overflowX = 'hidden';
            setTimeout(() => {
                evenSidebar.style.left = '0';
            }, 1);
            sidebarState = 'overlay';
            headerMenuButton.classList.add('side-header__effect-round-button');
            overlay.style.display = 'block';
            document.body.style.overflow = 'hidden'; // 오버레이 중 스크롤 비활성화
        } else if (sidebarState === 'overlay') {
            hideOverlaySidebar();
        }
    }
}

function hideOverlaySidebar() {
    evenSidebar.style.left = '-240px';
    setTimeout(() => {
        evenSidebar.style.display = 'none';
        evenSidebar.classList.remove('overlay');
        if (mediaQueryMedium.matches) {
            evenMiniSidebar.style.display = 'flex';
            mainContainer.style.marginLeft = '72px';
            sidebarState = 'mini';
        } else {
            mainContainer.style.marginLeft = '0';
            sidebarState = 'hidden';
        }
        headerMenuButton.classList.remove('side-header__effect-round-button');
        overlay.style.display = 'none';
        document.body.style.overflow = 'auto'; // 오버레이 숨기면 스크롤 활성화
    }, 150);
}

headerMenuButton.addEventListener('click', handleSidebarToggle);
sideHeaderMenuButton.addEventListener('click', hideOverlaySidebar);