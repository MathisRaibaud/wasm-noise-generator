# Prevent multiple build
if(TARGET NoiseGenerator)
    return()
endif(TARGET NoiseGenerator)

cmake_minimum_required(VERSION 3.6.0)
project(NoiseGenerator C CXX)

set(CMAKE_CXX_STANDARD 17)

if (EMSCRIPTEN)
    add_definitions("-DEMSCRIPTEN")
endif()

message("Building lib target NoiseGenerator")

file(GLOB_RECURSE NoiseGenerator_sources
        src/NoiseGenerator.cpp)

file(GLOB_RECURSE NoiseGenerator_headers
        include/NoiseGenerator.h)

add_library(NoiseGenerator STATIC
        ${NoiseGenerator_sources}
        ${NoiseGenerator_headers})

target_include_directories(NoiseGenerator
        PUBLIC ${CMAKE_CURRENT_SOURCE_DIR}/include)
