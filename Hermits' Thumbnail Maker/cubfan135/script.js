const bgInput = document.getElementById('bgInput');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const output = document.getElementById('output');
const getImage = document.getElementById('getImage');
const epNumSelector = document.getElementById('epNumSelector');
const hcLogoToggler = document.getElementById('hcLogoToggler');

getImage.addEventListener('click', finishEditing.bind())

function editOnCanvas(event) {
    let bgImage = new Image();
    bgImage.addEventListener('load', () => {
        ctx.drawImage(bgImage, 0, 0, 1920, 1280);
    }, false);

    bgImage.src = URL.createObjectURL(event.target.files[0]);
}

function episodeNum() {
    let epNum = epNumSelector.value;

    ctx.fillStyle = '#fff';
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 4;
    ctx.font = '300px Verdana';
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
        //hc7Logo.src = ("https://raw.githubusercontent.com/mmaismma/mmaismma.github.io/master/Hermits'%20Thumbnail%20Maker/cubfan135/hc7dnatorlogo.png")
        hc7Logo.src = ("C:/Users/Default.DESKTOP-MA0BUE7/Documents/hc7dnatorlogo.png")
    }
}

function finishEditing() {
    let image = canvas.toDataURL();
    output.src = image;
}
