const bgInput = document.getElementById("bgInput");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const epNumSelector = document.getElementById("epNumSelector");
const hcLogoToggler = document.getElementById("hcLogoToggler");
const previewText = document.getElementById("preview-text");
const downloader = document.getElementById("downloader");

function editOnCanvas() {
  let bgImage = new Image();
  bgImage.addEventListener(
    "load",
    () => {
      ctx.drawImage(bgImage, 0, 0, 1920, 1080);
      hcLogo();
      episodeNum();
    },
    false
  );

  bgImage.src = URL.createObjectURL(bgInput.files[0]);
}

function episodeNum() {
  let epNum = epNumSelector.value;

  ctx.fillStyle = "#fff";
  ctx.strokeStyle = "#000";
  ctx.lineWidth = 12;
  ctx.font = "1000 401px Tahoma";
  ctx.textBaseline = "bottom";

  ctx.fillText(epNum, 25, 1100);
  ctx.strokeText(epNum, 25, 1100);
  ctx.fill();
  ctx.stroke();
}

function hcLogo() {
  if (hcLogoToggler.checked) {
    let hc7Logo = new Image();
    hc7Logo.addEventListener("load", () => {
      ctx.drawImage(hc7Logo, 15.7, 40, 1887.5, 244);
    });
    hc7Logo.src =
      "https://hermit-tools.github.io/Thumbnail-Maker/hc7logobydnator.png";
    hc7Logo.crossOrigin = "Anonymous";
  }
}

function finishEditing() {
  downloader.download = `HC7-Ep${epNumSelector.value}-CubsContraptionByHermitTools.jpg`;
  downloader.href = canvas
    .toDataURL("image/png")
    .replace("data:image/png", "data:concorp>sahara");
}

function process() {
  ctx.fillStyle = "#fff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  if (bgInput.files.length != 0) {
    editOnCanvas();
  } else {
    hcLogo();
    episodeNum();
  }
}
// Cookies Stuff
let epNumValueFromCookie;

downloader.addEventListener("click", () => {
  document.cookie = `epNumCookie=${epNumSelector.value}`;
});

if (document.cookie.length === 0) {
  epNumValueFromCookie = "";
} else {
  epNumValueFromCookie = document.cookie.split("=")[1];
  epNumSelector.value = Number(epNumValueFromCookie) + 1;
}
// Service Worker
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("service-worker.js");
  });
}
