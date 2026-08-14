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

function normalizeWhatsappPhone(phone='') { return String(phone).replace(/\D/g,''); }
function loadWhatsappTeam() {
  try {
    const saved = JSON.parse(localStorage.getItem(WHATSAPP_TEAM_KEY) || '[]');
    return Array.isArray(saved) && saved.length ? saved : structuredClone(DEFAULT_WHATSAPP_TEAM);
  } catch (_) { return structuredClone(DEFAULT_WHATSAPP_TEAM); }
}
function getRoutingState(){ try{return JSON.parse(localStorage.getItem(WHATSAPP_ROTATION_KEY)||'{}')}catch(_){return {}} }
function chooseWhatsappAdvisor(source='general') {
  const active = loadWhatsappTeam().filter(a => a.active && normalizeWhatsappPhone(a.phone));
  if (!active.length) return DEFAULT_WHATSAPP_TEAM[0];
  let pool = active;
  const specialty = source === 'finance' ? 'finance' : source === 'tradein' ? 'tradein' : '';
  if (specialty) {
    const specialists = active.filter(a => a.specialty === specialty);
    if (specialists.length) pool = specialists;
  }
  const state = getRoutingState();
  const key = specialty || 'general';
  const next = Number(state[key] || 0) % pool.length;
  const advisor = pool[next];
  state[key] = (next + 1) % pool.length;
  localStorage.setItem(WHATSAPP_ROTATION_KEY, JSON.stringify(state));
  return advisor;
}
function whatsappUrl(advisor, message='') {
  const phone = normalizeWhatsappPhone(advisor?.phone) || '18094128551';
  return `https://wa.me/${phone}${message ? `?text=${encodeURIComponent(message)}` : ''}`;
}
function smartWhatsappOpen({message='', source='general', lead=null, vehicleId=''}={}) {
  const advisor = chooseWhatsappAdvisor(source);
  if (vehicleId) trackVehicleEvent(vehicleId, 'whatsappClicks');
  if (lead) addLead({...lead, assignedAdvisor:advisor.name, assignedAdvisorId:advisor.id});
  addActivity(`WhatsApp asignado a ${advisor.name}${lead?.vehicle ? ` · ${lead.vehicle}` : ''}`, 'lead');
  window.open(whatsappUrl(advisor, message), '_blank');
  return advisor;
}

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

function saveVehicleAnalytics(data) {
  localStorage.setItem(ANALYTICS_KEY, JSON.stringify(data));
}

function trackVehicleEvent(vehicleId, eventName) {
  const analytics = loadVehicleAnalytics();
  analytics[vehicleId] ||= { views: 0, whatsappClicks: 0, financeClicks: 0 };
  analytics[vehicleId][eventName] = (analytics[vehicleId][eventName] || 0) + 1;
  saveVehicleAnalytics(analytics);
}


const defaultInventory = [
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

const grid = document.getElementById('inventoryGrid');
const allInventoryGrid = document.getElementById('allInventoryGrid');
const empty = document.getElementById('emptyState');
const closeVehicleBtn = document.querySelector('[data-close-modal]');
const menu = document.getElementById('mobileMenu');
const sortInventory = document.getElementById('sortInventory');
const inventorySearch = document.getElementById('inventorySearch');

const money = n => new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0
}).format(n);

function normalizeVehicle(vehicle) {
  const gallery = Array.isArray(vehicle.gallery) && vehicle.gallery.length
    ? vehicle.gallery.filter(Boolean)
    : parseGalleryInput(vehicle.image);
  const cover = gallery[0] || vehicle.image || FALLBACK_IMAGE;
  return {
    ...vehicle,
    price: typeof vehicle.price === 'number' ? vehicle.price : null,
    mileage: vehicle.mileage || 'A consultar',
    power: vehicle.power || 'A consultar',
    engine: vehicle.engine || 'A consultar',
    transmission: vehicle.transmission || 'Automática',
    color: vehicle.color || 'A consultar',
    status: vehicle.status || (vehicle.sold ? 'sold' : 'available'),
    sold: (vehicle.status || (vehicle.sold ? 'sold' : 'available')) === 'sold',
    image: cover,
    gallery: gallery.length ? gallery : [cover],
    features: { ...featureDefaults(vehicle.id), ...(vehicle.features || {}) }
  };
}

