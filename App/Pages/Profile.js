import React, { useContext } from 'react'
import { View, Text, Image, FlatList, TouchableOpacity, Linking } from 'react-native'
import { userDeatailsContext } from '../../App'
import { useNavigation } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons';
import { client } from '../Shared/KindConfig';
import { AuthContext } from '../../App';

function Profile() {

  const { userDetail, setUserDetail } = useContext(userDeatailsContext)
  const Navigation = useNavigation();
  const { auth, setAuth } = useContext(AuthContext)

  const menu = [
    {
      id: 1,
      name: 'Explore',
      path: 'Home',
      icon: 'search'
    },
    {
      id: 2,
      name: 'My Course',
      path: 'Course',
      icon: 'book'
    },
    {
      id: 3,
      name: 'Logout',
      icon: 'log-out'
    },
  ]


  const onMenuClick = async (item) => {

    if (item?.url) {
      Linking.openURL(item.url)
    }
    else if (item.path) {
      Navigation.navigate(item.path)
    }
    else if (item.name == 'Logout') {
      const loggedOut = await client.logout();
      if (loggedOut) {
        setAuth(false)
        Navigation.navigate('Login')
        // User was logged out
      }
    };
  }

  return (
    <View style={{ padding: 30, marginTop: 15 }}>
      <View style={{ marginLeft: -19, marginRight: -19 }}>
        <View style={{ color: 'black', borderRadius: 8, marginTop: 16, padding: 9, margin: 4 }}>
          <Text style={{ fontSize: 22, color: 'black', fontWeight: 'bold', }}>PROFILE</Text>
          <View style={{ borderBottomColor: 'gray', borderBottomWidth: 1, marginTop: 3, elevation: 5 }} />
        </View>
      </View>

      {userDetail && <View style={{ alignItems: 'center', margin: 30, gap: 3 }}>
        <Image source={{ uri: userDetail?.picture }}
          style={{ width: 100, height: 100, borderRadius: 99 }}
        ></Image>
        <Text style={{ fontSize: 25, fontWeight: 'bold' }}>{userDetail?.given_name}</Text>
        <Text style={{ fontSize: 15 }}>{userDetail?.email}</Text>
      </View>
      }

      <View>
        <FlatList
          data={menu}
          renderItem={({ item, index }) => (
            <TouchableOpacity onPress={() => onMenuClick(item)}
              style={{ display: 'flex', flexDirection: 'row', gap: 10, alignItems: 'center', marginBottom: 20, backgroundColor: 'white', padding: 12, borderTopLeftRadius: 40, borderBottomRightRadius: 40, borderLeftWidth: 13, borderLeftColor: '#80bfff', borderRightWidth: 13, borderRightColor: '#80bfff', borderBottomWidth: 2, borderBottomColor: '#80bfff', elevation: 6 }}
            >
              <Ionicons name={item.icon} size={25} color="gray" />
              <Text style={{ fontWeight: 'bold', fontSize: 19 }}>{item?.name}</Text>
            </TouchableOpacity>
          )}
        />
      </View>

    </View>
  )
}

export default Profile