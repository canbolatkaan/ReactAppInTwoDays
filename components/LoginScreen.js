import React, { Component } from 'react';
import MapScreen from './MapScreen';
import { StyleSheet, Text, View, TextInput, TouchableOpacity,Image } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
export default class LoginScreen extends Component{
    passed=false
    state={
        email:"",
        password:""
    }
    
    pressHandler = (email,password) => {
        if(email == "admin" && password== "admin")
        this.passed=true
        else
        this.passed=false
        console.log(this.passed)
    }
    render() {
        return (
            <View style={styles.container}>
         <Image 
         style={styles.image}
         source={require('../svg/logo.png')} />
         <View style={styles.inputView} >
           <TextInput  
            style={styles.inputText}
            placeholder="Username..." 
            placeholderTextColor="#003f5c"
            onChangeText={text => this.setState({email:text})}
            />
            
         </View>
         <View style={styles.inputView} >
           <TextInput  
            secureTextEntry
            style={styles.inputText}
            placeholder="Password..." 
            placeholderTextColor="#003f5c"
            onChangeText={text => this.setState({password:text})}/>
         </View>
         
         <TouchableOpacity style={styles.loginBtn} onPress={ () => {
             this.pressHandler(this.state.password,this.state.email)
             if(this.passed)
                return (
                    <MapScreen />
                )

         }}>
           <Text style={styles.loginText}>Login</Text>
         </TouchableOpacity>
         <TouchableOpacity>
           <Text style={styles.loginText}>üye ol</Text>
         </TouchableOpacity>
 
   
       </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#ffffff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    logo:{
      fontWeight:"bold",
      fontSize:50,
      color:"#fb5b5a",
      marginBottom:40
    },
    image:{
     resizeMode: 'stretch',
      width: 200,
      height :70,
      marginBottom:50
    },
    inputView:{
      width:"80%",
      backgroundColor:"#FFFFFF",
      borderColor: "#000000",
      borderWidth:2,
      borderRadius:25,
      height:50,
      marginBottom:20,
      justifyContent:"center",
      textAlign: "center",
      padding:20
    },
    inputText:{
      height:50,
      color:"black",
     },
    forgot:{
      color:"black",
      fontSize:11
    },
    loginBtn:{
      width:"80%",
      backgroundColor:"#124734",
      borderRadius:25,
      height:50,
      alignItems:"center",
      justifyContent:"center",
      marginTop:40,
      marginBottom:10
    },
    loginText:{
      color:"white"
    }
  });