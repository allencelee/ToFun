import React, {PureComponent }from 'react'
import { View,Text,StyleSheet} from 'react-native'
import {POST} from "../../utils/Net";
import CommonButton from "../../widget/CommonButton";

export default class HomeScene extends PureComponent {
    static navigationOptions = {
        title:'首页',
        headerStyle:{
            shadowOpacity: 0,
        },
    };
    constructor(props){
        super(props);
    };
    render(){
        return (
            <View style={styles.container}>
                <Text>首页</Text>
                <CommonButton style={styles.loginButton} title={'测试'} titleStyle={{fontSize:20}} onPressOut={()=>{this.test()}}/>
            </View>
        )
    }
    test(){
        // let url = 'http://175.24.64.46:5000/yiqiqu/registered/regCheck';
        //         // let params = {telnum:'17610268888'};
        //         // POST(url,params,(data)=>{
        //         //     dAlert(data);
        //         // },(err)=>{
        //         //     dAlert(err);
        //         // });
        this.props.navigation.navigate("UserInfo",{});
    }
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    indicatorStyle: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    loginButton: {
        marginTop: 27,
        height: 40,
        width: 100,
        alignSelf: "center",
        borderRadius: 20,
        backgroundColor: gColor.mainColor,
    },
});

