import { Feather, Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import Cart from './Cart';

const Header = ({ navigation, showBackButton = false }) => (
  <View style={styles.containerHeader}>
    {showBackButton ? (
      <View style={{ width: '20%' }}>
        <Ionicons
          name='chevron-back-circle-outline'
          size={28}
          color='black'
          onPress={navigation.goBack}
        />
      </View>
    ) : (
      <></>
    )}
    <Image source={require('../../assets/logo-01.png')} resizeMode='contain' />

    <View style={styles.listIcons}>
      <Cart navigation={navigation} />
      <Feather name='heart' size={24} color='black' />
    </View>
  </View>
);

const styles = StyleSheet.create({
  containerHeader: {
    display: 'flex',
    width: '100%',
    height: 85,
    paddingHorizontal: 15,
    paddingTop: 45,
    flexDirection: 'row',
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    zIndex: 100,
  },
  listIcons: {
    width: '20%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});

export default Header;
