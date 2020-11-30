const bgInput = document.getElementById("bgInput");

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
ctx.font = "normal 250px EdGothic";
const theGradient = ctx.createLinearGradient(0, 816, 0, 1080);
theGradient.addColorStop(0, '#a66c02');
theGradient.addColorStop(0.5, '#caa205');
theGradient.addColorStop(1, '#e9cd07');

const captionCanvas = document.getElementById('captionCanvas');
const ctxCaption = captionCanvas.getContext('2d');

const epNumSelector = document.getElementById("epNumSelector");
const hcLogoToggler = document.getElementById("hcLogoToggler");
const downloader = document.getElementById("downloader");
const addCaption = document.getElementById("addCaption");
const form = document.getElementById("form");
const captionContainer = document.getElementById("caption-container");
const downloadShow = document.getElementById("downloadShow");

let captions = document.getElementsByClassName('caption');
let cpNo = 0;

const hc7Logo = new Image()
hc7Logo.src = "https://hermit-tools.github.io/Thumbnail-Maker/Resources/Hermitcraft Logos/HC7 Logo.png";
hc7Logo.crossOrigin = "Anonymous";

/*// Cookies Stuff
downloader.addEventListener("click", () => {
  document.cookie = `epNumCookie=${epNumSelector.value}; expires=Fri, 31 Dec 9999 23:59:59 GMT`;
});

if (document.cookie.length !== 0) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; epNumCookie=`);
  if (parts[1]) {
    epNumSelector.value = parts[1].split(';')[0];
  } else {
    epNumSelector.value = 'm';
  }
}
// End Cookies Stuff

// Service Worker
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("service-worker.js");
  });
}
// End Service Worker*/

//Focus Choose Background Label
bgInputLabel.addEventListener("focus", (e) => {
  e.preventDefault();
});

//Make Label Interactive
bgInputLabel.addEventListener("keyup", (e) => {
  if (e.key === "Enter" || e.key === "Spacebar" || e.key === " ") {
    bgInput.click();
  }
});

function addBgImage() {
  let bgImage = new Image();
  bgImage.onload = () => {
    ctx.drawImage(bgImage, 0, 0, 1920, 1080);
    hcLogoToggler.checked ? hcLogo() : null
    epNumSelector.value.length === 0 ? null : episodeNum()
  }
  bgImage.src = URL.createObjectURL(bgInput.files[0]);
}

function episodeNum() {
  let epNum = '#' + epNumSelector.value

  let epNumWidth = ctx.measureText(epNum).width;

  ctx.beginPath();
  ctx.moveTo(0, 1080);
  ctx.lineTo(0, 798.5);
  ctx.lineTo(epNumWidth + 36.5, 816);
  ctx.lineTo(epNumWidth + 97, 1080);
  ctx.lineTo(0, 1080);

  ctx.fillStyle = theGradient;
  ctx.fill();
  ctx.beginPath();

  ctx.fillStyle = "#26150e";
  ctx.textBaseline = "top";

  ctx.fillText(epNum, 14, 840.5);
  ctx.fill();
}

function hcLogo() {
  ctx.drawImage(hc7Logo, 28, 22, 1842.5, 236);
}

function process() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  bgInput.files.length === 0 ? (
    hcLogoToggler.checked ? hcLogo() : null,
    epNumSelector.value.length === 0 ? null : episodeNum()
  ) : addBgImage()
}

function finishEditing() {
  let downloadShow = document.createElement('div');
  downloadShow.className = "downloadShow";
  downloadShow.textContent = "Your thumbnail will be downloaded."
  document.body.appendChild(downloadShow);
  setTimeout(() => {
    downloadShow.style.opacity = "1"
  }, 0)
  setTimeout(() => {
    downloadShow.style.opacity = "0";
    setTimeout(() => {
      document.body.removeChild(downloadShow)
    }, 100)
  }, 5000);

  downloader.download = `Ep${epNumSelector.value} HC7 - Cub's Contraption.jpg`;
  downloader.href = canvas.toDataURL("image/png")
}

// Following code makes any element with class containing 'draggable' draggable
const draggable = document.getElementsByClassName("draggable");

