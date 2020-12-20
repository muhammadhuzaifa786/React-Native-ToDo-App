import React, { Component,useState } from 'react';
import {
  TextField,
  FilledTextField,
  OutlinedTextField,
} from 'react-native-material-textfield';
import {StyleSheet,ScrollView,View,Text,TouchableOpacity} from 'react-native'
import firebase from '../Config/Firebase.js'


function SignUp(props){


    const [name,setName] = useState("")
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")


    const onSubmit=()=>{
        alert("Please Wait ....")
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(result=>{

            var user = result.user;

            var users = {
                name: name,
                email: user.email,
                uid:user.uid,
                password: password
            }

            var flag = false;
            firebase.database().ref('users').on("value", function(snapshot) {
                //var data = snapshot.val();

                snapshot.forEach(function(data) {
                    var userdata = data.val();
    
                    if (userdata.email === users.email) {
                        flag = true
                    }
                });
    
                if (flag === false) {
                    firebase.database().ref('/').child('users/'+user.uid).set({
                        displayName: users.name,
                        email: user.email,
                        uid:user.uid,
                        password: users.password
                    })

    
                } else {
                }
                alert("SignUp Success")
                props.navigation.navigate("Login")

            })  

            

        })
        .catch(function(error) {
            // Handle Errors here.
            //var errorCode = error.code;
            var errorMessage = error.message;
            alert(errorMessage);
            // ...
        });

    
    }


    return (
      <ScrollView>
        <View style={styles.container}>
          <Text style={{fontSize:32,marginBottom:20,fontWeight:"bold"}}>Create An Account</Text>
          <OutlinedTextField
            label='Enter Your Name'
            keyboardType='default'
            name='name'
            tintColor="green"
            baseColor="green"
            value={name}
            onChangeText={setName}
          />
          <View style={{marginBottom:10}}></View>
          <OutlinedTextField
            label='Enter Your Email Address'
            keyboardType='email-address'
            name='email'
            tintColor="green"
            baseColor="green"
            value={email}
            onChangeText={setEmail}
          />
          <View style={{marginBottom:10}}></View>
          <OutlinedTextField
            label='Enter Your Password'
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
                <Text style={{color:"white",fontSize:16,fontWeight:"bold"}}>Create Account</Text>
            </TouchableOpacity>
            
          </View>


      </View>
      </ScrollView>
    );
  }


export default SignUp

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