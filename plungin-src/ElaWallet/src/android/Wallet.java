package ElaWallet;

import android.util.JsonReader;

import com.elastos.spvcore.IMasterWallet;
import com.elastos.spvcore.ISubWallet;
import com.elastos.spvcore.IMainchainSubWallet;
import com.elastos.spvcore.IIdChainSubWallet;
import com.elastos.spvcore.ISidechainSubWallet;
import com.elastos.spvcore.ISubWalletCallback;
import com.elastos.spvcore.MasterWalletManager;
import com.elastos.spvcore.DIDManagerSupervisor;
import com.elastos.spvcore.IDidManager;
import com.elastos.spvcore.IDid;
import com.elastos.spvcore.IIdManagerCallback;
import com.elastos.spvcore.WalletException;
import com.elastos.wallet.util.LogUtil;

import org.apache.cordova.CordovaInterface;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaWebView;
import org.apache.cordova.PluginResult;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.List;
import java.util.HashMap;
import java.util.Map;
import java.util.Set;
import java.util.Iterator;
import android.util.Log;

import io.ionic.starter.MyUtil;

/**
 * wallet webview jni
 */
public class Wallet extends CordovaPlugin {
	private static final String TAG = "Wallet.java";

	private Map<String, IDidManager> mDIDManagerMap = new HashMap<String, IDidManager>();
	private DIDManagerSupervisor mDIDManagerSupervisor = null;
	private MasterWalletManager mMasterWalletManager = null;
	//private IDidManager mDidManager = null;
	private String mRootPath = null;

	private String keySuccess   = "success";
	private String keyError     = "error";
	private String keyCode      = "code";
	private String keyMessage   = "message";
	private String keyException = "exception";

	private int errCodeParseJsonInAction          = 10000;
	private int errCodeInvalidArg                 = 10001;
	private int errCodeInvalidMasterWallet        = 10002;
	private int errCodeInvalidSubWallet           = 10003;
	private int errCodeCreateMasterWallet         = 10004;
	private int errCodeCreateSubWallet            = 10005;
	private int errCodeRecoverSubWallet           = 10006;
	private int errCodeInvalidMasterWalletManager = 10007;
	private int errCodeImportFromKeyStore         = 10008;
	private int errCodeImportFromMnemonic         = 10009;
	private int errCodeSubWalletInstance          = 10010;
	private int errCodeInvalidDIDManager          = 10011;
	private int errCodeInvalidDID                 = 10012;
	private int errCodeActionNotFound             = 10013;

	private int errCodeWalletException            = 20000;

	@Override
	public void initialize(CordovaInterface cordova, CordovaWebView webView) {
		super.initialize(cordova, webView);

		mRootPath = MyUtil.getRootPath();

		Log.i(TAG, "Initialize mRootPath = " + mRootPath);

//		mDIDManagerSupervisor = new DIDManagerSupervisor(mRootPath);

		mMasterWalletManager = new MasterWalletManager(mRootPath);
		MyUtil.SetCurrentMasterWalletManager(mMasterWalletManager);
		ArrayList<IMasterWallet> masterWalletList = mMasterWalletManager.GetAllMasterWallets();
		for (int i = 0; i < masterWalletList.size(); i++) {
			createDIDManager(masterWalletList.get(i));
		}

		if (masterWalletList.size() == 0) {
			Log.w(TAG, "Without master wallet: you should create one at least");
		}
	}

	private boolean createDIDManager(IMasterWallet masterWallet) {
		try {
//			String masterWalletId = masterWallet.GetId();
//			JSONObject basicInfo = new JSONObject(masterWallet.GetBasicInfo());
//			String accountType = basicInfo.getJSONObject("Account").getString("Type");
//			if (! accountType.equals("Standard")) {
//				Log.w(TAG, "Master wallet '" + masterWalletId + "' is not standard account, can't create DID manager");
//				return false;
//			}
//
//			if (null != getDIDManager(masterWalletId)) {
//				Log.w(TAG, "Master wallet '" + masterWalletId + "' already contain DID manager");
//				return false;
//			}
//
//			Log.i(TAG, "Master wallet '" + masterWallet.GetId() + "' create DID manager with root path '" + mRootPath + "'");
//			IDidManager DIDManager = mDIDManagerSupervisor.CreateDIDManager(masterWallet, mRootPath);
//			putDIDManager(masterWalletId, DIDManager);
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			Log.e(TAG, "DID manager initialize exception");
		}

		return false;
	}

	private void destroyIDManager(IMasterWallet masterWallet) {
		try {
//			String masterWalletID = masterWallet.GetId();
//
//			IDidManager DIDManager = getDIDManager(masterWalletID);
//			if (null == DIDManager) {
//				return;
//			}
//			mDIDManagerMap.remove(masterWalletID);
//
//			mDIDManagerSupervisor.DestroyDIDManager(DIDManager);
		} catch (Exception e) {
			e.printStackTrace();
			Log.e(TAG, "DID manager destroy exception");
		}
	}

	private IDidManager getDIDManager(String masterWalletId) {
		return mDIDManagerMap.get(masterWalletId);
	}

	private void putDIDManager(String masterWalletId, IDidManager DIDManager) {
		mDIDManagerMap.put(masterWalletId, DIDManager);
	}

	private JSONObject mkJson(String key, Object value) throws JSONException {
		JSONObject jsonObject = new JSONObject();
		jsonObject.put(key, value);

		return jsonObject;
	}

	private boolean parametersCheck(JSONArray args) throws JSONException {
		Log.i(TAG, "args = " + args);
		for (int i = 0; i < args.length(); i++) {
			if (args.isNull(i)) {
				Log.e(TAG, "arg[" + i + "] = " + args.get(i));
				return false;
			}
		}

		return true;
	}

	private void exceptionProcess(WalletException e, CallbackContext cc, Object msg) throws JSONException {
		e.printStackTrace();

		JSONObject errJson = new JSONObject();

		errJson.put(keyCode, errCodeWalletException);
		errJson.put(keyMessage, msg);
		errJson.put(keyException, e.GetErrorInfo());

		Log.e(TAG, errJson.toString());

		cc.error(mkJson(keyError, errJson));
	}

	private void errorProcess(CallbackContext cc, int code, Object msg) {
		try {
			JSONObject errJson = new JSONObject();

			errJson.put(keyCode, code);
			errJson.put(keyMessage, msg);
			Log.e(TAG, errJson.toString());

			cc.error(mkJson(keyError, errJson));
		} catch (JSONException e) {
			String m = "Make json error message exception: " + e.toString();
			Log.e(TAG, m);
			cc.error(m);
		}
	}

	private void successProcess(CallbackContext cc, Object msg) throws JSONException {
		Log.i(TAG, "" + msg);
		cc.success(mkJson(keySuccess, msg));
	}

	private IMasterWallet getMasterWallet(String masterWalletId) {
		if (mMasterWalletManager == null) {
			Log.e(TAG, "Master wallet manager has not initialize");
			return null;
		}

		ArrayList<IMasterWallet> masterWalletList = mMasterWalletManager.GetAllMasterWallets();
		for (int i = 0; i < masterWalletList.size(); i++) {
			if (masterWalletId.equals(masterWalletList.get(i).GetId())) {
				return masterWalletList.get(i);
			}
		}

		Log.e(TAG, "Master wallet '" + masterWalletId + "' not found");
		return null;
	}

	private ISubWallet getSubWallet(String masterWalletId, String chainId) {
		IMasterWallet masterWallet = getMasterWallet(masterWalletId);
		if (masterWallet == null) {
			return null;
		}

		ArrayList<ISubWallet> subWalletList = masterWallet.GetAllSubWallets();
		for (int i = 0; i < subWalletList.size(); i++) {
			if (chainId.equals(subWalletList.get(i).GetChainId())) {
				return subWalletList.get(i);
			}
		}

		Log.e(TAG, "sub wallet '" + chainId + "' not found");
		return null;
	}

