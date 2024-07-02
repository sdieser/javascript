let carrito = '';
let price = 0;
let enemigo = 'El Enemigo - $ 16.840';
let mara = 'Mara - $ 12.640';
let zaha = 'Zaha - $ 18.900';
let manos = 'Manos Negras - $ 16.400';
let cadus = 'Cadus - $ 29.865';

const menu = () => {
    let option = 0;

    while (option !== 3) {
        option = parseInt(prompt('MENÚ PRINCIPAL - Ingrese una opción:\n\n[1] Catálogo de vinos\n[2] Quiero ser socio\n\n[3] Salir'));

        optionControl(option, 0, 3);

        if (option === 1) {
            catalogo();
        }

        else if (option === 2) {
            subscription();
        }

        else if (option === 3) {
            alert('¡Gracias por visitar Wine Store!');
        }
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

const catalogo = () => {
    let option = 0;

    while (option !== 4) {
        option = parseInt(prompt('CATÁLOGO DE VINOS - Ingrese una opción:\n\n[1] Ver todos los vinos\n[2] Ver carrito\n[3] Vaciar carrito\n\n[4] Volver al menú'));

        optionControl(option, 0, 4);

        if (option === 1) {
            let stock = 0;

            while (stock !== 6) {
                stock = parseInt(prompt(`Seleccione sus vinos:\n\n[1] ${enemigo}\n[2] ${mara}\n[3] ${zaha}\n[4] ${manos}\n[5] ${cadus}\n\n[6] Salir`));

                optionControl(stock, 0, 6);

                wine(stock);
            }
        }

        else if (option === 2) {
            if (carrito === '') {
                alert('No hay productos en el carrito.');
            }

            else {
                alert(`Productos:\n\n${carrito}\nTOTAL: $ ${price}`);
            }
        }

        else if (option === 3) {
            carrito = '';

            price = 0;

            alert('Se han eliminado los productos');
        }

        else if (option === 4) {
            menu();
        }
    }
}

const wine = (stock) => {
    if (stock === 1) {
        price = price + 16840;

        carrito = carrito + enemigo + '\n';

        alert(`Producto agregado: ${enemigo}`);
    }

    else if (stock === 2) {
        price = price + 12640;

        carrito = carrito + mara + '\n';

        alert(`Producto agregado: ${mara}`);
    }

    else if (stock === 3) {
        price = price + 18900;

        carrito = carrito + zaha + '\n';

        alert(`Producto agregado: ${zaha}`);
    }

    else if (stock === 4) {
        price = price + 16400;

        carrito = carrito + manos + '\n';

        alert(`Producto agregado: ${manos}`);
    }

    else if (stock === 5) {
        price = price + 29865;

        carrito = carrito  + cadus + '\n';

        alert(`Producto agregado: ${cadus}`);
    }

    return price, carrito;
}

const subscription = () => {
    let nombre = prompt('Ingrese su nombre y apellido');

    let edad = parseInt(prompt('Ingrese su edad'));

    while (isNaN(edad) || edad < 18) {
        if (isNaN(edad)) {
            alert('Error - Ingrese un número');
        }

        else if (edad < 18) {
            alert('Debe ser mayor de 18 años');
        }

        edad = parseInt(prompt('Ingrese su edad'));
    }

    if (edad > 18) {
        alert(`Socio generado\n\nNombre: ${nombre}`);

        menu();
    }
}

menu();