const bgInput = document.getElementById('bgInput');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const output = document.getElementById('output');
const getImage = document.getElementById('getImage');
const epNumEnter = document.getElementById('epNumSelector');

getImage.addEventListener('click', finishEditing.bind())

function editOnCanvas(event) {
    let bgImage = new Image();
    bgImage.addEventListener('load', () => {
        ctx.drawImage(bgImage, 0, 0, 1920, 1280);
    }, false);

    bgImage.src = URL.createObjectURL(event.target.files[0]);
}

function episodeNum() {
    let epNum = epNumEnter.value;

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

function finishEditing() {
    let image = canvas.toDataURL();
    output.src = image;
}
