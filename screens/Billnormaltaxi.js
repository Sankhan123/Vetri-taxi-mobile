import React,{useContext} from "react";
import axios from 'axios';
import { StyleSheet, Text, View,} from "react-native"
import Card from '../components/CalCard'
import { useNavigation } from "@react-navigation/native";
import Button from '../components/button'
import {NormalContext} from "../context/NormalContextProvider";
import authHeader from "../assets/header/auth-header";

const Billnormaltrip = () => {  
  
  let car_id;
  if(localStorage.length){
      const user_val = localStorage.getItem('user');
      const user = JSON.parse(user_val);
      car_id = user.user.id; 
  }


//useNavigation   
    const navigation = useNavigation();
 //contextprovider   
const {
        normalData,
      } = useContext(NormalContext);
  
      if(normalData.discount===''){
        normalData.discount=0;
      }
      if(normalData.tolls===''){
        normalData.tolls=0;
      }
      if(normalData.extra_amt===''){
        normalData.extra_amt=0;
      }
     
      let totalPrice = normalData.distance_travelled * 12;
      console.log( totalPrice)
      let result = 0;
      normalData.distance_travelled >= 300 ? result = result + normalData.driver_beta + normalData.waiting_chargeamount : result = result + normalData.waiting_chargeamount
      let calc = 0;
      normalData.discount  >0 ? calc = (parseFloat(normalData.tolls) + parseFloat(normalData.extra_amt))-parseFloat(normalData.discount) : calc = parseFloat(normalData.tolls) + parseFloat(normalData.extra_amt);
      let value = totalPrice + calc + result;

      let data = {
        car_id: car_id,
        from: normalData.from,
        to: normalData.to,
        cus_name: normalData.customer_name,
        mobile: normalData.phone,
        distance: normalData.distance_travelled,
        w_hour: normalData.waiting_hour,
        w_charge: normalData.waiting_chargeamount,
        driver_batta: normalData.driver_beta,
        total: result,
        value: value
      }

      async function addBill() {
        console.log(data);
        try{
            const response = await axios.post("http://127.0.0.1:8000/api/auth/taxi-trip",data, { headers: authHeader() });
            if(response){
              alert(response.data.message);
              navigation.navigate("Home");
            }
         
        }catch(e){
          console.log(e);
        }
      }

    return (
        <View
                 style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    
            <View style={{ paddingHorizontal: 32, marginBottom: 16, width: '100%', justifyContent: 'center'}}>
                <Card>
                  
                <Text style={{ color: '#223e4b', fontSize: 28, marginBottom: 16, alignItems: 'center', fontWeight: 'bold', }}>
                Traffic Calculation 
               </Text> 
              <Text style={{ color: '#223e4b', fontSize: 20, marginBottom: 16, }}>
                  Distance Travelled: 
                  {normalData.distance_travelled * 12 || 0}
              </Text>
              <Text style={{ color: '#223e4b', fontSize: 20, marginBottom: 16,}}>
                  Waiting Hours: 
                  {normalData.waiting_hour || 0} 
              </Text>
              <Text style={{ color: '#223e4b', fontSize: 20, marginBottom: 16,}}>
                  Waiting Charge: 
                  {normalData.waiting_chargeamount || 0}
              </Text>
              {normalData.distance_travelled >=300 &&
                <Text style={{ color: '#223e4b', fontSize: 20, marginBottom: 16,}}>
                    Driver Beta: 
                    {normalData.driver_beta || 0}  
                </Text>
                }
             <Text style={{ color: '#223e4b', fontSize: 20, marginBottom: 16,}}>
            Toll Price: 
              {normalData.tolls|| 0}
          </Text>
          <Text style={{ color: '#223e4b', fontSize: 20, marginBottom: 16,}}>
            Extra Amount: 
              {normalData.extra_amt  || 0}
          </Text>
          <Text style={{ color: '#223e4b', fontSize: 20, marginBottom: 16,}}>
              Discount :
              {normalData.discount || 0}
          </Text>
              <Text style={{ color: '#fb9403', fontSize: 28, marginBottom: 16, fontWeight: 'bold', }}>
                 Total : {value}
              </Text>
             
              </Card>
              </View>
              <Button label='Submit' onPress={addBill}/>
        
        
            </View>
        
          );
        };
        
        export default Billnormaltrip;
        