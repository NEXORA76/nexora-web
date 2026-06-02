# NEXORA WEB — Estado del Proyecto & Prompt de Handoff
**Última actualización:** 2026-06-01 (sesión 2)

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

| Archivo | URL | Tema | Fondo |
|---|---|---|---|
| `dashboard-globo.html` | /dashboard-globo.html | Geopolítico / Comercio | `GLOBO MAPA.mp4` |
| `dashboard-poblacion.html` | /dashboard-poblacion.html | Demografía global | `GLOBO MAPA.mp4` |
| `dashboard-marino.html` | /dashboard-marino.html | Laboratorio marino | `video fondo marino.mp4` |
| `dashboard-buceo.html` | /dashboard-buceo.html | Centro de buceo | `FONDO MARINO 2.mp4` |
| `dashboard-clinica.html` | /dashboard-clinica.html | 🏥 Clínica / Lab | `VBRAIN VIDEO 4K.mp4` |
| `dashboard-finanzas.html` | /dashboard-finanzas.html | 💹 Finanzas / Contable | `VBRAIN VIDEO 4K.mp4` |
| `dashboard-hotel.html` | /dashboard-hotel.html | 🏨 Hotelería / Resort | `HOTELERIA, TURISMO INMOBILIARIA.mp4` |
| `dashboard-acuario.html` | /dashboard-acuario.html | 🐠 Acuario | `video fondo marino.mp4` |
| `dashboard-smarthome.html` | /dashboard-smarthome.html | 🏠 Smart Home | `fondo-smart.jpg` (foto interior noche) |

---

## 🏠 dashboard-smarthome.html — Estado actual (APROBADO)

**Estructura:** sidebar izquierdo 210px + área principal con grid 3-col + columna derecha 220px

**Secciones:**
- Sidebar: NexHome logo, nav items con SVG icons, sección seguridad, usuario abajo
- Topbar: room tabs (Sala/Dormitorio/Cocina/Baño/Jardín), fecha, iconos campana/luna
- Grid: Clima & IA (luna en video), Cámara en Vivo (sofa-smart.webp), AC Gauge, Consumo Energético, Dispositivos (6 toggles), Estado del Hogar (4 LiquidFill)
- Stat strip: 7 chips con métricas

**Archivos de assets en carpeta nexora-web (con guiones, sin espacios):**
- `fondo-smart.jpg` — fondo interior nocturno lujoso
- `video-luna-smart.mp4` — video de la luna (en card Clima)
- `sofa-smart.webp` — imagen sala para CCTV
- `ac-smart.png`, `ac-smart-2.png` — (no usados, reemplazados por gauge ECharts)

**Colores smarthome:**
- Acento: `#00d4ff` cyan, `#34d399` verde, `#a78bfa` púrpura, `#fbbf24` ámbar
- Texto: `rgba(255,255,255,0.92)` / `0.60` / `0.38` (fondo oscuro → texto blanco)
- Bordes glass: `rgba(255,255,255,0.18-0.28)` BLANCO (no cyan)
- Cards: `rgba(200,210,225,0.08)` + `backdrop-filter:blur(10px)`
- LiquidFill background: `rgba(2,13,36,0.55)` oscuro

**Regla diseño smarthome:** El fondo (foto) es oscuro. Texto BLANCO, bordes BLANCOS. NO usar colores oscuros en texto ni bordes cyan — solo blanco translúcido.

---

## 🎨 Sistema de diseño unificado — OBLIGATORIO en todos los dashboards

### Glass card (.gc) — versión oscura (para fondos con video/foto oscura)
```css
.gc {
  border-radius: 16px;
  background: rgba(4,10,24,0.18);
  border: 1px solid rgba(255,255,255,0.18);   /* BLANCO, no cyan */
  box-shadow: inset 0 1px 0 rgba(255,255,255,0.10),
              0 8px 32px rgba(0,0,0,0.28);
  backdrop-filter: blur(10px);
}
/* Bisel top */
.gc::before { top:0; height:1px; background: linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent) }
/* Bisel left */
.gc::after  { left:0; width:1px; background: linear-gradient(180deg, transparent, rgba(255,255,255,0.15), transparent) }
```

