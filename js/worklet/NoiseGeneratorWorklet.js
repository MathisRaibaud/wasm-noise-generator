import Module from './NoiseGenerator.wasmmodule.js';
import WASMAudioBuffer from '../utils/WASMAudioBuffer.js';

 // Web Audio API's render block size
 const NUM_FRAMES = 128;

class NoiseGeneratorWorklet extends AudioWorkletProcessor {

  constructor() {
    super();
    this.noiseGenerator = new Module.NoiseGenerator();
    this.wasmBufferLeft = new WASMAudioBuffer(Module, NUM_FRAMES, 1, 1);
    this.wasmBufferRight = new WASMAudioBuffer(Module, NUM_FRAMES, 1, 1);
    this.port.onmessage = this.onMessageFromMainScope.bind(this);
    this.port.postMessage({'gain' : this.noiseGenerator.getGain()});
  }

  process(inputs, outputs, parameters) {
     
     const outputBufferLeft = outputs[0][0];
     const outputBufferRight = outputs[0][1];
 
     this.noiseGenerator.getNextAudioBlock(this.wasmBufferLeft.getPointer(), this.wasmBufferRight.getPointer(), NUM_FRAMES);
     outputBufferLeft.set(this.wasmBufferLeft.getF32Array());
     outputBufferRight.set(this.wasmBufferRight.getF32Array());
 
     return true;
  }

  onMessageFromMainScope(message) {
    if (typeof message.data.gain !== 'undefined') {
      this.noiseGenerator.setGain(message.data.gain);
    }
  }
}
  
registerProcessor('NoiseGeneratorWorklet', NoiseGeneratorWorklet);