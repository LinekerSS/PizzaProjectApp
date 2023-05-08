import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView    
} from 'react-native';
import { styles } from './styles';
import { CategoryProps } from '../../pages/order';

interface ModalPickerProps {
    options: CategoryProps[];
    handleCloseModal: () => void;
    selectedItem: (item: CategoryProps) => void;
}



export function ModalPicker({ options, handleCloseModal, selectedItem} : ModalPickerProps) {

    function onPressItem (item : CategoryProps) {
        //console.log(item);
        selectedItem(item);
        handleCloseModal();
        
    }

    const option = options.map((item, index) => (
        <TouchableOpacity key={index} style={styles.option} onPress={ () => onPressItem(item) }>
            <Text style={styles.item}>
                {item?.name}
            </Text>
        </TouchableOpacity>
    ))

    return (
        <TouchableOpacity style={styles.container} onPress={handleCloseModal}>
            <View style={styles.content}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    {option}
                </ScrollView>
            </View>
        </TouchableOpacity>
    )
}