	@Override
	public boolean execute(String action, JSONArray args, CallbackContext cc) {
		Log.i(TAG, "execute: action = '" + action + "'");
		try {
			if (false == parametersCheck(args)) {
				errorProcess(cc, errCodeInvalidArg, "Parameters contain 'null' value in action '" + action + "'");
				return false;
			}
			switch (action) {
				case "coolMethod":
					String message = args.getString(0);
					this.coolMethod(message, cc);
					break;
				case "print":
					this.print(args.getString(0), cc);
					break;

					// Master wallet manager
				case "saveConfigs":
					this.saveConfigs(args, cc);
					break;
				case "generateMnemonic":
					this.generateMnemonic(args, cc);
					break;
				case "createMasterWallet":
					this.createMasterWallet(args, cc);
					break;
				case "createMultiSignMasterWallet":
					this.createMultiSignMasterWallet(args, cc);
					break;
				case "createMultiSignMasterWalletWithPrivKey":
					this.createMultiSignMasterWalletWithPrivKey(args, cc);
					break;
				case "createMultiSignMasterWalletWithMnemonic":
					this.createMultiSignMasterWalletWithMnemonic(args, cc);
					break;
				case "getAllMasterWallets":
					this.getAllMasterWallets(args, cc);
					break;
				case "importWalletWithKeystore":
					this.importWalletWithKeystore(args, cc);
					break;
				case "importWalletWithMnemonic":
					this.importWalletWithMnemonic(args, cc);
					break;
				case "exportWalletWithKeystore":
					this.exportWalletWithKeystore(args, cc);
					break;
				case "exportWalletWithMnemonic":
					this.exportWalletWithMnemonic(args, cc);
					break;
				case "convertToHexString":
					this.convertToHexString(args, cc);
					break;
				case "convertFromHexString":
					this.convertFromHexString(args, cc);
					break;

					// Master wallet
				case "getMasterWalletBasicInfo":
					this.getMasterWalletBasicInfo(args, cc);
					break;
				case "getAllSubWallets":
					this.getAllSubWallets(args, cc);
					break;
				case "createSubWallet":
					this.createSubWallet(args, cc);
					break;
				case "recoverSubWallet":
					this.recoverSubWallet(args, cc);
					break;
				case "destroyWallet":
					this.destroyWallet(args, cc);
					break;
				case "getMasterWalletPublicKey":
					this.getMasterWalletPublicKey(args, cc);
					break;
				case "masterWalletSign":
					this.masterWalletSign(args, cc);
					break;
				case "masterWalletCheckSign":
					this.masterWalletCheckSign(args, cc);
					break;
				case "isAddressValid":
					this.isAddressValid(args, cc);
					break;
				case "getSupportedChains":
					this.getSupportedChains(args, cc);
					break;
				case "changePassword":
					this.changePassword(args, cc);
					break;

					// SubWallet
				case "getBalanceInfo":
					this.getBalanceInfo(args, cc);
					break;
				case "getBalance":
					this.getBalance(args, cc);
					break;
				case "createAddress":
					this.createAddress(args, cc);
					break;
				case "getAllAddress":
					this.getAllAddress(args, cc);
					break;
				case "getBalanceWithAddress":
					this.getBalanceWithAddress(args, cc);
					break;
				case "createTransaction":
					this.createTransaction(args, cc);
					break;
				case "createMultiSignTransaction":
					this.createMultiSignTransaction(args, cc);
					break;
				case "calculateTransactionFee":
					this.calculateTransactionFee(args, cc);
					break;
				case "updateTransactionFee":
					this.updateTransactionFee(args, cc);
					break;
				case "signTransaction":
					this.signTransaction(args, cc);
					break;
				case "publishTransaction":
					this.publishTransaction(args, cc);
					break;
				case "getAllTransaction":
					this.getAllTransaction(args, cc);
					break;
				case "subWalletSign":
					this.sign(args, cc);
					break;
				case "subWalletCheckSign":
					this.checkSign(args, cc);
					break;
				case "getSubWalletPublicKey":
					this.getSubWalletPublicKey(args, cc);
					break;
				case "registerWalletListener":
					this.registerWalletListener(args, cc);
					break;

					// ID chain subwallet
				case "createIdTransaction":
					this.createIdTransaction(args, cc);
					break;

					// Main chain subwallet
				case "createDepositTransaction":
					this.createDepositTransaction(args, cc);
					break;

					// Side chain subwallet
				case "createWithdrawTransaction":
					this.createWithdrawTransaction(args, cc);
					break;
				case "getGenesisAddress":
					this.getGenesisAddress(args, cc);
					break;

					//did
				case "createDID":
					this.createDID(args, cc);
					break;
				case "didGenerateProgram":
					this.didGenerateProgram(args, cc);
					break;
				case "getDIDList":
					this.getDIDList(args, cc);
					break;
				case "destoryDID":
					this.destoryDID(args, cc);
					break;
				case "didSetValue":
					this.didSetValue(args, cc);
					break;
				case "didGetValue":
					this.didGetValue(args, cc);
					break;
				case "didGetHistoryValue":
					this.didGetHistoryValue(args, cc);
					break;
				case "didGetAllKeys":
					this.didGetAllKeys(args, cc);
					break;
				case "didSign":
					this.didSign(args, cc);
					break;
				case "didCheckSign":
					this.didCheckSign(args, cc);
					break;
				case "didGetPublicKey":
					this.didGetPublicKey(args, cc);
					break;
				case "registerIdListener":
					this.registerIdListener(args, cc);
					break;
				default:
					errorProcess(cc, errCodeActionNotFound, "Action '" + action + "' not found, please check!");
					return false;
			}
		} catch (JSONException e) {
			e.printStackTrace();
			errorProcess(cc, errCodeParseJsonInAction, "Execute action '" + action + "' exception: " + e.toString());
			return false;
		}

		return true;
	}

	// args[0]: String masterWalletId
	// args[1]: String chainId
	// args[2]: String payPassword
	// args[3]: boolean singleAddress
	// args[4]: long feePerKb
	public void createSubWallet(JSONArray args, CallbackContext cc) throws JSONException {
		int idx = 0;

		String masterWalletId = args.getString(idx++);
		String chainId        = args.getString(idx++);
		String payPassword    = args.getString(idx++);
		boolean singleAddress = args.getBoolean(idx++);
		long feePerKb         = args.getLong(idx++);

		if (args.length() != idx) {
			errorProcess(cc, errCodeInvalidArg, idx + " parameters are expected");
			return;
		}

		try {
			IMasterWallet masterWallet = getMasterWallet(masterWalletId);
			if (masterWallet == null) {
				errorProcess(cc, errCodeInvalidMasterWallet, "Get master wallet '" + masterWalletId + "' fail");
				return;
			}

			ISubWallet subWallet = masterWallet.CreateSubWallet(chainId, payPassword, singleAddress, feePerKb);
			if (subWallet == null) {
				errorProcess(cc, errCodeCreateSubWallet, "Master wallet '" + masterWalletId + "' create subwallet '" + chainId + "' fail");
				return;
			}
			successProcess(cc, "Master wallet '" + masterWalletId + "' create subwallet '" + chainId + "' successfully");
		} catch (WalletException e) {
			exceptionProcess(e, cc, "Master wallet '" + masterWalletId + "' create subwallet '" + chainId + "'");
		}
	}

	// args[0]: String masterWalletId
	// args[1]: String chainId
	// args[2]: String payPassword
	// args[3]: boolean singleAddress
	// args[4]: int limitGap
	// args[5]: long feePerKb
	public void recoverSubWallet(JSONArray args, CallbackContext cc) throws JSONException {
		int idx = 0;

		String masterWalletId = args.getString(idx++);
		String chainId        = args.getString(idx++);
		String payPassword    = args.getString(idx++);
		boolean singleAddress = args.getBoolean(idx++);
		int limitGap          = args.getInt(idx++);
		long feePerKb         = args.getLong(idx++);

		if (args.length() != idx) {
			errorProcess(cc, errCodeInvalidArg, idx + " parameters are expected");
			return;
		}

		try {
			IMasterWallet masterWallet = getMasterWallet(masterWalletId);
			if (masterWallet == null) {
				errorProcess(cc, errCodeInvalidMasterWallet, "Get master wallet '" + masterWalletId + "' fail");
				return;
			}

			ISubWallet subWallet = masterWallet.RecoverSubWallet(chainId, payPassword, singleAddress, limitGap, feePerKb);
			if (subWallet == null) {
				errorProcess(cc, errCodeRecoverSubWallet, "Master wallet '" + masterWalletId + "' recover subwallet '" + chainId + "' fail");
				return;
			}
			successProcess(cc, "Master wallet '" + masterWalletId + "' recover subwallet '" + chainId + "' successfully");
		} catch (WalletException e) {
			exceptionProcess(e, cc, "Master wallet '" + masterWalletId + "' recover subwallet '" + chainId + "'");
		}
	}

	public void getAllMasterWallets(JSONArray args, CallbackContext cc) throws JSONException {
		try {
			ArrayList<IMasterWallet> masterWalletList = mMasterWalletManager.GetAllMasterWallets();
			JSONArray masterWalletListJson = new JSONArray();

			if (masterWalletList.size() == 0) {
				errorProcess(cc, errCodeInvalidMasterWallet, "Don't have any master wallet");
				return;
			}

			for (int i = 0; i < masterWalletList.size(); i++) {
				masterWalletListJson.put(masterWalletList.get(i).GetId());
			}
			successProcess(cc, masterWalletListJson.toString());
		} catch (WalletException e) {
			exceptionProcess(e, cc, "Get all master wallets exception");
		}
	}

	// args[0]: String masterWalletId
	public void getMasterWalletBasicInfo(JSONArray args, CallbackContext cc) throws JSONException {
		int idx = 0;

		String masterWalletId = args.getString(idx++);

		if (args.length() != idx) {
			errorProcess(cc, errCodeInvalidArg, idx + " parameters are expected");
			return;
		}

		try {
			IMasterWallet masterWallet = getMasterWallet(masterWalletId);
			if (masterWallet == null) {
				errorProcess(cc, errCodeInvalidMasterWallet, "Get master wallet '" + masterWalletId + "' fail");
				return;
			}

			successProcess(cc, masterWallet.GetBasicInfo());
		} catch (WalletException e) {
			exceptionProcess(e, cc, "Master wallet '" + masterWalletId + "' get basic info");
		}
	}

	// args[0]: String masterWalletId
	public void getAllSubWallets(JSONArray args, CallbackContext cc) throws JSONException {
		int idx = 0;

		String masterWalletId = args.getString(idx++);

		if (args.length() != idx) {
			errorProcess(cc, errCodeInvalidArg, idx + " parameters are expected");
			return;
		}

		try {
			IMasterWallet masterWallet = getMasterWallet(masterWalletId);
			if (masterWallet == null) {
				errorProcess(cc, errCodeInvalidMasterWallet, "Get master wallet '" + masterWalletId + "' fail");
				return;
			}

			ArrayList<ISubWallet> subWalletList = masterWallet.GetAllSubWallets();
			if (subWalletList.size() == 0) {
				errorProcess(cc, errCodeInvalidSubWallet, "Master wallet '" + masterWalletId + "' don't have any subwallet");
				return;
			}

			JSONArray subWalletJsonArray = new JSONArray();
			for (int i = 0; i < subWalletList.size(); i++) {
				subWalletJsonArray.put(subWalletList.get(i).GetChainId());
			}
			successProcess(cc, subWalletJsonArray.toString());
		} catch (WalletException e) {
			exceptionProcess(e, cc, "Master wallet '" + masterWalletId + "' get all subwallets");
		}
	}

