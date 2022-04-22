const Airline = artifacts.require('Airline');

let instance;

beforeEach(async () => {
    instance = await Airline.new()// Airline.deployed(); antes de cada test crearemos un nuevo smart contract.
});

contract('Airline', accounts => {

    it('Should have available flights', async () => {
        let totalFlight = await instance.totalFlights();
        assert(totalFlight > 0);
    });
});