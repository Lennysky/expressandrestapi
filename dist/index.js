"use strict";
/*
* 42.15 PUT-запрос
* */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const products_router_1 = require("./routes/products-router");
const addresses_router_1 = require("./routes/addresses-router");
// создать экспресс-приложение
const app = (0, express_1.default)();
const corsMiddleware = (0, cors_1.default)();
app.use(corsMiddleware);
// получаем мидлварь
const jsonBodyMiddleware = body_parser_1.default.json();
// этот мидлварь засовываем сюда:
app.use(jsonBodyMiddleware);
// app.use(bodyParser.json()) - в оригинале
const port = process.env.PORT || 5001;
/*
* Подключаем с базовой приставкой в виде кусочка адреса и пишем роутер, который
* за это отвечает.
* Подключаем как миддлварь.
* Каждый обработчик, хэндлер - это тоже миддлварь.
* Т.е. если вдруг что-то начинается на products,
* то роутер перехватывает управление
* смотрит, какая дальше часть после products,
* дергает конкретный обработчик.
* */
app.use('/products', products_router_1.productsRouter);
app.use('/addresses', addresses_router_1.addressesRouter);
// стартануть приложение
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
//# sourceMappingURL=index.js.map