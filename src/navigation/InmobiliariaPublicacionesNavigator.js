import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Publicaciones from '../ui/screens/landingInmobiliaria/publicaciones/Publicaciones';
import PublicacionX from '../ui/screens/landingInmobiliaria/publicacionX/PublicacionX';
import EditarPublicacionX from '../ui/screens/landingInmobiliaria/editarPublicacionX/EditarPublicacionX';

import NavigatorConstant from './NavigatorConstant';

const Stack = createNativeStackNavigator();
function InmobiliariaPublicacionesNavigator() {
  return (
    <Stack.Navigator
      initialRouteName={
        NavigatorConstant.INMOBILIARIA_PUBLICACIONES_STACK.PUBLICACIONES_TOP_TAB
      }
      screenOptions={{headerShown: false}}>
      <Stack.Screen
        name={
          NavigatorConstant.INMOBILIARIA_PUBLICACIONES_STACK
            .PUBLICACIONES_TOP_TAB
        }
        component={Publicaciones}
        options={{headerShown: true}}
      />
      <Stack.Screen
        name={NavigatorConstant.INMOBILIARIA_PUBLICACIONES_STACK.PUBLICACION_X}
        component={PublicacionX}
      />
      <Stack.Screen
        name={
          NavigatorConstant.INMOBILIARIA_PUBLICACIONES_STACK
            .EDITAR_PUBLICACION_X
        }
        component={EditarPublicacionX}
        options={{headerShown: true}}
      />
    </Stack.Navigator>
  );
}

export default InmobiliariaPublicacionesNavigator;
