// ========================================
// PRODUCTOS DINÁMICOS DESDE JSON
// ========================================

// Array de productos en formato JSON
const productos = [
    {
        name: 'Valait',
        img: 'https://drive.google.com/thumbnail?id=1AiSYy6bc4UCdvzPO-6Fm-FADYqN-RvbX&sz=w800',
        description: 'Caja con 30 Cápsulas (15 mg c/u) <br><b>Porción sugerida:</b> 1 cápsula <br><b>Modo de uso:</b> Tomar antes de dormir<br><b>Advertencias principales:</b> No en menores de 12 años' ,
        price: 1800.00,
        oldPrice: 1900.00,
        stock: 50,
        discount: null,
        category: 'vitaminas'
    },
    {
        name: 'Heliocare 360° Oral',
        img: 'https://drive.google.com/thumbnail?id=1ErZLY_vi1o-ZvBf0umgHpQeBVTQYsoDS&sz=w800',
        description: 'Frasco con 30 Cápsulas (490 mg c/u)<br><b>Porción sugerida:</b> 1 cápsula <br><b>Modo de uso:</b> 30 min antes de exposición solar <br><b>Advertencias principales:</b> No sustituye bloqueador tópico' ,
        price: 880.00,
        oldPrice: 900.00,
        stock: 30,
        discount: null,
        category: 'proteinas'
    },
    {
        name: 'Pearls IC',
        img: 'https://drive.google.com/thumbnail?id=1mwhKFmnJMImsFwsK5elaoMPDYYNlHYT6&sz=800',
        description: 'Caja con 10 Cápsulas (0.143 g c/u) <br><b>Porción sugerida:</b> 1 cápsula <br><b>Modo de uso:</b> Una vez al día con agua <br><b>Advertencias principales:</b> No masticar ni romper' ,
        price: 295.00,
        oldPrice: null,
        stock: 45,
        discount: null,
        category: 'naturales'
    },
    {
        name: 'Giranda',
        img: 'https://drive.google.com/thumbnail?id=1MNAAr5MyRWRaUbiMHDe1U397B7r-vzKU&sz=800',
        description: 'Caja con 60 Tabletas (1.0 g c/u) <br><b>Porción sugerida:</b> 2 tabletas <br><b>Modo de uso:</b> Una tableta mañana y noche <br><b>Advertencias principales:</b> Específico salud femenina' ,
        price: 898.00,
        oldPrice: 920.00,
        stock: 25,
        discount: null,
        category: 'naturales'
    },
    {
        name: 'Hialoflex',
        img: 'https://drive.google.com/thumbnail?id=1UZIhZ9pNZzOSJSTvW-CW5zvkP8Nd7TeK&sz=800',
        description: 'Caja con 30 Cápsulas (326 mg c/u) <br><b>Porción sugerida:</b> 1 cápsula <br><b>Modo de uso:</b> Una vez al día en ayunas <br><b>Advertencias principales:</b> Hipersensibilidad componentes.' ,
        price: 1450.00,
        oldPrice: 1500.99,
        stock: 60,
        discount: null,
        category: 'vitaminas'
    },
    {
        name: '80 Billion Probiotics',
        img: 'https://drive.google.com/thumbnail?id=1eg9vokKw4D0_d_XkbKwRrXTtC2wGTM1g&sz=800',
        description: 'Frasco con 60 Cápsulas (550 mg c/u) <br><b>Porción sugerida:</b> 1 cápsula <br><b>Modo de uso:</b> Con alimentos <br><b>Advertencias principales:</b> Mantener en un lugar fresco' ,
        price: 420.00,
        oldPrice: null,
        stock: 40,
        discount: null,
        category: 'proteinas'
    },
    {
        name: 'B Life Citrate Mag',
        img: 'https://drive.google.com/thumbnail?id=1s6b406Y7YV3HoXP3C_ZU70dODfUxlX57&sz=800',
        description: 'Frasco con 600 g <br><b>Porción sugerida:</b> 1 porcion de 10g <br><b>Modo de uso:</b> Una vez al día con agua <br><b>Advertencias principales:</b> No en insuficiencia renal' ,
        price: 750.00,
        oldPrice: 800.00,
        stock: 35,
        discount: null,
        category: 'proteinas'
    },
    {
        name: 'Idylla',
        img: 'https://drive.google.com/thumbnail?id=1GeNrWJrXdGI6X1matLzCak1xXaa-6ZEa&sz=800',
        description: 'Caja con 30 Cápsulas (1.041 g c/u) <br><b>Porción sugerida:</b> 1 cápsula <br><b>Modo de uso:</b> Una toma diaria con agua<br><b>Advertencias principales:</b> Solo para mujeres adultas' ,
        price: 742.00,
        oldPrice: null,
        stock: 55,
        discount: null,
        category: 'vitaminas'
    },
    {
        name: 'Talaric',
        img: 'https://drive.google.com/thumbnail?id=1_JJjaO4fOuuoovKtdDUbRbOzxPoMLm80&sz=800',
        description: 'Caja con 30 Cápsulas (1.062 g c/u) <br><b>Porción sugerida:</b> 2 cápsulas <br><b>Modo de uso:</b> Juntas con la comida <br><b>Advertencias principales:</b> No si usa anticoagulantes' ,
        price: 370.00,
        oldPrice: 400.00,
        stock: 28,
        discount: null,
        category: 'naturales'
    },
    {
        name: 'Krill Antarta',
        img: 'https://drive.google.com/thumbnail?id=1gKzzOMnZlbbkuFCy4S3mSNplBg8UH4nr&sz=800',
        description: 'Caja con 60 Cápsulas (500 mg c/u) <br><b>Porción sugerida:</b> 1 cápsula <br><b>Modo de uso:</b> Antes del desayuno <br><b>Advertencias principales:</b> No en alergia a mariscos' ,
        price: 1050.00,
        oldPrice: null,
        stock: 22,
        discount: null,
        category: 'proteinas'
    },
    {
        name: 'B Life U Tonic',
        img: 'https://drive.google.com/thumbnail?id=1baNcZduY4pjswmstFpWRQ9HyhZ-szP7X&sz=800',
        description: 'Frasco con 180 Cápsulas (500 mg c/u) <br><b>Porción sugerida:</b> 2 cápsulas <br><b>Modo de uso:</b> Diariamente con agua <br><b>Advertencias principales:</b> Salud de vías urinarias' ,
        price: 400.00,
        oldPrice: null,
        stock: 70,
        discount: null,
        category: 'vitaminas'
    },
    {
        name: 'Stop&Go',
        img: 'https://drive.google.com/thumbnail?id=1tahFBpA3_gYmyJqh0VlKgIWLXRWFRTz5&sz=800',
        description: 'Caja con 10 sobres (10 ml c/u) <br><b>Porción sugerida:</b> 1 sobre <br><b>Modo de uso:</b> Ingerir un sobre al día <br><b>Advertencias principales:</b> No en menores de 18 años' ,
        price: 349.00,
        oldPrice: 400.00,
        stock: 42,
        discount: null,
        category: 'naturales'
    },
    {
        name: 'Probvioptal',
        img: 'https://drive.google.com/thumbnail?id=1GuuelUK1lBsyjhsq9mVt9NBMzUoLD6VY&sz=800',
        description: 'Caja con 30 Cápsulas (500 mg Mezcla) <br><b>Porción sugerida:</b> 1 cápsula <br><b>Modo de uso:</b> Antes del desayuno <br><b>Advertencias principales:</b> Probióticos y prebióticos' ,
        price: 484.00,
        oldPrice: 500.00,
        stock: 30,
        discount: null,
        category: 'naturales'
    },
    {
        name: 'Pronat Proteína',
        img: 'https://drive.google.com/thumbnail?id=1lOwT53GwKpPlyFyMiGwRKFos7HHl2gfj&sz=800',
        description: '12 sobres (30g c/u) <br><b>Porción sugerida:</b> 1 sobre <br><b>Modo de uso:</b> Mezclar en agua o jugo <br><b>Advertencias principales:</b> Contiene fenilalanina' ,
        price: 475.00,
        oldPrice: null,
        stock: 54,
        discount: null,
        category: 'naturales'
    },
    {
        name: 'Magzen',
        img: 'https://drive.google.com/thumbnail?id=1n-n8hKN2QkLbhuZRrs0rsHSuO8YboWlh&sz=800',
        description: '60 Tabletas (965 mg c/u) <br><b>Porción sugerida:</b> 1 tableta <br><b>Modo de uso:</b> Diariamente con comida <br><b>Advertencias principales:</b> No en menores de 8 años' ,
        price: 490.00,
        oldPrice: 520.00,
        stock: 18,
        discount: null,
        category: 'naturales'
    },
    {
        name: 'Dieflex',
        img: 'https://drive.google.com/thumbnail?id=1DVCDFw5Jj7ovEBWFrPwHQpsUVlQ9up6x&sz=800',
        description: 'Caja con 30 Tabletas (500 mg Calcio/Zinc c/u) <br><b>Porción sugerida:</b> 1 tableta <br><b>Modo de uso:</b> Diariamente por la noche <br><b>Advertencias principales:</b> +18 años sugerido' ,
        price: 856.00,
        oldPrice: null,
        stock: 24,
        discount: null,
        category: 'naturales'
    },
    {
        name: 'Dielagen',
        img: 'https://drive.google.com/thumbnail?id=1Xuxcc7VM9rl6tMv891owUBdUWilDfSXk&sz=800',
        description: 'Caja con 60 Cápsulas <br><b>Porción sugerida:</b> 2 cápsulas <br><b>Modo de uso:</b> Juntas con alimentos<br><b>Advertencias principales:</b> Derivados de pescado' ,
        price: 809.00,
        oldPrice: 850.99,
        stock: 29,
        discount: null,
        category: 'naturales'
    },
    {
        name: 'Memozan',
        img: 'https://drive.google.com/thumbnail?id=1kJZExf-tiv6vbirlFQqSJXh5qKul8Pm6&sz=800',
        description: 'Caja con 60 Cápsulas <br><b>Porción sugerida:</b> 2 cápsulas <br><b>Modo de uso:</b> Diariamente tras desayuno<br><b>Advertencias principales:</b> No en embarazo ni lactancia' ,
        price: 696.00,
        oldPrice: 700.99,
        stock: 35,
        discount: null,
        category: 'naturales'
    },
    {
        name: 'Lactopram',
        img: 'https://drive.google.com/thumbnail?id=1yTH2DDx7hw3vxMM1A6zcPPm0pPnHVly-&sz=800',
        description: '20 cápsulas (430 mg c/u) <br><b>Porción sugerida:</b> 2 cápsulas <br><b>Modo de uso:</b> Por la mañana con agua<br><b>Advertencias principales:</b> Derivados lácteos' ,
        price: 98.00,
        oldPrice: null,
        stock: 42,
        discount: null,
        category: 'naturales'
    },
    {
        name: 'Nocele',
        img: 'https://drive.google.com/thumbnail?id=1yVT8aVyxstw6QpDnNV65rxZO0nLWCKgp&sz=800',
        description: 'Caja con 30 Cápsulas (400 mcg Fólico) <br><b>Porción sugerida:</b> 1 cápsula <br><b>Modo de uso:</b> Una toma diaria con agua <br><b>Advertencias principales:</b> Etapa pre-gestacional' ,
        price: 673.00,
        oldPrice: 700.00,
        stock: 28,
        discount: null,
        category: 'naturales'
    },
    {
        name: 'Paz-Ob',
        img: 'https://drive.google.com/thumbnail?id=1zcpW_eKRqmAzVxnIZOuj1t5ono39P38s&sz=800',
        description: 'Caja con 30 Cápsulas (300 mg Ác. Lipoico) <br><b>Porción sugerida:</b> 2 cápsulas <br><b>Modo de uso:</b> Dos cápsulas al día con agua. <br><b>Advertencias principales:</b> Consultar médico embarazo' ,
        price: 601.00,
        oldPrice: 650.00,
        stock: 17,
        discount: null,
        category: 'naturales'
    },
    {
        name: 'Previta-Mom',
        img: 'https://drive.google.com/thumbnail?id=1F-5UhYKVMv4AXd90jHWOj89ihch6o5pl&sz=800',
        description: 'Caja con 30 Cápsulas  <br><b>Porción sugerida:</b> 1 cápsula <br><b>Modo de uso:</b> Con la comida principal <br><b>Advertencias principales:</b> No en hemocromatosis' ,
        price: 487.00,
        oldPrice: null,
        stock: 36,
        discount: null,
        category: 'naturales'
    },
    {
        name: 'Probiolog GG',
        img: 'https://drive.google.com/thumbnail?id=1QhusRXg8XbteA_T6H2aHJq0PjsJPLEV2&sz=800',
        description: 'Caja con 10  Sobres (1.5 g c/u) <br><b>Porción sugerida:</b> 1 sobre <br><b>Modo de uso:</b> Directo o en agua fría <br><b>Advertencias principales:</b> No con bebidas calientes' ,
        price: 530.00,
        oldPrice: null,
        stock: 48,
        discount: null,
        category: 'naturales'
    },
    {
        name: 'Hemamina',
        img: 'https://drive.google.com/thumbnail?id=152eAA80hrRXMEyGuiinU8aaMVQN4bXZg&sz=800',
        description: 'Caja con 10 Ampolletas (10 ml)  <br><b>Porción sugerida:</b> 1 ampolleta <br><b>Modo de uso:</b> Una ampolleta bebible al día <br><b>Advertencias principales:</b> Puede oscurecer heces' ,
        price: 565.00,
        oldPrice: 600.00,
        stock: 20,
        discount: null,
        category: 'naturales'
    },
    {
        name: 'Ferrexel',
        img: 'https://drive.google.com/thumbnail?id=1iu4t-8bPBpP-vR6bCoDv3KYpob6GNBk4&sz=800',
        description: 'Caja con 60 Cápsulas (15 mg Hierro) <br><b>Porción sugerida:</b> 1 cápsula <br><b>Modo de uso:</b> Lejos de lácteos o café <br><b>Advertencias principales:</b> Hierro liposomado' ,
        price: 600.00,
        oldPrice: null,
        stock: 42,
        discount: null,
        category: 'naturales'
    },
    {
        name: 'Biometrix Q-10',
        img: 'https://drive.google.com/thumbnail?id=1kdEvWa3iZYu5L9YKEyEmw27apnTbXgh8&sz=800',
        description: 'Caja con 30 Cápsulas (1.4 g c/u) <br><b>Porción sugerida:</b> 1 cápsula <br><b>Modo de uso:</b> Con el desayuno <br><b>Advertencias principales:</b> No en menores de 18 años' ,
        price: 270.00,
        oldPrice: 300.00,
        stock: 50,
        discount: null,
        category: 'naturales'
    },
    {
        name: 'Biometrix Perf. A-OX',
        img: 'https://drive.google.com/thumbnail?id=1UIxCKK6Eha6eNXBOn9_3JA0tPJgJgZ4m&sz=800',
        description: 'Caja con 30 Cápsulas (1.2191g c/u) <br><b>Porción sugerida:</b> 1 cápsula <br><b>Modo de uso:</b> Diariamente por la mañana <br><b>Advertencias principales:</b> Evitar dosis dobles' ,
        price: 250.00,
        oldPrice: null,
        stock: 30,
        discount: null,
        category: 'naturales'
    },
    {
        name: 'Biometrix Performance',
        img: 'https://drive.google.com/thumbnail?id=1_Shuq0LX6SAVYSSnKFK4ZNxiUKkEtUT9&sz=800',
        description: 'Frasco con 100  Cápsulas (1.3956 g c/u) <br><b>Porción sugerida:</b> 1 cápsula <br><b>Modo de uso:</b> Con el desayuno <br><b>Advertencias principales:</b> Contiene Ginseng; no en menores de 18 años' ,
        price: 560.00,
        oldPrice: 600.99,
        stock: 38,
        discount: null,
        category: 'naturales'
    },
    {
        name: 'Hunter XNL',
        img: 'https://drive.google.com/thumbnail?id=1SSlUJjSmE6znGoUR-SiBDVhSeLE-URd0&sz=800',
        description: '1 Capsula (500 mg) <br><b>Porción sugerida:</b> 1 cápsula <br><b>Modo de uso:</b> 1h antes de ejercicio físico <br><b>Advertencias principales:</b> Estimulantes naturales' ,
        price: 150.00,
        oldPrice: 200.00,
        stock: 45,
        discount: null,
        category: 'naturales'
    },
    {
        name: 'Benel-G',
        img: 'https://drive.google.com/thumbnail?id=1N9e2ChV6d03k2BGuPGuqo6h6fm01OMyP&sz=800',
        description: 'Caja con 30 Cápsulas <br><b>Porción sugerida:</b> 1 cápsula <br><b>Modo de uso:</b> Una al día tras comer <br><b>Advertencias principales:</b> Complejo B + Zinc' ,
        price: 594.00,
        oldPrice: 630.00,
        stock: 26,
        discount: null,
        category: 'naturales'
    },
    {
        name: 'Granagard',
        img: 'https://drive.google.com/thumbnail?id=1wLG0LxOEOei8jjnMOwuJJnSd1wuueuI5&sz=800',
        description: 'Caja con 60 Cápsulas (0.64 mg Omega-5) <br><b>Porción sugerida:</b> 2 cápsulas <br><b>Modo de uso:</b> Tomar mañana y noche <br><b>Advertencias principales:</b> Omega-5 (Antioxidante)' ,
        price: 530.00,
        oldPrice: null,
        stock: 34,
        discount: null,
        category: 'naturales'
    },
    {
        name: 'Emergen-C',
        img: 'https://drive.google.com/thumbnail?id=1efP0i4nkms2JczTvZfha7HWFIea6FY-_&sz=800',
        description: 'Caja con 30 Sobres (1,000 mg Vit C) <br><b>Porción sugerida:</b> 9.1g <br><b>Modo de uso:</b> Disolver en agua al día <br><b>Advertencias principales:</b> No en cálculos renales' ,
        price: 18.00,
        oldPrice: null,
        stock: 40,
        discount: null,
        category: 'naturales'
    },
    {
        name: 'Punic',
        img: 'https://drive.google.com/thumbnail?id=19OvG_KskyQbAZBciBvrqAq_7Vg--W9em&sz=800',
        description: 'Frasco con 60 Cápsulas (500 mg Mezcla)<br><b>Porción sugerida:</b> 2 cápsulas <br><b>Modo de uso:</b> Con el desayuno <br><b>Advertencias principales:</b> Extracto de granada' ,
        price: 200.00,
        oldPrice: null,
        stock: 60,
        discount: null,
        category: 'naturales'
    },
    {
        name: 'Elevit 3-Luteína',
        img: 'https://drive.google.com/thumbnail?id=1BYCRcCKaoz60XBGKSEtbCOO7XL8jj59z&sz=800',
        description: 'Caja con 30 Cápsulas (1.36g c/u)<br><b>Porción sugerida:</b> 1 cápsula <br><b>Modo de uso:</b> Con el desayuno <br><b>Advertencias principales:</b> Etapa de lactancia' ,
        price: 460.00,
        oldPrice: null,
        stock: 26,
        discount: null,
        category: 'naturales'
    },





];

