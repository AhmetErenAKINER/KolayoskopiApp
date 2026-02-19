// src/constants/data.js
// Kolonoskopi hazırlık talimatları, yasaklı besinler ve ilaç kullanım bilgileri

export const INSTRUCTIONS = [
    {
        id: '1',
        period: 'İşlemden 3 Gün Önce',
        icon: 'event-note',
        color: '#0B666A',
        items: [
            {
                id: '1-1',
                title: 'Tüketilmesi Yasak Besinler',
                description:
                    'Aşağıdaki besinleri tüketmeyiniz:',
                details: [
                    'Meyve ve sebzeler (çiğ veya pişmiş)',
                    'Kırmızı et ve işlenmiş et ürünleri',
                    'Tam tahıllı ekmek, makarna, pirinç',
                    'Kuruyemiş, kuru fasulye, nohut gibi baklagiller',
                    'Çekirdekli meyve suları (karpuz, nar, üzüm)',
                    'Süt ve süt ürünleri (yoğurt, peynir, tereyağı)',
                    'Gazlı içecekler ve alkol',
                ],
            },
            {
                id: '1-2',
                title: 'Tüketilebilecek Besinler',
                description:
                    'Sadece aşağıdaki besinleri tüketebilirsiniz:',
                details: [
                    'Beyaz ekmek (kepeksiz)',
                    'Haşlanmış tavuk veya balık',
                    'Şehriye çorbası (süzme)',
                    'Meyve suyu (posasız, berrak)',
                    'Açık renkli çay',
                    'Bal veya şeker',
                ],
            },
        ],
    },
    {
        id: '2',
        period: 'İşlemden 1 Gün Önce',
        icon: 'local-drink',
        color: '#14919B',
        items: [
            {
                id: '2-1',
                title: 'Sıvı Diyet',
                description:
                    'Sadece et suyu, tavuk suyu, elma suyu, arıtılmış suyu gibi berrak sıvı tüketebilirsiniz.',
                details: [
                    'Katı gıda yemeyiniz',
                    'Bol su için (en az 2 litre)',
                    'Berrak meyve suları tüketebilirsiniz',
                    'Kırmızı veya mor renkli sıvılar tüketmeyiniz',
                ],
            },
            {
                id: '2-2',
                title: 'Bağırsak Temizliği İlacı',
                description:
                    'Doktorunuzun reçete ettiği bağırsak temizleme ilacını kullanmaya başlayınız.',
                details: [
                    'Saat 14:00 — Phospho Soda katı/sıvı birinci şişeyi içmeye başlayınız',
                    'Saat 16:00 — Phospho Soda katı/sıvı ikinci şişeyi içmeye başlayınız',
                    'İlacı soğuk su veya limonata ile karıştırarak içebilirsiniz',
                    'İlaç sonrası bol su tüketiniz',
                ],
            },
        ],
    },
    {
        id: '3',
        period: 'İşlem Günü',
        icon: 'medical-services',
        color: '#0B666A',
        items: [
            {
                id: '3-1',
                title: 'İşlem Sabahı',
                description:
                    'İşlem sabahı saat 07:00\'da lavmanınızı uygulayınız. 15 dakika tuttuktan sonra tuvalete gidebilirsiniz.',
                details: [
                    'En az 6 saat öncesinden itibaren hiçbir şey yemeyiniz ve içmeyiniz',
                    'Sadece bir yudum su ile düzenli ilaçlarınızı alabilirsiniz',
                    'Rahat kıyafetler giyiniz',
                    'Yanınızda bir refakatçi bulundurunuz',
                    'Değerli eşyalarınızı evde bırakınız',
                ],
            },
            {
                id: '3-2',
                title: 'İşlem Sonrası',
                description:
                    'İşlem sonrası dikkat edilmesi gereken hususlar:',
                details: [
                    'İşlem sonrası 24 saat araç kullanmayınız',
                    'İlk 24 saat hafif gıdalarla besleniniz',
                    'Karın ağrısı veya şişkinlik hissi normal olabilir',
                    'Kanama veya şiddetli ağrı durumunda hekiminize başvurunuz',
                ],
            },
        ],
    },
];

export const FORBIDDEN_FOODS = [
    { id: 'f1', name: 'Meyve ve Sebzeler', icon: 'restaurant' },
    { id: 'f2', name: 'Kırmızı Et', icon: 'restaurant' },
    { id: 'f3', name: 'Baklagiller', icon: 'grain' },
    { id: 'f4', name: 'Süt Ürünleri', icon: 'local-cafe' },
    { id: 'f5', name: 'Tam Tahıllı Ürünler', icon: 'bakery-dining' },
    { id: 'f6', name: 'Gazlı İçecekler', icon: 'local-bar' },
    { id: 'f7', name: 'Alkol', icon: 'local-bar' },
    { id: 'f8', name: 'Kuruyemiş', icon: 'eco' },
];

export const MEDICATION_INFO = [
    {
        id: 'm1',
        name: 'Kan Sulandırıcılar',
        description: 'Aspirin, Coumadin vb. - Şeker Hastalığı İlaçları, Tansiyon (Doktorunuza Sorunuz)',
        warning: 'İşlemden 5-7 gün önce doktorunuza danışarak bırakınız.',
        icon: 'healing',
    },
    {
        id: 'm2',
        name: 'Demir Preparatları',
        description: 'Demir içeren ilaç ve takviyeler.',
        warning: 'İşlemden 5 gün önce bırakınız.',
        icon: 'medication',
    },
    {
        id: 'm3',
        name: 'Diyabet İlaçları',
        description: 'İnsülin ve oral antidiyabetik ilaçlar.',
        warning: 'İşlem günü sabahı almayınız, doktorunuza danışınız.',
        icon: 'monitor-heart',
    },
];

export const KVKK_TEXT = `Bu Aydınlatma Metni, 6698 sayılı Kişisel Verilerin Korunması Kanunu'nun "Veri Sorumlusunun Aydınlatma Yükümlülüğü" kenar başlıklı 10 uncu maddesi ve aynı Kanun'un veri sorumlusu olan İÜ-C Florence Nightingale Hemşirelik Fakültesi, Cerrahi Hastalıkları Hemşireliği Anabilim Dalı'nda görevli Arş. Gör. Kübra ŞENGÖR tarafından Bağırsak Hazırlığı Eğitimi Mobil Uygulaması kullanıcılarına, kullanıcılar ile kişisel verileri hususunda bilgilendirme yapmak amacıyla hazırlanmıştır.

Tarafınıza Gönüllü Onam metniyle kişisel sağlık verilerinizin işlenmesine ilişkin gerekli bilgilendirme yapılmıştır. Bu uygulamada ad-soyad kişisel verileriniz işlenmekte olup, telefonunuzdaki fotoğraflara, kişilere, mesajlara, konum bilgisine ve diğer kişisel bilgilere erişim sağlanmayacağı bildirilmiştir.

Bu çalışma, işlendiği belirtilen kişisel verilerin; araştırma sürecine ilişkin faaliyetlerin konusu amaçla sınırlı olarak işlenmekte olup kişisel verileriniz bilimsel araştırma ile ilişkili tüm hakları kullanarak işlenecek ve güvenli bir ortamda olacaktır.`;
