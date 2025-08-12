const ramos = [
    // Año 1
    { nombre: "Cultura occidental y humanismo cristiano", semestre: 1, prereqs: [] },
    { nombre: "Inglés Avanzado I", semestre: 1, prereqs: [] },
    { nombre: "Herramientas y comunidad digital", semestre: 1, prereqs: [] },
    { nombre: "Anatomía Topográfica", semestre: 1, prereqs: [] },
    { nombre: "Biología celular y molecular", semestre: 1, prereqs: [] },
    { nombre: "Bioquímica del metabolismo", semestre: 1, prereqs: [] },
    { nombre: "Antropología Médica", semestre: 1, prereqs: [] },
    { nombre: "Salud Integrada", semestre: 1, prereqs: [] },
    { nombre: "Introducción a la práctica médica", semestre: 1, prereqs: [] },

    { nombre: "Persona y dignidad", semestre: 2, prereqs: [1,2,3,4,5,6,7,8,9] },
    { nombre: "Inglés avanzado II", semestre: 2, prereqs: [2] },
    { nombre: "Emprendimiento e innovación", semestre: 2, prereqs: [] },
    { nombre: "Anatomía toracoabdominal y pélvica", semestre: 2, prereqs: [4] },
    { nombre: "Histología", semestre: 2, prereqs: [5] },
    { nombre: "Genética humana y embriología", semestre: 2, prereqs: [5] },
    { nombre: "Bacteriología y micología", semestre: 2, prereqs: [] },
    { nombre: "Fisiología general", semestre: 2, prereqs: [] },

    // Aquí seguirías agregando todos los ramos hasta 8° semestre con sus prereqs
];

let estado = {};

function renderMalla() {
    const contenedor = document.getElementById("malla");
    contenedor.innerHTML = "";

    for (let semestre = 1; semestre <= 8; semestre++) {
        const divSemestre = document.createElement("div");
        divSemestre.classList.add("semestre");

        const titulo = document.createElement("h2");
        titulo.textContent = semestre + "° semestre";
        divSemestre.appendChild(titulo);

        ramos.filter(r => r.semestre === semestre).forEach((ramo, index) => {
            const divRamo = document.createElement("div");
            divRamo.textContent = ramo.nombre;
            divRamo.classList.add("ramo");

            const id = ramos.indexOf(ramo);
            const prereqsCompletos = ramo.prereqs.every(p => estado[p] === "aprobado");

            if (!estado[id]) estado[id] = prereqsCompletos ? "disponible" : "bloqueado";

            divRamo.classList.add(estado[id]);

            divRamo.addEventListener("click", () => {
                if (estado[id] === "disponible") {
                    estado[id] = "aprobado";
                    actualizarDisponibles();
                    renderMalla();
                }
            });

            divSemestre.appendChild(divRamo);
        });

        contenedor.appendChild(divSemestre);
    }
}

function actualizarDisponibles() {
    ramos.forEach((ramo, id) => {
        if (estado[id] !== "aprobado") {
            const prereqsCompletos = ramo.prereqs.every(p => estado[p] === "aprobado");
            estado[id] = prereqsCompletos ? "disponible" : "bloqueado";
        }
    });
}

renderMalla();
