import React,{Component} from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    TextInput,
    Alert,
    SafeAreaView,
    TouchableOpacity,
    Keyboard,
    Animated,
    Easing,
    NativeModules,
} from 'react-native';
import CommonButton from '../../widget/CommonButton';
import construct from '@babel/runtime/helpers/esm/construct';

export default class TFPhoneInput extends Component {

    constructor(props){
        super(props);
        this.state = {
            phoneText:'',
            validPhone:false,
            onFocus: false,
        };
    }

    render(){
        return(
            <SafeAreaView>
                <Text style={styles.topText}>登录/注册 更精彩</Text>
                <Text style={styles.tipText}>输入手机号后，开始ToFun！未注册手机，将自动进入注册页面</Text>
                <TextInput
                    style={styles.textInput}
                    placeholder={'请输入手机号'}
                    keyboardType={'number-pad'}
                    maxlength={11}
                    borderBottomColor={this.state.onfocus?gColor.activeBorder:gColor.border}
                    onChangeText={(text)=>{
                        this.onTextChange(text);
                    }}
                >
                </TextInput>
                <CommonButton style={styles.okButton} title={'确定'} titleStyle={{fontSize:16,color:'white'}} onPressOut={()=>{this.okBtnClick()}}/>
                <View style={styles.policyView}>
                    <Text style={{color: gColor.gray, fontSize: 12}}>注册即同意</Text>
                    <Text
                        style={{fontSize: 12}}
                        onPress={()=>{
                            this._showPrivacyView();
                        }}
                    >《用户服务与隐私协议》</Text>
                </View>
            </SafeAreaView>
        );
    }

    onTextChange(text){
        this.setState({
            phoneText:text
        })
        if (text.length === 11){
            this.setState({validPhone:true});
        }else {
            this.setState({validPhone:false});
        }
    }

    okBtnClick(){
        //请求接口

    }

}



const styles = StyleSheet.create({
    container: {
        flex:1,
    },
    topText:{
        marginTop:40,
        fontSize:22,
        fontWeight: 'bold',
    },
    tipText:{
        marginTop:20,
        fontSize:18,
    },
    textInput: {
        marginTop:40,
        height:54,
        fontSize:18,
        marginTop:32,
        alignItems:'center',
    },
    okButton:{
        height: 40,
        fontSize: 20,
        marginTop: 30,
        alignItems: 'center',
    },
    policyView:{
        flex:1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-end',
        marginBottom:24
    },



});
