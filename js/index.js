let context = null;
let noiseNode = null;

function onWindowLoad() {
    document.addEventListener('click', async () => {
        await initializeAudio();
        document.getElementById('content').innerHTML = '<center><webaudio-knob id="knobGain" src="./webaudio-controls/knobs/LittlePhatty.png" min="0" max="1" value="1" step="0.01"></webaudio-knob></center>';
        document.getElementById('knobGain').oninput = function() {
            noiseNode.port.postMessage({'gain' : this.value});
        }
        noiseNode.port.onmessage = function (message) {
            onMessageFromAudioScope(message);
        }
    }, {once: true});
}

async function initializeAudio() {
    context = new AudioContext();
    console.log("ljfjf");
    await context.audioWorklet.addModule('./worklet/NoiseGeneratorWorklet.js')
    console.log("l");
    noiseNode = new AudioWorkletNode(context, 'NoiseGeneratorWorklet', {outputChannelCount : [2]});
    console.log("ll");
    noiseNode.connect(context.destination);
    console.log("lll");
}

function onMessageFromAudioScope(message) {
    if (typeof message.data.gain !== 'undefined') {
        document.getElementById('knobGain').value = message.data.gain;
    }
}

window.addEventListener('load', () => onWindowLoad());