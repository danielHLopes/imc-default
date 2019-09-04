//console.log("ola mundo");imprimir no console
let nome = document.querySelector("#nome");//criar variavel para receber o campo pelo id dele
let peso = document.querySelector("#peso");
let altura = document.querySelector("#altura");

function calcularIMC(peso,altura){//fução para calcular imc
    return peso/ (altura*altura);
}

document.querySelector("#btn-calcular").addEventListener(//adicionei um evento ao botao
    "click",//digo que evento será usado
    (event)=>{//dou um apelido a esse apelido, o => é o mesmo que escrever function
        event.preventDefault();//previno que a pagina recarregue
        let imc = calcularIMC(peso.value,altura.value);//crio uma variavel para receber o calculo
        console.log(imc.toFixed(2));//imprimo no console, o .toFixed diz quantas casas decimais eu vou pegar
    }
);