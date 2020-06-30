document.addEventListener("DOMContentLoaded", iniciarpageStats);

function iniciarpageStats() {

    "use sctrict"
    let urlBase = "https://web-unicen.herokuapp.com/api/groups/099/goleadores";
    let rowsGoles = "";


    //Fetch inicial de la tabla
    function iniciarTabla() {
        fetch(urlBase)
            .then(function (respuesta) {
                if (respuesta.ok) {
                    return respuesta.json()
                }
            })
            .then(function (json) {
                rowsGoles = json.goleadores;
                mostrarTabla();
            })
            .catch(function (e) {
                console.log(e);
            })

    }

    //Funcion que calcula la media de goles, de la tabla de goleadores
    function mediaGoles() {
        let suma = 0;
        for (let index = 0; index < rowsGoles.length; index++) {
            suma = suma + parseInt(rowsGoles[index].thing.goles);
        }
        return (suma / rowsGoles.length);
    }

    //Funcion que arma el html del body de la tabla
    function mostrarTabla() {
        let contentTabla = "";
        let lastRow = '<tr class = "filaAdd"> <td> <input type="text" name="" class = "inAddName" id="IdInputNombre" placeholder="Nombre" required> </td>' +
            '<td> <input type="text" name="" id="IdInputEquipo" class = "inAddTeam" placeholder="Equipo" required> </td>' +
            '<td> <input type="number" name="" id="IdInputGoles" class = "inAddGoal" placeholder="Goles" required> </td>' +
            '<td> <input type="button" value="Add" id="idBtnAdd" class = "btnTable" > </td> ' +
            '<td> <input type="button" value="Add3" id="idBtnAdd3" class = "btnTable" > </td></tr>';
        rowsGoles.sort(function (a, b) { return (b.thing.goles - a.thing.goles) });
        let classDistinctRow, classMedia;
        let media = mediaGoles();
        for (let index = 0; index < rowsGoles.length; index++) {
            classMedia = "";
            classDistinctRow = "";
            if ((index % 2) != 0) {
                classDistinctRow = "distinctRow";
            }
            if (rowsGoles[index].thing.goles >= media) {
                classMedia = "moreThanMedia";
            }
            let fila = '<tr class= "' + classMedia + " " + classDistinctRow + '"> <td><input type="text" class="input' + index + ' inputDato" value=" ' + rowsGoles[index].thing.nombre +
                ' " readonly> </td>'
            contentTabla += fila + ' <td><input type="text" class="input' + index + ' inputDato" value=" ' + rowsGoles[index].thing.equipo +
                ' " readonly> </td> <td><input type="number" class="input' + index + ' inputDato" value="' + rowsGoles[index].thing.goles +
                '" readonly> </td><td><button class = "btnDel btnTable" id = "' + rowsGoles[index]._id + '"> Del </button> </td> ' +
                '<td><button class = "btnEdit btnTable" id = "' + rowsGoles[index]._id + '" name="btnEdit ' + index + '"> Edit </button>' +
                '<button class = "btnSave btnTable btnHider" id = "' + rowsGoles[index]._id + '" name="btnSave ' + index + '"> Save </button> </td> </tr>'
        }
        document.querySelector("#idTBodyGoles").innerHTML = contentTabla + lastRow;
        document.querySelector("#idBtnAdd").addEventListener("click", addRow);

        //Funcionalidad a los botones Delete
        let botones = document.querySelectorAll(".btnDel");
        for (let index = 0; index < botones.length; index++) {
            botones[index].addEventListener("click", function () {
                deleteRow(index, botones[index].id);
            })
        }

        //Funcionalidad a los botones Edit
        btnEdit = document.querySelectorAll(".btnEdit");
        editSaveRow(btnEdit, "btnSave ", false);

        //Funcionalidad a los botones Save
        btnSave = document.querySelectorAll(".btnSave");
        editSaveRow(btnSave, "btnEdit ", true);

        document.querySelector("#idBtnAdd3").addEventListener("click", add3Row);
        //document.querySelector("#idDelAll").addEventListener("click", deleteAll);
    }

    //Funcionalidad para el boton Editar y el boton Save
    function editSaveRow(button, toToggle, toSave) {
        for (let index = 0; index < button.length; index++) {
            button[index].addEventListener("click", function () {
                let datos = document.querySelectorAll(".input" + index);
                for (d of datos) {
                    d.toggleAttribute("readonly");
                    d.classList.toggle("editing");
                }
                if (toSave)
                    editRow(index, button[index].id);
                button[index].classList.toggle("btnHider");
                document.getElementsByName(toToggle + index)[0].classList.toggle("btnHider");
            })
        }

    }



    //Funcion que elimina un item tanto del json como de la API
    function deleteRow(indice, idToDel) {
        delItemServicio(idToDel);
        rowsGoles.splice(indice, 1);
        mostrarTabla();
    }

    //Funcion que hace el fetch de borrado
    function delItemServicio(toDel) {
        let newa = urlBase + "/" + toDel;
        console.log(newa);
        fetch(newa, {
            "method": "DELETE",
            "headers": { "Content-Type": "application/json" }
        })
    }

    function fetchingToAdd(newRow) {
        let toAdd = {
            "thing": newRow
        }
        let idAdded = "";
        fetch(urlBase, {
            "method": "POST",
            "body": JSON.stringify(toAdd),
            "headers": { "Content-Type": "application/json" }
        })
            .then(function (r) {
                if (r.ok) {
                    return r.json()
                }
            })
            .then(function (json) {
                return json.information
            })
            .then(function (info) {
                rowsGoles.push(info);
                mostrarTabla();
            })
            .catch(function (e) {
                console.log(e)
            })
    }

    function addRow() {
        let name = document.querySelector("#IdInputNombre").value;
        let team = document.querySelector("#IdInputEquipo").value;
        let goals = document.querySelector("#IdInputGoles").value;
        if (name != "" && team != "" && goals != "") {
            let newRow = { "nombre": name, "equipo": team, "goles": goals };
            fetchingToAdd(newRow);
        } else {
            document.querySelector("#IdInputNombre").classList.add("required");
            document.querySelector("#IdInputEquipo").classList.add("required");
            document.querySelector("#IdInputGoles").classList.add("required");
        }
    }

    function add3Row() {
        toAdd = { "nombre": "L. Quinteros", equipo: "Bohemio F.C.", 'goles': 4 };
        fetchingToAdd(toAdd);
        toAdd = { 'nombre': "G. Usinger", 'equipo': "Anfield", 'goles': 3 };
        fetchingToAdd(toAdd);
        toAdd = { 'nombre': "M. Nicolás", 'equipo': "Liverfull", 'goles': 3 };
        fetchingToAdd(toAdd);
        mostrarTabla();
    }


    //Funcion que edita un item tanto del json como de la API
    function editRow(indice, idToEdit) {
        let row = document.querySelectorAll(".input" + indice);
        rowsGoles[indice].thing.nombre = row[0].value;
        rowsGoles[indice].thing.equipo = row[1].value;
        rowsGoles[indice].thing.goles = row[2].value;
        data = {
            "thing": rowsGoles[indice].thing
        }
        fetch(urlBase + "/" + idToEdit, {
            "method": "PUT",
            "body": JSON.stringify(data),
            "headers": { "Content-Type": "application/json" }
        }).then(function (r) {
            if (!r.ok) {
                console.log("Error");
            }
        })

    }


    //Funcion inutil de mierda
    //Funcion que borra todo el json 
    function deleteAll(idToDel) {
        rowsGoles.splice(0, rowsGoles.length);
        mostrarTabla();
    }

    iniciarTabla();

}
