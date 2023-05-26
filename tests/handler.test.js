const handler = require('../src/handler')

const headers = {
    "content-type": "application/json",
};

describe('Dealers Tests', () => {

    const event = {};

    it('statusCode OK', async () => {
        result = await handler.getDealers(event);
        expect(result.statusCode).toBe(200);
    });
    it('headers validation', async () => {
        result = await handler.getDealers(event);
        expect(result.headers).toStrictEqual(headers);
    });
    it('body contains elements', async () => {
        result = await handler.getDealers(event);
        expect(result.body.length).toBeGreaterThan(0);
    });
});

describe('Vehicles Tests', () => {
    const eventOk = {
        pathParameters: {
            bac: "122345"
        }
    };

    const eventError = {
        pathParameters: {
            bac: "other_bac"
        }
    };

    it('statusCode OK', async () => {
        result = await handler.getVehiclesByBac(eventOk);
        expect(result.statusCode).toBe(200);
    });
    it('headers validation', async () => {
        result = await handler.getVehiclesByBac(eventOk);
        expect(result.headers).toStrictEqual(headers);
    });
    it('body contains elements', async () => {
        result = await handler.getVehiclesByBac(eventOk);
        expect(result.body.length).toBeGreaterThan(0);
    });
    it('statusCode Error', async () => {
        result = await handler.getVehiclesByBac(eventError);
        expect(result.statusCode).toBe(400);
    });
    it('body error contains error property', async () => {
        result = await handler.getVehiclesByBac(eventError);
        expect(result.body).toContain('error');
    });
});