function parseGalleryInput(value) {
  if (!value) return [];
  return String(value)
    .split(/\s|,|\n/) 
    .map(item => item.trim())
    .filter(item => item.startsWith('http'));
}

function loadInventory() {
  const storedVersion = localStorage.getItem(INVENTORY_VERSION_KEY);
  const stored = localStorage.getItem(INVENTORY_KEY);

  if (!stored || storedVersion !== INVENTORY_VERSION) {
    localStorage.setItem(INVENTORY_KEY, JSON.stringify(defaultInventory));
    localStorage.setItem(INVENTORY_VERSION_KEY, INVENTORY_VERSION);
    return defaultInventory.map(normalizeVehicle);
  }

  try {
    return JSON.parse(stored).map(normalizeVehicle);
  } catch (error) {
    localStorage.setItem(INVENTORY_KEY, JSON.stringify(defaultInventory));
    localStorage.setItem(INVENTORY_VERSION_KEY, INVENTORY_VERSION);
    return defaultInventory.map(normalizeVehicle);
  }
}

let inventory = loadInventory();

function displayPrice(vehicle) {
  return typeof vehicle.price === 'number' ? money(vehicle.price) : 'Precio a consultar';
}

function getVehicleMeta(vehicle) {
  return `${vehicle.brand} ${vehicle.model} ${vehicle.year}`;
}



function featureLabel(key) {
  return FEATURE_DEFINITIONS.find(([id]) => id === key)?.[1] || key;
}

function featureStatus(value) {
  if (value === true) return { label:'Sí', cls:'yes' };
  if (value === false) return { label:'No', cls:'no' };
  return { label:'A consultar', cls:'unknown' };
}

function featureHighlights(vehicle) {
  return FEATURE_DEFINITIONS
    .filter(([key]) => vehicle.features?.[key] === true)
    .slice(0, 3)
    .map(([,label]) => `<span>${label}</span>`)
    .join('');
}

function equipmentMarkup(vehicle) {
  return `
    <section class="equipment-section">
      <div class="equipment-head"><span>Equipamiento</span><small>Ficha técnica</small></div>
      <div class="equipment-grid">
        ${FEATURE_DEFINITIONS.map(([key,label]) => {
          const state = featureStatus(vehicle.features?.[key]);
          return `<div class="equipment-item ${state.cls}"><span>${label}</span><strong>${state.label}</strong></div>`;
        }).join('')}
      </div>
    </section>`;
}

const VEHICLE_STATUS = {
  available: { label:'Disponible', cls:'available' },
  reserved: { label:'Reservado', cls:'reserved' },
  negotiation: { label:'En negociación', cls:'negotiation' },
  sold: { label:'Vendido', cls:'sold' },
  incoming: { label:'Próximo ingreso', cls:'incoming' }
};

function vehicleStatus(vehicle){ return VEHICLE_STATUS[vehicle.status] || VEHICLE_STATUS.available; }

function addActivity(text, type='system') {
  let items=[]; try{items=JSON.parse(localStorage.getItem(ACTIVITY_KEY)||'[]')}catch(_){ }
  items.unshift({id:Date.now()+Math.random(), text, type, date:new Date().toISOString()});
  localStorage.setItem(ACTIVITY_KEY, JSON.stringify(items.slice(0,30)));
}

function addLead(data) {
  let leads=[]; try{leads=JSON.parse(localStorage.getItem(LEADS_KEY)||'[]')}catch(_){ }
  leads.unshift({id: crypto.randomUUID?.() || String(Date.now()), name:data.name||'Consulta web', phone:data.phone||'', vehicle:data.vehicle||'Consulta general', channel:data.channel||'Web', status:data.status||'new', notes:data.notes||'', assignedAdvisor:data.assignedAdvisor||'', assignedAdvisorId:data.assignedAdvisorId||'', createdAt:new Date().toISOString()});
  localStorage.setItem(LEADS_KEY, JSON.stringify(leads));
  addActivity(`Nueva consulta · ${data.vehicle||'Consulta general'}`, 'lead');
}

