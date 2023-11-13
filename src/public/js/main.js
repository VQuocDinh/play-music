//Khai báo biến
const listBanner = document.querySelector(".banner .list-banner");
const itemBanners = document.querySelectorAll(".banner .list-banner .item");
const prev = document.getElementById("prev");
const next = document.getElementById("next");
const loginEle = document.getElementById("login");
const mediaListELe = document.querySelector(".media-list");
const addPlayListEle = document.getElementById("add-playlist");
const ModalEle = document.querySelector(".modal");
const Modal2Ele = document.querySelector(".modal-2");
const heartEle = document.querySelectorAll(".heart");
const more = document.querySelector(".more-icon");
const dropDownMoreEle = document.querySelector(".drop-down-more");


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


function reloadPage() {
  window.location.href = "/";
}
const mainSectionEle = document.getElementById("main-section");
const mainHeader = document.getElementById("inframe");

document.addEventListener("scroll", () => {
  const positionY = window.scrollY;
  if (positionY > 300) {
    mainHeader.style.opacity = "0";
    mainHeader.style.visibility = "hidden";
  } else {
    mainHeader.style.opacity = "1";
    mainHeader.style.visibility = "visible";
  }
});

function modal2Show() {
  Modal2Ele.style.display = "block";
}



const topChartsSongEles = document.querySelectorAll(".top-charts .plusSong");

topChartsSongEles.forEach((songElement) => {
  
  songElement.addEventListener("click", (e) => {
    const dataID = songElement.dataset.id;
    console.log(dataID);
    let selectedPlaylistID = null; // Biến để lưu trữ playlistID
    const addSongForm = document.forms["add-song-to-playlist"];
    const btnSave = document.getElementById("btns-Save");
    // Lắng nghe sự kiện khi người dùng click vào một playlist cụ thể trong modal
    const playlistItems = document.querySelectorAll(
      ".addToPlaylist .list-item"
    );
    function clearBtnActive(e) {
      playlistItems.forEach(val => val.classList.remove("btn-active"))
    }
    playlistItems.forEach((item) => {
      item.addEventListener("click", (e) => {
        selectedPlaylistID = item.dataset.id; // Lưu trữ playlistID từ div được click
        // Làm điều gì đó với selectedPlaylistID
        clearBtnActive()
        e.target.closest(".list-item").classList.add("btn-active")
        btnSave.onclick = function () {
          addSongForm.action = "/" + dataID + "/" + selectedPlaylistID;
          addSongForm.submit();
        };
      });
    });
  });
});