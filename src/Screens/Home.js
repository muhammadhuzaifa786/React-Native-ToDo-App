import React,{useState,useEffect} from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';
import ActionButton from 'react-native-action-button';
import firebase from '../Config/Firebase.js'
import { connect } from 'react-redux'
import {set_user} from '../Store/action'


function Home(props){
  const [todoes,setTodoes] = useState([])

  

    edittodo=(key)=>{
        props.navigation.navigate("Edit Todo",{todokey:key})
    }
    deletetodo=(key)=>{
      firebase.database().ref("todoes/"+props.uid+'/'+key).remove()
    }
    useEffect(()=>{
      firebase.database().ref('todoes').child(props.uid).on("value",function(snapshot){
        let newArray = []
        snapshot.forEach((data)=>{
          const dataVal = data.val();
          newArray.push({
            key:data.key,
            task:dataVal.task,
            time:dataVal.time,
            date:dataVal.date
          })

        })
        setTodoes(newArray)
      })
    },[])

      
      return(
        <>
          <View style={{flex:1}}>
          <SwipeListView
            data={todoes}
            renderItem={ (data, rowMap) => (
                <View style={styles.rowFront}>
                    <Text style={{fontSize:20,fontWeight:"bold",marginLeft:10}}>{data.item.task}</Text>
                    <Text style={{marginLeft:10}}>{data.item.date}{"  "+data.item.time}</Text>

                </View>
            )}
            renderHiddenItem={ (data, rowMap) => (
                <View style={styles.rowBack}>
                  <Text></Text>
                  <View style={{flexDirection:'row'}}>
                      <TouchableOpacity style={{height:60,backgroundColor:"orange",width:70,justifyContent:"center",alignItems:"center"}} onPress={()=>edittodo(data.item.key)}><Text style={{fontWeight:"bold",color:"black"}}>Edit</Text></TouchableOpacity>

                      <TouchableOpacity style={{height:60,backgroundColor:"red",width:70,justifyContent:"center",alignItems:"center",marginRight:3}} onPress={()=>deletetodo(data.item.key)}><Text style={{fontWeight:"bold",color:"black"}}>Delete</Text></TouchableOpacity>

                  </View>
                </View>
            )}
            rightOpenValue={-140}
        />
        <ActionButton buttonColor="green" onPress={()=>props.navigation.navigate("Add Todo")}></ActionButton>
          </View>
        </>
    )
    

    
}

const mapStateToProps = (state) => ({
  hasUser:state.hasUser,
  uid:state.uid,
  currentUsername:state.currentUsername
})

const mapDispatchToProps = (dispatch) => ({
})


export default connect(mapStateToProps,mapDispatchToProps)(Home)

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f4f4f4',
    flex: 1,
  },
  backTextWhite: {
    color: '#FFF',
  },
  rowFront: {
    backgroundColor: '#FFF',
    borderRadius: 5,
    height: 60,
    justifyContent:"center",
    margin: 5,
    marginBottom: 15,
    shadowColor: '#999',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  rowFrontVisible: {
    backgroundColor: '#FFF',
    borderRadius: 5,
    height: 60,
    padding: 10,
    marginBottom: 15,
  },
  rowBack: {
    alignItems: 'center',
    backgroundColor: '#DDD',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
    margin: 5,
    marginBottom: 15,
    borderRadius: 5,
  },
  backRightBtn: {
    alignItems: 'flex-end',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 75,
    paddingRight: 17,
  },
  backRightBtnLeft: {
    backgroundColor: '#1f65ff',
    right: 75,
  },
  backRightBtnRight: {
    backgroundColor: 'red',
    right: 0,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  },
  trash: {
    height: 25,
    width: 25,
    marginRight: 7,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#666',
  },
  details: {
    fontSize: 12,
    color: '#999',
  },
  floatbtn:{
    flex:1,
    marginBottom:10

  }
});
