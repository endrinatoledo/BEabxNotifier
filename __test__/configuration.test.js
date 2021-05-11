const {postDataFromApi,getDataFromApi,putDataFromApi,deleteDataFromApi} = require('./getDataFromApi');
const testData = require('./testData');

describe('Probando configurationController', () => {
    test('test a getConfiguration', async (done) => {
        const api = testData.url + 'configuration/1';
        getDataFromApi(api).then(data => {
            expect('ABX').toBe(data.configuration.products);
            done();
        });
    });
    test('test a addConfiguration', async (done) => {
        const api = testData.url + 'configuration/1';
        postDataFromApi(api,testData.data.newConfiguration).then(data => {
            expect('Configuracion creado.').toBe(data.message);
            done();
        });
    });
    test('test a updateConfiguration', async (done) => {
        const api = testData.url + 'configuration/2';
        putDataFromApi(api,testData.data.newConfiguration).then(data => {
            expect('Configuracion actualizado.').toBe(data.message);
            done();
        });
    });
    test('test a deleteConfiguration', async (done) => {
        const api = testData.url + 'configuration/ABX2';
        deleteDataFromApi(api).then(data => {
            expect('configuracion  eliminada exitosamente').toBe(data.message);
            done();
        });
    });
});

