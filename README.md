# wasm-noise-generator
A C++ noise generator compiled to WebAssembly with emscripten running in the browser.

⚠️ This project has only been tested on macOS.

## Required tools

To build this project, you need to have the following tools installed:
- git 
- cmake
- emscripten

## How to build and run?

Activate emscripten in your current terminal:

```bash
# Activate emscripten in the current terminal
source path/to/emscripten/emsdk_env.sh

# Compile the C++ library with emscripten and creates the WebAssembly module of the C++ library.
./scripts/build.sh

# Launch the demo in the browser
emrun js/index.html --browser chrome
```

⚠️ This project only works on Chrome (or Chrome-based browsers).

