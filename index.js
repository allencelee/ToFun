/**
 * @format
 */


import React, { PureComponent } from 'react'
import { AppRegistry } from 'react-native'
import RootScene from './src/RootScene'
import './src/common/global'

export default class ToFun extends PureComponent {
    render() {
        return (
            <RootScene />
        );
    }
}
AppRegistry.registerComponent('ToFun', () => ToFun);