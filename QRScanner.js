import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Button } from 'react-native';
import { Camera } from 'expo-camera';
// 'use strict';

// import React, { Component } from 'react';

// import {
//   AppRegistry,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   Linking
// } from 'react-native';

// import QRCodeScanner from 'react-native-qrcode-scanner';
// import { RNCamera } from 'react-native-camera';

// class ScanScreen extends Component {
//   onSuccess = e => {
//     Linking.openURL(e.data).catch(err =>
//       console.error('An error occured', err)
//     );
//   };

//   render() {
//     return (
//       <QRCodeScanner
//         onRead={this.onSuccess}
//         flashMode={RNCamera.Constants.FlashMode.torch}
//         topContent={
//           <Text style={styles.centerText}>
//             Please Scan the QR code.
//           </Text>
//         }
//         bottomContent={
//           <TouchableOpacity style={styles.buttonTouchable}>
//             <Text style={styles.buttonText}>OK. Got it!</Text>
//           </TouchableOpacity>
//         }
//       />
//     );
//   }
// }
function QRScanner({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);

  const requestCameraPermission = async () => {
    const { status } = await Camera.requestPermissionsAsync();
    setHasPermission(status === 'granted');
  };

  useEffect(() => {
    requestCameraPermission();
  }, []);

  const handleScan = ({ type, data }) => {
    navigation.navigate('Input', { qrData: data });
  };

  if (hasPermission === null) {
    return <Text>Requesting camera permission...</Text>;
  }
  if (hasPermission === false) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>No access to camera</Text>
        <Button title="Retry Permission" onPress={requestCameraPermission} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Camera 
        style={styles.camera} 
        onBarCodeScanned={handleScan}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777'
  },
  textBold: {
    fontWeight: '500',
    color: '#000'
  },
  container: {
    flex: 1
  },
  camera: {
    flex: 1
  }
});

export default QRScanner;

