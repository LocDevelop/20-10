'use strict';

const $ = (selector) => document.querySelector(selector);
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const defaultMessage = 'Chúc nàng một ngày 20/10 thật rạng rỡ. Mong nàng luôn được yêu thương, được là chính mình và đủ can đảm theo đuổi những điều khiến trái tim hạnh phúc.\n\nKhông chỉ hôm nay, mà mỗi ngày đều xứng đáng là ngày của nàng.';
const flowers = {
  rose: { name: 'Hoa hồng', subtitle: 'YÊU THƯƠNG & TRÂN TRỌNG', viewBox: '0 0 768 512', description: 'Từng lớp cánh mềm ôm lấy nhau, như cách yêu thương được vun đắp từ những điều nhỏ bé. Trong khu vườn này, hoa hồng là lời cảm ơn dành cho người luôn mang đến sự ấm áp.', quote: 'Mong nàng được yêu thương bằng tất cả sự dịu dàng mà nàng đã dành cho thế giới.' },
  sophia: { name: 'Hoa Sophia', subtitle: 'VẺ ĐẸP & SỰ TINH TẾ', viewBox: '768 0 768 512', description: 'Sắc đào dịu nhẹ và những cánh hoa đan xen gợi nên một vẻ đẹp đầy nữ tính. Ở đây, Sophia là lời nhắn dành cho nét riêng của nàng: nhẹ nhàng, tinh tế, và không thể thay thế.', quote: 'Nàng không cần trở thành một ai khác. Chỉ cần là chính mình, đã là một điều rất đẹp.' },
  tulip: { name: 'Hoa tulip', subtitle: 'HẠNH PHÚC & HY VỌNG', viewBox: '0 512 768 512', description: 'Vươn mình đón ánh sáng, tulip mang đến cảm giác về những khởi đầu tươi mới. Một đóa hoa gửi gắm lời chúc cho những ước mơ đang chờ nàng bước tới.', quote: 'Chúc nàng đủ can đảm để bắt đầu, đủ bình yên để tận hưởng, và đủ yêu thương trên mọi hành trình.' },
  daisy: { name: 'Cúc họa mi', subtitle: 'CHÂN THÀNH & BÌNH YÊN', viewBox: '768 512 768 512', description: 'Nhỏ nhắn và trong trẻo, cúc họa mi nhắc ta về niềm vui giản dị: một buổi sáng chậm rãi, một nụ cười, một người thật lòng ở bên.', quote: 'Mong ngày của nàng có nắng, lòng nàng có bình yên, và bên cạnh luôn có người thật lòng.' }
};
const wishes = [
  'Mong nàng luôn tìm thấy một lý do để mỉm cười, một giấc mơ để theo đuổi và một vòng tay để trở về. Chúc mừng 20/10!',
  'Nàng đã làm rất tốt rồi. Hôm nay, cho phép mình nghỉ một chút, nhận một bó hoa và tận hưởng những điều dịu dàng nhé.',
  'Chúc người phụ nữ tuyệt vời đang đọc những dòng này: luôn được lắng nghe, được trân trọng và được hạnh phúc theo cách mình chọn.',
  'Có thể hôm nay nàng chưa nghe điều này: sự hiện diện của nàng là một món quà. Cảm ơn nàng vì đã ở đây và mang theo ánh sáng của riêng mình.',
  'Dù cuộc sống có bận rộn đến đâu, mong nàng vẫn dành một góc nhỏ cho bản thân — để mơ, để yêu, và để nở hoa.'
];
let wishIndex = Math.floor(Math.random() * wishes.length);
let suggestionIndex = 0;
let toastTimeout;

function toast(message) {
  $('#toast').textContent = message;
  $('#toast').classList.add('show');
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => $('#toast').classList.remove('show'), 3500);
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); } });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));

document.querySelectorAll('dialog').forEach((dialog) => {
  dialog.querySelector('.close-modal').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', (event) => {
    const rect = dialog.getBoundingClientRect();
    if (event.target === dialog && (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom)) dialog.close();
  });
});
$('#flower-dialog').setAttribute('aria-labelledby', 'modal-flower-title');
$('#gift-dialog').setAttribute('aria-label', 'Một bất ngờ dành cho nàng');
$('#card-dialog').setAttribute('aria-label', 'Viết thiệp chúc mừng 20 tháng 10');

