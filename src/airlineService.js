export class AirlineService {

    constructor(contract) {
        this.contract = contract;
    }

    async buyFlight(flightIndex, from, value) {
        return this.contract.buyFlight(flightIndex, { from, value });
    }

    async getFlights() {
        let total = await this.getTotalFlight();
        let flights = [];
        for (let i = 0; i < total; i++) {
            let flight = await this.contract.flights(i)
            flights.push(flight);
        }
        return this.mapFlights(flights);
    }

    async getCustomerFlights(account) {
        let customerTotalFlights = await this.contract.customersTotalFlights(account);
        let flights = [];
        for (let i = 0; i < customerTotalFlights.toNumber(); i++) {
            let flight = await this.contract.customersFlights(account, i);
            flights.push(flight)
        }

        return this.mapFlights(flights);
    }

    async getTotalFlight() {
        return (await this.contract.totalFlights()).toNumber();
    }

    getRefundableEther(from) {
        return this.contract.getRefundableEther({ from });
    }

    redeemLoyaltyPoints(from) {
        return this.contract.redeemLoyaltyPoitns({ from });
    }

    mapFlights(flights) {
        return flights.map(flight => {
            return {
                name: flight[0],
                price: flight[1].toNumber()
            }
        })
    }

}
