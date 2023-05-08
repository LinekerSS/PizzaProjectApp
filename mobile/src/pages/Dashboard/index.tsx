import React, { useContext, useState } from "react"
import { View, Text, SafeAreaView, TouchableOpacity, TextInput } from 'react-native'
import { AuthContext } from "../../context/AuthContext"
import { styles } from "./styles"
import { useNavigation } from '@react-navigation/native'
import { StacksPromsList } from '../../routes/app.routes'
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { api } from "../../services/api"

export default function Dashboard() {
    const navigation = useNavigation<NativeStackNavigationProp<StacksPromsList>>();

    //const { signOut } = useContext(AuthContext)

    const [number, setNumber] = useState('');

    const openOder = async () => {
        if(number === '') {
            return;
        }

        const response = await api.post('/order', {
            table: Number(number)
        })

        console.log(response.data)
        // Preciso fazer a requisição e abrir a mesa e navegar para a próxima tela
        navigation.navigate('Order', { number: number, order_id: response.data.id})

        setNumber('')
    }


    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Novo Pedido</Text>
            <TextInput style={styles.input} placeholder="Número da mesa" placeholderTextColor="#f0f0f0" keyboardType="numeric" value={number} onChangeText={setNumber}/>
            <TouchableOpacity style={styles.button} onPress={openOder}>
                <Text style={styles.buttonText}>Abrir mesa</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}