import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import React from 'react';

const Loading = () => {
    return (
        <View style={styles.page}>
            <ActivityIndicator size="large" color={'#55D6FB'} />
            <Text style={styles.text}>Sedang Menguhubungkan Ke Server</Text>
        </View>
    );
};

export default Loading;

const styles = StyleSheet.create({
    page: {
        flex: 1,
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',

    },
    text: {
        fontSize: 18,
        color: 'black',
        marginTop: 16,
    },
});
