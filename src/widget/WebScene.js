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
    render(){
        return (
            <View >
                <Text>web</Text>
            </View>
        )
    }
}
export default HomeScene
