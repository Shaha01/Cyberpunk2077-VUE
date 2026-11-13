import { ref, computed } from 'vue'

let saved = null
try { saved = localStorage.getItem('lang') } catch (e) { saved = null }
export const lang = ref(saved || 'ru')
export const setLang = (l) => {
  lang.value = l
  document.documentElement.lang = l
  try { localStorage.setItem('lang', l) } catch (e) { /* ignore */ }
}

const dict = {
  ru: {
    nav: ['Лор', 'Районы', 'Персонажи', 'Хронология', 'Phantom Liberty', 'Играть'],
    boot: ['ИНИЦИАЛИЗАЦИЯ НЕЙРОИНТЕРФЕЙСА', 'ПОДКЛЮЧЕНИЕ К СЕТИ NIGHT CITY', 'ОБХОД ICE — BLACKWALL', 'ЗАГРУЗКА ПРОФИЛЯ: V'],
    skip: 'Нажми, чтобы пропустить',
    hero: { kicker: 'CD PROJEKT RED · 2020 · OPEN WORLD RPG', slogan: 'Wake the f*ck up,', slogan2: 'Samurai.', sub: 'Мы сожжём этот город дотла.', cta1: 'Войти в Night City', cta2: 'Хронология', scroll: 'Скролл' },
    hud: [['Год', '2077'], ['Город', 'NIGHT CITY'], ['Жанр', 'ACTION RPG'], ['Движок', 'REDENGINE 4']],
    lore: { tag: '// 01 — ЛОР', title: 'Город, который<br>не прощает.', p1: 'Night City — свободный город в Северной Калифорнии, построенный корпорацией и ставший её могилой. Здесь нет закона — есть деньги, импланты и те, кто готов за них убить.', p2: 'Ты — V, наёмник на пути к славе. Один заказ, один чип, и Джонни Сильверхенд навсегда поселяется у тебя в голове. Времени остаётся всё меньше.', facts: [['2020', 'год релиза'], ['6', 'районов'], ['25M+', 'проданных копий'], ['3', 'жизненных пути']] },
    districts: { tag: '// 02 — РАЙОНЫ', title: 'Неон. Дождь. Бетон.', items: [
      ['Watson', 'Бывший район корпораций, ныне кишащий бандами. Рынок Kabuki — здесь можно купить что угодно.', 'kabukicho'],
      ['City Center', 'Башни Arasaka и Militech. Стекло, сталь и власть над миллионами.', 'shibuya'],
      ['Japantown', 'Сердце уличной культуры: неон, лапша, голограммы.', 'shibuya-night'],
      ['Pacifica', 'Недостроенный курорт, ставший зоной войны Voodoo Boys.', 'tokyo'],
      ['Kowloon-стиль', 'Вертикальные трущобы без закона: мегаздания, склеенные из нищеты.', 'hk']] },
    chars: { tag: '// 03 — ПЕРСОНАЖИ', title: 'Легенды и монстры', items: [
      ['Johnny Silverhand', 'Рокербой, террорист, легенда. Играет Киану Ривз.', 'keanu'],
      ['Adam Smasher', 'Полностью киборгизированная машина убийства Arasaka.', 'smasher'],
      ['Samurai', 'Культовая группа Джонни — сердце бунтарского саундтрека.', 'samurai'],
      ['Street Kids', 'Дети улиц Night City — те, из кого вырастают V.', 'fanime']] },
    time: { tag: '// 04 — ХРОНОЛОГИЯ', title: 'Путь к 2077', items: [
      ['1988', 'Майк Пондсмит выпускает настольную игру Cyberpunk 2020.'],
      ['2012', 'CD Projekt Red анонсирует Cyberpunk 2077.'],
      ['2018', 'Первый геймплей-показ — 48 минут, взорвавшие интернет.'],
      ['2019', 'Киану Ривз выходит на сцену E3: «You\'re breathtaking!»'],
      ['2020', 'Релиз 10 декабря. Игра становится феноменом.'],
      ['2022', 'Аниме «Cyberpunk: Edgerunners» возрождает интерес.'],
      ['2023', 'Phantom Liberty и обновление 2.0 меняют игру.']] },
    pl: { tag: '// 05 — PHANTOM LIBERTY', title: 'Шпионский триллер в Dogtown', text: 'Самолёт президента США сбит над Night City. Тебе предстоит стать агентом и спасти нацию — ценой собственной свободы. Новый район Dogtown, Идрис Эльба в роли Соломона Рида и десятки часов нового контента.', cta: 'Узнать больше' },
    buy: { tag: '// 06 — ПОДКЛЮЧИСЬ', title: 'Доступно на всех платформах', btn: 'Играть сейчас' },
    foot: 'Фан-проект. Cyberpunk 2077 © CD PROJEKT RED. Фото: Wikimedia Commons (CC).',
    credit: 'Дизайн и разработка'
  },
  en: {
    nav: ['Lore', 'Districts', 'Characters', 'Timeline', 'Phantom Liberty', 'Play'],
    boot: ['INITIALIZING NEURAL INTERFACE', 'CONNECTING TO NIGHT CITY NET', 'BYPASSING ICE — BLACKWALL', 'LOADING PROFILE: V'],
    skip: 'Click to skip',
    hero: { kicker: 'CD PROJEKT RED · 2020 · OPEN WORLD RPG', slogan: 'Wake the f*ck up,', slogan2: 'Samurai.', sub: 'We have a city to burn.', cta1: 'Enter Night City', cta2: 'Timeline', scroll: 'Scroll' },
    hud: [['Year', '2077'], ['City', 'NIGHT CITY'], ['Genre', 'ACTION RPG'], ['Engine', 'REDENGINE 4']],
    lore: { tag: '// 01 — LORE', title: 'A city that<br>never forgives.', p1: 'Night City is a free city in Northern California, built by a corporation and become its grave. No law here — only money, chrome and people willing to kill for both.', p2: 'You are V, a mercenary chasing legend status. One job, one chip, and Johnny Silverhand moves into your head for good. The clock is ticking.', facts: [['2020', 'release year'], ['6', 'districts'], ['25M+', 'copies sold'], ['3', 'life paths']] },
    districts: { tag: '// 02 — DISTRICTS', title: 'Neon. Rain. Concrete.', items: [
      ['Watson', 'Former corporate zone, now crawling with gangs. Kabuki market sells anything.', 'kabukicho'],
      ['City Center', 'Arasaka and Militech towers. Glass, steel and power over millions.', 'shibuya'],
      ['Japantown', 'Heart of street culture: neon, noodles, holograms.', 'shibuya-night'],
      ['Pacifica', 'An unfinished resort turned Voodoo Boys war zone.', 'tokyo'],
      ['Kowloon-style', 'Vertical slums without law: megabuildings stitched from poverty.', 'hk']] },
    chars: { tag: '// 03 — CHARACTERS', title: 'Legends and monsters', items: [
      ['Johnny Silverhand', 'Rockerboy, terrorist, legend. Played by Keanu Reeves.', 'keanu'],
      ['Adam Smasher', 'Arasaka\'s fully cyborgized killing machine.', 'smasher'],
      ['Samurai', 'Johnny\'s iconic band — the heart of the rebel soundtrack.', 'samurai'],
      ['Street Kids', 'Kids of Night City — the ones V grows out of.', 'fanime']] },
    time: { tag: '// 04 — TIMELINE', title: 'The road to 2077', items: [
      ['1988', 'Mike Pondsmith releases the tabletop game Cyberpunk 2020.'],
      ['2012', 'CD Projekt Red announces Cyberpunk 2077.'],
      ['2018', 'First gameplay reveal — 48 minutes that broke the internet.'],
      ['2019', 'Keanu Reeves takes the E3 stage: "You\'re breathtaking!"'],
      ['2020', 'Released December 10. The game becomes a phenomenon.'],
      ['2022', 'Anime "Cyberpunk: Edgerunners" revives interest.'],
      ['2023', 'Phantom Liberty and Update 2.0 change the game.']] },
    pl: { tag: '// 05 — PHANTOM LIBERTY', title: 'A spy thriller in Dogtown', text: 'The US president\'s plane is shot down over Night City. Become an agent and save the nation — at the price of your own freedom. New district Dogtown, Idris Elba as Solomon Reed and dozens of hours of content.', cta: 'Learn more' },
    buy: { tag: '// 06 — JACK IN', title: 'Available on all platforms', btn: 'Play now' },
    foot: 'Fan project. Cyberpunk 2077 © CD PROJEKT RED. Photos: Wikimedia Commons (CC).',
    credit: 'Design & development'
  },
  uz: {
    nav: ['Lor', 'Tumanlar', 'Qahramonlar', 'Xronologiya', 'Phantom Liberty', 'O\'ynash'],
    boot: ['NEYROINTERFEYS ISHGA TUSHMOQDA', 'NIGHT CITY TARMOG\'IGA ULANISH', 'ICE NI AYLANIB O\'TISH — BLACKWALL', 'PROFIL YUKLANMOQDA: V'],
    skip: 'O\'tkazib yuborish uchun bosing',
    hero: { kicker: 'CD PROJEKT RED · 2020 · OCHIQ DUNYO RPG', slogan: 'Wake the f*ck up,', slogan2: 'Samurai.', sub: 'Bu shaharni yoqib yuboramiz.', cta1: 'Night City ga kirish', cta2: 'Xronologiya', scroll: 'Pastga' },
    hud: [['Yil', '2077'], ['Shahar', 'NIGHT CITY'], ['Janr', 'ACTION RPG'], ['Dvigatel', 'REDENGINE 4']],
    lore: { tag: '// 01 — LOR', title: 'Kechirmaydigan<br>shahar.', p1: 'Night City — Shimoliy Kaliforniyadagi erkin shahar. Uni korporatsiya qurdi va o\'zi uchun qabrga aylantirdi. Bu yerda qonun yo\'q — pul, implantlar va ular uchun o\'ldirishga tayyor odamlar bor.', p2: 'Sen V — shon-shuhrat sari yo\'ldagi yollanma jangchisan. Bitta buyurtma, bitta chip — va Jonni Silverhand abadiy boshingga joylashadi. Vaqt tugab bormoqda.', facts: [['2020', 'chiqish yili'], ['6', 'tuman'], ['25M+', 'sotilgan nusxa'], ['3', 'hayot yo\'li']] },
    districts: { tag: '// 02 — TUMANLAR', title: 'Neon. Yomg\'ir. Beton.', items: [
      ['Watson', 'Sobiq korporativ hudud, endi to\'dalar makoni. Kabuki bozorida hamma narsa topiladi.', 'kabukicho'],
      ['City Center', 'Arasaka va Militech minoralari. Shisha, po\'lat va millionlar ustidan hokimiyat.', 'shibuya'],
      ['Japantown', 'Ko\'cha madaniyati yuragi: neon, lag\'mon, gologrammalar.', 'shibuya-night'],
      ['Pacifica', 'Tugallanmagan kurort, Voodoo Boys urush zonasiga aylangan.', 'tokyo'],
      ['Kowloon uslubi', 'Qonunsiz vertikal xaroblar: qashshoqlikdan yopishtirilgan megabinolar.', 'hk']] },
    chars: { tag: '// 03 — QAHRAMONLAR', title: 'Afsonalar va yirtqichlar', items: [
      ['Johnny Silverhand', 'Rokerboy, terrorist, afsona. Rolni Kianu Rivz o\'ynaydi.', 'keanu'],
      ['Adam Smasher', 'Arasaka ning to\'liq kiborglashtirilgan qotil mashinasi.', 'smasher'],
      ['Samurai', 'Jonni ning mashhur guruhi — isyonkor saundtrek yuragi.', 'samurai'],
      ['Street Kids', 'Night City ko\'cha bolalari — V ular orasidan chiqadi.', 'fanime']] },
    time: { tag: '// 04 — XRONOLOGIYA', title: '2077 sari yo\'l', items: [
      ['1988', 'Mayk Pondsmit Cyberpunk 2020 stol o\'yinini chiqaradi.'],
      ['2012', 'CD Projekt Red Cyberpunk 2077 ni e\'lon qiladi.'],
      ['2018', 'Birinchi gameplay — internetni larzaga solgan 48 daqiqa.'],
      ['2019', 'Kianu Rivz E3 sahnasida: «You\'re breathtaking!»'],
      ['2020', '10-dekabrda chiqdi. O\'yin hodisaga aylandi.'],
      ['2022', '«Cyberpunk: Edgerunners» animesi qiziqishni qaytardi.'],
      ['2023', 'Phantom Liberty va 2.0 yangilanishi o\'yinni o\'zgartirdi.']] },
    pl: { tag: '// 05 — PHANTOM LIBERTY', title: 'Dogtown dagi josuslik trilleri', text: 'AQSH prezidentining samolyoti Night City ustida urib tushirildi. Agent bo\'l va xalqni qutqar — o\'z erkinliging evaziga. Yangi Dogtown tumani, Solomon Rid rolida Idris Elba va o\'nlab soat yangi kontent.', cta: 'Batafsil' },
    buy: { tag: '// 06 — ULAN', title: 'Barcha platformalarda mavjud', btn: 'Hozir o\'ynash' },
    foot: 'Muxlis loyiha. Cyberpunk 2077 © CD PROJEKT RED. Rasmlar: Wikimedia Commons (CC).',
    credit: 'Dizayn va dasturlash'
  }
}

export const t = computed(() => dict[lang.value])
