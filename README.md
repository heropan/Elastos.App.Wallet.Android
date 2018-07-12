## Elastos Wallet App


###  安装相关库

##### 安装 ionic|cordova
> npm install -g ionic cordova 
##### 安装 依赖包
> npm install


### 运行

#### 1、web端运行：
>ionic serve 
#### 2、安卓端运行：
>ionic cordova run android --device
#### 3、安卓端-调试模式：
> ionic cordova run android -l -c -s // 挂载本地页面、实时更新，需要选择本地IP
#### 4、android studio 加载项目启动：
> 因为网站是编译打包后webview从assets目录中加载，若从android studio直接启动安卓项目，建议重新执行2或3命令重新打包


---

### 项目结构

- src |网页代码
    - pages |网站页面
    - providers/WalletManager.ts | cordova插件调用  
- www |打包后的网页代码
- platforms |平台
    - android |安卓项目
        - assets | 打包好的网站项目
        - jniLibs | 存放so动态库
        - com.elastos.spvcore.WalletManager | java->c++ jni 调用
        - ElaWallet.Wallet | java-js jni 调用
        - io.ionic.starter.MainActivity | 挂载webview的程序入口
- plungin-src | 钱包插件源码，通过命令自动添加到主项目中
    - plugin.xml |配置文件
    - www |  js代码 插件js接口
    - src |  java代码 插件java接口
- plugins |cordova 插件
    - ElaWallet | 钱包 插件 
       
        - anroid 与platforms下anroid相同，自动打包到项目中
        - 
### c++ 层
> 参看 https://github.com/elastos/Elastos.ELA.SPV.Cpp/tree/dev


### 基础命令
* 删除钱包插件: `ionic cordova plugin remove ElaWallet`
* 增加钱包插件: `cd plungin-src && ionic cordova plugin add  ElaWallet`
* 打包钱包插件: `cd .. && ionic cordova build android`
* `ionic cordova plugin remove ElaWallet && cd plungin-src && ionic cordova plugin add  ElaWallet && cd ..  && ionic cordova run android --device --prod`

### NDK使用版本
* android-ndk-r16b

### 打正式包指令
ionic cordova build android --release --prod

