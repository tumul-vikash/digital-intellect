/* react imports */
import React, { Component } from 'react';

/* other dependency imports */
import {
  Actions, 
  Router, 
  Scene, 
  Stack, 
  Drawer
} from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/Ionicons';

/* container imports */
import SplashScreen from './src/containers/SplashScreen';
import Login from './src/containers/Login';
import Home from './src/containers/Home';
import LiveCourses from './src/containers/LiveCourses';
import OnlineCourses from './src/containers/OnlineCourses';
import Profile from './src/containers/Profile';

/* utils imports */
import NavBar from './src/utils/Navbar';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <Router
        navigationBarStyle={{
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 0,
          backgroundColor: 'teal',
          height: 50,
        }}
        titleStyle={{
          color: '#fff',
          fontSize: 30,
          fontFamily: 'Poppins-Regular'
        }}
      >
        <Stack
          key="root"
          navBar={() => <NavBar />}
        >
          <Scene key="splash" component={SplashScreen} headerShown={false} />
          <Scene
            key="tabScreen"
            tabs={true}
            activeTintColor="teal"
            inactiveTintColor="gray"
            labelStyle={{
              fontSize: 13,
              fontWeight: 'bold',
              fontFamily: 'Poppins-Regular'
            }}
          >
            <Scene 
              key="home"
              title="Home"  
              component={Home} 
              headerShown={false} 
              icon={() => <Icon name="home" size={27} color="#EE5E1B" />}
              initial 
            />
            <Scene  
              key="live"
              title="Live Courses" 
              component={LiveCourses} 
              headerShown={false}
              icon={() => <Icon name="laptop" size={27} color="#EE5E1B" />} 
            />
            <Scene  
              key="online"
              title="Online Courses" 
              component={OnlineCourses} 
              headerShown={false}
              icon={() => <Icon name="library" size={27} color="#EE5E1B" />}
            />
            <Scene  
              key="profile"
              title="Profile" 
              component={Profile} 
              headerShown={false}
              icon={() => <Icon name="md-person-circle-outline" size={27} color="#EE5E1B" />}
            />
          </Scene>
        </Stack>
      </Router>
    );
  }
}
