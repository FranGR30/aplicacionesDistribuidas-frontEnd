import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  View,
  Text,
  Pressable,
  StyleSheet,
  Image,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';

import Theme from '../../../../../styles/Theme';
import i18n from '../../../../../assets/strings/I18n';
import IMAGES from '../../../../../assets/images/images';
import Button from '../../../../components/button';
import {contactWS} from '../../../../../networking/api/endpoints/ContactEndpoints';
import {saveContactAction} from '../../../../../redux/slices/ContactReducer';

const ConsultasUI = ({goBack, showConsultaX}) => {
  const dispatch = useDispatch();
  const {name, avatarName} = useSelector(state => state.user);
  const [contacts, setContacts] = useState();
  const [contactsLen, setContactsLen] = useState();

  useEffect(() => {
    contactWS
      .getContacts()
      .then(response => {
        // Get exitoso
        console.log(response.data.contacts);
        let contactsFilter = response.data.contacts.filter(
          contactItem => contactItem.type === 'question',
        );
        setContacts(contactsFilter);
        setContactsLen(contactsFilter.length);
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
        } else {
          // Handle error
          console.error('Error setting up the request:', error.message);
        }
      });
  }, []);

  const handleContactClick = contactItem => {
    console.log('--------____________------------');
    console.log(contactItem);
    console.log('--------____________------------');
    dispatch(saveContactAction(contactItem));
    showConsultaX();
  };

  const handleDate = date => {
    const dateAux = new Date(date);
    const day = dateAux.getDate().toString().padStart(2, '0');
    const month = (dateAux.getMonth() + 1).toString().padStart(2, '0');
    const year = dateAux.getFullYear();
    const formattedDate = `${day}-${month}-${year}`;
    return formattedDate;
  };

  const MapContacts = ({x, show}) => (
    <>
      {x.map(contactItem => (
        <Pressable onPress={() => show(contactItem)} style={styles.button}>
          <Image source={{uri: avatarName}} style={styles.questionsPhoto} />
          <View>
            <Text style={styles.textButton}>{name}</Text>
            <Text style={styles.textDescription}>
              {handleDate(contactItem.date)}
            </Text>
          </View>
        </Pressable>
      ))}
    </>
  );

  return (
    <View style={styles.generalContainer}>
      <View style={styles.containerRow}>
        <View style={styles.AvatarContainer}>
          {avatarName && (
            <Image source={{uri: avatarName}} style={styles.profilePhoto} />
          )}
        </View>
        <View>
          <Text style={styles.textH1}>{name}</Text>
          {contacts ? (
            <Text style={styles.text}>
              {contactsLen + ' ' + i18n.t('questions')}
            </Text>
          ) : null}
        </View>
      </View>
      <Text style={styles.textH1}>{i18n.t('questions')}</Text>
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.container}>
          {contacts && contacts.some(item => item.type === 'question') ? (
            <MapContacts x={contacts} show={handleContactClick} />
          ) : (
            <>
              <Text style={styles.textNoQuestions}>
                {i18n.t('noQuestionsFound_start_realEstate')}
              </Text>
              <Text style={styles.text2NoQuestions}>
                {i18n.t('noQuestionsFound_end_realEstate')}
              </Text>
            </>
          )}
        </View>
      </ScrollView>
      <Button
        onPress={() => goBack()}
        text={i18n.t('goBack')}
        color={'secondary'}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  generalContainer: {
    backgroundColor: Theme.colors.SECONDARY,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
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
  scrollContainer: {
    height: 480,
    width: '90%',
  },
  button: {
    width: '96%',
    height: 68,
    marginTop: 16,
    backgroundColor: Theme.colors.WHITE,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  textButton: {
    color: Theme.colors.BLACK,
    fontSize: Theme.fonts.M,
    fontWeight: Theme.fonts.BOLD,
    marginTop: 5,
    marginBottom: 5,
  },
  textDescription: {
    color: Theme.colors.PLACEHOLDER,
    fontSize: Theme.fonts.SM,
  },
  textH1: {
    marginBottom: 3,
    color: Theme.colors.WHITE,
    fontSize: Theme.fonts.M,
    fontWeight: Theme.fonts.BOLD,
  },
  text: {
    color: Theme.colors.WHITE,
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
    margin: 12,
    borderWidth: 1,
    borderRadius: 45,
    borderColor: Theme.colors.SECONDARY,
  },
  textNoQuestions: {
    alignSelf: 'center',
    marginTop: 106,
    marginBottom: 8,
    color: Theme.colors.WHITE,
    fontSize: Theme.fonts.M,
    fontWeight: Theme.fonts.BOLD,
  },
  text2NoQuestions: {
    alignSelf: 'center',
    color: Theme.colors.WHITE,
    fontSize: Theme.fonts.SM,
    fontWeight: Theme.fonts.SEMIBOLD,
  },
});

export default ConsultasUI;