let compareSelection = [];
function updateCompareBar(){
  const bar=document.getElementById('compareBar'); const count=document.getElementById('compareCount');
  if(!bar||!count) return;
  bar.hidden=compareSelection.length===0;
  count.textContent=`${compareSelection.length} vehículo${compareSelection.length===1?'':'s'} seleccionado${compareSelection.length===1?'':'s'}`;
  document.querySelectorAll('[data-compare-id]').forEach(btn=>btn.classList.toggle('selected', compareSelection.includes(btn.dataset.compareId)));
}
function toggleCompare(id){
  if(compareSelection.includes(id)) compareSelection=compareSelection.filter(x=>x!==id);
  else if(compareSelection.length<3) compareSelection.push(id);
  else { alert('Podés comparar hasta 3 vehículos a la vez.'); return; }
  updateCompareBar();
}
function compareValue(v){ if(v===true)return 'Sí'; if(v===false)return 'No'; return 'A consultar'; }
function openCompareModal(){
  const selected=compareSelection.map(id=>inventory.find(v=>v.id===id)).filter(Boolean); if(selected.length<2){alert('Seleccioná al menos 2 vehículos para comparar.');return;}
  const root=document.getElementById('compareContent');
  const rows=[['Año',v=>v.year],['Millaje',v=>v.mileage],['Potencia',v=>v.power],['Motor',v=>v.engine],['Transmisión',v=>v.transmission],['Cámara 360°',v=>compareValue(v.features?.camera360)],['Apple CarPlay',v=>compareValue(v.features?.appleCarPlay)],['Asientos en piel',v=>compareValue(v.features?.leatherSeats)],['Tercera fila',v=>compareValue(v.features?.thirdRow)],['AWD / 4x4',v=>compareValue(v.features?.awd4x4)],['Sunroof panorámico',v=>compareValue(v.features?.panoramicSunroof)]];
  root.innerHTML=`<div class="compare-grid" style="--compare-cols:${selected.length}"><div class="compare-label"></div>${selected.map(v=>`<div class="compare-vehicle-head"><img src="${v.image}" alt="${getVehicleMeta(v)}"><strong>${v.brand} ${v.model}</strong><span>${vehicleStatus(v).label}</span></div>`).join('')}${rows.map(([label,fn])=>`<div class="compare-label">${label}</div>${selected.map(v=>`<div class="compare-cell">${fn(v)}</div>`).join('')}`).join('')}</div>`;
  document.getElementById('compareModal').showModal();
}


function homeInventorySource() {
  const active = inventory.filter(vehicle => vehicle.status !== 'sold');
  const featured = active.filter(vehicle => vehicle.featured);
  return featured.length ? featured : active.slice(0, 6);
}

function cardMarkup(vehicle) {
  const priceMarkup = typeof vehicle.price === 'number'
    ? `<div class="vehicle-price">${displayPrice(vehicle)}</div>`
    : `<div class="vehicle-price price-consult">${displayPrice(vehicle)}</div>`;

  return `
    <article class="vehicle-card vehicle-card-pro" data-id="${vehicle.id}">
      <div class="vehicle-media">
        <img src="${vehicle.image}" alt="${getVehicleMeta(vehicle)}" loading="lazy" onerror="this.src='${FALLBACK_IMAGE}'">
        <div class="vehicle-media-shade"></div>
        <div class="badge-row">
          ${vehicle.demo ? '<span class="badge demo-badge">Demo</span>' : ''}${vehicle.featured ? '<span class="badge red">Destacado</span>' : ''}
          <span class="badge availability-badge ${vehicleStatus(vehicle).cls}"><i></i>${vehicleStatus(vehicle).label}</span>
        </div>
        <span class="photo-count">${vehicle.gallery?.length || 1} fotos</span><button class="compare-toggle" data-compare-id="${vehicle.id}" type="button" aria-label="Comparar vehículo">+ Comparar</button>
      </div>
      <div class="vehicle-body">
        <div class="vehicle-meta"><span>${vehicle.year}</span><span>${vehicle.type}</span></div>
        <h3>${vehicle.brand} ${vehicle.model}</h3>
        ${priceMarkup}
        <div class="vehicle-quick-specs">
          <div><small>Millaje</small><strong>${vehicle.mileage}</strong></div>
          <div><small>Potencia</small><strong>${vehicle.power}</strong></div>
          <div><small>Motor</small><strong>${vehicle.engine}</strong></div>
        </div>
        <div class="vehicle-card-footer">
          <span>${vehicle.transmission}</span>
          <button type="button">Ver vehículo <b>→</b></button>
        </div>
      </div>
    </article>
  `;
}

