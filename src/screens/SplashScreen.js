import React, { useEffect, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    StatusBar,
    Animated,
    TouchableOpacity,
    Dimensions,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { COLORS } from '../constants/colors';

const { width, height } = Dimensions.get('window');

export default function SplashScreen({ navigation }) {
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(40)).current;
    const iconScale = useRef(new Animated.Value(0.5)).current;
    const subtitleFade = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        // Staggered entrance animation
        Animated.sequence([
            Animated.parallel([
                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 800,
                    useNativeDriver: true,
                }),
                Animated.spring(iconScale, {
                    toValue: 1,
                    friction: 4,
                    tension: 40,
                    useNativeDriver: true,
                }),
            ]),
            Animated.parallel([
                Animated.timing(slideAnim, {
                    toValue: 0,
                    duration: 500,
                    useNativeDriver: true,
                }),
                Animated.timing(subtitleFade, {
                    toValue: 1,
                    duration: 600,
                    useNativeDriver: true,
                }),
            ]),
        ]).start();
    }, []);

    const handleContinue = () => {
        navigation.navigate('Calendar');
    };

    return (
        <TouchableOpacity
            style={styles.container}
            activeOpacity={1}
            onPress={handleContinue}
        >
            <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />

            {/* Decorative circles */}
            <View style={styles.circleTop} />
            <View style={styles.circleBottom} />

            {/* Logo & Icon */}
            <Animated.View
                style={[
                    styles.iconContainer,
                    {
                        opacity: fadeAnim,
                        transform: [{ scale: iconScale }],
                    },
                ]}
            >
                <MaterialIcons
                    name="health-and-safety"
                    size={100}
                    color={COLORS.textWhite}
                />
            </Animated.View>

            {/* Title */}
            <Animated.Text style={[styles.title, { opacity: fadeAnim }]}>
                KOLAYOSKOPİ
            </Animated.Text>

            {/* Subtitle */}
            <Animated.View
                style={[
                    styles.subtitleContainer,
                    {
                        opacity: subtitleFade,
                        transform: [{ translateY: slideAnim }],
                    },
                ]}
            >
                <View style={styles.divider} />
                <Text style={styles.subtitle}>Bağırsak Hazırlığı Eğitimi</Text>
                <View style={styles.divider} />
            </Animated.View>

            {/* Bottom hint */}
            <Animated.View style={[styles.bottomHint, { opacity: subtitleFade }]}>
                <Text style={styles.hintText}>Devam etmek için dokunun</Text>
                <MaterialIcons
                    name="touch-app"
                    size={22}
                    color="rgba(255,255,255,0.7)"
                />
            </Animated.View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.primary,
        alignItems: 'center',
        justifyContent: 'center',
    },
    circleTop: {
        position: 'absolute',
        top: -80,
        right: -80,
        width: 250,
        height: 250,
        borderRadius: 125,
        backgroundColor: 'rgba(255,255,255,0.06)',
    },
    circleBottom: {
        position: 'absolute',
        bottom: -100,
        left: -100,
        width: 300,
        height: 300,
        borderRadius: 150,
        backgroundColor: 'rgba(255,255,255,0.04)',
    },
    iconContainer: {
        marginBottom: 24,
        width: 140,
        height: 140,
        borderRadius: 70,
        backgroundColor: 'rgba(255,255,255,0.12)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 36,
        fontWeight: '800',
        color: COLORS.textWhite,
        letterSpacing: 4,
        marginBottom: 16,
    },
    subtitleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 8,
    },
    divider: {
        width: 30,
        height: 2,
        backgroundColor: 'rgba(255,255,255,0.4)',
        marginHorizontal: 12,
    },
    subtitle: {
        fontSize: 16,
        color: 'rgba(255,255,255,0.85)',
        fontWeight: '500',
        letterSpacing: 1,
    },
    bottomHint: {
        position: 'absolute',
        bottom: 60,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    hintText: {
        fontSize: 14,
        color: 'rgba(255,255,255,0.6)',
    },
});
