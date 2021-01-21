import React, { Component } from 'react';
import { Icon, Text } from 'native-base';
import { ImageBackground } from 'react-native';
import { Col, Row } from 'react-native-easy-grid';
import styles from "./MyStyle";

class HomeView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };
  }
 
  render() {
    return (  

    
    <ImageBackground source= {require('../image2.png')} style={styles.image}>
          <Row>
          <Text style={styles.text}>MY NOTES</Text>
          </Row>
          <Row >
          <Text  style={styles.words}> lets start
          <Icon reverse style={styles.go}  name='play' onPress={() => this.props.navigation.navigate('Categories')}  />
          </Text>
          </Row> 

      </ImageBackground>
    
    );
  }
}



export default HomeView;
