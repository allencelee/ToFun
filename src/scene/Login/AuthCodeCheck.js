import React, {Component} from 'react';
import {
    Button,
    View,
    Text,
    Image,
    StyleSheet,
    TextInput,
    Alert,
    SafeAreaView,
    UIManager,
    findNodeHandle, TouchableWithoutFeedback, Keyboard,
} from 'react-native';
import CommonButton from '../../widget/CommonButton'
// import {Toast, updateUser} from '../../util/CommonUtils';
import {createAppContainer, createStackNavigator, NavigationActions, StackActions} from 'react-navigation';
// import api from '../../api';
// import {getDynamicData, getUserInfo} from '../../util/AppInfoUtils';


class AuthCodeCheck extends Component {
    static navigationOptions = {};
    static defaultProps = {};

    constructor(props) {
        super(props);
        this.state = {
            text: '',
            onFocus: false,
            sendable: false,
            marginLeft: 0,
            currentIndex: 0,
            textArray: [],
            timerText: '',
            timer: 59,
            deviceId: '',
        };
    }

    componentDidMount(): void {
        // getDynamicData((result) => {
        //     this.setState({deviceId: result.deviceId});
        // });
        this.setState({timerText: `剩余${this.state.timer}s`});
        this.timer = setInterval(() => {
            if (this.state.timer > 0) {
                this.setState({timer: this.state.timer - 1}, () => {
                    this.countTimer();
                });
            } else {
                this.setState({sendable: true});
                this.timer && clearInterval(this.timer);
            }
        }, 1000);

        this.keyBoardListener = Keyboard.addListener('keyboardWillHide', () => {
            this._keyboardDidHide();
        });
    }

    countTimer() {
        let str = `剩余${this.state.timer}s`;
        this.setState({timerText: str});
    }

    componentWillUnmount(): void {
        this.timer && clearInterval(this.timer);
        this.keyBoardListener.remove();
    }


    render() {
        this.phoneText = this.props.navigation.state.params.phoneText;
        return (
            <SafeAreaView style={{flex: 1}} onPress={() => {
                this.refs.phoneInput.blur();
            }}>
                <Text style={{fontSize: 30, marginTop: 32, marginLeft: 40}}>请输入验证码</Text>
                <Text style={{
                    fontSize: 16,
                    marginTop: 16,
                    marginLeft: 40,
                    color: gColor.gray,
                }}>验证码已发送至 {this.phoneText}</Text>
                <View style={styles.textView}>
                    <TextInput ref={TextInput => this.textInput = TextInput}
                               style={[styles.textInput, {left: this.state.marginLeft}]} onKeyPress={(e) => {
                        this._onKeyPress(e);
                    }} onChangeText={(text) => {
                        this._onChange(text);
                    }} autoFocus={true} onFocus={() => {

                    }} onBlur={() => {

                    }} selectionColor={gColor.mainBorder}
                               maxLength={1}
                               keyboardType={'number-pad'}/>
                    <TouchableWithoutFeedback onPress={() => {
                        this._clickMText();
                    }}>
                        <View style={[styles.text, {borderBottomColor: gColor.mainBorder}]}
                              ref={text => this.text1 = text}>
                            <Text
                                style={styles.text2}
                                maxLength={1}>
                                {this.state.textArray[0]}
                            </Text>
                        </View>


                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={() => {
                        this._clickMText();
                    }}>
                        <View ref={text => this.text2 = text}
                              style={[styles.text, {borderBottomColor: this.state.textArray[1] || this.state.currentIndex === 1 ? gColor.mainBorder : gColor.border}]}>
                            <Text
                                style={styles.text2}
                                maxLength={1}>
                                {this.state.textArray[1]}
                            </Text>
                        </View>

                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={() => {
                        this._clickMText();
                    }}>
                        <View ref={text => this.text3 = text}
                              style={[styles.text, {borderBottomColor: this.state.textArray[2] || this.state.currentIndex === 2 ? gColor.mainBorder : gColor.border}]}>
                            <Text
                                style={styles.text2}
                                maxLength={1}>
                                {this.state.textArray[2]}
                            </Text>
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={() => {
                        this._clickMText();
                    }}>
                        <View ref={text => this.text4 = text}
                              style={[styles.text, {borderBottomColor: this.state.textArray[3] || this.state.currentIndex === 3 ? gColor.mainBorder : gColor.border}]}>
                            <Text
                                maxLength={1} style={styles.text2}>
                                {this.state.textArray[3]}
                            </Text>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
                <CommonButton 
                    style={styles.okButton} 
                    title={'重新发送'} 
                    titleStyle={{fontSize:16,color:'white'}} 
                    onPressOut={()=>{this.okBtnClick()}}
                    disable={!this.state.sendable}
                />
                <Text style={[styles.resendText, {color: this.state.sendable ? 'black' : '#2d2d2d'}]}
                      onPress={() => {
                          if (this.state.sendable) {
                              this._showSendAlert();
                          }
                      }}>{this.state.sendable ? '收不到验证码?' : this.state.timerText}</Text>

            </SafeAreaView>
        );
    }

