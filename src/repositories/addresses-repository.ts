const addresses = [{id: 1, value: 'Lenina, 14'}, {id: 2, value: 'Pushkina, 3'}]

export const addressesRepository = {
    findAddresses () {
        return addresses
    },
    findAddressById (id: number) {
        let address = addresses.find(a => a.id === id)
        return address
    }
}