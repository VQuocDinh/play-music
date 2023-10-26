// //Khai báo biến
// const mediaListELe = document.querySelector(".media-list");
// const addPlayListEle = document.getElementById("add-playlist");
// const ModalEle = document.querySelector(".modal");
// const Modal2Ele = document.querySelector(".modal-2");
// const heartEle = document.querySelectorAll(".heart");

// //click heart
// [...heartEle].forEach((val) => {
//   val.addEventListener("click", (e) => {
//     if (e.target.classList.contains("unlike")) {
//       e.target.classList.remove("unlike");
//       e.target.classList.add("like");
//     } else {
//       e.target.classList.remove("like");
//       e.target.classList.add("unlike");
//     }
//   });
// });

// //Thêm playlists

// document.addEventListener("click", (e) => {
//   if (e.target === addPlayListEle || e.target.closest(".addplaylist")) {
//     ModalEle.style.display = "block";
//   } else {
//     ModalEle.style.display = "none";
//   }
// });

// //add vào playplists đã có sẵn

// document.addEventListener("click", (e) => {
//   if (e.target.closest(".fa-plus") || e.target.closest(".addToPlaylist")) {
//     Modal2Ele.style.display = "block";
//   } else {
//     Modal2Ele.style.display = "none";
//   }
// });

// //chức năng cho song album playlist
// const btnSongEle = document.querySelector(".Song");
// const btnAlbumEle = document.querySelector(".Album");
// const btnPlayListEle = document.querySelector(".PlayList");
// const btnEle = document.querySelectorAll(".title-2 .style");

// console.log(btnEle);
// const clearClassActive = () => {
//   btnEle.forEach((val) => val.classList.remove("active"));
// };

// btnSongEle.addEventListener("click", () => {
//   clearClassActive();
//   btnSongEle.classList.add("active");
// });
// btnAlbumEle.addEventListener("click", () => {
//   clearClassActive();
//   btnAlbumEle.classList.add("active");
// });
// btnPlayListEle.addEventListener("click", () => {
//   clearClassActive();
//   btnPlayListEle.classList.add("active");
// });


//Khai báo biến
const mediaListELe = document.querySelector(".media-list");
const addPlayListEle = document.getElementById("add-playlist");
const ModalEle = document.querySelector(".modal");
const Modal2Ele = document.querySelector(".modal-2");
const heartEle = document.querySelectorAll(".heart");
// test
const wrapper = document.querySelector(".main-page"),
volumeRangeInput = document.getElementById("volume1"),
volumeBtn = document.querySelector(".volume-btn"),
 mainAudio = document.getElementById("main-audio"),
 lyricsBox = document.querySelector(".music-lyric"),
lyrics = document.querySelector(".lyrics"),
lyricsBtn = document.querySelector(".lyrics-details_btn"),
prevBtn = document.querySelector(".backward"),
nextBtn = document.querySelector(".forward"),
playPauseBtn = document.querySelector(".pause");
//click heart
[...heartEle].forEach((val) => {
  val.addEventListener("click", (e) => {
    if (e.target.classList.contains("unlike")) {
      e.target.classList.remove("unlike");
      e.target.classList.add("like");
    } else {
      e.target.classList.remove("like");
      e.target.classList.add("unlike");
    }
  });
});

//Thêm playlists

document.addEventListener("click", (e) => {
  if (e.target === addPlayListEle || e.target.closest(".addplaylist")) {
    ModalEle.style.display = "block";
  } else {
    ModalEle.style.display = "none";
  }
});

//add vào playplists đã có sẵn

document.addEventListener("click", (e) => {
  if (e.target.closest(".fa-plus") || e.target.closest(".addToPlaylist")) {
    Modal2Ele.style.display = "block";
  } else {
    Modal2Ele.style.display = "none";
  }
});
//  Dùng để chèn vào thẻ div
let musicIndex = 1;
let isMuted = false;

const divList = document.querySelector(".media-list");

function clicked(element) {
  let getLiIndex = element.getAttribute("li-index");
  musicIndex = getLiIndex;
  loadMusic(musicIndex);
  playMusic();
  playingNow();
}

function pauseMusic() {
  wrapper.classList.remove("paused");
  playPauseBtn.querySelector("i").innerText = "";
  document.title = "Music Lord";
  mainAudio.pause();
}

playPauseBtn.addEventListener("click", () => {
  const isMusicPaused = wrapper.classList.contains("paused");
  isMusicPaused ? pauseMusic() : playMusic();
  playingNow();
})


// play
function playMusic() {
  wrapper.classList.add("paused");
  playPauseBtn.querySelector("i").innerText = "";
  document.title = musicList[musicIndex - 1].name;
  mainAudio.play();
}

