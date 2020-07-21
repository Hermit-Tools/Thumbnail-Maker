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
  let epNum = epNumSelector.value;

  ctx.fillStyle = "#261412";
  ctx.font = "1000 401px Tahoma";
  ctx.textBaseline = "bottom";

  ctx.fillText(epNum, 15, 1120);
  ctx.strokeText(epNum, 15, 1120);
  
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
    const captionBox = captions[i];
    let caption = captionBox.value;

    const theGradient = ctx.createLinearGradient(15,820,20, 837);
//    theGradient.addColorStop(0, '#93680c');
//    theGradient.addColorStop(1, '#e6cf1a');
theGradient.addColorStop(0, '#f00');
theGradient.addColorStop(1, '#00f');

    ctx.fillStyle = theGradient;
    ctx.font = "1000 401px Tahoma";
    ctx.textBaseline = "bottom";

    ctx.fillText(caption, 15, 820);
    ctx.fill();
  }
}

function process() {
  ctx.fillStyle = "#fff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
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
