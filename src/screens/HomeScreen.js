import React, { useEffect, useState } from 'react'
import { Text, View, SafeAreaView, ScrollView, Image, StyleSheet, Alert, AsyncStorage, TouchableOpacity } from 'react-native'
import { Button }from 'react-native-paper'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Styles from '../core/Styles'
import { theme } from '../core/theme'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import FontistoIcon from 'react-native-vector-icons/Fontisto'
import BackgroundLayout from '../components/BackgroundLayout'
import Icons from 'react-native-vector-icons/MaterialIcons'
import { ListItem, Icon } from 'react-native-elements'


import axios from 'axios'



export default function HomeScreen({ navigation }) {

  const [user, setUser] = React.useState({ 
    rep_ID: '', 
    manager_ID: '',
  });

  const [reportCount, setReportCount] = React.useState('');
  const [expensesCount, setExpensesCount] = React.useState('');
  const [leaveCount, setLeaveCount] = React.useState('');
  const [doctorCount, setDoctorCount] = React.useState('');
  const [sheduledTaskCount, setSheduledTaskCount] = React.useState('');
  const [completedTaskCount, setCompletedTaskCount] = React.useState('');
  const [productsCount, setProductsCount] = React.useState('');


  const [taskList, setTaskList]=useState([]);

 
  useEffect(() => {
    async function fetchData(){
      try {
        const userProfile = await AsyncStorage.getItem('user');
        const profile  = JSON.parse(userProfile);
        if (userProfile !== null){
          setUser({ ...user, rep_ID: profile.rep_ID, manager_ID: profile.manager_ID });       
        }
      } catch (e){
        console.log(e);
      }
    }
    fetchData();     
  },[]);

  useEffect(() => {
    try{  
      axios.post("http://10.0.2.2:3001/homePage/reportCount",{
        rep_ID : user.rep_ID,  
      }).then((response)=>{
        // setStateData({...stateData, reportCount : response.data[0].reportCount})
        setReportCount(response.data.reportCount);
      });
    } catch (err) {
      console.log(err);
      console.log("Error while get report count");
    }   
  },[reportCount]);

  useEffect(() => {
    try{  
      // to post claimed expenses count
      axios.post("http://10.0.2.2:3001/homePage/expensesCount",{
        rep_ID : user.rep_ID, 
      }).then((response)=>{
        // setStateData({...stateData, expensesCount: response.data.expensesCount });
        setExpensesCount(response.data.expensesCount);
      });
    } catch (err) {
      console.log(err);
      console.log("Error while get Expenses count");
    }  
  },[expensesCount]);

  useEffect(() => {
    try{  
      // to post annual leave taken count
      axios.post("http://10.0.2.2:3001/homePage/leaveCount",{
        rep_ID : user.rep_ID, 
      }).then((response)=>{
        // setStateData({...stateData, leaveCount: response.data.leaveCount });
        setLeaveCount(response.data.leaveCount);
      });
    } catch (err) {
      console.log(err);
      console.log("Error while get Leave count");
    } 
  },[leaveCount]);

  useEffect(() => {
    try{  
      // to post total doctors count
      axios.post("http://10.0.2.2:3001/homePage/doctorCount",{
        rep_ID : user.rep_ID, 
      }).then((response)=>{
        // console.log(response.data.doctorCount);      
        // setStateData({...stateData, doctorCount: response.data.doctorCount });
        setDoctorCount(response.data.doctorCount);

      });  
    } catch (err) {
      console.log(err);
      console.log("Error while get Doctor count");
    }   
  },[doctorCount]);

  useEffect(() => {
    try{  
      // to post sheduled task count
      axios.post("http://10.0.2.2:3001/homePage/SheduledTaskCount",{
        rep_ID : user.rep_ID, 
      }).then((response)=>{
        // setStateData({...stateData, SheduledTaskCount: response.data.SheduledTaskCount });
        setSheduledTaskCount(response.data.SheduledTaskCount);

      });
    } catch (err) {
      console.log(err);
      console.log("Error while get schedule task count");
    } 
  },[sheduledTaskCount]);

  useEffect(() => {
    try{  
      // to post sheduled task count
      axios.post("http://10.0.2.2:3001/homePage/CompletedTaskCount",{
        rep_ID : user.rep_ID, 
      }).then((response)=>{
        // setStateData({...stateData, SheduledTaskCount: response.data.SheduledTaskCount });
        setCompletedTaskCount(response.data.CompletedTaskCount);

      });
    } catch (err) {
      console.log(err);
      console.log("Error while get schedule task count");
    } 
  },[completedTaskCount]);

  useEffect(() => {
    try{  
      // to post total products count
      axios.get("http://10.0.2.2:3001/homePage/productsCount").then((response)=>{
        // setStateData({...stateData, productsCount: response.data.productsCount });
        setProductsCount(response.data.productsCount);
      });
    } catch (err) {
      console.log(err);
      console.log("Error while get product count");
    }   
  },[productsCount]);

  useEffect(() => {
        async function fetchData(){
        try{  
          await axios.post("http://10.0.2.2:3001/homePage/viewTask",{
            rep_ID : user.rep_ID,  
        }).then((response)=>{
          setTaskList(response.data);
        });
        } catch (err) {    
          console.log(err);
          console.log("Error while getTask for view");  
        } 
      } fetchData();
  },[user]);

  const viewTask = (task_id) =>{
    navigation.navigate('ViewTask', {task_id});

  }

    

  return (
    <SafeAreaView>
      <ScrollView> 
      <BackgroundLayout>
      <Image style= {Styles.homelogo} 
      source ={require('../assets/logoWithoutName.png')} 
      />
      <Text style={Styles.header}>Good Morning, Aamir!</Text>
      <View style={{alignSelf : 'center', flexDirection : 'row'}}>
        <Text style = { styles.Subtitle}> You have </Text>
        <Text style ={{ color: 'red', fontSize : 15} }> {sheduledTaskCount} </Text> 
        <Text style = { styles.Subtitle}> task or sheduled today {"\n"} </Text>
      </View>
  

        <View style = {styles.sameRow}>
          <View style={{alignItems: 'center'}}>
            <Text> {reportCount} </Text>
            <Text> Visit Report </Text>
            <FontAwesome5Icon name= "file-alt" size= {30} color={theme.colors.primary} onPress= {() => navigation.navigate('VisitSummaryReport')}></FontAwesome5Icon>
          </View>
          <View style={{alignItems: 'center'}}>
            <Text> {expensesCount} </Text>
            <Text> Claimed Expenses </Text>
            <FontAwesome5Icon name= "money-bill-alt" size= {30} color={theme.colors.primary} onPress= {() => navigation.navigate('ManageExpenses')}></FontAwesome5Icon>
          </View>
          <View style={{alignItems: 'center'}}>
            <Text> {leaveCount} </Text>
            <Text> Leave Taken </Text>
            <FontAwesome5Icon name= "adjust" size= {30} color={theme.colors.primary} onPress= {() => navigation.navigate('ManageLeaves')}></FontAwesome5Icon>
          </View>
        </View> 


        <View style = {styles.sameRow}>
          <View style={{alignItems: 'center'}}>
            <Text> {doctorCount} </Text>
            <Text> Total Doctors </Text>
            <FontistoIcon name= "doctor" size= {30} color={theme.colors.primary} onPress= {() => navigation.navigate('DoctorDetails')}></FontistoIcon>
          </View>
          <View style={{alignItems: 'center'}}>
            <Text> {completedTaskCount} </Text>
            <Text> Completed Tasks </Text>
            <FontAwesome5Icon name= "tasks" size= {30} color={theme.colors.primary} onPress= {() => navigation.navigate('')}></FontAwesome5Icon>
          </View>
          <View style={{alignItems: 'center'}}>
            <Text> {productsCount} </Text>
            <Text> Total Products </Text>
            <FontAwesome5Icon name= "capsules" size= {30} color={theme.colors.primary} onPress= {() => navigation.navigate('ProductDetails')}></FontAwesome5Icon>
          </View>
        </View>


        <View style ={styles.sheduleContainer}>

          <View style = {styles.sameRow}>
            <Text style= {styles.TaskHeader}>Task and Shedules </Text>
            <Button
                // style= {styles.addButton}
                mode='contained'
                icon={({color, size}) => (
                    <Icons
                    name="add" 
                    color={theme.colors.surface}
                    size={25}
                    />
                )}
                onPress={() => navigation.navigate('AddNewTask')} 
                > Schedule 
            </Button>
          </View>
          <View style={{borderBottomColor : theme.colors.primary, borderBottomWidth : 1,  marginBottom : 10, }}></View>

          
          {taskList.map((record,i) => {
              const dtt = new Date(record.date);
              const year = dtt.getFullYear() + '/';
              const month = ('0' + (dtt.getMonth() + 1)).slice(-2) + '/';
              const day = ('0' + dtt.getDate()).slice(-2);
                    return( 
                  <TouchableOpacity
                      key={record.task_id}
                      // onPress = {() => navigation.navigate('ViewTask',{task_id})}
                      onPress = {() => viewTask(record.task_id)}
                  >          
                    <ListItem bottomDivider>
                      <FontAwesome5Icon name='window-restore' size={22} color={theme.colors.primary}/>
                      <ListItem.Content>
                        <ListItem.Title style={{color: theme.colors.primary}}>{record.title} - {record.type}</ListItem.Title>
                        <ListItem.Subtitle style= {styles.Subtitle}>{year + month + day} - {record.location}</ListItem.Subtitle>
                        {/* <ListItem.Subtitle>{record.location}</ListItem.Subtitle> */}
                      </ListItem.Content>
                      <ListItem.Chevron />
                    </ListItem>  
                  </TouchableOpacity>    
                )
              })
            }

        </View>

      </BackgroundLayout>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create ({
  sheduleContainer : {
    flex : 1,
    width : '100%',
    minHeight : 300,
    padding: 15,
    backgroundColor : '#E5E5E5',
    borderRadius : 5,
  },

  TaskHeader : {
    color : theme.colors.primary,
    fontWeight : 'bold',
    fontSize : 18,
    flexDirection : 'row',
    justifyContent: 'space-between',
    top : 5
  },

  sameRow : {
    flexDirection : 'row',
    justifyContent: 'space-between',
    marginBottom : 20,
    width : '100%'
  },
  Subtitle: {
    fontSize : 15,
    // alignSelf : 'center'
  },
})

