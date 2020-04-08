import React,{Component} from 'react';
import { StyleSheet, Text, View, InteractionManager, Alert} from 'react-native';
import { WebView } from 'react-native-webview';


export default class BRWebView extends Component {

    static navigationOptions = ({navigation})=>{
        return{
            title:navigation.state.params.title,
            headerTitleStyle:{
                // fontSize:14,
                width:250,
                flex:1,
                textAlign: 'center'
            },
            headerRight: ()=>(<View/>),

        };
    }

    constructor(props){
        super(props)
        this.state={
            source:{}
        }
    }

    componentDidMount() {
        InteractionManager.runAfterInteractions(()=>{
            this.props.navigation.setParams({title:'加载中'});
            this.setState({source:{uri: this.props.navigation.state.params.url}});
        })
    }

    render() {
        return (
            <View style={gStyles.container} >
                <WebView
                    source={this.state.source}
                    onLoadEnd={(e)=>this.onLoadEnd(e)}
                />
            </View>
        );
    }

    onLoadEnd(e){
        if (e.nativeEvent.title.length>0){
            this.props.navigation.setParams({title:e.nativeEvent.title.toString()});
        }
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
    }
})
