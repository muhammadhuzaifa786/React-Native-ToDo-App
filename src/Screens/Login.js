import React, { Component,useState,useEffect } from 'react';
import {
  TextField,
  FilledTextField,
  OutlinedTextField,
} from 'react-native-material-textfield';
import {StyleSheet,ScrollView,View,Text,TouchableOpacity,BackHandler,Alert} from 'react-native'
import { connect } from 'react-redux'
import {set_user} from '../Store/action'
import firebase from '../Config/Firebase.js'


function Login(props){

  const backAction = () => {
    Alert.alert("Exit App", "Are You Sure You Want To Exit?", [
      {
        text: "Cancel",
        onPress: () => null,
        style: "cancel"
      },
      { text: "YES", onPress: () => BackHandler.exitApp() }
    ]);
    return true;
  };

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", backAction);

    return () =>
      BackHandler.removeEventListener("hardwareBackPress", backAction);
  }, []);

  


  
  

  const gotoSigup = ()=>{
    props.navigation.navigate("SignUp")
  }

    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")


    const onSubmit=()=>{
      alert("Please Wait ....")
        firebase.auth().signInWithEmailAndPassword(email,password)
        .then((result) => {

            firebase.database().ref("users").child(result.user.uid).on("value",(snapshot)=>{

              const names = snapshot.val().displayName;
              const uids = snapshot.val().uid;
              const emails = snapshot.val().email;
              console.log(names,emails,uids)
              props.set_user(names,emails,uids)
              props.navigation.navigate("Home")
              

            })
            


        })
        .catch(function(error) {
            // Handle Errors here.
            //var errorCode = error.code;
            var errorMessage = error.message;
            alert(errorMessage)
        });
    }

    return (
      <ScrollView>
        <View style={styles.container}>
          <Text style={{fontSize:32,marginBottom:20,fontWeight:"bold"}}>WELCOME</Text>
          <View style={{marginBottom:10}}></View>
          <OutlinedTextField
            label='Enter Your Email'
            keyboardType='email-address'
            name='email'
            tintColor="green"
            baseColor="green"
            value={email}
            onChangeText={setEmail}
          />
          <View style={{marginBottom:10}}></View>
          <OutlinedTextField
            label='Enter Password'
            keyboardType='default'
            name='password'
            tintColor="green"
            baseColor="green"
            value={password}
            onChangeText={setPassword}
          />
          <View style={{marginBottom:10}}></View>
          
            
          <View style={styles.btngroup}>

            <TouchableOpacity 
              style={styles.btn} 
              onPress={()=>onSubmit()}>
                <Text style={{color:"white",fontSize:20,fontWeight:"bold"}}>Sign In</Text>
            </TouchableOpacity>
            
            
          </View>
          <View>
          <TouchableOpacity 
              onPress={()=>gotoSigup()}>
                <Text style={{color:"green",fontSize:16,fontWeight:"bold",textAlign:"center"}}>create an account</Text>
            </TouchableOpacity>
          </View>


      </View>
      </ScrollView>
    );
  }


  const mapStateToProps = (state) => ({
    defaultuser:state.default,
    hasUser:state.hasUser,
    currentUsername:state.currentUsername
})
  
const mapDispatchToProps = (dispatch) => ({
    set_user:(name,email,uid)=> dispatch(set_user(name,email,uid))
})
  
  
export default connect(mapStateToProps,mapDispatchToProps)(Login)

const styles =StyleSheet.create({
  container:{
    flex:1,
    marginTop:"10%",
    width:"90%",
    justifyContent:"center",
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