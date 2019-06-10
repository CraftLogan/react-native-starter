import React from 'react';
import {
  StyleSheet,
  View,
  Platform,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  Dimensions,
  ScrollView
} from 'react-native';
import { Logs } from 'expo';

import { colors, fonts } from '../../styles';
import { Button, TextInput } from '../../components';

import {closePlace} from '../../api/api'


const chartIcon = require('../../../assets/images/pages/chart.png');

export default class GridsScreen extends React.Component {

  constructor(props){
    super(props)
    Logs.enableExpoCliLogging();
    this.findCoordinates()
  }
  state = {
    location: null,
    places: null,
    selected_place: null
  };

  findCoordinates = () => {
    navigator.geolocation.getCurrentPosition(
      position => {
        const location = JSON.stringify(position);
        this.setState({ location });
        console.log(location);
        this.getPlacesNearMe();
      },
      error => console.log(error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  };

  getPlacesNearMe = () => {
    closePlace('36.35403213560242', '-82.2263517604044').then((res) =>{
      this.setState({places: res.response.venues})
    })
  }

  selectItem = data => {
      this.setState({selected_place: data.id})
  };

  _getRenderItemFunction = () =>
  
  this.renderRowZero

_openArticle = article => {
  this.props.navigation.navigate({
    routeName: 'Article',
    params: { ...article },
  });
};
  renderRowZero = ({ item }) => (
    <TouchableOpacity
    key={item.id}
    style={styles.itemThreeContainer}
    onPress={() => this.selectItem(item)}
  >
    <View style={styles.itemThreeSubContainer}>
      <Image source={{ uri: item.categories[0].icon.prefix + 'bg_64.png' }} style={styles.itemThreeImage} />
      <View style={styles.itemThreeContent}>
        <Text style={styles.itemThreeBrand}>{item.categories[0].name}</Text>
        <View>
          <Text style={(this.state.selected_place==item.id) ? styles.itemThreeTitleSelected : styles.itemThreeTitle}>{item.name}</Text>
          <Text style={styles.itemThreeSubtitle} numberOfLines={1}>
            {item.location.city}, {item.location.state}
          </Text>
        </View>
        <View style={styles.itemThreeMetaContainer}>
      
        </View>
      </View>
    </View>
    <View style={styles.itemThreeHr} />
  </TouchableOpacity>
  );
  render() {
  return (
    <ScrollView style={styles.container}>
        <View style={styles.componentsSection}>
        <Text style={styles.componentSectionHeader}>Current Resturant</Text>
        <FlatList
          keyExtractor={item => item.id}
          style={{ backgroundColor: colors.white, paddingHorizontal: 15 }}
          data={this.state.places}
          renderItem={this._getRenderItemFunction()}
          extraData={this.state}
        />
      </View>
       <View style={styles.componentsSection}>
        <Text style={styles.componentSectionHeader}>Estimated Bill</Text>
        <TextInput
            placeholder="$20.00"
            keyboardType={'numeric'}
            returnKeyType='done'
        />
        

      </View>

      
       <View style={styles.componentsSection}>
        <Text style={styles.componentSectionHeader}>Tip Style</Text>
      
        <Button
            style={styles.demoButton}
            primary
            bordered
            rounded
            caption="Good 15%"
            onPress={() => {props.navigation.navigate('Home')}}
          />

        <Button
            style={styles.demoButton}
            primary
            bordered
            rounded
            caption="Great %18"
            onPress={() => {props.navigation.navigate('Home')}}
          />

        <Button
            style={styles.demoButton}
            primary
            bordered
            rounded
            caption="The Best %20"
            onPress={() => {props.navigation.navigate('Home')}}
          />

      </View>


    </ScrollView>
  );
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bluish,
    paddingTop: 10,
  },
  row: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    marginTop: 10,
  },
  item: {
    flex: 1,
    height: 120,
    paddingVertical: 20,
    borderColor: colors.primaryLight,
    borderWidth: 1,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'space-around',
    marginHorizontal: 5,
  },
  itemText: {
    color: colors.primary,
    fontFamily: fonts.primary,
  },
  itemImage: {
    height: 35,
  },
  componentsSection: {
    backgroundColor: colors.white,
    padding: 15,
    marginBottom: 20,
    borderRadius: 5,
  },
  componentSectionHeader: {
    fontFamily: fonts.primaryRegular,
    color: '#686868',
    fontSize: 20,
    marginBottom: 20,
  },

  demoButton: {
    marginTop: 8,
    marginBottom: 8,
  },

  itemThreeContainer: {
    backgroundColor: 'white',
  },

  itemThreeSubContainer: {
    flexDirection: 'row',
    paddingVertical: 10,
  },

  itemThreeImage: {
    height: 75,
    width: 75,
  },
  itemThreeContent: {
    flex: 1,
    paddingLeft: 15,
    justifyContent: 'space-between',
  },
  itemThreeBrand: {
    fontFamily: fonts.primaryRegular,
    fontSize: 14,
    color: '#617ae1',
  },
  itemThreeTitle: {
    fontFamily: fonts.primaryBold,
    fontSize: 20,
    color: '#5F5F5F',
    paddingVertical: 5,
  },
  itemThreeTitleSelected: {
    fontFamily: fonts.primaryBold,
    fontSize: 20,
    color: colors.primary,
    paddingVertical: 5,
  },
  itemThreeSubtitle: {
    fontFamily: fonts.primaryRegular,
    fontSize: 12,
    color: '#a4a4a4',
  },
  itemThreeMetaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemThreePrice: {
    fontFamily: fonts.primaryRegular,
    fontSize: 15,
    color: '#5f5f5f',
    textAlign: 'right',
  },
  itemThreeHr: {
    flex: 1,
    height: 1,
    backgroundColor: '#e3e3e3',
    marginRight: -15,
  },
  badge: {
    backgroundColor: colors.secondary,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
});