document.querySelectorAll('[data-flower]').forEach((button) => button.addEventListener('click', () => {
  const flower = flowers[button.dataset.flower];
  $('#modal-flower-image').setAttribute('viewBox', flower.viewBox);
  $('#modal-flower-image').setAttribute('aria-label', flower.name);
  $('#modal-flower-subtitle').textContent = flower.subtitle;
  $('#modal-flower-title').textContent = flower.name;
  $('#modal-flower-description').textContent = flower.description;
  $('#modal-flower-quote').textContent = `“${flower.quote}”`;
  $('#flower-dialog').showModal();
}));

function createPetal(ambient = false, seed = false) {
  if (reducedMotion.matches || document.hidden) return;
  const petal = document.createElement('span');
  const duration = ambient ? 9 + Math.random() * 5 : 4 + Math.random() * 4;
  petal.className = `bloom-petal ${ambient ? 'ambient-petal' : ''} ${Math.random() > 0.6 ? 'light' : ''}`;
  petal.setAttribute('aria-hidden', 'true');
  petal.style.left = `${Math.random() * 100}%`;
  petal.style.setProperty('--size', `${7 + Math.random() * (ambient ? 11 : 15)}px`);
  petal.style.setProperty('--duration', `${duration}s`);
  petal.style.setProperty('--drift', `${Math.random() * 240 - 120}px`);
  petal.style.setProperty('--rotation', `${Math.random() * 720 - 360}deg`);
  if (seed) petal.style.animationDelay = `-${Math.random() * duration * 0.8}s`;
  document.body.appendChild(petal);
  petal.addEventListener('animationend', () => petal.remove(), { once: true });
}

function bloom(count = 48) {
  if (reducedMotion.matches || document.hidden) return;
  for (let i = 0; i < count; i++) setTimeout(() => createPetal(), i * 35);
}

let petalRainTimer;
function startPetalRain() {
  if (petalRainTimer || reducedMotion.matches || document.hidden) return;
  for (let i = 0; i < 6; i++) createPetal(true, true);
  petalRainTimer = setInterval(() => createPetal(true), 600);
}
function stopPetalRain() {
  clearInterval(petalRainTimer);
  petalRainTimer = undefined;
  document.querySelectorAll('.bloom-petal').forEach((petal) => petal.remove());
}
document.addEventListener('visibilitychange', () => document.hidden ? stopPetalRain() : startPetalRain());
reducedMotion.addEventListener('change', () => reducedMotion.matches ? stopPetalRain() : startPetalRain());
startPetalRain();

$('#open-gift').addEventListener('click', () => {
  $('#gift-message').textContent = wishes[wishIndex];
  $('#gift-dialog').showModal();
  bloom(30);
});
$('#another-gift').addEventListener('click', () => {
  wishIndex = (wishIndex + 1) % wishes.length;
  $('#gift-message').textContent = wishes[wishIndex];
  burst(innerWidth / 2, innerHeight / 2, 20);
});

$('#message').value = defaultMessage;
function updateCount() { $('#char-count').textContent = `${$('#message').value.length}/700`; }
updateCount();
$('#message').addEventListener('input', updateCount);
try {
  const saved = JSON.parse(localStorage.getItem('thang-muoi-card'));
  if (saved && typeof saved.message === 'string') {
    $('#message').value = saved.message.slice(0, 700);
    $('#recipient').value = String(saved.recipient || 'Nàng').slice(0, 60);
    $('#sender').value = String(saved.sender || '').slice(0, 70);
    updateCount();
    updatePreview();
  }
} catch { /* The card works without browser storage. */ }

