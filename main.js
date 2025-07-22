// main.js
let recetas = JSON.parse(localStorage.getItem("recetas")) || [
  {
    id: crypto.randomUUID(),
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
    id: crypto.randomUUID(),
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
    id: crypto.randomUUID(),
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

let recetaActual = null;

function guardarLocal() {
  localStorage.setItem("recetas", JSON.stringify(recetas));
}

function mostrarRecetas() {
  ["comidas", "postres", "bebidas"].forEach(cat => {
    const contenedor = document.getElementById("lista-" + cat);
    contenedor.innerHTML = "";
  });

  recetas.forEach(receta => {
    const contenedor = document.getElementById("lista-" + receta.categoria);
    const tarjeta = document.createElement("div");
    tarjeta.className = "receta-card";
    tarjeta.innerHTML = `<h3>${receta.nombre}</h3>`;
    tarjeta.addEventListener("click", () => verReceta(receta.id));
    contenedor.appendChild(tarjeta);
  });
}

function verReceta(id) {
  const receta = recetas.find(r => r.id === id);
  recetaActual = receta;

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

function abrirFormulario(cat) {
  document.getElementById("formulario-receta").style.display = "block";
  document.getElementById("form-categoria").value = cat;
  document.getElementById("form-id").value = "";
  document.getElementById("form-nombre").value = "";
  document.getElementById("form-tiempo").value = "";
  document.getElementById("form-ingredientes").value = "";
  document.getElementById("form-pasos").value = "";
  document.getElementById("form-titulo").textContent = "Agregar Receta";
}

function cerrarFormulario() {
  document.getElementById("formulario-receta").style.display = "none";
}

function guardarReceta() {
  const id = document.getElementById("form-id").value || crypto.randomUUID();
  const nueva = {
    id,
    nombre: document.getElementById("form-nombre").value,
    categoria: document.getElementById("form-categoria").value,
    tiempo: document.getElementById("form-tiempo").value,
    ingredientes: document.getElementById("form-ingredientes").value.split(",").map(i => i.trim()),
    pasos: document.getElementById("form-pasos").value.split(";").map(p => p.trim())
  };

  const index = recetas.findIndex(r => r.id === id);
  if (index >= 0) {
    recetas[index] = nueva;
  } else {
    recetas.push(nueva);
  }

  guardarLocal();
  mostrarRecetas();
  cerrarFormulario();
}

function eliminarReceta() {
  if (!recetaActual) return;
  if (confirm("¿Seguro que querés borrar esta receta?")) {
    recetas = recetas.filter(r => r.id !== recetaActual.id);
    guardarLocal();
    cerrarDetalle();
    mostrarRecetas();
  }
}

function editarReceta() {
  if (!recetaActual) return;
  abrirFormulario(recetaActual.categoria);
  document.getElementById("form-titulo").textContent = "Editar Receta";
  document.getElementById("form-id").value = recetaActual.id;
  document.getElementById("form-nombre").value = recetaActual.nombre;
  document.getElementById("form-tiempo").value = recetaActual.tiempo;
  document.getElementById("form-ingredientes").value = recetaActual.ingredientes.join(", ");
  document.getElementById("form-pasos").value = recetaActual.pasos.join("; ");
}

mostrarRecetas();
                          
