import React,{PureComponent,useState} from 'react';
import {
    View,
    StyleSheet,
    TextInput,
    Text,
    Image,
    Platform,
    Animated,
    Modal,
    TouchableOpacity,
} from 'react-native';
import moment from 'moment';
import {SafeAreaView} from "react-native-safe-area-context";
import {ScrollView} from "react-navigation";
import BaseButton from '../../widget/BaseButton';
import DateTimePicker, {
    AndroidNativeProps as onChange,
    IOSNativeProps as date
} from '@react-native-community/datetimepicker';
import CommonButton from "../../widget/CommonButton";

export default class UserInfo extends PureComponent {

    static navigationOptions = {
        // headerShown: false,
        title:"用户信息",
        headerStyle:{
            shadowOpacity: 0,
        },
    };

    constructor(props){
        super(props);
        this.state = {
            sex:"",
            dateTime:'',
            dateShow:'',
            date: new Date(),
            mode: 'date',
            show: false,
        }
    }

    render(){
        const { show, date, mode } = this.state;
        return(
            <SafeAreaView style={styles.container}>
                <ScrollView>
                    <View style={styles.rowView}>
                        <Text>昵称</Text>
                        <TextInput style={styles.textInput} placeholder={'请输入昵称'}/>
                    </View>
                    <View style={styles.rowView}>
                        <Text>性别</Text>
                        <View style ={styles.sexView}>
                            <BaseButton
                                ref={ref=>this.maleButton=ref}
                                image={this.state.sex===0 ? require('../../img/check.png') :require('../../img/uncheck.png')}
                                style={styles.checkImg}
                                onPress={()=>{
                                this.selectSex(0);
                            }}/>
                            <Text style={{lineHeight:lineH}}>男</Text>
                            <BaseButton
                                ref={ref=>this.femaleButton=ref}
                                image={this.state.sex===1 ? require('../../img/check.png') :require('../../img/uncheck.png')}
                                style={styles.checkImg}
                                onPress={()=>{
                                this.selectSex(1);
                            }}/>
                            <Text style={{lineHeight:lineH}}>女</Text>
                        </View>
                    </View>
                    <View style={styles.rowView} onPress={()=>{
                        alert('父视图');
                    }}>
                        <Text style={styles.dateTitle}>出生日期</Text>
                        <Text
                            style={[styles.dateText,{color:this.state.dateTime === ''? '#BEBEBE': 'black'}]}
                            placeholder={'请选择出生日期'}
                            onPress={()=>{
                                this.datepicker();
                        }}>{this.state.dateTime === '' ? '请选择出生日期' : this.state.dateTime}</Text>
                    </View>

                    <View style={styles.rowView}>
                        <Text>来自</Text>
                        <TextInput style={styles.textInput} placeholder={'请输入家乡信息'}/>
                    </View>
                    <View style={styles.rowView}>
                        <Text>行业</Text>
                        <TextInput style={styles.textInput} placeholder={'请输入行业信息'}/>
                    </View>
                    <CommonButton title={'确定'} onPressOut={()=>{this.pushToHome()}} style={styles.okBtn}/>

                </ScrollView>
                <Modal
                    animationType={'slide'}
                    transparent={true}
                    visible={show}
                >
                    <TouchableOpacity style={[styles.pickerBG]} onPress={()=>{
                        this.dismissPicker();
                    }}>
                        <View style={{height:216+30,backgroundColor:'whitesmoke'}}>
                            <View style={{height:0.5,backgroundColor:'lightgray'}}/>
                            <Text style={styles.pickerOKBtn} onPress={()=>{
                                this.dismissPicker();
                            }}>确定</Text>
                            <DateTimePicker
                                value={date}
                                mode={mode}
                                display="default"
                                is24Hour={true}
                                onChange={this.setDate}
                                locale={'zh-CN'}
                            />
                        </View>
                    </TouchableOpacity>
                </Modal>
            </SafeAreaView>
        )
    }

    selectSex(sex){
        if (sex===0){
            this.setState({sex:0});
        }else if(sex===1){
            this.setState({sex:1});
        }
    }

    setDate = (event, date) => {
        date = date || this.state.date;

        this.setState({
            show: Platform.OS === 'ios',
            date,
            dateTime:this.dateFormatter(date),
        });
        // alert(this.dateFormatter(date));
    }

    show = mode => {
        this.setState({
            show: true,
            mode,
        });
    }

    datepicker = () => {
        this.show('date');
    }

    timepicker = () => {
        this.show('time');
    }

    dateFormatter(date){
        if (!date) return '';
        return moment(date).format('YYYY/MM/DD');
    }
    dismissPicker(){
        this.setDate('',new Date());
        this.setState({show:false});
    }
    pushToHome(){
        this.props.navigation.navigate('Tab');
    }

}


const lineH = 40;
const styles = StyleSheet.create({

    container:{
        flex:1
    },
    rowView:{
        flex:1,
        flexDirection:'row',
        alignItems:'center',
        marginLeft:20,
        marginRight:20,
        height: lineH,
        borderBottomColor:gColor.mainColor,
        borderBottomWidth:0.5,
        justifyContent: 'space-between',
    },
    sexView:{
        height:lineH,
        flexDirection:'row',
        marginRight:10,
        alignItems:'center'
    },
    checkImg:{
        width: 20,
        height:20,
        marginLeft: 10,
        marginRight: 5,
    },
    textInput:{
        height:lineH,
        width:100,
        marginRight: 10,
        textAlign: 'right',
    },
    dateTitle:{
        flex:1,
        height:lineH,
        lineHeight:lineH,
        alignItems:'center',
    },
    dateText:{
        height:lineH,
        lineHeight:lineH,
        width:100,
        marginRight: 10,
        textAlign: 'right',
    },
    pickerBG:{
        flex:1,

        justifyContent:'flex-end',
    },
    pickerOKBtn:{
        color:'blue',
        height:30,
        width:50,
        lineHeight:30,
        marginRight:10,
        alignSelf:'flex-end',
        textAlign:'center'
    },
    okBtn:{
        width:80,
        height:40,
        backgroundColor: gColor.mainColor,
        alignSelf: 'center',
        marginTop:100,
        borderRadius:20,
    }
})
