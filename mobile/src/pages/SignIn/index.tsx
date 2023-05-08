import React, { useState, useContext } from 'react';
import { 
    View, 
    Text,
    Image,
    TextInput,
    TouchableOpacity,
    ActivityIndicator
 } from 'react-native';
import { styles } from './styles';

import { AuthContext } from '../../context/AuthContext';

export default function SignIn() {

    const { signIn, loadingAuth } = useContext(AuthContext)
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {

        if(email === '' || password === '' ) {
            return;
        };

        await signIn({ email, password })
    }

    return (
        <View style={styles.container}>
            <Image 
                style={styles.logo}
                source={require('../../assets/logo.png')}            
            />

            <View style={styles.inputContainer}>
                <TextInput placeholder='Digite seu email' style={styles.input} placeholderTextColor='#F0F0F0' value={email} onChangeText={(t) => setEmail(t)} />
                <TextInput placeholder='Digite sua senha' style={styles.input} placeholderTextColor='#F0F0F0' secureTextEntry={true} value={password} onChangeText={(t) => setPassword(t)}/>
                <TouchableOpacity style={styles.button} onPress={handleLogin}>
                    {loadingAuth ? (
                        <ActivityIndicator size={25} color='#fff' />
                    ) : (
                        <Text style={styles.buttonText}>Acessar</Text>
                    )}
                </TouchableOpacity>
            </View>
        </View>
    )
}