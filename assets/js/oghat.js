(function() {
            // دیتابیس اوقات شرعی
            const TIMES_DB = {
                mashhad: {
                    city: 'مشهد', fajr: '۰۴:۲۳', sunrise: '۰۵:۵۴', dhuhr: '۱۱:۴۲',
                    asr: '۱۵:۰۲', maghrib: '۱۷:۳۰', isha: '۱۸:۵۱',
                    gregorian: '۲۰۲۵-۰۲-۱۲', hijri: '۱۴۴۶-۰۸-۱۳'
                },
                tehran: {
                    city: 'تهران', fajr: '۰۵:۰۵', sunrise: '۰۶:۳۸', dhuhr: '۱۲:۱۵',
                    asr: '۱۵:۱۸', maghrib: '۱۷:۵۲', isha: '۱۹:۱۴',
                    gregorian: '۲۰۲۵-۰۲-۱۲', hijri: '۱۴۴۶-۰۸-۱۳'
                },
                isfahan: {
                    city: 'اصفهان', fajr: '۰۵:۱۰', sunrise: '۰۶:۴۰', dhuhr: '۱۲:۱۰',
                    asr: '۱۵:۱۰', maghrib: '۱۷:۴۰', isha: '۱۹:۰۲',
                    gregorian: '۲۰۲۵-۰۲-۱۲', hijri: '۱۴۴۶-۰۸-۱۳'
                },
                shiraz: {
                    city: 'شیراز', fajr: '۰۵:۰۲', sunrise: '۰۶:۳۲', dhuhr: '۱۲:۰۵',
                    asr: '۱۴:۵۸', maghrib: '۱۷:۳۸', isha: '۱۹:۰۰',
                    gregorian: '۲۰۲۵-۰۲-۱۲', hijri: '۱۴۴۶-۰۸-۱۳'
                },
                tabriz: {
                    city: 'تبریز', fajr: '۰۵:۲۸', sunrise: '۰۷:۰۲', dhuhr: '۱۲:۳۰',
                    asr: '۱۵:۲۲', maghrib: '۱۷:۵۸', isha: '۱۹:۲۲',
                    gregorian: '۲۰۲۵-۰۲-۱۲', hijri: '۱۴۴۶-۰۸-۱۳'
                },
                kerman: {
                    city: 'کرمان', fajr: '۰۴:۵۵', sunrise: '۰۶:۲۵', dhuhr: '۱۱:۵۵',
                    asr: '۱۴:۵۰', maghrib: '۱۷:۲۵', isha: '۱۸:۴۷',
                    gregorian: '۲۰۲۵-۰۲-۱۲', hijri: '۱۴۴۶-۰۸-۱۳'
                },
                rasht: {
                    city: 'رشت', fajr: '۰۵:۲۰', sunrise: '۰۶:۵۵', dhuhr: '۱۲:۲۲',
                    asr: '۱۵:۱۴', maghrib: '۱۷:۴۹', isha: '۱۹:۱۱',
                    gregorian: '۲۰۲۵-۰۲-۱۲', hijri: '۱۴۴۶-۰۸-۱۳'
                },
                yazd: {
                    city: 'یزد', fajr: '۰۵:۰۸', sunrise: '۰۶:۳۹', dhuhr: '۱۱:۵۸',
                    asr: '۱۴:۵۵', maghrib: '۱۷:۲۲', isha: '۱۸:۴۴',
                    gregorian: '۲۰۲۵-۰۲-۱۲', hijri: '۱۴۴۶-۰۸-۱۳'
                }
            };

            // المان‌ها
            const button = document.getElementById('prayerButton');
            const popup = document.getElementById('prayerPopup');
            const closeBtn = document.getElementById('closePopupBtn');
            const citySelect = document.getElementById('popupCitySelect');
            const gridEl = document.getElementById('popupPrayerGrid');
            const footerEl = document.getElementById('popupFooter');

            // تبدیل اعداد به فارسی
            function toPersian(num) {
                if (!num) return '';
                const p = '۰۱۲۳۴۵۶۷۸۹';
                return num.toString().replace(/\d/g, d => p[d]);
            }

            // ساخت آیتم پاپ‌آپ
            function createPopupItem(name, time, icon, period = '') {
                const item = document.createElement('div');
                item.className = 'popup-item';
                item.innerHTML = `
                    <div class="popup-item-name">
                        <span class="${icon}"></span> ${name}
                    </div>
                    <div class="popup-item-time">
                        ${toPersian(time)}
                        ${period ? `<span class="popup-period">${period}</span>` : ''}
                    </div>
                `;
                return item;
            }

            // بروزرسانی محتوای پاپ‌آپ
            function updatePopup(cityKey) {
                const d = TIMES_DB[cityKey] || TIMES_DB.mashhad;
                
                gridEl.innerHTML = '';

                const items = [
                    { name: 'صبح', time: d.fajr, icon: 'icon-fajr', period: 'فجر' },
                    { name: 'طلوع', time: d.sunrise, icon: 'icon-sunrise', period: '' },
                    { name: 'ظهر', time: d.dhuhr, icon: 'icon-dhuhr', period: 'ظهر' },
                    { name: 'عصر', time: d.asr, icon: 'icon-asr', period: 'عصر' },
                    { name: 'مغرب', time: d.maghrib, icon: 'icon-maghrib', period: 'مغرب' },
                    { name: 'عشاء', time: d.isha, icon: 'icon-ishaa', period: 'عشاء' }
                ];

                items.forEach(p => {
                    gridEl.appendChild(createPopupItem(p.name, p.time, p.icon, p.period));
                });

                footerEl.innerHTML = `
                    <span class="popup-date">📆 ${toPersian(d.gregorian)}</span>
                    <span class="popup-date">☪︎ ${toPersian(d.hijri)}</span>
                `;
            }

            // ===== کنترل نمایش پاپ‌آپ - فقط با کلیک =====
            
            // نمایش پاپ‌آپ
            function showPopup() {
                popup.classList.add('show');
                updatePopup(citySelect.value);
            }

            // مخفی کردن پاپ‌آپ
            function hidePopup() {
                popup.classList.remove('show');
            }

            // کلیک روی دکمه - باز و بسته کردن
            button.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                if (popup.classList.contains('show')) {
                    hidePopup();
                } else {
                    showPopup();
                }
            });

            // دکمه بستن
            closeBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                hidePopup();
            });

            // کلیک خارج از پاپ‌آپ و دکمه - بستن پاپ‌آپ
            document.addEventListener('click', function(e) {
                const wrapper = document.querySelector('.button-wrapper');
                if (!wrapper.contains(e.target)) {
                    hidePopup();
                }
            });

            // جلوگیری از بسته شدن هنگام کلیک داخل پاپ‌آپ
            popup.addEventListener('click', function(e) {
                e.stopPropagation();
            });

            // تغییر شهر
            citySelect.addEventListener('change', function(e) {
                updatePopup(e.target.value);
            });

            // مقدار اولیه
            updatePopup('mashhad');
        })();