	public void saveConfigs(JSONArray args, CallbackContext cc) throws JSONException {
		if (mMasterWalletManager == null) {
			errorProcess(cc, errCodeInvalidMasterWalletManager, "Master wallet manager has not initialize");
			return;
		}

		try {
			mMasterWalletManager.SaveConfigs();
			successProcess(cc, "Configuration files save successfully");
		} catch(WalletException e) {
			exceptionProcess(e, cc, "Master wallet manager save configuration files");
		}
	}

	// args[0]: String language
	public void generateMnemonic(JSONArray args, CallbackContext cc) throws JSONException {
		int idx = 0;

		String language = args.getString(idx++);

		if (args.length() != idx) {
			errorProcess(cc, errCodeInvalidArg, idx + " parameters are expected");
			return;
		}

		if (mMasterWalletManager == null) {
			errorProcess(cc, errCodeInvalidMasterWalletManager, "Master wallet manager has not initialize");
			return;
		}

		try {
			String mnemonic = mMasterWalletManager.GenerateMnemonic(language);
			Log.i(TAG, "Generate mnemonic in '" + language + "'");
			cc.success(mkJson(keySuccess, mnemonic));
		} catch (WalletException e) {
			exceptionProcess(e, cc, "Generate mnemonic in '" + language + "'");
		}
	}

	// args[0]: String masterWalletId
	// args[1]: String address
	public void isAddressValid(JSONArray args, CallbackContext cc) throws JSONException {
		int idx = 0;

		String masterWalletId = args.getString(idx++);
		String addr           = args.getString(idx++);

		if (args.length() != idx) {
			errorProcess(cc, errCodeInvalidArg, idx + " parameters are expected");
			return;
		}

		try {
			IMasterWallet masterWallet = getMasterWallet(masterWalletId);
			if (masterWallet == null) {
				errorProcess(cc, errCodeInvalidMasterWallet, "Get master wallet '" + masterWalletId + "' fail");
				return;
			}

			boolean valid = masterWallet.IsAddressValid(addr);
			successProcess(cc, valid);
		} catch (WalletException e) {
			exceptionProcess(e, cc, "Check is address valid of master wallet '" + masterWalletId + "'");
		}
	}

	// args[0]: String masterWalletId
	// args[1]: String mnemonic
	// args[2]: String phrasePassword
	// args[3]: String payPassword
	// args[4]: String language
	public void createMasterWallet(JSONArray args, CallbackContext cc) throws JSONException {
		int idx = 0;

		String masterWalletId = args.getString(idx++);
		String mnemonic       = args.getString(idx++);
		String phrasePassword = args.getString(idx++);
		String payPassword    = args.getString(idx++);
		String language       = args.getString(idx++);

		if (args.length() != idx) {
			errorProcess(cc, errCodeInvalidArg, idx + " parameters are expected");
			return;
		}

		try {
			IMasterWallet masterWallet = mMasterWalletManager.CreateMasterWallet(
					masterWalletId, mnemonic, phrasePassword, payPassword, language);

			if (masterWallet == null) {
				errorProcess(cc, errCodeCreateMasterWallet, "Create master wallet '" + masterWalletId + "' failed");
				return;
			}
			createDIDManager(masterWallet);
			successProcess(cc, "Create master wallet '" + masterWalletId + "' OK");
		} catch (WalletException e) {
			exceptionProcess(e, cc, "Create master wallet '" + masterWalletId + "'");
		}
	}

	// args[0]: String masterWalletId
	// args[1]: String coSigners
	// args[2]: int requiredSignCount
	public void createMultiSignMasterWallet(JSONArray args, CallbackContext cc) throws JSONException {
		int idx = 0;
		String privKey = null;

		String masterWalletId = args.getString(idx++);
		String coSigners      = args.getString(idx++);
		int requiredSignCount = args.getInt(idx++);

		if (args.length() != idx) {
			errorProcess(cc, errCodeInvalidArg, idx + " parameters are expected");
			return;
		}

		try {
			IMasterWallet masterWallet = mMasterWalletManager.CreateMultiSignMasterWallet(
						masterWalletId, coSigners, requiredSignCount);

			if (masterWallet == null) {
				errorProcess(cc, errCodeCreateMasterWallet, "Create multi sign master wallet '" + masterWalletId + "' failed");
				return;
			}

			createDIDManager(masterWallet);
			successProcess(cc, "Create multi sign master wallet '" + masterWalletId + "' OK");
		} catch (WalletException e) {
			exceptionProcess(e, cc, "Create multi sign master wallet '" + masterWalletId + "'");
		}
	}

	// args[0]: String masterWalletId
	// args[1]: String privKey
	// args[2]: String payPassword
	// args[3]: String coSigners
	// args[4]: int requiredSignCount
	public void createMultiSignMasterWalletWithPrivKey(JSONArray args, CallbackContext cc) throws JSONException {
		int idx = 0;

		String masterWalletId = args.getString(idx++);
		String privKey        = args.getString(idx++);
		String payPassword    = args.getString(idx++);
		String coSigners      = args.getString(idx++);
		int requiredSignCount = args.getInt(idx++);

		if (args.length() != idx) {
			errorProcess(cc, errCodeInvalidArg, idx + " parameters are expected");
			return;
		}

		try {
			IMasterWallet masterWallet = mMasterWalletManager.CreateMultiSignMasterWallet(
						masterWalletId, privKey, payPassword, coSigners, requiredSignCount);

			if (masterWallet == null) {
				errorProcess(cc, errCodeCreateMasterWallet, "Create multi sign master wallet '" + masterWalletId + "' failed");
				return;
			}

			createDIDManager(masterWallet);
			successProcess(cc, "Create multi sign master wallet '" + masterWalletId + "' with private key OK");
		} catch (WalletException e) {
			exceptionProcess(e, cc, "Create multi sign master wallet '" + masterWalletId + "' with private key");
		}
	}

	// args[0]: String masterWalletId
	// args[1]: String mnemonic
	// args[2]: String phrasePassword
	// args[3]: String payPassword
	// args[4]: String coSignersJson
	// args[5]: int requiredSignCount
	// args[6]: String language
	public void createMultiSignMasterWalletWithMnemonic(JSONArray args, CallbackContext cc) throws JSONException {
		int idx = 0;

		String masterWalletId = args.getString(idx++);
		String mnemonic       = args.getString(idx++);
		String phrasePassword = args.getString(idx++);
		String payPassword    = args.getString(idx++);
		String coSigners      = args.getString(idx++);
		int requiredSignCount = args.getInt(idx++);
		String language       = args.getString(idx++);

		if (args.length() != idx) {
			errorProcess(cc, errCodeInvalidArg, idx + " parameters are expected");
			return;
		}

		try {
			IMasterWallet masterWallet = mMasterWalletManager.CreateMultiSignMasterWallet(
						masterWalletId, mnemonic, phrasePassword, payPassword, coSigners, requiredSignCount, language);

			if (masterWallet == null) {
				errorProcess(cc, errCodeCreateMasterWallet, "Create multi sign master wallet '" + masterWalletId + "' failed");
				return;
			}

			createDIDManager(masterWallet);
			successProcess(cc, "Create multi sign master wallet '" + masterWalletId + "' with mnemonic OK");
		} catch (WalletException e) {
			exceptionProcess(e, cc, "Create multi sign master wallet '" + masterWalletId + "' with mnemonic");
		}
	}

	// args[0]: String masterWalletId
	public void destroyWallet(JSONArray args, CallbackContext cc) throws JSONException {
		int idx = 0;

		String masterWalletId = args.getString(idx++);

		if (args.length() != idx) {
			errorProcess(cc, errCodeInvalidArg, idx + " parameters are expected");
			return;
		}

		try {
			IDidManager DIDManager = getDIDManager(masterWalletId);
			if (DIDManager != null) {
				// TODO destroy did manager
			}
			mMasterWalletManager.DestroyWallet(masterWalletId);
			successProcess(cc, "Destroy master wallet '" + masterWalletId + "' OK");
		} catch (WalletException e) {
			exceptionProcess(e, cc, "Destroy master wallet '" + masterWalletId + "'");
		}
	}

	// args[0]: String masterWalletId
	// args[1]: String keystoreContent
	// args[2]: String backupPassword
	// args[3]: String payPassword
	// args[4]: String phrasePassword
	public void importWalletWithKeystore(JSONArray args, CallbackContext cc) throws JSONException {
		int idx = 0;

		String masterWalletId  = args.getString(idx++);
		String keystoreContent = args.getString(idx++);
		String backupPassword  = args.getString(idx++);
		String payPassword     = args.getString(idx++);
		String phrasePassword  = args.getString(idx++);

		if (args.length() != idx) {
			errorProcess(cc, errCodeInvalidArg, idx + " parameters are expected");
			return;
		}

		try {
			IMasterWallet masterWallet = mMasterWalletManager.ImportWalletWithKeystore(
					masterWalletId, keystoreContent, backupPassword, payPassword, phrasePassword);
			if (masterWallet == null) {
				errorProcess(cc, errCodeImportFromKeyStore, "Import master wallet '" + masterWalletId + "' with keystore failed");
				return;
			}

			createDIDManager(masterWallet);

			successProcess(cc, "Import master wallet '" + masterWalletId + "' with keystore OK");
		} catch (WalletException e) {
			exceptionProcess(e, cc, "Import master wallet '" + masterWalletId + "' with keystore");
		}
	}

