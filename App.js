import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker'
import { useState } from 'react';

export default function App() {

  const [gasCost, setGasCost] = useState("");
  const [gasMileage, setGasMileage] = useState("");
  const [utilitiesCost, setUtilitiesCost] = useState("");
  const [evMileage, setEvMileage] = useState("");
  const [kms, setKms] = useState(15000);
  const [distanceGas, setDistanceGas] = useState(0);
  const [distanceEV, setDistanceEV] = useState(0);
  const [additionalDistance, setAdditionalDistance] = useState(0);
  const [savings, setSavings] = useState(0);

  const calculateSavings = () => {
    const gasDist = gasMileage
    const evDist = evMileage*gasCost/utilitiesCost
    const extraDist = evDist - gasDist
    setDistanceGas(gasDist)
    setDistanceEV(evDist)
    setAdditionalDistance(extraDist)

    const annualGasCost = gasCost * kms / gasMileage
    const annualEVCost = utilitiesCost * kms / evMileage
    const annualSavings = annualGasCost - annualEVCost
    setSavings(annualSavings)
  }

  return (
    <ScrollView >
      <View style={styles.container}>
      <Text style={[styles.heading, {fontSize: 40, marginVertical: 20}]}>EV Savings Calculator</Text>

      <Text>Gas Vehicle Information</Text>
      <View style={styles.horizontalView}>
        <TextInput
          style={styles.inputStyle}
          placeholder='Price per Litre ($/L)'
          value={gasCost}
          onChangeText={setGasCost}
        />
        <TextInput
          style={styles.inputStyle}
          placeholder='Gas Mileage (km/L)'
          value={gasMileage}
          onChangeText={setGasMileage}
        />
      </View>

      <Text>Electric Vehicle Information</Text>
      <View style={styles.horizontalView}>
        <TextInput
          style={styles.inputStyle}
          placeholder='Utilities Cost ($/kwH)'
          value={utilitiesCost}
          onChangeText={setUtilitiesCost}
        />
        <TextInput
          style={styles.inputStyle}
          placeholder='EV Mileage (km/kwH)'
          value={evMileage}
          onChangeText={setEvMileage}
        />
      </View>

      <Text>How many kilometers do you drive each year?</Text>
      <Picker style={{ width: 400 }}
        selectedValue={kms}
        onValueChange={(itemValue, itemIndex) =>
          setKms(itemValue)
        }>
        <Picker.Item label="15000" value="15000" />
        <Picker.Item label="25000" value="25000" />
        <Picker.Item label="40000" value="40000" />
      </Picker>

      <TouchableOpacity style={styles.buttonStyle} onPress={calculateSavings} >
        <Text style={styles.heading}>Estimate Savings</Text>
      </TouchableOpacity>

      <Text style={{fontSize: 20}}>For the price of 1L of gas, you can travel:</Text>
      <View style={styles.horizontalView}>
        <View style={[styles.displayDistance , {backgroundColor: "lightpink" }]}>
          <Text style={styles.heading}>{parseFloat(distanceGas).toFixed(2)}</Text>
          <Text>km</Text>
        </View>
        <View style={[styles.displayDistance , {backgroundColor: "lightblue" }]}>
          <Text style={styles.heading}>{parseFloat(distanceEV).toFixed(2)}</Text>
          <Text>km</Text>
        </View>
        <View style={[styles.displayDistance , {backgroundColor: "lightyellow" }]}>
          <Text style={styles.heading}>{parseFloat(additionalDistance).toFixed(2)}</Text>
          <Text>km</Text>
        </View>
      </View>

      <Text style={{fontSize: 20}}>By switching to electric, you obtain:</Text>
      <View style={styles.result}>
        <Text style={[styles.heading, {color: "white", fontSize: 50}]}>${parseFloat(savings).toFixed(2)}</Text>
        <Text style={[styles.heading, {color: "white"}]}>in savings per year</Text>
      </View>
      <StatusBar style="auto" />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    paddingVertical: 50
  },
  heading: {
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold"
  },
  horizontalView: {
    flexDirection: "row"
  },
  inputStyle: {
    height: 50,
    width: 170,
    margin: 10,
    backgroundColor: 'lightgray',
    padding: 5,
    borderRadius: 10
  },
  buttonStyle: {
    alignSelf: "stretch",
    borderColor: "black",
    borderWidth: 2,
    margin: 20,
    padding: 20,
    borderRadius: 10,
    width: 380
  }, 
  displayDistance: {
    width: 120,
    alignItems: "center",
    borderRadius: 5,
    padding: 10,
    margin: 5,
    marginVertical: 30
  },
  result: {
    backgroundColor: "black",
    width: 380,
    padding: 20,
    borderRadius: 10,
    margin: 10,
    marginVertical: 30
  }
});