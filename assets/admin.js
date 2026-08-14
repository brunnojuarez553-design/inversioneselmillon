const INVENTORY_KEY = 'inversionesElMillonInventory';
const INVENTORY_VERSION_KEY = 'inversionesElMillonInventoryVersion';
const INVENTORY_VERSION = 'inversiones-el-millon-v14-platform-pro';
const FALLBACK_IMAGE = 'assets/vehicle-placeholder.svg';
const ANALYTICS_KEY = 'inversionesElMillonVehicleAnalytics';
const LEADS_KEY = 'inversionesElMillonLeads';
const FINANCE_REQUESTS_KEY = 'inversionesElMillonFinanceRequests';
const ACTIVITY_KEY = 'inversionesElMillonActivity';
const WHATSAPP_TEAM_KEY = 'inversionesElMillonWhatsappTeam';
const WHATSAPP_ROTATION_KEY = 'inversionesElMillonWhatsappRotation';
const DEFAULT_WHATSAPP_TEAM = [
  { id:'wa1', name:'Asesor principal', role:'Ventas', specialty:'general', phone:'18094128551', active:true },
  { id:'wa2', name:'Asesor 2', role:'Ventas', specialty:'general', phone:'', active:false },
  { id:'wa3', name:'Asesor financiamiento', role:'Financiamiento', specialty:'finance', phone:'', active:false }
];
function loadWhatsappTeam(){try{const x=JSON.parse(localStorage.getItem(WHATSAPP_TEAM_KEY)||'[]');return Array.isArray(x)&&x.length?x:structuredClone(DEFAULT_WHATSAPP_TEAM)}catch(_){return structuredClone(DEFAULT_WHATSAPP_TEAM)}}
function saveWhatsappTeam(team){localStorage.setItem(WHATSAPP_TEAM_KEY,JSON.stringify(team));localStorage.setItem(WHATSAPP_ROTATION_KEY,'{}')}

const ANALYTICS_SEED = {
  iem1: { views: 241, whatsappClicks: 24, financeClicks: 9 },
  iem2: { views: 94, whatsappClicks: 6, financeClicks: 3 },
  iem3: { views: 286, whatsappClicks: 18, financeClicks: 12 },
  iem4: { views: 63, whatsappClicks: 4, financeClicks: 2 },
  iem5: { views: 118, whatsappClicks: 7, financeClicks: 4 },
  iem6: { views: 176, whatsappClicks: 11, financeClicks: 6 },
  iem7: { views: 82, whatsappClicks: 5, financeClicks: 2 }
};

function loadVehicleAnalytics() {
  try {
    const stored = JSON.parse(localStorage.getItem(ANALYTICS_KEY) || '{}');
    return Object.keys(stored).length ? stored : structuredClone(ANALYTICS_SEED);
  } catch (_) {
    return structuredClone(ANALYTICS_SEED);
  }
}

function renderVehicleAnalytics() {
  const analytics = loadVehicleAnalytics();
  const rows = inventory.map(vehicle => {
    const data = analytics[vehicle.id] || { views:0, whatsappClicks:0, financeClicks:0 };
    const rate = data.views ? (data.whatsappClicks / data.views) * 100 : 0;
    return { vehicle, ...data, rate };
  }).sort((a,b) => b.whatsappClicks - a.whatsappClicks || b.views - a.views);

  const totalViews = rows.reduce((sum,row) => sum + row.views, 0);
  const totalWhatsapp = rows.reduce((sum,row) => sum + row.whatsappClicks, 0);
  const totalFinance = rows.reduce((sum,row) => sum + row.financeClicks, 0);
  const totalRate = totalViews ? (totalWhatsapp / totalViews) * 100 : 0;
  const leader = rows[0];

  const viewsEl = document.getElementById('analyticsTotalViews');
  const whatsappEl = document.getElementById('analyticsTotalWhatsapp');
  const financeEl = document.getElementById('analyticsTotalFinance');
  const rateEl = document.getElementById('analyticsWhatsappRate');
  const topEl = document.getElementById('analyticsTopVehicle');
  const ranking = document.getElementById('vehicleClickRanking');

  if (viewsEl) viewsEl.textContent = totalViews.toLocaleString('es-DO');
  if (whatsappEl) whatsappEl.textContent = totalWhatsapp.toLocaleString('es-DO');
  if (financeEl) financeEl.textContent = totalFinance.toLocaleString('es-DO');
  if (rateEl) rateEl.textContent = `${totalRate.toFixed(1)}% de interés`;
  if (topEl) topEl.textContent = leader ? `${leader.vehicle.brand} ${leader.vehicle.model}` : '—';

  if (ranking) {
    ranking.innerHTML = rows.map((row,index) => `
      <div class="vehicle-click-row">
        <span class="click-rank">${String(index + 1).padStart(2,'0')}</span>
        <div class="click-vehicle"><strong>${row.vehicle.brand} ${row.vehicle.model}</strong><small>${row.vehicle.year}</small></div>
        <div class="click-metric"><small>Vistas</small><strong>${row.views}</strong></div>
        <div class="click-metric whatsapp"><small>WhatsApp</small><strong>${row.whatsappClicks}</strong></div>
        <div class="click-metric rate"><small>Interés</small><strong>${row.rate.toFixed(1)}%</strong></div>
      </div>`).join('');
  }
}