	// args[0]: String masterWalletId
	// args[1]: String mnemonic
	// args[2]: String phrasePassword
	// args[3]: String payPassword
	// args[4]: String language
	public void importWalletWithMnemonic(JSONArray args, CallbackContext cc) throws JSONException {
		int idx = 0;

		String masterWalletId = args.getString(idx++);
		String mnemonic       = args.getString(idx++);
		String phrasePassword = args.getString(idx++);
		String payPassword    = args.getString(idx++);
		String language       = args.getString(idx++);

		if (args.length() != idx) {
			errorProcess(cc, errCodeInvalidArg, idx + " parameters are expected");
			return;
		}

		try {
			IMasterWallet masterWallet = mMasterWalletManager.ImportWalletWithMnemonic(
					masterWalletId, mnemonic, phrasePassword, payPassword, language);
			if (masterWallet == null) {
				errorProcess(cc, errCodeImportFromMnemonic, "Import master wallet '" + masterWalletId + "' with mnemonic failed");
				return;
			}

			createDIDManager(masterWallet);
			successProcess(cc, "Import master wallet '" + masterWalletId + "' with mnemonic OK");
		} catch (WalletException e) {
			exceptionProcess(e, cc, "Import master wallet '" + masterWalletId + "' with mnemonic");
		}
	}

	// args[0]: String masterWalletId
	// args[1]: String backupPassword
	// args[2]: String payPassword
	public void exportWalletWithKeystore(JSONArray args, CallbackContext cc) throws JSONException {
		int idx = 0;

		String masterWalletId = args.getString(idx++);
		String backupPassword = args.getString(idx++);
		String payPassword    = args.getString(idx++);

		if (args.length() != idx) {
			errorProcess(cc, errCodeInvalidArg, idx + " parameters are expected");
			return;
		}

		try {
			IMasterWallet masterWallet = getMasterWallet(masterWalletId);
			if (masterWallet == null) {
				errorProcess(cc, errCodeInvalidMasterWallet, "Get master wallet '" + masterWalletId + "' fail");
				return;
			}

			String keystore = mMasterWalletManager.ExportWalletWithKeystore(masterWallet, backupPassword, payPassword);
			successProcess(cc, keystore);
		} catch (WalletException e) {
			exceptionProcess(e, cc, "Export master wallet '" + masterWalletId + "' with keystore");
		}
	}

	// args[0]: String masterWalletId
	// args[1]: String backupPassword
	public void exportWalletWithMnemonic(JSONArray args, CallbackContext cc) throws JSONException {
		int idx = 0;

		String masterWalletId = args.getString(idx++);
		String backupPassword = args.getString(idx++);

		if (args.length() != idx) {
			errorProcess(cc, errCodeInvalidArg, idx + " parameters are expected");
			return;
		}

		try {
			IMasterWallet masterWallet = getMasterWallet(masterWalletId);
			if (masterWallet == null) {
				errorProcess(cc, errCodeInvalidMasterWallet, "Get master wallet '" + masterWalletId + "' fail");
				return;
			}

			String mnemonic = mMasterWalletManager.ExportWalletWithMnemonic(masterWallet, backupPassword);
			cc.success(mkJson(keySuccess, mnemonic));
		} catch (WalletException e) {
			exceptionProcess(e, cc, "Export master wallet '" + masterWalletId + "' with mnemonic");
		}
	}

	// args[0]: String txJson
	public void convertToHexString(JSONArray args, CallbackContext cc) throws JSONException {
		int idx = 0;

		String txJson = args.getString(idx++);

		if (args.length() != idx) {
			errorProcess(cc, errCodeInvalidArg, idx + " parameters are expected");
			return;
		}

		try {
			String hexString = mMasterWalletManager.ConvertToHexString(txJson);
			successProcess(cc, hexString);
		} catch (WalletException e) {
			exceptionProcess(e, cc, "Tx convert from json to hex string");
		}
	}

	// args[0]: String txHexString
	public void convertFromHexString(JSONArray args, CallbackContext cc) throws JSONException {
		int idx = 0;

		String txHexString = args.getString(idx++);

		if (args.length() != idx) {
			errorProcess(cc, errCodeInvalidArg, idx + " parameters are expected");
			return;
		}

		try {
			String txJson = mMasterWalletManager.ConvertFromHexString(txHexString);
			successProcess(cc, txJson);
		} catch (WalletException e) {
			exceptionProcess(e, cc, "Tx convert from hex string to json");
		}
	}

	// args[0]: String masterWalletId
	// args[1]: String chainId
	public void getBalanceInfo(JSONArray args, CallbackContext cc) throws JSONException {
		int idx = 0;

		String masterWalletId = args.getString(idx++);
		String chainId        = args.getString(idx++);

		if (args.length() != idx) {
			errorProcess(cc, errCodeInvalidArg, idx + " parameters are expected");
			return;
		}

		try {
			ISubWallet subWallet = getSubWallet(masterWalletId, chainId);
			if (subWallet == null) {
				errorProcess(cc, errCodeInvalidSubWallet, "Get subwallet '" + chainId + "' of master wallet '" + masterWalletId + "' fail");
				return;
			}
			successProcess(cc, subWallet.GetBalanceInfo());
		} catch (WalletException e) {
			exceptionProcess(e, cc, "Master wallet '" + masterWalletId + "' subwallet '" + chainId + "' get balance info");
		}
	}

	// args[0]: String masterWalletId
	// args[1]: String chainId
	public void getBalance(JSONArray args, CallbackContext cc) throws JSONException {
		int idx = 0;

		String masterWalletId = args.getString(idx++);
		String chainId        = args.getString(idx++);

		if (args.length() != idx) {
			errorProcess(cc, errCodeInvalidArg, idx + " parameters are expected");
			return;
		}

		try {
			ISubWallet subWallet = getSubWallet(masterWalletId, chainId);
			if (subWallet == null) {
				errorProcess(cc, errCodeInvalidSubWallet, "Get subwallet '" + chainId + "' of master wallet '" + masterWalletId + "' fail");
				return;
			}

			successProcess(cc, subWallet.GetBalance());
		} catch (WalletException e) {
			exceptionProcess(e, cc, "Master wallet '" + masterWalletId + "' subwallet '" + chainId + "' get balance");
		}
	}

	// args[0]: String masterWalletId
	// args[1]: String chainId
	public void createAddress(JSONArray args, CallbackContext cc) throws JSONException {
		int idx = 0;

		String masterWalletId = args.getString(idx++);
		String chainId        = args.getString(idx++);

		if (args.length() != idx) {
			errorProcess(cc, errCodeInvalidArg, idx + " parameters are expected");
			return;
		}

		try {
			ISubWallet subWallet = getSubWallet(masterWalletId, chainId);
			if (subWallet == null) {
				errorProcess(cc, errCodeInvalidSubWallet, "Get subwallet '" + chainId + "' of master wallet '" + masterWalletId + "' fail");
				return;
			}

			successProcess(cc, subWallet.CreateAddress());
		} catch (WalletException e) {
			exceptionProcess(e, cc, "Master wallet '" + masterWalletId + "' subwallet ' " + chainId + "' create address");
		}
	}

	// args[0]: String masterWalletId
	// args[1]: String chainId
	// args[2]: int start
	// args[3]: int count
	public void getAllAddress(JSONArray args, CallbackContext cc) throws JSONException {
		int idx = 0;

		String masterWalletId = args.getString(idx++);
		String chainId        = args.getString(idx++);
		int    start          = args.getInt(idx++);
		int    count          = args.getInt(idx++);

		if (args.length() != idx) {
			errorProcess(cc, errCodeInvalidArg, idx + " parameters are expected");
			return;
		}

		try {
			ISubWallet subWallet = getSubWallet(masterWalletId, chainId);
			if (subWallet == null) {
				errorProcess(cc, errCodeInvalidSubWallet, "Get subwallet '" + chainId + "' of master wallet '" + masterWalletId + "' fail");
				return;
			}

			successProcess(cc, subWallet.GetAllAddress(start, count));
		} catch (WalletException e) {
			exceptionProcess(e, cc, "Master wallet '" + masterWalletId + "' subwallet '" + chainId + "' get all addresses");
		}
	}

	// args[0]: String masterWalletId
	// args[1]: String chainId
	// args[2]: String address
	public void getBalanceWithAddress(JSONArray args, CallbackContext cc) throws JSONException {
		int idx = 0;

		String masterWalletId = args.getString(idx++);
		String chainId        = args.getString(idx++);
		String address        = args.getString(idx++);

		if (args.length() != idx) {
			errorProcess(cc, errCodeInvalidArg, idx + " parameters are expected");
			return;
		}

		try {
			ISubWallet subWallet = getSubWallet(masterWalletId, chainId);
			if (subWallet == null) {
				errorProcess(cc, errCodeInvalidSubWallet, "Get subwallet '" + chainId + "' of master wallet '" + masterWalletId + "' fail");
				return;
			}

			successProcess(cc, subWallet.GetBalanceWithAddress(address));
		} catch (WalletException e) {
			exceptionProcess(e, cc, "Master wallet '" + masterWalletId + "' subwallet '" + chainId + "' get balance with address");
		}
	}

	// args[0]: String masterWalletId
	// args[1]: String chainId
	// args[2]: String fromAddress
	// args[3]: String toAddress
	// args[4]: long amount
	// args[5]: String memo
	// args[6]: String remark
	public void createTransaction(JSONArray args, CallbackContext cc) throws JSONException {
		int idx = 0;

		String masterWalletId = args.getString(idx++);
		String chainId        = args.getString(idx++);
		String fromAddress    = args.getString(idx++);
		String toAddress      = args.getString(idx++);
		long   amount         = args.getLong(idx++);
		String memo           = args.getString(idx++);
		String remark         = args.getString(idx++);

		if (args.length() != idx) {
			errorProcess(cc, errCodeInvalidArg, idx + " parameters are expected");
			return ;
		}

		try {
			ISubWallet subWallet = getSubWallet(masterWalletId, chainId);
			if (subWallet == null) {
				errorProcess(cc, errCodeInvalidSubWallet, "Get subwallet '" + chainId + "' of master wallet '" + masterWalletId + "' fail");
				return;
			}

			String tx = subWallet.CreateTransaction(fromAddress, toAddress, amount, memo, remark);
			successProcess(cc, tx);
		} catch (WalletException e) {
			exceptionProcess(e, cc, "Create tx of master wallet '" + masterWalletId + "' subwallet '" + chainId + "'");
		}
	}

