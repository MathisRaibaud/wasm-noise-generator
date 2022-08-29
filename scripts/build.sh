#!/bin/bash

# exit when any command fails
set -e

# repository root directory
root_dir=$(git rev-parse --show-toplevel)

# Build C++ library
echo -e "\033[0;32m *** Build C++ library *** \033[0m"
build_dir=$root_dir"/cpp/build"
rm -rf $build_dir
mkdir $build_dir
emcmake cmake -S $root_dir/cpp -B $build_dir
cmake --build $build_dir --target NoiseGenerator

# Build WASM/JS
echo -e "\033[0;32m *** Build WASM/JS *** \033[0m"
js_dir=$root_dir/js
emcc \
    --bind \
    --post-js $js_dir/utils/export-es6.js \
    -s SINGLE_FILE=1 \
    -s WASM=1 \
    -s WASM_ASYNC_COMPILATION=0 \
    -s INITIAL_MEMORY=128MB \
    -s ENVIRONMENT=web,worker,audioworklet \
    -s USE_PTHREADS=1 \
    -pthread \
    -Wl,--whole-archive $build_dir/libNoiseGenerator.a -Wl,--no-whole-archive \
    -o $js_dir/worklet/NoiseGenerator.wasmmodule.js \

echo -e "\033[0;32m *** Build succeed ! *** \033[0m"
echo -e "\033[0;32m *** You can run in the browser by calling \"emrun public/index.html --browser chrome\" ! *** \033[0m"