const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

function getVideo() {
    //--- Video Setup ---
    navigator.mediaDevices.getUserMedia({ video: true, audio: false})
        .then(localMediaStream => {
            console.log(localMediaStream);
            //video.src = window.URL.createObjectURL(localMediaStream);
            video.srcObject = localMediaStream;
            video.play();
        })
        .catch(err => {
            console.log(`Error: Webcam access may have been denied`, err);
        });
}

function paintToCanvas() {
    const width = video.videoWidth;
    const height = video.videoHeight;
    //console.log(width, height);
    canvas.width = width;
    canvas.height = height;

    return setInterval(() => {
        ctx.drawImage(video, 0, 0, width, height);

        // Get pixels
        let pixels = ctx.getImageData(0, 0, width, height);

        // Modify the pixels
        // pixels = redEffect(pixels);

        // pixels = rgbSplit(pixels);
        // ghosting effect: show previous image for 10 more frames
        // ctx.globalAlpha = 0.1;

        pixels = greenScreen(pixels);

        // Put back new pixels
        ctx.putImageData(pixels, 0, 0);
    }, 16);
}

function takePhoto() {
    //-- Play sound
    snap.currentTime = 0;
    snap.play();

    //-- Take data out of canvas
    const data = canvas.toDataURL('image/jpeg');
    const link = document.createElement('a');
    link.href = data;
    link.setAttribute('download', 'handsome');
    //link.textContent = 'Download image';
    link.innerHTML = `<img src="${data}" alt="Handsome man" />`;
    strip.insertBefore(link, strip.firstChild);
}

function redEffect(pixels) {
    // pixels[0],[1],[2],[3] is the Red Green Blue Alpha pixel value
    // pixels[4],[5],[6],[7] is the next RGB pixel value
    // * NOTE: pixels.data is the array!
    for (let i=0; i < pixels.data.length; i+=4) {
        pixels.data[i]   = pixels.data[i]   + 100;  // Red
        pixels.data[i+1] = pixels.data[i+1] - 50;   // Green
        pixels.data[i+2] = pixels.data[i+2] * 0.5;  // Blue
    }
    return pixels;
}

function rgbSplit(pixels) {
    for (let i=0; i < pixels.data.length; i+=4) {
        pixels.data[i - 150] = pixels.data[i];    // Red
        pixels.data[i + 100] = pixels.data[i+1];  // Green
        pixels.data[i - 150] = pixels.data[i+2];  // Blue
    }
    return pixels;
}

function greenScreen() {
    const levels = {};

    document.querySelectorAll('.rgb input').forEach((input) => {
        levels[input.name] = input.value;
    });

    for (i=0; i < pixels.data.length; i+=4) {
        red   = pixels.data[i + 0];
        green = pixels.data[i + 1];
        blue  = pixels.data[i + 2];
        alpha = pixels.data[i + 3];

        if (red   >= levels.rmin &&
            green >= levels.gmin &&
            blue  >= levels.bmin &&
            red   <= levels.rmax &&
            green <= levels.gmax &&
            blue  <= levels.bmax
            ) {
                // Take out the pixel and make it transparent
                pixels.data[i + 3] = 0;
        }

    }
}

getVideo();


//----- Event Listeners -----
video.addEventListener('canplay', paintToCanvas);