function bindVehicleCardEvents(scope = document) {
  scope.querySelectorAll('.vehicle-card').forEach(card => {
    card.onclick = (event) => {
      if (event.target.closest('[data-compare-id]')) return;
      const parentDialog = card.closest('dialog');
      if (parentDialog?.id === 'inventoryBrowserModal') {
        parentDialog.close();
        setTimeout(() => openVehicle(card.dataset.id), 80);
        return;
      }
      openVehicle(card.dataset.id);
    };
  });

  scope.querySelectorAll('[data-compare-id]').forEach(btn => {
    btn.onclick = (event) => {
      event.stopPropagation();
      toggleCompare(btn.dataset.compareId);
    };
  });
}

function renderVehicleCards(target, list) {
  if (!target) return;
  target.innerHTML = list.map(cardMarkup).join('');
  bindVehicleCardEvents(target);
  updateCompareBar();
}

function renderInventory(list = homeInventorySource()) {
  renderVehicleCards(grid, list);
  empty.hidden = list.length > 0;
  const availableCount = document.getElementById('availableCount');
  if (availableCount) availableCount.textContent = inventory.filter(vehicle => vehicle.status !== 'sold').length;
}

function renderFullInventoryModal() {
  const list = inventory
    .filter(vehicle => vehicle.status !== 'sold')
    .sort((a, b) => Number(b.featured) - Number(a.featured) || Number(b.year) - Number(a.year));
  renderVehicleCards(allInventoryGrid, list);
  const count = document.getElementById('allInventoryCount');
  if (count) count.textContent = list.length;
}

function apply() {
  const q = inventorySearch.value.toLowerCase();
  let list = homeInventorySource().filter(vehicle => !q || `${vehicle.brand} ${vehicle.model} ${vehicle.year}`.toLowerCase().includes(q));

  if (sortInventory.value === 'priceAsc') list.sort((a, b) => (a.price ?? Number.MAX_SAFE_INTEGER) - (b.price ?? Number.MAX_SAFE_INTEGER));
  if (sortInventory.value === 'priceDesc') list.sort((a, b) => (b.price ?? -1) - (a.price ?? -1));
  if (sortInventory.value === 'newest') list.sort((a, b) => Number(b.year) - Number(a.year));
  if (sortInventory.value === 'featured') list.sort((a, b) => Number(b.featured) - Number(a.featured));

  renderInventory(list);
}

function thumbMarkup(vehicle) {
  if (!vehicle.gallery || vehicle.gallery.length <= 1) return '';
  return `
    <div class="modal-thumbs">
      ${vehicle.gallery.map((src, index) => `
        <button class="modal-thumb ${index === 0 ? 'active' : ''}" type="button" data-thumb="${src}">
          <img src="${src}" alt="${getVehicleMeta(vehicle)} - foto ${index + 1}" onerror="this.src='${FALLBACK_IMAGE}'">
        </button>
      `).join('')}
    </div>
  `;
}

