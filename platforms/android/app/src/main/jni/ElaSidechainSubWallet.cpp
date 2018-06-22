// Copyright (c) 2012-2018 The Elastos Open Source Project
// Distributed under the MIT software license, see the accompanying
// file COPYING or http://www.opensource.org/licenses/mit-license.php.

#include "ElaUtils.h"
#include "ISidechainSubWallet.h"
#include "nlohmann/json.hpp"

using namespace Elastos::ElaWallet;

extern const char* ToStringFromJson(const nlohmann::json& jsonValue);
extern nlohmann::json ToJosnFromString(const char* str);

//"(JLjava/lang/String;Ljava/lang/String;JLjava/lang/String;Ljava/lang/String;Ljava/lang/String;JLjava/lang/String;)Ljava/lang/String;"
static jstring JNICALL nativeCreateWithdrawTransaction(JNIEnv *env, jobject clazz, jlong jSideSubWalletProxy, jstring jfromAddress
        , jstring jtoAddress, jlong amount, jstring jmainchainAccounts, jstring jmainchainAmounts,
        jstring jmainchainIndexs, jlong fee, jstring jmemo)
{
    const char* fromAddress = env->GetStringUTFChars(jfromAddress, NULL);
    const char* toAddress = env->GetStringUTFChars(jtoAddress, NULL);
    const char* mainchainAccounts = env->GetStringUTFChars(jmainchainAccounts, NULL);
    const char* mainchainAmounts = env->GetStringUTFChars(jmainchainAmounts, NULL);
    const char* mainchainIndexs = env->GetStringUTFChars(jmainchainIndexs, NULL);
    const char* memo = env->GetStringUTFChars(jmemo, NULL);

    ISidechainSubWallet* wallet = (ISidechainSubWallet*)jSideSubWalletProxy;
    nlohmann::json result = wallet->CreateWithdrawTransaction(fromAddress, toAddress, amount
                , ToJosnFromString(mainchainAccounts), ToJosnFromString(mainchainAmounts)
                , ToJosnFromString(mainchainIndexs), fee, memo);

    env->ReleaseStringUTFChars(jfromAddress, fromAddress);
    env->ReleaseStringUTFChars(jtoAddress, toAddress);
    env->ReleaseStringUTFChars(jmainchainAccounts, mainchainAccounts);
    env->ReleaseStringUTFChars(jmainchainAmounts, mainchainAmounts);
    env->ReleaseStringUTFChars(jmainchainIndexs, mainchainIndexs);
    env->ReleaseStringUTFChars(jmemo, memo);

    return env->NewStringUTF(ToStringFromJson(result));
}


static const JNINativeMethod gMethods[] = {
    {"nativeCreateWithdrawTransaction",
    "(JLjava/lang/String;Ljava/lang/String;JLjava/lang/String;Ljava/lang/String;Ljava/lang/String;JLjava/lang/String;)Ljava/lang/String;"
            , (void*)nativeCreateWithdrawTransaction},
};

jint register_elastos_spv_ISidechainSubWallet(JNIEnv *env)
{
    return jniRegisterNativeMethods(env, "com/elastos/spvcore/ISidechainSubWallet",
        gMethods, NELEM(gMethods));
}
