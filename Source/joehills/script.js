const bgInput = document.getElementById("bgInput");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const epNumSelector = document.getElementById("epNumSelector");
const hcLogoToggler = document.getElementById("hcLogoToggler");
const previewText = document.getElementById("preview-text");
const downloader = document.getElementById("downloader");

/*// Cookies Stuff
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
// End Cookies Stuff

// Service Worker
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("service-worker.js");
  });
}
// End Service Worker*/

function addBgImage() {
  let bgImage = new Image();
  bgImage.addEventListener(
    "load",
    () => {
      ctx.drawImage(bgImage, 0, 0, 1920, 1080);
      hcLogo();
      episodeNum();
      captionWriter();
    },
    false
  );
  bgImage.src = URL.createObjectURL(bgInput.files[0]);
}

function episodeNum() {
  let epNum;
  if (epNumSelector.value.length === 0) {
    epNum = '';
  } else {epNum = '#' + epNumSelector.value}

  ctx.fillStyle = "#261412";
  ctx.font = "normal 250px EdGothic";
  ctx.textBaseline = "top";

  ctx.fillText(epNum, 14, 840.5);
  ctx.fill();
}

function hcLogo() {
  if (hcLogoToggler.checked) {
    let hc7Logo = new Image();
    hc7Logo.addEventListener("load", () => {
      ctx.drawImage(hc7Logo, 15.7, 40, 1887.5, 244);
    });
    hc7Logo.src =
      "https://hermit-tools.github.io/Thumbnail-Maker/Resources/Hermitcraft Logos/HC7 Logo.png";
    hc7Logo.crossOrigin = "Anonymous";
  }
}

function captionWriter() {
  let captions = document.getElementsByClassName('caption');

  for (let i = 0; i < captions.length; i++) {
    let caption = captions[i].value;

    ctx.font = "normal 300px EdGothic, Comic Sans MS, Segoe UI";
    const lineHeight = ctx.measureText('M').width;

    const theGradient = ctx.createLinearGradient(00, 00, 0, lineHeight);
    theGradient.addColorStop(0, '#eace08');
    theGradient.addColorStop(1, '#9c6102');

    ctx.fillStyle = theGradient;
    ctx.textBaseline = "top";

    ctx.strokeStyle = "#281604";
    ctx.lineWidth = 12;

    ctx.fillText(caption, 00, 00);
    ctx.strokeText(caption, 0, 0);
    ctx.fill();
  }
}

function process() {
  //ctx.fillStyle = "#fff";
  //ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.clearRect(0,0,canvas.width,canvas.height)
  if (bgInput.files.length != 0) {
    addBgImage();
  } else {
    hcLogo();
    episodeNum();
    captionWriter();
  }
}

function finishEditing() {
  const downloadShow = document.getElementById("downloadShow");
  downloadShow.style.opacity = "1";
  setTimeout(() => {
    downloadShow.style.opacity = "0";
  }, 5000);
  downloader.download = `Ep${epNumSelector.value} HC7 Cub's Contraption.jpg`;
  downloader.href = canvas
    .toDataURL("image/png")
    .replace("data:image/png", "data:concorp>sahara");
}
