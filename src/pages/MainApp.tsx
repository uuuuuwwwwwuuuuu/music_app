import { SafeAreaView, View, StyleSheet, Text, Pressable } from "react-native"
import { useAppSelector } from "../hooks";

import Logo from '../components/logo';
import { SmallNote } from "../components/notes";
import { BlurView } from "expo-blur";

export default function MainApp() {
    const {colors, fonts} = useAppSelector(state => state.colors);

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
        logoWrapper: {
            justifyContent: 'center',
            alignItems: 'center',
            left: 2,
            
        },
        buttonsWrapper: {
            position: 'absolute',
            bottom: 65,
            left: '50%',
            marginLeft: -125,
        },
        accentBtn: {
            width: 250,
            height: 55,
            backgroundColor: colors.accent,
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 20
        },
        simpleBtn: {
            width: 250,
            height: 55,
            borderWidth: 1,
            borderColor: colors.contentMain,
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center',
        },
        text: {
            fontSize: 18,
            fontFamily: fonts.rubicB,
            color: colors.contentMain
        },
        note1: {
            position: 'absolute',
            top: 55,
            left: 30,
            transform: [{scale: 0.75}, {rotate: '-17deg'}],
            
        }
    });


    return (
        <View style={s.container}>
            <SafeAreaView style={s.safeArea}>
                <View style={s.logoWrapper}>
                    <Logo />
                </View>
                <View style={s.buttonsWrapper}>
                    <Pressable style={s.accentBtn}>
                        <Text style={s.text}>Войти</Text>
                    </Pressable>
                    <Pressable style={s.simpleBtn}>
                        <Text style={s.text}>Зарегистироваться</Text>
                    </Pressable>
                </View>
                <SmallNote style={s.note1} />
            </SafeAreaView>
        </View>
    )
}
