//TO DO
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import NavigatorConstant from '../../../../navigation/NavigatorConstant';
//import i18n from '../../../../assets/strings/I18n';

import PerfilUI from './PerfilUI';

function Perfil() {
  const navigation = useNavigation();

  return <PerfilUI />;
}

export default Perfil;