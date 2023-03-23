import { StyleSheet, Text, View, Alert, Image, BackHandler } from 'react-native';
import React, { useState, useEffect } from 'react';
import { WebView } from 'react-native-webview';
import NotifService from './NotifServices';
import axios from 'axios';
import CodePush from 'react-native-code-push';
import Loading from './loading';

export default function App() {
  const [pegawai, setPegawai] = useState('');
  const [registerToken, setRegisterToken] = useState('');
  const [fcmRegistered, setFcmRegistered] = useState(false);
  const [internet, setInternet] = useState(false);
  const [delay, setDelay] = useState(3000);

  CodePush.sync({
    updateDialog: false,
    // updateDialog:{
    //   optionalUpdateMessage:"Ada versi terbaru install sekarang ?",
    //   mandatoryUpdateMessage:"Wajib melakukan update untuk melanjutkan",
    //   title:"Otoritas Radiologi",
    //   optionalInstallButtonLabel:"Install",
    //   optionalIgnoreButtonLabel:"Keluar"
    // },
    installMode: CodePush.InstallMode.IMMEDIATE,
    mandatoryInstallMode: CodePush.InstallMode.IMMEDIATE,
    // onIgnore: () => BackHandler.exitApp()
  });


  useEffect(() => {
    const backAction = () => {
      Alert.alert('Otoritas', 'Apakah Anda Yakin Ingin Keluar Dari Aplikasi?', [
        {
          text: 'Tidak',
          onPress: () => null,
          style: 'cancel',
        },
        { text: 'Ya', onPress: () => BackHandler.exitApp() },
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);


  const onRegister = token => {
    console.log(token.token);
    setRegisterToken(token.token);
    setFcmRegistered(true);
  };

  const onNotif = notif => {
    console.log(notif.title, notif.message);
  };


  const notif = new NotifService(onRegister, onNotif);

  async function onMessage(data) {
    setPegawai(data.nativeEvent.data);
    console.log(registerToken);
    console.log(data.nativeEvent.data);
    await axios
      .post('https://e-rsud.langsakota.go.id/api/pacs/set_token_rn', {
        id_peg: data.nativeEvent.data,
        token: registerToken,
      })
      .then(function (response) {
        console.log(response.data);
      });
  }

  return (
    // <Text>Tes</Text>
    <WebView
      incognito={true}
      scalesPageToFit={false}
      mixedContentMode="compatibility"
      onMessage={onMessage}
      source={{ uri: 'https://e-rsud.langsakota.go.id/radiologi/' }}
      startInLoadingState={true}
      renderLoading={() => <Loading />}
    />
  )
}

const styles = StyleSheet.create({})