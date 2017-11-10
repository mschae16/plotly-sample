const Influx = require('influx');
const express = require('express');
const path = require('path');
const os = require('os');
const bodyParser = require('body-parser');
const app = express();

const influx = new Influx.InfluxDB({
  host: 'localhost',
  database: 'express_sample_db',
  schema: [
    {
      measurement: 'response_times',
      fields: {
        path: Influx.FieldType.STRING,
        duration: Influx.FieldType.INTEGER,
      },
      tags: [
        'host'
      ]
    }
  ]
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static(path.join(__dirname, 'public')));
app.set('port', 3000);

influx.getDatabaseNames()
  .then(names => {
    if (!names.includes('express_sample_db')) {
      return influx.createDatabase('express_sample_db');
    }
  })
  .then(() => {
    app.listen(app.get('port'), () => {
      console.log(`Listening on ${app.get('port')}.`);
    });
  })
  .catch(error => console.log({ error }))


app.use((request, response, next) => {
  const startTime = Date.now();

  response.on('finish', () => {
    const duration = Date.now() - startTime
    console.log(`Request to ${request.path} took ${duration}ms`);

    influx.writePoints([
      {
        measurement: 'response_times',
        tags: { host: os.hostname() },
        fields: { duration, path: request.path },
      }
    ]).catch(error => {
      console.error(`Error saving data to InfluxDB! ${err.stack}`)
    });
  });
  return next();
});

app.get('/', (request, response) => {
  response.send('Hello world!');
});

app.get('/api/v1/responses', (request, response) => {
  influx.query(`
    select * from response_times
    where host = ${Influx.escape.stringLit(os.hostname())}
    order by time desc
    limit 10
  `)
  .then(result => response.status(200).json(result))
  .catch(error => response.status(500).json({ error }));
});