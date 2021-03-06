import React, { useState, ReactText } from "react";
import { Button, ToastAndroid } from "react-native";
import { Picker } from "@react-native-community/picker";
import { getUserName, logout } from "../../business/UserBus";

export default function createHeaderRight() {
    const [headerState, setHeaderState] = useState(false);
    const [pickerVal, setPickerVal] = useState("");

    async function handleLogout(itemValue: ReactText) {
        if (itemValue === "logout") {
            const loggedOut = await logout();
            if (loggedOut) {
                /* change my state so that I am re-rendered */
                setHeaderState(!headerState);
                ToastAndroid.showWithGravity(
                    "Haere ra. You are logged out.",
                    ToastAndroid.LONG,
                    ToastAndroid.TOP
                );
            }
        }
    }

    return (navigation: any) => {
        let userName = getUserName();

        if (userName != null) {
            setPickerVal(userName);
            /* display as much of the user's name as poss without overlapping the page title */
            let pickerWidth = Math.min(160, userName.length * 13 + 60);
            return (
                <Picker
                    selectedValue={pickerVal}
                    style={{
                        height: 50,
                        width: pickerWidth,
                    }}
                    onValueChange={(itemValue) => {
                        handleLogout(itemValue);
                    }}
                >
                    <Picker.Item label={userName} value={userName} />
                    <Picker.Item label="Logout" value="logout" />
                </Picker>
            );
        } else {
            return (
                <Button
                    onPress={() => navigation.navigate("Login")}
                    title="Login"
                    color="#000"
                />
            );
        }
    };
}
