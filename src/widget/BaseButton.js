import React, {PureComponent} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ViewPropTypes,
    ImageBackground,
    Image,
    Alert,
    TouchableHighlight,
} from 'react-native';


class BaseButton extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            highLighted: false
        };
    }

    render() {
        return (
                <TouchableOpacity
                    style={[this.props.style,{alignItems: 'center',justifyContent: 'center'}]}
                    onPress={() => {
                        this.setState({
                            highLighted: false,
                        });
                        if (this.props.onPress) {
                            this.props.onPress(this);
                        }
                    }}

                    disabled={this.props.disable}
                    activeOpacity={this.props.disable ? 1 : 0.7}
                >
                    <Image style={styles.imageStyle} source={this.props.image} resizeMode={'contain'}/>
                    <View style={[styles.buttonStyle]}>
                        {this.props.title ? this.props.titleStyle ?
                            <Text style={this.props.titleStyle}>{this.props.title}</Text> :
                            <Text style={styles.titleStyle}>{this.props.title}</Text> : null}
                    </View>
                </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    innerViewStyle: {},
    imageStyle: {
        flex:1,
    },
    titleStyle: {
        color: 'white',
        fontSize: 16,
    },
});

export default BaseButton;



