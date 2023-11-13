let musicList = [
  {

      id: 1,
      src: "http://localhost:3000/play/tai-vi-sao",   
      name: "Tai Vi Sao - MCK",
      artist: "MCK",  
      img : "https://photo-resize-zmp3.zmdcdn.me/w320_r1x1_jpeg/cover/a/e/5/4/ae54e556fabe7740b12186c68cc95fd9.jpg",
    },
  {
    id: 2,
    src: "http://localhost:3000/play/tay-lai-pro",
    name: "Tay lai pro",
      artist: "Double2T",
      img : "https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/cover/b/f/0/1/bf0182328238f2a252496a63e51f1f74.jpg",  
  },
    {
    id:3,
    src: "http://localhost:3000/play/rolling-down",
    name: "Rowling Down - MCK",  
      artist: "Captain",
      img : "https://avatar-ex-swe.nixcdn.com/song/2023/08/18/9/e/a/8/1692368496464_500.jpg",  
  }, {
    id:4,
    src: "http://localhost:3000/play/nguoi-duoc-chon",
    name: "Người được chọn",
      artist: "Team Bray",
      img :  "https://i.scdn.co/image/ab67616d00001e027d405a233dff5392665e5a61",  
  },
  {
    id: 5,
    src: "http://localhost:3000/play/ai-cung-co-the-la-quan-quan",
    name: "Ai cũng có thể là quán quân",
      artist: "Huynh Cong Hieu",
      img : "https://i.scdn.co/image/ab67616d00001e022103bdcdf1d4369f212b6862",  
  },
  {
    id: 6,
    src: "http://localhost:3000/play/teeth",
    name: "5 Seconds of Summer",
      artist: "teeth",
      img : "https://i.scdn.co/image/ab67616d00001e02ae9f6efe502c816fa98bc214",  
  },
  {
    id: 7,
    src: "http://localhost:3000/play/mien-che",
    name: "Miễn chê",
      artist: "Teez",
      img : "ttps://avatar-ex-swe.nixcdn.com/song/2023/09/09/9/1/e/5/1694255781566_500.jpg",  
  },
  {
    id: 8,
    src: "http://localhost:3000/play/making-my-way-son-tung-m-tp",
    name: "Making my way",
      artist: "Song Tung",
      img : "https://avatar-ex-swe.nixcdn.com/song/2023/01/10/7/e/e/d/1673338760183_500.jpg",  
  },
  {
    id: 9,
    src: "http://localhost:3000/play/TheresNoOneAtAll-SonTungMTP-7583837",
    name: "Theres No One At All",
      artist: "Son Tung",
      img : "https://avatar-ex-swe.nixcdn.com/song/2023/01/10/7/e/e/d/1673338760183_500.jpg",  
  },
];

window.addEventListener("load", () => {
  let musicIndex = 1;
  loadMusic(musicIndex);
  playingNow();
});

//Khai báo biến
const mediaListELe = document.querySelector(".media-list");
const addPlayListEle = document.getElementById("add-playlist");
const ModalEle = document.querySelector(".modal");
const Modal2Ele = document.querySelector(".modal-2");
const heartEle = document.querySelectorAll(".heart");
// test
const mainAudio = document.getElementById("main-audio");
const wrapper = document.querySelector(".main-page"),
  volumeBtn = document.querySelector(".volume-btn"),
  lyricsBox = document.querySelector(".music-lyric"),
  lyrics = document.querySelector(".lyrics"),
  lyricsBtn = document.querySelector(".lyrics-details_btn");


  document.addEventListener("DOMContentLoaded", function() {
    const playPauseBtn = document.querySelector('.play-pause');
    const wrapper = document.querySelector(".bottom-section");
    playPauseBtn.addEventListener("click", () => {
        const isMusicPaused = wrapper.classList.contains("paused");
        isMusicPaused ? pauseMusic() : playMusic();
        playingNow();
    });
  });
//  click vào phần tưe khi hiện ra thẻ div

