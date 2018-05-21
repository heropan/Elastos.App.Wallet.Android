package ElaWallet;

import android.util.JsonReader;

import com.elastos.spvcore.ChainParams;
import com.elastos.spvcore.IMasterWallet;
import com.elastos.spvcore.ISubWallet;
import com.elastos.spvcore.ISubWalletCallback;
import com.elastos.spvcore.IWalletFactory;
import com.elastos.spvcore.Transaction;
import com.elastos.spvcore.TransactionPtr;
import com.elastos.spvcore.TxParam;
import com.elastos.spvcore.WalletManager;
import com.elastos.wallet.util.LogUtil;
import com.google.gson.Gson;
import com.google.gson.JsonIOException;

import org.apache.cordova.CordovaInterface;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CallbackContext;

import org.apache.cordova.CordovaWebView;
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
  private IMasterWallet masterWallet;
  private IWalletFactory walletFactory;
  private ISubWallet subWallet;

  private Gson gson = new Gson();


  @Override
  public void initialize(CordovaInterface cordova, CordovaWebView webView) {
    super.initialize(cordova, webView);
    masterWallet = new IMasterWallet();
    walletFactory = new IWalletFactory();
    subWallet = new ISubWallet();
  }


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
        case "createSubWallet":
          this.createSubWallet(args, callbackContext);
          return true;
        case "getPublicKey":
          this.getPublicKey(args, callbackContext);
          return true;
        case "createMasterWallet":
          this.createMasterWallet(args, callbackContext);
          return true;
        case "importWalletWithKeystore":
          this.importWalletWithKeystore(args, callbackContext);
          return true;
        case "importWalletWithMnemonic":
          this.importWalletWithMnemonic(args, callbackContext);
          return true;
        case "exportWalletWithKeystore":
          this.exportWalletWithKeystore(args, callbackContext);
          return true;
        case "exportWalletWithMnemonic":
          this.exportWalletWithMnemonic(args, callbackContext);
          return true;
        case "getBalanceInfo":
          this.getBalanceInfo(callbackContext);
          return true;
        case "getBalance":
          this.getBalance(args, callbackContext);
          return true;
        case "createAddress":
          this.createAddress(callbackContext);
          return true;
        case "getTheLastAddress":
          this.getTheLastAddress(callbackContext);
          return true;
        case "getAllAddress":
          this.getAllAddress(callbackContext);
          return true;
        case "getBalanceWithAddress":
          this.getBalanceWithAddress(callbackContext);
          return true;
        case "sendTransaction":
          this.sendTransaction(args, callbackContext);
          return true;
        case "getAllTransaction":
          this.getAllTransaction(args, callbackContext);
          return true;
        case "sign":
          this.sign(args, callbackContext);
          return true;
        case "checkSign":
          this.checkSign(args, callbackContext);
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

  public void createSubWallet(JSONArray args, CallbackContext callbackContext) throws JSONException {
    masterWallet.createSubWallet(args.getString(0), args.getString(1), args.getBoolean(2));
    callbackContext.success();
  }

  public void getPublicKey(JSONArray args, CallbackContext callbackContext) throws JSONException {
    masterWallet.getPublicKey(args.getString(0));
    callbackContext.success();
  }

  public void createMasterWallet(JSONArray args, CallbackContext callbackContext) throws JSONException {
    walletFactory.CreateMasterWallet(args.getString(0), args.getString(1), args.getString(2));
    callbackContext.success();
  }

  public void importWalletWithKeystore(JSONArray args, CallbackContext callbackContext) throws JSONException {
    walletFactory.ImportWalletWithKeystore(args.getString(0), args.getString(1), args.getString(2));
    callbackContext.success();
  }

  public void importWalletWithMnemonic(JSONArray args, CallbackContext callbackContext) throws JSONException {
    walletFactory.ImportWalletWithMnemonic(args.getString(0), args.getString(1), args.getString(2));
    callbackContext.success();
  }

  public void exportWalletWithKeystore(JSONArray args, CallbackContext callbackContext) throws JSONException {
    walletFactory.ExportWalletWithKeystore(masterWallet, args.getString(0), args.getString(1));
    callbackContext.success();
  }

  public void exportWalletWithMnemonic(JSONArray args, CallbackContext callbackContext) throws JSONException {
    walletFactory.ExportWalletWithMnemonic(masterWallet, args.getString(0));
    callbackContext.success();
  }


  public void sendTransaction(JSONArray args, CallbackContext callbackContext) throws JSONException {

    // long txId = manager.createTransaction(manager, new TxParam(args.getString(0), args.getLong(1)));
    // manager.signAndPublishTransaction(manager, new TransactionPtr(txId));
    callbackContext.success(parseOneParam("txId", ""));
  }


  public void getAllTransaction(JSONArray args, CallbackContext callbackContext) {
    callbackContext.success(gson.toJson(manager.getTransactions()));
  }

  public void registerWalletListener(CallbackContext callbackContext) {
    new ISubWalletCallback() {
      @Override
      public void OnBalanceChanged(String address, double oldAmount, double newAmount) {

      }

      @Override
      public void OnTransactionStatusChanged(String txId, String status, int error, String desc, int confirms) {

      }
    };
  }

  public void getBalanceInfo(CallbackContext callbackContext) throws JSONException {
    callbackContext.success(parseOneParam("balance", 1));
  }


  public void getBalance(JSONArray args, CallbackContext callbackContext) throws JSONException {
    String address = args.getString(0);
    callbackContext.success(parseOneParam("balance", 1));
  }

  public void createAddress(CallbackContext callbackContext) throws JSONException {
    callbackContext.success(parseOneParam("address", "EciyeLa45qX8AwVWuekEweCsfb676LdRNe"));
  }

  public void getTheLastAddress(CallbackContext callbackContext) throws JSONException {
    callbackContext.success(parseOneParam("address", "EciyeLa45qX8AwVWuekEweCsfb676LdRNe"));
  }

  public void getAllAddress(CallbackContext callbackContext) throws JSONException {
    List<String> addressList = new ArrayList<String>();
    addressList.add("EciyeLa45qX8AwVWuekEweCsfb676LdRNe");
    addressList.add("EciyeLa45qX8AwVWuekEweCsfb676LdRNe");
    callbackContext.success(gson.toJson(addressList));
  }

  public void getBalanceWithAddress(CallbackContext callbackContext) throws JSONException {
    callbackContext.success(parseOneParam("balance", 1));
  }

  public void sign(JSONArray args, CallbackContext callbackContext) throws JSONException {
    String data = args.getString(0);
    callbackContext.success(parseOneParam("signData", data));
  }

  public void checkSign(JSONArray args, CallbackContext callbackContext) throws JSONException {
    String data = args.getString(0);
    callbackContext.success(parseOneParam("signData", data));
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

  public void print(String text, CallbackContext callbackContext) throws JSONException {
    if (text == null) {
      callbackContext.error("text not can null");

    } else {
      LogUtil.i(TAG, text);
      callbackContext.success(parseOneParam("text", text));
    }
  }

  @Override
  public void onDestroy() {
    manager.finalize();
    super.onDestroy();
  }
}