	// args[0]: String masterWalletId
	// args[1]: String chainId
	// args[2]: String fromAddress
	// args[3]: String toAddress
	// args[4]: long amount
	// args[5]: String memo
	// return:  txJson
	public void createMultiSignTransaction(JSONArray args, CallbackContext cc) throws JSONException {
		int idx = 0;

		String masterWalletId = args.getString(idx++);
		String chainId        = args.getString(idx++);
		String fromAddress    = args.getString(idx++);
		String toAddress      = args.getString(idx++);
		long   amount         = args.getLong(idx++);
		String memo           = args.getString(idx++);

		if (args.length() != idx) {
			errorProcess(cc, errCodeInvalidArg, idx + " parameters are expected");
			return ;
		}

		try {
			ISubWallet subWallet = getSubWallet(masterWalletId, chainId);
			if (subWallet == null) {
				errorProcess(cc, errCodeInvalidSubWallet, "Get subwallet '" + chainId + "' of master wallet '" + masterWalletId + "' fail");
				return;
			}

			String tx = subWallet.CreateMultiSignTransaction(fromAddress, toAddress, amount, memo);
			successProcess(cc, tx);
		} catch (WalletException e) {
			exceptionProcess(e, cc, "Create multi sign tx of master wallet '" + masterWalletId + "' subwallet '" + chainId + "'");
		}
	}

	// args[0]: String masterWalletId
	// args[1]: String chainId
	// args[2]: String rawTransaction
	// args[3]: long feePerKb
	// return:  long fee
	public void calculateTransactionFee(JSONArray args, CallbackContext cc) throws JSONException {
		int idx = 0;

		String masterWalletId = args.getString(idx++);
		String chainId        = args.getString(idx++);
		String rawTransaction = args.getString(idx++);
		long   feePerKb       = args.getLong(idx++);

		if (args.length() != idx) {
			errorProcess(cc, errCodeInvalidArg, idx + " parameters are expected");
			return;
		}

		try {
			ISubWallet subWallet = getSubWallet(masterWalletId, chainId);
			if (subWallet == null) {
				errorProcess(cc, errCodeInvalidSubWallet, "Get subwallet '" + chainId + "' of master wallet '" + masterWalletId + "' fail");
				return;
			}

			long fee = subWallet.CalculateTransactionFee(rawTransaction, feePerKb);
			successProcess(cc, fee);
		} catch (WalletException e) {
			exceptionProcess(e, cc, "Calculate tx fee");
		}
	}

	// args[0]: String masterWalletId
	// args[1]: String chainId
	// args[2]: String rawTransaction
	// args[3]: long fee
	// return:  String txJson
	public void updateTransactionFee(JSONArray args, CallbackContext cc) throws JSONException {
		int idx = 0;

		String masterWalletId = args.getString(idx++);
		String chainId        = args.getString(idx++);
		String rawTransaction = args.getString(idx++);
		long   fee            = args.getLong(idx++);

		if (args.length() != idx) {
			errorProcess(cc, errCodeInvalidArg, idx + " parameters are expected");
			return;
		}

		try {
			ISubWallet subWallet = getSubWallet(masterWalletId, chainId);
			if (subWallet == null) {
				errorProcess(cc, errCodeInvalidSubWallet, "Get subwallet '" + chainId + "' of master wallet '" + masterWalletId + "' fail");
				return;
			}

			String result = subWallet.UpdateTransactionFee(rawTransaction, fee);
			successProcess(cc, result);
		} catch (WalletException e) {
			exceptionProcess(e, cc, "Update tx fee");
		}
	}

	// args[0]: String masterWalletId
	// args[1]: String chainId
	// args[2]: String rawTransaction
	// args[3]: String payPassword
	// return:  String txJson
	public void signTransaction(JSONArray args, CallbackContext cc) throws JSONException {
		int idx = 0;

		String masterWalletId = args.getString(idx++);
		String chainId        = args.getString(idx++);
		String rawTransaction = args.getString(idx++);
		String payPassword    = args.getString(idx++);

		if (args.length() != idx) {
			errorProcess(cc, errCodeInvalidArg, idx + " parameters are expected");
			return;
		}

		try {
			ISubWallet subWallet = getSubWallet(masterWalletId, chainId);
			if (subWallet == null) {
				errorProcess(cc, errCodeInvalidSubWallet, "Get subwallet '" + chainId + "' of master wallet '" + masterWalletId + "' fail");
				return;
			}

			String result = subWallet.SignTransaction(rawTransaction, payPassword);
			successProcess(cc, result);
		} catch (WalletException e) {
			exceptionProcess(e, cc, "Sign tx");
		}
	}


	// args[0]: String masterWalletId
	// args[1]: String chainId
	// args[2]: String rawTxJson
	// return:  String resultJson
	public void publishTransaction(JSONArray args, CallbackContext cc) throws JSONException {
		int idx = 0;

		String masterWalletId = args.getString(idx++);
		String chainId        = args.getString(idx++);
		String rawTxJson      = args.getString(idx++);

		if (args.length() != idx) {
			errorProcess(cc, errCodeInvalidArg, idx + " parameters are expected");
			return;
		}

		try {
			ISubWallet subWallet = getSubWallet(masterWalletId, chainId);
			if (subWallet == null) {
				errorProcess(cc, errCodeInvalidSubWallet, "Get subwallet '" + chainId + "' of master wallet '" + masterWalletId + "' fail");
				return;
			}

			String resultJson = subWallet.PublishTransaction(rawTxJson);
			successProcess(cc, resultJson);
		} catch (WalletException e) {
			exceptionProcess(e, cc, "Publish tx");
		}
	}

	// args[0]: String masterWalletId
	// args[1]: String chainId
	// args[2]: int start
	// args[3]: int count
	// args[4]: String addressOrTxId
	// return:  String txJson
	public void getAllTransaction(JSONArray args, CallbackContext cc) throws JSONException {
		int idx = 0;

		String masterWalletId = args.getString(idx++);
		String chainId        = args.getString(idx++);
		int    start          = args.getInt(idx++);
		int    count          = args.getInt(idx++);
		String addressOrTxId  = args.getString(idx++);

		if (args.length() != idx) {
			errorProcess(cc, errCodeInvalidArg, idx + " parameters are expected");
			return;
		}

		try {
			ISubWallet subWallet = getSubWallet(masterWalletId, chainId);
			if (subWallet == null) {
				errorProcess(cc, errCodeInvalidSubWallet, "Get subwallet '" + chainId + "' of master wallet '" + masterWalletId + "' fail");
				return;
			}

			String txJson = subWallet.GetAllTransaction(start, count, addressOrTxId);
			successProcess(cc, txJson);
		} catch (WalletException e) {
			exceptionProcess(e, cc, "Get all tx");
		}
	}

	// args[0]: String masterWalletId
	// args[1]: String chainId
	// args[2]: String message
	// args[3]: String payPassword
	public void sign(JSONArray args, CallbackContext cc) throws JSONException {
		int idx = 0;

		String masterWalletId = args.getString(idx++);
		String chainId        = args.getString(idx++);
		String message        = args.getString(idx++);
		String payPassword    = args.getString(idx++);

		if (args.length() != idx) {
			errorProcess(cc, errCodeInvalidArg, idx + " parameters are expected");
			return;
		}

		try {
			ISubWallet subWallet = getSubWallet(masterWalletId, chainId);
			if (subWallet == null) {
				errorProcess(cc, errCodeInvalidSubWallet, "Get subwallet '" + chainId + "' of master wallet '" + masterWalletId + "' fail");
				return;
			}

			successProcess(cc, subWallet.Sign(message, payPassword));
		} catch (WalletException e) {
			exceptionProcess(e, cc, "Master wallet '" + masterWalletId + "' subWallet '" + chainId + "' sign");
		}
	}

	// args[0]: String masterWalletId
	// args[1]: String chainId
	// args[2]: String publicKey
	// args[3]: String message
	// args[4]: String signature
	public void checkSign(JSONArray args, CallbackContext cc) throws JSONException {
		int idx = 0;

		String masterWalletId = args.getString(idx++);
		String chainId        = args.getString(idx++);
		String publicKey      = args.getString(idx++);
		String message        = args.getString(idx++);
		String signature      = args.getString(idx++);

		if (args.length() != idx) {
			errorProcess(cc, errCodeInvalidArg, idx + " parameters are expected");
			return;
		}

		try {
			ISubWallet subWallet = getSubWallet(masterWalletId, chainId);
			if (subWallet == null) {
				errorProcess(cc, errCodeInvalidSubWallet, "Get subwallet '" + chainId + "' of master wallet '" + masterWalletId + "' fail");
				return;
			}

			successProcess(cc, subWallet.CheckSign(publicKey, message, signature));
		} catch (WalletException e) {
			exceptionProcess(e, cc, "Master wallet '" + masterWalletId + "' subwallet '" + chainId + "' check sign");
		}
	}

	// args[0]: String masterWalletId
	// args[1]: String chainId
	// return:  String publicKey
	public void getSubWalletPublicKey(JSONArray args, CallbackContext cc) throws JSONException {
		int idx = 0;

		String masterWalletId = args.getString(idx++);
		String chainId        = args.getString(idx++);

		if (args.length() != idx) {
			errorProcess(cc, errCodeInvalidArg, idx + " parameters are expected");
			return;
		}

		try {
			ISubWallet subWallet = getSubWallet(masterWalletId, chainId);
			if (subWallet == null) {
				errorProcess(cc, errCodeInvalidSubWallet, "Get subwallet '" + chainId + "' of master wallet '" + masterWalletId + "' fail");
				return;
			}

			successProcess(cc, subWallet.GetPublicKey());
		} catch (WalletException e) {
			exceptionProcess(e, cc, "Master wallet '" + masterWalletId + "' subwallet '" + chainId + "' get public key");
		}
	}

