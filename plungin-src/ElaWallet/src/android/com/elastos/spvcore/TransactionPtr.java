package com.elastos.spvcore;

public class TransactionPtr extends JniReference {

    public TransactionPtr(long jniReferenceAddress) {
        super(jniReferenceAddress);
    }

    public native void disposeNative();

    protected void finalize () throws Throwable {
        disposeNative();
    }
}
