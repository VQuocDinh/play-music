//Khai báo biến
const mediaListELe = document.querySelector(".media-list");
const addPlayListEle = document.getElementById("add-playlist");
const ModalEle = document.querySelector(".modal");
const Modal2Ele = document.querySelector(".modal-2");
const heartEle = document.querySelectorAll(".heart");

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

//chức năng cho song album playlist
const btnSongEle = document.querySelector(".Song");
const btnAlbumEle = document.querySelector(".Album");
const btnPlayListEle = document.querySelector(".Playlist");
const btnEle = document.querySelectorAll("ul .style");
const listSongEle = document.querySelectorAll(".list-song");
console.log(btnEle);
const clearClassActive = () => {
  btnEle.forEach((val) => val.classList.remove("active"));
};

btnSongEle.addEventListener("click", () => {
  clearClassActive();
  btnSongEle.classList.add("active");
  listSongEle.forEach((val) => (val.style.display = "none"));
  mediaListELe.style.display = "block";
});
btnAlbumEle.addEventListener("click", () => {
  clearClassActive();
  btnAlbumEle.classList.add("active");
  listSongEle.forEach((val) => (val.style.display = "block"));
  mediaListELe.style.display = "none";
});
btnPlayListEle.addEventListener("click", () => {
  clearClassActive();
  btnPlayListEle.classList.add("active");
  listSongEle.forEach((val) => (val.style.display = "block"));
  mediaListELe.style.display = "none";
});
