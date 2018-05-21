package com.elastos.spvcore;

public class ChainParams extends JniReference {



    public ChainParams(){
        super(createJniMainnetChainParams());
    }

    public native static  long createJniMainnetChainParams();
    public native  static long createJniTestnetChainParams();

    public native void disposeNative ();

    protected void finalize () throws Throwable {
        disposeNative();
    }


    }