const defaults = [
  {
    "id": "iem1",
    "brand": "Chevrolet",
    "model": "Tahoe RST",
    "year": 2023,
    "price": null,
    "type": "SUV",
    "mileage": "A consultar",
    "power": "A consultar",
    "engine": "V8 5.3L",
    "transmission": "Automática",
    "color": "A consultar",
    "featured": true,
    "sold": false,
    "demo": false,
    "image": "https://res.cloudinary.com/dgp7uhps3/image/upload/v1786677362/IMG_0382_hmblub.jpg",
    "gallery": [
      "https://res.cloudinary.com/dgp7uhps3/image/upload/v1786677362/IMG_0382_hmblub.jpg",
      "https://res.cloudinary.com/dgp7uhps3/image/upload/v1786677363/IMG_0383_hxjhjb.jpg",
      "https://res.cloudinary.com/dgp7uhps3/image/upload/v1786677369/IMG_0384_cbd9gm.jpg",
      "https://res.cloudinary.com/dgp7uhps3/image/upload/v1786677367/IMG_0385_tmt55o.jpg",
      "https://res.cloudinary.com/dgp7uhps3/image/upload/v1786677376/IMG_0386_fpyna2.jpg",
      "https://res.cloudinary.com/dgp7uhps3/image/upload/v1786677371/IMG_0387_qgnrfh.jpg",
      "https://res.cloudinary.com/dgp7uhps3/image/upload/v1786677374/IMG_0388_nc9wlg.jpg",
      "https://res.cloudinary.com/dgp7uhps3/image/upload/v1786677368/IMG_0389_ownrwi.jpg",
      "https://res.cloudinary.com/dgp7uhps3/image/upload/v1786677368/IMG_0390_luwc4a.jpg",
      "https://res.cloudinary.com/dgp7uhps3/image/upload/v1786677375/IMG_0391_xvkhm4.jpg",
      "https://res.cloudinary.com/dgp7uhps3/image/upload/v1786677371/IMG_0392_e3l3tn.jpg",
      "https://res.cloudinary.com/dgp7uhps3/image/upload/v1786677371/IMG_0393_eograw.jpg",
      "https://res.cloudinary.com/dgp7uhps3/image/upload/v1786677377/IMG_0394_canymi.jpg",
      "https://res.cloudinary.com/dgp7uhps3/image/upload/v1786677381/IMG_0395_qpyrrp.jpg",
      "https://res.cloudinary.com/dgp7uhps3/image/upload/v1786677373/IMG_0396_km3qim.jpg"
    ],
    "description": "Grande, imponente y lista para llevar tu experiencia de manejo a otro nivel. Esta Tahoe RST 2023 combina potencia, lujo y presencia con versión RST de look deportivo, motor V8 5.3L, interior amplio para toda la familia, tecnología de última generación, gran equipamiento de seguridad y tercera fila de asientos."
  },
  {
    "id": "iem2",
    "brand": "Changan",
    "model": "CS55 Plus",
    "year": 2023,
    "price": null,
    "type": "SUV",
    "mileage": "A consultar",
    "power": "A consultar",
    "engine": "Turbo",
    "transmission": "Automática",
    "color": "A consultar",
    "featured": false,
    "sold": false,
    "demo": false,
    "image": "https://res.cloudinary.com/dgp7uhps3/image/upload/v1786677380/IMG_0397_itk8wr.jpg",
    "gallery": [
      "https://res.cloudinary.com/dgp7uhps3/image/upload/v1786677380/IMG_0397_itk8wr.jpg",
      "https://res.cloudinary.com/dgp7uhps3/image/upload/v1786677384/IMG_0398_uh8rgv.jpg",
      "https://res.cloudinary.com/dgp7uhps3/image/upload/v1786677377/IMG_0399_vdqwdl.jpg",
      "https://res.cloudinary.com/dgp7uhps3/image/upload/v1786677384/IMG_0400_hjudev.jpg",
      "https://res.cloudinary.com/dgp7uhps3/image/upload/v1786677391/IMG_0401_j3i1eg.jpg",
      "https://res.cloudinary.com/dgp7uhps3/image/upload/v1786677388/IMG_0402_dj7tce.jpg",
      "https://res.cloudinary.com/dgp7uhps3/image/upload/v1786677390/IMG_0403_b4tube.jpg",
      "https://res.cloudinary.com/dgp7uhps3/image/upload/v1786677391/IMG_0404_zdqoek.jpg",
      "https://res.cloudinary.com/dgp7uhps3/image/upload/v1786677391/IMG_0405_gywza9.jpg",
      "https://res.cloudinary.com/dgp7uhps3/image/upload/v1786677392/IMG_0406_jalkxv.jpg"
    ],
    "description": "Diseño moderno, tecnología de última generación y el confort que mereces. La Changan CS55 Plus 2023 ofrece motor turbo eficiente, transmisión automática suave, Apple CarPlay y Android Auto, cámara 360°, sensores de parqueo, asientos en piel, sunroof panorámico, climatizador automático y detalles premium."
  },
  {
    "id": "iem3",
    "brand": "BMW",
    "model": "X5 M Competition",
    "year": 2020,
    "price": null,
    "type": "SUV",
    "mileage": "A consultar",
    "power": "600+ HP",
    "engine": "V8 TwinPower Turbo",
    "transmission": "Automática deportiva",
    "color": "A consultar",
    "featured": true,
    "sold": false,
    "demo": false,
    "image": "https://res.cloudinary.com/dgp7uhps3/image/upload/v1786677395/IMG_0407_rcf3jb.jpg",
    "gallery": [
      "https://res.cloudinary.com/dgp7uhps3/image/upload/v1786677395/IMG_0407_rcf3jb.jpg",
      "https://res.cloudinary.com/dgp7uhps3/image/upload/v1786677389/IMG_0408_lzc7sn.jpg",
      "https://res.cloudinary.com/dgp7uhps3/image/upload/v1786677399/IMG_0409_nhxlsr.jpg",
      "https://res.cloudinary.com/dgp7uhps3/image/upload/v1786677395/IMG_0410_zt0dx7.jpg",
      "https://res.cloudinary.com/dgp7uhps3/image/upload/v1786677392/IMG_0411_jb7lzt.jpg",
      "https://res.cloudinary.com/dgp7uhps3/image/upload/v1786677397/IMG_0412_sm0fu2.jpg",
      "https://res.cloudinary.com/dgp7uhps3/image/upload/v1786677398/IMG_0413_impfmc.jpg",
      "https://res.cloudinary.com/dgp7uhps3/image/upload/v1786677395/IMG_0414_rajss2.jpg",
      "https://res.cloudinary.com/dgp7uhps3/image/upload/v1786677398/IMG_0415_w79lpb.jpg",
      "https://res.cloudinary.com/dgp7uhps3/image/upload/v1786677399/IMG_0416_wrczkj.jpg",
      "https://res.cloudinary.com/dgp7uhps3/image/upload/v1786677400/IMG_0417_iz7fnz.jpg",
      "https://res.cloudinary.com/dgp7uhps3/image/upload/v1786677402/IMG_0418_f0swbm.jpg",
      "https://res.cloudinary.com/dgp7uhps3/image/upload/v1786677406/IMG_0419_guzpzt.jpg",
      "https://res.cloudinary.com/dgp7uhps3/image/upload/v1786677404/IMG_0420_fcrltb.jpg"
    ],
    "description": "No es solo una SUV: es una máquina creada para quienes exigen lujo, exclusividad y rendimiento de otro nivel. Potente motor V8 TwinPower Turbo de más de 600 HP, tracción xDrive AWD, paquete M Competition, interior en piel premium, asientos deportivos eléctricos con memoria, multimedia avanzada, cámara 360° y diseño agresivo."
  },
  {
    "id": "iem4",
    "brand": "BMW",
    "model": "xDrive 30d Diesel",
    "year": 2014,
    "price": null,
    "type": "SUV",
    "mileage": "50,000 km",
    "power": "A consultar",
    "engine": "3.0 Turbo Diésel",
    "transmission": "Automática",
    "color": "A consultar",
    "featured": false,
    "sold": false,
    "demo": false,
    "image": "https://res.cloudinary.com/dgp7uhps3/image/upload/v1786677403/IMG_0421_jklfyw.jpg",
    "gallery": [
      "https://res.cloudinary.com/dgp7uhps3/image/upload/v1786677403/IMG_0421_jklfyw.jpg",
      "https://res.cloudinary.com/dgp7uhps3/image/upload/v1786677408/IMG_0422_jsecxr.jpg",
      "https://res.cloudinary.com/dgp7uhps3/image/upload/v1786677406/IMG_0423_tq1emz.jpg",
      "https://res.cloudinary.com/dgp7uhps3/image/upload/v1786677408/IMG_0424_e2naiw.jpg",
      "https://res.cloudinary.com/dgp7uhps3/image/upload/v1786677409/IMG_0425_x8ukpt.jpg",
      "https://res.cloudinary.com/dgp7uhps3/image/upload/v1786677408/IMG_0426_ausimq.jpg",
      "https://res.cloudinary.com/dgp7uhps3/image/upload/v1786677414/IMG_0427_qdzwub.jpg",
      "https://res.cloudinary.com/dgp7uhps3/image/upload/v1786677409/IMG_0428_oikhcj.jpg",
      "https://res.cloudinary.com/dgp7uhps3/image/upload/v1786677412/IMG_0429_og84j9.jpg"
    ],
    "description": "Elegancia alemana, potencia diésel y un estado de conservación excepcional. Esta BMW xDrive 30d Diesel 2014 cuenta con motor 3.0 Turbo Diésel, tracción inteligente xDrive AWD, solo 50,000 km, interior premium, asientos eléctricos en piel, pantalla multimedia, climatizador y excelente consumo de combustible."
  },
  {
    "id": "iem5",
    "brand": "Chevrolet",
    "model": "Suburban",
    "year": 2022,
    "price": null,
    "type": "SUV",
    "mileage": "A consultar",
    "power": "A consultar",
    "engine": "V8",
    "transmission": "Automática",
    "color": "A consultar",
    "featured": false,
    "sold": false,
    "demo": false,
    "image": "https://res.cloudinary.com/dgp7uhps3/image/upload/v1786677416/IMG_0431_qwifol.jpg",
    "gallery": [
      "https://res.cloudinary.com/dgp7uhps3/image/upload/v1786677416/IMG_0431_qwifol.jpg",
      "https://res.cloudinary.com/dgp7uhps3/image/upload/v1786677416/IMG_0432_o7ggyr.jpg",
      "https://res.cloudinary.com/dgp7uhps3/image/upload/v1786677422/IMG_0433_tuukgd.jpg",
      "https://res.cloudinary.com/dgp7uhps3/image/upload/v1786677418/IMG_0434_olu46r.jpg",
      "https://res.cloudinary.com/dgp7uhps3/image/upload/v1786677418/IMG_0435_su7pbn.jpg",
      "https://res.cloudinary.com/dgp7uhps3/image/upload/v1786677423/IMG_0436_w8yiap.jpg",
      "https://res.cloudinary.com/dgp7uhps3/image/upload/v1786677421/IMG_0437_h0tgfs.jpg",
      "https://res.cloudinary.com/dgp7uhps3/image/upload/v1786677422/IMG_0438_wlpdmz.jpg",
      "https://res.cloudinary.com/dgp7uhps3/image/upload/v1786677425/IMG_0439_rdl6eu.jpg",
      "https://res.cloudinary.com/dgp7uhps3/image/upload/v1786677423/IMG_0440_sr9ij3.jpg",
      "https://res.cloudinary.com/dgp7uhps3/image/upload/v1786677424/IMG_0441_bweq6h.jpg",
      "https://res.cloudinary.com/dgp7uhps3/image/upload/v1786677426/IMG_0442_ilvfx8.jpg"
    ],
    "description": "Espacio, potencia y confort en un solo vehículo. Esta Chevrolet Suburban 2022 combina diseño robusto y elegante, tres filas de asientos, interior cómodo con acabados premium, asientos en piel con ajuste eléctrico, sistema multimedia con conectividad inteligente, cámara 360°, sensores de parqueo y un potente motor V8."
  },
  {
    "id": "iem6",
    "brand": "Lincoln",
    "model": "Navigator Reserve II",
    "year": "Año a consultar",
    "price": null,
    "type": "SUV",
    "mileage": "A consultar",
    "power": "A consultar",
    "engine": "Biturbo",
    "transmission": "Automática",
    "color": "A consultar",
    "featured": true,
    "sold": false,
    "demo": false,
    "image": "https://res.cloudinary.com/dgp7uhps3/image/upload/v1786677432/IMG_0443_ajvsiu.jpg",
    "gallery": [
      "https://res.cloudinary.com/dgp7uhps3/image/upload/v1786677432/IMG_0443_ajvsiu.jpg",
      "https://res.cloudinary.com/dgp7uhps3/image/upload/v1786677428/IMG_0444_ozr1sx.jpg",
      "https://res.cloudinary.com/dgp7uhps3/image/upload/v1786677434/IMG_0445_gzc9p2.jpg",
      "https://res.cloudinary.com/dgp7uhps3/image/upload/v1786677430/IMG_0446_xzoyoy.jpg",
      "https://res.cloudinary.com/dgp7uhps3/image/upload/v1786677429/IMG_0447_vljdiq.jpg",
      "https://res.cloudinary.com/dgp7uhps3/image/upload/v1786677434/IMG_0448_pwclxh.jpg",
      "https://res.cloudinary.com/dgp7uhps3/image/upload/v1786677434/IMG_0449_boptsh.jpg",
      "https://res.cloudinary.com/dgp7uhps3/image/upload/v1786677432/IMG_0451_oihh49.jpg",
      "https://res.cloudinary.com/dgp7uhps3/image/upload/v1786677439/IMG_0452_vfyrpt.jpg",
      "https://res.cloudinary.com/dgp7uhps3/image/upload/v1786677436/IMG_0453_ehfewl.jpg",
      "https://res.cloudinary.com/dgp7uhps3/image/upload/v1786677439/IMG_0454_fvnc7p.jpg",
      "https://res.cloudinary.com/dgp7uhps3/image/upload/v1786677441/IMG_0455_s4fpio.jpg",
      "https://res.cloudinary.com/dgp7uhps3/image/upload/v1786677443/IMG_0456_cofwhi.jpg",
      "https://res.cloudinary.com/dgp7uhps3/image/upload/v1786677441/IMG_0457_jzapqu.jpg",
      "https://res.cloudinary.com/dgp7uhps3/image/upload/v1786677447/IMG_0458_p87v0b.jpg",
      "https://res.cloudinary.com/dgp7uhps3/image/upload/v1786677445/IMG_0459_hxmfh1.jpg"
    ],
    "description": "Lujo, potencia y presencia en un solo vehículo. La Lincoln Navigator Reserve II ofrece diseño imponente, amplio espacio con tres filas, interior de lujo, asientos en piel con memoria, pantalla multimedia de gran tamaño, cámara 360°, sensores de parqueo, asistencias de manejo y un potente motor biturbo."
  },
  {
    "id": "iem7",
    "brand": "Porsche",
    "model": "Cayenne",
    "year": 2016,
    "price": null,
    "type": "SUV",
    "mileage": "A consultar",
    "power": "A consultar",
    "engine": "A consultar",
    "transmission": "Automática",
    "color": "A consultar",
    "featured": false,
    "sold": false,
    "demo": false,
    "image": "https://res.cloudinary.com/dgp7uhps3/image/upload/v1786677440/IMG_0460_jt6clw.jpg",
    "gallery": [
      "https://res.cloudinary.com/dgp7uhps3/image/upload/v1786677440/IMG_0460_jt6clw.jpg",
      "https://res.cloudinary.com/dgp7uhps3/image/upload/v1786677449/IMG_0461_pulnzz.jpg",
      "https://res.cloudinary.com/dgp7uhps3/image/upload/v1786677445/IMG_0462_y8xkhg.jpg",
      "https://res.cloudinary.com/dgp7uhps3/image/upload/v1786677444/IMG_0463_hpwzjw.jpg",
      "https://res.cloudinary.com/dgp7uhps3/image/upload/v1786677450/IMG_0464_atw3lc.jpg",
      "https://res.cloudinary.com/dgp7uhps3/image/upload/v1786677448/IMG_0465_ly5dnj.jpg",
      "https://res.cloudinary.com/dgp7uhps3/image/upload/v1786677447/IMG_0466_w7u3a5.jpg",
      "https://res.cloudinary.com/dgp7uhps3/image/upload/v1786677453/IMG_0467_py21sl.jpg",
      "https://res.cloudinary.com/dgp7uhps3/image/upload/v1786677453/IMG_0468_afe7e9.jpg",
      "https://res.cloudinary.com/dgp7uhps3/image/upload/v1786677451/IMG_0469_czk62g.jpg",
      "https://res.cloudinary.com/dgp7uhps3/image/upload/v1786677454/IMG_0470_eex533.jpg",
      "https://res.cloudinary.com/dgp7uhps3/image/upload/v1786677451/IMG_0471_guvvuj.jpg"
    ],
    "description": "La Porsche Cayenne 2016 combina el lujo de Porsche con un desempeño excepcional. Ofrece motor potente con conducción deportiva, diseño elegante e imponente, interior de lujo con acabados premium, tecnología y entretenimiento para una experiencia superior, además de seguridad y estabilidad para viajar con total confianza."
  }
];