	// args[0]: String masterWalletId
	public void getMasterWalletPublicKey(JSONArray args, CallbackContext cc) throws JSONException {
		int idx = 0;

		String masterWalletId = args.getString(idx++);

		if (args.length() != idx) {
			errorProcess(cc, errCodeInvalidArg, idx + " parameters are expected");
			return;
		}

		try {
			IMasterWallet masterWallet = getMasterWallet(masterWalletId);
			if (masterWallet == null) {
				errorProcess(cc, errCodeInvalidMasterWallet, "Get master wallet '" + masterWalletId + "' fail");
				return;
			}

			successProcess(cc, masterWallet.GetPublicKey());
		} catch (WalletException e) {
			exceptionProcess(e, cc, "Master wallet '" + masterWalletId + "' get public key");
		}
	}

	// args[0]: String masterWalletId
	// args[1]: String message
	// args[2]: String payPassword
	// return:  String result
	public void masterWalletSign(JSONArray args, CallbackContext cc) throws JSONException {
		int idx = 0;

		String masterWalletId = args.getString(idx++);
		String message        = args.getString(idx++);
		String payPassword    = args.getString(idx++);

		if (args.length() != idx) {
			errorProcess(cc, errCodeInvalidArg, idx + " parameters are expected");
			return;
		}

		try {
			IMasterWallet masterWallet = getMasterWallet(masterWalletId);
			if (masterWallet == null) {
				errorProcess(cc, errCodeInvalidMasterWallet, "Get master wallet '" + masterWalletId + "' fail");
				return;
			}

			successProcess(cc, masterWallet.Sign(message, payPassword));
		} catch (WalletException e) {
			exceptionProcess(e, cc, "Master wallet '" + masterWalletId + "' sign");
		}
	}

	// args[0]: String masterWalletId
	// args[1]: String publicKey
	// args[2]: String message
	// args[3]: String signature
	// return:  String resultJson
	public void masterWalletCheckSign(JSONArray args, CallbackContext cc) throws JSONException {
		int idx = 0;

		String masterWalletId = args.getString(idx++);
		String publicKey      = args.getString(idx++);
		String message        = args.getString(idx++);
		String signature      = args.getString(idx++);

		if (args.length() != idx) {
			errorProcess(cc, errCodeInvalidArg, idx + " parameters are expected");
			return;
		}

		try {
			IMasterWallet masterWallet = getMasterWallet(masterWalletId);
			if (masterWallet == null) {
				errorProcess(cc, errCodeInvalidMasterWallet, "Get master wallet '" + masterWalletId + "' fail");
				return;
			}

			successProcess(cc, masterWallet.CheckSign(publicKey, message, signature));
		} catch (WalletException e) {
			exceptionProcess(e, cc, "Master wallet '" + masterWalletId + "' check sign");
		}
	}

	// args[0]: String masterWalletId
	// args[1]: String chainId
	public void registerWalletListener(JSONArray args, CallbackContext cc) throws JSONException {
		int idx = 0;

		String masterWalletId = args.getString(idx++);
		String chainId        = args.getString(idx++);

		if (args.length() != idx) {
			errorProcess(cc, errCodeInvalidArg, idx + " parameters are expected");
			return;
		}

		try {
			ISubWallet subWallet = getSubWallet(masterWalletId, chainId);
			if (subWallet == null) {
				errorProcess(cc, errCodeInvalidSubWallet, "Get subwallet '" + chainId + "' of master wallet '" + masterWalletId + "' fail");
				return;
			}

			subWallet.AddCallback(new ISubWalletCallback() {
				@Override
				public void OnTransactionStatusChanged(String txId, String status, String desc, int confirms) {
					JSONObject jsonObject = new JSONObject();
					Log.i(TAG, "OnTransactionStatusChanged");
					try {
						jsonObject.put("txId", txId);
						jsonObject.put("status", status);
						jsonObject.put("desc", desc);
						jsonObject.put("confirms", confirms);
					} catch (JSONException e) {
						e.printStackTrace();
					}

					PluginResult pluginResult = new PluginResult(PluginResult.Status.OK,jsonObject);
					pluginResult.setKeepCallback(true);
					cc.sendPluginResult(pluginResult);
				}

				@Override
				public void OnBlockSyncStarted() {
					JSONObject jsonObject = new JSONObject();
					Log.i(TAG, "OnBlockSyncStarted");
					try {
						jsonObject.put("OnBlockSyncStarted", "OnBlockSyncStarted");
					}
					catch (JSONException e) {
						e.printStackTrace();
					}

					PluginResult pluginResult = new PluginResult(PluginResult.Status.OK,jsonObject);
					pluginResult.setKeepCallback(true);
					cc.sendPluginResult(pluginResult);
				}

				@Override
				public void OnBlockHeightIncreased(int currentBlockHeight, double progress) {
					JSONObject jsonObject = new JSONObject();
					try {
						jsonObject.put("currentBlockHeight", currentBlockHeight);
						jsonObject.put("progress", progress);
					}
					catch (JSONException e) {
						e.printStackTrace();
					}

					PluginResult pluginResult = new PluginResult(PluginResult.Status.OK,jsonObject);
					pluginResult.setKeepCallback(true);
					cc.sendPluginResult(pluginResult);
				}

				@Override
				public void OnBlockSyncStopped() {
					JSONObject jsonObject = new JSONObject();
					Log.i(TAG, "OnBlockSyncStopped");
					try {
						jsonObject.put("OnBlockSyncStopped", "OnBlockSyncStopped");
					}
					catch (JSONException e) {
						e.printStackTrace();
					}

					PluginResult pluginResult = new PluginResult(PluginResult.Status.OK,jsonObject);
					pluginResult.setKeepCallback(true);
					cc.sendPluginResult(pluginResult);
				}

				@Override
				public void OnDestroyWallet() {
					JSONObject jsonObject = new JSONObject();
					Log.i(TAG, "OnDestroyWallet");
					try {
						jsonObject.put("OnDestroyWallet", "OnDestroyWallet");
					} catch (JSONException e) {
						e.printStackTrace();
					}

					PluginResult pluginResult = new PluginResult(PluginResult.Status.OK,jsonObject);
					pluginResult.setKeepCallback(true);
					cc.sendPluginResult(pluginResult);
				}
			});
		} catch (WalletException e) {
			exceptionProcess(e, cc, "Add callback for subwallet '" + chainId + "' of master wallet '" + masterWalletId + "'");
		}
	}

	// args[0]: String masterWalletId
	// args[1]: String chainId
	// args[2]: String fromAddress
	// args[3]: String payloadJson
	// args[4]: String programJson
	// args[5]: String memo
	// args[6]: String remark
	public void createIdTransaction(JSONArray args, CallbackContext cc) throws JSONException {
		int idx = 0;

		String masterWalletId = args.getString(idx++);
		String chainId        = args.getString(idx++);
		String fromAddress    = args.getString(idx++);
		String payloadJson    = args.getString(idx++);
		String programJson    = args.getString(idx++);
		String memo           = args.getString(idx++);
		String remark         = args.getString(idx++);

		if (args.length() != idx) {
			errorProcess(cc, errCodeInvalidArg, idx + " parameters are expected");
			return;
		}

		try {
			ISubWallet subWallet = getSubWallet(masterWalletId, chainId);
			if (subWallet == null) {
				errorProcess(cc, errCodeInvalidSubWallet, "Get subwallet '" + chainId + "' of master wallet '" + masterWalletId + "' fail");
				return;
			}

			if (! (subWallet instanceof IIdChainSubWallet)) {
				errorProcess(cc, errCodeSubWalletInstance, "Subwallet '" + chainId + "' is not instance of IIdChainSubWallet");
				return;
			}

			IIdChainSubWallet idchainSubWallet = (IIdChainSubWallet)subWallet;

			successProcess(cc, idchainSubWallet.CreateIdTransaction(fromAddress, payloadJson, programJson, memo, remark));
		} catch (WalletException e) {
			exceptionProcess(e, cc, "Master wallet '" + masterWalletId + "' subwallet '" + chainId + "' create id tx");
		}
	}

	// args[0]: String masterWalletId
	// args[1]: String chainId
	// args[2]: String fromAddress
	// args[3]: String toAddress
	// args[4]: long amount
	// args[5]: String sideAccountJson
	// args[6]: String sideAmountJson
	// args[7]: String sideIndicesJson
	// args[8]: String memo
	// args[9]: String remark
	public void createDepositTransaction(JSONArray args, CallbackContext cc) throws JSONException {
		int idx = 0;

		String masterWalletId = args.getString(idx++);
		String chainId        = args.getString(idx++);
		String fromAddress    = args.getString(idx++);
		String toAddress      = args.getString(idx++);
		long   amount         = args.getLong(idx++);
		String sideAccountJson = args.getString(idx++);
		String sideAmountJson  = args.getString(idx++);
		String sideIndicesJson = args.getString(idx++);
		String memo            = args.getString(idx++);
		String remark          = args.getString(idx++);

		if (args.length() != idx) {
			errorProcess(cc, errCodeInvalidArg, idx + " parameters are expected");
			return;
		}

		try {
			ISubWallet subWallet = getSubWallet(masterWalletId, chainId);
			if (subWallet == null) {
				errorProcess(cc, errCodeInvalidSubWallet, "Get subwalelt '" + chainId + "' of master wallet '" + masterWalletId + "' fail");
				return;
			}

			if (! (subWallet instanceof IMainchainSubWallet)) {
				errorProcess(cc, errCodeSubWalletInstance, "Subwallet '" + chainId + "' is not instance of IMainchainSubWallet");
				return;
			}

			IMainchainSubWallet mainchainSubWallet = (IMainchainSubWallet)subWallet;

			String txJson = mainchainSubWallet.CreateDepositTransaction(fromAddress, toAddress, amount,
					sideAccountJson, sideAmountJson, sideIndicesJson, memo, remark);
			successProcess(cc, txJson);
		} catch (WalletException e) {
			exceptionProcess(e, cc, "Master wallet '" + masterWalletId + "' subwallet '" + chainId + "' create deposit tx");
		}
	}

