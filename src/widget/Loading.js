import React, {PureComponent} from 'react';
import {
    View,
    StyleSheet,
    TouchableOpacity,
    ActivityIndicator,
    Modal,
    Text,
    Image,
} from 'react-native';
export default class Loading extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
        };
    }
    show(){
        this.setState({show:true});
    };

    hide(){
        this.setState({show:false});
    }

    render() {
        return (
            <Modal transparent={true} animationType={'none'} visible={this.state.show}>
                <View style={styles.container}>
                    <View  style={styles.loadView}>
                        <ActivityIndicator style={styles.indicator} size={'large'} color={gColor.mainColor}/>
                    </View>
                </View>
            </Modal>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: global.kWidth,
        height: global.kHeight,
        justifyContent: 'center',
        alignItems: 'center',
        flex:1,
    },
    loadView:{
        width:60,
        height:60,
        borderRadius:10,
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