function openVehicle(id) {
  const vehicle = inventory.find(item => item.id === id);
  if (!vehicle) return;
  trackVehicleEvent(vehicle.id, 'views');

  const modal = document.getElementById('vehicleModal');
  const priceText = displayPrice(vehicle);
  const gallery = vehicle.gallery?.length ? vehicle.gallery : [vehicle.image];
  let activeIndex = 0;
  const financingButton = `<button class="btn btn-ghost btn-block vehicle-finance-action" type="button">Quiero financiarlo</button>`;

  document.getElementById('vehicleModalContent').innerHTML = `
    <div class="vehicle-modal-inner vehicle-showroom">
      <div class="modal-gallery showroom-gallery">
        <div class="showroom-image-stage">
          <img id="modalMainImage" src="${gallery[0]}" alt="${getVehicleMeta(vehicle)}" onerror="this.src='${FALLBACK_IMAGE}'">
          <div class="showroom-image-overlay"></div>
          <div class="gallery-topline"><span>Galería</span><strong id="galleryCounter">1 / ${gallery.length}</strong></div>
          ${gallery.length > 1 ? '<button class="gallery-nav gallery-prev" type="button" aria-label="Foto anterior">‹</button><button class="gallery-nav gallery-next" type="button" aria-label="Foto siguiente">›</button>' : ''}
        </div>
        ${thumbMarkup(vehicle)}
      </div>
      <div class="modal-details showroom-details">
        <div class="showroom-status"><span><i></i>${vehicleStatus(vehicle).label}</span><small>Inversiones El Millón</small></div>
        <span class="eyebrow">${vehicle.year} · ${vehicle.type}</span>
        <h2>${vehicle.brand}<br><span>${vehicle.model}</span></h2>
        <div class="modal-price ${typeof vehicle.price === 'number' ? '' : 'price-consult'}">${priceText}</div>
        <p>${vehicle.description || ''}</p>
        <div class="detail-specs">
          <div><span>Millaje</span><strong>${vehicle.mileage}</strong></div>
          <div><span>Potencia</span><strong>${vehicle.power}</strong></div>
          <div><span>Motor</span><strong>${vehicle.engine}</strong></div>
          <div><span>Transmisión</span><strong>${vehicle.transmission}</strong></div>
          <div><span>Color</span><strong>${vehicle.color}</strong></div>
          <div><span>Estado</span><strong>${vehicleStatus(vehicle).label}</strong></div>
        </div>
        ${equipmentMarkup(vehicle)}
        <div class="showroom-cta-copy"><strong>¿Te interesa esta unidad?</strong><span>Consultá disponibilidad y próximos pasos directamente con un asesor.</span></div>
        <a class="btn btn-primary btn-block" data-whatsapp-vehicle="${vehicle.id}" target="_blank" href="https://wa.me/18094128551?text=${encodeURIComponent(`Hola, me interesa el ${vehicle.brand} ${vehicle.model} ${vehicle.year}.`)}">Consultar por WhatsApp <b>→</b></a>
        ${financingButton}
        <div class="showroom-assurance"><span>Atención directa</span><i></i><span>Consulta sin compromiso</span></div>
      </div>
      <div class="vehicle-mobile-actions">
        <a data-whatsapp-vehicle="${vehicle.id}" target="_blank" href="https://wa.me/18094128551?text=${encodeURIComponent(`Hola, me interesa el ${vehicle.brand} ${vehicle.model} ${vehicle.year}.`)}"><b>WhatsApp</b><span>Consultar</span></a>
        <button class="vehicle-finance-action" type="button"><b>Financiar</b><span>Simular</span></button>
        <a target="_blank" href="https://maps.app.goo.gl/FJE6jjyJiNayT6bp6"><b>Ubicación</b><span>Cómo llegar</span></a>
      </div>
    </div>
  `;

  modal.showModal();

  modal.querySelectorAll('[data-whatsapp-vehicle]').forEach(link => {
    link.addEventListener('click', event => {
      event.preventDefault();
      smartWhatsappOpen({
        message:`Hola, me interesa el ${vehicle.brand} ${vehicle.model} ${vehicle.year}.`,
        source:'vehicle', vehicleId:vehicle.id,
        lead:{vehicle:getVehicleMeta(vehicle), channel:'WhatsApp', status:'new'}
      });
    });
  });

  const main = document.getElementById('modalMainImage');
  const counter = document.getElementById('galleryCounter');
  const thumbs = [...document.querySelectorAll('.modal-thumb')];
  const setImage = index => {
    activeIndex = (index + gallery.length) % gallery.length;
    main.classList.add('switching');
    setTimeout(() => {
      main.src = gallery[activeIndex];
      if (counter) counter.textContent = `${activeIndex + 1} / ${gallery.length}`;
      thumbs.forEach((item, i) => item.classList.toggle('active', i === activeIndex));
      main.classList.remove('switching');
    }, 120);
  };

  thumbs.forEach((button, index) => button.addEventListener('click', () => setImage(index)));
  document.querySelector('.gallery-prev')?.addEventListener('click', event => { event.stopPropagation(); setImage(activeIndex - 1); });
  document.querySelector('.gallery-next')?.addEventListener('click', event => { event.stopPropagation(); setImage(activeIndex + 1); });
  document.querySelectorAll('.vehicle-finance-action').forEach(button => button.addEventListener('click', () => {
    trackVehicleEvent(vehicle.id, 'financeClicks');
    window.selectedFinanceVehicleId = vehicle.id;
    modal.close();
    setTimeout(() => document.getElementById('financiamiento').scrollIntoView({ behavior: 'smooth' }), 80);
  }));
}
closeVehicleBtn.onclick = () => document.getElementById('vehicleModal').close();

