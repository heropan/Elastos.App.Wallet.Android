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
    walletFactory = new IWalletFactory();
    // String backupPassword = "backupPassword";
    // String payPassWord = "payPassWord";
    // masterWallet = walletFactory.CreateMasterWallet(backupPassword, payPassWord);

    // // String chainID, int coinTypeIndex, String payPassWord, boolean singleAddress, long feePerKb
    // String chainID = "Ela";
    // int coinTypeIndex = 1;
    // String payPassWord = "";
    // boolean singleAddress = false;
    // long feePerKb = 0;
    // subWallet = masterWallet.CreateSubWallet(IMasterWallet.SubWalletType.Mainchain, chainID,
    //         coinTypeIndex, payPassWord, singleAddress, feePerKb);
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
        case "recoverSubWallet":
          this.recoverSubWallet(args, callbackContext);
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
//        case "getTheLastAddress":
//          this.getTheLastAddress(callbackContext);
//          return true;
        case "getAllAddress":
          this.getAllAddress(args, callbackContext);
          return true;
        case "getBalanceWithAddress":
          this.getBalanceWithAddress(args, callbackContext);
          return true;
        case "sendTransaction":
          this.sendTransaction(args, callbackContext);
          return true;
        case "generateMultiSignTransaction":
          this.generateMultiSignTransaction(args, callbackContext);
          return true;
        case "createMultiSignAddress":
          this.createMultiSignAddress(args, callbackContext);
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
    subWallet = masterWallet.CreateSubWallet(args.getInt(0), args.getString(1), args.getInt(2), args.getString(3), args.getBoolean(4), args.getInt(5));
    callbackContext.success();
  }

  public void recoverSubWallet(JSONArray args, CallbackContext callbackContext) throws JSONException {
    // masterWallet.RecoverSubWallet(args.getString(0), args.getInt(1), args.getString(2), args.getBoolean(3), args.getInt(4), args.getInt(5));
    callbackContext.success();
  }

  public void getPublicKey(JSONArray args, CallbackContext callbackContext) throws JSONException {
    masterWallet.GetPublicKey();
    callbackContext.success();
  }

  public void createMasterWallet(JSONArray args, CallbackContext callbackContext) throws JSONException {
    masterWallet = walletFactory.CreateMasterWallet(args.getString(0), args.getString(1));
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
    //callbackContext.success(parseOneParam("txId", ""));
    callbackContext.success(subWallet.SendTransaction(
      args.getString(0),
      args.getString(1),
      args.getLong(2),
      args.getLong(3),
      args.getString(4),
      args.getString(5)
    ));
  }

  public void createMultiSignAddress(JSONArray args, CallbackContext callbackContext) throws JSONException {

    // long txId = manager.createTransaction(manager, new TxParam(args.getString(0), args.getLong(1)));
    // manager.signAndPublishTransaction(manager, new TransactionPtr(txId));
    //callbackContext.success(parseOneParam("txId", ""));
    callbackContext.success(subWallet.CreateMultiSignAddress(
      args.getString(0),
      args.getInt(1),
      args.getInt(2)
    ));
  }

  public void generateMultiSignTransaction(JSONArray args, CallbackContext callbackContext) throws JSONException {

    // long txId = manager.createTransaction(manager, new TxParam(args.getString(0), args.getLong(1)));
    // manager.signAndPublishTransaction(manager, new TransactionPtr(txId));
    //callbackContext.success(parseOneParam("txId", ""));
    callbackContext.success(subWallet.GenerateMultiSignTransaction(
      args.getString(0),
      args.getString(1),
      args.getLong(2),
      args.getLong(3),
      args.getString(4),
      args.getString(5)
    ));
  }


  public void getAllTransaction(JSONArray args, CallbackContext callbackContext) throws JSONException {
    callbackContext.success(subWallet.GetAllTransaction(
      args.getInt(0),
      args.getInt(1),
      args.getString(3)));
  }

  public void registerWalletListener(CallbackContext callbackContext) {
    new ISubWalletCallback() {
      @Override
      public void OnTransactionStatusChanged(String txId, String status, String desc, int confirms) {

      }
    };
  }

  public void getBalanceInfo(CallbackContext callbackContext) throws JSONException {
    callbackContext.success(parseOneParam("balance", subWallet.GetBalanceInfo()));
  }


  public void getBalance(JSONArray args, CallbackContext callbackContext) throws JSONException {
    //String address = args.getString(0);
    callbackContext.success(parseOneParam("balance", subWallet.GetBalance()));
  }

  public void createAddress(CallbackContext callbackContext) throws JSONException {
    //callbackContext.success(parseOneParam("address", "EciyeLa45qX8AwVWuekEweCsfb676LdRNe"));
    callbackContext.success(parseOneParam("address", subWallet.CreateAddress()));
  }

//  public void getTheLastAddress(CallbackContext callbackContext) throws JSONException {
//    callbackContext.success(parseOneParam("address", "EciyeLa45qX8AwVWuekEweCsfb676LdRNe"));
//  }

  public void getAllAddress(JSONArray args, CallbackContext callbackContext) throws JSONException {
//    List<String> addressList = new ArrayList<String>();
//    addressList.add("EciyeLa45qX8AwVWuekEweCsfb676LdRNe");
//    addressList.add("EciyeLa45qX8AwVWuekEweCsfb676LdRNe");
    callbackContext.success(subWallet.GetAllAddress(args.getInt(0), args.getInt(1)));
  }

  public void getBalanceWithAddress(JSONArray args, CallbackContext callbackContext) throws JSONException {
    callbackContext.success(parseOneParam("balance", subWallet.GetBalanceWithAddress(args.getString(0))));
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
