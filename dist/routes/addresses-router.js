"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addressesRouter = void 0;
const express_1 = require("express");
const addresses = [{ id: 1, value: 'Lenina, 14' }, { id: 2, value: 'Pushkina, 3' }];
exports.addressesRouter = (0, express_1.Router)({});
exports.addressesRouter.get('/', (req, res) => {
    res.send(addresses);
});
exports.addressesRouter.get('/:id', (req, res) => {
    let address = addresses.find(a => a.id === +req.params.id);
    if (address) {
        res.send(address);
    }
    else {
        res.send(404);
    }
});
//# sourceMappingURL=addresses-router.js.map