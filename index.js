const mensajeOriginal = document.querySelector('.input-mensaje');
const mensajeInfo = document.querySelector('.contenedor-mensaje p');
const btnEncriptar = document.querySelector('.btn-encriptar');
const btnDesencriptar = document.querySelector('.btn-desencriptar');
const btnCopiar = document.querySelector('.btn-copiar');
const textoResultado = document.querySelector('.texto-resultado');
const contenedorResultado = document.querySelector('.contenedor-resultado');
const contenedorCopiar = document.querySelector('.contenedor-copiar');
const contenedorError = document.querySelector('.contenedor-error');

const reglas = {
    'e': 'enter',
    'i': 'imes',
    'a': 'ai',
    'o': 'ober',
    'u': 'ufat'
};

let mensaje = "";
let mensajeEncriptado = "";
let mensajeDesencriptado = "";

function capturarMensaje(e) {
    estadoInicial();
    var texto = e.target.value;
    const regex = /^[a-z ]*$/;
    if (!regex.test(texto)) {
        mensajeInfo.style.color = "red";
        btnEncriptar.disabled = true;
        btnDesencriptar.disabled = true;
        mensaje = "";
    } else {
        mensajeInfo.style.color = "#0A3871";
        btnEncriptar.disabled = false;
        btnDesencriptar.disabled = false;
        mensaje = texto;
    }
}

function encriptarMensaje() {
    moverVista();
    presentarCarga();
    mensajeEncriptado = '';
    for (let i = 0; i < mensaje.length; i++) {
        const letra = mensaje[i];
        reglas[letra]
            ? mensajeEncriptado += reglas[letra]
            : mensajeEncriptado += letra;
    }
    presentarResultado(mensajeEncriptado)
}

function desencriptarMensaje() {
    moverVista();
    presentarCarga();
    mensajeDesencriptado = '';
    for (let i = 0; i < mensaje.length; i++) {
        const letra = mensaje[i];
        if(reglas[letra]) {
            const finLlave = i + (reglas[letra].length - 1);
            if(mensaje.slice(i, finLlave + 1) === reglas[letra]) {
                mensajeDesencriptado += letra;
            } else {
                alert('El mensaje no se puede desencriptar correctamente');
                estadoInicial();
                return;
            }
            i = finLlave;
        } else {
            mensajeDesencriptado += letra; 
        }
    }
    presentarResultado(mensajeDesencriptado);
}

function estadoInicial() {
    contenedorError.style.display = 'block';
    contenedorCopiar.style.display = 'none';
    contenedorResultado.style.display = 'none';
    textoResultado.innerHTML = '';
}

function presentarCarga() {
    contenedorError.style.display = 'none';
    contenedorCopiar.style.display = 'none';
    contenedorResultado.style.display = 'block';
    textoResultado.innerHTML = 'Cargando...';
}

function presentarResultado(resultado) {
    setTimeout(() => { 
        contenedorCopiar.style.display = 'block';
        textoResultado.innerHTML = resultado;
    }, 2000);
}

function moverVista() {
    textoResultado.scrollIntoView({behavior: 'smooth'});
}

function copiarTexto() {
    navigator.clipboard.writeText(textoResultado.innerHTML);
    btnCopiar.value = "Copiado al portapapeles";
    btnCopiar.disabled = true;
    setTimeout(() => {
        btnCopiar.value = "Copiar";
        btnCopiar.disabled = false;
    }, 2000);
}

mensajeOriginal.addEventListener('input', capturarMensaje);
btnEncriptar.addEventListener('click', encriptarMensaje);
btnDesencriptar.addEventListener('click', desencriptarMensaje);
btnCopiar.addEventListener('click', copiarTexto);