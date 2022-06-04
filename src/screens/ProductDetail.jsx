import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  Image,
  Dimensions,
} from 'react-native';
import React, { useState } from 'react';
import { CustomText, Header } from '../components';

const IMAGES = [
  {
    source:
      'https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png',
  },
  {
    source: 'https://i.imgur.com/UPrs1EWl.jpg',
  },
  {
    source: 'https://i.imgur.com/MABUbpDl.jpg',
  },
  {
    source: 'https://i.imgur.com/KZsmUi2l.jpg',
  },
  {
    source: 'https://picsum.photos/id/11/200/300',
  },
];

const height = Dimensions.get('window').height;

const ProductDetail = ({ navigation }) => {
  const [first, setFirst] = useState('');
  return (
    <SafeAreaView style={styles.container}>
      <Header navigation={navigation} showBackButton={true} />
      <ScrollView style={styles.scrollCtn}>
        <View style={styles.preview}>
          <ScrollView style={styles.listImages}>
            {IMAGES.map((item, index) => (
              <Image
                source={{ uri: item.source }}
                key={index}
                style={styles.imageItem}
              />
            ))}
          </ScrollView>
          <View style={styles.imageCtn}>
            <Image
              source={require('../../assets/product.jpg')}
              style={styles.image}
            />
          </View>
        </View>

        <View style={styles.content}>
          <CustomText text='Lightweight Jacket' style={styles.name} />
          <CustomText text={`${100000}đ`} style={styles.price} />
          <CustomText
            text={
              'Nulla eget sem vitae eros pharetra viverra. Nam vitae luctus ligula. Mauris consequat ornare feugiat.'
            }
            style={styles.description}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProductDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollCtn: {
    flex: 1,
    marginTop: 45,
  },
  listImages: {
    width: '20%',
    paddingVertical: 10,
    marginRight: 12,
  },
  imageItem: {
    width: '100%',
    height: 90,
    marginBottom: 15,
    alignSelf: 'center',
  },
  imageCtn: {
    width: '80%',
    alignItems: 'center',
  },
  image: {
    width: '90%',
    height: '100%',
  },
  preview: {
    height: height * 0.4,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingHorizontal: 12,
  },
  content: {
    paddingHorizontal: 15,
    paddingTop: 15,
  },
  name: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 30,
  },
  price: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 22,
    marginTop: 15,
    marginBottom: 20,
  },
  description: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 16,
  },
});
