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
class HomeScene extends PureComponent<Props, State>{
    static navigationOptions = ({navigation}: any)=>({
        title:'首页',
    })
    render(){
        return (
            <View >
                <Text>首页</Text>
            </View>
        )
    }
}
export default HomeScene