function updatePreview() {
  $('#preview-to').textContent = `Gửi ${$('#recipient').value.trim() || 'nàng'},`;
  $('#preview-message').textContent = $('#message').value.trim() || defaultMessage;
  $('#preview-from').textContent = $('#sender').value.trim() || 'Một người luôn trân trọng nàng ♡';
}
function saveCard() {
  try { localStorage.setItem('thang-muoi-card', JSON.stringify({ recipient: $('#recipient').value, message: $('#message').value, sender: $('#sender').value })); } catch { /* Storage is optional. */ }
}
$('#customize').addEventListener('click', () => $('#card-dialog').showModal());
$('#suggest-message').addEventListener('click', () => {
  $('#message').value = wishes[suggestionIndex % wishes.length];
  suggestionIndex++;
  updateCount();
});
$('#card-form').addEventListener('submit', (event) => {
  event.preventDefault();
  if (!$('#message').value.trim()) { $('#message').setCustomValidity('Hãy viết một lời chúc nhỏ nhé.'); $('#message').reportValidity(); $('#message').setCustomValidity(''); return; }
  updatePreview();
  saveCard();
  $('#card-dialog').close();
  $('#letter').scrollIntoView({ behavior: reducedMotion.matches ? 'instant' : 'smooth', block: 'center' });
  $('#letter-paper').animate([{ transform: 'rotate(4deg)' }, { transform: 'rotate(0deg) scale(1.025)' }, { transform: 'rotate(4deg)' }], { duration: reducedMotion.matches ? 0 : 1000 });
  bloom(25);
  toast('Lời thương đã nằm trong tấm thiệp của bạn ♡');
});

function wrapText(context, text, width) {
  const lines = [];
  text.split('\n').forEach((paragraph) => {
    if (!paragraph.trim()) { lines.push(''); return; }
    let line = '';
    for (const word of paragraph.split(/\s+/)) {
      const candidate = line ? `${line} ${word}` : word;
      if (context.measureText(candidate).width <= width) { line = candidate; continue; }
      if (line) { lines.push(line); line = ''; }
      if (context.measureText(word).width > width) {
        for (const char of word) {
          if (context.measureText(line + char).width > width) { lines.push(line); line = char; } else line += char;
        }
      } else line = word;
    }
    if (line) lines.push(line);
  });
  return lines;
}
function drawBloom(ctx, x, y, radius, color) {
  ctx.save(); ctx.translate(x, y); ctx.strokeStyle = color; ctx.lineWidth = 1.8;
  for (let i = 0; i < 8; i++) { ctx.rotate(Math.PI / 4); ctx.beginPath(); ctx.ellipse(0, -radius * 0.65, radius * 0.26, radius * 0.65, 0, 0, Math.PI * 2); ctx.stroke(); }
  ctx.beginPath(); ctx.arc(0, 0, radius * 0.15, 0, Math.PI * 2); ctx.fillStyle = color; ctx.fill(); ctx.restore();
}
$('#download-card').addEventListener('click', async () => {
  if (!$('#message').value.trim()) { $('#message').reportValidity(); return; }
  const button = $('#download-card');
  button.disabled = true;
  try {
    await document.fonts.ready;
    const canvas = document.createElement('canvas');
    canvas.width = 1200; canvas.height = 1600;
    const ctx = canvas.getContext('2d');
    const gradient = ctx.createLinearGradient(0, 0, 1200, 1600); gradient.addColorStop(0, '#322033'); gradient.addColorStop(1, '#170f1c');
    ctx.fillStyle = gradient; ctx.fillRect(0, 0, 1200, 1600);
    ctx.strokeStyle = '#ba8ba14d'; ctx.lineWidth = 2; ctx.strokeRect(45, 45, 1110, 1510); ctx.strokeRect(57, 57, 1086, 1486);
    drawBloom(ctx, 1040, 180, 115, '#d89ca875'); drawBloom(ctx, 140, 1400, 90, '#d89ca860'); drawBloom(ctx, 1110, 1310, 48, '#d89ca850');
    ctx.textAlign = 'center'; ctx.fillStyle = '#e5afbe'; ctx.font = '22px "Be Vietnam Pro", sans-serif'; ctx.fillText('20 THÁNG 10 · NGÀY PHỤ NỮ VIỆT NAM', 600, 180);
    ctx.fillStyle = '#f5e4e8'; ctx.font = 'italic 80px "Playfair Display", Georgia, serif'; ctx.fillText('Mong nàng luôn nở hoa.', 600, 305);
    ctx.fillStyle = '#f3e5df'; ctx.fillRect(135, 395, 930, 1000);
    ctx.strokeStyle = '#9f65772e'; ctx.strokeRect(157, 417, 886, 956);
    drawBloom(ctx, 965, 495, 48, '#ae7483');
    ctx.textAlign = 'left'; ctx.fillStyle = '#a16c80';
    const recipient = `Gửi ${$('#recipient').value.trim() || 'nàng'},`;
    ctx.font = 'italic 47px "Playfair Display", Georgia, serif';
    if (ctx.measureText(recipient).width > 650) ctx.font = 'italic 34px "Playfair Display", Georgia, serif';
    const recipientLines = wrapText(ctx, recipient, 650); let y = 515;
    recipientLines.forEach((line) => { ctx.fillText(line, 210, y); y += 50; });
    const text = $('#message').value.trim();
    let fontSize = 32, lines;
    do { ctx.font = `${fontSize}px "Be Vietnam Pro", sans-serif`; lines = wrapText(ctx, text, 770); if (lines.length * fontSize * 1.8 <= 550) break; fontSize--; } while (fontSize > 19);
    y += 36; ctx.fillStyle = '#674858';
    lines.forEach((line) => { ctx.fillText(line, 210, y); y += fontSize * 1.8; });
    ctx.fillStyle = '#a16c80'; ctx.font = 'italic 29px "Playfair Display", Georgia, serif'; ctx.fillText('Với tất cả yêu thương,', 210, 1200);
    ctx.font = '26px "Be Vietnam Pro", sans-serif';
    const senderLines = wrapText(ctx, $('#sender').value.trim() || 'Một người luôn trân trọng nàng ♡', 760);
    senderLines.forEach((line, index) => ctx.fillText(line, 210, 1250 + index * 38));
    ctx.textAlign = 'center'; ctx.fillStyle = '#b592a7'; ctx.font = '20px "Be Vietnam Pro", sans-serif'; ctx.fillText('THÁNG MƯỜI NỞ HOA  ·  MỘT CHÚT YÊU THƯƠNG', 600, 1480);
    const blob = await new Promise((resolve) => canvas.toBlob(resolve, 'image/png'));
    if (!blob) throw new Error('Cannot create card');
    const url = URL.createObjectURL(blob); const anchor = document.createElement('a');
    anchor.href = url; anchor.download = 'thiep-20-10-thang-muoi-no-hoa.png'; document.body.appendChild(anchor); anchor.click(); anchor.remove(); setTimeout(() => URL.revokeObjectURL(url), 10000);
    saveCard(); toast('Đã tạo thiệp PNG. Gửi chút yêu thương đi nhé!');
  } catch { toast('Chưa tải được thiệp. Bạn thử lại một lần nhé.'); } finally { button.disabled = false; }
});

