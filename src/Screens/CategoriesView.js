import React from 'react';
import {SafeAreaView, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Button, Input, Item, Text } from 'native-base';
import CategoryCard from './CategoryCard.js';
import { ImageBackground } from 'react-native';
import styles from "./MyStyle";
class  CategoriesView extends React.Component {

    constructor(props){
      super(props)

      this.Categories=[];
      this.IdCounter=0; 
      this.state={      
        AllCategories: [],
        NewCategory:"",
      };

  }


  componentDidMount(){

    this._unsubscribeFocus = this.props.navigation.addListener('focus',(payload)=>{
      this.getData();
    });
    
  }  


  getData = async () => {
    try {
      const getAsyncStorageData = await AsyncStorage.getItem('Categories');
      const getAsyncStorageParsed = JSON.parse(getAsyncStorageData);
        if(getAsyncStorageParsed !== null) {      
        this.setState({ AllCategories:getAsyncStorageParsed})
      }
    }
     catch(e) {
      console.log(e);
    }
  }

  AddCategory = () =>{
    let InputC = this.state.NewCategory;
    if(InputC === ''){
        alert("You must add category name")
    }
    else{

    this.Categories = this.state.AllCategories;
    let id = this.IdCounter;
    let title = InputC;
    
    var CategoryToAdd = {
      CategoryID:id, 
      CategoryTitle:title,
      NoteCounter:0,
    }

    this.IdCounter++;
    this.Categories.push(CategoryToAdd);
    this.putData(this.Categories);
    this.setState({
      AllCategories:this.Categories,
      NewCategory:'',
    });
    alert("New Category was added")
  }
}


clearAsyncStorage = async() => {
  AsyncStorage.clear(); 
  this.setState({
    AllCategories:[],
  })
}

putData = async (value) => {
  try {   
    await AsyncStorage.setItem('Categories', JSON.stringify(value))
   }catch (e) {
     console.log(e);
     alert("err")
   }
}


  render(){

    const {AllCategories,NewCategory} = this.state;

   return(
    <ImageBackground source= {require('../imge1.png')} style={styles.image}>
   
    <SafeAreaView >
    <ScrollView >
 
    <Text style={styles.mynoteh1}>My Notes</Text>
<Button block style={styles.add} onPress={this.clearAsyncStorage}>
           <Text>Clear Everything</Text>       
           </Button>
            <Item regular style={styles.locate} >
             <Input style={styles.input} placeholder='insert text here' value={NewCategory} onChangeText={(text)=>this.setState({NewCategory:text})}/>
           </Item>
           <Button block style={styles.add}  onPress={this.AddCategory}>
             <Text>Add a new Category</Text>         
           </Button>
           {   
            AllCategories.length>0?
            AllCategories.map((item,key)=><CategoryCard  key={key} Category={item} navigation={this.props.navigation} />):               
            <Text>No Categories yet, add the first one.</Text>
        
           }


           
      </ScrollView>
    </SafeAreaView>
    </ImageBackground>
   );
 }
}
export default CategoriesView

