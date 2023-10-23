import React from 'react';
import {useNavigation} from '@react-navigation/native';
import NavigatorConstant from '../../../../navigation/NavigatorConstant';

import LoginUI from './LoginUI';

function Login() {
  const navigation = useNavigation();

  const showRecoveryPassword = () => {
    navigation.push(NavigatorConstant.LOGIN_STACK.PASSWORD_RECOVERY);
  };

  const showRegister = () => {
    navigation.push(NavigatorConstant.LOGIN_STACK.REGISTER);
  };

  const showLandingUser = () => {
    navigation.replace(NavigatorConstant.NAVIGATOR.LANDING_USER);
  };

  const showLoginInmoviliaria = () => {
    navigation.push(NavigatorConstant.LOGIN_STACK.LOGIN_INMOVILIARIA);
  };

  return (
    <LoginUI
      showRegister={showRegister}
      showRecoveryPassword={showRecoveryPassword}
      showLandingUser={showLandingUser}
      showLoginInmoviliaria={showLoginInmoviliaria}
    />
  );
}

export default Login;
