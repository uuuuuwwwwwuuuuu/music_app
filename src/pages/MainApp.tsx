import { SafeAreaView, View, StyleSheet } from "react-native"
import { useAppSelector } from "../hooks";
import React from "react";
import RegPage from "./RegPage";

export default function MainApp() {
    const {colors} = useAppSelector(state => state.colors);

    const s = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: colors.bgMainColor
        },
        safeArea: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
        },
    });

    return (
        <View style={s.container}>
            <SafeAreaView style={s.safeArea}>
                <RegPage />
            </SafeAreaView>
        </View>
    )
}
