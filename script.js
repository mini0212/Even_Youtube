

// 검색
const searchInput = document.getElementById("search-bar__input");
const searchInputButton = document.getElementById("search-btn");
const clearButton = document.getElementById("search-bar__clear-button");

searchInput.addEventListener("input", () => {
    if (searchInput.value.trim() !== "") {
        clearButton.style.display = "inline";
    } else {
        clearButton.style.display = "none";
    }
});

clearButton.addEventListener("click", () => {
    searchInput.value = "";
    clearButton.style.display = "none";
    renderVideos(sampleVideos);
});

// 텍스트 없을 때 clear 버튼 숨기기
clearButton.hidden = true;

searchInput.addEventListener("input", () => {
    if (searchInput.value.trim() !== "") {
        clearButton.hidden = false;
    } else {
        clearButton.hidden = true;
    }
});

function filterVideos() {
    const searchText = searchInput.value.toLowerCase().trim();
    const filterVideos = sampleVideos.filter((video) => {
        return (
            video.title.toLowerCase().trim().includes(searchText) ||
            video.channel.toLowerCase().trim().includes(searchText)
        );
    });
    renderVideos(filterVideos);
}

searchInputButton.addEventListener("click", filterVideos);

renderVideos(sampleVideos);


const videoGrid = document.getElementById("video-grid");

// 유튜브 스타일 랜덤 데이터 생성
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomTitle() {
    const titles = ["Amazing Video", "Top 10 Tips", "How to Cook", "Travel Vlog", "Life Hacks"];
    return titles[getRandomInt(0, titles.length - 1)];
}

function getRandomAuthor() {
    const authors = ["John Doe", "Jane Smith", "Cool Channel", "Traveler", "Chef Extraordinaire"];
    return authors[getRandomInt(0, authors.length - 1)];
}

function getRandomViews() {
    return `${getRandomInt(1, 10)}.${getRandomInt(0, 9)}M views`;
}

function getRandomDate() {
    const days = getRandomInt(1, 30);
    return `${days} days ago`;
}

function getRandomDuration() {
    const minutes = getRandomInt(1, 10);
    const seconds = getRandomInt(0, 59).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
}

// 동영상 카드 생성 함수
function createVideoItem(vid) {
    const videoItem = document.createElement("div");
    videoItem.className = "video-item";

    // 랜덤 동영상 소스 생성
    const videoSrc = `https://samplelib.com/lib/preview/mp4/sample-${getRandomInt(5, 30)}s.mp4`;

    videoItem.innerHTML = `
      <div class="thumbnail-row">
        <video 
          class="thumbnail" 
          src="${videoSrc}" 
          muted 
          loop 
          preload="metadata"
          onmouseover="this.play()" 
          onmouseout="this.pause(); this.currentTime = 0;"
        ></video>
        <span class="video-time">${getRandomDuration()}</span>
      </div>
      <div class="video-info">
        <p class="video-title">${getRandomTitle()}</p>
        <p class="video-author">${getRandomAuthor()}</p>
        <p class="video-stats">${getRandomViews()} • ${getRandomDate()}</p>
      </div>
    `;

    return videoItem;
}

// 동영상 목록 로드 함수
function loadVideos(count = 9) {
    for (let i = 0; i < count; i++) {
        const videoItem = createVideoItem();
        videoGrid.appendChild(videoItem);
    }
}

// 기존 스크립트 (예: 동영상 로드 함수)
document.addEventListener('DOMContentLoaded', () => {
    const videoGrid = document.getElementById('video-grid');
    const videoIDs = ["fJ9rUzIMcZQ", "3JZ_D3ELwOQ", "kJQP7kiw5Fk"]; // 동영상 ID 목록
    let players = []; // YouTube Player 객체 저장 배열

    // YouTube Player 초기화
    function initializePlayers() {
        const iframes = document.querySelectorAll('.thumbnail-row iframe');
        iframes.forEach((iframe, index) => {
            players[index] = new YT.Player(iframe, {
                events: {
                    onReady: (event) => {
                        const player = event.target;

                        // 마우스 오버 시 재생
                        iframe.addEventListener('mouseover', () => {
                            player.playVideo();
                        });

                        // 마우스 아웃 시 정지
                        iframe.addEventListener('mouseout', () => {
                            player.pauseVideo();
                        });
                    }
                }
            });
        });
    }

    // YouTube API 스크립트 로드
    function loadYouTubeAPI() {
        const tag = document.createElement('script');
        tag.src = "https://www.youtube.com/iframe_api";
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

        window.onYouTubeIframeAPIReady = () => {
            initializePlayers();
        };
    }

    // 동영상 카드 생성 함수
    function createVideoItem(videoID) {
        const videoItem = document.createElement('div');
        videoItem.className = 'video-item';
        videoItem.innerHTML = `
            <div class="thumbnail-row">
                <iframe
                    src="https://www.youtube.com/embed/${videoID}?enablejsapi=1&mute=1&controls=1&loop=1&playlist=${videoID}"
                    allow="autoplay; encrypted-media"
                    allowfullscreen>
                </iframe>
            </div>
        `;
        return videoItem;
    }

    // 동영상 카드 로드 함수
    function loadVideos() {
        videoIDs.forEach((videoID) => {
            const videoItem = createVideoItem(videoID);
            videoGrid.appendChild(videoItem);
        });
        initializePlayers();
    }

    // 초기화
    loadYouTubeAPI();
    loadVideos();
});