// Función para crear un card de producto
function crearProductoCard(producto) {
    // Calcular precio con centavos separados
    const precioEntero = Math.floor(producto.price);
    const precioCentavos = (producto.price % 1).toFixed(2).substring(2);
    
    return `
        <div class="producto-card" data-category="${producto.category}">
            <div class="producto-imagen">
                ${producto.discount ? `<span class="badge-descuento">-${producto.discount}%</span>` : ''}
                <img src="${producto.img}" alt="${producto.name}">
            </div>
            <div class="producto-contenido">
                <h3 class="producto-nombre">${producto.name}</h3>
                <p class="producto-descripcion">${producto.description}</p>
                
                <div class="producto-precio-stock">
                    <div class="precio-info">
                        <span class="precio-actual">$${precioEntero}<span class="precio-centavos">.${precioCentavos}</span></span>
                        ${producto.oldPrice ? `<span class="precio-anterior">$${producto.oldPrice}</span>` : ''}
                    </div>
                    <div class="stock-info">
                        <span class="stock-label">Stock:</span>
                        <span class="stock-numero">${producto.stock}</span>
                    </div>
                </div>

                <button class="btn-agregar" data-producto="${producto.name}" data-precio="${producto.price}">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="9" cy="21" r="1"></circle>
                        <circle cx="20" cy="21" r="1"></circle>
                        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                    </svg>
                    Agregar al Carrito
                </button>
            </div>
        </div>
    `;
}

