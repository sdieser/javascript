class WineData {
    constructor(id, name, varietal, price) {
        this.id = id;
        this.name = name;
        this.varietal = varietal;
        this.price = price
    }
};

class WineCart {
    constructor(id, name, varietal, price, total) {
        this.id = id;
        this.name = name;
        this.varietal = varietal;
        this.price = price;
        this.total = total
    }
};

const wineStock = [{
    id: 'v1',
    name: 'Durigutti',
    varietal: 'Cabernet Franc',
    price: 14035
},
{
    id: 'v2',
    name: 'Punto Final',
    varietal: 'Malbec',
    price: 10177
},
{
    id: 'v3',
    name: 'El Enemigo',
    varietal: 'Cabernet Sauvignon',
    price: 10366
},
{
    id: 'v4',
    name: 'Dedicado',
    varietal: 'Cabernet Sauvignon',
    price: 19120
},
{
    id: 'v5',
    name: 'Riglos',
    varietal: 'Cabernet Sauvignon',
    price: 14692
},
{
    id: 'v6',
    name: 'El Enemigo',
    varietal: 'Malbec',
    price: 15024
},
{
    id: 'v7',
    name: 'Durigutti',
    varietal: 'Cabernet Sauvignon',
    price: 17866
},
{
    id: 'v8',
    name: 'El Enemigo',
    varietal: 'Cabernet Franc',
    price: 13556
},
{
    id: 'v9',
    name: 'Punto Final',
    varietal: 'Cabernet Sauvignon',
    price: 19549
},
{
    id: 'v10',
    name: 'Punto Final',
    varietal: 'Cabernet Franc',
    price: 12027
},
{
    id: 'v11',
    name: 'Riglos',
    varietal: 'Malbec',
    price: 16195
},
{
    id: 'v12',
    name: 'Dedicado',
    varietal: 'Malbec',
    price: 16679
},
{
    id: 'v13',
    name: 'Riglos',
    varietal: 'Cabernet Franc',
    price: 14800
},
{
    id: 'v14',
    name: 'Durigutti',
    varietal: 'Malbec',
    price: 18647
},
{
    id: 'v15',
    name: 'Piedra Negra',
    varietal: 'Chardonnay',
    price: 15426
}];

const formatter = new Intl.NumberFormat('es-AR');
const stockSection = document.querySelector('.wineStock');
const cartSection = document.querySelector('.wineCart');
const searchSection = document.querySelector('form');
let shop = JSON.parse(localStorage.getItem('cart')) || [];
shop !== null && shop.forEach((e) => { cart(e) });

searchSection.onsubmit = (e) => {
    e.preventDefault();
    let inputName = searchSection[0].value;
    const find = wineStock.filter((e) => e.name.toLowerCase().includes(inputName.toLowerCase()));
    if (find.length > 0) {
        let card = stockSection.querySelectorAll('.card');
        for (const c of card) {
            c.remove()
        }
        wines(find)
    } else {
        const toastNotFound = stockSection.querySelector('#liveToast');
        const toast = bootstrap.Toast.getOrCreateInstance(toastNotFound);
        toast.show()
    }
};

const accumulator = (array) => {
    let wineTotal = array.reduce((acc, e) => acc + e.total, 0);
    let priceTotal = array.reduce((acc, e) => (acc + e.price) * e.total, 0);
    document.querySelector('.cartIndicator').innerText = wineTotal;
    let wineID = document.querySelector('#total');
    priceTotal > 0 ? wineID.classList.add('fw-bold') : wineID.classList.remove('fw-bold');
    priceTotal > 0 ? wineID.innerText = `$ ${formatter.format(priceTotal)}` : wineID.innerText = 'El carrito esta vacio'
};

function cart(w) {
    const cartSection = document.querySelector('.wineCart');
    let templateList = document.querySelector('.wineItem').content.cloneNode(true);
    templateList.querySelector('li').id = w.id;
    templateList.querySelector('.title').innerText = w.name;
    templateList.querySelector('.varietal').innerText = w.varietal;
    templateList.querySelector('.price').innerText += formatter.format(w.price);
    w.total == undefined ? templateList.querySelector('.badge').innerText = 1 : templateList.querySelector('.badge').innerText = w.total;
    templateList.querySelector('.btn').onclick = () => {
        let cartIndex = shop.findIndex((e) => e.id === w.id);
        cartSection.querySelector(`#${w.id}`).remove();
        shop.splice(cartIndex, 1);
        accumulator(shop);
        localStorage.setItem('cart', JSON.stringify(shop))
    }
    cartSection.appendChild(templateList)
};

const wines = (array) => {
    array.forEach((w) => {
        let templateCard = document.querySelector('.wineCard').content.cloneNode(true);
        templateCard.querySelector('h5').innerText = w.name;
        templateCard.querySelector('h6').innerText = w.varietal;
        templateCard.querySelector('p').innerText += formatter.format(w.price);
        templateCard.querySelector('button').onclick = () => {
            let cartIndex = shop.findIndex((e) => e.id === w.id);
            if (cartIndex === -1) {
                shop.push(new WineCart(w.id, w.name, w.varietal, w.price, 1));
                cart(w)
            }
            else {
                shop[cartIndex].total += 1;
                let refreshAccumulator = document.querySelector(`#${w.id}`);
                refreshAccumulator.querySelector('.badge').innerText = shop[cartIndex].total
            }
            accumulator(shop);
            localStorage.setItem('cart', JSON.stringify(shop))
        }
        stockSection.append(templateCard)
    })
};

wines(wineStock);
accumulator(shop);