#include "usc-lib.h"
#include <openssl/md5.h>
#include <openssl/sha.h>
#include <nlohmann/json.hpp>

extern char* hash_out = nullptr;


extern "C" __declspec(dllexport) char* minercpp(char* hashed, int size) {
	printf("s%", hashed);
	std::string result;
	unsigned char* hash_input = new unsigned char[sizeof(hashed)];
	strcpy((char*)hash_input, hashed);


	unsigned char md5digest[MD5_DIGEST_LENGTH];
	unsigned char sha256digest[SHA256_DIGEST_LENGTH];
	int tryis = 0;
	
	nlohmann::json state{};
	while (true) {
		MD5_CTX md5handler;
		MD5_Init(&md5handler);
		MD5_Update(&md5handler, hash_input, sizeof(hashed));
		MD5_Final(md5digest, &md5handler);

		SHA256_CTX sha256handler;
		SHA256_Init(&sha256handler);
		SHA256_Update(&sha256handler, md5digest, MD5_DIGEST_LENGTH);
		SHA256_Final(sha256digest, &sha256handler);
		result.assign(hashed, strlen(hashed));
		tryis++;
		hash_out = hashed;
		if (result.find_first_of("0", size)) {
			break;
		}
	}
	state["tryis"] = tryis;
	state["hash"] = hash_out;
	char* cstr = new char[state.dump().length() + 1];
	strcpy(cstr, state.dump().c_str());
	return cstr;
	delete[] cstr;
}