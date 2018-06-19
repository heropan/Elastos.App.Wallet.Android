// Copyright (c) 2012-2018 The Elastos Open Source Project
// Distributed under the MIT software license, see the accompanying
// file COPYING or http://www.opensource.org/licenses/mit-license.php.

#include "ElaUtils.h"
#include "ididManager.h"

using namespace Elastos::DID;

extern const char* ToStringFromJson(nlohmann::json jsonValue);

//"(JLjava/lang/String;)J"
static jlong JNICALL nativeCreateDID(JNIEnv *env, jobject clazz, jlong jDidMgrProxy, jstring jpassword)
{
    const char* password = env->GetStringUTFChars(jpassword, NULL);
    IDIDManager* didMgr = (IDIDManager*)jDidMgrProxy;
    IDID* did = didMgr->CreateDID(password);
    env->ReleaseStringUTFChars(jpassword, password);
    return (jlong)did;
}

//"(JLjava/lang/String;)J"
static jlong JNICALL nativeGetDID(JNIEnv *env, jobject clazz, jlong jDidMgrProxy, jstring jdidName)
{
    const char* didName = env->GetStringUTFChars(jdidName, NULL);
    IDIDManager* didMgr = (IDIDManager*)jDidMgrProxy;
    IDID* did = didMgr->GetDID(didName);
    env->ReleaseStringUTFChars(jdidName, didName);
    return (jlong)did;
}

//"(J)Ljava/lang/String;"
static /*nlohmann::json*/ jstring JNICALL nativeGetDIDList(JNIEnv *env, jobject clazz, jlong jDidMgrProxy)
{
    IDIDManager* didMgr = (IDIDManager*)jDidMgrProxy;
    nlohmann::json jsonValue = didMgr->GetDIDList();
    return env->NewStringUTF(ToStringFromJson(jsonValue));
}

//"(JLjava/lang/String;)V"
static void JNICALL nativeDestoryDID(JNIEnv *env, jobject clazz, jlong jDidMgrProxy, jstring jdidName)
{
    const char* didName = env->GetStringUTFChars(jdidName, NULL);
    IDIDManager* didMgr = (IDIDManager*)jDidMgrProxy;
    didMgr->DestoryDID(didName);
    env->ReleaseStringUTFChars(jdidName, didName);
}

static const JNINativeMethod gMethods[] = {
    {"nativeCreateDID", "(JLjava/lang/String;)J", (void*)nativeCreateDID},
    {"nativeGetDID", "(JLjava/lang/String;)J", (void*)nativeGetDID},
    {"nativeGetDIDList", "(J)Ljava/lang/String;", (void*)nativeGetDIDList},
    {"nativeDestoryDID", "(JLjava/lang/String;)V", (void*)nativeDestoryDID},
};

jint register_elastos_spv_IDidManager(JNIEnv *env)
{
    return jniRegisterNativeMethods(env, "com/elastos/spvcore/IDidManager",
        gMethods, NELEM(gMethods));
}
