package ElaWallet;

import android.util.JsonReader;

import com.elastos.spvcore.ChainParams;
import com.elastos.spvcore.Transaction;
import com.elastos.spvcore.TransactionPtr;
import com.elastos.spvcore.TxParam;
import com.elastos.spvcore.WalletManager;
import com.elastos.wallet.util.LogUtil;
import com.google.gson.Gson;
import com.google.gson.JsonIOException;

import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CallbackContext;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.List;

/**
 * wallet webview jni
 */
public class Wallet extends CordovaPlugin {

  private static final String TAG = "Wallet.JNI";

  private WalletManager manager;

  private Gson gson = new Gson();


  @Override
  public boolean execute(String action, JSONArray args, CallbackContext callbackContext) {
    try {
      switch (action) {
        case "coolMethod":
          String message = args.getString(0);
          this.coolMethod(message, callbackContext);
          return true;
        case "print":
          this.print(args.getString(0), callbackContext);
          return true;
        case "recoverWallet":
          this.recoverWallet(args, callbackContext);
          return true;
        case "createWallet":
          this.createWallet(callbackContext);
          return true;
        case "start":
          this.start(callbackContext);
          return true;
        case "stop":
          this.stop(callbackContext);
          return true;
        case "exportKey":
          this.exportKey(args, callbackContext);
          return true;
        case "importKey":
          this.importKey(args, callbackContext);
          return true;
        case "createTransaction":
          this.createTransaction(args, callbackContext);
          return true;
        case "getMnemonic":
          this.getMnemonic(callbackContext);
          return true;
        case "getTransactions":
          this.getTransactions(callbackContext);
          return true;
        case "registerWalletListener":
          this.registerWalletListener(callbackContext);
          return true;
        case "getBalance":
          this.getBalance(args, callbackContext);
          return true;
        case "createAddress":
          this.createAddress(callbackContext);
          return true;
        case "getAddressList":
          this.getAddressList(callbackContext);
          return true;
        case "sign":
          this.sign(args, callbackContext);
          return true;
        case "getPubKey":
          this.getPubKey(args, callbackContext);
          return true;

      }

    } catch (JSONException e) {
      e.printStackTrace();
      callbackContext.error("json parse error");
      return false;
    }
    return false;

  }


  public void recoverWallet(JSONArray args, CallbackContext callbackContext) throws JSONException {
    // manager = new WalletManager("wallet abc", "english", new ChainParams());
    manager = new WalletManager(args.getString(0), args.getString(1), new ChainParams());
    callbackContext.success();
    //manager.createJniWalletManager();
  }

  public void createWallet(CallbackContext callbackContext) throws JSONException {
    manager = new WalletManager(new ChainParams());
    callbackContext.success();
  }

  public void start(CallbackContext callbackContext) throws JSONException {
    manager.start();
    callbackContext.success();
  }

  public void stop(CallbackContext callbackContext) throws JSONException {
    manager.stop();
    callbackContext.success();
  }

  public void exportKey(JSONArray args, CallbackContext callbackContext) throws JSONException {
    manager.exportKey(args.getString(0), args.getString(1));
    callbackContext.success();
  }

  public void importKey(JSONArray args, CallbackContext callbackContext) throws JSONException {
    manager.importKey(args.getString(0), args.getString(1));
    callbackContext.success();
  }

  public void createTransaction(JSONArray args, CallbackContext callbackContext) throws JSONException {
    long txId = manager.createTransaction(manager, new TxParam(args.getString(0), args.getLong(1)));
    manager.signAndPublishTransaction(manager, new TransactionPtr(txId));
    callbackContext.success(parseOneParam("txId", txId));
  }

  public void getMnemonic(CallbackContext callbackContext) throws JSONException {

    callbackContext.success(parseOneParam("mnemonic", manager.getMnemonic()));
  }

  public void getTransactions(CallbackContext callbackContext) {
    callbackContext.success(gson.toJson(manager.getTransactions()));
  }

  public void registerWalletListener(CallbackContext callbackContext) {
    manager.registerWalletListener(new WalletManager.Listener() {
      @Override
      public void balanceChanged(long balance) {
        callbackContext.success();
      }

      @Override
      public void onTxAdded(Transaction transaction) {
        callbackContext.success();

      }

      @Override
      public void onTxUpdated(String hash, int blockHeight, int timeStamp) {
        callbackContext.success();
      }

      @Override
      public void onTxDeleted(String hash, int notifyUser, int recommendRescan) {
        callbackContext.success();

      }
    });
  }


  public void getBalance(JSONArray args, CallbackContext callbackContext) throws JSONException {
    String address = args.getString(0);
    callbackContext.success(parseOneParam("balance", 1));
  }

  public void createAddress(CallbackContext callbackContext) throws JSONException {
    callbackContext.success(parseOneParam("address", "EciyeLa45qX8AwVWuekEweCsfb676LdRNe"));
  }

  public void getAddressList(CallbackContext callbackContext) throws JSONException {
    List<String> addressList = new ArrayList<String>();
    addressList.add("EciyeLa45qX8AwVWuekEweCsfb676LdRNe");
    addressList.add("EciyeLa45qX8AwVWuekEweCsfb676LdRNe");
    callbackContext.success(gson.toJson(addressList));
  }

  public void sign(JSONArray args, CallbackContext callbackContext) throws JSONException {
    String data = args.getString(0);
    callbackContext.success(parseOneParam("signData", data));
  }

  public void getPubKey(JSONArray args, CallbackContext callbackContext) throws JSONException {
    String data = args.getString(0);
    callbackContext.success(parseOneParam("pubKey", data));
  }

  private JSONObject parseOneParam(String key, Object value) throws JSONException {
    JSONObject jsonObject = new JSONObject();
    jsonObject.put(key, value);
    return jsonObject;
  }


//  private JSONObject parseResponse(JSONObject jsonData,String msg) throws JSONException{
//    JSONObject jsonObject = new JSONObject();
//    jsonObject.put("msg",msg);
//    jsonObject.put("status",status);
//    jsonObject.put("data",jsonData.toString());
//
//    return jsonObject;
//  }


  private void coolMethod(String message, CallbackContext callbackContext) {
    if (message != null && message.length() > 0) {
      callbackContext.success(message);
    } else {
      callbackContext.error("Expected one non-empty string argument.");
    }
  }

  public void print(String text, CallbackContext callbackContext) throws JSONException{
    if (text == null) {
      callbackContext.error("text not can null");

    } else {
      LogUtil.i(TAG, text);
      callbackContext.success(parseOneParam("text",text));
    }
  }

  @Override
  public void onDestroy() {
    manager.finalize();
    super.onDestroy();
  }
}
