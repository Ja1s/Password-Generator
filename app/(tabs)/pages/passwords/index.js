import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useIsFocused } from '@react-navigation/native';
import useStorage from '../../hooks/useStorage';
import { PasswordItem } from '../../pages/passwords/components/passworditem';

export function Passwords() {
    const [listPasswords, setListPasswords] = useState([]);
    const isFocused = useIsFocused();
    const { getItem, removeItem } = useStorage();

    useEffect(() => {
        async function loadPasswords() {
            const passwords = await getItem('@pass');
            setListPasswords(passwords);
        }
        if (isFocused) {
            loadPasswords();
        }
    }, [isFocused]);

    async function handleDeletePassword(item) {
        Alert.alert(
            "Excluir Senha",
            "Você tem certeza que deseja excluir esta senha?",
            [
                {
                    text: "Cancelar",
                    style: "cancel"
                },
                {
                    text: "Excluir",
                    onPress: async () => {
                        const passwords = await removeItem('@pass', item);
                        setListPasswords(passwords);
                    },
                    style: "destructive"
                }
            ]
        );
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.header}>
                <Text style={styles.title}>Minhas Senhas</Text>
            </View>

            <View style={styles.content}>
                <FlatList
                    data={listPasswords}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <PasswordItem 
                            data={item}
                            removePassword={() => handleDeletePassword(item)}
                        />
                    )}
                    contentContainerStyle={styles.listContainer}
                />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#4134e3',
        paddingTop: 60,
        paddingBottom: 15,
        paddingLeft: 15,
        paddingRight: 15
    },
    title: {
        fontSize: 20,
        color: '#FFF',
        fontWeight: 'bold'
    },
    content: {
        flex: 1,
        backgroundColor: '#f0f0fc',
        paddingRight: 15,
        paddingLeft: 15
    },
    listContainer: {
        paddingTop: 15
    }
});
