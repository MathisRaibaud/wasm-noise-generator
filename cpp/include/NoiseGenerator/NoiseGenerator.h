#include <string>

class NoiseGenerator {
public:
    NoiseGenerator();

    void getNextAudioBlock(uintptr_t output_ptr_left, uintptr_t output_ptr_right, int nb_frames) const;

    void setGain(float gain);
    float getGain() const;

private:
    float gain_;
};


#if EMSCRIPTEN

#include <emscripten/bind.h>

EMSCRIPTEN_BINDINGS(NoiseGenerator) {
  emscripten::class_<NoiseGenerator>("NoiseGenerator")
    .constructor()
    .function("getNextAudioBlock", &NoiseGenerator::getNextAudioBlock, emscripten::allow_raw_pointers())
    .function("setGain", &NoiseGenerator::setGain)
    .function("getGain", &NoiseGenerator::getGain)
    ;
}

#endif
