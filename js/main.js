class WineCart {
    constructor(id, name, varietal, price, image, total) {
        this.id = id;
        this.name = name;
        this.varietal = varietal;
        this.price = price;
        this.image = image;
        this.total = total
    }
};

const formatter = new Intl.NumberFormat('es-AR');
const header = document.querySelector('header');
const goToCatalogue = document.querySelector('#catalogue');
const stockSection = document.querySelector('.wineStock');
const cartSection = document.querySelector('.wineCart');
const searchSection = document.querySelector('form');
const notyf = new Notyf();
let shop = JSON.parse(localStorage.getItem('cart')) || [];
shop !== null && shop.forEach((e) => { showCart(e) });
accumulator(shop);
let url = 'https://ec409a27-6b1b-4496-bc13-b93b23cb0d88.mock.pstmn.io/api/wines';
fetch(url)
    .then((res) => res.json(res))
    .then((data) => {
        wineStock = data;
        showWines(data)
    })
    .catch((err) => console.log(err));

goToCatalogue.onclick = () => {
    stockSection.querySelector('.card').scrollIntoView({ behavior: 'smooth', block: 'center' })
}

window.onscroll = () => {
    if (window.scrollY > 300) {
        header.classList.add('bg-custom-scroll')
    } else if (window.scrollY <= 300) {
        header.classList.remove('bg-custom-scroll')
    }
};

searchSection.onsubmit = (e) => {
    e.preventDefault();
    let inputName = searchSection[0].value;
    const find = wineStock.filter((e) => e.name.toLowerCase().includes(inputName.toLowerCase()));
    if (find.length > 0) {
        let card = stockSection.querySelectorAll('.card');
        for (const c of card) {
            c.remove()
        }
        showWines(find)
        stockSection.querySelector('.card').scrollIntoView({ behavior: 'smooth', block: 'center' })
    } else {
        notyf.error({
            message: 'No se encontraron resultados',
            duration: 2500,
            ripple: false
        })
    }
};

function showWines(array) {
    array.forEach((wine) => {
        let templateCard = document.querySelector('.wineCard').content.cloneNode(true);
        templateCard.querySelector('h5').innerText = wine.name;
        templateCard.querySelector('h6').innerText = wine.varietal;
        templateCard.querySelector('p').innerText += formatter.format(wine.price);
        templateCard.querySelector('.wineBottle').src = wine.image;
        templateCard.querySelector('.wineLogo').src = wine.logo;
        templateCard.querySelector('button').onclick = () => {
            let cartIndex = shop.findIndex((e) => e.id === wine.id);
            if (cartIndex === -1) {
                shop.push(new WineCart(wine.id, wine.name, wine.varietal, wine.price, wine.image, 1));
                showCart(wine)
            }
            else {
                shop[cartIndex].total += 1;
                let refreshAccumulator = document.getElementById(wine.id);
                refreshAccumulator.querySelector('.badge').innerText = shop[cartIndex].total
            }
            accumulator(shop);
            localStorage.setItem('cart', JSON.stringify(shop))
        }
        stockSection.append(templateCard)
    })
};

function showCart(wine) {
    let canvas = document.querySelector('.offcanvas-body')
    let templateBuy = document.querySelector('.buyButton').content.cloneNode(true);
    let templateList = document.querySelector('.wineItem').content.cloneNode(true);
    templateList.querySelector('li').id = wine.id;
    templateList.querySelector('.title').innerText = wine.name;
    templateList.querySelector('.varietal').innerText = wine.varietal;
    templateList.querySelector('.price').innerText += formatter.format(wine.price);
    templateList.querySelector('.imgCart').src = wine.image;
    wine.total == undefined ? templateList.querySelector('.badge').innerText = 1 : templateList.querySelector('.badge').innerText = wine.total;
    templateList.querySelector('.btn').onclick = () => {
        let cartIndex = shop.findIndex((e) => e.id === wine.id);
        document.getElementById(wine.id).remove();
        shop.splice(cartIndex, 1);
        accumulator(shop);
        localStorage.setItem('cart', JSON.stringify(shop))
        shop.length == 0 && canvas.querySelector('.buy').remove()
    }
    templateBuy.querySelector('.buy').onclick = () => {
        location.href = './pages/buy.html'
    }
    canvas.querySelector('.buy') ?? canvas.appendChild(templateBuy)
    cartSection.appendChild(templateList)
};

function accumulator(array) {
    let wineTotal = array.reduce((acc, e) => acc + e.total, 0);
    let priceTotal = array.reduce((acc, e) => acc + (e.price * e.total), 0);
    document.querySelector('.cartIndicator').innerText = wineTotal;
    let badgeTotal = document.querySelector('#total');
    priceTotal > 0 ? badgeTotal.classList.add('fw-bold') : wineID.classList.remove('fw-bold');
    priceTotal > 0 ? badgeTotal.innerText = `Total $ ${formatter.format(priceTotal)}` : wineID.innerText = 'El carrito esta vacio'
};