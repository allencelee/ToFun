import {Dimensions, Platform, StatusBar, PixelRatio, StyleSheet, NativeModules, Alert} from 'react-native';
// import api from '../api';
// import BrConfigFactory from '../BrConfigFactory';
// import {POST} from '../util/Http';
// import {getDynamicData, getStaticData} from '../util/AppInfoUtils';

const {width, height} = Dimensions.get('window');
const OS = Platform.OS;
const ios = (OS === 'ios');
const android = (OS === 'android');
const isIPhoneX = (ios && height === 812 && width === 375);
const statusBarHeight = (ios ? (isIPhoneX ? 44 : 20) : StatusBar.currentHeight);
const Net = NativeModules.Net;
const scale = Math.min(height / 667, width / 375);


//===========================Functions===========================//
const Log = (...params) => {
    if (GLOBAL.__DEV__) {
        console.log(params);
    }
};
global.Log = Log;

// const getUrl = (partUrl) => {
//     return BrConfigFactory.getUrl(partUrl);
// };
// global.getUrl = getUrl;
// global.api = api;
// // global.urlConfig = BrConfigFactory;
// global.Net = Net;
// global.POST = POST;
// global.getDynamicData = getDynamicData;

// const showLoading = ()=>{
//     global.loadingRef && global.loadingRef.show();
// };
// global.showLoading=showLoading;
// const hideLoading = ()=>{
//     global.loadingRef && global.loadingRef.hide();
// };
// global.hideLoading=hideLoading;


//===========================Styles===========================//
global.gStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'green',
    },
    textInput: {
        height: 54,
        fontSize: 18,
        marginTop: 32,
        marginLeft: 40,
        marginRight: 40,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(74,74,74,0.2)',
    },
    commonButton: {
        height: 48,
        marginLeft: 30,
        marginRight: 30,
        borderRadius: 24,
    },
});

global.gColor = {
    mainColor: '#06C1AE',
    border: '#e0e0e0',
    paper: '#f3f3f3',
    gray: '#afafaf',
    activeBorder: '#FF9C7A',
    mainBorder: '#ff5f29',
    color_F68430: '#F68430',
};

global.gScreen = {
    screen_width: width,
    screen_height: height,
    statusBarHeight: statusBarHeight,
    onePixelRatio: 1 / PixelRatio.get(),
};

global.gDevice = {
    ios: ios,
    android: android,
    isIPhoneX: isIPhoneX,
};


const autoWidth = (widthValue) => {
    return widthValue * width / 375;
};
const autoHeight = (heightValue) => {
    return heightValue * height / 667;
};
global.autoWidth = autoWidth;
global.autoHeight = autoHeight;

export default {
    kScale: 375 / Dimensions.get('window').width,
    imgPath: 'RnBanyan/resource/img/',
    kWidth: width,
    kHeight: height,
    // api: api,
    isIOS: ios ? true : false,
};

//隐藏导航栏底部阴影
const platformContainerStyle = () => {
    let platformContainerStyles;
    if (Platform.OS === 'ios') {
        platformContainerStyles = {
            borderBottomWidth: 0,
        };
    } else {
        platformContainerStyles = {
            shadowOpacity: 0,
        };
    }
    return platformContainerStyles;
};
global.platformContainerStyle = platformContainerStyle;

//===========================调试===========================//
const gAlert = (params) => {
    return alert(JSON.stringify(params));

};
global.gAlert = gAlert;

