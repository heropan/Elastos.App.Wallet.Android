package ElaWallet;

import android.util.JsonReader;

import com.elastos.spvcore.IMasterWallet;
import com.elastos.spvcore.ISubWallet;
import com.elastos.spvcore.ISubWalletCallback;
import com.elastos.spvcore.Enviroment;
import com.elastos.spvcore.IMasterWalletManager;
import com.elastos.wallet.util.LogUtil;

import org.apache.cordova.CordovaInterface;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaWebView;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.List;
import java.util.HashMap;
import java.util.Map;
import android.util.Log;

import io.ionic.starter.MyUtil;

/**
 * wallet webview jni
 */
public class Wallet extends CordovaPlugin {
    private static final String TAG = "Wallet.JNI";
    private String mRootPath;
    private IMasterWallet mCurrentMasterWallet;
    private IMasterWalletManager mWalletManager;
    private ArrayList<IMasterWallet> mMasterWalletList;
    private Map<String, ISubWallet> mSubWalletMap = new HashMap<String, ISubWallet>();

    private final String ERRORCODE = "ERRORCODE";
    private final String ERRORCODE_NODATA = "NODATA";


    @Override
    public void initialize(CordovaInterface cordova, CordovaWebView webView) {
        Log.d("Elastos", "initialize=================================== ");
        super.initialize(cordova, webView);
        mRootPath = MyUtil.getRootPath();
        Enviroment.InitializeRootPath(mRootPath);
        mWalletManager = Enviroment.GetMasterWalletManager();
        mMasterWalletList = mWalletManager.GetAllMasterWallets();
        if (mMasterWalletList != null && mMasterWalletList.size() > 0) {
            mCurrentMasterWallet = mMasterWalletList.get(0);
        }
    }


