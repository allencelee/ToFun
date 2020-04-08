/**
 * @format
 */


import React, { PureComponent } from 'react'
import './src/common/global'
import './src/utils/Net'
import { AppRegistry } from 'react-native'
import RootScene from './src/RootScene'

export default class ToFun extends PureComponent {
    render() {
        return (
            <RootScene />
        );
    }
}

AppRegistry.registerComponent('ToFun', () => ToFun);
