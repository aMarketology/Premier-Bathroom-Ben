const https = require('https');

const url = process.argv[2] || 'http://localhost:3000';

const testData = {
  name: 'John Smith',
  email: 'john.smith@example.com',
  phone: '512-555-1234',
  service: 'bathroom-tile',
  message: 'I would like to get a quote for bathroom tile installation',
  smsConsent: true
};

console.log('🧪 Testing form submission...');
console.log('📤 Sending test data to:', `${url}/api/send-email`);
console.log('📋 Test data:', JSON.stringify(testData, null, 2));

const urlObj = new URL(`${url}/api/send-email`);
const options = {
  hostname: urlObj.hostname,
  port: urlObj.port || (urlObj.protocol === 'https:' ? 443 : 80),
  path: urlObj.pathname,
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  }
};

const protocol = urlObj.protocol === 'https:' ? https : require('http');

const req = protocol.request(options, (res) => {
  let data = '';

  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    console.log('\n📬 Response status:', res.statusCode);
    console.log('📨 Response body:', data);
    
    try {
      const jsonData = JSON.parse(data);
      if (jsonData.success) {
        console.log('\n✅ SUCCESS! 📧 Email should be sent to: premierremodelingoftexas@gmail.com, info@amarketology.com');
        console.log('🎯 Lead source: Champs Tile Branch');
      } else {
        console.log('\n❌ FAILED:', jsonData.error);
      }
    } catch (e) {
      console.log('\n⚠️  Could not parse response as JSON');
    }
  });
});

req.on('error', (error) => {
  console.error('\n❌ ERROR:', error.message);
  console.log('\n💡 Make sure your dev server is running: npm run dev');
});

req.write(JSON.stringify(testData));
req.end();
