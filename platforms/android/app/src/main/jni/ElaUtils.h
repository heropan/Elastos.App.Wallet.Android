// Copyright (c) 2012-2018 The Elastos Open Source Project
// Distributed under the MIT software license, see the accompanying
// file COPYING or http://www.opensource.org/licenses/mit-license.php.


#include <jni.h>
#include <android/log.h>

#define TAG "Elastos_Droid_Wallet" // 这个是自定义的LOG的标识
#define LOGD(...) __android_log_print(ANDROID_LOG_DEBUG,TAG ,__VA_ARGS__) // 定义LOGD类型
#define LOGI(...) __android_log_print(ANDROID_LOG_INFO,TAG ,__VA_ARGS__) // 定义LOGI类型
#define LOGW(...) __android_log_print(ANDROID_LOG_WARN,TAG ,__VA_ARGS__) // 定义LOGW类型
#define LOGE(...) __android_log_print(ANDROID_LOG_ERROR,TAG ,__VA_ARGS__) // 定义LOGE类型
#define LOGF(...) __android_log_print(ANDROID_LOG_FATAL,TAG ,__VA_ARGS__) // 定义LOGF类型

#ifndef NELEM
# define NELEM(x) ((int) (sizeof(x) / sizeof((x)[0])))
#endif

int jniRegisterNativeMethods(JNIEnv* env, const char* className, const JNINativeMethod* gMethods, int numMethods);

void CheckErrorAndLog(
    /* [in] */ JNIEnv* env,
    /* [in] */ const char* errlog,
    /* [in] */ int line);

void CheckErrorAndLog(
    /* [in] */ JNIEnv* env,
    /* [in] */ const char* errlog,
    /* [in] */ const char* paramname,
    /* [in] */ int line);

jlong GetJavaLongField(JNIEnv* env, jclass klass, jobject jobj, const char* fieldName);

void ThrowLogicException(JNIEnv* env, const char* errorInfo);
