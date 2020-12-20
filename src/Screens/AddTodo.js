import React, { Component } from 'react';
import {
  TextField,
  FilledTextField,
  OutlinedTextField,
} from 'react-native-material-textfield';
import {StyleSheet,ScrollView,View,Text,TouchableOpacity} from 'react-native'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import firebase from '../Config/Firebase.js'
import DatePicker from 'react-native-datepicker'
import DateTimePicker from '@react-native-community/datetimepicker';
import { connect } from 'react-redux'


class AddTodo extends Component {
  constructor(){
    super()
    this.state={
      currentdate:new Date(),
      isTimePickerVisible:false,
      isDatePickerVisible:false,
      date:'',
      task:'',
      time:''
    }
  }

  onSubmit = () => {
    firebase.database().ref('todoes/'+this.props.uid).push({
      task:this.state.task,
      time:this.state.time,
      date:this.state.date
    })
    this.props.navigation.navigate("Home")

  };

  taskChange=(text)=>{
    this.setState({
      task:text
    })
    
  }



  ondateChange = (event, value) => {
    const newdate = value.toString()
    const date = newdate.substring(0, 15);
    this.setState({
        date: date,
        isDatePickerVisible: Platform.OS === 'ios' ? true : false,
    });

    if (event.type === "set"){
        console.log("value:" , value);
    }
  }

  ontimeChange = (event, value) => {
    const newtime = value.toString()
    const times = newtime.substring(16, 21);
    this.setState({
        time: times,
        isTimePickerVisible: Platform.OS === 'ios' ? true : false,
    });

    if (event.type === "set"){
        console.log("value:" , value);
    }
  }


  render() {
    let customStyles = {
      dateInput: {
        width: 0,
        height: 0,
        borderWidth: 0
      }
    };
    return (
      <ScrollView>
        <View style={styles.container}>
          <Text style={{fontSize:32,marginBottom:20,fontWeight:"bold"}}>Enter Your Task</Text>
          <OutlinedTextField
            label='Enter Your Task'
            keyboardType='default'
            name='task'
            tintColor="green"
            baseColor="green"
            value={this.state.task}
            onChangeText={this.taskChange}
          />
          <View style={{marginBottom:10}}></View>
          <TouchableOpacity
            onPress={() => this.setState({ isDatePickerVisible: true, })}>
            <OutlinedTextField 
              label='Enter Your Date'
              keyboardType='default'
              name='date'
              tintColor="green"
              baseColor="green"
              editable={false}
              value={this.state.date}
              placeholderTextColor='black'
              placeholder={this.state.date}
            />
          </TouchableOpacity>
          
          <View style={{marginBottom:10}}></View>
          <TouchableOpacity 
              onPress={() => this.setState({ isTimePickerVisible: true, })}>
              <OutlinedTextField
                label='Enter Your Time'
                keyboardType='default'
                ref='timebox'
                name='time'
                tintColor="green"
                editable={false}
                baseColor="green"
                placeholderTextColor='black'
                placeholder={this.state.time}
                value={this.state.time}
              />            
          </TouchableOpacity>
         
          {this.state.isDatePickerVisible && (
            <DateTimePicker
              testID="dateTimePicker"
              value={this.state.currentdate}
              mode='date'
              minimumDate={this.state.currentdate}
              display="default"
              onChange={(event,date)=>this.ondateChange(event,date)}
            />
          )}

          {this.state.isTimePickerVisible && (
            <DateTimePicker
              testID="dateTimePicker"
              value={this.state.currentdate}
              mode='time'
              minimumDate={this.state.currentdate}
              is24Hour={false}
              display="default"
              onChange={(event,time)=>this.ontimeChange(event,time)}
            />
          )}
          
            
          <View style={styles.btngroup}>

            <TouchableOpacity 
              style={styles.btn} 
              ref={(input) => { this.secondTextInput = input; }}
              onPress={this.onSubmit}>
                <Text style={{color:"white",fontSize:16,fontWeight:"bold"}}>Add This Task</Text>
            </TouchableOpacity>
            
          </View>


      </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = (state) => ({
  hasUser:state.hasUser,
  uid:state.uid,
  currentUsername:state.currentUsername
})

const mapDispatchToProps = (dispatch) => ({
})


export default connect(mapStateToProps,mapDispatchToProps)(AddTodo)

const styles =StyleSheet.create({
  container:{
    flex:1,
    marginTop:"10%",
    width:"90%",
    marginRight:"auto",
    marginLeft:"auto"
  },
  btngroup:{
    flex:1,
    flexDirection:"row",
    justifyContent:"center"
  },
  btn:{
    marginTop:20,
    borderRadius:15,
    backgroundColor:"green",
    width:"40%",
    margin:10,
    justifyContent:"center",
    alignItems:"center",
    height:60,
    color:"white"

  }

})