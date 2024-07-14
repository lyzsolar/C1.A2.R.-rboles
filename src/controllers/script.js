import Mascota from "../models/Mascota.js";
import { bst } from "./dependencies.js";

let btn = document.getElementById("animal-btn");
let searchBtn = document.getElementById("search-btn");
let minBtn = document.getElementById("min-btn");
let maxBtn = document.getElementById("max-btn");
let showAllBtn = document.getElementById("show-all-btn");

btn.addEventListener("click", () => {
    let nombreMascota = document.getElementById("nombreMascota").value;
    let pesoMascota = document.getElementById("pesoMascota").value;
    let edadMascota = document.getElementById("edadMascota").value;
    let razaMascota = document.getElementById("razaMascota").value;
    let fechaMascota = document.getElementById("fechaMascota").value;

    if (nombreMascota && pesoMascota && edadMascota && razaMascota && fechaMascota) {
        let mascota = new Mascota(nombreMascota, pesoMascota, edadMascota, razaMascota, fechaMascota);
        let data = bst.add(mascota);
        console.log(data);
        if (data) {
            Swal.fire({
                icon: "success",
                title: "Éxito...",
                text: "Mascota agregada correctamente",
            });
        } else { 
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "La mascota ya existe",
            });
        }
    } else {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Por favor, complete todos los campos",
        });
    }
});

searchBtn.addEventListener("click", () => {
    let nombreBuscar = document.getElementById("buscar").value;

    if (nombreBuscar) {
        let mascotaNode = bst.search(nombreBuscar);

        if (mascotaNode) {
            displayDataInTable([mascotaNode.value]);
        } else {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "La mascota no existe",
            });
        }
    } else {
        Swal.fire({
            icon: "warning",
            title: "Oops...",
            text: "Por favor, ingrese un nombre para buscar",
        });
    }
});

minBtn.addEventListener("click", () => {
    let minNode = bst.min();
    if (minNode) {
        Swal.fire("Valor mínimo encontrado", `Nombre de la mascota con menor peso: ${minNode.value.nombreMascota}`);
    } else {
        Swal.fire("El árbol está vacío");
    }
});

maxBtn.addEventListener("click", () => {
    let maxNode = bst.max();
    if (maxNode) {
        Swal.fire("Valor máximo encontrado", `Nombre de la mascota con mayor peso: ${maxNode.value.nombreMascota}`);
    } else {
        Swal.fire("El árbol está vacío");
    }
});

showAllBtn.addEventListener("click", () => {
    let allMascotas = [];
    bst.inOrderTraverse((mascota) => allMascotas.push(mascota));
    if (allMascotas.length > 0) {
        displayDataInTable(allMascotas);
    } else {
        Swal.fire({
            icon: "info",
            title: "Vacío",
            text: "No hay mascotas en el árbol",
        });
    }
});

function displayDataInTable(data) {
    let tbody = document.querySelector("table tbody");
    tbody.innerHTML = "";
    data.forEach(mascota => {
        let row = document.createElement("tr");
        row.innerHTML = `
            <td>${mascota.nombreMascota}</td>
            <td>${mascota.pesoMascota}</td>
            <td>${mascota.edadMascota}</td>
            <td>${mascota.razaMascota}</td>
        `;
        tbody.appendChild(row);
    });
}


