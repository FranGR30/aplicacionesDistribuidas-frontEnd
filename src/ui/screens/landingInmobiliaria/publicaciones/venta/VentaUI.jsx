import React, {useState, useCallback} from 'react';
import {
  ScrollView,
  View,
  StatusBar,
  StyleSheet,
  Text,
  ToastAndroid,
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';

import {saveEstateAction} from '../../../../../redux/slices/EstateReducer';
import {estatesWS} from '../../../../../networking/api/endpoints/EstatesEndpoints';
import Theme from '../../../../../styles/Theme';
import i18n from '../../../../../assets/strings/I18n';
import CardState from '../../../../components/cardState';
import IMAGES from '../../../../../assets/images/images';

const MapEstates = ({x, show}) => (
  <>
    {x
      .filter(estateItem => estateItem.rentOrSale === 'venta')
      .map(estateItem => (
        <CardState
          key={estateItem._id}
          onPress={() => show(estateItem)}
          size="S"
          image={{uri: estateItem.images[0]}}
          ubication={handleUbication(estateItem.neighborhood)}
          amb={estateItem.roomsAmount}
          m2={
            estateItem.coveredSquareMeters +
            estateItem.semiUncoveredSquaremeters +
            estateItem.uncoveredSquareMeters
          }
          rentOrSale={estateItem.rentOrSale}
          status={estateItem.status}
          price={estateItem.price}
          currency={
            estateItem.currency === 'peso' ? i18n.t('ars') : i18n.t('usd')
          }
        />
      ))}
  </>
);

const handleUbication = ubicationString => {
  if (ubicationString.length > 10) {
    return ubicationString.slice(0, 10) + '...';
  }
  return ubicationString;
};

const VentaUI = ({showPublicacionX}) => {
  const [estates, setEstates] = useState();
  const id = useSelector(state => state.user.id);
  const dispatch = useDispatch();

  useFocusEffect(
    useCallback(() => {
      estatesWS
        .getEstatesByUserId(id)
        .then(response => {
          // Get exitoso
          //console.log(response.data.estates);
          setEstates(response.data.estates);
        })
        .catch(error => {
          if (error.response) {
            // Handle error
            console.error(
              'Server responded with an error status:',
              error.response.status,
            );
            console.error('Response data:', error.response.data);
          } else if (error.request) {
            // Handle error
            console.error('No response received:', error.request);
            showToastWithGravityAndOffset();
          } else {
            // Handle error
            console.error('Error setting up the request:', error.message);
          }
        });
    }, [id]),
  );

  const handleCardStateClick = estateItem => {
    console.log('--------____________------------');
    console.log(estateItem);
    console.log('--------____________------------');
    dispatch(saveEstateAction(estateItem));
    showPublicacionX();
  };

  const showToastWithGravityAndOffset = () => {
    ToastAndroid.showWithGravityAndOffset(
      i18n.t('errors.connection'),
      ToastAndroid.LONG,
      ToastAndroid.CENTER,
      0,
      0,
    );
  };

  return (
    <ScrollView style={styles.generalContainer}>
      <View style={styles.container}>
        <StatusBar
          animated={true}
          barStyle={'light-content'}
          showHideTransition={'fade'}
          hidden={false}
        />
        {estates && estates.some(item => item.rentOrSale === 'venta') ? (
          <MapEstates x={estates} show={handleCardStateClick} />
        ) : (
          <View style={styles.containerNoImage}>
            <IMAGES.SVG.LOGO_PLACEHOLDER width={380} height={230} />
            <Text style={styles.textNoImage}>
              {i18n.t('noStatesFound_createStart') +
                i18n.t('noStatesFound_sale') +
                i18n.t('noStatesFound_createEnd')}
            </Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  generalContainer: {
    backgroundColor: Theme.colors.WHITE,
  },
  container: {
    marginTop: 16,
    marginLeft: 16,
    marginRight: 16,
    rowGap: 16,
    width: '92%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  containerNoImage: {
    marginTop: 16,
    alignItems: 'center',
    width: '95%',
  },
  textNoImage: {
    margin: 12,
    color: Theme.colors.DISABLED,
    fontSize: Theme.fonts.L,
    fontWeight: Theme.fonts.BOLD,
  },
});

export default VentaUI;
