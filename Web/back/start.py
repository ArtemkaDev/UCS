import subprocess
import hashlib, base64, os, time
from Crypto import Random
from Crypto.Cipher import AES
from dotenv import load_dotenv
load_dotenv()

DS_TOKEN = os.getenv("DISCORD_TOKEN")




class AESCipher(object):

    def __init__(self, key): 
        self.bs = AES.block_size
        self.key = hashlib.sha256(key.encode()).digest()
        self.__tester = "hGiVQXmLLuhsnxwnvC0GnYHod9sPQbDTwV7hcUV/GhY=" # DWA

    def encrypt(self, raw):
        raw = self._pad(raw)
        iv = Random.new().read(AES.block_size)
        cipher = AES.new(self.key, AES.MODE_CBC, iv)
        return base64.b64encode(iv + cipher.encrypt(raw.encode())).decode("utf-8")

    def decrypt(self, enc):
        enc = base64.b64decode(enc)
        iv = enc[:AES.block_size]
        cipher = AES.new(self.key, AES.MODE_CBC, iv)
        return self._unpad(cipher.decrypt(enc[AES.block_size:])).decode('utf-8')

    def _pad(self, s):
        return s + (self.bs - len(s) % self.bs) * chr(self.bs - len(s) % self.bs)

    def checker(self, cipher):
        if cipher == self.decrypt(self.__tester):
            return True
        else:
            return False

    @staticmethod
    def _unpad(s):
        return s[:-ord(s[len(s)-1:])]

def main():
    while True:
        while True:
            default_key = input("Password: ")  # Artemka password hash md5
            if len(default_key) <= 1:
                continue
            else:
                break
        aes = AESCipher(default_key)
        if aes.checker("DWA"):
            break
        else:
            print("Error password")
    # Пароль нормальний
    
    ds_token = aes.decrypt(DS_TOKEN)
    
    print(ds_token)
    
    p = subprocess.Popen(['node', './main.js', f'--discord="{ds_token}"'], stdout=subprocess.PIPE)
    print(p.stdout.read())
    


if __name__ == '__main__':
    main()