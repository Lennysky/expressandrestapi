"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productsRouter = void 0;
const express_1 = require("express");
const products_repository_1 = require("../repositories/products-repository");
exports.productsRouter = (0, express_1.Router)({});
/*мы обращаемся уже не к арр, а настраиваем отдельный кусок, productsRouter,
* который как модуль можно прилепить к нашему приложению.
 */
/*productsRouter.get('/', (req: Request, res: Response) => {
    res.send(products)
})*/
/*// если бы делали для одного, было бы так, это хардкод,
// но мы будем подставлять переменные
// мы не будем генерить тысячу эндпойнтов
// tomato - это параметр, изменяемая часть.
app.get('/products/tomato', (req: Request, res: Response) => {
    let tomato = products.find(p => p.title === 'tomato')
    res.send(tomato)
})*/
/*
* Сначала не работало без .toString, потому что говорило, что title может быть undefined, на самом деле
* он говорит, что title - это не обязательно строка. Т.к. мы можем передать title 2 раза:
* localhost:5000/products?title=0&title=fd, тогда он упакует в массив. Т.е. может быть строкой или массивом.
* Пропбовали прямо врунти вызвать toString:
* products.filter(p => p.title.indexOf(req.query,title.toString())> -1)) - до сих пор ругается.
* CTRL + ALT + V - вынесли в отдельную переменную, все сработало.
* Видимо, что-то сбивается с толку из-за вложений, что передали внутрь фильтра.
*
* Запустили в браузерной строке localhost:5000/products?title=o
* Выдало оба слова - и tomato, и orange, т.к. в tomato 'o' - на позиции 1, т.е. больше -1,
* в orange - на позиции 0, т.е. больше -1
* МИН 21.17 - ДАЛЬШЕ РАСПАРСИТЬ
* */
/* Он принял из query-запроса title, передал этот тайтл в репозиторий.
* Говорит, эй, репозиторий, я не знаю, как ты хранишь данные,
* но найди мне этот продукт и верни его с помощью ретурна
* Дальше я беру эти продукты и засовываю в сенд. */
exports.productsRouter.get('/', (req, res) => {
    var _a;
    //мы передаем title, если он есть, вызови toString(), если нет, все закончится
    //на undefined, передастся внутрь foundProducts undefined.
    const foundProducts = products_repository_1.productsRepository.findProducts((_a = req.query.title) === null || _a === void 0 ? void 0 : _a.toString());
    res.send(foundProducts);
});
exports.productsRouter.post('/', (req, res) => {
    const newProduct = products_repository_1.productsRepository.createProduct(req.body.title);
    res.status(201).send(newProduct);
});
// это реализация с переменной.
exports.productsRouter.get('/:id', (req, res) => {
    let product = products_repository_1.productsRepository.findProductById(+req.params.id);
    if (product) {
        res.send(product);
    }
    else {
        res.send(404);
    }
});
exports.productsRouter.put('/:id', (req, res) => {
    const isUpdated = products_repository_1.productsRepository.updateProduct(+req.params.id, req.body.title);
    if (isUpdated) {
        const product = products_repository_1.productsRepository.findProductById(+req.params.id);
        res.send(product);
    }
    else {
        res.send(404);
    }
});
/*
* Мы нашли продукт, нам этот продукт нужно удалить в массиве.
* В цикле for мы говорим, что если у i-того продукта, т.е. продукта по индексу i id === тому id,
* который сидит в параметре, то можно завершить алгоритм, удалив этот продукт.
* Удаляем products.splice(i, 1) - пишем, с этого индекса удали один элемент
* (т.е. первый параметр индекс, второй - количество элементов)
* Возвращаем ответ res.send(204).
* Ретурном мы прерываем цикл for.
* Если мы в условии не нашли этот продукт, ретурном не прервались, нужно выдать ошибку 404,
* т.е. что продукта не существует.
*
* МИН.29.25 - чекнуть в постмане
*
* */
exports.productsRouter.delete('/:id', (req, res) => {
    const isDeleted = products_repository_1.productsRepository.deleteProduct(+req.params.id);
    if (isDeleted) {
        res.send(204);
    }
    else {
        res.send(404);
    }
});
//# sourceMappingURL=products-router.js.map