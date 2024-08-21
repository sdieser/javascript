const formatter = new Intl.NumberFormat('es-AR');
const cartSection = document.querySelector('.wineList');
let form = document.querySelector('form');
let shop = JSON.parse(localStorage.getItem('cart'))
shop !== null && shop.forEach((e) => { showCart(e) });
let priceTotal = shop.reduce((acc, e) => acc + (e.price * e.total), 0);
let badgeTotal = document.querySelector('#total');
badgeTotal.innerText += formatter.format(priceTotal);

function showCart(wine) {
    let templateList = document.querySelector('.wineItem').content.cloneNode(true);
    templateList.querySelector('li').id = wine.id;
    templateList.querySelector('.title').innerText = wine.name;
    templateList.querySelector('.varietal').innerText = wine.varietal;
    templateList.querySelector('.price').innerText += formatter.format(wine.price);
    templateList.querySelector('.imgCart').src = `.${wine.image}`;
    wine.total == undefined ? templateList.querySelector('.badge').innerText = 1 : templateList.querySelector('.badge').innerText = wine.total;
    cartSection.appendChild(templateList)
};

let drawNumber = document.querySelector('.flip-card-front .number')
form[0].oninput = () => {
    let cardNumber = form[0].value;
    let formattedCardNumber = cardNumber.replace(/[^\d]/g, "");
    formattedCardNumber = formattedCardNumber.substring(0, 16);
    let cardNumberSections = formattedCardNumber.match(/\d{1,4}/g);
    if (cardNumberSections !== null) {
        formattedCardNumber = cardNumberSections.join(' ');
    }
    if (cardNumber !== formattedCardNumber) {
        form[0].value = formattedCardNumber;
    }
    drawNumber.innerText = form[0].value
}

let drawName = document.querySelector('.flip-card-front .name')
form[1].oninput = () => {
    drawName.innerText = form[1].value.toUpperCase()
}

let drawDate = document.querySelector('.flip-card-front .date')
form[2].oninput = () => {
    let cardDate = form[2].value;
    let formattedCardDate = cardDate.replace(/[^\d]/g, "");
    formattedCardDate = formattedCardDate.substring(0, 4);
    let cardNumberSections = formattedCardDate.match(/\d{1,2}/g);
    if (cardNumberSections !== null) {
        formattedCardDate = cardNumberSections.join(' / ');
    }
    if (cardDate !== formattedCardDate) {
        form[2].value = formattedCardDate;
    }
    drawDate.innerText = form[2].value
}

let drawCvC = document.querySelector('.flip-card-back .code')
form[3].oninput = () => {
    let cardCvc = form[3].value;
    let formattedCardCvc = cardCvc.replace(/[^\d]/g, "");
    formattedCardCvc = formattedCardCvc.substring(0, 3);
    if (cardCvc !== formattedCardCvc) {
        form[3].value = formattedCardCvc;
    }
    drawCvC.innerText = form[3].value
}

let card = document.querySelector('.flip-card-inner')
form[3].addEventListener("focusin", (event) => {
    card.classList.add('flip')
});
form[3].addEventListener("focusout", (event) => {
    card.classList.remove('flip')
});

form[4].onclick = (e) => {
    e.preventDefault();
    Swal.fire({
        title: '¡Muchas gracias!',
        text: 'La compra fue realizada.',
        icon: 'success',
        confirmButtonText: 'Ir al inicio',
        confirmButtonColor: "#3085d6"
    }).then((result) => {
        if (result.isConfirmed) {
            shop.splice(0);
            localStorage.setItem('cart', JSON.stringify(shop))
            location.href = '../index.html'
        }
    });
}