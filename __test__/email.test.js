const {postDataFromApi} = require('./getDataFromApi');
const testData = require('./testData');

describe('Probando emailController', () => {
 test('test a sendEmail', async (done) => {
    expect('Exitoso').toBe('Exitoso');
        const api = testData.url + 'email';
        postDataFromApi(api,testData.data.emailConfiguration).then(data => {
            expect('Exitoso').toBe(data.message);
            done();
        });;
    })
});

