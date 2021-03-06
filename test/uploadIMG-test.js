var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../index'); // impport that server into this system when we do test
var should = chai.should(); // bunch of assertion that we are making
const sinon = require('sinon');
const pgPool = require('pg-pool');

chai.use(chaiHttp); 

describe('uploading image', function(){
  // tests associated with Admin
  var postgreStubQuery;
  beforeEach(function () {
    postgreStubQuery = sinon.stub(pgPool.prototype, 'query');
  });

  afterEach(function () {
    pgPool.prototype.query.restore();
  });

  after(function () {
    require('../index').stop();
  });

  it('should get to the uploading image page', function(done){
    const uid = 1;

    postgreStubQuery.onCall(0).resolves({
        rows: [{
        }],
    });
    postgreStubQuery.onCall(1).resolves({
      rows: [{
        }],
    });
    chai.request(server)
        .get(`/:${uid}/uploadimg`)
        .type('form')
        .send({
        })
        .end(function(error, res){
          res.should.have.status(200);
          res.text.should.contain(`<title>upload page</title>`); 
            
          done();
        });
  });

  // it('should upload image with removed background', function (done) {
  //   const uid = 1;
  //   const myimgid = 20;
  //   const uname = "testUser";
  //   postgreStubQuery.onCall(0).resolves({
  //     rows: [{
  //     }],
  //   });
  //   postgreStubQuery.onCall(1).resolves({});
  //   postgreStubQuery.onCall(2).resolves({
  //     rows: [{
  //       txtimg: '23asd1f',
  //       imgid: myimgid,
  //     }],
  //   });
  //   postgreStubQuery.onCall(3).resolves({
  //     rows: [{
  //       uid: uid,
  //       uname: uname,
  //     }],
  //   });
  //   chai.request(server)
  //     .post(`/:${uid}/uploadImagewithRemoveBG`)
  //     .type('form')
  //     .send({
  //       'upImg': { file: '' },
  //     })
  //     .then(function (error, res) {
  //       res.should.have.status(200);
  //       res.text.should.contain(`<title>Outfits</title>`);
  //       res.text.should.contain(`${uname}`);
  //       res.text.should.contain('23asd1f');
  //       res.text.should.contain(`${myimgid}`);
  //       done();
  //     })
  //     .end(
  //       done()
  //     );

  // });


  // it('should upload a origin image', function (done) {
  //   const uid = 1;
  //   const myimgid = 20;
  //   const uname = "testUser";
  //   postgreStubQuery.onCall(0).resolves({
  //     rows: [{
  //     }],
  //   });
  //   postgreStubQuery.onCall(1).resolves({});
  //   postgreStubQuery.onCall(2).resolves({
  //     rows: [{
  //       txtimg: '23asd1f',
  //       imgid: myimgid,
  //     }],
  //   });
  //   postgreStubQuery.onCall(3).resolves({
  //     rows: [{
  //       uid: uid,
  //       uname: uname,
  //     }],
  //   });
  //   chai.request(server)
  //     .post(`/:${uid}/uploadImage`)
  //     .type('form')
  //     .send({
  //     })
  //     .then(function (error, res) {
  //       res.should.have.status(200);
  //       res.text.should.contain(`<title>Outfits</title>`);
  //       res.text.should.contain(`${uname}`);
  //       res.text.should.contain('23asd1f');
  //       res.text.should.contain(`${myimgid}`);
  //       done();
  //     })
  //     .end(
  //       done()
  //     );


  // });


});

