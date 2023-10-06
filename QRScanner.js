import React, { useState } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { RNCamera } from 'react-native-camera';
import QRCode from 'react-native-qrcode-svg'; 

const QRScanner = () => {
  const [qrValue, setQrValue] = useState(null);
  const [showQRCode, setShowQRCode] = useState(false); // New state to toggle showing the QR code

  const handleBarCodeScanned = ({ type, data }) => {
    setQrValue(data);

    // Attempt to open the URL
    if (data) {
        Linking.canOpenURL(data)
            .then(supported => {
                if (supported) {
                    Linking.openURL(data);
                } else {
                    console.log("Don't know how to open URI: " + data);
                }
            })
            .catch(err => console.error("An error occurred", err));
    }
};


  const handleGenerateQRCode = () => {
    setQrValue('yourapp://path/to/page'); // Set your deep link here
    setShowQRCode(true); // Show the QR code
  };

  return (
    <View style={styles.container}>
      {showQRCode ? ( // If showQRCode is true, display the QR code
        <View style={styles.qrCodeContainer}>
          <QRCode value={qrValue} size={200} />
          <Text style={styles.qrValue}>
            {qrValue ? `QR Code Value: ${qrValue}` : ''}
          </Text>
        </View>
      ) : (
        <RNCamera
          style={styles.camera}
          type={RNCamera.Constants.Type.back}
          captureAudio={false}
          barCodeTypes={[RNCamera.Constants.BarCodeType.qr]}
          onBarCodeRead={handleBarCodeScanned}
        >
          <Text style={styles.qrValue}>
            {qrValue ? `Scanned QR Code Value: ${qrValue}` : 'Scan a QR Code'}
          </Text>
          <Button title="Generate QR Code" onPress={handleGenerateQRCode} /> {/* Button to generate QR code */}
        </RNCamera>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: 20,
  },
  qrCodeContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  qrValue: {
    fontSize: 18,
    marginBottom: 10,
    color: 'white',
  },
});

export default QRScanner;

