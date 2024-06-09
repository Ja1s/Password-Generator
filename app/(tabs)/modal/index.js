import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Pressable } from "react-native";
import * as Clipboard from 'expo-clipboard';
import useStorage from '../hooks/useStorage';

export function ModalPassword({ password, handleClose, handleCopyPassword }) {
    const { saveItem } = useStorage();

    async function handleCopyPassword() {
        await Clipboard.setStringAsync(password);
        await saveItem('@pass', password);
        alert('Senha copiada para a Área de Transferência!');
        handleClose();
    }

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.title}>Senha Gerada</Text>
                <Pressable style={styles.innerPassword} onLongPress={handleCopyPassword}>
                    <Text style={styles.text}>
                        {password}
                    </Text>
                </Pressable>
                <View style={styles.buttonArea}>
                    <TouchableOpacity style={styles.button} onPress={handleClose}>
                        <Text style={styles.buttonText}>Voltar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button, styles.buttonSave]} onPress={handleCopyPassword}>
                        <Text style={styles.buttonSaveText}>Salvar senha</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(24, 24, 24, 0.6)',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    content: {
        backgroundColor: '#FFF',
        width: "85%",
        paddingTop: 25,
        paddingBottom: 25,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 25,
    },
    innerPassword: {
        backgroundColor: '#111',
        width: '85%',
        padding: 15,
        borderRadius: 8,
    },
    text: {
        color: '#FFF',
        textAlign: 'center',
    },
    buttonArea: {
        flexDirection: 'row',
        marginTop: 10,
        width: '85%',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    button: {
        flex: 1,
        alignItems: 'center',
        marginTop: 15,
        marginBottom: 15,
        padding: 8,
        borderRadius: 8,
    },
    buttonSave: {
        backgroundColor: '#4134e3',
    },
    buttonSaveText: {
        color: '#FFF',
        fontWeight: 'bold',
    },
});
