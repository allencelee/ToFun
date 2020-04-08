import React, {PureComponent} from "react";
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    SafeAreaView,
    UIManager,
    findNodeHandle,
    TouchableWithoutFeedback,
    Keyboard
} from "react-native";
import CommonButton from "../../widget/CommonButton";
import {
    NavigationActions,
    StackActions
} from "react-navigation";
import BaseButton from "../../widget/BaseButton";

class AuthCodeCheck extends PureComponent {
    static navigationOptions = {
        headerShown: false,
        headerHideShadow: true
    };
    static defaultProps = {};
    gColor;

    constructor(props) {
        super(props);
        this.state = {
            text: "",
            onFocus: false,
            sendable: false,
            marginLeft: 0,
            currentIndex: 0,
            textArray: [],
            timerText: "",
            timer: 59,
            deviceId: ""
        };
    }

    componentDidMount() {
        // getDynamicData((result) => {
        //     this.setState({deviceId: result.deviceId});
        // });
        this.count();

        this.keyBoardListener = Keyboard.addListener("keyboardWillHide", () => {
            this.keyboardDidHide();
        });
    }

    componentWillUnmount() {
        this.timer && clearInterval(this.timer);
        this.keyBoardListener.remove();
    }

    render() {
        this.phoneText = this.props.navigation.state.params.phoneText;
        return (
            <SafeAreaView
                style={{flex: 1}}
                onPress={() => {
                    this.refs.phoneInput.blur();
                }}
            >
                <BaseButton image={require('../../img/back_black.png')} style={styles.backBtn} onPress={() => {
                    this.backAction()
                }}/>
                <Text style={{fontSize: 30, marginTop: 32, marginLeft: 40}}>
                    请输入验证码
                </Text>
                <Text
                    style={{
                        fontSize: 16,
                        marginTop: 16,
                        marginLeft: 40,
                        color: gColor.gray
                    }}
                >
                    验证码已发送至 {this.phoneText}
                </Text>
                <View style={styles.textView}>
                    <TextInput
                        ref={TextInput => (this.textInput = TextInput)}
                        style={[styles.textInput, {left: this.state.marginLeft}]}
                        onKeyPress={e => {
                            this.onKeyPress(e);
                        }}
                        onChangeText={text => {
                            this.onChange(text);
                        }}
                        autoFocus={true}
                        onFocus={() => {
                        }}
                        onBlur={() => {
                        }}
                        selectionColor={gColor.mainColor}
                        maxLength={1}
                        keyboardType={"number-pad"}
                    />
                    <TouchableWithoutFeedback
                        onPress={() => {
                            this.clickMText();
                        }}
                    >
                        <View
                            style={[styles.text, {borderBottomColor: gColor.mainColor}]}
                            ref={text => (this.text1 = text)}
                        >
                            <Text style={styles.text2} maxLength={1}>
                                {this.state.textArray[0]}
                            </Text>
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback
                        onPress={() => {
                            this.clickMText();
                        }}
                    >
                        <View
                            ref={text => (this.text2 = text)}
                            style={[
                                styles.text,
                                {
                                    borderBottomColor:
                                        this.state.textArray[1] || this.state.currentIndex === 1
                                            ? gColor.mainColor
                                            : gColor.border
                                }
                            ]}
                        >
                            <Text style={styles.text2} maxLength={1}>
                                {this.state.textArray[1]}
                            </Text>
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback
                        onPress={() => {
                            this.clickMText();
                        }}
                    >
                        <View
                            ref={text => (this.text3 = text)}
                            style={[
                                styles.text,
                                {
                                    borderBottomColor:
                                        this.state.textArray[2] || this.state.currentIndex === 2
                                            ? gColor.mainColor
                                            : gColor.border
                                }
                            ]}
                        >
                            <Text style={styles.text2} maxLength={1}>
                                {this.state.textArray[2]}
                            </Text>
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback
                        onPress={() => {
                            this.clickMText();
                        }}
                    >
                        <View
                            ref={text => (this.text4 = text)}
                            style={[
                                styles.text,
                                {
                                    borderBottomColor:
                                        this.state.textArray[3] || this.state.currentIndex === 3
                                            ? gColor.mainColor
                                            : gColor.border
                                }
                            ]}
                        >
                            <Text maxLength={1} style={styles.text2}>
                                {this.state.textArray[3]}
                            </Text>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
                <CommonButton
                    style={styles.okButton}
                    title={"重新发送"}
                    titleStyle={styles.titleStyle}
                    onPressOut={() => {44
                        this.sendCode();
                    }}
                    disable={!this.state.sendable}
                />
                {this.state.sendable ? <View/> : <Text
                    style={[
                        styles.resendText,
                        {color: this.state.sendable ? "black" : "#2d2d2d"}
                    ]}
                    onPress={() => {
                        if (this.state.sendable) {
                            this.showSendAlert();
                        }
                    }}
                    show={this.state.sendable ? true : false}
                >
                    {`剩余${this.state.timer}s`}
                </Text>}

            </SafeAreaView>
        );
    }

