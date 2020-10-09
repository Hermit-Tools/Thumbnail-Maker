const bgInput = document.getElementById("bgInput");
const bgInputLabel = document.getElementById("bgInputLabel");
const epNumSelector = document.getElementById("epNumSelector");
const hcLogoToggler = document.getElementById("hcLogoToggler");

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const downloader = document.getElementById("downloader");

const hc7Logo = new Image();
hc7Logo.src =
  "https://hermit-tools.github.io/Thumbnail-Maker/Resources/Hermitcraft Logos/HC7 Logo.png";
hc7Logo.crossOrigin = "Anonymous";

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


// Cookies Stuff
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

// Service Worker
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("service-worker.js");
  });
}

function addBgImage() {
  let bgImage = new Image();
  bgImage.src = URL.createObjectURL(bgInput.files[0]);
  bgImage.onload = () => {
    ctx.drawImage(bgImage, 0, 0, 1920, 1080);
    hcLogoToggler.checked ? hcLogo() : null
    epNumSelector.value.length === 0 ? null : episodeNum()
  }
}

function episodeNum() {
  let epNum = epNumSelector.value;

  ctx.fillStyle = "#fff";
  ctx.strokeStyle = "#000";
  ctx.lineWidth = 12;
  ctx.font = "1000 401px Tahoma";
  ctx.textBaseline = "bottom";

  ctx.save();
  ctx.scale(1.05, 0.98);
  ctx.fillText(epNum, 15, 1120);
  ctx.strokeText(epNum, 15, 1120);
  ctx.restore();

  ctx.fill();
  ctx.stroke();
}

function hcLogo() {
  ctx.drawImage(hc7Logo, 15.7, 40, 1887.5, 244);
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

  downloader.download = `Ep${epNumSelector.value} HC7 Cub's Contraption.jpg`;
  downloader.href = canvas.toDataURL("image/png")
}

let keyCheat = [];
let darkText = "invert"
let oldTime = Date.now();

document.onkeydown = (e) => {
  if (darkText.indexOf(e.key.toLowerCase()) !== -1) {
    let newTime = Date.now();
    if (newTime - oldTime > 1000) { keyCheat = [] }
    oldTime = newTime;
  
    keyCheat.push(e.key.toLowerCase())
    keyCheat.join('') === "invert" ? (darken(), keyCheat = []) : null
  }
}
 // Set Theme If Exists
 if (localStorage.getItem("theme")) {
  if (localStorage.getItem("theme") == "dark") {
    darken();
  }
} else {
  // Set Theme To Default
  localStorage.setItem("theme", "light");
}
async function darken() {
  document.body.classList.toggle('dark')
  // Check Theme and Save in Local Storage
  if(document.body.classList.contains("dark")) {
    localStorage.setItem("theme", "dark")
  } else {
    localStorage.setItem("theme", "light")
  }
}