// A quiet original soundscape. Audio starts only after the listener asks for it.
let audioContext, masterGain, musicTimer, playing = false, noteIndex = 0;
const notes = [261.63, 329.63, 392, 523.25, 440, 392, 329.63, 293.66, 349.23, 440, 523.25, 587.33, 523.25, 440, 349.23, 329.63];
function playNote() {
  if (!audioContext || audioContext.state !== 'running' || !playing) return;
  const now = audioContext.currentTime;
  const frequency = notes[noteIndex++ % notes.length];
  [frequency, frequency / 2, frequency * 2].forEach((hz, index) => {
    const oscillator = audioContext.createOscillator(); const envelope = audioContext.createGain();
    oscillator.type = 'sine'; oscillator.frequency.value = hz;
    envelope.gain.setValueAtTime(0, now); envelope.gain.linearRampToValueAtTime(index === 0 ? 0.14 : 0.025, now + 0.08); envelope.gain.exponentialRampToValueAtTime(0.0001, now + 3.5);
    oscillator.connect(envelope); envelope.connect(masterGain); oscillator.start(now); oscillator.stop(now + 3.6);
    oscillator.onended = () => { oscillator.disconnect(); envelope.disconnect(); };
  });
}
function setSoundState() {
  $('#sound-toggle').setAttribute('aria-pressed', String(playing));
  $('#sound-toggle').setAttribute('aria-label', playing ? 'Tắt nhạc nền' : 'Bật nhạc nền');
  $('#sound-label').textContent = playing ? 'Nhạc đang ngân' : 'Bật chút nhạc';
}
$('#sound-toggle').addEventListener('click', async () => {
  try {
    if (!audioContext) {
      const AudioAPI = window.AudioContext || window.webkitAudioContext;
      if (!AudioAPI) { toast('Trình duyệt này chưa hỗ trợ nhạc nền.'); return; }
      audioContext = new AudioAPI(); masterGain = audioContext.createGain(); masterGain.gain.value = 0.35; masterGain.connect(audioContext.destination);
    }
    playing = !playing;
    if (playing) { await audioContext.resume(); playNote(); musicTimer = setInterval(playNote, 1100); }
    else { clearInterval(musicTimer); await audioContext.suspend(); }
    setSoundState();
  } catch { playing = false; clearInterval(musicTimer); setSoundState(); toast('Chưa phát được nhạc. Bạn thử chạm lại nhé.'); }
});