function filter(e) {
  if (!e.target.classList.contains("draggable")) {
    return
  }
  let target = e.target;
  target.moving = true;
  e.clientX ? (target.oX = e.clientX, target.oY = e.clientY) : (target.oX = e.touches[0].clientX, target.oY = e.touches[0].clientY);
  document.onmousemove = drag;
  document.addEventListener("touchmove", drag, {
    passive: false
  });

  function drag(evt) {
    evt.preventDefault();
    if (!target.moving) {
      return
    };
    e.clientX ? (target.lX = evt.clientX - target.oX, target.lY = evt.clientY - target.oY, target.oX = evt.clientX, target.oY = evt.clientY) : (target.lX = evt.touches[0].clientX - target.oX, target.lY = evt.touches[0].clientY - target.oY, target.oX = evt.touches[0].clientX, target.oY = evt.touches[0].clientY);
    target.style.left = target.offsetLeft + target.lX + "px";
    target.style.top = target.offsetTop + target.lY + "px"
  }

  function k() {
    target.moving = false
  };
  target.onmouseup = k;
  target.ontouchend = k
};
document.onmousedown = filter;
document.ontouchstart = filter;
// End draggable saga

// Start multiple captions adder
addCaption.addEventListener('click', addNewCaption)

function captionWriter() {
  ctxCaption.clearRect(0, 0, captionCanvas.width, captionCanvas.height)
  let captions = document.getElementsByClassName('caption');

  for (let i = 0; i < captions.length; i++) {
    let caption = captions[i].value;
    let captionPositionTop = draggable[i].offsetTop * 3;
    let captionPositionLeft = draggable[i].offsetLeft * 3;

    ctxCaption.font = "normal 165px EdGothic";

    const lineHeight = ctxCaption.measureText('|||||').width
    let line = caption.split(/\r?\n/);

    ctxCaption.textBaseline = "top";

    ctxCaption.strokeStyle = "#281604";
    ctxCaption.lineWidth = 24.5;
    ctxCaption.lineJoin = 'round';

    for (let i = 0; i < line.length; i++) {
      const theGradient = ctxCaption.createLinearGradient(
        captionPositionLeft, captionPositionTop + ctxCaption.measureText('|>').width + i * lineHeight, captionPositionLeft, captionPositionTop + ctxCaption.measureText('|||>').width + i * lineHeight);
      theGradient.addColorStop(0, '#ecd319');
      theGradient.addColorStop(1, '#9b4a06');
      ctxCaption.fillStyle = theGradient;
      //ctxCaption.textAlign = 'center';
      ctxCaption.strokeText(line[i], captionPositionLeft, captionPositionTop + i * lineHeight);
      ctxCaption.fillText(line[i], captionPositionLeft, captionPositionTop + i * lineHeight);
    }

    ctxCaption.fill();
    ctxCaption.stroke();
  }
}

function addNewCaption() {
  let newCaptionTextarea = document.createElement('textarea');
  newCaptionTextarea.classList.add('caption');
  newCaptionTextarea.classList.add(cpNo);
  form.appendChild(newCaptionTextarea);

  let newCaptionDiv = document.createElement('div');
  newCaptionDiv.className = 'draggable ' + cpNo;
  cpNo++;
  captionContainer.appendChild(newCaptionDiv);

  captions = document.getElementsByClassName('caption');

  for (let i = 0; i < captions.length; i++) {
    const caption = captions[i];
    caption.addEventListener('input', textAreaToDiv);
    caption.addEventListener('input', captionWriter);
  }
  for (let i = 0; i < draggable.length; i++) {
    const theDraggable = draggable[i];
    theDraggable.addEventListener('mousedown', captionWriter);
    theDraggable.addEventListener('touchstart', captionWriter);
    theDraggable.addEventListener('mouseup', captionWriter);
    theDraggable.addEventListener('touchend', captionWriter);
    theDraggable.addEventListener('mousemove', captionWriter);
    theDraggable.addEventListener('touchmove', captionWriter);

  }
}

function textAreaToDiv(e) {
  document.getElementsByClassName(`draggable  ${e.target.classList[1]}`)[0].textContent = e.target.value;
}
// End multiple caption adder

// Start dark mode saga
let keyCheat = [];
let darkText = "invert"
let oldTime = Date.now();

document.onkeydown = (e) => {
  if (darkText.indexOf(e.key.toLowerCase()) !== -1) {
    let newTime = Date.now();
    if (newTime - oldTime > 1000) {
      keyCheat = []
    }
    oldTime = newTime;

    keyCheat.push(e.key.toLowerCase())
    keyCheat.join('') === "invert" ? (darken(document.body.classList.contains("dark") ? "light" : "dark"), keyCheat = []) : null
  }
}
//End dark mode saga