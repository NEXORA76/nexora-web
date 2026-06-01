# NEXORA WEB — Estado del Proyecto & Prompt de Handoff
**Última actualización:** 2026-06-01

---

## 🔗 Links clave

| Recurso | URL / Path |
|---|---|
| Repo GitHub | `NEXORA76/nexora-web` |
| Landing live | https://nexora76.github.io/nexora-web/ |
| Archivos locales | `C:\Users\maria\PROYECTOS CLAUDE CODE\nexora-web\` |
| Deploy | `git push origin main` → GitHub Pages auto |

---

## 📁 Dashboards completados (todos live en GitHub Pages)

| Archivo | URL | Tema | Video |
|---|---|---|---|
| `dashboard-globo.html` | /dashboard-globo.html | Geopolítico / Comercio | `GLOBO MAPA.mp4` |
| `dashboard-poblacion.html` | /dashboard-poblacion.html | Demografía global | `GLOBO MAPA.mp4` |
| `dashboard-marino.html` | /dashboard-marino.html | Laboratorio marino | `video fondo marino.mp4` |
| `dashboard-buceo.html` | /dashboard-buceo.html | Centro de buceo | `FONDO MARINO 2.mp4` |
| `dashboard-clinica.html` | /dashboard-clinica.html | 🏥 Clínica / Lab | `VBRAIN VIDEO 4K.mp4` |
| `dashboard-finanzas.html` | /dashboard-finanzas.html | 💹 Finanzas / Contable | `VBRAIN VIDEO 4K.mp4` |
| `dashboard-hotel.html` | /dashboard-hotel.html | 🏨 Hotelería / Resort | `HOTELERIA, TURISMO INMOBILIARIA.mp4` |

---

## 🎨 Sistema de diseño unificado — OBLIGATORIO en todos los dashboards

### Layout grid
```css
grid-template-columns: 200px 200px 1fr 210px;
grid-template-rows: 1fr 1fr;
gap: 10px;
```

### Glass card (.gc)
```css
.gc {
  border-radius: 16px;
  background: rgba(4,10,24,0.18);   /* ← muy transparente, el video se ve */
  border: 1px solid rgba(0,212,255,0.16);
  box-shadow: inset 0 1px 0 rgba(255,255,255,0.07),
              inset 1px 0 0 rgba(0,212,255,0.08),
              0 8px 32px rgba(0,0,0,0.28);
}
/* Bisel top */
.gc::before { top:0; height:1px; background: gradient cyan horizontal }
/* Bisel left */
.gc::after  { left:0; width:1px; background: gradient cyan vertical }
```

### Video half-side (NO full screen)
```css
.video-bg video {
  position: absolute; right: -2%; top: 50%; width: 78%; height: auto;
  transform: translateY(-50%) translateZ(0);
}
/* Overlay gradiente izq→derecha, NO opaco */
.video-bg::after {
  background: linear-gradient(to right,
    rgba(bg,0.88) 0%, rgba(bg,0.72) 28%,
    rgba(bg,0.20) 52%, rgba(bg,0.00) 65%);
}
```

### LiquidFill — FIX staggered (siempre así, nunca simultáneo)
```javascript
setTimeout(()=>{ l1 = makeLiq('liq1', 0.xx, '#color'); }, 0);
setTimeout(()=>{ l2 = makeLiq('liq2', 0.xx, '#color'); }, 80);
setTimeout(()=>{ l3 = makeLiq('liq3', 0.xx, '#color'); }, 160);
setTimeout(()=>{ l4 = makeLiq('liq4', 0.xx, '#color'); }, 240);
```

### CDNs obligatorios
```html
<script src="https://cdn.jsdelivr.net/npm/echarts@5/dist/echarts.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/echarts-liquidfill@3.1.0/dist/echarts-liquidfill.min.js"></script>
```

### Helpers ECharts (copiar en cada dashboard)
```javascript
const glow = (c,b=12) => ({ shadowBlur:b, shadowColor:c, shadowOffsetX:0, shadowOffsetY:0 });
const FF = "'Space Grotesk',sans-serif";
const TT = {
  backgroundColor:'rgba(4,10,24,0.97)',
  borderColor:'rgba(0,212,255,0.28)', borderWidth:1,
  textStyle:{ color:'rgba(255,255,255,.88)', fontSize:11, fontFamily:FF },
  extraCssText:'border-radius:10px;padding:10px 14px;'
};
```

### Stat strip (pie de pantalla)
```html
<div class="stat-strip"> <!-- altura 34-36px, flex, gap:8px -->
  <div class="stat-chip"> <!-- flex:1, border gold/cyan, fondo 0.22 alpha -->
    <span class="dot-sm" style="background:#color; box-shadow:0 0 6px rgba(...)"></span>
    <strong>valor</strong> etiqueta
  </div>
