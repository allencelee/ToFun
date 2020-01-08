import React, {Component} from 'react';
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
  StatusBar,
} from 'react-native';
import CommonButton from '../../widget/CommonButton';
import construct from '@babel/runtime/helpers/esm/construct';

export default class TFPhoneInput extends Component {
  static navigationOptions = {
    headerShown: false,
  };

  constructor(props) {
    super(props);
    StatusBar.setBarStyle('dark-content');
    this.state = {
      phoneText: '',
      validPhone: false,
      onFocus: false,
    };
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <TouchableOpacity
          style={styles.TouchableOpacity}
          activeOpacity={1}
          onPress={() => {
            this.refs.phoneInput.blur();
          }}>
          <Image
            source={require('../../img/login_banner.png')}
            style={styles.topImg}
          />
          <Text style={styles.topText}>登录/注册 更精彩</Text>
          <Text style={styles.tipText}>
            输入手机号后，开始寻找乐趣！未注册手机，将自动进入注册页面
          </Text>
          <View style={styles.phoneView}>
            <Image
              source={require('../../img/login_phone.png')}
              style={styles.phoneImg}
            />
            <TextInput
              ref={'phoneInput'}
              style={styles.textInput}
              placeholder={'请输入手机号'}
              keyboardType={'number-pad'}
              maxlength={11}
              selectionColor={gColor.mainColor}
              borderBottomColor={
                this.state.onFocus ? gColor.mainColor : gColor.border
              }
              onChangeText={text => {
                this.onTextChange(text);
              }}
              onFocus={() => {
                this.setState({onFocus: true});
              }}
              onBlur={() => {
                this.setState({onFocus: false});
              }}
            />
          </View>

          <CommonButton
            style={styles.okButton}
            title={'确定'}
            titleStyle={{fontSize: 16, color: 'white'}}
            onPressOut={() => {
              this.okBtnClick();
            }}
            disable={!this.state.validPhone}
          />
          <View style={styles.policyView}>
            <Text style={{color: gColor.gray, fontSize: 12}}>注册即同意</Text>
            <Text
              style={{fontSize: 12}}
              onPress={() => {
                this._showPrivacyView();
              }}>
              《用户服务与隐私协议》
            </Text>
          </View>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
  onTextChange(text) {
    this.setState({
      phoneText: text,
    });
    if (text.length === 11) {
      this.setState({validPhone: true});
    } else {
      this.setState({validPhone: false});
    }
  }

  okBtnClick() {
    //请求接口
    this.props.navigation.navigate('AuthCodeCheck', {
      phoneText: this.state.phoneText,
    });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topImg: {
    marginTop: 40,
    alignSelf: 'center',
    width: 150,
    height: 50,
  },
  topText: {
    marginTop: 40,
    marginLeft: 40,
    fontSize: 25,
    fontWeight: 'bold',
  },
  tipText: {
    marginTop: 20,
    marginLeft: 40,
    marginRight: 40,
    fontSize: 16,
  },
  phoneView: {
    flexDirection: 'row',
    marginTop: 30,
    marginLeft: 40,
    marginRight: 40,
    height: 40,
  },
  phoneImg: {
    marginTop: 7,
    width: 25,
    height: 25,
  },
  textInput: {
    flex: 1,
    marginLeft: 20,
    height: 40,
    fontSize: 20,
    borderBottomWidth: 1,
  },
  okButton: {
    height: 40,
    fontSize: 20,
    marginTop: 40,
    width: 100,
    alignSelf: 'center',
  },
  policyView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginBottom: 24,
  },
});
