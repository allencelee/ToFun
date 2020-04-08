import React, {PureComponent }from 'react'
import { View,Text,ScrollView,StyleSheet} from 'react-native'
import {SafeAreaView} from "react-native-safe-area-context";
// import {ScrollView} from "react-navigation";

export default class MineScene extends PureComponent{
    static navigationOptions = {
        title:'我的',
        headerStyle:{
            shadowOpacity: 0,
        },
    };

    constructor(props){
        super(props);
        this.state = {

        }
    }
    render(){
        return (
            <SafeAreaView style={styles.container}>
                <ScrollView style={styles.container}>
                    <View >
                        <Text>消息</Text>
                    </View>
                </ScrollView>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
    },
})


