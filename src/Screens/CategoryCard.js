import React, { Component } from 'react';
import { Text } from 'react-native';
import { Card, ListItem, Icon } from 'react-native-elements';
const CategoryCard = (props) =>{
    const {navigation,Category} = props;

    return (
      <Card containerStyle={{padding: 0}} >
        {
     <>       
              <Text>Num of Notes {Category.NoteCounter} </Text>       
               <Text style={styles.categtitle}>{Category.CategoryTitle} ----{Category.CategoryID}</Text>
                <Icon raised name='read-more' color='#7b68ee' onPress={() => navigation.navigate('Notes',{CategoryId:Category.CategoryID,CategoryTitle:Category.CategoryTitle})}/>
          
       </>      
            }
      </Card>
    );
    
}
export default CategoryCard;