### Video half-side (NO full screen) — dashboards con video de fondo
```css
.video-bg video {
  position: absolute; right: -2%; top: 50%; width: 78%; height: auto;
  transform: translateY(-50%) translateZ(0);
}
.video-bg::after {
  background: linear-gradient(to right,
    rgba(bg,0.88) 0%, rgba(bg,0.72) 28%,
    rgba(bg,0.20) 52%, rgba(bg,0.00) 65%);
}
```

### LiquidFill — FIX staggered (SIEMPRE así, nunca simultáneo)
```javascript
function makeLiq(id, val, color) {
  const c = echarts.init(document.getElementById(id), 'dark', {renderer:'canvas'});
  c.setOption({
    backgroundColor:'transparent',
    series:[{
      type:'liquidFill', radius:'88%', center:['50%','50%'],
      data:[val, val*0.9, val*0.8], color:[color],
      backgroundStyle:{ color:'rgba(2,13,36,0.50)', borderColor:color, borderWidth:1.5 },
      outline:{ borderDistance:2, itemStyle:{ borderWidth:2, borderColor:color, shadowBlur:10, shadowColor:color }},
      label:{ fontSize:13, fontFamily:FF, fontWeight:'700', color:'#fff', formatter:()=>Math.round(val*100)+'%' },
      waveAnimation:true, animationDuration:2000
    }]
  });
  return c;
}
setTimeout(()=>{ l1=makeLiq('liq1',0.xx,'#color'); },0);
setTimeout(()=>{ l2=makeLiq('liq2',0.xx,'#color'); },80);
setTimeout(()=>{ l3=makeLiq('liq3',0.xx,'#color'); },160);
setTimeout(()=>{ l4=makeLiq('liq4',0.xx,'#color'); },240);
```

**NOTA CRÍTICA:** `data` debe ser array simple `[val, val*0.9, val*0.8]`, NO objetos con LinearGradient. LiquidFill no soporta gradientes en data.

### CDNs obligatorios
```html
<script src="https://cdn.jsdelivr.net/npm/echarts@5/dist/echarts.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/echarts-liquidfill@3.1.0/dist/echarts-liquidfill.min.js"></script>
```

### Helpers ECharts
```javascript
const glow = (c,b=12) => ({ shadowBlur:b, shadowColor:c, shadowOffsetX:0, shadowOffsetY:0 });
const FF = "'Space Grotesk',sans-serif";
const TT = {
  backgroundColor:'rgba(4,10,24,0.97)',
  borderColor:'rgba(255,255,255,0.18)', borderWidth:1,
  textStyle:{ color:'rgba(255,255,255,.88)', fontSize:11, fontFamily:FF },
  extraCssText:'border-radius:10px;padding:10px 14px;'
};
```

### Stat strip (pie de pantalla)
```html
<div class="stat-strip"> <!-- altura 34-36px, flex, gap:8px -->
  <div class="stat-chip"> <!-- flex:1, border blanco, fondo ~0.06 alpha -->
    <span class="dot-sm" style="background:#color; box-shadow:0 0 6px rgba(...)"></span>
    <strong>valor</strong> etiqueta
  </div>
</div>
```

---

## 📋 Colores por industria

