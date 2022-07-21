# wasm-noise-generator
A C++ noise generator compiled to WebAssembly with emscripten running in the browser.

⚠️ This project has only been tested on macOS.

## Required tools

To build this project, you need to have the following tools installed:
- git 
- cmake
- emscripten

## How to build and run?

Run the build script with:

```bash
./scripts/build.sh
```

It compiles the C++ library with emscripten and creates the WebAssembly module of the C++ library.

Then, to launch in the browser, run:

```bash
emrun js/index.html --browser chrome
```

⚠️ This project only works on Chrome (or Chrome-based browsers).

