import React, {PureComponent }from 'react'
import { View,Text} from 'react-native'
class MessageScene extends PureComponent{
    static navigationOptions = ({navigation})=>({
        title:'消息',
        headerStyle:{
            shadowOpacity: 0,
        },
    })
    render(){
        return (
            <View >
                <Text>消息</Text>
            </View>
        )
    }
}
export default MessageScene
