import React from "react";
import { View, StyleSheet, Button, ToastAndroid } from "react-native";
import { signIn, getUserName } from "../../business/UserBus";

async function handlePress(navigation: any) {
    ToastAndroid.showWithGravity(
        "Connecting to Google",
        ToastAndroid.LONG,
        ToastAndroid.TOP
    );
    const signedIn = await signIn();
    if (signedIn) {
        let welcomeMsg = "Haere mai, " + getUserName();
        ToastAndroid.showWithGravity(
            welcomeMsg,
            ToastAndroid.LONG,
            ToastAndroid.TOP
        );
        navigation.navigate("Home"); //after Google login redirect to Home screen
    }
}

export default function LoginScreen({ navigation }: any) {
    return (
        <View style={styles.container}>
            <Button
                title="Login with Google"
                onPress={() => handlePress(navigation)}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
});
