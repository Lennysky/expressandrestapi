"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addressesRepository = void 0;
const addresses = [{ id: 1, value: 'Lenina, 14' }, { id: 2, value: 'Pushkina, 3' }];
exports.addressesRepository = {
    findAddresses() {
        return addresses;
    },
    findAddressById(id) {
        let address = addresses.find(a => a.id === id);
        return address;
    }
};
//# sourceMappingURL=addresses-repository.js.map