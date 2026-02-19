import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    SectionList,
    TouchableOpacity,
    ActivityIndicator,
    StatusBar,
    Dimensions,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { COLORS } from '../constants/colors';
import { INSTRUCTIONS, MEDICATION_INFO } from '../constants/data';

const { width } = Dimensions.get('window');

// Tarih formatlama
const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const [year, month, day] = dateStr.split('-');
    return `${day}/${month}/${year}`;
};

// Tarihten gün çıkarma
const subtractDays = (dateStr, days) => {
    const date = new Date(dateStr);
    date.setDate(date.getDate() - days);
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${d}/${m}/${y}`;
};

// Tek bir talimat öğesi
function InstructionItem({ item }) {
    const [expanded, setExpanded] = useState(false);

    return (
        <TouchableOpacity
            style={styles.instructionCard}
            activeOpacity={0.7}
            onPress={() => setExpanded(!expanded)}
        >
            <View style={styles.cardHeader}>
                <View style={styles.cardTitleRow}>
                    <Text style={styles.cardTitle}>{item.title}</Text>
                    <MaterialIcons
                        name={expanded ? 'expand-less' : 'expand-more'}
                        size={24}
                        color={COLORS.primary}
                    />
                </View>
                <Text style={styles.cardDescription}>{item.description}</Text>
            </View>

            {expanded && item.details && (
                <View style={styles.detailsContainer}>
                    {item.details.map((detail, index) => (
                        <View key={index} style={styles.detailRow}>
                            <MaterialIcons
                                name="fiber-manual-record"
                                size={8}
                                color={COLORS.primary}
                                style={styles.bullet}
                            />
                            <Text style={styles.detailText}>{detail}</Text>
                        </View>
                    ))}
                </View>
            )}
        </TouchableOpacity>
    );
}

// İlaç bilgi kartı
function MedicationCard({ med }) {
    return (
        <View style={styles.medCard}>
            <View style={styles.medIconContainer}>
                <MaterialIcons name={med.icon} size={22} color={COLORS.primary} />
            </View>
            <View style={styles.medContent}>
                <Text style={styles.medName}>{med.name}</Text>
                <Text style={styles.medDesc}>{med.description}</Text>
                <View style={styles.medWarningRow}>
                    <MaterialIcons name="warning-amber" size={14} color={COLORS.warning} />
                    <Text style={styles.medWarning}>{med.warning}</Text>
                </View>
            </View>
        </View>
    );
}

export default function InstructionsScreen({ route, navigation }) {
    const { selectedDate } = route.params;
    const [loading, setLoading] = useState(true);
    const [sections, setSections] = useState([]);

    useEffect(() => {
        // Simüle edilmiş yükleme
        const timer = setTimeout(() => {
            // Section verilerini hazırla
            const preparedSections = INSTRUCTIONS.map((instruction) => {
                let computedDate = '';
                if (instruction.period === 'İşlemden 3 Gün Önce') {
                    computedDate = subtractDays(selectedDate, 3);
                } else if (instruction.period === 'İşlemden 1 Gün Önce') {
                    computedDate = subtractDays(selectedDate, 1);
                } else if (instruction.period === 'İşlem Günü') {
                    computedDate = formatDate(selectedDate);
                }

                return {
                    id: instruction.id,
                    title: instruction.period,
                    icon: instruction.icon,
                    color: instruction.color,
                    date: computedDate,
                    data: instruction.items,
                };
            });

            setSections(preparedSections);
            setLoading(false);
        }, 1200);

        return () => clearTimeout(timer);
    }, [selectedDate]);

    // Section Header
    const renderSectionHeader = ({ section }) => (
        <View style={[styles.sectionHeader, { borderLeftColor: section.color }]}>
            <View style={styles.sectionHeaderLeft}>
                <MaterialIcons name={section.icon} size={22} color={section.color} />
                <Text style={styles.sectionTitle}>{section.title}</Text>
            </View>
            <View style={styles.dateBadge}>
                <Text style={styles.dateText}>{section.date}</Text>
            </View>
        </View>
    );

    // Empty State
    const renderEmpty = () => (
        <View style={styles.emptyState}>
            <MaterialIcons name="inbox" size={60} color={COLORS.disabled} />
            <Text style={styles.emptyTitle}>Talimat bulunamadı</Text>
            <Text style={styles.emptySubtitle}>
                Henüz görüntülenecek bir talimat yok.
            </Text>
        </View>
    );

    // Loading State
    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />
                <ActivityIndicator size="large" color={COLORS.primary} />
                <Text style={styles.loadingText}>Talimatlar yükleniyor...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={styles.backButton}
                >
                    <MaterialIcons name="arrow-back-ios" size={22} color={COLORS.primary} />
                </TouchableOpacity>
                <View style={styles.headerCenter}>
                    <Text style={styles.headerTitle}>Benim Kolonoskopim</Text>
                    <Text style={styles.headerSubtitle}>
                        İşlem Tarihi: {formatDate(selectedDate)}
                    </Text>
                </View>
                <MaterialIcons name="edit-note" size={26} color={COLORS.primary} />
            </View>

            {/* Medication Info */}
            <View style={styles.medSection}>
                <View style={styles.medSectionHeader}>
                    <MaterialIcons name="medication" size={20} color={COLORS.primary} />
                    <Text style={styles.medSectionTitle}>Kullandığım İlaçlar</Text>
                </View>
                {MEDICATION_INFO.map((med) => (
                    <MedicationCard key={med.id} med={med} />
                ))}
            </View>

            {/* Instructions List */}
            {sections.length === 0 ? (
                renderEmpty()
            ) : (
                <SectionList
                    sections={sections}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => <InstructionItem item={item} />}
                    renderSectionHeader={renderSectionHeader}
                    contentContainerStyle={styles.listContent}
                    showsVerticalScrollIndicator={false}
                    stickySectionHeadersEnabled={false}
                    ListFooterComponent={<View style={{ height: 30 }} />}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
        paddingTop: 50,
    },
    loadingContainer: {
        flex: 1,
        backgroundColor: COLORS.background,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 16,
    },
    loadingText: {
        fontSize: 16,
        color: COLORS.textSecondary,
        fontWeight: '500',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingBottom: 16,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border,
    },
    backButton: {
        padding: 4,
    },
    headerCenter: {
        flex: 1,
        marginLeft: 8,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: COLORS.textPrimary,
    },
    headerSubtitle: {
        fontSize: 13,
        color: COLORS.textSecondary,
        marginTop: 2,
    },
    medSection: {
        paddingHorizontal: 20,
        paddingVertical: 14,
        backgroundColor: COLORS.surface,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border,
    },
    medSectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginBottom: 10,
    },
    medSectionTitle: {
        fontSize: 15,
        fontWeight: '700',
        color: COLORS.textPrimary,
    },
    medCard: {
        flexDirection: 'row',
        backgroundColor: COLORS.background,
        borderRadius: 12,
        padding: 12,
        marginBottom: 8,
        borderWidth: 1,
        borderColor: COLORS.border,
        alignItems: 'flex-start',
    },
    medIconContainer: {
        width: 38,
        height: 38,
        borderRadius: 10,
        backgroundColor: COLORS.accent,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10,
    },
    medContent: {
        flex: 1,
    },
    medName: {
        fontSize: 14,
        fontWeight: '600',
        color: COLORS.textPrimary,
        marginBottom: 3,
    },
    medDesc: {
        fontSize: 12,
        color: COLORS.textSecondary,
        lineHeight: 17,
    },
    medWarningRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        marginTop: 6,
    },
    medWarning: {
        fontSize: 11,
        color: COLORS.warning,
        fontWeight: '500',
        flex: 1,
    },
    listContent: {
        paddingHorizontal: 20,
        paddingTop: 10,
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: COLORS.accent,
        paddingVertical: 12,
        paddingHorizontal: 14,
        borderRadius: 12,
        marginTop: 16,
        marginBottom: 8,
        borderLeftWidth: 4,
    },
    sectionHeaderLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: COLORS.textPrimary,
    },
    dateBadge: {
        backgroundColor: COLORS.primary,
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 8,
    },
    dateText: {
        fontSize: 12,
        fontWeight: '600',
        color: COLORS.textWhite,
    },
    instructionCard: {
        backgroundColor: COLORS.background,
        borderRadius: 14,
        padding: 16,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: COLORS.border,
        shadowColor: COLORS.shadow,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    cardHeader: {},
    cardTitleRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 6,
    },
    cardTitle: {
        fontSize: 15,
        fontWeight: '700',
        color: COLORS.primary,
        flex: 1,
    },
    cardDescription: {
        fontSize: 13,
        lineHeight: 20,
        color: COLORS.textSecondary,
    },
    detailsContainer: {
        marginTop: 12,
        paddingTop: 12,
        borderTopWidth: 1,
        borderTopColor: COLORS.border,
    },
    detailRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 8,
        paddingRight: 4,
    },
    bullet: {
        marginTop: 5,
        marginRight: 8,
    },
    detailText: {
        flex: 1,
        fontSize: 13,
        lineHeight: 19,
        color: COLORS.textPrimary,
    },
    emptyState: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 40,
    },
    emptyTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: COLORS.textPrimary,
        marginTop: 16,
    },
    emptySubtitle: {
        fontSize: 14,
        color: COLORS.textSecondary,
        textAlign: 'center',
        marginTop: 8,
    },
});
