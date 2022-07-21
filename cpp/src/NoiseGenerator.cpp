#include <NoiseGenerator/NoiseGenerator.h>
#include <algorithm>

NoiseGenerator::NoiseGenerator(): gain_(0.0f) {}

void NoiseGenerator::getNextAudioBlock(uintptr_t output_ptr_left, uintptr_t output_ptr_right, int nb_frames) const 
{
    float* output_left = reinterpret_cast<float*>(output_ptr_left);
    float* output_right = reinterpret_cast<float*>(output_ptr_right);

    for (int i = 0; i < nb_frames; ++i)
    {
        const float noise = gain_ * static_cast<float>(rand()) / static_cast<float>(RAND_MAX) * 2.0f - 1.0f;
        output_left[i] = output_right[i] = noise;
    }
}

void NoiseGenerator::setGain(float gain)
{
    std::clamp(gain, 0.0f, 1.0f);
    gain_ = gain;
}

float NoiseGenerator::getGain() const
{
    return gain_;
}
