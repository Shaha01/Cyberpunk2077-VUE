<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue'
import { t, lang, setLang } from './i18n'

const base = import.meta.env.BASE_URL
const img = (n) => `${base}img/${n}.jpg`

const ids = ['lore', 'districts', 'chars', 'time', 'pl', 'buy']
const booting = ref(true)
const bootPct = ref(0)
const bootStep = ref(0)
const menu = ref(false)
const scrolled = ref(false)
const progress = ref(0)
const active = ref('')
const cursor = ref({ x: -100, y: -100, big: false, on: false })
const heroY = ref(0)
const lightbox = ref(null)
const langs = ['ru', 'en', 'uz']
const platforms = ['PC', 'PS5', 'XBOX', 'GEFORCE NOW']

let bootTimer = null
let io = null
let counterIO = null

function finishBoot() {
  if (!booting.value) return
  clearInterval(bootTimer)
  bootPct.value = 100
  setTimeout(() => { booting.value = false; nextTick(initObservers) }, 350)
}

function onScroll() {
  const y = window.scrollY
  const h = document.documentElement.scrollHeight - window.innerHeight
  scrolled.value = y > 40
  progress.value = h > 0 ? (y / h) * 100 : 0
  heroY.value = Math.min(y, 900) * 0.35
  let cur = ''
  for (const id of ids) {
    const el = document.getElementById(id)
    if (el && el.getBoundingClientRect().top < window.innerHeight * 0.4) cur = id
  }
  active.value = cur
}

function onMove(e) {
  cursor.value.x = e.clientX
  cursor.value.y = e.clientY
  cursor.value.on = true
  cursor.value.big = !!e.target.closest('a,button,[data-hover]')
}

function onKey(e) { if (e.key === 'Escape') { lightbox.value = null; menu.value = false } }

function go(id) {
  menu.value = false
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

function countUp(el) {
  const raw = el.dataset.v
  const m = raw.match(/^(\d+)(.*)$/)
  if (!m) return
  const end = +m[1]
  const suffix = m[2]
  const start = performance.now()
  const step = (now) => {
    const k = Math.min((now - start) / 1400, 1)
    el.textContent = Math.round(end * (1 - Math.pow(1 - k, 3))) + suffix
    if (k < 1) requestAnimationFrame(step)
  }
  requestAnimationFrame(step)
}

function initObservers() {
  io?.disconnect()
  counterIO?.disconnect()
  io = new IntersectionObserver((es) => es.forEach((e) => {
    if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target) }
  }), { threshold: 0.12 })
  document.querySelectorAll('.reveal').forEach((el) => io.observe(el))
  counterIO = new IntersectionObserver((es) => es.forEach((e) => {
    if (e.isIntersecting) { countUp(e.target); counterIO.unobserve(e.target) }
  }), { threshold: 0.6 })
  document.querySelectorAll('[data-v]').forEach((el) => counterIO.observe(el))
}

onMounted(() => {
  document.documentElement.lang = lang.value
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('mousemove', onMove, { passive: true })
  window.addEventListener('keydown', onKey)
  bootTimer = setInterval(() => {
    bootPct.value = Math.min(100, bootPct.value + 2 + Math.random() * 5)
    bootStep.value = Math.min(3, Math.floor(bootPct.value / 26))
    if (bootPct.value >= 100) finishBoot()
  }, 90)
})

onBeforeUnmount(() => {
  clearInterval(bootTimer)
  io?.disconnect()
  counterIO?.disconnect()
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('mousemove', onMove)
  window.removeEventListener('keydown', onKey)
})
</script>

