const bgInput = document.getElementById('bgInput');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const output = document.getElementById('output');
const getImage = document.getElementById('getImage');

getImage.addEventListener('click', finishEditing.bind())

function editOnCanvas(event) {
    let img = new Image();
    img.addEventListener('load', function () {
        ctx.drawImage(img, 0, 0, 1920, 1280);

        episodeNum();
    }, false);

    img.src = URL.createObjectURL(event.target.files[0]);
}

function episodeNum() {
    ctx.fillStyle = '#fff';
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 4;
    ctx.font = '300px Verdana';
    ctx.textBaseline = 'bottom';
    ctx.fillText('30', 20, 1270);
    ctx.strokeText('30', 20, 1270);
    ctx.fill();
    ctx.stroke();
}

function finishEditing() {
    let image = canvas.toDataURL();
    output.src = image;
    console.log(',,a');
}
