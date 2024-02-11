import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { useNavigation, useRoute } from "@react-navigation/native";

const QRCodeScanner = () => {
  const [hasPermission, setHasPermission] = useState(false);
  const [scanData, setScanData] = useState();
  const navigation = useNavigation();

  const route = useRoute();
  const { email } = route.params || {};

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanData(data);
    console.log(`Scanned Data: ${data}`);

    navigation.navigate("PlantDataForm", {
      scannedData: data,
      email: email,
    });
  };

  return (
    <View style={styles.container}>
      {hasPermission ? (
        <BarCodeScanner
          style={StyleSheet.absoluteFillObject}
          onBarCodeScanned={scanData ? undefined : handleBarCodeScanned}
        />
      ) : (
        <Text>Please grant camera permissions to the app.</Text>
      )}
      {scanData && (
        <Button title="Scan Again?" onPress={() => setScanData(undefined)} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default QRCodeScanner;
