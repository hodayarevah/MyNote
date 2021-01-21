import React from 'react';
import Loading  from 'expo-app-loading';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import HomeView from './src/Screens/HomeView';
import CategoriesView from './src/Screens/CategoriesView'
import NotesView from './src/Screens/NotesView';
import NewNoteForm from './src/Screens/NewNoteForm';


export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      DocReady: false,
    };
  }

  async componentDidMount() {
    await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      ...Ionicons.font,
    });
    this.setState({ DocReady: true });
  }

  render() {
    if (!this.state.DocReady) {
      return <Loading />;
    }
    return (
      <NavigationContainer>
       <Drawer.Navigator  initialRouteName='Home'>
       <Drawer.Screen name="Home" component={HomeView}  />
       <Drawer.Screen name="Categories" component={CategoriesView} />
       <Drawer.Screen name="Notes" component={NotesView} />
       <Drawer.Screen name="NewNote" component={NewNoteForm} />
         </Drawer.Navigator >
      </NavigationContainer>
    );
  }
}

const Drawer = createDrawerNavigator();