<template>
  <!-- BOOT -->
  <div v-if="booting" class="boot" @click="finishBoot">
    <div class="boot__logo glitch" data-text="CYBERPUNK">CYBERPUNK</div>
    <div class="boot__year">2077</div>
    <div class="boot__bar"><span :style="{ width: bootPct + '%' }"></span></div>
    <div class="boot__log mono">
      <p v-for="(l, i) in t.boot" :key="i" :class="{ done: i < bootStep, cur: i === bootStep }">&gt; {{ l }}<b v-if="i < bootStep"> [OK]</b></p>
    </div>
    <div class="boot__pct mono">{{ Math.floor(bootPct) }}%</div>
    <p class="boot__skip mono">{{ t.skip }}</p>
  </div>

  <div class="fx scan" aria-hidden="true"></div>
  <div class="fx grain" aria-hidden="true"></div>
  <div class="progress" aria-hidden="true"><span :style="{ height: progress + '%' }"></span></div>
  <div class="cursor" :class="{ on: cursor.on, big: cursor.big }" :style="{ transform: `translate(${cursor.x}px, ${cursor.y}px)` }" aria-hidden="true">
    <i></i><i></i><i></i><i></i><b></b>
  </div>

  <!-- NAV -->
  <header class="nav" :class="{ solid: scrolled }">
    <a href="#" class="logo" @click.prevent="go('top')"><span>CYBER</span>PUNK<em>2077</em></a>
    <nav class="nav__links" :class="{ open: menu }">
      <a v-for="(n, i) in t.nav.slice(0, 5)" :key="n" href="#" :class="{ on: active === ids[i] }" @click.prevent="go(ids[i])">{{ n }}</a>
      <a href="#" class="nav__play" @click.prevent="go('buy')">{{ t.nav[5] }}</a>
    </nav>
    <div class="lang">
      <button v-for="l in langs" :key="l" :class="{ on: lang === l }" @click="setLang(l)">{{ l.toUpperCase() }}</button>
    </div>
    <button class="burger" :class="{ open: menu }" aria-label="Menu" @click="menu = !menu"><span></span><span></span></button>
  </header>

  <main id="top">
    <!-- HERO -->
    <section class="hero">
      <div class="hero__bg" :style="{ backgroundImage: `url(${img('kabukicho')})`, transform: `translateY(${heroY}px) scale(1.1)` }"></div>
      <div class="hero__shade"></div>
      <div class="hero__inner wrap">
        <p class="mono hero__kicker">{{ t.hero.kicker }}</p>
        <h1 class="hero__title">
          <span class="glitch" :data-text="t.hero.slogan">{{ t.hero.slogan }}</span>
          <span class="glitch y" :data-text="t.hero.slogan2">{{ t.hero.slogan2 }}</span>
        </h1>
        <p class="hero__sub">{{ t.hero.sub }}</p>
        <div class="hero__cta">
          <a href="#" class="btn btn--y" @click.prevent="go('lore')">{{ t.hero.cta1 }}</a>
          <a href="#" class="btn btn--c" @click.prevent="go('time')">{{ t.hero.cta2 }}</a>
        </div>
      </div>
      <div class="hud wrap mono">
        <div v-for="h in t.hud" :key="h[0]"><span>{{ h[0] }}</span><b>{{ h[1] }}</b></div>
        <a href="#" class="hud__scroll" @click.prevent="go('lore')">{{ t.hero.scroll }} <i></i></a>
      </div>
    </section>

    <!-- MARQUEE -->
    <div class="marquee" aria-hidden="true">
      <div class="marquee__track">
        <span v-for="n in 2" :key="n">NIGHT CITY ◆ ARASAKA ◆ MILITECH ◆ BLACKWALL ◆ AFTERLIFE ◆ SAMURAI ◆ NETRUNNER ◆ PHANTOM LIBERTY ◆ </span>
      </div>
    </div>

    <!-- LORE -->
    <section id="lore" class="sec wrap">
      <p class="tag mono reveal">{{ t.lore.tag }}</p>
      <div class="lore">
        <div>
          <h2 class="h2 reveal" v-html="t.lore.title"></h2>
          <p class="reveal">{{ t.lore.p1 }}</p>
          <p class="reveal">{{ t.lore.p2 }}</p>
        </div>
        <figure class="frame reveal" data-hover @click="lightbox = 'logo'">
          <img :src="img('logo')" alt="Cyberpunk 2077 logo" loading="lazy">
          <figcaption class="mono">NC-2077 // ARCHIVE</figcaption>
        </figure>
      </div>
      <div class="facts">
        <div v-for="f in t.lore.facts" :key="f[1]" class="fact reveal">
          <b :data-v="f[0]">{{ f[0] }}</b><span>{{ f[1] }}</span>
        </div>
      </div>
    </section>

    <!-- DISTRICTS -->
    <section id="districts" class="sec">
      <div class="wrap">
        <p class="tag mono reveal">{{ t.districts.tag }}</p>
        <h2 class="h2 reveal">{{ t.districts.title }}</h2>
      </div>
      <div class="rail">
        <article v-for="(d, i) in t.districts.items" :key="d[0]" class="card reveal" data-hover @click="lightbox = d[2]">
          <img :src="img(d[2])" :alt="d[0]" loading="lazy">
          <div class="card__txt">
            <span class="mono">0{{ i + 1 }}</span>
            <h3>{{ d[0] }}</h3>
            <p>{{ d[1] }}</p>
          </div>
        </article>
      </div>
    </section>

    <!-- CHARACTERS -->
    <section id="chars" class="sec wrap">
      <p class="tag mono reveal">{{ t.chars.tag }}</p>
      <h2 class="h2 reveal">{{ t.chars.title }}</h2>
      <div class="chars">
        <article v-for="(c, i) in t.chars.items" :key="c[0]" class="char reveal" :style="{ transitionDelay: i * 70 + 'ms' }" data-hover @click="lightbox = c[2]">
          <img :src="img(c[2])" :alt="c[0]" loading="lazy">
          <div class="char__info">
            <h3>{{ c[0] }}</h3>
            <p>{{ c[1] }}</p>
          </div>
        </article>
      </div>
    </section>

    <!-- TIMELINE -->
    <section id="time" class="sec wrap">
      <p class="tag mono reveal">{{ t.time.tag }}</p>
      <h2 class="h2 reveal">{{ t.time.title }}</h2>
      <ol class="tl">
        <li v-for="e in t.time.items" :key="e[0]" class="reveal">
          <b class="mono">{{ e[0] }}</b>
          <p>{{ e[1] }}</p>
        </li>
      </ol>
    </section>

    <!-- PHANTOM LIBERTY -->
    <section id="pl" class="pl">
      <div class="pl__bg" :style="{ backgroundImage: `url(${img('shibuya')})` }"></div>
      <div class="pl__shade"></div>
      <div class="wrap pl__in">
        <p class="tag mono reveal">{{ t.pl.tag }}</p>
        <h2 class="h2 reveal">{{ t.pl.title }}</h2>
        <p class="reveal pl__text">{{ t.pl.text }}</p>
        <a class="btn btn--c reveal" href="https://www.cyberpunk.net/en/phantom-liberty" target="_blank" rel="noopener">{{ t.pl.cta }}</a>
      </div>
    </section>

    <!-- BUY -->
    <section id="buy" class="sec wrap buy">
      <p class="tag mono reveal">{{ t.buy.tag }}</p>
      <h2 class="h2 reveal">{{ t.buy.title }}</h2>
      <div class="plats">
        <span v-for="p in platforms" :key="p" class="plat reveal">{{ p }}</span>
      </div>
      <a class="btn btn--y btn--xl reveal" href="https://www.cyberpunk.net/" target="_blank" rel="noopener">{{ t.buy.btn }}</a>
    </section>
  </main>

  <footer class="foot">
    <div class="wrap foot__in">
      <a href="#" class="logo" @click.prevent="go('top')"><span>CYBER</span>PUNK<em>2077</em></a>
      <p class="mono">{{ t.foot }}</p>
    </div>
  </footer>

  <!-- LIGHTBOX -->
  <div v-if="lightbox" class="lb" @click="lightbox = null">
    <img :src="img(lightbox)" alt="">
    <button aria-label="Close">✕</button>
  </div>
</template>
