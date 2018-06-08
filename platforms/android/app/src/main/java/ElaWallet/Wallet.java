package ElaWallet;

import android.util.JsonReader;

import com.elastos.spvcore.IMasterWallet;
import com.elastos.spvcore.ISubWallet;
import com.elastos.spvcore.ISubWalletCallback;
import com.elastos.spvcore.IWalletFactory;
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

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStreamWriter;
import java.io.UnsupportedEncodingException;

import java.util.ArrayList;
import java.util.List;

import io.ionic.starter.MyUtil;

/**
 * wallet webview jni
 */
public class Wallet extends CordovaPlugin {

  private static final String TAG = "Wallet.JNI";

  private IMasterWallet masterWallet;
  private IWalletFactory walletFactory;
  private ISubWallet subWallet;

  private Gson gson = new Gson();


  @Override
  public void initialize(CordovaInterface cordova, CordovaWebView webView) {
    super.initialize(cordova, webView);
    walletFactory = new IWalletFactory();
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
        case "deriveIdAndKeyForPurpose":
          this.deriveIdAndKeyForPurpose(args, callbackContext);
          return true;

      }

    } catch (JSONException e) {
      e.printStackTrace();
      callbackContext.error("json parse error");
      return false;
    }
    return false;

  }


  public void createSubWallet(JSONArray args, CallbackContext callbackContext) throws JSONException {
    //First, create the chain's config file.
    createConfigFile(args.getString(1));
    subWallet = masterWallet.CreateSubWallet(args.getInt(0), args.getString(1), args.getInt(2), args.getString(3), args.getBoolean(4), args.getLong(5));
    callbackContext.success();
  }

  public void recoverSubWallet(JSONArray args, CallbackContext callbackContext) throws JSONException {
    subWallet = masterWallet.RecoverSubWallet(args.getInt(0), args.getString(1), args.getInt(2), args.getString(3), args.getBoolean(4), args.getInt(5), args.getLong(6));
    callbackContext.success();
  }

  public void getPublicKey(JSONArray args, CallbackContext callbackContext) throws JSONException {
    callbackContext.success(parseOneParam("publickey", masterWallet.GetPublicKey()));
  }

  public void createMasterWallet(JSONArray args, CallbackContext callbackContext) throws JSONException {
    masterWallet = walletFactory.CreateMasterWallet(args.getString(0), args.getString(1), args.getString(2), MyUtil.getRootPath());
    callbackContext.success();
  }

  public void importWalletWithKeystore(JSONArray args, CallbackContext callbackContext) throws JSONException {
    masterWallet = walletFactory.ImportWalletWithKeystore(args.getString(0), args.getString(1), args.getString(2), args.getString(3), MyUtil.getRootPath());
    callbackContext.success();
  }

  public void importWalletWithMnemonic(JSONArray args, CallbackContext callbackContext) throws JSONException {
    masterWallet = walletFactory.ImportWalletWithMnemonic(args.getString(0), args.getString(1), args.getString(2), args.getString(2), MyUtil.getRootPath());
    callbackContext.success();
  }

  public void exportWalletWithKeystore(JSONArray args, CallbackContext callbackContext) throws JSONException {
    walletFactory.ExportWalletWithKeystore(masterWallet, args.getString(0), args.getString(1));
    callbackContext.success();
  }

  public void exportWalletWithMnemonic(JSONArray args, CallbackContext callbackContext) throws JSONException {
    callbackContext.success(parseOneParam("mnemonic", walletFactory.ExportWalletWithMnemonic(masterWallet, args.getString(0))));
  }


  public void sendTransaction(JSONArray args, CallbackContext callbackContext) throws JSONException {
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
    callbackContext.success(subWallet.CreateMultiSignAddress(
      args.getString(0),
      args.getInt(1),
      args.getInt(2)
    ));
  }

  public void generateMultiSignTransaction(JSONArray args, CallbackContext callbackContext) throws JSONException {
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
        JSONObject jsonObject = new JSONObject();
        try {
          jsonObject.put("txId", txId);
          jsonObject.put("status", status);
          jsonObject.put("desc", desc);
          jsonObject.put("confirms", confirms);
        }
        catch (JSONException e) {
          e.printStackTrace();;
        }

        callbackContext.success(jsonObject);
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

  public void deriveIdAndKeyForPurpose(JSONArray args, CallbackContext callbackContext) throws JSONException {
    IMasterWallet.IDKEY idkey = new IMasterWallet.IDKEY();
    masterWallet.DeriveIdAndKeyForPurpose(args.getInt(0), args.getInt(1), args.getString(2), idkey);

    JSONObject jsonObject = new JSONObject();
    jsonObject.put("id", idkey.id);
    jsonObject.put("key", idkey.key);

    callbackContext.success(jsonObject);
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
    super.onDestroy();
  }

  private void createConfigFile(String chainID) {
      String configName = chainID+"_PeerConnection.json";

      String content = "{\n" +
              "    \"MagicNumber\": 7630401,\n" +
              "    \"KnowingPeers\":\n" +
              "    [\n" +
              "        {\n" +
              "            \"Address\": \"127.0.0.1\",\n" +
              "            \"Port\": 20866,\n" +
              "            \"Timestamp\": 0,\n" +
              "            \"Services\": 1,\n" +
              "            \"Flags\": 0\n" +
              "        }\n" +
              "    ]\n" +
              "}\n";

      File config = new File(new File(MyUtil.getRootPath()), configName);
      try {
          FileOutputStream fos= new FileOutputStream(config);
          OutputStreamWriter osw=new OutputStreamWriter(fos,"UTF-8");
          osw.write(content);
          //flush
          osw.flush();
          fos.flush();

          //close
          fos.close();
          osw.close();
      }
      catch (FileNotFoundException e) {
          e.printStackTrace();
      }
      catch (UnsupportedEncodingException e) {
          e.printStackTrace();
      }
      catch (IOException e) {
          e.printStackTrace();
      }
  }
}
