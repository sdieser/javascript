const member = [];
const wine = [];
const shop = [];

class memberData {
    constructor (name, surname, age, email, phone){
        this.name = name;
        this.surname = surname;
        this.age = age;
        this.email = email;
        this.phone = phone;
    }
}

class wineData {
    constructor (id, name, price, stock) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.stock = stock;
    }
}

const optionControl = (option, min, max) => {
    if (isNaN(option)) {
        alert('Error - Ingrese un número');
    } 
    else if (option <= min || option > max) {
        alert('Error - Opción no disponible');
    }
}

const toStringWine = (array) => {
    let store = '';
    let count = -1;
    array.forEach((object) => {
        count += 1;
        store += `[${count}] ${object.name} - $ ${object.price} - Cantidad: ${object.stock}\n`;
    })
    return store;
}

const toStringShop = (array) => {
    let shop = '';
    array.forEach((object) => {
        shop += `${object.name} - $ ${object.price} - Cantidad: ${object.stock}\n`;
    })
    const total = array.reduce((acc, array) => acc + (array.price * array.stock), 0);
    shop += `\n• Total: $ ${total}`;
    return shop;
}

const toStringSearch = (array) => {
    let memberResult = '';
    array.forEach((object) => {
        memberResult += `${object.name} ${object.surname} - ${object.email} - ${object.phone}\n`;
    })
    return memberResult;
}

const menu = () => {
    let mainOption = 0;
    while (mainOption !== 3) {
        mainOption = parseInt(prompt('MENÚ PRINCIPAL - Ingrese una opción:\n\n[1] Catálogo de vinos\n[2] Socios\n\n[3] Salir'));
        optionControl(mainOption, 0, 3);
        if (mainOption === 1) {
            catalogo();
        }
        else if (mainOption === 2) {
            let memberOption = 0;
            while (memberOption !== 3) {
                memberOption = parseInt(prompt('SOCIOS - Ingrese una opción:\n\n[1] Agregar socio\n[2] Buscar socio\n\n[3] Salir'));
                optionControl(memberOption, 0, 3);
                if (memberOption === 1) {
                    memberAdd();
                }
                else if (memberOption === 2) {
                    memberSearch();
                    
                }
                else if (memberOption === 3) {
                    menu();
                }
            }
        }
        else if (mainOption === 3) {
            alert('¡Gracias por visitar Wine Store!');
        }
    }
}

const catalogo = () => {
    let catalogoOption = 0;
    while (catalogoOption !== 4) {
        catalogoOption = parseInt(prompt('CATÁLOGO DE VINOS - Ingrese una opción:\n\n[1] Ver todos los vinos\n[2] Ver carrito\n[3] Vaciar carrito\n\n[4] Volver al menú'));
        optionControl(catalogoOption, 0, 4);
        if (catalogoOption === 1) {
            let wineOption = 0;
            while (wineOption !== wine.length) {
                let wineString = toStringWine(wine);
                wineOption = parseInt(prompt(`Seleccione sus vinos:\n\n${wineString}\n[${wine.length}] Salir`));
                optionControl(wineOption, -1, wine.length);
                if (wineOption >= 0 && wineOption < wine.length) {
                    stockControl(wineOption);
                }
            }
        }
        else if (catalogoOption === 2) {
            if (shop.length === 0) {
                alert('No hay productos en el carrito.');
            }
            else {
                alert(toStringShop(shop));
            }
        }
        else if (catalogoOption === 3) {
            deleteStock();
            alert('Se han eliminado los productos');
        }
        else if (catalogoOption === 4) {
            menu();
        }
    }
}

const stockControl = (num) => {
    if (wine[num].stock === 0) {
        alert('Error - No hay disponibilidad');
    }
    else if (wine[num].stock > 0) {
        const index = shop.findIndex((element) => element.name === wine[num].name);
        if (index === -1) {
            shop.push(new wineData(wine[num].id, wine[num].name, wine[num].price, 1));
        }
        else {
            shop[index].stock += 1;
        } 
        wine[num].stock -= 1;
    }
}

const deleteStock = () => {
    for (const each of shop) {
        const index = wine.findIndex((element) => element.id === each.id);
        wine[index].stock += each.stock;
    }
    shop.splice(0);
}

