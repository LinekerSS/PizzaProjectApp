import React from "react";
import { View, Text, TouchableOpacity } from 'react-native'
import { styles } from "./styles";
import { Feather } from '@expo/vector-icons'
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { api } from "../../services/api";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StacksPromsList } from '../../routes/app.routes'

type RouteDetailParams = {
    FinishOrder: {
        number: string | number;
        order_id: string;
    }
}

type FinishOrderRouteProp = RouteProp<RouteDetailParams, 'FinishOrder'>

export default function FinishOrder() {

    const route = useRoute<FinishOrderRouteProp>()
    const navigation = useNavigation<NativeStackNavigationProp<StacksPromsList>>();

    const handleFinish = async () => {
        try {
             
            await api.put('/order/send', {
                order_id: route.params?.order_id
            })
            alert('Pedido Concluído!')

            navigation.popToTop();

        } catch (error) {
            console.log("Erro ao finalizar, tente mais tarde!");
            
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.alert}>Você deseja finalizar este pedido?</Text>
            <Text style={styles.title}>Mesa {route.params?.number}</Text>

            <TouchableOpacity style={styles.button} onPress={handleFinish}>
                <Text style={styles.textButton}>Finalizar Pedido</Text>
                <Feather name="shopping-cart" size={20} color="#1d1d2e" />
            </TouchableOpacity>
        </View>
    )
}