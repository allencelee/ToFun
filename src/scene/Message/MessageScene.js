import React, {PureComponent }from 'react'
import { View,Text} from 'react-native'
type Props = {
    navigation: any,
}
type State = {
    discounts: Array<Object>,
    dataList: Array<Object>,
    refreshing: boolean,
}
class MessageScene extends PureComponent<Props, State>{
    static navigationOptions = ({navigation}: any)=>({
        title:'消息',
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