function clicked(element) {
  let getLiIndex = element.getAttribute("li-index");
  musicIndex = getLiIndex;
  loadMusic(musicIndex);
  playMusic();
  playingNow();
}

//  click  ra lyric
// function clicked2(element) {
//   let getLyric = element.getAttribute("li1");
//   lyric = getLyric;
//   loadMusic(lyric);
  
// }


// play

function playMusic() {
  const mainAudio = document.getElementById("main-audio");
  const playPauseBtn = document.querySelector('.play-pause');
  const wrapper = document.querySelector(".bottom-section");
  wrapper.classList.add("paused");
  playPauseBtn.querySelector("i").innerText = "pause";
  mainAudio.play();
}


function pauseMusic() {
  const mainAudio = document.getElementById("main-audio");
  const playPauseBtn = document.querySelector('.play-pause');
  const wrapper = document.querySelector(".bottom-section");
  wrapper.classList.remove("paused");
  playPauseBtn.querySelector("i").innerText = "play_arrow";
  mainAudio.pause();
}




function loadMusic(indexNumb) {
  musicName = document.querySelector(" .name"),
    musicArtist = document.querySelector(" .artist"),
    musicImg = document.querySelector(".img-music");
  musicName.innerText = musicList[indexNumb - 1].name;
  musicArtist.innerText = musicList[indexNumb - 1].artist;
  musicImg.src= musicList[indexNumb-1].img;
  const textContainer = document.querySelector(".lyrics")
  const mainAudio = document.getElementById("main-audio");
  mainAudio.src = musicList[indexNumb - 1].src;
//   if (!(musicList[indexNumb - 1].lyric.length === 0)) {
//     let spans = musicList[indexNumb - 1].lyric?.map((text) => `<span>${text}</span>`)
//     textContainer.innerHTML = spans.join("");
// } else {
//     textContainer.innerHTML = `<span>Lyrics are being updated</span>`;
// }
}

// function loadLyic(lyric) {
//   const textContainer = document.querySelector(".lyrics");
//   textContainer.li = lyric;
// }

function playingNow() {
  const divList = document.querySelector(".media-list");
  let musicIndex = 1;
  const allLiTag = divList.querySelectorAll("div");

  allLiTag.forEach(function(li, index) {
      let audioTag = li.querySelector(".audio-duration");
      if (allLiTag[index].classList.contains("playing")) {
          allLiTag[index].classList.remove("playing");
          let adDuration = audioTag.getAttribute("t-duration");
          audioTag.innerText = adDuration;
      }
      if (allLiTag[index].getAttribute("li-index") == musicIndex) {
          allLiTag[index].classList.add("playing");
      }
      allLiTag[index].setAttribute("onclick", "clicked(this)" )
  })  
}  

// lyric
document.addEventListener("DOMContentLoaded", function () {
  const wrapper = document.querySelector(".bottom-section");
  const lyricsBtn = document.querySelector(".lyrics-details_btn"),
  lyricsBox = document.querySelector(".music-lyric");
    
  lyricsBtn.addEventListener("click", () => {
    lyricsBox.classList.toggle("show");
    lyricsBox.classList.contains("show")
      ? (lyricsBtn.style.color = "white")
      : (lyricsBtn.style.color = "white");
    wrapper.classList.toggle("expand");
  });
});

//  Nut cho bài tiếp theo và lùi lại

document.addEventListener("DOMContentLoaded", function () {
  const prevBtn = document.querySelector(".backward");
  const nextBtn = document.querySelector(".forward");

  nextBtn.addEventListener("click", () => {
    nextMusic();
    console.log("Play/Pause button clicked");
  });

  prevBtn.addEventListener("click", () => {
    prevMusic();
  });
});

function nextMusic() {
  musicIndex++;
  if (musicIndex > musicList.length) musicIndex = 1;
  loadMusic(musicIndex);
  playMusic();
  playingNow();
}

function prevMusic() {
  musicIndex--;
  if (musicIndex < 1) musicIndex = musicList.length;
  loadMusic(musicIndex);
  playMusic();
  playingNow();
}

