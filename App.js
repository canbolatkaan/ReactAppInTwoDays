/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React, { useState,Component } from "react";
import { Image,StyleSheet,View, Text, TextInput, Button, TouchableOpacity ,Dimensions} from 'react-native';
import { CurrentRenderContext, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MapView , { Polyline,Marker }from 'react-native-maps';
import PropTypes from 'prop-types';






const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 37.78825;
const LONGITUDE = -122.4324;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const SPACE = 0.01;

const styles = StyleSheet.create({
  mapcontainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  container: {
    flex: 1,
   
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
  },
  bubble: {
    
    
    alignItems: "center",
    backgroundColor: 'rgba(255,255,255,0.7)',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20,
    
  },
  buttonContainer: {
    flexDirection: 'column-reverse',
    marginVertical: 20,
    backgroundColor: 'transparent',
    
    
  },
  inputTextMap :{
    display: "flex",
      borderRadius:5,
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
      backgroundColor:"white"
  },
  drawButton :{
    justifyContent: "flex-start",
    width:"30%",
    backgroundColor:"#124734",
    borderRadius:5,
    height:40,
    margin: 12,
    padding: 10,
    
    
  },
  drawText :{
    textAlign:"center",
    justifyContent:"center",
    color:"white"
  },
  buttonBuble :{
    flexDirection: "row",
    justifyContent: "flex-start",
    
  }
});

const Stack = createNativeStackNavigator();
var myUserName="";

export default class App extends React.Component {

 LoginPage({ navigation }) {
  const handleChangeForUsername = e => {
    setSearchForUsername(e);
    
  };
  const handleChangeForPassword = e => {
    setSearchForPassword(e);

  };
  const [email, setSearchForUsername] = useState(null);
  const [password, setSearchForPassword] = useState(null);
  return (
    <View style={styles.container}>
         <Image 
         style={styles.image}
         source={require('./svg/logo.png')} />
         <View style={styles.inputView} >
           <TextInput
            onChangeText={e => {
              
          
              handleChangeForUsername(e);
              
                    
                  }}
            
            value={email} 
            style={styles.inputText}
            placeholder="Username..." 
            placeholderTextColor="#003f5c"
            
            />
            
         </View>
         <View style={styles.inputView} >
           <TextInput  
            secureTextEntry
            style={styles.inputText}
            placeholder="Password..." 
            placeholderTextColor="#003f5c"
            onChangeText={e => {
              handleChangeForPassword(e);
            }}
            value={password} 
            />
         </View>
         
         <TouchableOpacity style={styles.loginBtn} onPress={ () => {
            if(email=="admin" && password=="admin"){
            myUserName=email;
            navigation.navigate('Map');
            
          }
            else
            alert("Wrong password or username");
         }}>
           <Text style={styles.loginText}>Login</Text>
         </TouchableOpacity>
         
 
   
       </View>
  );
}


 Main() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login Page" component={this.LoginPage} />
        <Stack.Screen name="Map" component={MapPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

render(){
  return(this.Main());
}

}
App.propTypes = {
  provider: MapView.ProviderPropType,
};



  
 class MapPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      region: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
      marker:{
        latitude: LATITUDE ? LATITUDE : 0 ,
        longitude: LONGITUDE ? LONGITUDE : 0 ,
      },
      
      polyline: [
        {
          latitude: LATITUDE + SPACE,
          longitude: LONGITUDE - SPACE,
        },
        
        {
          latitude: LATITUDE - SPACE,
          longitude: LONGITUDE - SPACE,
        },
        
      ],
    };
  }
  
  render() {
    const { region, marker, polyline } = this.state;
    return (
      <View style={styles.mapcontainer}>

        <MapView
          provider={this.props.provider}
          style={styles.map}
          initialRegion={region}
          moveOnMarkerPress={true}
          {...console.log(myUserName)}
        >
          <Marker
            coordinate={marker}
            draggable={true}
            onDragStart={(e) => {
              console.log("Drag start", e.nativeEvent.coordinates)
            }}
          >

          </Marker>
          
          <MapView.Polyline
            
            coordinates={polyline}
            strokeColor="rgba(0,0,200,0.5)"
            strokeWidth={3}
            
            {...console.log (polyline)}
          />
        </MapView>
        <View style={styles.buttonContainer}>
          <View style={styles.bubble}>
            <Text >Username: {myUserName}</Text>
          
            
          </View>
          <View style= {styles.buttonBuble} >
          <TextInput
          style={styles.inputTextMap}
            placeholder="Second longitude"> 
            </TextInput>
            <TextInput
            style={styles.inputTextMap}
            placeholder="Second latitude"> 
            </TextInput>
            </View>
            <View style= {styles.buttonBuble} >
            
            <TextInput
          style={styles.inputTextMap}
            placeholder="First longitude"> 
            </TextInput>
          
            <TextInput
            style={styles.inputTextMap}
            placeholder="First latitude"> 
            </TextInput>
            </View>
            <View style= {styles.buttonBuble} >
          <TouchableOpacity style={styles.drawButton} >
           <Text style={styles.drawText}>Draw</Text>
         </TouchableOpacity>
          </View>

        </View>
      </View>
    )
  }
}


 
