import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image, Button } from 'react-native';
import * as Google from 'expo-auth-session/providers/google'
import * as Facebook from 'expo-auth-session/providers/facebook'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState("")
  const [userInfo, setUserInfo] = useState(null)
  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: "672923535750-a2h7p26lgupobo39bs5c9qs9sathv71g.apps.googleusercontent.com",
    iosClientId: "672923535750-9hvpcm2m9ade4r0lqpref183ho8tn50q.apps.googleusercontent.com"
  })

  const [FBrequest, FBresponse, FBpromptAsync] = Facebook.useAuthRequest({
    clientId: "1060122529493494"
  })
  const nav = useNavigation();

  useEffect(() => {
    handleEffect();
    if (FBresponse && FBresponse.type === "success" && FBresponse.authentication) {
      (async () => {
        const userInfoResponse = await fetch(
          `https://graph.facebook.com/me?access_token=${FBresponse.authentication.accessToken}&fields=id,name,picture.type(large)`
        );
        const userInfo = await userInfoResponse.json();
        setUser(userInfo);
        console.log(JSON.stringify(response, null, 2));
      })();
    }
  }, [response, token, FBresponse]);

  const handlePressAsync = async () => {
    const result = await FBpromptAsync();
    if (result.type !== "success") {
      alert("Uh oh, something went wrong");
      return result;
    }
  };

  async function handleEffect() {
    const user = await getLocalUser();
    // console.log("user", user);
    if (!user) {
      if (response?.type === "success") {
        // setToken(response.authentication.accessToken);
        getUserInfo(response.authentication.accessToken);
      }
    } else {
      setUserInfo(user);
      nav.navigate("Main", { username: user.name });
      console.log("loaded locally");
    }
  }

  const getLocalUser = async () => {
    const data = await AsyncStorage.getItem("@user");
    if (!data) return null;
    return JSON.parse(data);
  };

  const getUserInfo = async (token) => {
    if (!token) return;
    try {
      const response = await fetch(
        "https://www.googleapis.com/userinfo/v2/me",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const user = await response.json();
      await AsyncStorage.setItem("@user", JSON.stringify(user));
      setUserInfo(user);
      // console.log("Navigation")
      nav.navigate("Main", { username: user.name });
    } catch (error) {
      // Add your own error handler here
    }
  };


  // Local Login
  const handleLogin = () => {
    if (email === '' || password === '') {
      Alert.alert('Error', 'Please fill in all fields');
    } else {
      // Implement login logic here
      Alert.alert('Login Successful', `Welcome, ${email}!`);
      nav.navigate("Main", { username });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>
      <View style={{ marginTop: 10, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: 'rgba(0,0,0,0.3)' }}>Or</Text>

        <View style={{ display: 'flex', marginTop: 10, alignItems: 'center' }}>
          <TouchableOpacity onPress={() => { promptAsync() }}>
            <Image source={require('../../../assets/login/googleLogin.png')} style={{}} />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => handlePressAsync()}>
            <Image source={require('../../../assets/login/fbLogin.png')} />
          </TouchableOpacity>
        </View>

      </View>
      <View style={styles.footer}>
        {/* <Button
          title="Sign Out"
          onPress={async () => await AsyncStorage.removeItem("@user")}
        /> */}
        <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
          <Text style={styles.footerText}>Don't have an account? Sign Up</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.footerText}>Forgot Password?</Text>
        </TouchableOpacity>

        {/* GOOGLE */}
        {/* <Text style={styles.text}>Name: {userInfo?.name}</Text> */}
        {/* FACEBOOK */}
        {/* {userInfo ? (
          <Profile user={userInfo} />
        ) : (
          <Button
            disabled={!FBrequest}
            title="Sign in with Facebook"
            onPress={handlePressAsync}
          />
        )} */}
      </View>
    </View>
  );
}

function Profile({ user }) {
  return (
    <View style={styles.profile}>
      <Image source={{ uri: user.picture.data.url }} style={styles.image} />
      <Text style={styles.name}>{user.name}</Text>
      <Text>ID: {user.id}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    borderWidth: 1,
    paddingVertical: 60,
    paddingHorizontal: '35%',
    borderRadius: 10,
    borderColor: 'transparent',
    backgroundColor: '#EFE1DB'
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  loginButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#1AB487',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginTop: 10,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  footer: {
    marginTop: 20,
    alignItems: 'center',
  },
  footerText: {
    color: '#007bff',
    fontSize: 14,
    marginVertical: 5,
  },
});
