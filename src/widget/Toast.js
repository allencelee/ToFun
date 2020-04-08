import React,{PureComponent} from 'react';
import {
    View,
    Text, Modal, StyleSheet,
} from "react-native";

export default class Toast extends PureComponent{

    constructor(props) {
        super(props);
        this.state = {
            show: false,
            text:"",
        };
    }

    show(text){
        this.setState({show:true,text:text});
        this.timer = setTimeout(()=>{
            this.setState({show:false});
        },2000);

    };

    hide(){
        this.setState({show:false});
    }

    render() {
        return (
            <Modal transparent={true} animationType={'none'} visible={this.state.show}>
                <View style={styles.container}>
                <View style={styles.toastView}>
                    <Text style={styles.text}>
                        {this.state.text}
                    </Text>
                </View>
                </View>
            </Modal>
        );
    }

    componentWillUnmount() {
        this.timer && clearTimeout(this.timer);
    }
}


const styles = StyleSheet.create({
    container: {
        width: '70%',
        marginLeft:'15%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        flex:1,
    },

    toastView:{
        paddingTop:10,
        paddingBottom:10,
        paddingLeft:20,
        paddingRight:20,
        borderRadius:10,
        backgroundColor: 'black'
    },
    text:{
        fontSize:16,
        textAlign: 'center',
        color: 'white'
    },
    dialogContainer: {
        marginLeft: 36,
        marginRight: 36,
        borderRadius: 8,
        backgroundColor: 'white',
    },
    image: {
        width: 40,
        height: 40,

    },
});