</div>
```

---

## 📋 Colores por industria (acento principal → secundario)

| Industria | Color 1 | Color 2 | Borde glass |
|---|---|---|---|
| Marino / Lab | `#00d4ff` cyan | `#00ffcc` verde agua | `rgba(0,212,255,0.16)` |
| Clínica | `#00d4ff` + `#ff4d6d` rojo | `#a78bfa` púrpura | `rgba(0,212,255,0.16)` |
| Finanzas | `#ffd700` dorado | `#00ffcc` verde | `rgba(255,215,0,0.14)` |
| Hotel | `#f59e0b` ámbar | `#34d399` verde | `rgba(245,158,11,0.16)` |
| **Pendiente: Inmobiliaria** | `#10b981` esmeralda | `#00d4ff` cyan | — |
| **Pendiente: Retail** | `#f97316` naranja | `#a78bfa` púrpura | — |

---

## 📅 Plan de dashboards pendientes

| Día | Dashboard | Archivo sugerido | Video disponible |
|---|---|---|---|
| Miércoles | 🏗️ Inmobiliaria | `dashboard-inmobiliaria.html` | `HOTELERIA, TURISMO INMOBILIARIA.mp4` |
| Viernes | 🛒 Retail / Ventas | `dashboard-retail.html` | `VBRAIN VIDEO 4K.mp4` (con hue naranja) |
| Pendiente | Dashboard Cristian | `dashboard-cristian.html` | TBD — confirmar rubro |

---

## 🗂️ Videos disponibles localmente

```
GLOBO MAPA.mp4
video fondo marino.mp4
FONDO MARINO 2.mp4
VBRAIN VIDEO 4K.mp4
HOTELERIA, TURISMO INMOBILIARIA.mp4
AUDIO NEXORA WEB.mp4
VBRAIN VIDEO 4K.mp4
kling_20260529_*.mp4
```

---

## 🌐 Landing principal (index.html)

- Cerebro 3D animado (145 frames JPG en `/frames/`)
- Todo transparente — cerebro visible de fondo
- CSS: `css/style.css` — cache buster `?v=45`
- JS: `js/app.js`
- GSAP + ScrollTrigger
- Pendientes: Calendly real, WhatsApp real, SEO meta tags

---

## ⚙️ Regla de oro diseño NEXORA

> **NUNCA** fondos sólidos/oscuros en cards. Siempre `transparent` + borde cyan + glow.
> El video/fondo debe verse a través de todos los paneles.
> Las píldoras/labels SÍ pueden usar `#060d1a` sólido + borde cyan — aprobado.

---

## 🚀 Para deployar

```bash
cd "C:\Users\maria\PROYECTOS CLAUDE CODE\nexora-web"
git add archivo.html && git commit -m "mensaje" && git push
```

---

## 📌 Pendientes globales

- [ ] Dashboard Inmobiliaria (`dashboard-inmobiliaria.html`)
- [ ] Dashboard Retail/Ventas (`dashboard-retail.html`)
- [ ] Dashboard Cristian — confirmar rubro con Mariana
- [ ] Landing vitrina de demos (página con grid de todos los dashboards + pricing)
- [ ] AIDA pitch por industria (WhatsApp/LinkedIn copy)
- [ ] Workflow Captura Facturas n8n (`0pPRuk62L8pJkZdl`) — pendiente credenciales UI
- [ ] WhatsApp Business Cloud API — siguiente fase automatización
- [ ] Upgrade n8n Cloud (trial venciendo)