    _showSendAlert() {

    }

    _onChange(text) {

        if (text) {
            this.textInput.clear();
            if (this.state.textArray.length == 6) {
                return;
            }
            let textArray = this.state.textArray;
            textArray.push(text);
            if (textArray.length === 6) {
                // this.textInput.blur();
                let code = '';
                textArray.map((value, index) => {
                    code += value;
                    if (index === 5) {
                        this._logon(code);
                    }
                });

            }

            this.setState({textArray: textArray, currentIndex: this.state.currentIndex + 1}, () => {
                this._changePosition();
            });

        } else {
            alert(text);
        }
    }

    _onKeyPress(e) {
        if (e.nativeEvent.key === 'Backspace') {
            let textArray = this.state.textArray;
            if (textArray.length == 0) {
                return;
            }
            this.textInput.clear();
            textArray.pop();
            if (this.state.currentIndex != 0) {
                this.setState({currentIndex: this.state.currentIndex - 1}, () => {
                    this._changePosition();
                });
            } else {
                this.setState({textArray: textArray});
            }

        }
    }

    _changePosition() {
        var textArray = [];
        textArray.push(this.text1, this.text2, this.text3, this.text4, this.text5, this.text6);
        if (this.state.currentIndex < textArray.length) {
            UIManager.measure(findNodeHandle(textArray[this.state.currentIndex]), (x, y, width, height, pageX) => {

                this.setState({marginLeft: pageX - 30});
            });
        }

    }

    _onClickSheet(index) {
        if (index !== 2) {
            alert(index);
        }
    }

    clearText(){
        this.setState(
            {textArray:[]},
        );
        this.setState({marginLeft: 0});
        this.textInput.focus();
    }

    _logon(code) {
        let params = {
            appId: api.BrAPPID,
            unionId: this.phoneText,
            deviceId: this.state.deviceId,
            captcha: code,
            osType: api.BrOSTYPE,
        };
        showLoading();
        POST(BrConfigFactory.getUrl(api.kQuickLogonRequestPath), params, (result) => {
            hideLoading();
            this.clearText();
            let obj = JSON.parse(result);
            if (result) {
                if (obj.code === 0) {
                    updateUser(result);
                    let resetAction = StackActions.reset({
                        index: 0,
                        actions: [
                            NavigationActions.navigate({routeName: 'Tab'}),
                        ],
                    });
                    this.props.navigation.dispatch(resetAction);
                } else {

                    Toast(obj.message);
                }
            } else {
                Toast('服务异常');
            }

        }, (result) => {
            hideLoading();
            Toast('服务异常');
        });
    }

    _clickMText() {
        this.textInput.focus();
    }

    _keyboardDidHide() {
        this.textInput.blur();
    }


}


export default AuthCodeCheck;

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    textView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginLeft: 60,
        marginRight: 60,
        marginTop: 36,
    },

    text: {
        width: 40,

        borderBottomWidth: 1,
        textAlign: 'center',
        height: 40,
        lineHeight: 40,
        alignItems: 'center',
        justifyContent: 'center',

    },

    text2: {
        fontSize: 26,
    },

    textInput: {
        width: 40,
        fontSize: 26,
        textAlign: 'center',
        position: 'absolute',
        height: 40,
    },

    resendText: {
        marginLeft: 30,
        marginTop: 20,
        fontSize: 14,
    },
    okButton:{
        height: 40,
        fontSize: 20,
        marginTop: 100,
        width:100,
        alignSelf:'center',
    },

    timer: {},

});


