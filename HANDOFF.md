# NEXORA WEB — Prompt de Handoff

**Proyecto:** Landing page NEXORA AI STUDIO  
**Repo:** `NEXORA76/nexora-web` en GitHub  
**URL live:** [nexora76.github.io/nexora-web](https://nexora76.github.io/nexora-web/)  
**Deploy:** `git push origin main` → GitHub Pages se actualiza automáticamente  
**Token GitHub:** (guardado en memoria privada — no incluir en archivos públicos)  
**Archivos en:** `C:\Users\maria\PROYECTOS CLAUDE CODE\nexora-web\`

---

## Estado actual del sitio

- Cerebro 3D gira en loop continuo a 30fps (145 frames JPG), **independiente del scroll**
- Todo el sitio es **completamente transparente** — el cerebro se ve de fondo en todas las secciones
- Header transparente, sin borde, sin backdrop
- Píldoras/labels con **vidrio esmerilado** (backdrop-filter blur 20px + saturate 1.5) + borde cyan + glow
- Botones outline (`btn-outline`) con vidrio esmerilado + borde cyan + texto cyan
- Tarjetas de servicios transparentes con borde cyan y glow
- Textos de párrafos en color cyan
- Nav links del header en cyan
- Footer transparente con texto e iconos en cyan
- Stat labels (debajo de números) en cyan
- Hamburger menu mobile funcional
- Animaciones GSAP ScrollTrigger en secciones
- Dark overlay que aparece solo en sección de stats
- Sin botón de toggle dark/light mode (eliminado)

---

## Regla de oro de diseño NEXORA

**NUNCA** usar fondos sólidos oscuros (`#060d1a`, `rgba(255,255,255,0.05)`, etc.) en ningún elemento UI.  
Siempre: `background: transparent` (o `rgba(0,229,255,0.12)` para frosted glass) + borde cyan + glow.  
El cerebro animado debe verse de fondo en TODO el sitio.

---

## Stack técnico

- HTML/CSS/JS vanilla
- GSAP + ScrollTrigger (CDN)
- 145 frames JPG en `/frames/frame_0001.jpg` ... `frame_0145.jpg`
- Canvas fijo (`position: fixed; z-index: 1`) para el cerebro
- JS principal: `js/app.js`
- CSS principal: `css/style.css`
- Cache buster en `index.html`: `<link rel="stylesheet" href="css/style.css?v=32" />`

---

## Para deployar cambios

```bash
cd "C:\Users\maria\PROYECTOS CLAUDE CODE\nexora-web"
git add -A && git commit -m "mensaje" && git push https://TOKEN@github.com/NEXORA76/nexora-web.git main
```

**Importante:** Siempre subir el número del cache buster en `index.html` cuando se cambie el CSS, y verificar en modo incógnito.

---

## Elementos clave del CSS

| Elemento | Clase | Efecto |
|---|---|---|
| Píldoras/etiquetas | `.label` | Frosted glass + borde cyan |
| Botón WhatsApp / "Ver casos" | `.btn-outline` | Frosted glass + borde cyan + texto cyan |
| Tarjetas servicios | `.service-item` | Transparente + borde cyan + glow |
| Contenido secciones | `.section-content` | Transparente |
| Nav header | `.header-nav a` | Texto cyan |
| Párrafos secciones | `.scroll-section p` | Texto cyan |
| Labels stats | `.stat-label` | Texto cyan |
| Footer | `.site-footer` | Transparente + texto cyan |

---

## Pendientes / mejoras futuras

- [ ] Conectar botón "Agenda tu diagnóstico gratuito" a Calendly real
- [ ] Conectar botón "Escribinos por WhatsApp" al número real de Mariana
- [ ] Ajustar número de teléfono en `href="https://wa.me/5491100000000"`
- [ ] SEO: meta tags, og:image, descripción
- [ ] Logo más a la izquierda (pendiente confirmar posición final)
