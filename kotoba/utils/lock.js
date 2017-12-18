const crypto = require('crypto');

class key{
	static async encode(str){
		//盐加密
		const salt = str.substring(2,5)
		const enc = crypto.createHmac('sha256',salt).update(str).digest('hex')
		return enc;
	}
}
module.exports = key;