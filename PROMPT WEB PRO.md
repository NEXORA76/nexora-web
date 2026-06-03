# PROMPT WEB PRO — Landing Page Premium
### Estilo NEXORA Pro Max | Nivel Agencia de Lujo

> Última actualización: junio 2026
> Caso de uso original: Big Home (bighome.cl) — Administración de condominios Chile
> Aplicable a: cualquier landing corporativa premium

---

## PROMPT COMPLETO

```
Crea una landing page PREMIUM para Big Home, empresa de administración 
de condominios en Chile. Nivel agencia de lujo. HTML + CSS + JS vanilla.

━━━ IDENTIDAD VISUAL ━━━
Paleta:
  --navy-deep:    #0A1628   (fondo hero oscuro)
  --navy-mid:     #112240   (secciones alternadas)
  --gold:         #C9A84C   (acento premium, CTAs)
  --gold-light:   #E8C97A   (hover, glow)
  --white:        #F8F9FF   (textos principales)
  --gray-soft:    #8892A4   (textos secundarios)
  --glass-bg:     rgba(255,255,255,0.06)
  --glass-border: rgba(201,168,76,0.25)

Tipografía (Google Fonts):
  Headings: "Playfair Display" — weight 700, italic para énfasis
  Body:     "Inter"           — weight 300/400/500
  H1: clamp(48px, 6vw, 80px) | H2: 42px | H3: 24px | Body: 17px
  letter-spacing headings: -0.02em | line-height body: 1.7

━━━ FONDO: VIDEO HERO ━━━
<video autoplay muted loop playsinline> detrás del hero.
Usar video de drone sobre edificios/ciudad nocturna de Santiago.
Fallback: imagen de condominio moderno.
Overlay DOBLE encima del video:
  Layer 1: linear-gradient(180deg, rgba(10,22,40,0.55) 0%, rgba(10,22,40,0.85) 100%)
  Layer 2: radial-gradient(ellipse at 30% 50%, rgba(201,168,76,0.08) 0%, transparent 60%)
El video corre al 100% viewport height, object-fit: cover.
Video se pausa automáticamente si prefers-reduced-motion.

━━━ NAVBAR ━━━
Posición: fixed top-0, z-index 1000.
Estado inicial: background transparent, sin sombra.
Al scroll >80px: 
  background: rgba(10,22,40,0.92)
  backdrop-filter: blur(20px) saturate(180%)
  border-bottom: 1px solid rgba(201,168,76,0.15)
  box-shadow: 0 4px 30px rgba(0,0,0,0.3)
  Transición: all 0.4s cubic-bezier(0.4, 0, 0.2, 1)
Logo izquierda. Links centro con hover underline dorado animado
(::after pseudo-element que crece de 0% a 100% width, 0.3s ease).
CTA botón derecha (ver especificación botones abajo).
Menú hamburger en mobile con animación X → ☰.

━━━ SCROLL EFFECTS — PARALLAX ━━━
Implementar con IntersectionObserver + requestAnimationFrame (NO jQuery):

1. PARALLAX VIDEO: el video se mueve translateY a 0.3x del scroll.
   window.addEventListener('scroll', () => {
     video.style.transform = `translateY(${scrollY * 0.3}px)`
   }, { passive: true })

2. PARALLAX SECTIONS: imágenes internas se mueven a 0.15x del scroll.

3. FADE-IN STAGGERED: cada sección tiene clase .reveal.
   Al entrar en viewport: opacity 0 → 1, translateY(40px) → 0.
   Duración: 0.7s ease-out. Stagger entre hijos: 0.1s delay incremental.
   
4. COUNTER ANIMATION: números en stats (ej: "500+ comunidades")
   cuentan desde 0 hasta el valor cuando entran al viewport.
   easing: easeOutExpo, duración 2s.

5. HORIZONTAL SCROLL SECTION (partners/logos):
   Cinta que se mueve horizontalmente automático, pausa on hover.
   CSS animation: translateX infinito, 20s linear.

━━━ BOTONES — 3 ESTILOS INTERACTIVOS ━━━

BOTÓN PRIMARIO (gold filled):
  background: linear-gradient(135deg, #C9A84C 0%, #E8C97A 50%, #C9A84C 100%)
  background-size: 200% 200%
  color: #0A1628
  font-weight: 600
  padding: 16px 36px
  border-radius: 4px
  border: none
  letter-spacing: 0.08em
  text-transform: uppercase
  font-size: 13px
  position: relative
  overflow: hidden
  transition: all 0.4s ease
  
  ::before (shine sweep):
    content: ''
    position: absolute
    top: -50% left: -75%
    width: 50% height: 200%
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)
    transform: skewX(-20deg)
    transition: left 0.6s ease
    
  :hover:
    background-position: right center
    box-shadow: 0 8px 30px rgba(201,168,76,0.4), 0 0 0 1px rgba(201,168,76,0.3)
    transform: translateY(-2px)
    ::before { left: 150% }  ← shine sweep cross
    
  :active: transform: translateY(0), scale(0.98)

BOTÓN SECUNDARIO (ghost dorado):
  background: transparent
  border: 1px solid rgba(201,168,76,0.5)
  color: #E8C97A
  padding: 15px 35px
  border-radius: 4px
  
  :hover:
    background: rgba(201,168,76,0.1)
    border-color: #C9A84C
    box-shadow: 0 0 20px rgba(201,168,76,0.15), inset 0 0 20px rgba(201,168,76,0.05)

BOTÓN GHOST BLANCO (navbar):
  border: 1px solid rgba(255,255,255,0.3)
  color: white
  padding: 12px 28px
  border-radius: 4px
  backdrop-filter: blur(10px)
  :hover: border-color white, background rgba(255,255,255,0.1)

━━━ SECCIONES EN ORDEN ━━━

1. HERO (100vh, video fondo)
   Contenido centrado verticalmente con flexbox.
   Tag pill arriba: "Miembro AGACECH" — glassmorphism pill dorada.
   H1: "Gestionamos tu Comunidad con<br><em>Eficiencia y Transparencia</em>"
   Subtítulo: 18px, color gray-soft, max-width 520px.
   2 botones en row con gap 16px.
   Scroll indicator: flecha bounce animada abajo del hero.
   Partículas flotantes sutiles (10-15 puntos dorados, opacity 0.3,
   animación float con keyframes aleatorios, CSS puro).

2. STATS BAR (full-width, glass sobre navy)
   4 stats en grid: "500+ Comunidades" | "15+ Años" | "98% Satisfacción" | "24/7 Soporte"
   Separadores verticales dorados. Números con counter animation.
   Background: rgba(255,255,255,0.04), backdrop-filter: blur(10px)
   border-top y border-bottom: 1px solid rgba(201,168,76,0.15)

3. DIFERENCIADORES (3 columnas, fondo navy-mid)
   Cards glassmorphism:
     background: rgba(255,255,255,0.04)
     border: 1px solid rgba(201,168,76,0.15)
     border-radius: 12px
     padding: 40px 32px
     backdrop-filter: blur(10px)
     transition: all 0.4s ease
     :hover:
       background: rgba(201,168,76,0.06)
       border-color: rgba(201,168,76,0.4)
       transform: translateY(-8px)
       box-shadow: 0 20px 60px rgba(0,0,0,0.3), 0 0 0 1px rgba(201,168,76,0.2)
   Ícono SVG dorado 48px arriba de cada card.
   Línea decorativa dorada 2px x 40px debajo del ícono.

4. POR QUÉ ELEGIRNOS (2 col: texto + imagen con parallax)
   Imagen derecha con clip-path diagonal:
     clip-path: polygon(8% 0, 100% 0, 100% 100%, 0% 100%)
   Imagen tiene overlay gradient dorado sutil.
   Lista de puntos con ícono check dorado SVG.
   Línea decorativa vertical dorada izquierda de la lista.

5. SERVICIOS (grid 3x2, fondo navy-deep)
   Cards con número grande dorado (01, 02...) semitransparente de fondo.
   Hover: borde dorado que "dibuja" el borde:
     ::before, ::after pseudo-elements que animan width/height 0→100%
     creando efecto de borde que se traza en hover (0.4s ease).
   Íconos SVG línea fina, dorados.

6. TESTIMONIOS (slider/carousel)
   3 testimonios con navegación dots dorados.
   Card con foto circular, borde dorado, cita con comillas tipográficas grandes.
   Auto-play cada 5s. Swipe en mobile (touch events).
   Transición: fade + slight translateX.

7. PARTNERS (cinta horizontal auto-scroll)
   Logos en escala de grises, :hover pasan a color original.
   filter: grayscale(100%) opacity(0.5) → filter: none en hover.
   Duplicar logos para loop infinito continuo.

8. BLOG (3 cards)
   Imagen con zoom en hover (overflow: hidden + transform: scale(1.05)).
   Tag categoría + fecha + título + excerpt + link.
   Border-bottom dorado que crece en hover.

9. CTA FINAL (sección impacto)
   Fondo: imagen de condominio con overlay navy 85%.
   Título grande centrado + subtítulo + botón primario.
   Partículas o líneas decorativas doradas en esquinas.

10. FOOTER
    Fondo: #060E1A (más oscuro que navy-deep).
    4 columnas. Logo + descripción breve + redes sociales.
    Separador: 1px solid rgba(201,168,76,0.1).
    Links con hover color dorado, transición 0.2s.
    Copyright bottom bar.

━━━ EFECTOS ADICIONALES PREMIUM ━━━

CURSOR PERSONALIZADO (desktop):
  Dot 8px dorado que sigue al cursor.
  Ring 32px que sigue con lag (lerp interpolation).
  En hover sobre links/botones: ring escala a 48px, color dorado sólido.

LÍNEAS DECORATIVAS:
  Secciones separadas por líneas SVG onduladas o diagonales
  en color rgba(201,168,76,0.1).

MAGNETIC BUTTONS:
  En botones CTA principales: el botón se "atrae" hacia el cursor
  hasta 15px cuando el mouse está cerca.
  Implementar con mousemove + getBoundingClientRect + transform.

SMOOTH SCROLL:
  html { scroll-behavior: smooth }
  + JavaScript para easing personalizado en links ancla.

LOADING SCREEN (opcional):
  Overlay negro con logo que fade-out al cargar.
  Duración máxima: 1.5s.

━━━ RESPONSIVE ━━━
Breakpoints: 375px | 768px | 1024px | 1440px
Mobile: navbar → hamburger, grid 3col → 1col, video hero mantiene.
Tablet: grid 3col → 2col.
Touch: parallax y cursor custom desactivados, touch events para slider.

━━━ PERFORMANCE ━━━
- Video con poster (imagen estática mientras carga)
- Intersection Observer para activar animaciones (no scroll listener masivo)
- CSS transforms y opacity ÚNICAMENTE para animaciones (GPU)
- Font preload en <head>
- Imágenes en WebP con fallback JPG
- prefers-reduced-motion: todas las animaciones se desactivan

━━━ DATOS DE LA EMPRESA (reemplazar según cliente) ━━━
Nombre: Big Home
Rubro: Administración de condominios y comunidades residenciales, Chile
Tagline: "Gestionamos tu Comunidad con Eficiencia y Transparencia"
Teléfono: +56 9 9549 0169
Dirección: Titan 4880, Estación Central, RM, Chile
Asociación: Miembro AGACECH
Redes: Facebook, Instagram, LinkedIn
Servicios: Administración Integral | Presupuestos | Mantenimiento |
           Personal/Conserjería | Asesoría Legal | Cobranzas
```

---

## Cómo adaptar a otro cliente

1. Cambiar paleta de colores (navy + gold → colores corporativos del cliente)
2. Reemplazar sección "Datos de la empresa" con info del cliente
3. Ajustar número de servicios y stats
4. Cambiar video fondo según rubro (drone ciudad, oficinas, industria, etc.)
5. Ajustar tipografía si el cliente tiene identidad más moderna (ej: Inter + Space Grotesk)
