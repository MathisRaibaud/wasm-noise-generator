let context = null;
let noiseNode = null;

const gainControl = document.querySelector('.gain-control');
const gainValue = document.querySelector('.gain-value');

function onWindowLoad() {
    document.addEventListener('click', async () => {
        await initializeAudio();
        noiseNode.port.onmessage = function (message) {onMessageFromAudioScope(message);}
    }, {once: true});
}

async function initializeAudio() {
    context = new AudioContext();
    await context.audioWorklet.addModule('./worklet/NoiseGeneratorWorklet.js')
    noiseNode = new AudioWorkletNode(context, 'NoiseGeneratorWorklet', {outputChannelCount : [2]});
    noiseNode.connect(context.destination);
}

gainControl.oninput = function() {
    let gain = Number(gainControl.value);
    noiseNode.port.postMessage( {'gain' : gain} );
    gainValue.innerHTML = gainControl.value;
}

function onMessageFromAudioScope(message) {
    if (typeof message.data.gain !== 'undefined') {
        gainControl.value = message.data.gain;
        gainValue.innerHTML = gainControl.value;
    }
}

window.addEventListener('load', () => onWindowLoad());