	// args[0]: String masterWalletId
	public void getSupportedChains(JSONArray args, CallbackContext cc) throws JSONException {
		int idx = 0;

		String masterWalletId = args.getString(idx++);

		if (args.length() != idx) {
			errorProcess(cc, errCodeInvalidArg, idx + " parameters are expected");
			return;
		}

		try {
			IMasterWallet masterWallet = getMasterWallet(masterWalletId);
			if (masterWallet == null) {
				errorProcess(cc, errCodeInvalidMasterWallet, "Get master wallet '" + masterWalletId + "' fail");
				return;
			}

			String[] supportedChains = masterWallet.GetSupportedChains();
			JSONArray supportedChainsJson = new JSONArray();
			for (int i = 0; i < supportedChains.length; i++) {
				supportedChainsJson.put(supportedChains[i]);
			}

			successProcess(cc, supportedChainsJson);
		} catch (WalletException e) {
			exceptionProcess(e, cc, "Master wallet '" + masterWalletId + "' get support chain");
		}
	}

	// args[0]: String masterWalletId
	// args[1]: String oldPassword
	// args[2]: String newPassword
	public void changePassword(JSONArray args, CallbackContext cc) throws JSONException {
		int idx = 0;

		String masterWalletId = args.getString(idx++);
		String oldPassword    = args.getString(idx++);
		String newPassword    = args.getString(idx++);

		if (args.length() != idx) {
			errorProcess(cc, errCodeInvalidArg, idx + " parameters are expected");
			return;
		}

		try {
			IMasterWallet masterWallet = getMasterWallet(masterWalletId);
			if (masterWallet == null) {
				errorProcess(cc, errCodeInvalidMasterWallet, "Get master wallet '" + masterWalletId + "' fail");
				return;
			}

			masterWallet.ChangePassword(oldPassword, newPassword);
			successProcess(cc, "Change password OK");
		} catch (WalletException e) {
			exceptionProcess(e, cc, "Master wallet '" + masterWalletId + "' change password");
		}
	}

	private JSONObject parseOneParam(String key, Object value) throws JSONException {
		JSONObject jsonObject = new JSONObject();
		jsonObject.put(key, value);
		return jsonObject;
	}

	private void coolMethod(String message, CallbackContext cc) {
		if (message != null && message.length() > 0) {
			cc.success(message);
		} else {
			cc.error("Expected one non-empty string argument.");
		}
	}

	public void print(String text, CallbackContext cc) throws JSONException {
		if (text == null) {
			cc.error("Text not can be null");
		} else {
			LogUtil.i(TAG, text);
			cc.success(parseOneParam("text", text));
		}
	}


	//IDIDManager
	// args[0]: String masterWalletId
	// args[1]: String password
	public void createDID(JSONArray args, CallbackContext cc) throws JSONException {
		int idx = 0;

		String masterWalletId = args.getString(idx++);
		String password       = args.getString(idx++);

		if (args.length() != idx) {
			errorProcess(cc, errCodeInvalidArg, idx + " parameters are expected");
			return;
		}

		try {
			IDidManager DIDManager = getDIDManager(masterWalletId);
			if (DIDManager == null) {
				errorProcess(cc, errCodeInvalidDIDManager, "Master wallet '" + masterWalletId + "' do not contain DID manager");
				return;
			}

			IDid did = DIDManager.CreateDID(args.getString(0));
			successProcess(cc, did.GetDIDName());
		} catch (WalletException e) {
			exceptionProcess(e, cc, "Create DID");
		}
	}

	// args[0]: String masterWalletId
	public void getDIDList(JSONArray args, CallbackContext cc) throws JSONException {
		int idx = 0;

		String masterWalletId = args.getString(idx++);
		String password       = args.getString(idx++);

		if (args.length() != idx) {
			errorProcess(cc, errCodeInvalidArg, idx + " parameters are expected");
			return;
		}

		try {
			IDidManager DIDManager = getDIDManager(masterWalletId);
			if (DIDManager == null) {
				errorProcess(cc, errCodeInvalidDIDManager, "Master wallet '" + masterWalletId + "' do not contain DID manager");
				return;
			}

			successProcess(cc, DIDManager.GetDIDList());
		} catch (WalletException e) {
			exceptionProcess(e, cc, "Get DID list");
		}
	}

	// args[0]: String masterWalletId
	// args[1]: String didName
	public void destoryDID(JSONArray args, CallbackContext cc) throws JSONException {
		int idx = 0;

		String masterWalletId = args.getString(idx++);
		String didName      = args.getString(idx++);

		if (args.length() != idx) {
			errorProcess(cc, errCodeInvalidArg, idx + " parameters are expected");
			return;
		}

		try {
			IDidManager DIDManager = getDIDManager(masterWalletId);
			if (DIDManager == null) {
				errorProcess(cc, errCodeInvalidDIDManager, "Master wallet '" + masterWalletId + "' do not contain DID manager");
				return;
			}

			DIDManager.DestoryDID(didName);
			successProcess(cc, "Destroy DID '" + didName + "' successfully");
		} catch (WalletException e) {
			exceptionProcess(e, cc, "Destroy DID '" + didName + "'");
		}
	}

	//IDID
	// args[0]: String masterWalletId
	// args[1]: String didName
	// args[2]: String keyPath
	// args[3]: String valueJson
	public void didSetValue(JSONArray args, CallbackContext cc) throws JSONException {
		int idx = 0;

		String masterWalletId = args.getString(idx++);
		String didName        = args.getString(idx++);
		String keyPath        = args.getString(idx++);
		String valueJson      = args.getString(idx++);

		if (args.length() != idx) {
			errorProcess(cc, errCodeInvalidArg, idx + " parameters are expected");
			return;
		}

		try {
			IDidManager DIDManager = getDIDManager(masterWalletId);
			if (DIDManager == null) {
				errorProcess(cc, errCodeInvalidDIDManager, "Master wallet '" + masterWalletId + "' do not contain DID manager");
				return;
			}

			IDid did = DIDManager.GetDID(didName);
			if (did == null) {
				errorProcess(cc, errCodeInvalidDID, "DID manager get DID '" + didName + "' fail");
				return;
			}

			did.SetValue(keyPath, valueJson);
			successProcess(cc, "DID set value successfully");
		} catch (WalletException e) {
			exceptionProcess(e, cc, "DID set value");
		}
	}

	// args[0]: String masterWalletId
	// args[1]: String didName
	// args[2]: String keyPath
	public void didGetValue(JSONArray args, CallbackContext cc) throws JSONException {
		int idx = 0;

		String masterWalletId = args.getString(idx++);
		String didName        = args.getString(idx++);
		String keyPath        = args.getString(idx++);

		if (args.length() != idx) {
			errorProcess(cc, errCodeInvalidArg, idx + " parameters are expected");
			return;
		}

		try {
			IDidManager DIDManager = getDIDManager(masterWalletId);
			if (DIDManager == null) {
				errorProcess(cc, errCodeInvalidDIDManager, "Master wallet '" + masterWalletId + "' do not contain DID manager");
				return;
			}

			IDid did = DIDManager.GetDID(didName);
			if (did == null) {
				errorProcess(cc, errCodeInvalidDID, "DID manager get DID '" + didName + "' fail");
				return;
			}

			successProcess(cc, did.GetValue(keyPath));
		} catch (WalletException e) {
			exceptionProcess(e, cc, "DID get value of '" + keyPath + "'");
		}
	}

	// args[0]: String masterWalletId
	// args[1]: String didName
	// args[2]: String keyPath
	public void didGetHistoryValue(JSONArray args, CallbackContext cc) throws JSONException {
		int idx = 0;

		String masterWalletId = args.getString(idx++);
		String didName        = args.getString(idx++);
		String keyPath        = args.getString(idx++);

		if (args.length() != idx) {
			errorProcess(cc, errCodeInvalidArg, idx + " parameters are expected");
			return;
		}

		try {
			IDidManager DIDManager = getDIDManager(masterWalletId);
			if (DIDManager == null) {
				errorProcess(cc, errCodeInvalidDIDManager, "Master wallet '" + masterWalletId + "' do not contain DID manager");
				return;
			}

			IDid did = DIDManager.GetDID(didName);
			if (did == null) {
				errorProcess(cc, errCodeInvalidDID, "DID manager get DID '" + didName + "' fail");
				return;
			}

			successProcess(cc, did.GetHistoryValue(keyPath));
		} catch (WalletException e) {
			exceptionProcess(e, cc, "DID get history value by '" + keyPath + "'");
		}
	}

