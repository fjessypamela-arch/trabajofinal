// ==========================================

// URL DE GOOGLE APPS SCRIPT

// ==========================================



// PEGA AQUÍ TU URL QUE TERMINA EN /exec



const URL_API ="https://script.google.com/macros/s/AKfycbzWrVsT7VdmUQPL81b9KDi-ZZUQnvStZXC7fmmJon_DQt_Rd0R_L448435qp_syN9gr/exec";


const listaProgramas =

    document.getElementById("listaProgramas");

const selectPrograma =

    document.getElementById("programa");





// ==========================================

// CARGAR PROGRAMAS

// ==========================================



function cargarProgramas() {



    fetch(URL_API)



        .then(respuesta => {



            if (!respuesta.ok) {



                throw new Error(

                    "No se pudo conectar con Google Sheets"

                );



            }



            return respuesta.json();



        })





        .then(carreras => {



            console.log(

                "Carreras recibidas:",

                carreras

            );





            // Limpiar tarjetas

            listaProgramas.innerHTML = "";





            // Limpiar select

            selectPrograma.innerHTML = `

                <option value="">

                    Selecciona un programa

                </option>

            `;





            // Recorrer las carreras

            carreras.forEach(carrera => {





                // ==================================

                // CREAR TARJETA

                // ==================================



                const tarjeta =

                    document.createElement("article");





                tarjeta.className =

                    "card-programa";





                tarjeta.innerHTML = `



                    <img

                        src="${carrera.foto}"

                        alt="${carrera.nombre}"

                        onerror="this.src='https://via.placeholder.com/800x500?text=Imagen+no+disponible';">





                    <div class="card-body">



                        <h3>

                            ${carrera.nombre}

                        </h3>





                        <p>

                            ${carrera.descripcion}

                        </p>





                        <button

                            type="button"

                            class="btn btn-primary">



                            Más información



                        </button>



                    </div>



                `;





                listaProgramas.appendChild(

                    tarjeta

                );





                // ==================================

                // CREAR OPCIÓN DEL SELECT

                // ==================================



                const opcion =

                    document.createElement("option");





                opcion.value =

                    carrera.nombre;





                opcion.textContent =

                    carrera.nombre;





                selectPrograma.appendChild(

                    opcion

                );



            });



        })





        .catch(error => {



            console.error(

                "Error al cargar carreras:",

                error

            );





            listaProgramas.innerHTML = `



                <p>

                    No se pudieron cargar

                    los programas.

                </p>



            `;



        });



}





// Ejecutar función

cargarProgramas();







// ==========================================

// FORMULARIO

// ==========================================



const formulario =

    document.getElementById(

        "formularioRegistro"

    );





const nombre =

    document.getElementById(

        "nombre"

    );





const correo =

    document.getElementById(

        "correo"

    );





const telefono =

    document.getElementById(

        "telefono"

    );





const programa =

    document.getElementById(

        "programa"

    );





const acepto =

    document.getElementById(

        "acepto"

    );





const mensaje =

    document.getElementById(

        "mensaje"

    );

formulario.addEventListener(

    "submit",

    function(event) {



        // Evita que la página se recargue

        event.preventDefault();





        // ==================================

        // OBTENER DATOS

        // ==================================



        const nombreValor =

            nombre.value.trim();





        const correoValor =

            correo.value.trim();





        const telefonoValor =

            telefono.value.trim();





        const programaValor =

            programa.value;







        // ==================================

        // VALIDACIÓN DEL NOMBRE

        // ==================================



        if (nombreValor === "") {



            mensaje.textContent =

                "Por favor, ingresa tu nombre.";



            mensaje.style.color = "red";



            return;



        }







        // ==================================

        // VALIDACIÓN DEL CORREO

        // ==================================



        if (correoValor === "") {



            mensaje.textContent =

                "Por favor, ingresa tu correo.";



            mensaje.style.color = "red";



            return;



        }





        if (!correoValor.includes("@")) {



            mensaje.textContent =

                "Ingresa un correo válido.";



            mensaje.style.color = "red";



            return;



        }







        // ==================================

        // VALIDACIÓN DEL TELÉFONO

        // ==================================



        if (telefonoValor === "") {



            mensaje.textContent =

                "Por favor, ingresa tu teléfono.";



            mensaje.style.color = "red";



            return;



        }







        // ==================================

        // VALIDACIÓN DEL PROGRAMA

        // ==================================



        if (programaValor === "") {



            mensaje.textContent =

                "Selecciona un programa.";



            mensaje.style.color = "red";



            return;



        }







        // ==================================

        // VALIDACIÓN DEL CHECKBOX

        // ==================================



        if (!acepto.checked) {



            mensaje.textContent =

                "Debes aceptar los términos y condiciones.";



            mensaje.style.color = "red";



            return;



        }







        // ==================================

        // PREPARAR DATOS

        // ==================================



        const datos =

            new URLSearchParams();





        datos.append(

            "nombre",

            nombreValor

        );





        datos.append(

            "correo",

            correoValor

        );





        datos.append(

            "telefono",

            telefonoValor

        );





        datos.append(

            "carrera",

            programaValor

        );







        // ==================================

        // ENVIAR A GOOGLE SHEETS

        // ==================================



        fetch(URL_API, {



            method: "POST",



            mode: "no-cors",



            body: datos



        })





        .then(() => {



            mensaje.textContent =

                "✅ ¡Registro enviado correctamente!";



            mensaje.style.color =

                "green";





            console.log(

                "Registro enviado:"

            );





            console.log(

                "Nombre:",

                nombreValor

            );





            console.log(

                "Correo:",

                correoValor

            );





            console.log(

                "Teléfono:",

                telefonoValor

            );





            console.log(

                "Carrera:",

                programaValor

            );





            // Limpiar formulario

            formulario.reset();



        })





        .catch(error => {



            console.error(

                "Error al enviar:",

                error

            );





            mensaje.textContent =

                "❌ Ocurrió un error al enviar el registro.";



            mensaje.style.color =

                "red";



        });



    }

);