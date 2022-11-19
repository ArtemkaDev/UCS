 cmake_minimum_required (VERSION 3.8)
set (CMAKE_BUILD_TYPE Debug)

project (Usc-Lib)

include_directories (include ${PROJECT_BINARY_DIR})
include (GenerateExportHeader)
file (GLOB SOURCES "src/*.cpp")

add_library(Usc-Lib SHARED ${SOURCES})

find_package(OpenSSL REQUIRED)
target_link_libraries(Usc-Lib PRIVATE OpenSSL::SSL OpenSSL::Crypto)

find_package(nlohmann_json CONFIG REQUIRED)
target_link_libraries(Usc-Lib PRIVATE nlohmann_json::nlohmann_json)

GENERATE_EXPORT_HEADER (Usc-Lib
    BASE_NAME Usc-Lib
    EXPORT_MACRO_NAME Usc-Lib_EXPORT
    EXPORT_FILE_NAME Usc-Lib_Export.h
    STATIC_DEFINE Usc-Lib_BUILT_AS_STATIC
)
