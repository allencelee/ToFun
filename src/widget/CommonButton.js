import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
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


class CommonButton extends PureComponent {
    static propTypes = {
        //普通状态
        title: PropTypes.string,
        titleStyle: PropTypes.object,
        imageStyle: PropTypes.object,
        //高亮状态
        highTitleStyle: PropTypes.object,
        //不可点击状态
        disable: PropTypes.bool,
        disableImageUri: PropTypes.string,
        //监听点击
        onPressIn: PropTypes.func,
        onPressOut: PropTypes.func,
        //按钮样式
        // buttonStyle: PropTypes.object,
        bigType: PropTypes.bool,
        //按钮颜色
        color: PropTypes.string,

    };

    static defaultProps = {
        bigType: true,
    };

    constructor(props) {
        super(props);
        this.state = {
            highLighted: false,
            radius: this.props.style.height / 2,
        };
    }


    render() {
        var radius = this.props.style.length ? this.props.style[0].height / 2 : this.props.style.height / 2;
        return (
            <View style={[this.props.style]}>
                <TouchableHighlight
                    style={{flex: 1, borderRadius: radius}}
                    onPressIn={() => {
                        this.setState({
                            highLighted: true,
                        });
                        if (this.props.onPressIn) {
                            this.props.onPressIn(this);
                        }
                        this.props.onPressIn;
                    }}
                    onPressOut={() => {
                        this.setState({
                            highLighted: false,
                        });
                        if (this.props.onPressOut) {
                            this.props.onPressOut(this);
                        }
                    }}
                    disabled={this.props.disable}
                    activeOpacity={this.props.disable ? 1 : 0.7}
                >
                    <View style={[{
                        backgroundColor: this.props.disable ? '#e1e1e1' : this.props.color ? this.props.color : '#ff7e00',
                        borderRadius: radius,
                    }, styles.buttonStyle]}>
                        {this.props.title ? this.props.titleStyle ?
                            <Text style={this.props.titleStyle}>{this.props.title}</Text> :
                            <Text style={styles.titleStyle}>{this.props.title}</Text> : null}
                    </View>
                </TouchableHighlight>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    innerViewStyle: {},
    imageStyle: {
        // marginLeft:3
    },
    titleStyle: {
        color: 'white',
        fontSize: 16,
    },
    buttonStyle: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',

    },
});

export default CommonButton;