    count(){
        this.timer = setInterval(() => {
            if (this.state.timer > 1) {
                this.setState({timer: this.state.timer - 1});
            } else {
                this.setState({sendable: true});
                this.timer && clearInterval(this.timer);
                this.setState({timer:59});
            }
        }, 1000);
    }

    backAction() {
        this.props.navigation.goBack();
    }

    sendCode() {
    }

    onChange(text) {
        if (text) {
            this.textInput.clear();
            if (this.state.textArray.length == 4) {
                return;
            }
            let textArray = this.state.textArray;
            textArray.push(text);
            if (textArray.length === 4) {
                // this.textInput.blur();
                let code = "";
                textArray.map((value, index) => {
                    code += value;
                    if (index === 3) {
                        this.logon(code);
                    }
                });
            }

            this.setState(
                {textArray: textArray, currentIndex: this.state.currentIndex + 1},
                () => {
                    this.changePosition();
                }
            );
        } else {
            alert(text);
        }
    }

    onKeyPress(e) {
        if (e.nativeEvent.key === "Backspace") {
            let textArray = this.state.textArray;
            if (textArray.length == 0) {
                return;
            }
            this.textInput.clear();
            textArray.pop();
            if (this.state.currentIndex != 0) {
                this.setState({currentIndex: this.state.currentIndex - 1}, () => {
                    this.changePosition();
                });
            } else {
                this.setState({textArray: textArray});
            }
        }
    }

    changePosition() {
        var textArray = [];
        textArray.push(this.text1, this.text2, this.text3, this.text4);
        if (this.state.currentIndex < textArray.length) {
            UIManager.measure(
                findNodeHandle(textArray[this.state.currentIndex]),
                (x, y, width, height, pageX) => {
                    this.setState({marginLeft: pageX - 60});
                }
            );
        }
    }

    clearText() {
        this.setState({textArray: []}, 2);
        this.setState({marginLeft: 0});
        this.textInput.focus();
    }

    logon(code) {
        let resetAction = StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({routeName: "Tab"})]
        });
        this.props.navigation.dispatch(resetAction);

        // let params = {
        //     appId: api.BrAPPID,
        //     unionId: this.phoneText,
        //     deviceId: this.state.deviceId,
        //     captcha: code,
        //     osType: api.BrOSTYPE,
        // };
        // showLoading();
        // POST(BrConfigFactory.getUrl(api.kQuickLogonRequestPath), params2, (result) => {
        //     hideLoading();
        //     this.clearText();
        //     let obj = JSON.parse(result);
        //     if (result) {
        //         if (obj.code === 0) {
        //             updateUser(result);
        //             let resetAction = StackActions.reset({
        //                 index: 0,
        //                 actions: [
        //                     NavigationActions.navigate({routeName: 'Tab'}),
        //                 ],
        //             });2
        //             this.props.navigation.dispatch(resetAction);
        //         } else {

        //             Toast(obj.message);
        //         }
        //     } else {
        //         Toast('服务异常');
        //     }

        // }, (result) => {
        //     hideLoading();
        //     Toast('服务异常');
        // });
    }

    clickMText() {
        this.textInput.focus();
    }

    keyboardDidHide() {
        this.textInput.blur();
    }
}

export default AuthCodeCheck;
const styles = StyleSheet.create({
    container: {
        alignItems: "center"
    },
    backBtn: {
        width: 25,
        height: 25,
        marginLeft: 20,
        marginTop: 20,
    },
    textView: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginLeft: 60,
        marginRight: 60,
        marginTop: 36,

    },
    text: {
        width: 40,
        borderBottomWidth: 1,
        textAlign: "center",
        height: 40,
        lineHeight: 40,
        alignItems: "center",
        justifyContent: "center"
    },
    text2: {
        fontSize: 26
    },
    textInput: {
        width: 40,
        fontSize: 26,
        textAlign: "center",
        position: "absolute",
        height: 40
    },
    resendText: {
        marginTop: 20,
        fontSize: 14,
        textAlign: 'center'
    },
    okButton: {
        height: 40,
        marginTop: 60,
        width: 100,
        alignSelf: "center",
        borderRadius: 20,
        backgroundColor: gColor.mainColor,
    },
    titleStyle: {
        fontSize: 20,
    },
    timer: {}
});
