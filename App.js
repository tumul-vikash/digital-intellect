/* eslint-disable react-native/no-inline-styles */
/* react imports */
import React, {Component} from 'react';

/* other dependency imports */
import {Actions, Router, Scene, Stack, Drawer} from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/Ionicons';
import {Provider} from 'mobx-react';

/* container imports */
import SplashScreen from './src/containers/SplashScreen';
import Search from './src/containers/Search';
import Login from './src/containers/Login';
import Register from './src/containers/Register';
import Home from './src/containers/Home';
import LiveCourses from './src/containers/LiveCourses';
import MeetingRoom from './src/containers/MeetingRoom';
import LiveCourseDescription from './src/containers/LiveCourseDescription';
import OnlineCourses from './src/containers/OnlineCourses';
import Profile from './src/containers/Profile';
import EditProfile from './src/containers/EditProfile';
import AddTeacher from './src/containers/AddTeacher';

/* utils imports */
import Navbar from './src/utils/Navbar';
import Navbar2 from './src/utils/Navbar2';
import ArrowNav from './src/utils/ArrowNav';

/* Mobx imports */
import homeStore from './src/stores/homeStore';
import utilityStore from './src/stores/utilityStore';
import authStore from './src/stores/authStore';
import store from './src/stores/store';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Provider
        homeStore={homeStore}
        utilityStore={utilityStore}
        authStore={authStore}
        store={store}>
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
            fontFamily: 'Poppins-Regular',
          }}>
          <Stack key="root">
            <Scene
              key="splash"
              component={SplashScreen}
              animationEnabled={false}
              headerShown={false}
              initial
            />
            <Scene key="login" component={Login} navBar={() => <Navbar2 />} />
            <Scene
              key="register"
              component={Register}
              navBar={() => <Navbar2 />}
            />
            <Scene
              key="search"
              navBar={() => <ArrowNav />}
              component={Search}
              animationEnabled={false}
            />
            <Scene
              key="edit"
              navBar={() => <ArrowNav />}
              component={EditProfile}
              animationEnabled={false}
            />
            <Scene
              key="addTeacher"
              navBar={() => <ArrowNav />}
              component={AddTeacher}
              animationEnabled={false}
            />
            <Scene
              key="lcDescription"
              navBar={() => <ArrowNav />}
              component={LiveCourseDescription}
              animationEnabled={false}
            />
            <Scene
              key="meetingRoom"
              navBar={() => <ArrowNav />}
              component={MeetingRoom}
              animationEnabled={false}
            />
            <Scene
              key="tabScreen"
              navBar={() => <Navbar />}
              tabs={true}
              activeTintColor="teal"
              inactiveTintColor="gray"
              labelStyle={{
                fontSize: 13,
                fontWeight: 'bold',
                fontFamily: 'Poppins-Regular',
              }}>
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
              {/* <Scene
                key="online"
                title="Online Courses"
                component={OnlineCourses}
                headerShown={false}
                icon={() => <Icon name="library" size={27} color="#EE5E1B" />}
              /> */}
              <Scene
                key="profile"
                title="Profile"
                component={Profile}
                headerShown={false}
                icon={() => (
                  <Icon
                    name="md-person-circle-outline"
                    size={27}
                    color="#EE5E1B"
                  />
                )}
              />
            </Scene>
          </Stack>
        </Router>
      </Provider>
    );
  }
}
