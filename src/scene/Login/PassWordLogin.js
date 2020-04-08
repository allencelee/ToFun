import React, {PureComponent} from 'react';
import {
    Button,
    View,
    Text,
    Image,
    StyleSheet,
    TextInput,
    SafeAreaView,
    ScrollView,
    KeyboardAvoidingView,
    Platform
} from 'react-native';
import {NavigationActions, StackActions} from 'react-navigation';
import CommonButton from '../../widget/CommonButton';
// import {pwdEncry,isMobile} from '../../util/VerifyUtils'
// import {Toast,updateUser} from "../../util/CommonUtils";
import BaseButton from "../../widget/BaseButton";

export default class PassWordLogin extends PureComponent {
    static navigationOptions = {
        headerShown: false,
        headerHideShadow: true
    };

    constructor(props) {
        super(props);
        this.state = {
            phoneText: '',
            pwdText: '',
            validPhone: false,
            onPhoneFocus: false,
            onPwdFocus: false,
            pwdHasShow: true,
            pwdShowBtnHidden: true,
            deviceId: ''
        };
    }

    componentDidMount() {

    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <ScrollView style={styles.container} keyboardShouldPersistTaps={'handled'}>
                    <KeyboardAvoidingView behavior={'position'} keyboardVerticalOffset={0}>
                        <BaseButton image={require('../../img/back_black.png')} style={styles.backBtn} onPress={() => {
                            this._backAction()
                        }}/>
                        <Text style={styles.topText}>密码登录</Text>
                        <View style={styles.pwdView}>
                            <TextInput
                                ref={'pwdInput'}
                                style={styles.pwdInput}
                                placeholder={'请输入6-12位密码'}
                                selectionColor={gColor.mainColor}
                                clearButtonMode={'while-editing'}
                                secureTextEntry={this.state.pwdHasShow}
                                autoFocus={true}
                                onChangeText={(text) => {
                                    this.setState({pwdText: text});
                                }
                                }
                                onFocus={() => {
                                    this.setState({onPwdFocus: true});
                                }}
                                onBlur={() => {
                                    this.setState({onPwdFocus: false});
                                }}
                            />
                            <View
                                style={{width: 1, height: 16, backgroundColor: gColor.border, marginRight: 10}}
                            />
                            <BaseButton
                                style={{width: 24, height: 24}}
                                image={this.state.pwdHasShow ? require('../../img/eye_default.png') : require('../../img/eye_highlighted.png')}
                                onPress={() => {
                                    this.setState({pwdHasShow: !this.state.pwdHasShow});
                                }}
                            />
                        </View>
                        <View
                            style={styles.bottomLine}
                            backgroundColor={this.state.onPwdFocus ? gColor.mainColor : gColor.border}>
                        </View>
                        <Text style={styles.codeLoginText} onPress={() => {
                            this._pushToCodeLogin();
                        }}>验证码登录</Text>
                        <CommonButton
                            style={styles.loginButton}
                            title={'登录'}
                            validPhone={this.state.validPhone}
                            disable={!( this.state.pwdText.length > 0)}
                            onPressIn={() => {

                                this._logon();
                                // let newPwd = pwdEncry(this.state.pwdText);
                                //进行网络请求
                                // let params = {
                                //     appId:api.BrAPPID,
                                //     deviceId:this.state.deviceId,
                                //     unionId:this.state.phoneText,
                                //     password:newPwd,
                                //     osType:Platform.OS === 'ios'?"0":"1",
                                //     appVersion:getStaticData().versionName
                                //
                                // };

                                // showLoading();
                                // POST(BrConfigFactory.getUrl(api.kPwdLoginRequestPath),params,(result)=>{
                                //     hideLoading();
                                //     let obj = JSON.parse(result);
                                //     if(result){
                                //         if(obj.code === 0){
                                //             updateUser(result);
                                //             let resetAction = StackActions.reset({
                                //                 index: 0,
                                //                 actions: [
                                //                     NavigationActions.navigate({routeName:'Tab'})
                                //                 ]
                                //             });
                                //
                                //             this.props.navigation.dispatch(resetAction);
                                //         }else {
                                //             Toast(obj.message);
                                //         }
                                //     }else {
                                //         Toast("服务异常");
                                //     }
                                // },(result)=>{
                                //     hideLoading();
                                //     Toast("服务异常");
                                // });

                            }}
                        />
                    </KeyboardAvoidingView>
                </ScrollView>
            </SafeAreaView>
        );
    }

    _backAction() {
        this.props.navigation.goBack();
    }

    _pushToCodeLogin() {
        this.props.navigation.navigate('AuthCodeCheck', {
            phoneText: this.props.navigation.state.params.phoneText,
        });
    }

    _logon(){
        let resetAction = StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({routeName: "Tab"})]
        });
        this.props.navigation.dispatch(resetAction);
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    backBtn: {
        width: 25,
        height: 25,
        marginLeft: 20,
        marginTop: 20,
    },
    logo: {
        width: 48,
        height: 48,
        marginLeft: 40,
        marginTop: 20,
    },
    nav: {
        color: 'black',
        fontSize: 16,
    },
    topText: {
        fontSize: 31,
        marginTop: 32,
        marginLeft: 40
    },
    textInput: {
        height: 54,
        fontSize: 18,
        marginTop: 32,
        marginLeft: 40,
        marginRight: 40,
        borderBottomWidth: 1,
    },
    pwdView: {
        height: 54,
        fontSize: 18,
        marginTop: 32,
        marginLeft: 40,
        marginRight: 40,
        flexDirection: 'row',
        alignItems: 'center',
    },
    pwdInput: {
        height: 54,
        fontSize: 18,
        flex: 1,
    },
    bottomLine: {
        marginLeft: 40,
        marginRight: 40,
        height: 1,
    },
    codeLoginText: {
        fontSize: 16,
        marginTop: 32,
        marginRight: 40,
        width:100,
        color: gColor.mainColor,
        textAlign: 'right',
        alignSelf: 'flex-end'
    },
    loginButton: {
        marginTop: 27,
        height: 40,
        width: 100,
        alignSelf: "center",
        borderRadius: 20,
        backgroundColor: gColor.mainColor,

    },
    titleStyle: {
        fontSize: 20,
    },
});


