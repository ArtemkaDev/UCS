const crypto = require("crypto");

class Crypto {
  constructor(options) {
    this.token = "";
    this.tester = "RhwKxCR2xCjChl/nraxyTAc341+u+I1ZfBnusGIQmPQtvV2S4rz8ScykVWoea937I20zCmb5yS5GW/6iZW6+ZQ==";
    this.iv = crypto.randomBytes(16);
    this.updating = false;

    setInterval(async () => {
        this.updating = true;
        this.iv = crypto.randomBytes(16);
        this.updating = false;
    }, process.env.TICKMS);
  }

  checker(token) {
    if (
      this.decode(
        this.tester,
        token
      ) == token
    ) {
        this.token = token;
        return true
    } else return false;
  }



  encode (input, key = this.token) {
    while (iv.changing === true) {}
    key = crypto.createHash("sha256").update(String(key)).digest("base64");
    const cipher = crypto.createCipheriv(
      "aes-256-gcm",
      Buffer.from(key, "base64"),
      iv.data
    );
    let encrypt = cipher.update(input, "utf-8", "hex");
    encrypt += cipher.final("hex");

    return Buffer.from(
      iv.data.toString("hex") + encrypt + cipher.getAuthTag().toString("hex"),
      "hex"
    ).toString("base64");
  }

  decode (value, secret=this.token) {
    const payload = Buffer.from(
      value.toString("base64"), "base64"
      ).toString("hex");

    const IV = payload.substr(0, 32);
    const encrypt = payload.substr(32, payload.length - 32 - 32);
    const auth = payload.substr(payload.length - 32, 32);

    secret = crypto.createHash("sha256").update(String(secret)).digest("base64");

    const decipher = crypto.createDecipheriv(
      "aes-256-gcm",
      Buffer.from(secret, "base64"),
      Buffer.from(IV, "hex")
    );

    decipher.setAuthTag(Buffer.from(auth, "hex"))
    let decrypted = decipher.update(encrypt, "hex", "utf-8");
    decrypted += decipher.final('utf-8')

    return decrypted
  }

}

module.exports = new Crypto();