// Chạy vòng lập để ra thẻ
for (let i = 0; i < musicList.length; i++) {
  let divTag = `<div li-index="${i+1}">
        <div class="media-item flex a-center j-between">
        <div class="media-left flex a-center ">
            <a href=""><img src="../image/Rectangle 33.png" alt=""></a>
            <div class="detail">
                <h3>${musicList[i].name}</h3>
                <a href="">${musicList[i].artist}</a>
            </div>
            <audio id = "main-audio"class="${musicList[i].src}" src="./musics/${musicList[i].src}.mp3"></audio>
            <span class="audio-duration" " ></span>
        </div>
        <div class="media-right">
            <span class="time" id="${musicList[i].src}">2:10</span>
            <button class="heart "><i class="fa-solid fa-heart like"></i></button>
            <button class="plus"><i class="fa-solid fa-plus "></i></button>
        </div>
      </div>
  </div>`;

  divList.insertAdjacentHTML("beforeend", divTag);

  let liAudioDuration = divList.querySelector(`#${musicList[i].src}`)
  let liAudioTag = divList.querySelector(`.${musicList[i].src}`)

  liAudioTag.addEventListener("loadeddata", () => {
      let audioDuration = liAudioTag.duration;
      let totalMin = Math.floor(audioDuration / 60);
      let totalSec = Math.floor(audioDuration % 60);
      if (totalSec < 10) {
          totalSec = `0${totalSec}`
      }
      liAudioDuration.innerText = `${totalMin}:${totalSec}`;
      liAudioDuration.setAttribute("t-duration", `${totalMin}:${totalSec}`);
    })
 } 

 window.addEventListener("load", () => {
  loadMusic(musicIndex);
  playingNow();
})


//   Dùng để load nhạc
function loadMusic(indexNumb) {
  // musicName.innerText = musicList[indexNumb - 1].name;
  // musicName.setAttribute("title", musicList[indexNumb - 1].name);
  // musicArtist.innerText = musicList[indexNumb - 1].artist;
  mainAudio.src = `./musics/${musicList[indexNumb - 1].src}.mp3`;
  // musicImg.style.backgroundImage = `url(./images/${musicList[indexNumb - 1].img}.jpg)`;
  // musicDiscImg.style.backgroundImage = musicImg.style.backgroundImage;
  if (!(musicList[indexNumb - 1].lyric.length === 0)) {
      let spans = musicList[indexNumb - 1].lyric?.map((text) => `<span>${text}</span>`)
      textContainer.innerHTML = spans.join("");
  } else {
      textContainer.innerHTML = `<span>Lyrics are being updated</span>`;
  }
}






const allLiTag = divList.querySelectorAll("div");

function playingNow() {
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
      allLiTag[index].setAttribute("onclick", "clicked(this)")
  })  
}  

// lyric
const textContainer = document.querySelector(".lyrics")

lyricsBtn.addEventListener("click", () => {
   lyricsBox.classList.toggle("show");
   lyricsBox.classList.contains("show") ? lyricsBtn.style.color = "white" : lyricsBtn.style.color = "white";
   wrapper.classList.toggle("expand");
})

nextBtn.addEventListener("click", () => {
  nextMusic();
})
prevBtn.addEventListener("click", () => {
  prevMusic();
})

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
const repeatBtn = document.getElementById("repeat-plist");
repeatBtn.addEventListener("click", () => {
  let getText = repeatBtn.innerText;
  switch(getText) {
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
})
mainAudio.addEventListener("ended", () => {
  let getText = repeatBtn.innerText;
  switch(getText) {
      case "repeat":
          nextMusic();
          break;
      case "repeat_one":
          mainAudio.currentTime = 0;
          loadMusic(musicIndex);
          playMusic();
          break;
      case "shuffle":
          let randIndex = Math.floor((Math.random() * musicList.length) + 1);
          do {
              randIndex = Math.floor((Math.random() * musicList.length) + 1);
          } while(musicIndex == randIndex)
          musicIndex = randIndex;
          loadMusic(musicIndex);
          playMusic();
          playingNow();
          break;
  }
})

// volume-btn
volumeBtn.addEventListener("click", () => {
  isMuted = !isMuted;
  let currentVolume = Number(volumeRangeInput.value) / 100;
  if(isMuted) {
      volumeBtn.textContent = "volume_off";
      mainAudio.volume = 0;
  } else {
      volumeBtn.textContent = "volume_up";
      mainAudio.volume = currentVolume;
      changeIconVolume(currentVolume);
  }
})

function changeIconVolume(volumeValue) {
  if (volumeValue > 0.5 && volumeValue <= 1) {
      volumeBtn.textContent = "volume_up";
  } else if (volumeValue > 0 && volumeValue <= 0.5) {
      volumeBtn.textContent = "volume_down";
  } else {
      volumeBtn.textContent = "volume_mute";
  }
}
