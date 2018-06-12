// Copyright (c) 2012-2018 The Elastos Open Source Project
// Distributed under the MIT software license, see the accompanying
// file COPYING or http://www.opensource.org/licenses/mit-license.php.

#include "ElaUtils.h"
#include "IMainchainSubWallet.h"
#include "nlohmann/json.hpp"

using namespace Elastos::SDK;
extern const char* ToStringFromJson(nlohmann::json jsonValue);

//"(JLjava/lang/String;Ljava/lang/String;JLjava/lang/String;Ljava/lang/String;Ljava/lang/String;JLjava/lang/String;Ljava/lang/String;)Ljava/lang/String;"
static jstring JNICALL nativeSendDepositTransaction(JNIEnv *env, jobject clazz, jlong jMainSubWalletProxy,
        jstring jfromAddress, jstring jtoAddress, jlong amount, jstring jsidechainAccounts, jstring jsidechainAmounts
        , jstring jsidechainIndexs, jlong fee, jstring jpayPassword, jstring jmemo)
{
    const char* fromAddress = env->GetStringUTFChars(jfromAddress, NULL);
    const char* toAddress = env->GetStringUTFChars(jtoAddress, NULL);
    const char* sidechainAccounts = env->GetStringUTFChars(jsidechainAccounts, NULL);
    const char* sidechainAmounts = env->GetStringUTFChars(jsidechainAmounts, NULL);
    const char* sidechainIndexs = env->GetStringUTFChars(jsidechainIndexs, NULL);
    const char* payPassword = env->GetStringUTFChars(jpayPassword, NULL);
    const char* memo = env->GetStringUTFChars(jmemo, NULL);

    IMainchainSubWallet* wallet = (IMainchainSubWallet*)jMainSubWalletProxy;
    nlohmann::json txidJson = wallet->SendDepositTransaction(fromAddress, toAddress, amount, sidechainAccounts,
                    sidechainAmounts, sidechainIndexs, fee, payPassword, memo);

    env->ReleaseStringUTFChars(jfromAddress, fromAddress);
    env->ReleaseStringUTFChars(jtoAddress, toAddress);
    env->ReleaseStringUTFChars(jsidechainAccounts, sidechainAccounts);
    env->ReleaseStringUTFChars(jsidechainAmounts, sidechainAmounts);
    env->ReleaseStringUTFChars(jsidechainIndexs, sidechainIndexs);
    env->ReleaseStringUTFChars(jpayPassword, payPassword);
    env->ReleaseStringUTFChars(jmemo, memo);

    return env->NewStringUTF(ToStringFromJson(txidJson));
}


static const JNINativeMethod gMethods[] = {
    {"nativeSendDepositTransaction",
    "(JLjava/lang/String;Ljava/lang/String;JLjava/lang/String;Ljava/lang/String;Ljava/lang/String;JLjava/lang/String;Ljava/lang/String;)Ljava/lang/String;"
            , (void*)nativeSendDepositTransaction},
};

jint register_elastos_spv_IMainchainSubWallet(JNIEnv *env)
{
    return jniRegisterNativeMethods(env, "com/elastos/spvcore/IMainchainSubWallet",
        gMethods, NELEM(gMethods));
}
