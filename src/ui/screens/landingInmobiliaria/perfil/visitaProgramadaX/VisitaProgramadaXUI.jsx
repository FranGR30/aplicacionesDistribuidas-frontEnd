import React from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
} from 'react-native';
import {useSelector} from 'react-redux';

import Theme from '../../../../../styles/Theme';
import i18n from '../../../../../assets/strings/I18n';
import IMAGES from '../../../../../assets/images/images';
import Button from '../../../../components/button';
import CardState from '../../../../components/cardState';

const VisitaProgramadaXUI = ({goBack, showPublicacionX}) => {
  const {name, avatarName} = useSelector(state => state.user);
  const {comment, date, visitShift} = useSelector(state => state.contact);
  const {
    street,
    neighborhood,
    state,
    price,
    currency,
    expenses,
    expenseCurrency,
    images,
    userEstateAvatar,
    userEstateName,
    userEstateTelephone1,
    userEstateTelephone2,
    userEstateEmail1,
    userEstateEmail2,
  } = useSelector(state => state.estate);

  const handleDate = date => {
    const dateAux = new Date(date);
    const day = dateAux.getDate().toString().padStart(2, '0');
    const month = (dateAux.getMonth() + 1).toString().padStart(2, '0');
    const year = dateAux.getFullYear();
    const formattedDate = `${day}-${month}-${year}`;
    return formattedDate;
  };

  const handleCurrency = x => {
    if (x === 'dolar') {
      return i18n.t('usd');
    }
    return i18n.t('ars');
  };

  const handleShift = x => {
    if (x === 'morning') {
      return i18n.t('shiftMorning');
    }
    return i18n.t('shiftAfternoon');
  };

  return (
    <ScrollView style={styles.generalContainer}>
      <View style={styles.container}>
        <View style={styles.containerRow}>
          <View style={styles.AvatarContainer}>
            {avatarName && (
              <Image source={{uri: avatarName}} style={styles.profilePhoto} />
            )}
          </View>
          <Text style={styles.textH1}>{name}</Text>
        </View>
        <Text style={styles.textH1}>{i18n.t('programmedView')}</Text>
        <View style={styles.box}>
          <View style={styles.row}>
            <Text style={styles.tittleBox}>{i18n.t('askViewFrom')}</Text>
          </View>
          <View style={styles.person}>
            <Image
              source={{uri: userEstateAvatar}}
              style={styles.questionsPhoto}
            />
            <Text style={styles.tittleBox}>{userEstateName}</Text>
          </View>
          <View style={styles.flexStart}>
            <Text style={styles.textBox}>
              {i18n.t('email') + ' ' + userEstateEmail1}
            </Text>
            {userEstateTelephone1 ? (
              <Text style={styles.textBox}>
                {i18n.t('phone') + ' ' + userEstateTelephone1}
              </Text>
            ) : null}
          </View>
          <CardState
            onPress={() => showPublicacionX()}
            size="M"
            image={{uri: images[0]}}
            tittle={street}
            ubication={neighborhood + ', ' + state}
            currency={handleCurrency(currency)}
            price={price}
            expenses={expenses}
          />
          <View style={styles.row}>
            <View style={styles.dateTurnBox}>
              <Text style={styles.textBox}>{i18n.t('date')}</Text>
              <TextInput
                editable={false}
                value={handleDate(date)}
                style={styles.message}
              />
            </View>
            <View style={styles.dateTurnBox}>
              <Text style={styles.textBox}>{i18n.t('turn')}</Text>
              <TextInput
                editable={false}
                value={handleShift(visitShift)}
                style={styles.message}
              />
            </View>
          </View>
          <View style={styles.messageFlexStart}>
            <Text style={styles.textBox}>{i18n.t('message')}</Text>
          </View>
          <TextInput
            multiline
            editable={false}
            numberOfLines={7}
            maxLength={300}
            value={comment}
            style={styles.message}
          />
        </View>
        <Button
          onPress={() => goBack()}
          text={i18n.t('goBack')}
          color={'secondary'}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  generalContainer: {
    backgroundColor: Theme.colors.SECONDARY,
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerRow: {
    width: 360,
    margin: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  row: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  flexStart: {
    marginTop: 10,
    marginBottom: 16,
    width: '100%',
    justifyContent: 'flex-start',
  },
  box: {
    width: '95%',
    backgroundColor: Theme.colors.WHITE,
    margin: 16,
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  person: {
    width: '100%',
    height: 68,
    backgroundColor: Theme.colors.WHITE,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  littleBox: {
    marginTop: 20,
    justifyContent: 'flex-start',
  },
  tittleBox: {
    color: Theme.colors.SECONDARY,
    fontSize: Theme.fonts.M,
    fontWeight: Theme.fonts.BOLD,
    marginBottom: 10,
  },
  textBox: {
    color: Theme.colors.SECONDARY,
    fontSize: Theme.fonts.SM,
    fontWeight: Theme.fonts.BOLD,
    marginBottom: 10,
  },
  text: {
    color: Theme.colors.WHITE,
  },
  date: {
    color: Theme.colors.PLACEHOLDER,
    fontSize: Theme.fonts.S,
  },
  textH1: {
    marginBottom: 3,
    color: Theme.colors.WHITE,
    fontSize: Theme.fonts.M,
    fontWeight: Theme.fonts.BOLD,
  },
  AvatarContainer: {
    width: 77,
    height: 77,
    marginRight: 26,
  },
  profilePhoto: {
    width: 77,
    height: 77,
    borderRadius: 45,
  },
  questionsPhoto: {
    width: 47,
    height: 47,
    marginRight: 12,
    borderWidth: 1,
    borderRadius: 45,
    borderColor: Theme.colors.SECONDARY,
  },
  dateTurnBox: {
    marginTop: 20,
    width: '40%',
    justifyContent: 'flex-start',
  },
  messageFlexStart: {
    marginTop: 20,
    width: '100%',
    justifyContent: 'flex-start',
  },
  message: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: Theme.colors.PLACEHOLDER,
    color: Theme.colors.BLACK,
  },
});

export default VisitaProgramadaXUI;
