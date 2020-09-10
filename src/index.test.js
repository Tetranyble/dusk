import { expect } from 'chai';
import { JSDOM } from 'jsdom';
//import fs from 'fs';


describe('Our first test', () => {
  it('should pass', () => {
    expect(true).to.equal(true);
  });
});

/* describe('index.html', () => {
  it('should have h1 that says Users', (done) => {
    const index = fs.readFileSync('./src/index.html', "utf-8");
    const { window } = new jsdom(``, { runScripts: "dangerously" });
    jsdom.env(index, function(err, window) {
      const h1 = window.document.getElementsByTagName('h1')[0];
      expect(h1.innerHTML).to.equal("Users");
      done();
      window.close();
    });
  })
}) */
describe('index.html', () => { // eslint-disable-line
  it('should have h1 that says Users' , (done) => { // eslint-disable-line
    const options = {
      resources: 'usable',
      runScripts: 'dangerously',
    };
    JSDOM.fromFile('./dist/index.html', options).then(dom => {
      const meta = dom.window.document.querySelector("meta[name='application-name']").getAttribute('content')

      expect(meta).to.equal('Dusk')
      done()
    }).catch(done)
  })
})
