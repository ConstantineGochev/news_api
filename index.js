import cluster from 'cluster'
import os from 'os'
import mongoose from 'mongoose'
import express from 'express'
import body_parser from 'body-parser'
import http from 'http'
import faker from 'faker'
import NewsPost from './models/news_post'
import news from './routes/news.js'

const num_cpus = os.cpus().length
const port = 3311;
let app;

function generate_data () {
    let news_posts = [];
    for(let id = 0; id < 111; id++) {
      let title = faker.hacker.phrase()
      let description = faker.lorem.paragraph()
      let text = faker.lorem.text()
      let date = faker.date.future()
      news_posts.push({
        "id":id,
        "title": title,
        "description": description,
        "text": text,
        "date": date
      })
    }
    NewsPost.insertMany(news_posts, function (err, result) {
      if(err) console.log(err)
      console.log(result)
    })

}

if(cluster.isMaster) {
        console.log(`Master ${process.pid} is running`);

        for (let i = 0; i < num_cpus; i++) {
           cluster.fork();
        }

        cluster.on('exit', (worker, code, signal) => {
          console.log(`worker ${worker.process.pid} died`);

        });
} else {

  // Connect to MongoDB
  mongoose
    .connect(
      'mongodb://mongo:27017/news_api_v1',
      { useNewUrlParser: true }
    )
    .then((err, db) => {
      if(err) {
        console.log(err)
      }

      console.log('MongoDB Connected')


    })
    .catch(err => console.log(err));
generate_data()
app = express()
        //UTIL MIDDLEWARE
    .use(body_parser.urlencoded({ extended: true }))
    .use(body_parser.json({type: '*/*'}))

        //ROUTES MIDDLEWARE
app.use('/news', news)
const server = http.createServer(app);


server.listen(port,function() {
	console.log('Listentning on ', port);
 })

}