// nút Replay
document.addEventListener("DOMContentLoaded", function () {
  const repeatBtn = document.getElementById("repeat-plist");

  repeatBtn.addEventListener("click", () => {
    let getText = repeatBtn.innerText;

    switch (getText) {
      case "repeat":
        repeatBtn.innerText = "repeat_one";
        repeatBtn.setAttribute("title", "Song looped");
        break;
      case "repeat_one":
        repeatBtn.innerText = "shuffle";
        repeatBtn.setAttribute("title", "Playback shuffle");
        break;
      case "shuffle":
        repeatBtn.innerText = "repeat";
        repeatBtn.setAttribute("title", "Playlist looped");
        break;
    }
  });
});

mainAudio.addEventListener("ended", () => {
  const repeatBtn = document.getElementById("repeat-plist");
  let getText = repeatBtn.innerText;
  switch (getText) {
    case "repeat":
      nextMusic();
      break;
    case "repeat_one":
      mainAudio.currentTime = 0;
      loadMusic(musicIndex);
      playMusic();
      break;
    case "shuffle":
      let randIndex = Math.floor(Math.random() * musicList.length + 1);
      do {
        randIndex = Math.floor(Math.random() * musicList.length + 1);
      } while (musicIndex == randIndex);
      musicIndex = randIndex;
      loadMusic(musicIndex);
      playMusic();
      playingNow();
      break;
  }
});

document.addEventListener("DOMContentLoaded", function () {
  let isMuted = false;
  const volumeBtn = document.querySelector(".volume-btn"),
    volumeRangeInput = document.getElementById("volume_input");

  volumeBtn.addEventListener("click", () => {
    isMuted = !isMuted;
    let currentVolume = Number(volumeRangeInput.value) / 100;
    if (isMuted) {
      volumeBtn.textContent = "volume_off";
      mainAudio.volume = 0;
    } else {
      volumeBtn.textContent = "volume_up";
      mainAudio.volume = currentVolume;
      changeIconVolume(currentVolume);
    }
  });
});
// volume-btn

function changeIconVolume(volumeValue) {
  if (volumeValue > 0.5 && volumeValue <= 1) {
    volumeBtn.textContent = "volume_up";
  } else if (volumeValue > 0 && volumeValue <= 0.5) {
    volumeBtn.textContent = "volume_down";
  } else {
    volumeBtn.textContent = "volume_mute";
  }
}

// Khu chứa thanh time.
document.addEventListener("DOMContentLoaded", function () {
  const progressArea = document.querySelector(".progress-area");

  progressArea.addEventListener("click", (e) => {
    let progressWidthVal = progressArea.clientWidth;
    let clickedOffSetX = e.offsetX;
    let songDuration = mainAudio.duration;
    mainAudio.currentTime = (clickedOffSetX / progressWidthVal) * songDuration;
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const mainAudio = document.getElementById("main-audio");
  const progressBar = document.querySelector(".progress-bar");
  const musicCurrentTime = document.querySelector(".current");
  const musicDuration = document.querySelector(".duration");

  mainAudio.addEventListener("timeupdate", (e) => {
    const currentTime = e.target.currentTime;
    const duration = e.target.duration;
    let progressBarWidth = (currentTime / duration) * 100;
    progressBar.style.width = `${progressBarWidth}%`;

    let currentMin = Math.floor(currentTime / 60);
    let currentSec = Math.floor(currentTime % 60);
    if (currentSec < 10) {
      currentSec = `0${currentSec}`;
    }
    musicCurrentTime.innerText = `${currentMin}:${currentSec}`;
  });

  mainAudio.addEventListener("loadeddata", () => {
    let audioDuration = mainAudio.duration;
    let totalMin = Math.floor(audioDuration / 60);
    let totalSec = Math.floor(audioDuration % 60);
    if (totalSec < 10) {
      totalSec = `0${totalSec}`;
    }
    musicDuration.innerText = `${totalMin}:${totalSec}`;
  });
});
