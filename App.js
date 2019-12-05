/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Animated,
  TouchableOpacity,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const AnimatedIcon = Animated.createAnimatedComponent(Icon);

class App extends React.Component {
  state = {
    hide: 0,
    last: 0,
    first: true,
  };

  left = new Animated.Value(0);
  buttonTop = new Animated.Value(0);
  opacitySelected = new Animated.Value(0);

  opacitys = {
    0: new Animated.Value(0),
    1: new Animated.Value(0),
    2: new Animated.Value(0),
    3: new Animated.Value(0),
    4: new Animated.Value(0),
  };

  leftInterpolate = this.left.interpolate({
    inputRange: [0, 1, 2, 3, 4],
    outputRange: ['2.5%', '22.5%', '42.5%', '62.5%', '82.5%'],
  });

  buttonTopInterpolate = this.buttonTop.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 60],
  });

  select(v) {
    Animated.timing(this.opacitys[this.state.last], {
      toValue: 0,
      duration: 0,
    }).start(() =>
      Animated.timing(this.opacitySelected, {
        toValue: 0,
        duration: 0,
      }).start(() =>
        this.setState({hide: v, last: this.state.hide, first: false}, () => {
          Animated.timing(this.left, {
            toValue: v,
            duration: 500,
          }).start();
          Animated.timing(this.opacitySelected, {
            toValue: 0,
            duration: 500,
          }).start(() =>
            Animated.timing(this.opacitySelected, {
              toValue: 1,
              duration: 500,
            }).start(),
          );
          Animated.timing(this.opacitys[this.state.last], {
            toValue: 0,
            duration: 500,
          }).start(() =>
            Animated.timing(this.opacitys[this.state.last], {
              toValue: 1,
              duration: 500,
            }).start(),
          );
          Animated.timing(this.buttonTop, {
            toValue: 1,
            duration: 250,
          }).start(() =>
            Animated.timing(this.buttonTop, {
              toValue: 0,
              duration: 250,
            }).start(),
          );
        }),
      ),
    );
  }
  icon = null;
  render() {
    if (this.state.hide == 0) {
      this.icon = 'apps';
    } else if (this.state.hide == 1) {
      this.icon = 'comment-outline';
    } else if (this.state.hide == 2) {
      this.icon = 'arrow-collapse';
    } else if (this.state.hide == 3) {
      this.icon = 'animation-outline';
    } else {
      this.icon = 'account';
    }
    return (
      <View style={styles.cover}>
        <View style={styles.cover2}>
          <View style={styles.cover3}>
            <Animated.View
              style={[styles.circle1, {left: this.leftInterpolate}]}>
              <View style={[styles.circle3]}></View>
              <View style={[styles.circle2]}></View>
              <View style={[styles.circle5]}></View>
              <View style={[styles.circle4]}></View>
              <Animated.View
                style={[styles.button, {top: this.buttonTopInterpolate}]}>
                <AnimatedIcon
                  name={this.icon}
                  style={{opacity: this.state.first ? 1 : this.opacitySelected}}
                  size={20}
                  color="black"
                />
              </Animated.View>
            </Animated.View>
            <TouchableOpacity
              onPress={() => this.select(0)}
              style={styles.icon}>
              {this.state.hide != 0 && (
                <AnimatedIcon
                  style={{
                    opacity: this.state.first
                      ? 1
                      : this.state.last == 0
                      ? this.opacitys[0]
                      : 1,
                  }}
                  name="apps"
                  size={20}
                  color="gray"
                />
              )}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.select(1)}
              style={styles.icon}>
              {this.state.hide != 1 && (
                <AnimatedIcon
                  style={{
                    opacity: this.state.last == 1 ? this.opacitys[1] : 1,
                  }}
                  name="comment-outline"
                  size={20}
                  color="gray"
                />
              )}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.select(2)}
              style={styles.icon}>
              {this.state.hide != 2 && (
                <AnimatedIcon
                  style={{
                    opacity: this.state.last == 2 ? this.opacitys[2] : 1,
                  }}
                  name="arrow-collapse"
                  size={20}
                  color="gray"
                />
              )}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.select(3)}
              style={styles.icon}>
              {this.state.hide != 3 && (
                <AnimatedIcon
                  style={{
                    opacity: this.state.last == 3 ? this.opacitys[3] : 1,
                  }}
                  name="animation-outline"
                  size={20}
                  color="gray"
                />
              )}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.select(4)}
              style={styles.icon}>
              {this.state.hide != 4 && (
                <AnimatedIcon
                  style={{
                    opacity: this.state.last == 4 ? this.opacitys[4] : 1,
                  }}
                  name="account"
                  size={20}
                  color="gray"
                />
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  cover: {
    backgroundColor: 'red',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: '20%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
    elevation: 2,
  },
  cover2: {
    position: 'absolute',
    bottom: 0,
    height: 400,
    backgroundColor: 'transparent',
    width: '100%',
    justifyContent: 'flex-end',
  },
  cover3: {
    position: 'relative',
    bottom: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    height: 55,
    backgroundColor: 'white',
    width: '100%',
    elevation: 5,
  },
  button: {
    width: 48,
    height: 48,
    backgroundColor: 'white',
    borderRadius: 48,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
    elevation: 2,
  },
  circle1: {
    backgroundColor: 'red',
    height: 60,
    width: 60,
    borderRadius: 60,
    position: 'absolute',
    top: -8,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 3,
    elevation: 3,
  },
  circle2: {
    backgroundColor: 'white',
    height: 41,
    width: 40,
    borderRadius: 70,
    alignSelf: 'center',
    position: 'absolute',
    right: -39.5,
    transform: [{skewY: '60deg'}, {rotate: '-45deg'}],
    top: 9,
    zIndex: 2,
  },
  circle3: {
    backgroundColor: 'red',
    height: 50,
    width: 50,
    borderRadius: 50,
    alignSelf: 'center',
    position: 'absolute',
    right: -25,
    top: -15,
    zIndex: 2,
  },
  circle4: {
    backgroundColor: 'white',
    height: 41,
    width: 40,
    borderRadius: 70,
    alignSelf: 'center',
    position: 'absolute',
    left: -39.5,
    transform: [{skewY: '-60deg'}, {rotate: '45deg'}],
    top: 9,
    zIndex: 2,
  },
  circle5: {
    backgroundColor: 'red',
    height: 50,
    width: 50,
    borderRadius: 50,
    alignSelf: 'center',
    position: 'absolute',
    left: -25,
    top: -15,
    zIndex: 2,
  },
});

export default App;