document.getElementById('menuBtn').onclick = () => {
  menu.classList.add('open');
  menu.setAttribute('aria-hidden', 'false');
};

document.getElementById('closeMenu').onclick = () => menu.classList.remove('open');
menu.querySelectorAll('a').forEach(anchor => anchor.onclick = () => menu.classList.remove('open'));


sortInventory?.addEventListener('change', apply);
inventorySearch?.addEventListener('input', apply);

const inventoryBrowserModal = document.getElementById('inventoryBrowserModal');
const openInventoryButtons = [document.getElementById('openInventoryModal'), document.getElementById('openInventoryModalSecondary')].filter(Boolean);
openInventoryButtons.forEach(button => button.addEventListener('click', () => {
  renderFullInventoryModal();
  inventoryBrowserModal?.showModal();
}));
document.querySelector('[data-close-full-inventory]')?.addEventListener('click', () => inventoryBrowserModal?.close());
inventoryBrowserModal?.addEventListener('click', event => { if (event.target === inventoryBrowserModal) inventoryBrowserModal.close(); });

const calc = () => {
  const p = +vehiclePrice.value;
  const d = +downPayment.value;
  const m = +months.value;
  const principal = Math.max(0, p - d);
  const rate = .079 / 12;
  const payment = principal * (rate * Math.pow(1 + rate, m)) / (Math.pow(1 + rate, m) - 1);
  vehiclePriceLabel.textContent = money(p);
  downPaymentLabel.textContent = money(d);
  monthsLabel.textContent = `${m} meses`;
  monthlyEstimate.textContent = `${money(Math.round(payment))}/mes`;
  financeInstagram.dataset.price = p; financeInstagram.dataset.down = d; financeInstagram.dataset.months = m;
};
['vehiclePrice', 'downPayment', 'months'].forEach(id => document.getElementById(id).addEventListener('input', calc));
calc();

const aboutModal = document.getElementById('aboutModal');
const openAboutModal = document.getElementById('openAboutModal');
const closeAboutModal = document.querySelector('[data-close-about]');
if (aboutModal && openAboutModal && closeAboutModal) {
  openAboutModal.addEventListener('click', () => aboutModal.showModal());
  closeAboutModal.addEventListener('click', () => aboutModal.close());
  aboutModal.addEventListener('click', event => {
    if (event.target === aboutModal) aboutModal.close();
  });
  aboutModal.querySelector('[data-about-inventory]')?.addEventListener('click', () => aboutModal.close());
}

const alertM = document.getElementById('alertModal');
document.getElementById('openAlert').onclick = () => alertM.showModal();
document.querySelector('[data-close-alert]').onclick = () => alertM.close();
alertSubmit.onclick = () => {
  localStorage.setItem('inversionesElMillonLastAlert', JSON.stringify({
    name: alertName.value,
    phone: alertPhone.value,
    query: alertQuery.value,
    date: new Date().toISOString()
  }));
  addLead({name:alertName.value, phone:alertPhone.value, vehicle:alertQuery.value || 'Alerta de inventario', channel:'Alerta web', status:'new'});
  alert('Búsqueda guardada correctamente.');
  alertM.close();
};

const vehicleRequestForm = document.getElementById('vehicleRequestForm');
if (vehicleRequestForm) {
  vehicleRequestForm.addEventListener('submit', event => {
    event.preventDefault();
    const request = {
      brand: document.getElementById('requestBrand').value.trim(),
      model: document.getElementById('requestModel').value.trim(),
      budget: document.getElementById('requestBudget').value.trim(),
      date: new Date().toISOString()
    };
    localStorage.setItem('inversionesElMillonVehicleRequest', JSON.stringify(request));
    const message = `Hola, estoy buscando un vehículo. Marca: ${request.brand}. Modelo: ${request.model}. Presupuesto: ${request.budget || 'a definir'}. Quiero que me avisen si ingresa una unidad compatible.`;
    smartWhatsappOpen({message, source:'general', lead:{vehicle:`${request.brand} ${request.model}`, channel:'Búsqueda web', status:'new'}});
  });
}