	// args[0]: String masterWalletId
	// args[1]: String didName
	// args[2]: int start
	// args[3]: int count
	public void didGetAllKeys(JSONArray args, CallbackContext cc) throws JSONException {
		int idx = 0;

		String masterWalletId = args.getString(idx++);
		String didName        = args.getString(idx++);
		int    start          = args.getInt(idx++);
		int    count          = args.getInt(idx++);

		if (args.length() != idx) {
			errorProcess(cc, errCodeInvalidArg, idx + " parameters are expected");
			return;
		}

		try {
			IDidManager DIDManager = getDIDManager(masterWalletId);
			if (DIDManager == null) {
				errorProcess(cc, errCodeInvalidDIDManager, "Master wallet '" + masterWalletId + "' do not contain DID manager");
				return;
			}

			IDid did = DIDManager.GetDID(didName);
			if (did == null) {
				errorProcess(cc, errCodeInvalidDID, "DID manager get DID '" + didName + "' fail");
				return;
			}

			successProcess(cc, did.GetAllKeys(start, count));
		} catch (WalletException e) {
			exceptionProcess(e, cc, "DID get " + count + " keys from " + start);
		}
	}

	// args[0]: String masterWalletId
	// args[1]: String didName
	// args[2]: String message
	// args[3]: String password
	public void didSign(JSONArray args, CallbackContext cc) throws JSONException {
		int idx = 0;

		String masterWalletId = args.getString(idx++);
		String didName        = args.getString(idx++);
		String message        = args.getString(idx++);
		String password       = args.getString(idx++);

		if (args.length() != idx) {
			errorProcess(cc, errCodeInvalidArg, idx + " parameters are expected");
			return;
		}

		try {
			IDidManager DIDManager = getDIDManager(masterWalletId);
			if (DIDManager == null) {
				errorProcess(cc, errCodeInvalidDIDManager, "Master wallet '" + masterWalletId + "' do not contain DID manager");
				return;
			}

			IDid did = DIDManager.GetDID(didName);
			if (did == null) {
				errorProcess(cc, errCodeInvalidDID, "DID manager get DID '" + didName + "' fail");
				return;
			}

			successProcess(cc, did.Sign(message, password));
		} catch (WalletException e) {
			exceptionProcess(e, cc, "DID sign");
		}
	}

	// args[0]: String masterWalletId
	// args[1]: String didName
	// args[2]: String message
	// args[3]: String password
	public void didGenerateProgram(JSONArray args, CallbackContext cc) throws JSONException {
		int idx = 0;

		String masterWalletId = args.getString(idx++);
		String didName        = args.getString(idx++);
		String message        = args.getString(idx++);
		String password       = args.getString(idx++);

		if (args.length() != idx) {
			errorProcess(cc, errCodeInvalidArg, idx + " parameters are expected");
			return;
		}

		try {
			IDidManager DIDManager = getDIDManager(masterWalletId);
			if (DIDManager == null) {
				errorProcess(cc, errCodeInvalidDIDManager, "Master wallet '" + masterWalletId + "' do not contain DID manager");
				return;
			}

			IDid did = DIDManager.GetDID(didName);
			if (did == null) {
				errorProcess(cc, errCodeInvalidDID, "DID manager get DID '" + didName + "' fail");
				return;
			}

			successProcess(cc, did.GenerateProgram(message, password));
		} catch (WalletException e) {
			exceptionProcess(e, cc, "DID generate program");
		}
	}

	// args[0]: String masterWalletId
	// args[1]: String didName
	// args[2]: String message
	// args[3]: String signature
	public void didCheckSign(JSONArray args, CallbackContext cc) throws JSONException {
		int idx = 0;

		String masterWalletId = args.getString(idx++);
		String didName        = args.getString(idx++);
		String message        = args.getString(idx++);
		String signature      = args.getString(idx++);

		if (args.length() != idx) {
			errorProcess(cc, errCodeInvalidArg, idx + " parameters are expected");
			return;
		}

		try {
			IDidManager DIDManager = getDIDManager(masterWalletId);
			if (DIDManager == null) {
				errorProcess(cc, errCodeInvalidDIDManager, "Master wallet '" + masterWalletId + "' do not contain DID manager");
				return;
			}

			IDid did = DIDManager.GetDID(didName);
			if (did == null) {
				errorProcess(cc, errCodeInvalidDID, "DID manager get DID '" + didName + "' fail");
				return;
			}

			successProcess(cc, did.CheckSign(message, signature));
		} catch (WalletException e) {
			exceptionProcess(e, cc, "DID check sign");
		}
	}

	// args[0]: String masterWalletId
	// args[1]: String didName
	public void didGetPublicKey(JSONArray args, CallbackContext cc) throws JSONException {
		int idx = 0;

		String masterWalletId = args.getString(idx++);
		String didName        = args.getString(idx++);

		if (args.length() != idx) {
			errorProcess(cc, errCodeInvalidArg, idx + " parameters are expected");
			return;
		}

		try {
			IDidManager DIDManager = getDIDManager(masterWalletId);
			if (DIDManager == null) {
				errorProcess(cc, errCodeInvalidDIDManager, "Master wallet '" + masterWalletId + "' do not contain DID manager");
				return;
			}

			IDid did = DIDManager.GetDID(didName);
			if (did == null) {
				errorProcess(cc, errCodeInvalidDID, "DID manager get DID '" + didName + "' fail");
				return;
			}

			successProcess(cc, did.GetPublicKey());
		} catch (WalletException e) {
			exceptionProcess(e, cc, "DID get public key");
		}
	}

	// args[0]: String masterWalletId
	// args[1]: String didName
	public void registerIdListener(JSONArray args, CallbackContext cc) throws JSONException {
		int idx = 0;

		String masterWalletId = args.getString(idx++);
		String didName        = args.getString(idx++);

		if (args.length() != idx) {
			errorProcess(cc, errCodeInvalidArg, idx + " parameters are expected");
			return;
		}

		try {
			IDidManager DIDManager = getDIDManager(masterWalletId);
			if (DIDManager == null) {
				errorProcess(cc, errCodeInvalidDIDManager, "Master wallet '" + masterWalletId + "' do not contain DID manager");
				return;
			}

			DIDManager.RegisterCallback(didName, new IIdManagerCallback() {
				@Override
				public void OnIdStatusChanged(String id, String path, /*const nlohmann::json*/ String value) {
					try {
						JSONObject jsonObject = new JSONObject();
						jsonObject.put("id", id);
						jsonObject.put("path", path);
						jsonObject.put("value", value);

						PluginResult pluginResult = new PluginResult(PluginResult.Status.OK, jsonObject);
						pluginResult.setKeepCallback(true);
						cc.sendPluginResult(pluginResult);
					} catch (JSONException e) {
						e.printStackTrace();
					}
				}
			});
		} catch (WalletException e) {
			exceptionProcess(e, cc, "DID register listener");
		}
	}

	// SidechainSubWallet

	// args[0]: String masterWalletId
	// args[1]: String chainId
	// args[2]: String fromAddress
	// args[3]: String toAddress
	// args[4]: long amount
	// args[5]: String mainchainAccountsJson
	// args[6]: String mainchainAmountsJson
	// args[7]: String mainchainIndexsJson
	// args[8]: String memo
	// args[9]: String remark
	public void createWithdrawTransaction(JSONArray args, CallbackContext cc) throws JSONException {
		int idx = 0;

		String masterWalletId        = args.getString(idx++);
		String chainId               = args.getString(idx++);
		String fromAddress           = args.getString(idx++);
		String toAddress             = args.getString(idx++);
		long   amount                = args.getLong(idx++);
		String mainchainAccountsJson = args.getString(idx++);
		String mainchainAmountsJson  = args.getString(idx++);
		String mainchainIndexsJson   = args.getString(idx++);
		String memo                  = args.getString(idx++);
		String remark                = args.getString(idx++);

		if (args.length() != idx) {
			errorProcess(cc, errCodeInvalidArg, idx + " parameters are expected");
			return;
		}

		try {
			ISubWallet subWallet = getSubWallet(masterWalletId, chainId);
			if (subWallet == null) {
				errorProcess(cc, errCodeInvalidSubWallet, "Get subwallet '" + chainId + "' of master wallet '" + masterWalletId + "' fail");
				return;
			}

			if (! (subWallet instanceof ISidechainSubWallet)) {
				errorProcess(cc, errCodeSubWalletInstance, "Subwallet '" + chainId + "' is not instance of ISidechainSubWallet");
				return;
			}

			ISidechainSubWallet sidechainSubWallet = (ISidechainSubWallet)subWallet;
			String tx = sidechainSubWallet.CreateWithdrawTransaction(fromAddress, toAddress, amount,
					mainchainAccountsJson, mainchainAmountsJson, mainchainIndexsJson, memo, remark);

			successProcess(cc, tx);
		} catch (WalletException e) {
			exceptionProcess(e, cc, "Master wallet '" + masterWalletId + "' subwallet '" + chainId + "' create withdraw tx");
		}
	}

	// args[0]: String masterWalletId
	// args[1]: String chainId
	public void getGenesisAddress(JSONArray args, CallbackContext cc) throws JSONException {
		int idx = 0;

		String masterWalletId = args.getString(idx++);
		String chainId        = args.getString(idx++);

		if (args.length() != idx) {
			errorProcess(cc, errCodeInvalidArg, idx + " parameters are expected");
			return;
		}

		try {
			ISubWallet subWallet = getSubWallet(masterWalletId, chainId);
			if (subWallet == null) {
				errorProcess(cc, errCodeInvalidSubWallet, "Get subwallet '" + chainId + "' of master wallet '" + masterWalletId + "' fail");
				return;
			}

			if (! (subWallet instanceof ISidechainSubWallet)) {
				errorProcess(cc, errCodeSubWalletInstance, "Subwallet '" + chainId + "' is not instance of ISidechainSubWallet");
				return;
			}

			ISidechainSubWallet sidechainSubWallet = (ISidechainSubWallet)subWallet;

			successProcess(cc, sidechainSubWallet.GetGenesisAddress());
		} catch (WalletException e) {
			exceptionProcess(e, cc, "Master wallet '" + masterWalletId + "' subwallet '" + chainId + "' get genesis address");
		}
	}

	@Override
	public void onDestroy() {
		super.onDestroy();
	}
}

