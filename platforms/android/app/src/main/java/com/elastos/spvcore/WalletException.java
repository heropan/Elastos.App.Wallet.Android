
package com.elastos.spvcore;


public class WalletException extends Exception {
    private int mErrorCode = 0;

    public WalletException(){
        super();
    }

    public WalletException(String message){
        super(message);
    }

    public WalletException(int errorCode, String message){
        super(message);
        mErrorCode = errorCode;
    }

    public int GetErrorCode() {
        return mErrorCode;
    }
}
