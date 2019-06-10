
import React, { Component } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ImageBackground,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { fonts, colors } from '../../styles';
import { Text } from '../../components/StyledText';
import { Button} from '../../components';
import { Logs } from 'expo';
import { genericTypeAnnotation } from "@babel/types";


export default class HomeScreen extends Component {
  // const rnsUrl = 'https://reactnativestarter.com';
  // const handleClick = () => {
  //   Linking.canOpenURL(rnsUrl).then(supported => {
  //     if (supported) {
  //       Linking.openURL(rnsUrl);
  //     } else {
  //       console.log(`Don't know how to open URI: ${rnsUrl}`);
  //     }
  //   });
  // };
  constructor (props) {
    super(props);
    Logs.enableExpoCliLogging();
    this.addTip.bind(this);
    this.minusTip.bind(this);
    this.setupTip();
}


  state = {
    startingAmount: 20.00,
    totalTip: 0.00,
    tipPercentage: 0.15
  };

  setupTip(){
    this.state.startingAmount = this.state.startingAmount - (this.state.startingAmount * .10);
  }

  addTip(percent){
    var add = this.state.totalTip - (this.state.totalTip * this.state.tipPercentage);
    this.setState({ totalTip: add + this.state.totalTip })
    console.log(this.state.totalTip)
  };

  minusTip(){
    var minus = this.state.totalTip - (this.state.totalTip * this.state.tipPercentage);
    this.setState({ totalTip: this.state.totalTip - (minus * 0.30) })
    console.log(this.state.totalTip)
  };

  render () {
    return (
    <View style={styles.container}>
    <View style={{
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-around',
      paddingTop: 50,
    }}>
      <View style={{width: 120, height: 50, marginLeft: 30, marginTop: 175}}>
      <Button
            style={styles.demoButton}
            primary
            caption="Minus"
            onPress={() => {this.minusTip()}}
          />
      </View>
      <View style={{width: 400, height: 150,}}>
      <Text size={140} black style={{textAlign: "center"}}>
          ${this.state.totalTip.toFixed(2)}
            </Text>
      </View>
      <View style={{width: 120, height: 50, marginRight: 30, marginTop: 175}}> 
      <Button
            style={styles.demoButton}
            primary
            caption="Add"
            onPress={() => {this.addTip()}}
          />
      </View>
    </View>
    <View style={{
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      marginTop: 20,
      marginLeft: 30,
      marginRight: 30
    }}>
      <View style={{width: 120, height: 120, borderRadius: 20, padding: 10}}>
        <TouchableOpacity
          onPress={() => {this.addTip()}}
          style={{flex: 1, height: 120}}
        >
          <Image
            source={require('../../../assets/images/tipicons/laugh.png')}
            resizeMode="contain"
            style={{
              flex: 1,
              alignSelf: 'stretch',
              width: undefined,
              height: undefined
            }}
          />
        </TouchableOpacity>

      </View>
      <View style={{width: 120, height: 120, borderRadius: 20, padding: 10}}>
        <TouchableOpacity
          onPress={() => {this.addTip()}}
          style={{flex: 1, height: 120}}
        >
          <Image
            source={require('../../../assets/images/tipicons/runner.png')}
            resizeMode="contain"
            style={{
              flex: 1,
              alignSelf: 'stretch',
              width: undefined,
              height: undefined
            }}
          />
        </TouchableOpacity>

      </View>
      <View style={{width: 120, height: 120, borderRadius: 20, padding: 10}}>
        <TouchableOpacity
          onPress={() => {this.addTip()}}
          style={{flex: 1, height: 120}}
        >
          <Image
            source={require('../../../assets/images/tipicons/glass.png')}
            resizeMode="contain"
            style={{
              flex: 1,
              alignSelf: 'stretch',
              width: undefined,
              height: undefined
            }}
          />
        </TouchableOpacity>

      </View>
    </View>
    </View>
    
  );


}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#E8E8E8'
  },
  bgImage: {
    flex: 1,
    marginHorizontal: -20,
  },
  section: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionLarge: {
    flex: 2,
    justifyContent: 'space-around',
  },
  sectionHeader: {
    marginBottom: 8,
  },
  priceContainer: {
    alignItems: 'center',
  },
  description: {
    padding: 15,
    lineHeight: 25,
  },
  titleDescription: {
    color: '#19e7f7',
    textAlign: 'center',
    fontFamily: fonts.primaryRegular,
    fontSize: 15,
  },
  title: {
    marginTop: 30,
  },
  price: {
    marginBottom: 5,
  },
  priceLink: {
    borderBottomWidth: 1,
    borderBottomColor: colors.primary,
  },
  demoButton: {
    marginTop: 8,
    marginBottom: 8,
  },
});
