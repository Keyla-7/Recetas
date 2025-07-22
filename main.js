const recetas = [
  {
    nombre: "Tarta de Frutilla 🍓",
    categoria: "postres",
    tiempo: "30 min",
    ingredientes: ["1 masa de tarta", "250g frutillas", "Crema pastelera", "Azúcar"],
    pasos: [
      "Hornear la masa sola durante 10 min.",
      "Rellenar con crema pastelera.",
      "Colocar frutillas cortadas encima.",
      "Espolvorear con azúcar y enfriar."
    ]
  },
  {
    nombre: "Sándwich de Atún 🥪",
    categoria: "comidas",
    tiempo: "10 min",
    ingredientes: ["2 rebanadas de pan", "1 lata de atún", "Mayonesa", "Lechuga"],
    pasos: [
      "Mezclar el atún con mayonesa.",
      "Untar sobre una rebanada de pan.",
      "Agregar lechuga y cerrar.",
      "Cortar en triángulos y servir."
    ]
  },
  {
    nombre: "Limonada fresca 🍋",
    categoria: "bebidas",
    tiempo: "5 min",
    ingredientes: ["3 limones", "1 litro de agua", "Azúcar al gusto", "Hielo"],
    pasos: [
      "Exprimir los limones.",
      "Mezclar con el agua y azúcar.",
      "Agregar hielo y servir bien fría."
    ]
  }
];

function mostrarRecetas() {
  recetas.forEach(receta => {
    const contenedor = document.getElementById("lista-" + receta.categoria);
    const tarjeta = document.createElement("div");
    tarjeta.className = "receta-card";
    tarjeta.innerHTML = `<h3>${receta.nombre}</h3>`;
    tarjeta.addEventListener("click", () => verReceta(receta));
    contenedor.appendChild(tarjeta);
  });
}

function verReceta(receta) {
  document.getElementById("detalle-nombre").textContent = receta.nombre;
  document.getElementById("detalle-tiempo").textContent = receta.tiempo;

  const ulIng = document.getElementById("detalle-ingredientes");
  ulIng.innerHTML = "";
  receta.ingredientes.forEach(i => {
    const li = document.createElement("li");
    li.textContent = "🍓 " + i;
    ulIng.appendChild(li);
  });

  const ulPasos = document.getElementById("detalle-pasos");
  ulPasos.innerHTML = "";
  receta.pasos.forEach(p => {
    const li = document.createElement("li");
    li.textContent = "📝 " + p;
    ulPasos.appendChild(li);
  });

  document.getElementById("detalle-receta").style.display = "block";
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function cerrarDetalle() {
  document.getElementById("detalle-receta").style.display = "none";
}

mostrarRecetas();
