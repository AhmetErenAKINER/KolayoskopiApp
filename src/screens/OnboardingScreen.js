import React, { useState, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Animated,
    StatusBar,
    Dimensions,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { COLORS } from '../constants/colors';
import { KVKK_TEXT } from '../constants/data';

const { width } = Dimensions.get('window');

export default function OnboardingScreen({ navigation }) {
    const [accepted, setAccepted] = useState(false);
    const scaleAnim = useRef(new Animated.Value(1)).current;

    const handlePressIn = () => {
        Animated.spring(scaleAnim, {
            toValue: 0.95,
            useNativeDriver: true,
        }).start();
    };

    const handlePressOut = () => {
        Animated.spring(scaleAnim, {
            toValue: 1,
            friction: 3,
            useNativeDriver: true,
        }).start();
    };

    const handleContinue = () => {
        if (accepted) {
            navigation.navigate('Splash');
        }
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

            {/* Header */}
            <View style={styles.header}>
                <MaterialIcons name="privacy-tip" size={28} color={COLORS.primary} />
                <Text style={styles.headerTitle}>
                    Kişisel Verilerin Korunması Hakkında Bilgilendirme
                </Text>
            </View>

            {/* KVKK Content */}
            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.card}>
                    <Text style={styles.kvkkText}>{KVKK_TEXT}</Text>
                </View>
            </ScrollView>

            {/* Checkbox */}
            <TouchableOpacity
                style={styles.checkboxContainer}
                onPress={() => setAccepted(!accepted)}
                activeOpacity={0.7}
            >
                <View style={[styles.checkbox, accepted && styles.checkboxChecked]}>
                    {accepted && (
                        <MaterialIcons name="check" size={18} color={COLORS.textWhite} />
                    )}
                </View>
                <Text style={styles.checkboxLabel}>Okudum, onaylıyorum</Text>
            </TouchableOpacity>

            {/* Continue Button */}
            <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
                <TouchableOpacity
                    style={[styles.button, !accepted && styles.buttonDisabled]}
                    onPress={handleContinue}
                    onPressIn={handlePressIn}
                    onPressOut={handlePressOut}
                    disabled={!accepted}
                    activeOpacity={0.8}
                >
                    <Text style={styles.buttonText}>DEVAM</Text>
                    <MaterialIcons
                        name="arrow-forward"
                        size={20}
                        color={COLORS.textWhite}
                    />
                </TouchableOpacity>
            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
        paddingHorizontal: 24,
        paddingTop: 60,
        paddingBottom: 40,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        paddingHorizontal: 4,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: COLORS.primary,
        marginLeft: 10,
        flex: 1,
    },
    scrollView: {
        flex: 1,
        marginBottom: 20,
    },
    scrollContent: {
        paddingBottom: 10,
    },
    card: {
        backgroundColor: COLORS.surface,
        borderRadius: 16,
        padding: 20,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    kvkkText: {
        fontSize: 14,
        lineHeight: 22,
        color: COLORS.textPrimary,
        textAlign: 'justify',
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        paddingVertical: 12,
        paddingHorizontal: 8,
        backgroundColor: COLORS.surface,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    checkbox: {
        width: 26,
        height: 26,
        borderRadius: 6,
        borderWidth: 2,
        borderColor: COLORS.primary,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },
    checkboxChecked: {
        backgroundColor: COLORS.primary,
        borderColor: COLORS.primary,
    },
    checkboxLabel: {
        fontSize: 15,
        color: COLORS.textPrimary,
        fontWeight: '500',
    },
    button: {
        backgroundColor: COLORS.primary,
        paddingVertical: 16,
        borderRadius: 14,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        gap: 8,
        shadowColor: COLORS.shadow,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 6,
    },
    buttonDisabled: {
        backgroundColor: COLORS.disabled,
        elevation: 0,
        shadowOpacity: 0,
    },
    buttonText: {
        color: COLORS.textWhite,
        fontSize: 17,
        fontWeight: '700',
        letterSpacing: 1,
    },
});