const FEATURE_DEFINITIONS = [
  ['multimedia','Sistema de entretenimiento'],
  ['reverseCamera','Cámara de retroceso'],
  ['camera360','Cámara 360°'],
  ['appleCarPlay','Apple CarPlay'],
  ['androidAuto','Android Auto'],
  ['leatherSeats','Asientos en piel'],
  ['electricSeats','Asientos eléctricos'],
  ['memorySeats','Memoria de asientos'],
  ['sunroof','Sunroof'],
  ['panoramicSunroof','Sunroof panorámico'],
  ['climateControl','Climatizador automático'],
  ['parkingSensors','Sensores de parqueo'],
  ['thirdRow','Tercera fila de asientos'],
  ['awd4x4','AWD / 4x4'],
  ['ledLights','Luces LED'],
  ['driverAssistance','Asistencias de conducción'],
  ['turbo','Motor turbo / biturbo'],
  ['v8','Motor V8']
];

const DEFAULT_FEATURES_BY_ID = {
  iem1: { thirdRow:true, v8:true },
  iem2: { multimedia:true, camera360:true, appleCarPlay:true, androidAuto:true, leatherSeats:true, panoramicSunroof:true, climateControl:true, parkingSensors:true, ledLights:true, turbo:true },
  iem3: { multimedia:true, camera360:true, appleCarPlay:true, androidAuto:true, leatherSeats:true, electricSeats:true, memorySeats:true, parkingSensors:true, awd4x4:true, driverAssistance:true, turbo:true, v8:true },
  iem4: { multimedia:true, leatherSeats:true, electricSeats:true, climateControl:true, awd4x4:true, turbo:true },
  iem5: { multimedia:true, camera360:true, leatherSeats:true, electricSeats:true, parkingSensors:true, thirdRow:true, driverAssistance:true, v8:true },
  iem6: { multimedia:true, camera360:true, leatherSeats:true, electricSeats:true, memorySeats:true, parkingSensors:true, thirdRow:true, driverAssistance:true, turbo:true },
  iem7: { multimedia:true }
};

