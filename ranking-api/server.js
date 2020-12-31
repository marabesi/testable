require('dotenv').config();

const config = JSON.parse(process.env.RANKING_FIREBASE_JSON || `{}`);
const firebaseDatabaseUrl = process.env.FIREBASE_DATABASE_URL;
const origins = process.env.CORS_ORIGINS || '';

console.log(`allowed origins: ${origins}`)

const admin = require('firebase-admin');
const express = require('express');

const app = express();

app.use(express.urlencoded({ extended: false }));

admin.initializeApp({
  credential: admin.credential.cert(config),
  databaseURL: firebaseDatabaseUrl,
});

const db = admin.database();

app.get('/', (req, res) => {
  const allowedHostName = origins.replace(/http:\/\//g, '').replace(/https:\/\//g, '')
  console.log('allowedhosts ', allowedHostName)
  console.log('req.host ', req.headers.host)
  if (!allowedHostName.split(',').includes(req.headers.host)) {
    res.status(500).end();
  } else {
    const levelRef = db.ref('users').orderByChild('level').limitToLast(10);
    levelRef.once('value', async function (snapshot) {
      const userData = snapshot.val();
      const filtered = [];

      for (let data in userData) {
        const user = await admin.auth().getUser(data);
        if (userData[data].level) {
          filtered.push({
            level: userData[data].level,
            name: user.displayName,
          });
        }
      }

      res.header('Access-Control-Allow-Origin', '*');
      res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
      );
      res.json({
        data: filtered.sort((a, b) => a.level < b.level),
      });
    });
  }
});

module.exports = app;