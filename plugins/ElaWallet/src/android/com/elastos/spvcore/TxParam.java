package com.elastos.spvcore;

public class TxParam extends JniReference {


    public TxParam(String address,long amount){
        super(createTxParam());
        setAmount(amount);
        setToAddress(address);
    }

    public native void disposeNative();
    public native static long createTxParam();
    public native static void getToAddress();
    public native static void setToAddress(String jstringToAddress);
    public native static void getAmount();
    public native static void setAmount(long jlongAmount);

    protected void finalize () throws Throwable {
        disposeNative();
    }
}
