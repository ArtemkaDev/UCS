cmake_minimum_required (VERSION 3.8)

project ("usc")

add_executable (usc "usc.cpp" "usc.h")

if (CMAKE_VERSION VERSION_GREATER 3.12)
  set_property(TARGET usc PROPERTY CXX_STANDARD 20)
endif()

find_package(OpenSSL REQUIRED)
target_link_libraries(usc PRIVATE OpenSSL::SSL OpenSSL::Crypto)

find_package(nlohmann_json CONFIG REQUIRED)
target_link_libraries(usc PRIVATE nlohmann_json::nlohmann_json)
