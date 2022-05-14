import {Request, Response, Router} from "express";

const products = [{id: 1, title: 'tomato'}, {id: 2, title: 'orange'}]

export const productsRouter = Router({})

/*мы обращаемся уже не к арр, а настраиваем отдельный кусок, productsRouter,
* который как модуль можно прилепить к нашему приложению.
 */

productsRouter.get('/', (req: Request, res: Response) => {
    res.send(products)
})
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
productsRouter.get('/', (req: Request, res: Response) => {
    /*если тайтл присутствует, нужно вернуть не все продукты, а нужно их попробовать отфильтровать*/
    if (req.query.title) {
        /*только продукты, где индекс слова, которое сюда прилетело (req.query.title) > -1, оно прилетит в браузер */
        let searchString = req.query.title.toString();
        res.send(products.filter(p => p.title.indexOf(searchString) > -1))
        /*если тайтла нет, вернуть все продукты целиком*/
    } else {
        res.send(products)
    }
})
productsRouter.post('/', (req: Request, res: Response) => {
    const newProduct = {
        id: +(new Date()),
        title: req.body.title
    }
    products.push(newProduct)
    res.status(201).send(newProduct)
})
// это реализация с переменной.
productsRouter.get('/:id', (req: Request, res: Response) => {
    let product = products.find(p => p.id === +req.params.id)
    if (product) {
        res.send(product)
    } else {
        res.send(404)
    }
})
productsRouter.put('/:id', (req: Request, res: Response) => {
    let product = products.find(p => p.id === +req.params.id)
    if (product) {
        product.title = req.body.title
        res.send(product)
    } else {
        res.send(404)
    }
})
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
productsRouter.delete('/:id', (req: Request, res: Response) => {
    for (let i = 0; i < products.length; i++) {
        if (products[i].id === +req.params.id) {
            products.splice(i, 1);
            res.send(204)
            return;
        }
    }
    res.send(404)
})