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
class MineScene extends PureComponent<Props, State>{
    static navigationOptions = ({navigation}: any)=>({
        title:'我的',
    })
    render(){
        return (
            <View >
                <Text>消息</Text>
            </View>
        )
    }
}
export default MineScene