// Función para renderizar todos los productos
function renderizarProductos(productosAMostrar = productos) {
    const grid = document.querySelector('.productos-grid');
    
    if (!grid) {
        console.error('No se encontró el contenedor de productos');
        return;
    }
    
    // Limpiar el grid
    grid.innerHTML = '';
    
    // Agregar cada producto
    productosAMostrar.forEach(producto => {
        grid.innerHTML += crearProductoCard(producto);
    });
    
    // Inicializar eventos de los botones
    inicializarBotonesAgregar();
}

// Función para filtrar productos por categoría
function filtrarProductos(categoria) {
    if (categoria === 'todos') {
        renderizarProductos(productos);
    } else {
        const productosFiltrados = productos.filter(p => p.category === categoria);
        renderizarProductos(productosFiltrados);
    }
}

// Inicializar botones de filtro
function inicializarFiltros() {
    const botonesFiltro = document.querySelectorAll('.filtro-btn');
    
    botonesFiltro.forEach(boton => {
        boton.addEventListener('click', () => {
            // Remover clase active de todos
            botonesFiltro.forEach(b => b.classList.remove('active'));
            
            // Agregar clase active al clickeado
            boton.classList.add('active');
            
            // Obtener categoría
            const categoria = boton.textContent.toLowerCase();
            
            // Filtrar productos
            filtrarProductos(categoria);
        });
    });
}

