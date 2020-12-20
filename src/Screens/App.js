import React,{useState,useEffect} from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux'


function App(props){
  

    if(props.hasUser === false){
       props.navigation.navigate("Login")
       return true

    }else{
        props.navigation.navigate("Home")
        return true

    }

    
}

const mapStateToProps = (state) => ({
  hasUser:state.hasUser,
  currentUsername:state.currentUsername
})

const mapDispatchToProps = (dispatch) => ({
})


export default connect(mapStateToProps,mapDispatchToProps)(App)

