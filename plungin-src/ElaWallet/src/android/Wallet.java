package ElaWallet;

import android.util.JsonReader;

import com.elastos.spvcore.IMasterWallet;
import com.elastos.spvcore.ISubWallet;
import com.elastos.spvcore.ISubWalletCallback;
import com.elastos.spvcore.Enviroment;
import com.elastos.spvcore.IMasterWalletManager;
import com.elastos.spvcore.IdManagerFactory;
import com.elastos.spvcore.IDidManager;
import com.elastos.spvcore.IDid;
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
    private IMasterWallet mCurrentMasterWallet;
    private IMasterWalletManager mWalletManager;
    private ArrayList<IMasterWallet> mMasterWalletList;
    private IDidManager mDidManager = null;
    private Map<String, ISubWallet> mSubWalletMap = new HashMap<String, ISubWallet>();

    private final String ERRORCODE = "ERRORCODE";
    private final String ERRORCODE_NODATA = "NODATA";


    @Override
    public void initialize(CordovaInterface cordova, CordovaWebView webView) {
        super.initialize(cordova, webView);
        mWalletManager = Enviroment.GetMasterWalletManager();
        mMasterWalletList = mWalletManager.GetAllMasterWallets();
        if (mMasterWalletList != null && mMasterWalletList.size() > 0) {
            mCurrentMasterWallet = mMasterWalletList.get(0);
            if (mCurrentMasterWallet != null) {
                // mDidManager = IdManagerFactory.CreateIdManager(mCurrentMasterWallet);
            }
        }
    }

    private void initDidManager() {
        if (mCurrentMasterWallet != null) {
            // mDidManager = IdManagerFactory.CreateIdManager(mCurrentMasterWallet);
        }
    }

    @Override
    public boolean execute(String action, JSONArray args, CallbackContext callbackContext) {
        Log.d("JS-Wallet", "execute=============action="+action);
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
              case "createTransaction":
                  this.createTransaction(args, callbackContext);
                  return true;
              case "createMultiSignTransaction":
                  this.createMultiSignTransaction(args, callbackContext);
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
              case "getAllChainIds":
                  this.getAllChainIds(args, callbackContext);
                  return true;
              case "getWalletId":
                  this.getWalletId(args, callbackContext);
                  return true;
              case "saveConfigs":
                  this.saveConfigs(args, callbackContext);
                  return true;
              case "isAddressValid":
                  this.isAddressValid(args, callbackContext);
                  return true;
              case "generateMnemonic":
                  this.generateMnemonic(args, callbackContext);
                  return true;
              case "initializeMasterWallet":
                  this.initializeMasterWallet(args, callbackContext);
                  return true;
              case "destroyWallet":
                  this.destroyWallet(args, callbackContext);
                  return true;
              case "getSupportedChains":
                  this.getSupportedChains(args, callbackContext);
                  return true;
              case "changePassword":
                  this.changePassword(args, callbackContext);
                  return true;
              case "resetAddressCache":
                  this.resetAddressCache(args, callbackContext);
                  return true;
              case "sendRawTransaction":
                  this.sendRawTransaction(args, callbackContext);
                  return true;
              case "calculateTransactionFee":
                  this.calculateTransactionFee(args, callbackContext);
                  return true;
              case "createDID":
                  this.createDID(args, callbackContext);
                  return true;
              case "getDIDList":
                  this.getDIDList(args, callbackContext);
                  return true;
              case "destoryDID":
                  this.destoryDID(args, callbackContext);
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
            initDidManager();
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

    public void saveConfigs(JSONArray args, CallbackContext callbackContext) throws JSONException {
        Enviroment.SaveConfigs();
        callbackContext.success();
    }

    public void generateMnemonic(JSONArray args, CallbackContext callbackContext) throws JSONException {
        if (mCurrentMasterWallet == null) {
            callbackContext.success(parseOneParam(ERRORCODE, "The masterWallet is null"));
        }
        String mnemonic = mCurrentMasterWallet.GenerateMnemonic();
        callbackContext.success(parseOneParam("mnemonic", mnemonic));
    }

    public void isAddressValid(JSONArray args, CallbackContext callbackContext) throws JSONException {
        if (mCurrentMasterWallet == null) {
            callbackContext.success(parseOneParam(ERRORCODE, "The masterWallet is null"));
        }
        boolean valid = mCurrentMasterWallet.IsAddressValid(args.getString(0));
        callbackContext.success(parseOneParam("valid", valid));
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

    //CreateMasterWallet(String masterWalletId, String language)
    public void createMasterWallet(JSONArray args, CallbackContext callbackContext) throws JSONException {
        mCurrentMasterWallet = mWalletManager.CreateMasterWallet(args.getString(0), args.getString(1));
        if (mCurrentMasterWallet != null) {
            mMasterWalletList.add(mCurrentMasterWallet);
            initDidManager();
            callbackContext.success();
        }
        else {
            callbackContext.error("CreateMasterWallet failed.");
        }
    }

    //DestroyWallet(String masterWalletId)
    public void destroyWallet(JSONArray args, CallbackContext callbackContext) throws JSONException {
        mWalletManager.DestroyWallet(args.getString(0));
        callbackContext.success();
    }

    //InitializeMasterWallet(String masterWalletId, String mnemonic, String phrasePassword, String payPassword)
    public void initializeMasterWallet(JSONArray args, CallbackContext callbackContext) throws JSONException {
        boolean status = mWalletManager.InitializeMasterWallet(args.getString(0), args.getString(1), args.getString(2), args.getString(3));
        callbackContext.success(parseOneParam("status", status));
    }

    //ImportWalletWithKeystore(String masterWalletId, String keystoreContent, String backupPassWord ,String payPassWord, String phrasePassword)
    public void importWalletWithKeystore(JSONArray args, CallbackContext callbackContext) throws JSONException {
        Log.d(TAG, "ImportWalletWithKeystore   ===="+args.getString(0)+", "+args.getString(1)+", "+args.getString(2)+", "+args.getString(3)+", "+args.getString(4));
        mCurrentMasterWallet = mWalletManager.ImportWalletWithKeystore(args.getString(0), args.getString(1), args.getString(2), args.getString(3), args.getString(4));
        if (mCurrentMasterWallet != null) {
            mMasterWalletList.add(mCurrentMasterWallet);
            initDidManager();
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
            initDidManager();
            callbackContext.success();
        }
        else {
            callbackContext.error("ImportWalletWithMnemonic failed.");
        }
    }

    //ExportWalletWithKeystore(IMasterWallet masterWallet, String backupPassWord, String payPassword, String keystorePath)
    public void exportWalletWithKeystore(JSONArray args, CallbackContext callbackContext) throws JSONException {
        String keystoreContent = mWalletManager.ExportWalletWithKeystore(mCurrentMasterWallet, args.getString(0), args.getString(1));
        callbackContext.success(parseOneParam("keystoreContent", keystoreContent));
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

    // String CreateTransaction(String fromAddress, String toAddress, long amount, long fee, String memo)
    public void createTransaction(JSONArray args, CallbackContext callbackContext) throws JSONException {
        //The first parameter is [chainID]
        ISubWallet subWallet = mSubWalletMap.get(args.getString(0));
        if (subWallet == null) {
            callbackContext.error("Don't have the subWallet, please check.");
            return;
        }

        String transactionId = subWallet.CreateTransaction(args.getString(1), args.getString(2), args.getLong(3),
                                args.getLong(4), args.getString(5));
        if (transactionId != null) {
            callbackContext.success(parseOneParam("transactionId", transactionId));
        }
        else {
            callbackContext.error("CreateTransaction failed.");
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

    public void createMultiSignTransaction(JSONArray args, CallbackContext callbackContext) throws JSONException {
        //The first parameter is [chainID]
        ISubWallet subWallet = mSubWalletMap.get(args.getString(0));
        if (subWallet == null) {
            callbackContext.error("Don't have the subWallet, please check.");
            return;
        }

        String result = subWallet.CreateMultiSignTransaction(args.getString(1), args.getString(2), args.getLong(3),
                    args.getLong(4), args.getString(5));

        if (result != null) {
            callbackContext.success(parseOneParam("result", result));
        }
        else {
            callbackContext.error("createMultiSignTransaction failed.");
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
      Log.d("JS-Wallet", "getBalance=============chainID="+args.getString(0));
        //The first parameter is [chainID]
        ISubWallet subWallet = mSubWalletMap.get(args.getString(0));
        if (subWallet == null) {
            Log.d("JS-Wallet", "getBalance=============chainID=null");
            callbackContext.error("Don't have the subWallet, please check.");
            return;
        }

        Log.d("JS-Wallet", "getBalance=============================2");
        callbackContext.success(parseOneParam("balance", subWallet.GetBalance()));
        Log.d("JS-Wallet", "getBalance=============================3");
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

    //String SendRawTransaction(String transactionJson, long fee, String payPassword)
    public void sendRawTransaction(JSONArray args, CallbackContext callbackContext) throws JSONException {
        //The first parameter is [chainID]
        ISubWallet subWallet = mSubWalletMap.get(args.getString(0));
        if (subWallet == null) {
            callbackContext.error("Don't have the subWallet, please check.");
            return;
        }

        String json = subWallet.SendRawTransaction(args.getString(1), args.getLong(2), args.getString(3));
        callbackContext.success(parseOneParam("json", json));
    }

    //long CalculateTransactionFee(String rawTransaction, uint64_t feePerKb)
    public void calculateTransactionFee(JSONArray args, CallbackContext callbackContext) throws JSONException {
        //The first parameter is [chainID]
        ISubWallet subWallet = mSubWalletMap.get(args.getString(0));
        if (subWallet == null) {
            callbackContext.error("Don't have the subWallet, please check.");
            return;
        }

        long fee = subWallet.CalculateTransactionFee(args.getString(1), args.getLong(2));
        callbackContext.success(parseOneParam("fee", fee));
    }

    public void getAllChainIds(JSONArray args, CallbackContext callbackContext) throws JSONException {
        if (mSubWalletMap.size() < 1) {
            callbackContext.success(parseOneParam("chainId", null));
            return;
        }
        JSONObject jsonObject = new JSONObject();
        for (String key : mSubWalletMap.keySet()) {
            jsonObject.put(key, key);
        }
        callbackContext.success(jsonObject);
    }

    public void getSupportedChains(JSONArray args, CallbackContext callbackContext) throws JSONException {
        if (mCurrentMasterWallet != null) {
            String[] supportedChains = mCurrentMasterWallet.GetSupportedChains();
            JSONObject jsonObject = new JSONObject();
            if (supportedChains != null) {
                for (int i = 0; i < supportedChains.length; i++) {
                    jsonObject.put(supportedChains[i], supportedChains[i]);
                }
            }

            callbackContext.success(jsonObject);
            return;
        }

        callbackContext.success(parseOneParam("supportedChains", null));
    }

    public void changePassword(JSONArray args, CallbackContext callbackContext) throws JSONException {
        if (mCurrentMasterWallet != null) {
            mCurrentMasterWallet.ChangePassword(args.getString(0), args.getString(1));
            callbackContext.success();
            return;
        }

        callbackContext.success(parseOneParam("changePassword", null));
    }

    public void resetAddressCache(JSONArray args, CallbackContext callbackContext) throws JSONException {
        if (mCurrentMasterWallet != null) {
            mCurrentMasterWallet.ResetAddressCache(args.getString(0));
            callbackContext.success();
            return;
        }

        callbackContext.success(parseOneParam("changePassword", null));
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


    //did
    //CreateDID(String password)
    public void createDID(JSONArray args, CallbackContext callbackContext) throws JSONException {
        if (mDidManager != null) {
            IDid did = mDidManager.CreateDID(args.getString(0));
            callbackContext.success(parseOneParam("didname", did.GetDIDName()));
            return;
        }

        callbackContext.success(parseOneParam("didname", null));
    }

    //String GetDIDList()
    public void getDIDList(JSONArray args, CallbackContext callbackContext) throws JSONException {
        if (mDidManager != null) {
            String list = mDidManager.GetDIDList();
            callbackContext.success(parseOneParam("list", list));
            return;
        }

        callbackContext.success(parseOneParam("list", null));
    }

    //void DestoryDID(String didName)
    public void destoryDID(JSONArray args, CallbackContext callbackContext) throws JSONException {
        if (mDidManager != null) {
            mDidManager.DestoryDID(args.getString(0));
            callbackContext.success();
            return;
        }

        callbackContext.error("DidManager is null");
    }

    @Override
    public void onDestroy() {
        super.onDestroy();
    }
}