const featureDefaults = id => Object.fromEntries(FEATURE_DEFINITIONS.map(([key]) => [key, DEFAULT_FEATURES_BY_ID[id]?.[key] ?? null]));

const money = n => typeof n === 'number'
  ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n)
  : 'Consultar';

const tbody = document.getElementById('adminInventory');

function parseGalleryInput(value) {
  if (!value) return [];
  return String(value)
    .split(/\s|,|\n/)
    .map(item => item.trim())
    .filter(item => item.startsWith('http'));
}

function normalizeVehicle(vehicle) {
  const gallery = Array.isArray(vehicle.gallery) && vehicle.gallery.length
    ? vehicle.gallery.filter(Boolean)
    : parseGalleryInput(vehicle.image);
  const cover = gallery[0] || vehicle.image || FALLBACK_IMAGE;
  return {
    ...vehicle,
    price: typeof vehicle.price === 'number' ? vehicle.price : null,
    status: vehicle.status || (vehicle.sold ? 'sold' : 'available'),
    sold: (vehicle.status || (vehicle.sold ? 'sold' : 'available')) === 'sold',
    image: cover,
    gallery: gallery.length ? gallery : [cover],
    features: { ...featureDefaults(vehicle.id), ...(vehicle.features || {}) }
  };
}

function loadInventory() {
  const storedVersion = localStorage.getItem(INVENTORY_VERSION_KEY);
  const stored = localStorage.getItem(INVENTORY_KEY);

  if (!stored || storedVersion !== INVENTORY_VERSION) {
    localStorage.setItem(INVENTORY_KEY, JSON.stringify(defaults));
    localStorage.setItem(INVENTORY_VERSION_KEY, INVENTORY_VERSION);
    return defaults.map(normalizeVehicle);
  }

  try {
    return JSON.parse(stored).map(normalizeVehicle);
  } catch (error) {
    localStorage.setItem(INVENTORY_KEY, JSON.stringify(defaults));
    localStorage.setItem(INVENTORY_VERSION_KEY, INVENTORY_VERSION);
    return defaults.map(normalizeVehicle);
  }
}

let inventory = loadInventory();

const save = () => {
  localStorage.setItem(INVENTORY_KEY, JSON.stringify(inventory));
  localStorage.setItem(INVENTORY_VERSION_KEY, INVENTORY_VERSION);
};


async function compressImage(file, maxWidth = 1200, quality = .72) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        const scale = Math.min(1, maxWidth / img.width);
        const canvas = document.createElement('canvas');
        canvas.width = Math.round(img.width * scale);
        canvas.height = Math.round(img.height * scale);
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL('image/jpeg', quality));
      };
      img.onerror = reject;
      img.src = reader.result;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

async function filesToGallery(files) {
  const selected = [...files].slice(0, 10);
  return Promise.all(selected.map(file => compressImage(file)));
}

function updatePhotoPreview(images = []) {
  const preview = document.getElementById('photoPreview');
  if (!preview) return;
  preview.innerHTML = images.length ? images.map((src, i) => `<div><img src="${src}" alt="Foto ${i+1}"><span>${i===0?'Portada':i+1}</span></div>`).join('') : '<small>Todavía no seleccionaste imágenes.</small>';
}


function renderFeatureControls(features = {}) {
  const root = document.getElementById('featureControls');
  if (!root) return;
  root.innerHTML = FEATURE_DEFINITIONS.map(([key,label]) => {
    const value = features[key];
    const normalized = value === true ? 'yes' : value === false ? 'no' : 'unknown';
    return `<label class="feature-control"><span>${label}</span><select data-feature="${key}"><option value="unknown" ${normalized==='unknown'?'selected':''}>A consultar</option><option value="yes" ${normalized==='yes'?'selected':''}>Sí</option><option value="no" ${normalized==='no'?'selected':''}>No</option></select></label>`;
  }).join('');
}

function collectFeatures() {
  const result = {};
  document.querySelectorAll('[data-feature]').forEach(select => {
    result[select.dataset.feature] = select.value === 'yes' ? true : select.value === 'no' ? false : null;
  });
  return result;
}

const VEHICLE_STATUS = {
  available:{label:'Disponible',cls:'available'}, reserved:{label:'Reservado',cls:'reserved'}, negotiation:{label:'En negociación',cls:'negotiation'}, sold:{label:'Vendido',cls:'sold'}, incoming:{label:'Próximo ingreso',cls:'incoming'}
};
const vehicleStatus=v=>VEHICLE_STATUS[v.status]||VEHICLE_STATUS.available;

const LEAD_SEED=[
 {id:'l1',name:'Juan Martínez',phone:'',vehicle:'Chevrolet Tahoe RST 2023',channel:'WhatsApp',status:'new',notes:'Preguntó por disponibilidad.',assignedAdvisor:'Asesor principal',createdAt:new Date(Date.now()-3600000).toISOString()},
 {id:'l2',name:'Carla Rodríguez',phone:'',vehicle:'BMW X5 M Competition 2020',channel:'Web',status:'follow',notes:'Interesada en financiamiento.',assignedAdvisor:'Asesor financiamiento',createdAt:new Date(Date.now()-7200000).toISOString()},
 {id:'l3',name:'Andrés Ortiz',phone:'',vehicle:'Lincoln Navigator Reserve II',channel:'Instagram',status:'negotiation',notes:'Coordinar visita.',assignedAdvisor:'Asesor 2',createdAt:new Date(Date.now()-86400000).toISOString()}
];
const FINANCE_SEED=[
 {id:'f1',name:'Carla Rodríguez',phone:'',vehicle:'BMW X5 M Competition 2020',down:12000,months:60,status:'pending',createdAt:new Date(Date.now()-5400000).toISOString()},
 {id:'f2',name:'Juan Martínez',phone:'',vehicle:'Chevrolet Tahoe RST 2023',down:15000,months:72,status:'approved',createdAt:new Date(Date.now()-90000000).toISOString()}
];
function loadCollection(key,seed){try{const x=JSON.parse(localStorage.getItem(key)||'[]');if(x.length)return x;}catch(_){ } localStorage.setItem(key,JSON.stringify(seed));return structuredClone(seed);}
function saveCollection(key,data){localStorage.setItem(key,JSON.stringify(data));}
let leads=loadCollection(LEADS_KEY,LEAD_SEED); let financeRequests=loadCollection(FINANCE_REQUESTS_KEY,FINANCE_SEED);

