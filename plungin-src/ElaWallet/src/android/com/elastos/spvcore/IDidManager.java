
package com.elastos.spvcore;


public class IDidManager {
    private long mDidManagerProxy = 0;
    IDidManager(long proxy) {
        mDidManagerProxy = proxy;
    }

    public IDid CreateDID(String password) {
        long proxy = nativeCreateDID(mDidManagerProxy, password);
        IDid did = new IDid(proxy);
        return did;
    }

    public IDid GetDID(String didName) {
        long proxy = nativeGetDID(mDidManagerProxy, didName);
        IDid did = new IDid(proxy);
        return did;
    }

    public /*nlohmann::json*/String GetDIDList() {
        return nativeGetDIDList(mDidManagerProxy);
    }

    public void  DestoryDID(String didName) {
        nativeDestoryDID(mDidManagerProxy, didName);
    }

    private native long nativeCreateDID(long proxy, password);
    private native long nativeGetDID(long proxy, didName);
    private native String nativeGetDIDList(long proxy);
    private native void nativeDestoryDID(long proxy, didName);
}
