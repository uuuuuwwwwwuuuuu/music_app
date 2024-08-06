import { View, StyleSheet, Text, TouchableWithoutFeedback, Image } from "react-native"
import { useAppSelector } from "../hooks";

import Animated, {
    withSpring, withTiming, useSharedValue, useAnimatedStyle
} from "react-native-reanimated";

import Logo from '../components/logo';
import React, { useEffect, useState } from "react";
import { Gyroscope } from "expo-sensors";

export default function RegPage() {
    const {colors, fonts} = useAppSelector(state => state.colors);
    const [gyroData, setGyroData] = useState({x: 0, y: 0});
    const gyroIndex = 1.5;

    const [regState, setRegState] = useState<'idle' | 'reg' | 'auth'>('idle')

    useEffect(() => {
        const subscription = Gyroscope.addListener(data => {
            setGyroData(data)
        })

        return () => {
            subscription.remove()
        }
    }, []);

    //Animations

    const BUTTONS = {
        opacity: useSharedValue(1)
    }

    const AButtonsWrapper = useAnimatedStyle(() => ({
        opacity: withTiming(BUTTONS.opacity.value, {duration: 1000})
    }))

    useEffect(() => {
        if (regState !== 'idle') {
            BUTTONS.opacity.value = 0
        }
    }, [regState]);

    // ___ Animations

    const s = StyleSheet.create({
        logoWrapper: {
            justifyContent: 'center',
            alignItems: 'center',
            left: 2,
            zIndex: 2
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
            zIndex: 1,
            transform: [{scale: 1.2}, {rotate: '-17deg'}, {translateX: gyroData.x * gyroIndex}, {translateY: gyroData.y * gyroIndex}],
            top: 85,
            left: 45,
            width: 83,
            height: 133,
        },
        note2: {
            position: 'absolute',
            zIndex: 1,
            transform: [{scale: 1.3}, {rotate: '7deg'}, {translateX: gyroData.x * gyroIndex}, {translateY: gyroData.y * -gyroIndex}],
            top: 45,
            right: -45,
            width: 189,
            height: 222
        },
        note3: {
            position: 'absolute',
            zIndex: 1,
            transform: [{scale: 1}, {rotate: '-48deg'}, {translateX: gyroData.x * -gyroIndex}, {translateY: gyroData.y * gyroIndex}],
            bottom: 310,
            left: -45,
            width: 189,
            height: 222
        },
        note4: {
            position: 'absolute',
            zIndex: 3,
            transform: [{scale: 2.2}, {rotate: '37deg'}, {translateX: gyroData.x * -gyroIndex}, {translateY: gyroData.y * -gyroIndex}],
            bottom: 250,
            right: 100,
            width: 83,
            height: 133,
        }
    });

    return (
        <>
            <View style={s.logoWrapper}>
                <Logo />
            </View>
            <Animated.View style={[s.buttonsWrapper, AButtonsWrapper]}>
                <TouchableWithoutFeedback onPress={() => setRegState('auth')} >
                    <View style={s.accentBtn}>
                        <Text style={s.text}>Войти</Text>
                    </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => setRegState('reg')}>
                    <View style={s.simpleBtn}>
                        <Text style={s.text}>Зарегистироваться</Text>                        
                    </View>
                </TouchableWithoutFeedback>
            </Animated.View>
            <Image source={require('../../assets/SmallNote.png')} blurRadius={8} style={s.note1} />
            <Image source={require('../../assets/BigNote.png')} blurRadius={5} style={s.note2} />
            <Image source={require('../../assets/BigNote.png')} blurRadius={3} style={s.note3} />
            <Image source={require('../../assets/SmallNote.png')} blurRadius={5} style={s.note4} />
        </>
    )
}