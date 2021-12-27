import React from "react";
import { StyleSheet, Text, View,} from "react-native";
import Card from '../components/Calcard'
import { useFormik } from 'formik'
import Button from '../components/button'


  
const Billonedaytrip = (props) => {   

  const { 
    handleChange,
    handleSubmit,
    touched } 
    = useFormik(
      {initialValues: { username: '', password: '' },
      onSubmit: () =>
        alert("")
    });
     
  return (
<View
         style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            
    <View style={{ paddingHorizontal: 32, marginBottom: 16, width: '100%', justifyContent: 'center'}}>
        <Card >
          
        <Text style={{ color: '#223e4b', fontSize: 28, marginBottom: 16, alignItems: 'center', fontWeight: 'bold', }}>
        Traffic Calculation 
       </Text> 
      <Text style={{ color: '#223e4b', fontSize: 20, marginBottom: 16, }}>
          Initital payment : 
      </Text>
      <Text style={{ color: '#223e4b', fontSize: 20, marginBottom: 16,}}>
          Price Per KM : 
      </Text>
      <Text style={{ color: '#fb9403', fontSize: 28, marginBottom: 16, fontWeight: 'bold', }}>
         Total :
      </Text>
     
      </Card>
      </View>
      <Button label='Submit' onPress={handleSubmit}/>

    </View>

  );
};

export default Billonedaytrip;

