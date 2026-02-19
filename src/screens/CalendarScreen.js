import React, { useState, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Animated,
    StatusBar,
    Dimensions,
} from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { MaterialIcons } from '@expo/vector-icons';
import { COLORS } from '../constants/colors';

const { width } = Dimensions.get('window');

// Türkçe takvim ayarları
LocaleConfig.locales['tr'] = {
    monthNames: [
        'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
        'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık',
    ],
    monthNamesShort: [
        'Oca', 'Şub', 'Mar', 'Nis', 'May', 'Haz',
        'Tem', 'Ağu', 'Eyl', 'Eki', 'Kas', 'Ara',
    ],
    dayNames: [
        'Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi',
    ],
    dayNamesShort: ['Paz', 'Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt'],
    today: 'Bugün',
};
LocaleConfig.defaultLocale = 'tr';

export default function CalendarScreen({ navigation }) {
    const [selectedDate, setSelectedDate] = useState('');
    const scaleAnim = useRef(new Animated.Value(1)).current;

    const handlePressIn = () => {
        Animated.spring(scaleAnim, { toValue: 0.95, useNativeDriver: true }).start();
    };

    const handlePressOut = () => {
        Animated.spring(scaleAnim, { toValue: 1, friction: 3, useNativeDriver: true }).start();
    };

    const handleContinue = () => {
        if (selectedDate) {
            navigation.navigate('Instructions', { selectedDate });
        }
    };

    const formatDate = (dateStr) => {
        if (!dateStr) return '';
        const [year, month, day] = dateStr.split('-');
        return `${day}/${month}/${year}`;
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

            {/* Header */}
            <View style={styles.header}>
                <MaterialIcons name="event" size={30} color={COLORS.primary} />
                <Text style={styles.headerTitle}>Kolonoskopi Tarihim</Text>
            </View>

            {/* Info Card */}
            <View style={styles.infoCard}>
                <MaterialIcons name="info-outline" size={22} color={COLORS.primary} />
                <Text style={styles.infoText}>
                    Size gerekli hatırlatmaları yapabilmemiz için, lütfen aşağıdaki
                    takvimden planlanan Kolonoskopi tarihinizi seçiniz.
                </Text>
            </View>

            {/* Calendar */}
            <View style={styles.calendarContainer}>
                <Calendar
                    onDayPress={(day) => setSelectedDate(day.dateString)}
                    markedDates={{
                        [selectedDate]: {
                            selected: true,
                            selectedColor: COLORS.primary,
                            selectedTextColor: COLORS.textWhite,
                        },
                    }}
                    minDate={new Date().toISOString().split('T')[0]}
                    theme={{
                        backgroundColor: COLORS.background,
                        calendarBackground: COLORS.background,
                        textSectionTitleColor: COLORS.textSecondary,
                        selectedDayBackgroundColor: COLORS.primary,
                        selectedDayTextColor: COLORS.textWhite,
                        todayTextColor: COLORS.primaryLight,
                        dayTextColor: COLORS.textPrimary,
                        textDisabledColor: COLORS.disabled,
                        dotColor: COLORS.primary,
                        arrowColor: COLORS.primary,
                        monthTextColor: COLORS.primary,
                        textMonthFontWeight: '700',
                        textMonthFontSize: 18,
                        textDayFontSize: 15,
                        textDayHeaderFontSize: 13,
                        textDayHeaderFontWeight: '600',
                    }}
                    style={styles.calendar}
                />
            </View>

            {/* Selected Date Display */}
            {selectedDate ? (
                <View style={styles.selectedContainer}>
                    <MaterialIcons name="check-circle" size={22} color={COLORS.success} />
                    <Text style={styles.selectedText}>
                        Seçilen Tarih:{' '}
                        <Text style={styles.selectedDate}>{formatDate(selectedDate)}</Text>
                    </Text>
                </View>
            ) : null}

            {/* Continue Button */}
            <Animated.View
                style={[styles.buttonWrapper, { transform: [{ scale: scaleAnim }] }]}
            >
                <TouchableOpacity
                    style={[styles.button, !selectedDate && styles.buttonDisabled]}
                    onPress={handleContinue}
                    onPressIn={handlePressIn}
                    onPressOut={handlePressOut}
                    disabled={!selectedDate}
                    activeOpacity={0.8}
                >
                    <Text style={styles.buttonText}>TAKVİM</Text>
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
        paddingHorizontal: 20,
        paddingTop: 60,
        paddingBottom: 30,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: '700',
        color: COLORS.primary,
        marginLeft: 10,
    },
    infoCard: {
        flexDirection: 'row',
        backgroundColor: COLORS.accent,
        borderRadius: 14,
        padding: 16,
        marginBottom: 20,
        alignItems: 'flex-start',
        gap: 10,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    infoText: {
        flex: 1,
        fontSize: 14,
        lineHeight: 21,
        color: COLORS.textPrimary,
    },
    calendarContainer: {
        borderRadius: 16,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: COLORS.border,
        backgroundColor: COLORS.background,
        shadowColor: COLORS.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 3,
        marginBottom: 16,
    },
    calendar: {
        borderRadius: 16,
        paddingBottom: 10,
    },
    selectedContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.surface,
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 12,
        marginBottom: 16,
        gap: 8,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    selectedText: {
        fontSize: 15,
        color: COLORS.textPrimary,
    },
    selectedDate: {
        fontWeight: '700',
        color: COLORS.primary,
    },
    buttonWrapper: {
        marginTop: 'auto',
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