// Comparador
const compareModal=document.getElementById('compareModal');
document.getElementById('openCompare')?.addEventListener('click', openCompareModal);
document.getElementById('clearCompare')?.addEventListener('click',()=>{compareSelection=[];updateCompareBar();});
document.querySelector('[data-close-compare]')?.addEventListener('click',()=>compareModal.close());
compareModal?.addEventListener('click',e=>{if(e.target===compareModal)compareModal.close();});

// Solicitudes de financiamiento
const financeLeadModal=document.getElementById('financeLeadModal');
const financeVehicleSelect=document.getElementById('financeLeadVehicle');
function populateFinanceVehicles(){
  financeVehicleSelect.innerHTML='<option value="">Aún no decidí</option>'+inventory.filter(v=>v.status!=='sold').map(v=>`<option value="${v.id}">${getVehicleMeta(v)}</option>`).join('');
  if(window.selectedFinanceVehicleId) financeVehicleSelect.value=window.selectedFinanceVehicleId;
}
financeInstagram?.addEventListener('click',()=>{
  populateFinanceVehicles();
  document.getElementById('financeLeadDown').value=money(+financeInstagram.dataset.down||0);
  document.getElementById('financeLeadMonths').value=`${financeInstagram.dataset.months||72} meses`;
  financeLeadModal.showModal();
});
document.querySelector('[data-close-finance-lead]')?.addEventListener('click',()=>financeLeadModal.close());
financeLeadModal?.addEventListener('click',e=>{if(e.target===financeLeadModal)financeLeadModal.close();});
document.getElementById('financeLeadForm')?.addEventListener('submit',event=>{
  event.preventDefault();
  const vehicle=inventory.find(v=>v.id===financeVehicleSelect.value);
  const nameField=document.getElementById('financeLeadName'); const phoneField=document.getElementById('financeLeadPhone');
  const request={id:crypto.randomUUID?.()||String(Date.now()),name:nameField.value.trim(),phone:phoneField.value.trim(),vehicleId:vehicle?.id||'',vehicle:vehicle?getVehicleMeta(vehicle):'Vehículo a definir',price:+financeInstagram.dataset.price||0,down:+financeInstagram.dataset.down||0,months:+financeInstagram.dataset.months||72,status:'pending',createdAt:new Date().toISOString()};
  let requests=[];try{requests=JSON.parse(localStorage.getItem(FINANCE_REQUESTS_KEY)||'[]')}catch(_){ }
  requests.unshift(request);localStorage.setItem(FINANCE_REQUESTS_KEY,JSON.stringify(requests));
  addActivity(`Solicitud de financiamiento · ${request.vehicle}`,'finance');
  if(vehicle) trackVehicleEvent(vehicle.id,'financeClicks');
  const msg=`Hola, soy ${request.name}. Envié una solicitud de financiamiento por ${request.vehicle}. Inicial estimada: ${money(request.down)}, plazo: ${request.months} meses.`;
  financeLeadModal.close();
  const advisor=smartWhatsappOpen({message:msg, source:'finance', lead:{name:request.name,phone:request.phone,vehicle:request.vehicle,channel:'Financiamiento web',status:'follow'}, vehicleId:''});
  request.assignedAdvisor=advisor.name; request.assignedAdvisorId=advisor.id; localStorage.setItem(FINANCE_REQUESTS_KEY,JSON.stringify(requests));
});


// CTA generales: si hay varios números configurados, se distribuyen sin mostrar un selector al visitante.
document.querySelectorAll('a[data-smart-whatsapp]').forEach(link => {
  link.addEventListener('click', event => {
    event.preventDefault();
    const source = link.dataset.waSource || 'general';
    const message = link.dataset.waMessage || 'Hola, quiero recibir información de Inversiones El Millón.';
    smartWhatsappOpen({message, source, lead:{vehicle:'Consulta general',channel:'WhatsApp',status:'new'}});
  });
});

const observer = new IntersectionObserver(entries => entries.forEach(entry => entry.isIntersecting && entry.target.classList.add('visible')), { threshold: .12 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

renderInventory();
renderFullInventoryModal();
