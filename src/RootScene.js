import React, {PureComponent} from "react";
import {
    Image,
    StatusBar,
    View,
    ActivityIndicator,
    StyleSheet,
    Platform
} from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import {
    createAppContainer,
    TabBarBottom,
    createSwitchNavigator,
    Header
} from "react-navigation";
import {createBottomTabNavigator} from "react-navigation-tabs";
import {createStackNavigator, } from "react-navigation-stack";

import color from "./widget/color";
import TabBarItem from "./widget/TabBarItem";
import TFPhoneInput from "./scene/Login/TFPhoneInput";
import HomeScene from "./scene/Home/HomeScene";
import MessageScene from "./scene/Message/MessageScene";
import MineScene from "./scene/Mine/MineScene";
import WebScene from "./widget/WebScene";
import AuthCodeCheck from "./scene/Login/AuthCodeCheck";
import PassWordLogin from "./scene/Login/PassWordLogin";
import Loading from "./widget/Loading";
import Toast from "./widget/Toast";
import UserInfo from "./scene/Login/UserInfo";

const lightContentScenes = [];

function getCurrentRouteName(navigationState) {
    if (!navigationState) {
        return null;
    }
    const route = navigationState.routes[navigationState.index];
    if (route.routes) {
        return getCurrentRouteName(route);
    }
    return route.routeName;
}

class RootScene extends PureComponent {
    constructor(props) {
        super(props);
        StatusBar.setBarStyle("light-content");
        this._checkLogin();
    }

    _checkLogin = async () => {
        const userToken = await AsyncStorage.getItem("userToken");
        if (userToken) {
            this.setState({isLogin: true});
        } else {
            this.setState({isLogin: false});
        }
    };

    render() {
        if (!this.state || this.state.isLogin == null) {
            return (
                <View style={styles.container}>
                    <StatusBar
                        backgroundColor={"transparent"}
                        translucent={true}
                        barStyle={"dark-content"}
                    />
                    <ActivityIndicator size="small" color="gray"/>
                </View>
            );
        }
        const AppNavigator = configAppNavigator(this.state.isLogin);
        const AppContainer = createAppContainer(AppNavigator);
        return (
            <View style={styles.container}>
                <Loading ref={o=>global.loading=o}/>
                <Toast ref={o=>global.toast=o}/>
                <AppContainer/>
            </View>
        );
    }
}

const Tab = createBottomTabNavigator(
    {
        Home: {
            screen: createStackNavigator({Home: HomeScene}),
            navigationOptions: ({navigation}) => ({
                tabBarLabel: "首页",
                tabBarIcon: ({focused, tintColor}) => (
                    <TabBarItem
                        tintColor={tintColor}
                        focused={focused}
                        normalImage={require("./img/tabbar_home.png")}
                        selectedImage={require("./img/tabbar_home_selected.png")}
                    />
                )
            })
        },
        Message: {
            screen: createStackNavigator({Nearby: MessageScene}),
            navigationOptions: ({navigation}) => ({
                tabBarLabel: "消息",
                tabBarIcon: ({focused, tintColor}) => (
                    <TabBarItem
                        tintColor={tintColor}
                        focused={focused}
                        normalImage={require("./img/tabbar_message.png")}
                        selectedImage={require("./img/tabbar_message_selected.png")}
                    />
                )
            })
        },

        Mine: {
            screen: createStackNavigator({Mine: MineScene}),
            navigationOptions: ({navigation}) => ({
                tabBarLabel: "我的",
                tabBarIcon: ({focused, tintColor}) => (
                    <TabBarItem
                        tintColor={tintColor}
                        focused={focused}
                        normalImage={require("./img/tabbar_mine.png")}
                        selectedImage={require("./img/tabbar_mine_selected.png")}
                    />
                )
            })
        }
    },
    {
        tabBarComponent: TabBarBottom,
        tabBarPosition: "bottom",
        lazy: true,
        animationEnabled: false,
        swipeEnabled: false,
        tabBarOptions: {
            activeTintColor: color.primary,
            inactiveTintColor: color.gray,
            style: {backgroundColor: "#ffffff",borderTopWidth:0},
            borderTopWidth:0,
        },

    }
);

Tab.navigationOptions = {
    headerShown: false
};

function configAppNavigator(isLogIn) {
    let platformContainerStyles;
    if (Platform.OS === "ios") {

        platformContainerStyles = {
            borderBottomWidth: 0
        };
    } else {
        platformContainerStyles = {
            elevation: 0,
            height: StatusBar.currentHeight+Header.HEIGHT,
            paddingTop: StatusBar.currentHeight
        };
    }

    return createStackNavigator(
        {
            Tab: Tab,
            Web: WebScene,
            TFPhoneInput: TFPhoneInput,
            AuthCodeCheck: AuthCodeCheck,
            PassWordLogin: PassWordLogin,
            UserInfo: UserInfo,
        },
        {
            initialRouteName: isLogIn ? "Tab" : "TFPhoneInput",
            defaultNavigationOptions: {
                headerBackImage: () => (
                    <Image
                        source={require("./img/back_black.png")}
                        style={{width: 24, height: 24, marginLeft: 16}}
                    />
                ),
                headerTruncatedBackTitle: "",
                headerBackTitle: null,
                headerTintColor: "#333333",
                // showIcon: true,
                // headerHideShadow:true,
            }
        }
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    indicatorStyle: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    }
});

export default RootScene;
