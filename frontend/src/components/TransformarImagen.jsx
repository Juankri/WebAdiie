

const transformarImagen = (url, ancho = 800) => {
  if (!url || !url.includes("cloudinary.com")) return url;
  
  // Buscamos donde dice '/upload/' y le pegamos los trucos justo después
  return url.replace('/upload/', `/upload/f_auto,q_auto,w_${ancho}/`);
}

export default transformarImagen;