import http from 'http'
import chai from 'chai';
import chaiHttp from 'chai-http';
import chaiDateTime from 'chai-datetime'

chai.use(chaiHttp);
chai.use(chaiDateTime);
chai.should();


describe("news_api_v1", () => {
    describe("GET /news/filter", () => {

        it("should filter the news by date", (done) => {
              const start_date = new Date()

              const end_date = new Date(start_date.getTime() + 111111111111111)
             chai.request('http://localhost:3311/')
                 .get(`news/filter?start_date=${start_date}&&end_date=${end_date}`)
                 .end((err, res) => {

                    start_date.should.beforeDate(end_date)

                    res.should.have.status(200);

                    chai.expect(res.body)
                        .to.be.an.instanceof(Array)
                        .and.to.have.property(0)
                        .that.includes.all.keys([ 'id', 'title', 'description', 'text', 'date' ])
                     done();
                  });
         });

        it("should sort the news by date", (done) => {
          const order = 'asc'
          chai.request('http://localhost:3311/')
              .get(`news/sort?order=${order}`)
              .end((err, res) => {
                   res.should.have.status(200);
                   chai.expect(new Date(res.body[0].date)).to.beforeDate(new Date(res.body[50].date))
                   chai.expect(res.body)
                     .to.be.an.instanceof(Array)
                     .and.to.have.property(0)
                     .that.includes.all.keys([ 'id', 'title', 'description', 'text', 'date' ])
                  done();
               });
         });


    });
});