    @Override
    public boolean execute(String action, JSONArray args, CallbackContext callbackContext) {
      Log.d("Elastos", "execute===================================action="+action);
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
                  this.getBalanceInfo(args, callbackContext);
                  return true;
              case "getBalance":
                  this.getBalance(args, callbackContext);
                  return true;
              case "createAddress":
                  this.createAddress(args, callbackContext);
                  return true;
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
              case "registerWalletListener":
                  this.registerWalletListener(args, callbackContext);
                  return true;
              case "getAllMasterWallets":
                  this.getAllMasterWallets(args, callbackContext);
                  return true;
              case "getAllSubWallets":
                  this.getAllSubWallets(args, callbackContext);
                  return true;
              case "getChainId":
                  this.getChainId(args, callbackContext);
                  return true;
              case "getWalletId":
                  this.getWalletId(args, callbackContext);
                  return true;
          }
        } catch (JSONException e) {
            e.printStackTrace();
            callbackContext.error("json parse error");
            return false;
        }

        return false;
    }


    //CreateSubWallet(String chainID, String payPassword, boolean singleAddress, long feePerKb)
    public void createSubWallet(JSONArray args, CallbackContext callbackContext) throws JSONException {
        ISubWallet subWallet = mCurrentMasterWallet.CreateSubWallet(args.getString(0), args.getString(1), args.getBoolean(2), args.getLong(3));
        if (subWallet != null) {
            mSubWalletMap.put(args.getString(0), subWallet);
            callbackContext.success(args.getString(0));
        }
        else {
            callbackContext.error("CreateSubWallet failed.");
        }
    }

    //RecoverSubWallet(String chainID, String payPassword, boolean singleAddress, int limitGap, long feePerKb)
    public void recoverSubWallet(JSONArray args, CallbackContext callbackContext) throws JSONException {
        ISubWallet subWallet = mCurrentMasterWallet.RecoverSubWallet(args.getString(0), args.getString(1), args.getBoolean(2), args.getInt(3), args.getLong(4));
        if (subWallet != null) {
            mSubWalletMap.put(args.getString(0), subWallet);
            callbackContext.success(parseOneParam(args.getString(0), subWallet));
        }
        else {
            callbackContext.error("RecoverSubWallet failed.");
        }
    }

    public void getAllMasterWallets(JSONArray args, CallbackContext callbackContext) throws JSONException {
        mMasterWalletList = mWalletManager.GetAllMasterWallets();
        if (mMasterWalletList != null && mMasterWalletList.size() > 0) {
            //TODO: Now, the first masterWallet is the default.
            mCurrentMasterWallet = mMasterWalletList.get(0);
            callbackContext.success(parseOneParam("walletid",mCurrentMasterWallet.GetId()));
        }
        else {
            // callbackContext.error("Don't have masterWallet, please create a new one.");
            callbackContext.success(parseOneParam("walletid",""));
        }
    }

    //CreateSubWallet(String chainID, String payPassword, boolean singleAddress, long feePerKb)
    public void getAllSubWallets(JSONArray args, CallbackContext callbackContext) throws JSONException {
        if (mCurrentMasterWallet != null) {
            JSONObject jsonObject = new JSONObject();

            mSubWalletMap.clear();
            ArrayList<ISubWallet> list = mCurrentMasterWallet.GetAllSubWallets();
            for (int i = 0; i < list.size(); i++) {
                ISubWallet subWallet = list.get(i);
                if (subWallet != null) {
                    mSubWalletMap.put(subWallet.GetChainId(), subWallet);
                    jsonObject.put(subWallet.GetChainId(), subWallet.GetChainId());
                }
            }

            callbackContext.success(jsonObject);
        }
        else {
            // callbackContext.error("Don't have any subWallet, please create a new one.");
            callbackContext.success(parseOneParam(ERRORCODE, ERRORCODE_NODATA));
        }
    }

    public void getWalletId(JSONArray args, CallbackContext callbackContext) throws JSONException {
        String walletID = mCurrentMasterWallet.GetId();
        if (walletID != null) {
            callbackContext.success(parseOneParam("walletID", walletID));
        }
        else {
            callbackContext.error("Get masterWallet's id failed.");
        }
    }

    public void getPublicKey(JSONArray args, CallbackContext callbackContext) throws JSONException {
        String publickey = mCurrentMasterWallet.GetPublicKey();
        if (publickey != null) {
            callbackContext.success(parseOneParam("publickey", publickey));
        }
        else {
            callbackContext.error("getPublicKey failed.");
        }
    }

    //CreateMasterWallet(String masterWalletId, String phrasePassword, String payPassWord, String language)
    public void createMasterWallet(JSONArray args, CallbackContext callbackContext) throws JSONException {
        mCurrentMasterWallet = mWalletManager.CreateMasterWallet(args.getString(0), args.getString(1), args.getString(2), args.getString(3));
        if (mCurrentMasterWallet != null) {
            mMasterWalletList.add(mCurrentMasterWallet);
            callbackContext.success();
        }
        else {
            callbackContext.error("CreateMasterWallet failed.");
        }
    }

    //ImportWalletWithKeystore(String masterWalletId, String keystorePath, String backupPassWord ,String payPassWord, String phrasePassword)
    public void importWalletWithKeystore(JSONArray args, CallbackContext callbackContext) throws JSONException {
        mCurrentMasterWallet = mWalletManager.ImportWalletWithKeystore(args.getString(0), args.getString(1), args.getString(2), args.getString(3), args.getString(4));
        if (mCurrentMasterWallet != null) {
            mMasterWalletList.add(mCurrentMasterWallet);
            callbackContext.success();
        }
        else {
            callbackContext.error("ImportWalletWithKeystore failed.");
        }
    }

    //ImportWalletWithMnemonic(String masterWalletId, String mnemonic, String phrasePassword ,String payPassWord, String language)
    public void importWalletWithMnemonic(JSONArray args, CallbackContext callbackContext) throws JSONException {
        mCurrentMasterWallet = mWalletManager.ImportWalletWithMnemonic(args.getString(0), args.getString(1), args.getString(2), args.getString(3), args.getString(4));
        if (mCurrentMasterWallet != null) {
            mMasterWalletList.add(mCurrentMasterWallet);
            callbackContext.success();
        }
        else {
            callbackContext.error("ImportWalletWithMnemonic failed.");
        }
    }

    //ExportWalletWithKeystore(IMasterWallet masterWallet, String backupPassWord, String payPassword, String keystorePath)
    public void exportWalletWithKeystore(JSONArray args, CallbackContext callbackContext) throws JSONException {
        mWalletManager.ExportWalletWithKeystore(mCurrentMasterWallet, args.getString(0), args.getString(1), args.getString(2));
        callbackContext.success();
    }

    //ExportWalletWithMnemonic(IMasterWallet masterWallet,String backupPassWord)
    public void exportWalletWithMnemonic(JSONArray args, CallbackContext callbackContext) throws JSONException {
        String mnemonic = mWalletManager.ExportWalletWithMnemonic(mCurrentMasterWallet, args.getString(0));
        if (mnemonic != null) {
            callbackContext.success(parseOneParam("mnemonic", mnemonic));
        }
        else {
            callbackContext.error("ExportWalletWithMnemonic failed.");
        }
    }

    //SendTransaction(String fromAddress, String toAddress, long amount, long fee, String payPassword, String memo)
    public void sendTransaction(JSONArray args, CallbackContext callbackContext) throws JSONException {
        //The first parameter is [chainID]
        ISubWallet subWallet = mSubWalletMap.get(args.getString(0));
        if (subWallet == null) {
            callbackContext.error("Don't have the subWallet, please check.");
            return;
        }

        String transactionId = subWallet.SendTransaction(args.getString(1), args.getString(2), args.getLong(3),
                                args.getLong(4), args.getString(5), args.getString(6));
        if (transactionId != null) {
            callbackContext.success(parseOneParam("transactionId", transactionId));
        }
        else {
            callbackContext.error("SendTransaction failed.");
        }
    }

    public void createMultiSignAddress(JSONArray args, CallbackContext callbackContext) throws JSONException {
        //The first parameter is [chainID]
        ISubWallet subWallet = mSubWalletMap.get(args.getString(0));
        if (subWallet == null) {
            callbackContext.error("Don't have the subWallet, please check.");
            return;
        }

        String address = subWallet.CreateMultiSignAddress(args.getString(1), args.getInt(2), args.getInt(3));
        if (address != null) {
            callbackContext.success(parseOneParam("address", address));
        }
        else {
            callbackContext.error("CreateMultiSignAddress failed.");
        }
    }

    public void generateMultiSignTransaction(JSONArray args, CallbackContext callbackContext) throws JSONException {
        //The first parameter is [chainID]
        ISubWallet subWallet = mSubWalletMap.get(args.getString(0));
        if (subWallet == null) {
            callbackContext.error("Don't have the subWallet, please check.");
            return;
        }

        String result = subWallet.GenerateMultiSignTransaction(args.getString(1), args.getString(2), args.getLong(3),
                    args.getLong(4), args.getString(5), args.getString(6));

        if (result != null) {
            callbackContext.success(parseOneParam("result", result));
        }
        else {
            callbackContext.error("GenerateMultiSignTransaction failed.");
        }
    }

    public void getAllTransaction(JSONArray args, CallbackContext callbackContext) throws JSONException {
        //The first parameter is [chainID]
        ISubWallet subWallet = mSubWalletMap.get(args.getString(0));
        if (subWallet == null) {
            callbackContext.error("Don't have the subWallet, please check.");
            return;
        }

        String allTransaction = subWallet.GetAllTransaction(args.getInt(1), args.getInt(2), args.getString(3));
        callbackContext.success(parseOneParam("allTransaction", allTransaction));
    }

    public void registerWalletListener(JSONArray args, CallbackContext callbackContext) throws JSONException {
        //The first parameter is [chainID]
        ISubWallet subWallet = mSubWalletMap.get(args.getString(0));
        if (subWallet == null) {
            callbackContext.error("Don't have the subWallet, please check.");
            return;
        }

        subWallet.AddCallback(new ISubWalletCallback() {
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
        });
    }

    public void getBalanceInfo(JSONArray args, CallbackContext callbackContext) throws JSONException {
        //The first parameter is [chainID]
        ISubWallet subWallet = mSubWalletMap.get(args.getString(0));
        if (subWallet == null) {
            callbackContext.error("Don't have the subWallet, please check.");
            return;
        }

        callbackContext.success(parseOneParam("balance", subWallet.GetBalanceInfo()));
    }


    public void getBalance(JSONArray args, CallbackContext callbackContext) throws JSONException {
        //The first parameter is [chainID]
        ISubWallet subWallet = mSubWalletMap.get(args.getString(0));
        if (subWallet == null) {
            callbackContext.error("Don't have the subWallet, please check.");
            return;
        }

        callbackContext.success(parseOneParam("balance", subWallet.GetBalance()));
    }

    public void createAddress(JSONArray args, CallbackContext callbackContext) throws JSONException {
        //The first parameter is [chainID]
        ISubWallet subWallet = mSubWalletMap.get(args.getString(0));
        if (subWallet == null) {
            callbackContext.error("Don't have the subWallet, please check.");
            return;
        }

        String address = subWallet.CreateAddress();
        if (address != null) {
            callbackContext.success(parseOneParam("address", address));
        }
        else {
            callbackContext.error("CreateAddress failed.");
        }
    }

    public void getAllAddress(JSONArray args, CallbackContext callbackContext) throws JSONException {
        //The first parameter is [chainID]
        ISubWallet subWallet = mSubWalletMap.get(args.getString(0));
        if (subWallet == null) {
            callbackContext.error("Don't have the subWallet, please check.");
            return;
        }

        callbackContext.success(subWallet.GetAllAddress(args.getInt(1), args.getInt(2)));
    }

    public void getBalanceWithAddress(JSONArray args, CallbackContext callbackContext) throws JSONException {
        //The first parameter is [chainID]
        ISubWallet subWallet = mSubWalletMap.get(args.getString(0));
        if (subWallet == null) {
            callbackContext.error("Don't have the subWallet, please check.");
            return;
        }

        callbackContext.success(parseOneParam("balance", subWallet.GetBalanceWithAddress(args.getString(1))));
    }

    public void sign(JSONArray args, CallbackContext callbackContext) throws JSONException {
        //The first parameter is [chainID]
        ISubWallet subWallet = mSubWalletMap.get(args.getString(0));
        if (subWallet == null) {
            callbackContext.error("Don't have the subWallet, please check.");
            return;
        }

        String result = subWallet.Sign(args.getString(1), args.getString(2));
        if (result != null) {
            callbackContext.success(parseOneParam("signData", result));
        }
        else {
            callbackContext.error("Sign failed.");
        }
    }

    //CheckSign(String address, String message, String signature)
    public void checkSign(JSONArray args, CallbackContext callbackContext) throws JSONException {
        //The first parameter is [chainID]
        ISubWallet subWallet = mSubWalletMap.get(args.getString(0));
        if (subWallet == null) {
            callbackContext.error("Don't have the subWallet, please check.");
            return;
        }

        boolean status = subWallet.CheckSign(args.getString(1), args.getString(2), args.getString(3));
        callbackContext.success(parseOneParam("status", status));
    }

    public void getChainId(JSONArray args, CallbackContext callbackContext) throws JSONException {
        //The first parameter is [chainID]
        ISubWallet subWallet = mSubWalletMap.get(args.getString(0));
        if (subWallet == null) {
            callbackContext.error("Don't have the subWallet, please check.");
            return;
        }

        String chainId = subWallet.GetChainId();
        if (chainId != null) {
            callbackContext.success(parseOneParam("chainId", chainId));
        }
        else {
            callbackContext.error("GetChainId failed.");
        }
    }


    private JSONObject parseOneParam(String key, Object value) throws JSONException {
        JSONObject jsonObject = new JSONObject();
        jsonObject.put(key, value);
        return jsonObject;
    }

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
        super.onDestroy();
    }
}
