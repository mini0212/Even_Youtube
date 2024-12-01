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

// 무한 스크롤 기능
window.addEventListener("scroll", () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 50) {
    loadVideos(9);
  }
});

// 초기 동영상 로드
loadVideos(12);