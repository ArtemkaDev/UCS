#include <nlohmann/json.hpp>
#include <openssl/md5.h>
#include <openssl/sha.h>
#include <fstream>
#include <thread>
#include <iostream>

extern nlohmann::json json_conf;
extern int size;