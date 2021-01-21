import React, {Component} from 'react';
import {Image,View } from 'react-native';
import { Button, Text,Item,Form,Input, Label, Icon } from 'native-base';
import { Row} from 'react-native-easy-grid';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Permissions from 'expo-permissions';
import styles from "./MyStyle";
class NewNoteForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      NoteTitle:"",
      NoteInfo:"",
      image:"",
      hasCameraPermission: null,
    };
    this.Category=[];
    this.Notes=[];

  }

  async componentDidMount() {
  
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    this.setState({ hasCameraPermission: status === "granted" });  
    this.getAsyncStorage();
  }



  SubmitNote =()=>{

    const {CategoryId} = this.props.route.params;
    const NotesToSave = this.Notes;
    let NewNote = {
     CategoryID: CategoryId,
     NoteTitle:this.state.NoteTitle,
     NoteText:this.state.NoteInfo,
     NoteImage:this.state.image,
    }
     
    NotesToSave.push(NewNote);
    this.setAsyncStorage(NotesToSave);
    this.getCategories(CategoryId);
    this.setState({
      NoteTitle:'',
      NoteInfo:'',
      image:'',
    });
    this.props.navigation.goBack();
    //this.props.navigation.navigate('Categories');
  }



  OpenGallery = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
     allowsEditing: true,
     aspect: [4, 3]
    });
    if (!result.cancelled) {
      this.setState({ image: result.uri });
      alert("image uploded")
    }
  }
  OpenCamera = async () => {
    let result = await ImagePicker.launchCameraAsync({
     allowsEditing: true,
     aspect: [4, 3],
     quality:1
     
    });
    if (!result.cancelled) {
      this.setState({ image: result.uri });
      alert("image uploded")
    }
  }

  putData = async (value) => {
    try {   
      await AsyncStorage.setItem('Categories', JSON.stringify(value))
     }catch (e) {
       console.log(e);
     }
  }

  getCategories = async (CategoryId) => {
    try {
      var oldNotesCounter = 0;
      const getAsyncStorageDataT  = await AsyncStorage.getItem('Categories');
      const getAsyncStorageParsedY = JSON.parse(getAsyncStorageDataT);
      if(getAsyncStorageParsedY !== null) {    
        var index = getAsyncStorageParsedY.findIndex(obj => obj.CategoryID === CategoryId);
        oldNotesCounter=getAsyncStorageParsedY[index].NoteCounter;
        oldNotesCounter++;
        getAsyncStorageParsedY[index].NoteCounter=oldNotesCounter;
        this.putData(getAsyncStorageParsedY); 
      }
      
    } catch(e) {
      console.log(e);
    }
  }

  setAsyncStorage = async (value) => {
    try {   
      await AsyncStorage.setItem('Notes', JSON.stringify(value))
     }catch (e) {
       console.log(e);
     }
  }

  getAsyncStorage = async () => {
    const NotesList=[];
    try {
      const getAsyncStorageData = await AsyncStorage.getItem('Notes');
      const getAsyncStorageParsed = JSON.parse(getAsyncStorageData);
      if(getAsyncStorageParsed !== null) {      
              
        getAsyncStorageParsed.map((item =>{
            NotesList.push(item);
        }))

        this.Notes=NotesList;
      }
    } catch(e) {
      console.log(e);
    }
  }

  
  render() {
    const {image,hasCameraPermission,NoteInfo,NoteTitle} = this.state;
    const {CategoryId,CategoryTitle} = this.props.route.params;
    const {navigation} = this.props

    if (hasCameraPermission === null) {
     return <View />;
    }
    else if (hasCameraPermission === false) {
     return <Text>Access err</Text>;
    }
    else {
    return (
      <>
            <View style={styles.noteViewtitle}>
            <Text style={styles.notetitle} > Add info for a new Note </Text>
            </View>
            <Form style={{paddingTop:'20%'}}>
             <Item floatingLabel  > 
             <Label>Insert note title</Label>
                <Input value={NoteTitle} onChangeText={InputTitle=> this.setState({NoteTitle: InputTitle})}/>
             </Item>
             <Item floatingLabel  > 
             <Label>Insert more text</Label>
             <Input value={NoteInfo} onChangeText={Info=> this.setState({NoteInfo: Info})} />
             </Item>
            </Form>        
              <Text>You can add an image</Text>
                <View style={styles.imagecon} >
                {image ? (<Image source={{ uri: image }} />) : (<View/>)}
                </View>     
                <Row>
                <Icon raised name='camera' onPress={this.OpenCamera}></Icon>
                <Icon raised name='image'onPress={this.OpenGallery}></Icon>
                </Row> 
              <Button style={styles.SubmitBtn} onPress={this.SubmitNote} >
               <Text>Add Note</Text>
              </Button>
             
     

</>
    );
   }
  }
}
export default NewNoteForm;