| Industria | Color 1 | Color 2 | Borde glass | Texto |
|---|---|---|---|---|
| Marino / Lab | `#00d4ff` cyan | `#00ffcc` verde agua | `rgba(255,255,255,0.18)` | blanco |
| Acuario | `#00d4ff` cyan | `#00ffcc` verde agua | `rgba(255,255,255,0.18)` | blanco |
| Clínica | `#00d4ff` + `#ff4d6d` rojo | `#a78bfa` púrpura | `rgba(255,255,255,0.18)` | blanco |
| Finanzas | `#ffd700` dorado | `#00ffcc` verde | `rgba(255,215,0,0.14)` | blanco |
| Hotel | `#f59e0b` ámbar | `#34d399` verde | `rgba(245,158,11,0.16)` | blanco |
| Smart Home | `#00d4ff` cyan | `#34d399` verde | `rgba(255,255,255,0.20)` | blanco |
| **Pendiente: Inmobiliaria** | `#10b981` esmeralda | `#00d4ff` cyan | `rgba(16,185,129,0.16)` | blanco |
| **Pendiente: Retail** | `#f97316` naranja | `#a78bfa` púrpura | `rgba(249,115,22,0.16)` | blanco |

---

## 📅 Plan de dashboards pendientes

| Prioridad | Dashboard | Archivo | Video / Fondo |
|---|---|---|---|
| 🔴 Siguiente | 🏗️ Inmobiliaria | `dashboard-inmobiliaria.html` | `HOTELERIA, TURISMO INMOBILIARIA.mp4` |
| 🟡 | 🛒 Retail / Ventas | `dashboard-retail.html` | `VBRAIN VIDEO 4K.mp4` (hue naranja) |
| 🟢 | Dashboard Cristian | `dashboard-cristian.html` | TBD — confirmar rubro |

---

## 🗂️ Videos / imágenes disponibles localmente

```
GLOBO MAPA.mp4
video fondo marino.mp4
FONDO MARINO 2.mp4
VBRAIN VIDEO 4K.mp4
HOTELERIA, TURISMO INMOBILIARIA.mp4
AUDIO NEXORA WEB.mp4
fondo-smart.jpg          ← interior nocturno lujoso (smarthome)
video-luna-smart.mp4     ← luna animada (smarthome)
sofa-smart.webp          ← sala lujosa (smarthome CCTV)
kling_20260529_*.mp4
```

**REGLA GITHUB PAGES:** Los nombres de archivo NO pueden tener espacios → siempre renombrar con guiones antes de push.

---

## 🌐 Landing principal (index.html)

- Cerebro 3D animado (145 frames JPG en `/frames/`)
- CSS: `css/style.css` — JS: `js/app.js`
- GSAP + ScrollTrigger
- Pendientes: Calendly real, WhatsApp real, SEO meta tags

---

## ⚙️ Reglas de oro diseño NEXORA

1. **NUNCA** fondos sólidos en cards — siempre `transparent` + borde + glow
2. El video/foto de fondo debe verse a través de todos los paneles
3. Texto SIEMPRE blanco (`rgba(255,255,255,0.92)`) — fondos son oscuros
4. Bordes: BLANCO translúcido (`rgba(255,255,255,0.18-0.28)`) — no cyan en estructura
5. Los dots de colores en stat-strip SÍ pueden ser cyan/verde/ámbar (son semánticos)
6. **Links SIEMPRE como markdown clickeable:** `[texto](url)` — NUNCA texto plano ni código
7. **Al crear/actualizar cualquier dashboard:** enviar link directo inmediatamente

---

## 🚀 Para deployar

```bash
cd "C:\Users\maria\PROYECTOS CLAUDE CODE\nexora-web"
git add archivo.html && git commit -m "mensaje" && git push
```

---

## 📌 Pendientes globales

- [ ] **Dashboard Inmobiliaria** (`dashboard-inmobiliaria.html`) — PRÓXIMO
- [ ] Dashboard Retail/Ventas (`dashboard-retail.html`)
- [ ] Dashboard Cristian — confirmar rubro con Mariana
- [ ] Landing vitrina de demos (grid todos los dashboards + pricing)
- [ ] AIDA pitch por industria (WhatsApp/LinkedIn copy)
- [ ] Workflow Captura Facturas n8n (`0pPRuk62L8pJkZdl`) — pendiente credenciales UI
- [ ] WhatsApp Business Cloud API — siguiente fase automatización
- [ ] Upgrade n8n Cloud (trial venciendo)
