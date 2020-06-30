const bgInput = document.getElementById('bgInput');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const epNumSelector = document.getElementById('epNumSelector');
const hcLogoToggler = document.getElementById('hcLogoToggler');
const previewText = document.getElementById('preview-text');

function editOnCanvas() {
    let bgImage = new Image();
    bgImage.addEventListener('load', () => {
        ctx.drawImage(bgImage, 0, 0, 1920, 1280);
        hcLogo();
        episodeNum();
    }, false);

    bgImage.src = URL.createObjectURL(bgInput.files[0]);
}

function episodeNum() {
    let epNum = epNumSelector.value;

    ctx.fillStyle = '#fff';
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 7;
    ctx.font = 'bold 300px Tahoma';
    ctx.textBaseline = 'bottom';

    ctx.fillText(epNum, 20, 1270);
    ctx.strokeText(epNum, 20, 1270);
    ctx.fill();
    ctx.stroke();
}

function hcLogo() {
    if (hcLogoToggler.checked) {
        let hc7Logo = new Image()
        hc7Logo.addEventListener('load', () => {
            ctx.drawImage(hc7Logo, 40, 10, 1800, 230)
        })
        hc7Logo.src = ("https://hermit-tools.github.io/Thumbnail-Maker/hc7logobydnator.png");
        hc7Logo.crossOrigin = 'Anonymous';
    }
}

function finishEditing() {
    document.getElementById("downloader").href = canvas.toDataURL("image/png").replace('data:image/png', 'data:concorp>sahara');
}

function process() {
    ctx.fillStyle = '#fff'
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    if (bgInput.files.length != 0) {
        editOnCanvas();
    } else {
        hcLogo();
        episodeNum();
    }
}
//Cookies stuff start here
document.getElementById('set-cookie').addEventListener('click', () => {
    console.log(`setting cookies started`);
    document.cookie = "epNumCookie=2";
    console.log(`setting cookies done`);
    console.log(document.cookie);
    
    //const preepNumCookie = document.cookie.split('=');
    //const epNumCookie = preepNumCookie[1].split(';');
    //console.log(preepNumCookie);
    //console.log(epNumCookie[0]);
})