// Inicializar botones de agregar al carrito
function inicializarBotonesAgregar() {
    const botones = document.querySelectorAll('.btn-agregar');
    
    botones.forEach(boton => {
        boton.addEventListener('click', (e) => {
            const nombreProducto = e.currentTarget.getAttribute('data-producto');
            const precio = e.currentTarget.getAttribute('data-precio');
            //console.log(`Agregado al carrito: ${nombreProducto} - $${precio}`);
            
            //se busca el objeto exacto en el aray 'productos'
            const productoEncontrado = productos.find(p => p.name === nombreProducto);

            if (productoEncontrado) {
                // 3. Creamos el objeto para el carrito usando tus nombres exactos
                const productoParaCarrito = {
                    name: productoEncontrado.name,
                    price: productoEncontrado.price,
                    img: productoEncontrado.img,
                    quantity: 1
                };
                
                agregarAlCarrito(productoParaCarrito);
            }
            // Aquí conectarías con tu carrito
            // agregarAlCarrito(nombreProducto, precio);
            
            // Mostrar feedback visual
            //alert(`✅ ${nombreProducto} agregado al carrito`);
        });
    });
}

function agregarAlCarrito(productoNuevo) {
    // 1. Intentamos traer lo que ya existe en el carrito, si no, creamos un array vacío
    let carrito = JSON.parse(localStorage.getItem('vittalium_cart')) || [];

    // 2. Revisamos si el producto ya está en el carrito para no repetirlo
    const existe = carrito.find(item => item.name === productoNuevo.name);

    if (existe) {
        // Si ya existe, solo aumentamos la cantidad
        existe.quantity += 1;
    } else {
        // Si es nuevo, lo empujamos al array
        carrito.push(productoNuevo);
    }

    // 3. Guardamos el carrito actualizado de vuelta en el LocalStorage
    localStorage.setItem('vittalium_cart', JSON.stringify(carrito));
    
    // Llamamos a la función que vive en components.js para que el badge se mueva
    if (typeof actualizarContadorCarrito === 'function') {
        actualizarContadorCarrito();
    }
    
    console.log("Carrito actualizado:", productoNuevo.nombreProducto);
}

// Cargar productos cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    // Renderizar todos los productos
    renderizarProductos();
    
    // Inicializar filtros
    inicializarFiltros();
    
    console.log(`✅ ${productos.length} productos cargados`);
});

// Exportar para uso en otros archivos (opcional)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { productos, renderizarProductos, filtrarProductos };
}

function actualizarContadorCarrito() {
    const badge = document.getElementById('cart-count');
    if (!badge) return;

    const datosMem = localStorage.getItem('vittalium_cart');
    const carrito = JSON.parse(datosMem) || [];

    // Sumamos todas las cantidades de los productos
    const totalItems = carrito.reduce((acc, item) => acc + item.quantity, 0);

    badge.textContent = totalItems;

    // Opcional: Ocultar el badge si el carrito está vacío
    badge.style.display = totalItems > 0 ? 'flex' : 'none';
}

// Ejecutar al cargar la página para que el número persista al navegar
document.addEventListener('DOMContentLoaded', actualizarContadorCarrito);
