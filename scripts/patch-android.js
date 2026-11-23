// Ajusta o projeto Android gerado pelo Capacitor: permissões, ícones e teclado.
const fs = require('fs'), path = require('path');
const root = path.join(__dirname, '..'), android = path.join(root, 'android');
const mf = path.join(android, 'app/src/main/AndroidManifest.xml');
let x = fs.readFileSync(mf, 'utf8');
const perms = ['RECORD_AUDIO', 'CAMERA', 'MODIFY_AUDIO_SETTINGS', 'BLUETOOTH_CONNECT', 'POST_NOTIFICATIONS', 'FOREGROUND_SERVICE', 'FOREGROUND_SERVICE_MICROPHONE', 'WAKE_LOCK', 'VIBRATE'];
const add = perms.filter(p => !x.includes(`android.permission.${p}"`)).map(p => `    <uses-permission android:name="android.permission.${p}" />`).join('\n')
  + '\n    <uses-feature android:name="android.hardware.camera" android:required="false" />\n    <uses-feature android:name="android.hardware.microphone" android:required="false" />\n';
x = x.replace('</manifest>', add + '</manifest>');
if (!x.includes('windowSoftInputMode')) x = x.replace('android:launchMode="singleTask"', 'android:launchMode="singleTask"\n            android:windowSoftInputMode="adjustResize"');
fs.writeFileSync(mf, x);
fs.cpSync(path.join(root, 'resources/res'), path.join(android, 'app/src/main/res'), { recursive: true, force: true });
console.log('Projeto Android ajustado.');
