const productos = [
  /*Pulseras*/
  {
    id: "pulsera-volcanica",
    nombre: "Pulsera Volcánica",
    descripcion: "Pulsera hecha con piedras volcánicas",
    categoria: "Pulseras",
    precio: 45000,
    imagen: "assets/productos/Pulsera/PULSERA1.jpg",
  },
  {
    id: "pulsera-premium",
    nombre: "Pulsera Premium",
    descripcion: "Pulsera hecha con piedras premium",
    categoria: "Pulseras",
    precio: 55000,
    imagen:
      "assets/productos/Pulsera/PULSERA2.jpg",
  },
  {
    id: "pulsera-premium",
    nombre: "Pulsera Premium",
    descripcion: "Pulsera hecha con piedras premium",
    categoria: "Pulseras",
    precio: 55000,
    imagen:
      "assets/productos/Pulsera/PULSERA3.jpg",
  },
  {
    id: "pulsera-premium",
    nombre: "Pulsera Premium",
    descripcion: "Pulsera hecha con piedras premium",
    categoria: "Pulseras",
    precio: 55000,
    imagen:
      "assets/productos/Pulsera/PULSERA4.jpg",
  },
  {
    id: "pulsera-premium",
    nombre: "Pulsera Premium",
    descripcion: "Pulsera hecha con piedras premium",
    categoria: "Pulseras",
    precio: 55000,
    imagen:
      "assets/productos/Pulsera/PULSERA5.jpg",
  },
  {
    id: "pulsera-premium",
    nombre: "Pulsera Premium",
    descripcion: "Pulsera hecha con piedras premium",
    categoria: "Pulseras",
    precio: 55000,
    imagen:
      "assets/productos/Pulsera/PULSERA6.jpg",
  },
  {
    id: "pulsera-premium",
    nombre: "Pulsera Premium",
    descripcion: "Pulsera hecha con piedras premium",
    categoria: "Pulseras",
    precio: 55000,
    imagen:
      "assets/productos/Pulsera/PULSERA7.jpg",
  },
  {
    id: "pulsera-premium",
    nombre: "Pulsera Premium",
    descripcion: "Pulsera hecha con piedras premium",
    categoria: "Pulseras",
    precio: 55000,
    imagen:
      "assets/productos/Pulsera/PULSERA8.jpg",
  },
  {
    id: "pulsera-premium",
    nombre: "Pulsera Premium",
    descripcion: "Pulsera hecha con piedras premium",
    categoria: "Pulseras",
    precio: 55000,
    imagen:
      "assets/productos/Pulsera/PULSERA9.jpg",
  },
  {
    id: "pulsera-premium",
    nombre: "Pulsera Premium",
    descripcion: "Pulsera hecha con piedras premium",
    categoria: "Pulseras",
    precio: 55000,
    imagen:
      "assets/productos/Pulsera/PULSERA10.jpg",
  },

  /*Cadenas*/
  {
    id: "cadena-oro",
    nombre: "Cadena Oro Rosa",
    descripcion: "Cadena hecha con oro rosa",
    categoria: "Cadenas",
    precio: 120000,
    imagen:
      "https://images.unsplash.com/photo-1521369909029-2afed882baee?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "cadena-plata",
    nombre: "Cadena Plata",
    descripcion: "Cadena hecha con plata",
    categoria: "Cadenas",
    precio: 85000,
    imagen:
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=900&q=80",
  },

  /*Anillos*/
  {
    id: "anillo-esmeralda",
    nombre: "Anillo Esmeralda",
    descripcion: "Anillo hecho con esmeralda",
    categoria: "Anillos",
    precio: 168000,
    imagen:
      "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "anillo-clasico",
    nombre: "Anillo Clásico",
    descripcion: "Anillo hecho con materiales clásicos",
    categoria: "Anillos",
    precio: 97000,
    imagen:
      "https://images.unsplash.com/photo-1556906781-9a412961c28c?auto=format&fit=crop&w=900&q=80",
  },

  /*Aretes*/
  {
    id: "aretes-perla",
    nombre: "Aretes Perla",
    descripcion: "Aretes hechos con perlas",
    categoria: "Aretes",
    precio: 78000,
    imagen:
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "aretes-cristal",
    nombre: "Aretes Cristal",
    descripcion: "Aretes hechos con cristal",
    categoria: "Aretes",
    precio: 62000,
    imagen:
      "https://images.unsplash.com/photo-1522163182402-834f871fd851?auto=format&fit=crop&w=900&q=80",
  },

  /*Tobilleras*/
  {
    id: "tobillera-luna",
    nombre: "Tobillera Luna",
    descripcion: "Tobillera hecha con luna",
    categoria: "Tobilleras",
    precio: 34000,
    imagen:
      "https://images.unsplash.com/photo-1528740561666-dc2479dc08ab?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "tobillera-estrella",
    nombre: "Tobillera Estrella",
    descripcion: "Tobillera hecha con estrellas",
    categoria: "Tobilleras",
    precio: 38000,
    imagen:
      "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&w=900&q=80",
  },
];

const categorias = ["Pulseras", "Cadenas", "Anillos", "Aretes", "Tobilleras"];

productos.forEach(p => {
    if (!categorias.includes(p.categoria)) {
        console.log(`Error: Producto ${p.nombre} tiene categoria invalida: ${p.categoria}`);
    }
});

const categoriaActiva = "Pulseras";
const filtrados = productos.filter(p => p.categoria === categoriaActiva);
console.log(`Filtrados por ${categoriaActiva}: ${filtrados.length} productos`);
filtrados.forEach(p => {
    if (p.categoria !== categoriaActiva) {
        console.log(`BUG ENCONTRADO: Producto ${p.nombre} con categoria ${p.categoria} aparece en ${categoriaActiva}`);
    }
});
