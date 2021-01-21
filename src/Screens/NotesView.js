import React, { Component } from 'react';
import {SafeAreaView, ScrollView, Text,View } from 'react-native';
import NoteCard from './NoteCard';
import styles from "./MyStyle";
import { Icon } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
class NotesView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      AllNotes:[],
    };
    this.CategoryWatch=0;
  }


  componentDidMount(){
    const {CategoryId} = this.props.route.params;
    this.CategoryWatch = CategoryId;
    this._unsubscribeFocus = this.props.navigation.addListener('focus',(payload)=>{this.CategoryWatch = CategoryId;  this.getAsyncStorage(CategoryId); });
  }

  componentWillUnmount(){
    this._unsubscribeFocus();
  }

  setAsyncStorage = async (value) => {
    try {   
      await AsyncStorage.setItem('Notes', JSON.stringify(value))
     }catch (e) {
       console.log(e);
     }
  }
  getAsyncStorage = async (CategoryId) => {
    const NotesList = [];
    try {
      const getAsyncStorageData = await AsyncStorage.getItem('Notes');
      const getAsyncStorageParsed = JSON.parse(getAsyncStorageData);
      if(getAsyncStorageParsed !== null) { 

          getAsyncStorageParsed.map((item =>{

          if(item.CategoryID === CategoryId){
            NotesList.push(item);
          }

        }))
        this.setState({
          AllNotes:NotesList,
        })    
      }
    } catch(e) {
      console.log(e);
    }
  }
   
  

  delAsyncNote = async (Note) => {
    const NotesToSave= [];
    const CategoryNotes=[];
    try {
      const getAsyncStorageData = await AsyncStorage.getItem('Notes');
      const getAsyncStorageParsed = JSON.parse(getAsyncStorageData);
      if(getAsyncStorageParsed !== null) { 

          getAsyncStorageParsed.map((item =>{

            if( item.CategoryID ===Note.CategoryID && item.NoteTitle === Note.NoteTitle && item.NoteText ===Note.NoteText ){
        
             }
             else{
            if(item.CategoryID=== this.CategoryWatch){
              CategoryNotes.push(item);
            }
            NotesToSave.push(item);
          }
          }))
       
        this.setAsyncStorage(NotesToSave);    
        this.UpdateNotesCount(Note.CategoryID); 
        this.setState({ AllNotes:CategoryNotes, })    
      }
    } catch(e) {
      console.log(e);
    }
  }


  UpdateNotesCount = async (CategoryId) => {
    try {
      var oldNotesCounter = 0;
      const getAsyncStorageDataT = await AsyncStorage.getItem('Categories');
      const getAsyncStorageParsedY = JSON.parse(getAsyncStorageDataT);
      if(getAsyncStorageParsedY !== null) {  
              
        var index = getAsyncStorageParsedY.findIndex(obj => obj.CategoryID === CategoryId);
        oldNotesCounter=getAsyncStorageParsedY[index].NoteCounter;

        if(oldNotesCounter>0){
          oldNotesCounter--;
        }
        getAsyncStorageParsedY[index].NoteCounter=oldNotesCounter;
        this.UpdateCategories(getAsyncStorageParsedY); 
      }
      
    } catch(e) {
      console.log(e);
    }
  }

  
  UpdateCategories = async (value) => {
    try {   
      await AsyncStorage.setItem('Categories', JSON.stringify(value))
     }catch (e) {
       console.log(e);
     }
  }

  deleteNote=(Note)=>{
    this.delAsyncNote(Note);
  }
 
  render() {
     const {CategoryId,CategoryTitle} = this.props.route.params;
     const {AllNotes} = this.state;
   

    return (
      <SafeAreaView >
      <ScrollView >

              <View style={styles.noteViewtitle}>
              <Text style={styles.notetitle} >{CategoryTitle} </Text>
              </View>
            {
            AllNotes.length>0?
            AllNotes.map((item,key)=><NoteCard Note={item} key={key} ClickEvent={this.deleteNote}/>):
            <View>
              <Text>No Notes, add the first one.</Text>
            </View>
            }
             <Icon  style={styles.iconaddnote} raised name='add'  onPress={() =>this.props.navigation.navigate('NewNote',{CategoryId:CategoryId,CategoryTitle:CategoryTitle})}/>

</ScrollView>
    </SafeAreaView>
    );
  }
}

export default NotesView;


