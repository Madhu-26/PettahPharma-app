import React, { useState, useEffect } from 'react'
import { Text, View, SafeAreaView, ScrollView, StatusBar, Image, StyleSheet, Button, AsyncStorage} from 'react-native'
import Styles from '../core/Styles'
import TopNav from '../components/TopNav'
import { theme } from '../core/theme'
import Icon from 'react-native-vector-icons/Ionicons'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import FontistoIcon from 'react-native-vector-icons/Fontisto'
import { ThemeProvider } from '@react-navigation/native'
import BackgroundLayout from '../components/BackgroundLayout'
import {Card, DataTable} from 'react-native-paper';
import axios from 'axios';

const optionsPerPage = [2, 3, 4];

export default function ManageLeaves({ navigation }) {

  const [searchQuery, setSearchQuery] = useState('');
  const onChangeSearch = query => { setSearchQuery(query) }
  console.log(searchQuery);

//   const [searchTerm,setSearchTerm]=useState("");

  const [page, setPage] = useState(3);
  const [itemsPerPage, setItemsPerPage] = useState(optionsPerPage[0]);

  const [pendingLeaveList,setPendingLeaveList]=useState([]);


  useEffect(()=>{
    axios.get("http://10.0.2.2:3001/viewPendingLeaves").then((response)=>{
      setPendingLeaveList(response.data);
    })
  },[pendingLeaveList]);

  const [user, setUser] = useState({ rep_ID: '', manager_ID: '', });
  
  useEffect(() => {
    async function fetchData(){
      try {
        const userProfile = await AsyncStorage.getItem('user');
        const profile  = JSON.parse(userProfile);
        if (profile !== null){
          setUser({ ...user, rep_ID: profile.rep_ID, manager_ID: profile.manager_ID });            
        }
      } catch (e){
        console.log(e);
      }
    }
    fetchData();
  },[user]);
  
  return (
    <SafeAreaView>
      <ScrollView> 
      <BackgroundLayout>
      <View style = {styles.sameRow}>
        <View style={{alignItems: 'center'}}>
          {/* <Text>{user.rep_ID}</Text> */}
          <FontAwesome5Icon name= "circle-notch" size= {40} color={theme.colors.primary} onPress= {() => navigation.navigate('ManageLeaves')}></FontAwesome5Icon>
          <Text> Pending </Text>
        </View>
        <View style={{alignItems: 'center'}}>
          <FontAwesome5Icon name= "circle-notch" size= {40} color={theme.colors.primary} onPress= {() => navigation.navigate('AnnualLeaves')}></FontAwesome5Icon>
          <Text> Approved </Text>
        </View>
        <View style={{alignItems: 'center'}}>
          <FontAwesome5Icon name= "plus-circle" size= {40} color={theme.colors.primary} onPress= {() => navigation.navigate('ApplyLeaves')}></FontAwesome5Icon>
          <Text> Apply </Text>
        </View>
      </View>

      <DataTable>
                <DataTable.Header>
                    <DataTable.Title align = "center">Type of Leave</DataTable.Title>
                    <DataTable.Title align = "center">Duration</DataTable.Title>
                    <DataTable.Title align = "center">Description </DataTable.Title>
                    {/* <DataTable.Title align = "center">Status</DataTable.Title> */}
                    {/* <DataTable.Title numeric>Sales Manager's Comment</DataTable.Title> */}
                </DataTable.Header>

                {pendingLeaveList.filter(val=>{if(searchQuery===""){
                            return val;
                            }else if(
                            val.name.toLowerCase().includes(searchQuery.toLowerCase()));
                            { return val;
                             } 
                          }).map((record)=>{
                            return(
                    <DataTable.Row key={record.leave_ID}>
                    <DataTable.Cell align="center">{record.leave_Type}</DataTable.Cell>
                    <DataTable.Cell align="center">{record.no_of_days}</DataTable.Cell>
                    <DataTable.Cell align="center">{record.description}</DataTable.Cell>
                    {/* <DataTable.Cell align="center">{record.status}</DataTable.Cell> */}
                    {/* <DataTable.Cell align="center">{record.salesmanager_comment}</DataTable.Cell> */}
                    
                    </DataTable.Row>
                    )})
                }

                <DataTable.Pagination
                    page={page}
                    numberOfPages={3}
                    onPageChange={(page) => setPage(page)}
                    label="1-2 of 6"
                    optionsPerPage={optionsPerPage}
                    itemsPerPage={itemsPerPage}
                    setItemsPerPage={setItemsPerPage}
                    showFastPagination
                    optionsLabel={'Rows per page'}
                />
            </DataTable>

      {/* <View>
        
      <Card style={ styles.card }>
        <Card.Title title="Off"/>
        <Card.Content >
          <View style = {styles.sameRow}>
          <FontAwesome5Icon name= "tired" size= {30} color={theme.colors.primary} ></FontAwesome5Icon>
          </View>
        </Card.Content>
      </Card>
      <View style={{borderBottomWidth : 1,  marginBottom : 15, }}></View>
      <Card style={ styles.card }>
        <Card.Title title="Medical Leaves"/>
        <Card.Content >
          <View style = {styles.sameRow} >
          <FontAwesome5Icon name= "frown" size= {30} color={theme.colors.primary} ></FontAwesome5Icon>
          </View>
        </Card.Content>
      </Card>
      <View style={{borderBottomWidth : 1,  marginBottom : 15, }}/>
      <Card.Title title="Casual Leaves"/>
        <Card.Content >
          <View style = {styles.sameRow}>
          <FontAwesome5Icon name= "tired" size= {30} color={theme.colors.primary} ></FontAwesome5Icon>
          </View>
        </Card.Content>
      </Card>
      <View style={{borderBottomWidth : 1,  marginBottom : 15, }}></View>
      <Card style={ styles.card }>
        <Card.Title title="Annual Leaves"  />
        <Card.Content>
          <View style = {styles.sameRow}>
          <FontAwesome5Icon name= "hand-holding-usd" size= {30} color={theme.colors.primary} ></FontAwesome5Icon>
          </View>
        </Card.Content>
      </Card>
      </View> */}

      </BackgroundLayout>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create ({
  sameRow : {
    flexDirection : 'row',
    justifyContent: 'space-between',
    marginBottom : 5,
    marginTop : 5,
    width : '100%'
  },
  card: {
    backgroundColor :"#D2F7F7",
  },
  sameColumn : {
    flexDirection : 'column',
    justifyContent : 'center',
    height : '9%',
    marginTop : 5,
    marginBottom : 5
  }
})
