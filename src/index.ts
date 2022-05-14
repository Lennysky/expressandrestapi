/*
* 42.15 PUT-запрос
* */

import express, {Request, Response} from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import {productsRouter} from "./routes/products-router";
import {addressesRouter} from "./routes/addresses-router";

// создать экспресс-приложение
const app = express()

const corsMiddleware = cors();
app.use(corsMiddleware)
// получаем мидлварь
const jsonBodyMiddleware = bodyParser.json()
// этот мидлварь засовываем сюда:
app.use(jsonBodyMiddleware)
// app.use(bodyParser.json()) - в оригинале

const port = process.env.PORT || 5001


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
app.use('/products', productsRouter)
app.use('/addresses', addressesRouter)


// стартануть приложение
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})


