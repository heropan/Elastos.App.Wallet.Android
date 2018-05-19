import {Injectable} from '@angular/core';
import {randomBytes, createHash} from 'crypto-browserify';
import secp256k1 from 'secp256k1';


/***
 * 签名验证相关
 */
@Injectable()
export class AuthManager {

  constructor() {

  }

  public static test(): void {
    const msg = randomBytes(32);
    console.log();
    // const msg = this.hash("我是哈哈哈");
    let privKey;
    do {
      privKey = randomBytes(32)
    } while (!secp256k1.privateKeyVerify(privKey));

    const pubKey = secp256k1.publicKeyCreate(privKey);

    const sigObj = this.sign(msg, privKey);

    console.log("privKey:" + privKey);
    console.log("pubKey:" + pubKey);
    console.log("sign:" + sigObj);
    console.log("verify:" + this.verify(msg, sigObj.signature, pubKey));


  }


  public static sign(msg, privKey): any {
    //console.log(Buffer.from(msg,Buffer.byteLength(msg)));
    return secp256k1.sign(msg, privKey);
  }

  public static verify(msg, signature, pubKey): boolean {
    return secp256k1.verify(msg, signature, pubKey)
  }

  public static hash(msg) {
    return createHash('sha256').update(msg).digest('hex');
  }

  public static stringToByte(str) {
    var bytes = new Array();
    var len, c;
    len = str.length;
    for (var i = 0; i < len; i++) {
      c = str.charCodeAt(i);
      if (c >= 0x010000 && c <= 0x10FFFF) {
        bytes.push(((c >> 18) & 0x07) | 0xF0);
        bytes.push(((c >> 12) & 0x3F) | 0x80);
        bytes.push(((c >> 6) & 0x3F) | 0x80);
        bytes.push((c & 0x3F) | 0x80);
      } else if (c >= 0x000800 && c <= 0x00FFFF) {
        bytes.push(((c >> 12) & 0x0F) | 0xE0);
        bytes.push(((c >> 6) & 0x3F) | 0x80);
        bytes.push((c & 0x3F) | 0x80);
      } else if (c >= 0x000080 && c <= 0x0007FF) {
        bytes.push(((c >> 6) & 0x1F) | 0xC0);
        bytes.push((c & 0x3F) | 0x80);
      } else {
        bytes.push(c & 0xFF);
      }
    }
    return bytes;


  }


  public static byteToString(arr) {
    if (typeof arr === 'string') {
      return arr;
    }
    var str = '',
      _arr = arr;
    for (var i = 0; i < _arr.length; i++) {
      var one = _arr[i].toString(2),
        v = one.match(/^1+?(?=0)/);
      if (v && one.length == 8) {
        var bytesLength = v[0].length;
        var store = _arr[i].toString(2).slice(7 - bytesLength);
        for (var st = 1; st < bytesLength; st++) {
          store += _arr[st + i].toString(2).slice(2);
        }
        str += String.fromCharCode(parseInt(store, 2));
        i += bytesLength - 1;
      } else {
        str += String.fromCharCode(_arr[i]);
      }
    }
    return str;
  }
}





