/**
 * Utility helper to intelligently resolve product images.
 * Priority:
 * 1. Nested `imagenes` array from API (e.g. p.imagenes[0].urlImagen)
 * 2. Flat `imagen` property from API if it starts with http
 * 3. Case-insensitive keyword matching based on product name
 * 4. Fallback based on category
 * 5. General fallback image
 */
export const resolveProductImage = (p: any): string => {
  if (!p) return "https://i.postimg.cc/mg9VVrB8/ANILLO1.jpg";

  // 1. Check if api returned imagenes array
  if (p.imagenes && Array.isArray(p.imagenes) && p.imagenes.length > 0) {
    const imgObj = p.imagenes[0];
    if (typeof imgObj === 'string' && imgObj.trim().startsWith('http')) {
      return imgObj;
    }
    if (imgObj && typeof imgObj === 'object') {
      const url = imgObj.urlImagen || imgObj.imagenUrl || imgObj.url || imgObj.ruta;
      if (url && typeof url === 'string' && url.trim().startsWith('http')) {
        return url.trim();
      }
    }
  }

  // 2. Check if api returned flat imagen
  if (p.imagen && typeof p.imagen === 'string' && p.imagen.trim().startsWith('http')) {
    return p.imagen.trim();
  }

  // 3. Fallback based on product name keywords
  const name = (p.nombre || "").toLowerCase();

  if (name.includes("volcanica") || name.includes("volcánica")) {
    return "https://i.postimg.cc/qvcyz6kk/PULSERA1.jpg";
  }

  if (name.includes("premium")) {
    if (name.includes("2")) return "https://i.postimg.cc/y8hck3VB/PULSERA3.jpg";
    if (name.includes("3")) return "https://i.postimg.cc/2SdhVLzk/PULSERA4.jpg";
    if (name.includes("4")) return "https://i.postimg.cc/9QPZrwWF/PULSERA5.jpg";
    if (name.includes("5")) return "https://i.postimg.cc/jS6PLnsS/PULSERA6.jpg";
    if (name.includes("6")) return "https://i.postimg.cc/hGSxx4jF/PULSERA7.jpg";
    if (name.includes("7")) return "https://i.postimg.cc/7Lx77P6r/PULSERA8.jpg";
    if (name.includes("8")) return "https://i.postimg.cc/8C1WWk5V/PULSERA9.jpg";
    if (name.includes("9")) return "https://i.postimg.cc/LsHff4XS/PULSERA10.jpg";
    return "https://i.postimg.cc/Mp0VvfWq/PULSERA2.jpg";
  }

  if (name.includes("oro rosa")) {
    return "https://i.postimg.cc/SRXcsZK7/CADENA1.jpg";
  }

  if (name.includes("cadena plata")) {
    if (name.includes("3")) return "https://i.postimg.cc/J0yjnTh5/CADENA3.jpg";
    if (name.includes("4")) return "https://i.postimg.cc/SRXcsZKV/CADENA4.jpg";
    if (name.includes("5")) return "https://i.postimg.cc/4yKpd83W/CADENA5.jpg";
    if (name.includes("6")) return "https://i.postimg.cc/GtBv2Mp7/CADENA6.jpg";
    if (name.includes("7")) return "https://i.postimg.cc/Y04Q9XSy/CADENA7.jpg";
    if (name.includes("8")) return "https://i.postimg.cc/2yqn6H5M/CADENA8.jpg";
    if (name.includes("9")) return "https://i.postimg.cc/nrsqzdLN/CADENA9.jpg";
    if (name.includes("10")) return "https://i.postimg.cc/MHc1TsGC/CADENA10.jpg";
    return "https://i.postimg.cc/6q7C3HQh/CADENA2.jpg";
  }

  if (name.includes("esmeralda")) {
    if (name.includes("3")) return "https://i.postimg.cc/8zvwwCNZ/ANILLO3.jpg";
    if (name.includes("5")) return "https://i.postimg.cc/JzXKKhMv/ANILLO5.jpg";
    if (name.includes("7")) return "https://i.postimg.cc/vZnXXmbN/ANILLO7.jpg";
    if (name.includes("9")) return "https://i.postimg.cc/43TP0TxW/ANILLO9.jpg";
    return "https://i.postimg.cc/mg9VVrB8/ANILLO1.jpg";
  }

  if (name.includes("clásico") || name.includes("clasico")) {
    if (name.includes("4")) return "https://i.postimg.cc/DwG55zn5/ANILLO4.jpg";
    if (name.includes("6")) return "https://i.postimg.cc/bwnLLvp5/ANILLO6.jpg";
    if (name.includes("8")) return "https://i.postimg.cc/QMrmzrd0/ANILLO8.jpg";
    if (name.includes("10")) return "https://i.postimg.cc/HLCzNCkS/ANILLO10.jpg";
    return "https://i.postimg.cc/y8RnnNsf/ANILLO2.jpg";
  }

  if (name.includes("perla")) {
    if (name.includes("3")) return "https://i.postimg.cc/VNRqHrTH/ARETE3.jpg";
    if (name.includes("5")) return "https://i.postimg.cc/V6kqysQW/ARETE5.jpg";
    if (name.includes("7")) return "https://i.postimg.cc/B6nTWZ9N/ARETE7.jpg";
    if (name.includes("9")) return "https://i.postimg.cc/rmw16yXf/ARETE9.jpg";
    return "https://i.postimg.cc/8CHRnJ3X/ARETE1.jpg";
  }

  if (name.includes("cristal")) {
    if (name.includes("4")) return "https://i.postimg.cc/YS36yGVs/ARETE4.jpg";
    if (name.includes("6")) return "https://i.postimg.cc/wvjXKx82/ARETE6.jpg";
    if (name.includes("8")) return "https://i.postimg.cc/JnzNw7VP/ARETE8.jpg";
    if (name.includes("10")) return "https://i.postimg.cc/tT430RQS/ARETE10.jpg";
    return "https://i.postimg.cc/d1V2MQPR/ARETE2.jpg";
  }

  if (name.includes("luna")) {
    if (name.includes("3")) return "https://i.postimg.cc/ZRnd7fpQ/TOBILLERA3.jpg";
    if (name.includes("5")) return "https://i.postimg.cc/k4Gb1jK0/TOBILLERA5.jpg";
    if (name.includes("7")) return "https://i.postimg.cc/Tw1D7kn6/TOBILLERA7.jpg";
    if (name.includes("9")) return "https://i.postimg.cc/MTHQPs1q/TOBILLERA9.jpg";
    return "https://i.postimg.cc/LX51CyLy/TOBILLERA1.jpg";
  }

  if (name.includes("estrella")) {
    if (name.includes("4")) return "https://i.postimg.cc/mDkHXdC5/TOBILLERA4.jpg";
    if (name.includes("6")) return "https://i.postimg.cc/MTHQPs12/TOBILLERA6.jpg";
    if (name.includes("8")) return "https://i.postimg.cc/cHCn9DfW/TOBILLERA8.jpg";
    if (name.includes("10")) return "https://i.postimg.cc/85c6KyLp/TOBILLERA10.jpg";
    return "https://i.postimg.cc/PxJw36Y2/TOBILLERA2.jpg";
  }

  // 4. Category-based fallback
  const cat = (p.categoriaNombre || (p.categoria && typeof p.categoria === "object" ? p.categoria.nombre : p.categoria) || "").toLowerCase();

  if (cat.includes("pulsera")) return "https://i.postimg.cc/qvcyz6kk/PULSERA1.jpg";
  if (cat.includes("cadena")) return "https://i.postimg.cc/SRXcsZK7/CADENA1.jpg";
  if (cat.includes("anillo")) return "https://i.postimg.cc/mg9VVrB8/ANILLO1.jpg";
  if (cat.includes("arete")) return "https://i.postimg.cc/8CHRnJ3X/ARETE1.jpg";
  if (cat.includes("tobillera")) return "https://i.postimg.cc/LX51CyLy/TOBILLERA1.jpg";

  // General fallback
  return "https://i.postimg.cc/mg9VVrB8/ANILLO1.jpg";
};