function addActivity(text,type='system'){let items=[];try{items=JSON.parse(localStorage.getItem(ACTIVITY_KEY)||'[]')}catch(_){ }items.unshift({id:Date.now()+Math.random(),text,type,date:new Date().toISOString()});localStorage.setItem(ACTIVITY_KEY,JSON.stringify(items.slice(0,30)));renderActivity();}
function ensureActivitySeed(){let x=[];try{x=JSON.parse(localStorage.getItem(ACTIVITY_KEY)||'[]')}catch(_){ }if(!x.length){x=[{id:1,text:'BMW X5 M Competition lidera el interés del catálogo',type:'analytics',date:new Date().toISOString()},{id:2,text:'Nueva solicitud de financiamiento · Chevrolet Tahoe RST',type:'finance',date:new Date(Date.now()-3600000).toISOString()},{id:3,text:'Lincoln Navigator marcada como destacada',type:'inventory',date:new Date(Date.now()-7200000).toISOString()}];localStorage.setItem(ACTIVITY_KEY,JSON.stringify(x));}}

function render(list = inventory) {
  tbody.innerHTML = '';
  list.forEach(vehicle => tbody.insertAdjacentHTML('beforeend', `
    <tr>
      <td>
        <div class="admin-vehicle">
          <img src="${vehicle.image}" alt="${vehicle.brand} ${vehicle.model}" onerror="this.src='${FALLBACK_IMAGE}'">
          <div>
            <strong>${vehicle.brand} ${vehicle.model}</strong>
            <small>${vehicle.year} · ${vehicle.type} · ${vehicle.gallery?.length || 1} fotos</small>
          </div>
        </div>
      </td>
      <td>${money(vehicle.price)}</td>
      <td><span class="status-pill ${vehicleStatus(vehicle).cls}">${vehicleStatus(vehicle).label}</span></td>
      <td>${vehicle.featured ? 'Sí' : 'No'}</td>
      <td>
        <div class="table-actions">
          <button data-edit="${vehicle.id}">Editar</button>
          <button data-status-cycle="${vehicle.id}">Cambiar estado</button>
          <button data-delete="${vehicle.id}">Eliminar</button>
        </div>
      </td>
    </tr>
  `));

  document.querySelectorAll('[data-edit]').forEach(button => button.onclick = () => editVehicle(button.dataset.edit));
  document.querySelectorAll('[data-status-cycle]').forEach(button => button.onclick = () => cycleStatus(button.dataset.statusCycle));
  document.querySelectorAll('[data-delete]').forEach(button => button.onclick = () => deleteVehicle(button.dataset.delete));
  stats();
}

function stats() {
  statPublished.textContent = inventory.length;
  statAvailable.textContent = inventory.filter(v => v.status === 'available').length;
  statSold.textContent = inventory.filter(v => v.status === 'sold').length;
  statFeatured.textContent = inventory.filter(v => v.featured).length;
}

const dialog = document.getElementById('vehicleFormDialog');
addVehicleBtn.onclick = () => openForm();
closeVehicleForm.onclick = () => dialog.close();

function openForm(vehicle) {
  vehicleForm.reset();
  if (document.getElementById('vehiclePhotos')) document.getElementById('vehiclePhotos').value = '';
  vehicleId.value = vehicle?.id || '';
  formTitle.textContent = vehicle ? 'Editar vehículo' : 'Agregar vehículo';
  if (vehicle) {
    vehicleBrand.value = vehicle.brand;
    vehicleModel.value = vehicle.model;
    vehicleYear.value = vehicle.year;
    vehiclePriceInput.value = vehicle.price ?? '';
    vehicleTypeInput.value = vehicle.type;
    vehicleMileage.value = vehicle.mileage;
    vehiclePower.value = vehicle.power || 'A consultar';
    vehicleEngine.value = vehicle.engine || 'A consultar';
    vehicleTransmission.value = vehicle.transmission;
    vehicleColor.value = vehicle.color;
    vehicleDescription.value = vehicle.description || '';
    updatePhotoPreview(vehicle.gallery || [vehicle.image]);
    renderFeatureControls(vehicle.features || featureDefaults(vehicle.id));
    vehicleFeatured.checked = vehicle.featured;
    vehicleStatus.value = vehicle.status || (vehicle.sold ? 'sold' : 'available');
  } else {
    updatePhotoPreview([]);
    renderFeatureControls(featureDefaults('new'));
    vehicleStatus.value = 'available';
  }
  dialog.showModal();
}

function editVehicle(id) {
  openForm(inventory.find(vehicle => vehicle.id === id));
}

function cycleStatus(id) {
  const vehicle=inventory.find(item=>item.id===id); if(!vehicle)return;
  const order=['available','reserved','negotiation','sold','incoming'];
  vehicle.status=order[(order.indexOf(vehicle.status)+1)%order.length]; vehicle.sold=vehicle.status==='sold';
  save(); addActivity(`${vehicle.brand} ${vehicle.model} · ${vehicleStatus(vehicle).label}`,'inventory'); render(); renderOverview();
}

function deleteVehicle(id) {
  if (confirm('¿Eliminar este vehículo?')) {
    inventory = inventory.filter(vehicle => vehicle.id !== id);
    save();
    render();
  }
}


const vehiclePhotosInput = document.getElementById('vehiclePhotos');
if (vehiclePhotosInput) vehiclePhotosInput.addEventListener('change', () => {
  const files = [...vehiclePhotosInput.files].slice(0,10);
  const temp = files.map(file => URL.createObjectURL(file));
  updatePhotoPreview(temp);
});

vehicleForm.onsubmit = async event => {
  event.preventDefault();
  const saveBtn = vehicleForm.querySelector('button[type="submit"]');
  const originalText = saveBtn.textContent;
  saveBtn.disabled = true;
  saveBtn.textContent = 'Guardando...';
  try {
    const fileInput = document.getElementById('vehiclePhotos');
    const uploadedGallery = fileInput?.files?.length ? await filesToGallery(fileInput.files) : [];
    const current = inventory.find(vehicle => vehicle.id === vehicleId.value);
    const existingGallery = current?.gallery || [];
    const gallery = uploadedGallery.length ? uploadedGallery : existingGallery;
    const data = normalizeVehicle({
      id: vehicleId.value || crypto.randomUUID(),
      brand: vehicleBrand.value.trim(),
      model: vehicleModel.value.trim(),
      year: +vehicleYear.value,
      price: vehiclePriceInput.value ? +vehiclePriceInput.value : null,
      type: vehicleTypeInput.value,
      mileage: vehicleMileage.value.trim() || 'A consultar',
      power: vehiclePower.value.trim() || 'A consultar',
      engine: vehicleEngine.value.trim() || 'A consultar',
      transmission: vehicleTransmission.value.trim() || 'Automática',
      color: vehicleColor.value.trim() || 'A consultar',
      image: gallery[0] || FALLBACK_IMAGE,
      gallery: gallery.length ? gallery : [FALLBACK_IMAGE],
      description: vehicleDescription.value.trim(),
      featured: vehicleFeatured.checked,
      status: vehicleStatus.value,
      sold: vehicleStatus.value === 'sold',
      demo: false,
      features: collectFeatures()
    });

    const index = inventory.findIndex(vehicle => vehicle.id === data.id);
    if (index >= 0) inventory[index] = data;
    else inventory.unshift(data);

    save();
    addActivity(`${data.brand} ${data.model} · ${index >= 0 ? 'actualizado' : 'publicado'}`,'inventory');
    render(); renderOverview();
    dialog.close();
  } catch (error) {
    console.error(error);
    alert('No pudimos procesar las fotos. Probá con menos imágenes o archivos más livianos.');
  } finally {
    saveBtn.disabled = false;
    saveBtn.textContent = originalText;
  }
};

adminSearch.oninput = () => {
  const q = adminSearch.value.toLowerCase();
  render(inventory.filter(vehicle => `${vehicle.brand} ${vehicle.model} ${vehicle.year}`.toLowerCase().includes(q)));
};

render();
renderVehicleAnalytics();

