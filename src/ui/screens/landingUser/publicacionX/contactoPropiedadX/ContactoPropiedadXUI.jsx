import React, {useRef, useState} from 'react';
import {ScrollView, View, Text, StatusBar, StyleSheet, ToastAndroid} from 'react-native';
import {useSelector} from 'react-redux';
import DropDownPicker from 'react-native-dropdown-picker';
import DatePicker from 'react-native-date-picker';

import Theme from '../../../../../styles/Theme';
import IMAGES from '../../../../../assets/images/images';
import i18n from '../../../../../assets/strings/I18n';

import Button from '../../../../components/button';
import InputText from '../../../../components/inputText';
import CardState from '../../../../components/cardState';
import {contactWS} from '../../../../../networking/api/endpoints/ContactEndpoints';

const ContactoPropiedadXUI = ({goBack}) => {
  const {
    id,
    description,
    street,
    neighborhood,
    state,
    coveredSquareMeters,
    semiUncoveredSquaremeters,
    uncoveredSquareMeters,
    roomsAmount,
    bathroomsAmount,
    bedroomsAmount,
    price,
    currency,
    expenses,
    expenseCurrency,
    images,
    realEstate,
  } = useSelector(state => state.estate);
  const [comment, setMessage] = useState();
  const [openConsulta, setOpenConsulta] = useState(false);
  const [type, setConsulta] = useState('question');
  const [itemsConsulta, setItemsConsulta] = useState([
    {label: 'Consulta', value: 'question'},
    {label: 'Visita programada', value: 'visit'},
  ]);
  const [date, setDate] = useState(new Date());
  const [openDate, setOpenDate] = useState(false);
  const [openTurno, setOpenTurno] = useState(false);
  const [turno, setTurno] = useState('morning');
  const [itemsTurno, setItemsTurno] = useState([
    {label: 'Mañana', value: 'morning'},
    {label: 'Tarde', value: 'afternoon'},
  ]);

  const handleMessage = value => {
    setMessage(value);
  };

  const [error, setError] = useState(false);
  const inputRefErrorValue = useRef();

  const [errorDate, setErrorDate] = useState(false);
  const inputRefErrorDateValue = useRef();

  const handleFocus = ref => {
    if (ref.current) {
      ref.current.focus();
    }
  };

  const handleSend = () => {

    if (!comment || comment == "") {
      setError('Debe ingresar un mensaje.');
      handleFocus(inputRefErrorValue);
      return false;
    } else {
      setError(false);
    }

    if (type === 'question') {
      contactWS
        .createContact(realEstate, id, type, comment)
        .then(response => {
          // Post exitoso
          console.log(response.data);
          goBack();
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
    } else {
      console.log(date);
      contactWS
        .createContact(realEstate, id, type, comment, date, turno)
        .then(response => {
          // Post exitoso
          console.log(response.data);
          goBack();
        })
        .catch(error => {
          if (error.response) {
            // Handle error
            console.error(
              'Server responded with an error status:',
              error.response.status,
            );
            console.error('Response data:', error.response.data);

            if (error.response.data.mensaje == 'Invalid date') {
              setErrorDate('La fecha ingresada debe ser mayor a la actual.');
            } else if (error.response.data.mensaje == 'Visit already booked for the selected day and shift') {
              setErrorDate('Ya existe una visita para la fecha y turno seleccionados.');
            }

          } else if (error.request) {
            // Handle error
            console.error('No response received:', error.request);
            showToastWithGravityAndOffset();
          } else {
            // Handle error
            console.error('Error setting up the request:', error.message);
          }
        });
    }
  };

  const handleUbication = ubication => {
    if (ubication.length > 40) {
      return ubication.slice(0, 40) + '...';
    }
    return ubication;
  };

  const handleDescription = desc => {
    if (desc.length > 50) {
      return desc.slice(0, 50) + '...';
    }
    return desc;
  };

  const prettifyCurrency = () => {
    if (currency === 'peso') {
      return 'ARS';
    } else {
      return 'USD';
    }
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
        <CardState
          size="L"
          image={{uri: images[0]}}
          tittle={street}
          ubication={handleUbication(neighborhood + ', ' + state)}
          currency={prettifyCurrency()}
          amb={roomsAmount}
          dorm={bedroomsAmount}
          bath={bathroomsAmount}
          m2={
            coveredSquareMeters +
            semiUncoveredSquaremeters +
            uncoveredSquareMeters
          }
          description={handleDescription(description)}
          price={price}
          expenses={expenses}
          expenseCurrency={expenseCurrency}
        />
        <View style={styles.container2}>
          <Text style={styles.textH3}>{i18n.t('question_type')}</Text>
          <DropDownPicker
            open={openConsulta}
            value={type}
            items={itemsConsulta}
            setOpen={setOpenConsulta}
            setValue={setConsulta}
            setItems={setItemsConsulta}
            onChangeValue={() => setError(false)}
          />
          {type === 'visit' ? (
            <>
              <Text style={styles.textH3}>{i18n.t('date')}</Text>
              <View style={styles.containerColumn}>
                <Button
                  text={i18n.t('select')}
                  color={'primaryInverted'}
                  onPress={() => setOpenDate(true)}
                />
                <DropDownPicker
                  open={openTurno}
                  value={turno}
                  items={itemsTurno}
                  setOpen={setOpenTurno}
                  setValue={setTurno}
                  setItems={setItemsTurno}
                  containerStyle={{
                    width: '40%',
                  }}
                />
              </View>
              {errorDate ?
                <Text style={{color: 'red', marginTop: 10, marginLeft: 10}}>{errorDate}</Text>
              : null}
            </>
          ) : null}
          <DatePicker
            modal
            minimumDate={new Date()}
            open={openDate}
            mode="date"
            date={date}
            minuteInterval={30}
            onConfirm={date => {
              setOpenDate(false);
              setDate(date);
            }}
            onCancel={() => {
              setOpenDate(false);
            }}
          />
          <Text style={styles.textH3}>{i18n.t('message')}</Text>
          <InputText
            placeholder={i18n.t('placeholder_message')}
            changeValue={handleMessage}
            borderWidth={1}
            borderRadius={8}
            height={120}
            error={error}
            innerRef={inputRefErrorValue}
          />
        </View>
        <Button text={i18n.t('send')} onPress={() => handleSend()} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  generalContainer: {
    backgroundColor: Theme.colors.WHITE,
  },
  container: {
    padding: 12,
    width: '100%',
    alignItems: 'center',
  },
  container2: {
    width: '100%',
    alignItems: 'flex-start',
  },
  containerColumn: {
    marginTop: 24,
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  textH3: {
    color: Theme.colors.SECONDARY,
    fontSize: Theme.fonts.SM,
    fontWeight: Theme.fonts.BOLD,
    marginTop: 32,
    marginBottom: 16,
    marginRight: 16,
  },
  text: {
    color: Theme.colors.BLACK,
  },
  textButton: {
    color: Theme.colors.WHITE,
  },
});

export default ContactoPropiedadXUI;
