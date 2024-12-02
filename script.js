// 비디오 그리드와 스크롤 컨테이너를 가져옵니다.
const videoGrid = document.getElementById("video-grid");
const scrollContainer = document.getElementById("scroll-container");

// 샘플 비디오 데이터
const sampleVideos = [
    { title: "샘플 비디오 1", channel: "채널 A", views: "1M", date: "1일 전", src: "https://www.w3schools.com/html/mov_bbb.mp4" },
    { title: "샘플 비디오 2", channel: "채널 B", views: "500K", date: "2일 전", src: "https://www.w3schools.com/html/movie.mp4" },
    { title: "샘플 비디오 3", channel: "채널 C", views: "2M", date: "1주 전", src: "https://www.w3schools.com/html/mov_bbb.mp4" },
    { title: "샘플 비디오 4", channel: "채널 D", views: "1.2M", date: "3일 전", src: "https://www.w3schools.com/html/movie.mp4" },
    { title: "샘플 비디오 5", channel: "채널 E", views: "900K", date: "4일 전", src: "https://www.w3schools.com/html/mov_bbb.mp4" },
    { title: "샘플 비디오 6", channel: "채널 F", views: "3M", date: "2주 전", src: "https://www.w3schools.com/html/movie.mp4" },
    { title: "샘플 비디오 7", channel: "채널 G", views: "700K", date: "5일 전", src: "https://www.w3schools.com/html/mov_bbb.mp4" },
    { title: "샘플 비디오 8", channel: "채널 H", views: "2.5M", date: "1개월 전", src: "https://www.w3schools.com/html/movie.mp4" },
    { title: "샘플 비디오 9", channel: "채널 I", views: "1.5M", date: "2개월 전", src: "https://www.w3schools.com/html/mov_bbb.mp4" },
    { title: "샘플 비디오 10", channel: "채널 J", views: "800K", date: "3주 전", src: "https://www.w3schools.com/html/movie.mp4" },
    { title: "샘플 비디오 11", channel: "채널 K", views: "600K", date: "5일 전", src: "https://www.w3schools.com/html/mov_bbb.mp4" },
    { title: "샘플 비디오 12", channel: "채널 L", views: "1.8M", date: "6일 전", src: "https://www.w3schools.com/html/movie.mp4" },
];

// 무한 스크롤을 위해 페이지별 데이터 계산
let page = 0;
const itemsPerPage = 12; // 한 번에 로드할 항목 수

// 비디오 카드를 생성하는 함수
function createVideoCard(video) {
    const card = document.createElement("div");
    card.className = "video-card";

    const videoElement = document.createElement("video");
    videoElement.src = video.src;
    videoElement.setAttribute("preload", "metadata");
    videoElement.muted = true;

    const info = document.createElement("div");
    info.className = "video-info";

    const title = document.createElement("h3");
    title.textContent = video.title;

    const channel = document.createElement("p");
    channel.className = "channel-name";
    channel.textContent = video.channel;

    const meta = document.createElement("p");
    meta.className = "meta-info";
    meta.textContent = `${video.views} views • ${video.date}`;

    info.appendChild(title);
    info.appendChild(channel);
    info.appendChild(meta);

    card.appendChild(videoElement);
    card.appendChild(info);

    // 비디오 카드에 마우스 호버 이벤트 추가 (재생/정지)
    card.addEventListener("mouseover", () => videoElement.play());
    card.addEventListener("mouseout", () => videoElement.pause());

    return card;
}

// 비디오 데이터를 로드하는 함수
function loadVideos() {
    const start = page * itemsPerPage;
    const end = start + itemsPerPage;

    // 샘플 데이터를 순환해서 무한으로 사용할 수 있도록 조정
    const videos = [];
    for (let i = start; i < end; i++) {
        videos.push(sampleVideos[i % sampleVideos.length]);
    }

    // 비디오 카드를 생성하고 추가
    videos.forEach((video) => {
        videoGrid.appendChild(createVideoCard(video));
    });

    page++;
}

// 무한 스크롤 이벤트
scrollContainer.addEventListener("scroll", () => {
    // 스크롤이 끝에 가까워지면 비디오 추가 로드
    if (scrollContainer.scrollTop + scrollContainer.clientHeight >= scrollContainer.scrollHeight - 100) {
        loadVideos();
    }
});

// 초기 데이터 로드
loadVideos();