const memberAdd = () => {
    let name = prompt('Nombre');
    while (name == '') {
        alert('Error - ingrese nombre');
        name = prompt('Nombre');
    }
    let surname = prompt('Apellido');
    while (surname == '') {
        alert('Error - ingrese apellido');
        surname = prompt('Apellido');
    }
    let age = parseInt(prompt('Edad'));
    while (isNaN(age) || age < 18) {
        if (isNaN(age)) {
            alert('Error - Ingrese un número');
        }
        else if (age < 18) {
            alert('Debe ser mayor de 18 años');
        }
        age = parseInt(prompt('Edad'));
    }
    let email = prompt('Correo electrónico');
    email = email.toLowerCase();
    let emailAt = email.includes('@');
    let emailDomain = email.includes('.com')
    while (email == '' || emailAt == false || emailDomain == false) {
        alert('Error - ingrese correo electrónico');
        email = prompt('Correo electrónico');
        email = email.toLowerCase();
        emailAt = email.includes('@');
        emailDomain = email.includes('.com');
    }
    let phone = parseInt(prompt('Teléfono'));
    while (phone == '' || isNaN(phone)) {
        if (isNaN(phone)) {
            alert('Error - Ingrese un número');
        }
        phone = parseInt(prompt('Teléfono'));
    }
    alert(`Socio agregado:\n\n• Nombre: ${name} ${surname}\n• Edad: ${age}\n• Correo electrónico: ${email}\n• Teléfono: ${phone}`)
    return member.push(new memberData(name, surname, age, email, phone));
}

const memberSearch = () => {
    let searchOption = 0;
    while (searchOption !== 5) {
        searchOption = parseInt(prompt('BUSCAR SOCIO - Ingrese una opción:\n\n[1] Buscar por nombre\n[2] Buscar por apellido\n[3] Buscar por correo electrónico\n[4] Buscar por teléfono\n\n[5] Volver al menú'));
        optionControl(searchOption, 0, 5);
        if (searchOption === 1) {
            let search = prompt('Ingrese el nombre');
            const result = member.filter((element) => element.name.toLowerCase().includes(search.toLowerCase()));
            if (result.length > 0) {
                alert(toStringSearch(result));
            }
            else if (result.length === 0) {
                alert('No se encontraron resultados');
            }
        }
        else if (searchOption === 2) {
            let search = prompt('Ingrese el apellido');
            const result = member.filter((element) => element.surname.toLowerCase().includes(search.toLowerCase()));
            if (result.length > 0) {
                alert(toStringSearch(result));
            }
            else if (result.length === 0) {
                alert('No se encontraron resultados');
            }
        }
        else if (searchOption === 3) {
            let search = prompt('Ingrese el correo electrónico');
            const result = member.filter((element) => element.email.toLowerCase().includes(search.toLowerCase()));
            if (result.length > 0) {
                alert(toStringSearch(result));
            }
            else if (result.length === 0) {
                alert('No se encontraron resultados');
            }
        }
        else if (searchOption === 4) {
            let search = parseInt(prompt('Ingrese el teléfono'));
            const result = member.filter((element) => element.phone = search);
            if (result.length > 0) {
                alert(toStringSearch(result));
            }
            else if (result.length === 0) {
                alert('No se encontraron resultados');
            }
        }
        else if (searchOption === 5) {
            menu();
        }
    }
}

const randomWine = (array) => {
    let name = ['El Enemigo', 'Riglos', 'Durigutti', 'Punto Final', 'Dedicado'];
    let type = ['Malbec', 'Cabernet Franc','Cabernet Sauvignon'];
    for (let i = 0; i < 50; i++) {
        let id = array.length + 1;
        let n = Math.round(Math.random() * 4);
        let t = Math.round(Math.random() * 2);
        let price = Math.ceil(Math.random() * 10000 + 10000);
        let wineName = name[n] + ' - ' + type[t];
        const index = array.findIndex((element) => element.name === wineName);
        if (index === -1) {
            array.push(new wineData(id, wineName, price, 1));
        }
        else {
            array[index].stock += 1;
        }
    }
}

randomWine(wine);

menu();