// Light points and a small, fading trail follow touch and mouse movement.
const canvas = $('#stardust');
const ctx = canvas.getContext('2d');
let width = innerWidth, height = innerHeight, stars = [], sparks = [], frame = 0, animationId;
let pointer = { x: width / 2, y: height / 2, active: false };
function resize() {
  width = innerWidth; height = innerHeight;
  const ratio = Math.min(devicePixelRatio || 1, 2);
  canvas.width = width * ratio; canvas.height = height * ratio; ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
  stars = Array.from({ length: width < 600 ? 26 : 55 }, () => ({ x: Math.random() * width, y: Math.random() * height, r: Math.random() * 1.1 + 0.25, offset: Math.random() * Math.PI * 2, speed: Math.random() * 0.12 + 0.025 }));
}
function burst(x, y, count = 12) {
  if (reducedMotion.matches) return;
  for (let i = 0; i < count; i++) sparks.push({ x, y, vx: (Math.random() - 0.5) * 2.4, vy: (Math.random() - 0.5) * 2.4, life: 1, r: 0.5 + Math.random() * 2 });
}
function render() {
  if (reducedMotion.matches || document.hidden) { animationId = undefined; return; }
  ctx.clearRect(0, 0, width, height); frame++;
  stars.forEach((star) => {
    star.y -= star.speed; if (star.y < -5) star.y = height + 5;
    const alpha = 0.12 + (Math.sin(frame * 0.013 + star.offset) + 1) * 0.2;
    ctx.beginPath(); ctx.fillStyle = `rgba(244,203,219,${alpha})`; ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2); ctx.fill();
    if (star.r > 1 && alpha > 0.4) { ctx.strokeStyle = `rgba(248,217,223,${alpha * 0.4})`; ctx.lineWidth = 0.6; ctx.beginPath(); ctx.moveTo(star.x - 4, star.y); ctx.lineTo(star.x + 4, star.y); ctx.moveTo(star.x, star.y - 4); ctx.lineTo(star.x, star.y + 4); ctx.stroke(); }
  });
  sparks = sparks.filter((spark) => spark.life > 0);
  if (sparks.length > 140) sparks.splice(0, sparks.length - 140);
  sparks.forEach((spark) => { spark.x += spark.vx; spark.y += spark.vy; spark.life -= 0.017; ctx.fillStyle = `rgba(249,213,205,${Math.max(0,spark.life)})`; ctx.beginPath(); ctx.arc(spark.x, spark.y, spark.r * Math.max(0, spark.life), 0, Math.PI * 2); ctx.fill(); });
  if (pointer.active && width > 800) { $('#hero-art').style.transform = `translate3d(${(pointer.x / width - 0.5) * -12}px,${(pointer.y / height - 0.5) * -8}px,0)`; pointer.active = false; }
  animationId = requestAnimationFrame(render);
}
resize();
if (!reducedMotion.matches) animationId = requestAnimationFrame(render);
window.addEventListener('resize', resize, { passive: true });
let lastTrail = 0;
window.addEventListener('pointermove', (event) => {
  pointer = { x: event.clientX, y: event.clientY, active: true };
  if (performance.now() - lastTrail > 40 && !event.target.closest('dialog,input,textarea')) { burst(event.clientX, event.clientY, 1); lastTrail = performance.now(); }
}, { passive: true });
$('#hero-art').addEventListener('pointerdown', (event) => { burst(event.clientX, event.clientY, 24); });
document.addEventListener('visibilitychange', async () => {
  if (document.hidden) { if (audioContext && playing) await audioContext.suspend(); }
  else { if (!animationId && !reducedMotion.matches) animationId = requestAnimationFrame(render); if (audioContext && playing) await audioContext.resume(); }
});
reducedMotion.addEventListener('change', () => { if (!reducedMotion.matches && !animationId) animationId = requestAnimationFrame(render); });
