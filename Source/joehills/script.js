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
  let epNum;
  if (epNumSelector.value.length === 0) {
    epNum = '';
  } else {epNum = '#' + epNumSelector.value}

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
  ctx.moveTo(0,1080);
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

function captionWriter() {
  let captions = document.getElementsByClassName('caption');

  for (let i = 0; i < captions.length; i++) {
    let caption = captions[i].value;

    ctx.font = "normal 165px EdGothic";

    const lineHeight = ctx.measureText('|||||').width
    let line = caption.split(/\r?\n/);

    ctx.textBaseline = "top";

    ctx.strokeStyle = "#281604";
    ctx.lineWidth = 24.5;
    ctx.lineJoin = 'round';
    
    for (let i = 0; i < line.length; i++) {
      const theGradient = ctx.createLinearGradient(
        0, ctx.measureText('|>').width + i * lineHeight, 0, ctx.measureText('|||>').width + i * lineHeight);
      theGradient.addColorStop(0, '#ecd319');
      theGradient.addColorStop(1, '#9b4a06');
      ctx.fillStyle = theGradient;
      //ctx.textAlign = 'center';
      ctx.strokeText(line[i], 0, 0 + i * lineHeight);
      ctx.fillText(line[i], 0, 0 + i * lineHeight);
    }

    ctx.fill();
    ctx.stroke();
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

draggable = document.getElementById('draggable');

let oldX = 0;
let oldY = 0;
let distX = 0;
let distY = 0;
let dragElement;

function drag(event) {
  event.preventDefault();
  distX = event.clientX - oldX;
  distY = event.clientY - oldY;
  oldX = event.clientX;
  oldY = event.clientY;
  if (dragElement.isMoving) {
    dragElement.style.left = (dragElement.offsetLeft + distX) + 'px';
    dragElement.style.top = (dragElement.offsetTop + distY) + 'px';
  }
}
function stopDrag() {
  dragElement.isMoving = false;
}
function draggableGuard(evt) {
  if (evt.target.classList.contains('draggable')) {
    dragElement = evt.target;
    dragElement.isMoving = true;
    oldX = evt.clientX;
    oldY = evt.clientY;
    document.addEventListener('mousemove', drag)
    dragElement.addEventListener('mouseup', stopDrag)
  }
}
document.body.addEventListener('mousedown', draggableGuard);
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
  }
}
let captions = document.getElementsByClassName('caption');
function textAreaToDiv(e) {
  const captionId = e.target.className.split(' ')[1];
  const captionDiv = document.getElementsByClassName('draggable ' + captionId);
  captionDiv[0].textContent = e.target.value;
}