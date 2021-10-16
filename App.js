import { StatusBar } from 'expo-status-bar';
import React, {createContext, useContext, useState, useEffect} from 'react';
import { StyleSheet, Text, View, ScrollView, Image, Switch, Pressable } from 'react-native';
import { UserContext } from './context/UserContext';

const themes = {
  light: {
    backgroundColor: '#ffffff',
    titleColor: '#000000',
    addressColor: '#959595',
    emailColor: '#5a71ff'
  },
  dark: {
    backgroundColor: '#313131',
    titleColor: '#ffffff',
    addressColor: '#959595',
    emailColor: '#5a71ff'
  },
  filter : []
}

const ThemeContext = createContext()

export default function App() {
  const [theme, setTheme] = useState(themes.light)
  const [isEnabled, setIsEnabled] = useState(false);
  const [users, setUsers] = useState([])
  const [statusFilter, setStatusFilter] = useState('')

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    const response = await fetch(`https://randomuser.me/api/?results=20`)
    const data = await response.json()
    setUsers(data.results)
  }

  const toggleSwitch = () => {
    setIsEnabled(previousState => !previousState)
    isEnabled ? setTheme(themes.light) : setTheme(themes.dark)
  }

  const filterUsers = (status) => {
    if(status == 'all'){
      setStatusFilter(status)
    }else if(status == 'male'){
      setStatusFilter(status)
    }else{
      setStatusFilter(status)
    }
  }

  return (
    <ThemeContext.Provider value={theme}>
      <View style={styles.container}>
        <View style={styles.boxTitle}>
            <Text style={styles.textTitle}>List Users</Text>
            <Switch
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={isEnabled ? "#313131" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isEnabled}
              style={{marginTop: -25}}
            />
            <View style={{flexDirection: 'row', marginTop: 10}}>
              <Pressable style={styles.btnAll} onPress={() => filterUsers('all')}>
                <Text style={{color: '#fff', textAlign: 'center'}}>All Gender</Text>
              </Pressable>
              <Pressable style={styles.btnMale} onPress={() => filterUsers('male')}>
                <Text style={{color: '#fff', textAlign: 'center'}}>Male</Text>
              </Pressable> 
              <Pressable style={styles.btnFemale} onPress={() => filterUsers('female')}>
                <Text style={{color: '#fff', textAlign: 'center'}}>Female</Text>
              </Pressable>            
            </View>
        </View>
        <UserContext.Provider value={{users, statusFilter}}>
          <UserList/>
        </UserContext.Provider>
      </View>
    </ThemeContext.Provider>
  );
}

function UserList(){
  return(<ThemedUserList />)
}

function ThemedUserList(){
  const theme = useContext(ThemeContext)
  const { users, statusFilter } = useContext(UserContext)
  
  return(
    <ScrollView style={{backgroundColor: theme.backgroundColor, padding: 10}}>
      {
        statusFilter === 'male' ? 
        users.filter((user) => user.gender === 'male').map((user, idx) => (
          <View style={styles.boxList} key={idx}>
            <View style={styles.boxImage}>
              <Image style={styles.img}
                source={{
                  uri: user.picture.medium
                }}
              />
            </View>
            <View style={styles.boxText}>
              <Text style={{fontSize: 20, fontWeight: 'bold', color: theme.titleColor}}>{user.name.first} {user.name.last}</Text>
              <Text style={{fontSize: 12, color: theme.addressColor}}>{user.location.street.number} {user.location.street.name} {user.location.city} {user.location.country}</Text>
              <Text style={{color: theme.emailColor}}>{user.email}</Text>
            </View>
          </View>
        )) :
        statusFilter === 'female' ?
        users.filter((user) => user.gender === 'female').map((user, idx) => (
          <View style={styles.boxList} key={idx}>
            <View style={styles.boxImage}>
              <Image style={styles.img}
                source={{
                  uri: user.picture.medium
                }}
              />
            </View>
            <View style={styles.boxText}>
              <Text style={{fontSize: 20, fontWeight: 'bold', color: theme.titleColor}}>{user.name.first} {user.name.last}</Text>
              <Text style={{fontSize: 12, color: theme.addressColor}}>{user.location.street.number} {user.location.street.name} {user.location.city} {user.location.country}</Text>
              <Text style={{color: theme.emailColor}}>{user.email}</Text>
            </View>
          </View>
        )) :
        users.map((user, idx) => (
          <View style={styles.boxList} key={idx}>
            <View style={styles.boxImage}>
              <Image style={styles.img}
                source={{
                  uri: user.picture.medium
                }}
              />
            </View>
            <View style={styles.boxText}>
              <Text style={{fontSize: 20, fontWeight: 'bold', color: theme.titleColor}}>{user.name.first} {user.name.last}</Text>
              <Text style={{fontSize: 12, color: theme.addressColor}}>{user.location.street.number} {user.location.street.name} {user.location.city} {user.location.country}</Text>
              <Text style={{color: theme.emailColor}}>{user.email}</Text>
            </View>
          </View>
        ))
      }
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 25
  },
  boxTitle: {
    padding: 10,
    backgroundColor: '#354dff',
  },
  textTitle: {
    fontSize: 25,
    color: '#fff',
    fontWeight: 'bold'
  },
  boxList: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: 15,
  },
  boxImage: {
    flex: 2
  },
  boxText: {
    flex: 4,
    marginLeft: -35
  },
  img: {
    width: 70,
    height: 70,
    borderRadius: 35
  },
  btnAll: {
    flex: 2, 
    backgroundColor: '#313131', 
    borderRadius: 5, 
    padding: 10,
    marginRight: 10
  },
  btnMale: {
    flex: 2, 
    backgroundColor: '#2196f3', 
    borderRadius: 5, 
    padding: 10,
    marginRight: 10
  },
  btnFemale: {
    flex: 2, 
    backgroundColor: '#f194ff', 
    borderRadius: 5, 
    padding: 10,
    marginRight: 10
  }
})