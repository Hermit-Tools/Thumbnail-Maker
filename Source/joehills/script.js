const bgInput = document.getElementById("bgInput");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const epNumSelector = document.getElementById("epNumSelector");
const hcLogoToggler = document.getElementById("hcLogoToggler");
const previewText = document.getElementById("preview-text");
const downloader = document.getElementById("downloader");
const addCaption = document.getElementById("addCaption");
const form = document.getElementById("form");
const captionContainer = document.getElementById("caption-container");

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
  let epNum = '#' + epNumSelector.value

  ctx.font = "normal 250px EdGothic";
  let epNumWidth = ctx.measureText(epNum).width;

  const theGradient = ctx.createLinearGradient(0, 816, 0, 1080);
  //theGradient.addColorStop(0, '#9a6105');
  //theGradient.addColorStop(1, '#a16d03');
  //theGradient.addColorStop(0, '#c6b90c');
  theGradient.addColorStop(0, '#a66c02');
  theGradient.addColorStop(0.5, '#caa205');
  theGradient.addColorStop(1, '#e9cd07');

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
  if (hcLogoToggler.checked) {
    let hc7Logo = new Image();
    hc7Logo.addEventListener("load", () => {
      ctx.drawImage(hc7Logo, 28, 22, 1842.5, 236);
    });
    hc7Logo.src =
      "https://hermit-tools.github.io/Thumbnail-Maker/Resources/Hermitcraft Logos/HC7 Logo.png";
    hc7Logo.crossOrigin = "Anonymous";
  }
}

let captionCanvas = document.getElementById('captionCanvas');
let ctxCaption = captionCanvas.getContext('2d');
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

function process() {
  //ctx.fillStyle = "#fff";
  //ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  if (bgInput.files.length != 0) {
    addBgImage();
  } else {
    hcLogo();
    if (epNumSelector.value.length !== 0) {
      episodeNum();
    }
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

// Following code makes any element with class containing 'draggable' draggable
const draggable = document.getElementsByClassName("draggable");
for (let i = 0; i < draggable.length; i++) {
  draggable[i].style.position = "absolute";
}

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
cpNo = 1;
addCaption.addEventListener('click', addNewCaption)

function addNewCaption() {
  let newCaptionTextarea = document.createElement('textarea');
  newCaptionTextarea.classList.add('caption');
  newCaptionTextarea.classList.add(cpNo);
  form.appendChild(newCaptionTextarea);

  let newCaptionDiv = document.createElement('div');
  newCaptionDiv.className = 'draggable ' + cpNo;
  cpNo++;
  captionContainer.appendChild(newCaptionDiv);
  for (let i = 0; i < captions.length; i++) {
    const caption = captions[i];
    caption.addEventListener('input', textAreaToDiv);
    caption.addEventListener('input', captionWriter);
  }
  for (let i = 0; i < draggable.length; i++) {
    draggable[i].addEventListener('mousedown', captionWriter);
    draggable[i].addEventListener('touchstart', captionWriter);
    draggable[i].addEventListener('mouseup', captionWriter);
    draggable[i].addEventListener('touchend', captionWriter);
    draggable[i].addEventListener('mousemove', captionWriter);
    draggable[i].addEventListener('touchmove', captionWriter);

  }
}
let captions = document.getElementsByClassName('caption');

function textAreaToDiv(e) {
  const captionId = e.target.className.split(' ')[1];
  const captionDiv = document.getElementsByClassName('draggable ' + captionId);
  captionDiv[0].textContent = e.target.value;
}
// End multiple caption adder