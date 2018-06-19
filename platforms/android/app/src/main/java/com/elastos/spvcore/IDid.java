
package com.elastos.spvcore;


public class IDid {
    private long mDidProxy = 0;

    public IDid(long proxy) {
        mDidProxy = proxy;
    }

    public String GetDIDName() {
        return nativeGetDIDName(mDidProxy);
    }

    public void SetValue(String keyPath, /*const nlohmann::json*/String valueJson) {
        nativeSetValue(mDidProxy, keyPath, valueJson);
    }

    public /*nlohmann::json*/ String GetValue(String path) {
        return nativeGetValue(mDidProxy, path);
    }

    public /*nlohmann::json*/ String GetHistoryValue(String keyPath) {
        return nativeGetHistoryValue(mDidProxy, keyPath);
    }

    public /*nlohmann::json*/ String GetAllKeys(int start, int count) {
        return nativeGetAllKeys(mDidProxy, start, count);
    }

    public String Sign(String message) {
        return nativeSign(mDidProxy, message);
    }

    public /*nlohmann::json*/ String CheckSign(String publicKey, String message, String signature) {
        return nativeCheckSign(mDidProxy, publicKey, message, signature);
    }

    public String GetPublicKey() {
        return nativeGetPublicKey(mDidProxy);
    }

    private native String nativeGetDIDName(long proxy);
    private native void nativeSetValue(long proxy, String keyPath, String valueJson);
    private native String nativeGetValue(long proxy, String path);
    private native String nativeGetHistoryValue(long proxy, String keyPath);
    private native String nativeGetAllKeys(long proxy, int start, int count);
    private native String nativeSign(long proxy, String message);
    private native String nativeCheckSign(long proxy, String publicKey, String message, String signature);
    private native String nativeGetPublicKey(long proxy);
}