// Workspace navigation demo
const adminNavButtons = document.querySelectorAll('[data-admin-view]');
const adminViews = document.querySelectorAll('[data-view-panel]');
const adminTitle = document.querySelector('.admin-topbar h1');
const adminSubtitle = document.querySelector('.admin-topbar p');
const publishButton = document.getElementById('addVehicleBtn');

const viewMeta = {
  inventory: ['Bienvenido, El Millón.', 'Tu inventario está actualizado. Gestioná lo que aparece en la web desde un solo lugar.'],
  leads: ['Consultas.', 'Revisá oportunidades, canales de ingreso y estado de cada conversación.'],
  finance: ['Financiamiento.', 'Seguimiento de solicitudes y oportunidades vinculadas a cada vehículo.'],
  analytics: ['Estadísticas.', 'Visualizá el rendimiento comercial del catálogo y los vehículos que generan más interés.'],
  team: ['Equipo WhatsApp.', 'Configurá cómo se distribuyen automáticamente las oportunidades entre tus asesores.']
};

function switchAdminView(view) {
  adminNavButtons.forEach(btn => btn.classList.toggle('active', btn.dataset.adminView === view));
  adminViews.forEach(panel => panel.classList.toggle('active', panel.dataset.viewPanel === view));
  if (adminTitle && viewMeta[view]) adminTitle.textContent = viewMeta[view][0];
  if (adminSubtitle && viewMeta[view]) adminSubtitle.textContent = viewMeta[view][1];
  if (publishButton) publishButton.style.display = view === 'inventory' ? '' : 'none';
  if (view === 'analytics') renderVehicleAnalytics();
  if (view === 'leads') renderLeads();
  if (view === 'finance') renderFinance();
  if (view === 'inventory') { renderOverview(); renderActivity(); }
  if (view === 'team') renderRoutingTeam();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

adminNavButtons.forEach(btn => btn.addEventListener('click', () => switchAdminView(btn.dataset.adminView)));

// Demo comercial guiada
const presentationDialog = document.getElementById('presentationDialog');
const presentationStage = document.getElementById('presentationStage');
const presentationProgress = document.getElementById('presentationProgress');
const presentationProgressBar = document.getElementById('presentationProgressBar');
const presentationPrev = document.getElementById('presentationPrev');
const presentationNext = document.getElementById('presentationNext');
let presentationIndex = 0;

const presentationSteps = [
  {
    number:'01', kicker:'GESTIÓN DE INVENTARIO', title:'Cargás un vehículo desde el panel.',
    text:'Seleccionás fotos desde el celular, completás la información comercial y decidís si querés mostrar esa unidad en el inicio.',
    visual:'<div class="presentation-mock vehicle-upload-mock"><div class="mock-line"><span>Nuevo vehículo</span><b>+</b></div><div class="mock-photo"><i>＋</i><strong>Agregar imágenes</strong><small>Galería del celular</small></div><div class="mock-fields"><span>Marca</span><span>Modelo</span><span>Año</span><span>Estado</span></div><div class="mock-toggle"><i></i> Mostrar en inicio</div></div>',
    actionLabel:'Abrir carga de vehículo', action:'publish'
  },
  {
    number:'02', kicker:'SITIO PÚBLICO', title:'La unidad aparece donde el cliente compra.',
    text:'El inventario público se actualiza con la misma información. Las unidades destacadas aparecen primero y el inventario completo queda a un toque.',
    visual:'<div class="presentation-mock public-mock"><div class="mock-browser"><i></i><i></i><i></i><span>inversioneselmillon.com</span></div><div class="mock-public-title">Vehículos disponibles <em>ahora.</em></div><div class="mock-cars"><article></article><article></article><article></article></div></div>',
    actionLabel:'Abrir inventario público', action:'public'
  },
  {
    number:'03', kicker:'INTENCIÓN DE COMPRA', title:'El cliente consulta la unidad que le interesa.',
    text:'Desde cada vehículo puede escribir por WhatsApp, pedir financiamiento o dejar una búsqueda. La plataforma identifica qué unidad originó la consulta.',
    visual:'<div class="presentation-mock customer-mock"><div class="customer-car"></div><div class="customer-copy"><span>BMW X5 M Competition</span><strong>¿Te interesa esta unidad?</strong><button>Consultar por WhatsApp</button><button class="ghost">Quiero financiarlo</button></div></div>',
    actionLabel:'Simular una consulta', action:'lead'
  },
  {
    number:'04', kicker:'SMART WHATSAPP ROUTING', title:'La plataforma asigna el lead al asesor correcto.',
    text:'El cliente ve un solo botón. Si hay varios números configurados, las consultas se distribuyen automáticamente por especialidad o rotación y queda registrado quién recibió cada oportunidad.',
    visual:'<div class="presentation-mock routing-presentation-mock"><div class="routing-demo-client"><span>Cliente</span><strong>BMW X5 M</strong><button>Hablar con un asesor</button></div><i>→</i><div class="routing-demo-engine"><small>SMART ROUTING</small><strong>Origen: vehículo</strong><span>Rotación activa</span></div><i>→</i><div class="routing-demo-seller"><b>02</b><strong>Asesor 2</strong><span>Lead asignado</span></div></div>',
    actionLabel:'Configurar equipo WhatsApp', action:'routing'
  },
  {
    number:'05', kicker:'CRM COMERCIAL', title:'La consulta entra al workspace.',
    text:'El equipo deja de depender de conversaciones dispersas. Cada oportunidad queda ordenada por etapa y muestra qué asesor fue asignado.',
    visual:'<div class="presentation-mock crm-mock"><div><strong>Nuevos</strong><article><b>MJ</b><span>María Jiménez<small>BMW X5 M · Asesor 2</small></span></article></div><div><strong>Seguimiento</strong><article><b>CR</b><span>Carlos Reyes<small>Tahoe RST · Asesor 1</small></span></article></div><div><strong>Negociación</strong><article><b>JP</b><span>José Pérez<small>Navigator · Asesor 3</small></span></article></div></div>',
    actionLabel:'Abrir CRM', action:'crm'
  },
  {
    number:'06', kicker:'DECISIONES CON DATOS', title:'Ves qué vehículos generan más interés.',
    text:'El dueño puede detectar qué unidades reciben más vistas, clics a WhatsApp y solicitudes de financiamiento para priorizar seguimiento y marketing.',
    visual:'<div class="presentation-mock analytics-mock"><div class="mock-kpis"><span><small>Vistas</small><strong>1,060</strong></span><span><small>WhatsApp</small><strong>75</strong></span><span><small>Financiamiento</small><strong>38</strong></span></div><div class="mock-ranking"><article><b>01</b><span>Chevrolet Tahoe RST</span><strong>24 clics</strong></article><article><b>02</b><span>BMW X5 M</span><strong>18 clics</strong></article><article><b>03</b><span>Lincoln Navigator</span><strong>11 clics</strong></article></div></div>',
    actionLabel:'Ver estadísticas', action:'analytics'
  }
];

function runFlowAction(action){
  if(action==='publish'){ presentationDialog?.close(); switchAdminView('inventory'); setTimeout(()=>document.getElementById('addVehicleBtn')?.click(),180); }
  if(action==='public'){ window.open('index.html#inventario','_blank'); }
  if(action==='lead'){ presentationDialog?.close(); switchAdminView('leads'); setTimeout(()=>document.getElementById('newLeadDemo')?.click(),220); }
  if(action==='routing'){ presentationDialog?.close(); switchAdminView('team'); setTimeout(()=>document.getElementById('openRoutingGuide')?.click(),180); }
  if(action==='crm'){ presentationDialog?.close(); switchAdminView('leads'); }
  if(action==='analytics'){ presentationDialog?.close(); switchAdminView('analytics'); }
}

function renderPresentationStep(){
  const step=presentationSteps[presentationIndex]; if(!step||!presentationStage)return;
  presentationProgress.textContent=`Paso ${presentationIndex+1} de ${presentationSteps.length}`;
  presentationProgressBar.style.width=`${((presentationIndex+1)/presentationSteps.length)*100}%`;
  presentationPrev.disabled=presentationIndex===0;
  presentationNext.textContent=presentationIndex===presentationSteps.length-1?'Cerrar presentación':'Siguiente →';
  presentationStage.innerHTML=`<div class="presentation-copy"><span class="presentation-number">${step.number}</span><span class="eyebrow">${step.kicker}</span><h2>${step.title}</h2><p>${step.text}</p><button class="presentation-action-link" type="button">${step.actionLabel} <b>↗</b></button></div><div class="presentation-visual">${step.visual}</div>`;
  presentationStage.querySelector('.presentation-action-link')?.addEventListener('click',()=>runFlowAction(step.action));
}
function openPresentation(){presentationIndex=0;renderPresentationStep();presentationDialog?.showModal();}
document.getElementById('openPresentationMode')?.addEventListener('click',openPresentation);
document.getElementById('startGuidedFlow')?.addEventListener('click',openPresentation);
document.querySelector('[data-close-presentation]')?.addEventListener('click',()=>presentationDialog?.close());
presentationDialog?.addEventListener('click',e=>{if(e.target===presentationDialog)presentationDialog.close();});
presentationPrev?.addEventListener('click',()=>{if(presentationIndex>0){presentationIndex--;renderPresentationStep();}});
presentationNext?.addEventListener('click',()=>{if(presentationIndex<presentationSteps.length-1){presentationIndex++;renderPresentationStep();}else presentationDialog?.close();});

document.querySelectorAll('[data-flow-action]').forEach(button=>button.addEventListener('click',()=>runFlowAction(button.dataset.flowAction)));

// CRM + Financiamiento + Dashboard
function initials(name=''){return name.split(/\s+/).slice(0,2).map(x=>x[0]||'').join('').toUpperCase()||'LE';}
const leadStatusMeta={new:['Nueva','new'],follow:['Seguimiento','follow'],negotiation:['Negociación','negotiation'],won:['Vendido','won'],lost:['Perdido','lost']};
function renderLeads(){
  const board=document.getElementById('crmBoard'); if(!board)return;
  document.getElementById('leadStatNew').textContent=leads.filter(x=>x.status==='new').length;
  document.getElementById('leadStatFollow').textContent=leads.filter(x=>x.status==='follow').length;
  document.getElementById('leadStatNegotiation').textContent=leads.filter(x=>x.status==='negotiation').length;
  const stages=[['new','Nuevos'],['follow','Seguimiento'],['negotiation','Negociación'],['won','Vendidos']];
  board.innerHTML=stages.map(([key,label])=>`<section class="crm-column"><header><span>${label}</span><b>${leads.filter(x=>x.status===key).length}</b></header><div>${leads.filter(x=>x.status===key).map(l=>`<article class="crm-card" data-lead-id="${l.id}"><div class="crm-person"><span>${initials(l.name)}</span><div><strong>${l.name}</strong><small>${l.channel}</small></div></div><h3>${l.vehicle}</h3>${l.assignedAdvisor?`<div class="crm-assigned"><span>Asignado a</span><strong>${l.assignedAdvisor}</strong></div>`:''}<p>${l.notes||'Sin notas todavía.'}</p><button type="button" class="crm-open">Abrir oportunidad</button></article>`).join('')||'<div class="crm-empty">Sin oportunidades</div>'}</div></section>`).join('');
  board.querySelectorAll('.crm-open').forEach(btn=>btn.onclick=()=>openLead(btn.closest('[data-lead-id]').dataset.leadId));
  updateNavCounts(); renderOverview();
}
function openLead(id){const lead=leads.find(x=>x.id===id);if(!lead)return;const d=document.createElement('dialog');d.className='admin-dialog mini-demo-dialog';d.innerHTML=`<form class="demo-dialog-body" data-lead-form><button class="modal-close" type="button">×</button><span class="eyebrow">Oportunidad comercial</span><h2>${lead.name}</h2><div class="demo-detail-grid"><div><span>Interés</span><strong>${lead.vehicle}</strong></div><div><span>Canal</span><strong>${lead.channel}</strong></div><div><span>Asesor asignado</span><strong>${lead.assignedAdvisor||'Sin asignar'}</strong></div></div><label class="crm-modal-field">Estado<select name="status">${Object.entries(leadStatusMeta).map(([k,v])=>`<option value="${k}" ${lead.status===k?'selected':''}>${v[0]}</option>`).join('')}</select></label><label class="crm-modal-field">Notas<textarea name="notes">${lead.notes||''}</textarea></label><button class="btn btn-primary btn-block" type="submit">Guardar cambios</button></form>`;document.body.appendChild(d);d.querySelector('.modal-close').onclick=()=>d.close();d.querySelector('form').onsubmit=e=>{e.preventDefault();lead.status=e.currentTarget.status.value;lead.notes=e.currentTarget.notes.value;saveCollection(LEADS_KEY,leads);addActivity(`Lead ${lead.name} · ${leadStatusMeta[lead.status][0]}`,'lead');renderLeads();d.close();};d.addEventListener('close',()=>d.remove(),{once:true});d.showModal();}

function renderFinance(){const root=document.getElementById('financePipeline');if(!root)return;document.getElementById('financeStatTotal').textContent=financeRequests.length;document.getElementById('financeStatPending').textContent=financeRequests.filter(x=>x.status==='pending').length;document.getElementById('financeStatApproved').textContent=financeRequests.filter(x=>x.status==='approved').length;root.innerHTML=financeRequests.map(r=>`<article class="finance-request"><div><span class="request-tag ${r.status==='approved'?'approved':''}">${r.status==='approved'?'Aprobada':r.status==='rejected'?'No aprobada':'En evaluación'}</span><h3>${r.vehicle}</h3><p>Cliente: ${r.name}</p></div><div class="request-numbers"><span><small>Inicial</small><strong>${money(r.down)}</strong></span><span><small>Plazo</small><strong>${r.months} meses</strong></span><span><small>Contacto</small><strong>${r.phone||'A consultar'}</strong></span><span><small>Asesor</small><strong>${r.assignedAdvisor||'Autoasignado'}</strong></span></div><button class="btn btn-ghost request-open" data-finance-id="${r.id}">Ver solicitud</button></article>`).join('')||'<div class="crm-empty">Todavía no hay solicitudes.</div>';root.querySelectorAll('[data-finance-id]').forEach(b=>b.onclick=()=>openFinance(b.dataset.financeId));updateNavCounts();renderOverview();}
function openFinance(id){const r=financeRequests.find(x=>x.id===id);if(!r)return;const d=document.createElement('dialog');d.className='admin-dialog mini-demo-dialog';d.innerHTML=`<form class="demo-dialog-body"><button class="modal-close" type="button">×</button><span class="eyebrow">Solicitud de financiamiento</span><h2>${r.vehicle}</h2><div class="demo-detail-grid"><div><span>Cliente</span><strong>${r.name}</strong></div><div><span>Inicial</span><strong>${money(r.down)}</strong></div><div><span>Plazo</span><strong>${r.months} meses</strong></div><div><span>WhatsApp</span><strong>${r.phone||'—'}</strong></div><div><span>Asesor</span><strong>${r.assignedAdvisor||'Autoasignado'}</strong></div></div><label class="crm-modal-field">Estado<select name="status"><option value="pending" ${r.status==='pending'?'selected':''}>En evaluación</option><option value="approved" ${r.status==='approved'?'selected':''}>Aprobada</option><option value="rejected" ${r.status==='rejected'?'selected':''}>No aprobada</option></select></label><button class="btn btn-primary btn-block" type="submit">Actualizar solicitud</button></form>`;document.body.appendChild(d);d.querySelector('.modal-close').onclick=()=>d.close();d.querySelector('form').onsubmit=e=>{e.preventDefault();r.status=e.currentTarget.status.value;saveCollection(FINANCE_REQUESTS_KEY,financeRequests);addActivity(`Financiamiento ${r.vehicle} · ${r.status==='approved'?'Aprobado':r.status==='rejected'?'No aprobado':'En evaluación'}`,'finance');renderFinance();d.close();};d.addEventListener('close',()=>d.remove(),{once:true});d.showModal();}

function renderActivity(){const root=document.getElementById('activityFeed');if(!root)return;let items=[];try{items=JSON.parse(localStorage.getItem(ACTIVITY_KEY)||'[]')}catch(_){ }root.innerHTML=items.slice(0,5).map(x=>`<div class="activity-item"><i class="${x.type}"></i><div><strong>${x.text}</strong><span>${new Date(x.date).toLocaleString('es-DO',{day:'2-digit',month:'short',hour:'2-digit',minute:'2-digit'})}</span></div></div>`).join('');}
function renderOverview(){const analytics=loadVehicleAnalytics();const rows=inventory.map(v=>({v,a:analytics[v.id]||{views:0,whatsappClicks:0}}));rows.sort((a,b)=>b.a.whatsappClicks-a.a.whatsappClicks);document.getElementById('overviewActiveLeads')&&(document.getElementById('overviewActiveLeads').textContent=leads.filter(x=>!['won','lost'].includes(x.status)).length);document.getElementById('overviewWhatsappClicks')&&(document.getElementById('overviewWhatsappClicks').textContent=rows.reduce((n,x)=>n+x.a.whatsappClicks,0));document.getElementById('overviewFinancePending')&&(document.getElementById('overviewFinancePending').textContent=financeRequests.filter(x=>x.status==='pending').length);document.getElementById('overviewTopVehicle')&&(document.getElementById('overviewTopVehicle').textContent=rows[0]?`${rows[0].v.brand} ${rows[0].v.model}`:'—');}
function updateNavCounts(){document.querySelector('[data-admin-view="leads"] .nav-count')&&(document.querySelector('[data-admin-view="leads"] .nav-count').textContent=leads.filter(x=>!['won','lost'].includes(x.status)).length);document.querySelector('[data-admin-view="finance"] .nav-count')&&(document.querySelector('[data-admin-view="finance"] .nav-count').textContent=financeRequests.filter(x=>x.status==='pending').length);}

const newLeadDemo=document.getElementById('newLeadDemo');if(newLeadDemo)newLeadDemo.onclick=()=>{const d=document.createElement('dialog');d.className='admin-dialog mini-demo-dialog';d.innerHTML=`<form class="demo-dialog-body"><button class="modal-close" type="button">×</button><span class="eyebrow">Nuevo lead</span><h2>Registrar oportunidad</h2><div class="demo-form-grid"><label>Nombre<input name="name" required></label><label>Vehículo<input name="vehicle" required></label><label>Canal<select name="channel"><option>WhatsApp</option><option>Instagram</option><option>Web</option><option>Teléfono</option></select></label><label>Estado<select name="status"><option value="new">Nueva</option><option value="follow">Seguimiento</option><option value="negotiation">Negociación</option></select></label></div><button class="btn btn-primary btn-block" type="submit">Guardar lead</button></form>`;document.body.appendChild(d);d.querySelector('.modal-close').onclick=()=>d.close();d.querySelector('form').onsubmit=e=>{e.preventDefault();const advisor=loadWhatsappTeam().find(a=>a.active&&String(a.phone||'').replace(/\D/g,''))||DEFAULT_WHATSAPP_TEAM[0];leads.unshift({id:crypto.randomUUID?.()||String(Date.now()),name:e.currentTarget.name.value,vehicle:e.currentTarget.vehicle.value,channel:e.currentTarget.channel.value,status:e.currentTarget.status.value,notes:'',assignedAdvisor:advisor.name,assignedAdvisorId:advisor.id,createdAt:new Date().toISOString()});saveCollection(LEADS_KEY,leads);addActivity(`Nuevo lead · ${e.currentTarget.vehicle.value}`,'lead');renderLeads();d.close();};d.addEventListener('close',()=>d.remove(),{once:true});d.showModal();};



// Smart WhatsApp Routing — configuración visual de la demo
const ROUTING_SPECIALTIES = [
  ['general','Ventas generales'],['finance','Financiamiento'],['tradein','Trade-in']
];
function renderRoutingTeam(){
  const root=document.getElementById('routingTeamGrid'); if(!root)return;
  const team=loadWhatsappTeam();
  root.innerHTML=team.map((a,index)=>`<article class="routing-advisor-card" data-routing-id="${a.id}">
    <div class="routing-advisor-top"><span class="routing-avatar">${String(index+1).padStart(2,'0')}</span><div><strong>${a.name||`Asesor ${index+1}`}</strong><small>${a.active&&String(a.phone||'').replace(/\D/g,'')?'Activo':'Sin activar'}</small></div><label class="routing-active"><input type="checkbox" data-field="active" ${a.active?'checked':''}> Activo</label></div>
    <label>Nombre<input data-field="name" value="${a.name||''}" placeholder="Ej. Carlos Méndez"></label>
    <label>Número WhatsApp<input data-field="phone" value="${a.phone||''}" inputmode="tel" placeholder="Ej. 18095551234"></label>
    <div class="routing-row"><label>Rol<input data-field="role" value="${a.role||''}" placeholder="Ventas"></label><label>Especialidad<select data-field="specialty">${ROUTING_SPECIALTIES.map(([value,label])=>`<option value="${value}" ${a.specialty===value?'selected':''}>${label}</option>`).join('')}</select></label></div>
    <div class="routing-card-foot"><span>${a.specialty==='finance'?'Prioridad: solicitudes de financiamiento':a.specialty==='tradein'?'Prioridad: consultas de trade-in':'Participa del reparto general'}</span></div>
  </article>`).join('');
  const active=team.filter(a=>a.active&&String(a.phone||'').replace(/\D/g,'')).length;
  document.getElementById('routingActiveCount')&&(document.getElementById('routingActiveCount').textContent=active);
}
function collectRoutingTeam(){
  return [...document.querySelectorAll('.routing-advisor-card')].map((card,index)=>({
    id:card.dataset.routingId||`wa${index+1}`,
    name:card.querySelector('[data-field="name"]').value.trim()||`Asesor ${index+1}`,
    phone:card.querySelector('[data-field="phone"]').value.trim(),
    role:card.querySelector('[data-field="role"]').value.trim()||'Ventas',
    specialty:card.querySelector('[data-field="specialty"]').value,
    active:card.querySelector('[data-field="active"]').checked
  }));
}
document.getElementById('saveRoutingTeam')?.addEventListener('click',()=>{
  const team=collectRoutingTeam(); saveWhatsappTeam(team); renderRoutingTeam();
  const status=document.getElementById('routingSaveStatus'); if(status){status.textContent='Configuración guardada para la demo.';setTimeout(()=>status.textContent='',2800)}
  addActivity(`Equipo WhatsApp actualizado · ${team.filter(a=>a.active&&String(a.phone||'').replace(/\D/g,'')).length} asesores activos`,'lead');
});
document.getElementById('resetRoutingTeam')?.addEventListener('click',()=>{saveWhatsappTeam(structuredClone(DEFAULT_WHATSAPP_TEAM));renderRoutingTeam();});
const routingGuideDialog=document.getElementById('routingGuideDialog');
document.getElementById('openRoutingGuide')?.addEventListener('click',()=>routingGuideDialog?.showModal());
document.querySelector('[data-close-routing-guide]')?.addEventListener('click',()=>routingGuideDialog?.close());
routingGuideDialog?.addEventListener('click',e=>{if(e.target===routingGuideDialog)routingGuideDialog.close()});
renderRoutingTeam();

ensureActivitySeed();renderLeads();renderFinance();renderActivity();renderOverview();updateNavCounts();
