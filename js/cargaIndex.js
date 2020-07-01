document.addEventListener("DOMContentLoaded", iniciarMainPage);

function iniciarMainPage() {
    document.querySelector("#botonInicio").addEventListener("click", function () {
        fetch("noticias.html")
            .then(function (r) {
                if (r.ok) {
                    return r.text()
                }
            })
            .then(function (textHtml) {
                console.log(textHtml);
                document.querySelector("#content").innerHTML = textHtml;
            })
            .catch(function (error) {
                console.log(error);
            });
    });

    document.querySelector("#botonInscripcion").addEventListener("click", function () {
        fetch("inscripcion.html")
            .then(function (r) {
                if (r.ok) {
                    return r.text()
                }
            })
            .then(function (textHtml) {
                document.querySelector("#content").innerHTML = textHtml;
            })
            .catch(function (error) {
                console.log(error);
            });
    });
    document.querySelector("#botonEstadisticas").addEventListener("click", function () {
        fetch("estadisticas.html")
            .then(function (r) {
                if (r.ok) {
                    return r.text()
                }
            })
            .then(function (textHtml) {
                document.querySelector("#content").innerHTML = textHtml;
            })
            .catch(function (error) {
                console.log(error);
            });
    });
    document.querySelector("#botonReglamento").addEventListener("click", function () {
        fetch("reglamento.html")
            .then(function (r) {
                if (r.ok) {
                    return r.text()
                }
            })
            .then(function (textHtml) {
                document.querySelector("#content").innerHTML = textHtml;
            })
            .catch(function (error) {
                console.log(error);
            });
    });
}