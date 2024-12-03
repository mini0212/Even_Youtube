const videoGrid = document.getElementById("video-grid");

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

    // 호버 이벤트: 마우스 오버 시 재생, 마우스 아웃 시 정지
    card.addEventListener("mouseover", () => videoElement.play());
    card.addEventListener("mouseout", () => videoElement.pause());

    return card;
}

// 초기 비디오 로드
sampleVideos.forEach((video) => {
    videoGrid.appendChild(createVideoCard(video));
});

// 무한 스크롤 구현
let loading = false;
window.addEventListener("scroll", () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 200 && !loading) {
        loading = true;

        // API 호출 대신 샘플 데이터 추가
        setTimeout(() => {
            sampleVideos.forEach((video) => {
                videoGrid.appendChild(createVideoCard(video));
            });
            loading = false;
        }, 1000);
    }
});