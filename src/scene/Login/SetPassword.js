import React, {PureComponent} from 'react';
import {
    Button,
    View,
    Text,
    Image,
    StyleSheet,
    TextInput,
    Alert,
    SafeAreaView,
    Keyboard,
    ScrollView,
    KeyboardAvoidingView,
} from 'react-native';
import {createAppContainer, createStackNavigator, NavigationActions, StackActions} from 'react-navigation';
import CommonButton from '../../widget/CommonButton';
import BRWebView from '../../../src/widget/BRWebView';
import BRButton from '../../widget/Button';
import api from '../../api';
import {getUserInfo} from '../../util/AppInfoUtils';
import BrConfigFactory from '../../BrConfigFactory';
import {saveLocal, Toast, updateUser} from '../../util/CommonUtils';

export default class BRFindPassword extends PureComponent {


    constructor(props) {
        super(props);
        this.state = {
            phoneText: '',
            authCodeText: '',
            pwdText: '',
            validPhone: false,
            onPhoneFocus: false,
            onAuthCodeFocus: false,
            onPwdFocus: false,
            pwdHasShow: true,
            pwdShowBtnHidden: true,
        };
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <ScrollView style={styles.container} keyboardShouldPersistTaps={'handled'}>
                    <KeyboardAvoidingView behavior={'position'} keyboardVerticalOffset={0}>
                        <Text style={{fontSize: 31, marginTop: 32, marginLeft: 40}}>找回密码</Text>
                        <TextInput
                            ref={'phoneInput'}
                            style={styles.textInput}
                            placeholder={'请输入手机号'}
                            keyboardType={'number-pad'}
                            maxLength={11}
                            clearButtonMode={'while-editing'}
                            selectionColor={gColor.mainColor}
                            borderBottomColor={this.state.onPhoneFocus ? gColor.activeBorder : gColor.border}
                            onChangeText={(text) => {
                                if (text.length === 11) {
                                    this.setState({validPhone: true});
                                } else {
                                    this.setState({validPhone: false});
                                }
                                this.setState({phoneText: text});
                            }}
                            onFocus={() => {
                                this.setState({onPhoneFocus: true});
                            }}
                            onBlur={() => {
                                this.setState({onPhoneFocus: false});
                            }}

                        />
                        <View style={styles.pwdView}>
                            <TextInput
                                ref={'authCodeInput'}
                                style={styles.pwdInput}
                                placeholder={'请输入验证码'}
                                selectionColor={gColor.mainColor}
                                clearButtonMode={'while-editing'}
                                onChangeText={(text) => {
                                    this.setState({authCodeText: text});
                                }
                                }
                                onFocus={() => {
                                    this.setState({onAuthCodeFocus: true});
                                }}
                                onBlur={() => {
                                    this.setState({onAuthCodeFocus: false});
                                }}

                            />
                            <Text style={{
                                color: (this.state.validPhone ? gColor.mainColor : gColor.border),
                                fontSize: 14,
                                marginLeft: 40,
                            }} disabled={!this.state.validPhone} onPress={()=>{this.sendCode()}}>
                                获取验证码
                            </Text>
                        </View>
                        <View
                            style={styles.bottomLine}
                            backgroundColor={this.state.onAuthCodeFocus ? gColor.activeBorder : gColor.border}>
                        </View>
                        <View style={styles.pwdView}>
                            <TextInput
                                ref={'pwdInput'}
                                style={styles.pwdInput}
                                placeholder={'请设置6-12位密码'}
                                selectionColor={gColor.mainColor}
                                clearButtonMode={'while-editing'}
                                secureTextEntry={this.state.pwdHasShow}
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
                                style={{width: 1, height: 16, backgroundColor: gColor.border, marginRight: 10}}></View>
                            <BRButton
                                style={{width: 24, height: 24}}
                                image={this.state.pwdHasShow ? require('../../../resource/img/eye_default.png') : require('../../../resource/img/eye_highlighted.png')}
                                hidden={this.state.pwdShowBtnHidden}
                                onPress={() => {
                                    this.setState({pwdHasShow: !this.state.pwdHasShow});
                                }}
                            />
                        </View>
                        <View
                            style={styles.bottomLine}
                            backgroundColor={this.state.onPwdFocus ? gColor.activeBorder : gColor.border}>
                        </View>
                        <CommonButton
                            style={[gStyles.commonButton,styles.findButton]}
                            imageUri={'../../../resource/img/logon_btn_disabled.png'}
                            title={'提交'}
                            highImageUri={'../../../resource/img/icon_logon_highlight.png'}
                            disable={!(this.state.phoneText.length > 0 && this.state.pwdText.length > 0 && this.state.authCodeText.length > 0)}
                            onPressOut={()=>{this.logon(this.state.authCodeText)}}
                        />
                    </KeyboardAvoidingView>
                </ScrollView>
            </SafeAreaView>
        );
    }

    sendCode(){
        this.BRPicVerify.getCodeImage(BRSendVerCodeTypeLogon,()=>{});
    }


    logon(code) {
        let params = {
            appId: api.BrAPPID,
            unionId: this.state.phoneText,
            captcha: code,
            password: this.state.pwdText,
        };
        POST(getUrl(api.kForgetPwd),params,(result)=>{
            let obj = JSON.parse(result);
            if(result){
                if(obj.code === 0){
                    updateUser(result);
                    saveLocal('account',this.state.phoneText);
                    Toast('重置密码成功');
                    this.timer = setTimeout(()=>{
                        let resetAction = StackActions.reset({
                            index: 0,
                            actions: [
                                NavigationActions.navigate({routeName:'Tab'})
                            ]
                        });
                        this.props.navigation.dispatch(resetAction);
                    },500);

                }else {
                    Toast(obj.message);
                }
            }else {
                Toast("服务异常");
            }
        },(result)=>{
            Toast("服务异常");
        });
    }


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
    findButton:{
        marginTop:27,
    }
});


