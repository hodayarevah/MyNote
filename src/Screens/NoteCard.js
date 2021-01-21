import React, { Component } from 'react';
import { Image,Text,View } from 'react-native';
import styles from "./MyStyle";
import { Icon,Card } from 'react-native-elements';


const NoteCard = (props) =>{
    const {Note,ClickEvent} = props;

    return (


      <Card>

      
            <View style={styles.user}>
                  
              <Text style={styles.categtitle}>{Note.NoteTitle} </Text>
              {
                  Note.NoteImage ? 
                  <Image style={styles.imgcard} source={{uri:Note.NoteImage}} />
                  : null
                }
                  <Icon raised name='delete'  onPress={()=>ClickEvent(Note)}/>
              
                  <Text style={styles.notecomments}>{Note.NoteText} </Text>
            </View>
      
   
        </Card>     
  );
}
export default NoteCard;

