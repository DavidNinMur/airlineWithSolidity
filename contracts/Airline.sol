pragma solidity ^0.4.24;

contract Airline {
    address public owner;

    struct Customer {
        uint256 loyaltyPoints;
        uint256 totalFlight;
    }

    struct Flight {
        string name;
        uint256 price; /// uint === uint256
    }

    Flight[] public flights;

    uint256 etherPerPoint = 0.001 ether;

    mapping(address => Customer) public customers;
    mapping(address => Flight[]) public customersFlights;
    mapping(address => uint256) public customersTotalFlights;

    event FlightPurchased(
        address indexed customer,
        uint256 price,
        string flight
    );

    constructor() {
        owner = msg.sender;
        flights.push(Flight("Tokio", 12 ether));
        flights.push(Flight("Germany", 0.01 ether));
        flights.push(Flight("Amsterdam", 0.03 ether));
    }

    function buyFlight(uint256 flightIndex) public payable {
        Flight storage flightToBuy = flights[flightIndex];
        require(msg.value == flightToBuy.price);

        Customer storage customer = customers[msg.sender];
        customer.loyaltyPoints += 5;
        customer.totalFlight += 1;
        customersFlights[msg.sender].push(flightToBuy);
        customersTotalFlights[msg.sender]++;

        emit FlightPurchased(msg.sender, flightToBuy.price, flightToBuy.name);
    }

    function totalFlights() public view returns (uint256) {
        return flights.length;
    }

    function redeemLoyaltyPoitns() public {
        Customer storage customer = customers[msg.sender];
        uint256 etherToRefund = etherPerPoint * customer.loyaltyPoints;
        msg.sender.transfer(etherToRefund);
        customer.loyaltyPoints = 0;
    }

    function getRefundableEther() public view returns (uint256) {
        return etherPerPoint * customers[msg.sender].loyaltyPoints;
    }

    function getAirlineBalance() public view isOwner returns (uint256) {
        address airlinesAddress = this;
        return airlinesAddress.balance;
    }

    modifier isOwner() {
        require(msg.sender == owner);
        _;
    }
}
