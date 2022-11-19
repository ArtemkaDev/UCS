#include "usc.h"


nlohmann::json json_conf;
int size;
std::string checker;

void miner(int num) {
	int tryis = 0;
	
	unsigned char hash[SHA256_DIGEST_LENGTH];
	unsigned char hashed[MD5_DIGEST_LENGTH];
	MD5_CTX md5;
	SHA256_CTX sha256;


	MD5_Init(&md5);
	MD5_Update(&md5, 
		std::format("{}", json_conf[std::format("{}", num)]["hash"].get<std::string>()).c_str(), 
		std::format("{}", json_conf[std::format("{}", num)]["hash"].get<std::string>()).size()
	);
	MD5_Final(hashed, &md5);

	SHA256_Init(&sha256);
	SHA256_Update(&sha256, hashed, sizeof(hashed));
	SHA256_Final(hash, &sha256);
	
	while (true) {
		MD5_Init(&md5);
		MD5_Update(&md5, hash, sizeof(hash));
		MD5_Final(hashed, &md5);

		SHA256_Init(&sha256);
		SHA256_Update(&sha256, hashed, sizeof(hashed));
		SHA256_Final(hash, &sha256);

		std::stringstream ss;
		for (int i = 0; i < size / 2; ++i) {
			ss << std::hex << std::setw(2) << std::setfill('0') << static_cast<int>(hash[i]);
		}
		tryis++;
		if (ss.str() == checker) {
			break;
		}
	}
	std::stringstream ss;
	for (int i = 0; i < sizeof(hash); i++) {
		ss << std::hex << std::setw(2) << std::setfill('0') << static_cast<int>(hash[i]);
	}

	json_conf[std::format("{}", num)]["hash"] = ss.str();
	std::cout << std::format("Found! Times: {} \n Hash: {}", tryis, ss.str());
}


int main()
{
	using std::chrono::high_resolution_clock;
	using std::chrono::duration_cast;
	using std::chrono::milliseconds;
	
	std::ifstream file("buffer.json", std::ifstream::in);
	json_conf = nlohmann::json::parse(file);
	json_conf[std::format("{}", 0)]["hash"] = "0000df7e0fbe0cd543351621635bcd43fcd1b8cd24393e9164b5b7769d45b7f3";
	size = 4;
	for (int i = 0; i < size * 2 / 2; i++) {
		checker += "0";
	}
	std::thread f(miner, 0);
	
	auto t1 = high_resolution_clock::now();
	f.join();
	auto t2 = high_resolution_clock::now();
	auto ms_int_m = duration_cast<milliseconds>(t2 - t1);
	std::cout << std::format("\n Mining: {}, \n Result: {}", ms_int_m, json_conf[std::format("{}", 0)]["hash"].get<std::string>()) << std::endl;
	return 0;
}