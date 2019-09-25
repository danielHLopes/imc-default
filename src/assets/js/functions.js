let nome = document.querySelector("#nome");
let peso = document.querySelector("#peso");
let altura = document.querySelector("#altura");

let tabela = document.querySelector(".table")

document.querySelector("#btn-calcular").addEventListener("click", (event) => {
    event.preventDefault();
    let imc = calcularIMC(peso.value, altura.value);
    let estado = estadoIMC(imc);
    //addTabela(nome.value, peso.value, altura.value,imc.toFixed(2), estado)
    addLocalStorage(nome.value, peso.value, altura.value, imc.toFixed(2), estado);
    carregarLocalStorage();
    limparFormulario();
    //console.log(imc.toFixed(2));
    
})


function calcularIMC(peso, altura){
    return peso / (altura * altura);
}

function estadoIMC(imc){
    let resut;
    if(imc < 18.5){
        resut =  "desnutricao";
    }else if((imc >= 18.5)&&(imc < 24.5)){
        resut =   "peso normal";
    }else if((imc>=24.5)&&(imc<30)){
        resut =   "sobrepeso"
    }else if((imc>=30)&&(imc<40)){
        resut =   "obesidade";
    }else if(imc>=40){
        resut =   "obesidade morbida";
    }
    
    return resut;
}

function addTabela(nome, peso, altura, imc, estado, indice){
    let colunaNome = document.createElement('td');
    colunaNome.innerHTML = nome;

    let colunaPeso = document.createElement('td');
    colunaPeso.innerHTML = peso;

    let colunaAltura = document.createElement('td');
    colunaAltura.innerHTML = altura;

    let colunaIMC = document.createElement('td');
    colunaIMC.innerHTML = imc;

    let colunaEstado = document.createElement('td');
    colunaEstado.innerHTML = estado;


    let colunaDeletar = document.createElement('td');
    let btnDeletar = document.createElement('button');
    btnDeletar.innerHTML = '<img src="assets/images/delete.svg" alt="Deletar IMC">';
    btnDeletar.classList.add('btn');
    btnDeletar.classList.add('btn-danger');

    btnDeletar.addEventListener("click", (event) => {
        event.preventDefault();
        deletarLinha(indice);
      });

    colunaDeletar.appendChild(btnDeletar);


    let linha = document.createElement('tr');
    linha.appendChild(colunaNome);
    linha.appendChild(colunaPeso);
    linha.appendChild(colunaAltura);
    linha.appendChild(colunaIMC);
    linha.appendChild(colunaEstado);
    linha.appendChild(colunaDeletar);

    tabela.appendChild(linha);
}

function limparFormulario(){
    nome.value = '';
    peso.value = '';
    altura.value = '';
    nome.focus();
  }

function addLocalStorage(nome, peso, altura, imc, estado){
    let pessoa = {
        "nome" : nome,
        "peso" : peso,
        "altura" : altura,
        "imc" : imc,
        "estado" : estado
    }

    if(localStorage.getItem("listaIMC")){
        let listaIMC = JSON.parse(localStorage.getItem("listaIMC"));
        listaIMC.push(pessoa);
        localStorage.setItem("listaIMC", JSON.stringify(listaIMC));

    }else{
        let listaIMC = [];
        listaIMC.push(pessoa);
        localStorage.setItem("listaIMC", JSON.stringify(listaIMC));
    }

    mostraMensagem("Perfil cadastrado", "add")
}

function limparTabela(){
    let qtdLinhas = tabela.rows.length;
    for(let i = qtdLinhas -1; i>0;i--){
        tabela.deleteRow(i);
    }
}

function carregarLocalStorage(){
    limparTabela();

    if(localStorage.getItem("listaIMC")){
        let listaIMC = JSON.parse(localStorage.getItem("listaIMC"));
        listaIMC.forEach((pessoa, indice) =>{
            addTabela(pessoa.nome, pessoa.peso,pessoa.altura,pessoa.imc,pessoa.estado,indice);
        });
    }else{
        mostraMensagem("Nenhum perfil para carregar", "table");
    }
}

function deletarLinha(index){
    let pessoas = JSON.parse(localStorage.getItem("listaIMC"));
    pessoas.splice(index,1);
    localStorage.setItem("listaIMC",JSON.stringify(pessoas));
    carregarLocalStorage();

    mostraMensagem("Perfil deletado", "delete");

}

let mensagem = document.querySelector("#mensagem");

function mostraMensagem(msg, tipo){
    mensagem.innerHTML = msg;
    mensagem.classList.add("d-block");

    if(tipo == 'add'){
        mensagem.classList.add("alert-sucess");
    }else if(tipo == 'delete'){
        mensagem.classList.add("alert-danger");
    }else if(tipo == 'table'){
        mensagem.classList.add("alert-warnig");
    }

    setTimeout(() => {
        mensagem.innerHTML = "";
        mensagem.classList.remove("alert-danger");
        mensagem.classList.remove("alert-success");
        mensagem.classList.remove("alert-warning");
        mensagem.classList.remove("d-none");
    }, 2000);
}


/*
//console.log("ola mundo");imprimir no console
let nome = document.querySelector("#nome");//criar variavel para receber o campo pelo id dele
let peso = document.querySelector("#peso");
let altura = document.querySelector("#altura");

let tabela = document.querySelector(".table");//crio uma variavel para a tabela, nesse caso passei o padrao .table pois so tem uma

//-------------------------------------------------------------------------------------------------------------------------------
function addTable(nome,peso,altura,imc, indice){
    let columNome = document.createElement("td");//crio a variavel columNome como um elemento do tipo td, ou seja, coluna
    columNome.innerHTML = nome;//passo o valor para ele
    let columPeso = document.createElement("td");
    columPeso.innerHTML = peso;
    let columAltura = document.createElement("td");
    columAltura.innerHTML = altura;
    let columIMC = document.createElement("td");
    columIMC.innerHTML = imc.toFixed(2);

    let columDeletar = document.createElement("td")
    let btnDeletar = document.createElement("button")//crio um botao
    btnDeletar.innerHTML = "<img src='assets/images/delete.svg'>";//passo a imagem via html pra esse botao
    btnDeletar.classList.add('btn');//adiciono as classes dele
    btnDeletar.classList.add('btn-danger');
    columDeletar.appendChild(btnDeletar);

    btnDeletar.addEventListener("click", (event) =>{
        event.preventDefault();
        deletarLinha(indice);
    });


    let linha = document.createElement("tr");//crio a variavel linha como um elemento do tipo tr, ou seja, linha
    linha.appendChild(columNome);//passo os valores para ela
    linha.appendChild(columPeso);
    linha.appendChild(columAltura);
    linha.appendChild(columIMC);
    linha.appendChild(columDeletar);


    tabela.appendChild(linha);//paso a linha para a tabela

    mostraMensagem("IMC adicionado", "add");


}
//-------------------------------------------------------------------------------------------------------------------------------
function calcularIMC(peso,altura){//fução para calcular imc
    return peso/ (altura*altura);
}
//-------------------------------------------------------------------------------------------------------------------------------
function limparFormulario(){//limpo os campos
    nome.value="";
    peso.value="";
    altura.value="";

    nome.focus();//dou foco ao campo  
}
//-------------------------------------------------------------------------------------------------------------------------------
function addLocalStorage(nome,peso,altura,imc){
    let pessoa = {//criei um objeto
        "nome" : nome,
        "peso" : peso,
        "altura" : altura,
        "imc" : imc
    }


    if(localStorage.getItem("listaIMC")){//verifico se minha chave listaIMC existe
        let listaIMC = JSON.parse(localStorage.getItem("listaIMC"));//se sim eu recebo ela, o JSON é para converter e desconverter de string
        listaIMC.push(pessoa);//adiciono o novo item
        localStorage.setItem("listaIMC", JSON.stringify(listaIMC));//seto ele no localStorage
    }else{//se nao
        let listaIMC = [];//crio a lista
        listaIMC.push(pessoa);//adiciono o item
        localStorage.setItem("listaIMC", JSON.stringify(listaIMC));//seto ele no localStorage
    }
}
//-------------------------------------------------------------------------------------------------------------------------------
function limparTable(){
    let qtdLinhas = tabela.rows.length;
    for(let i = qtdLinhas-1; i > 0;i--){
        tabela.deleteRow(i);
    }
}
//-------------------------------------------------------------------------------------------------------------------------------
function carregarLocalStorage(){

    limparTable();

    if(localStorage.getItem("listaIMC")){
        let listaIMC = JSON.parse(localStorage.getItem("listaIMC"));
        listaIMC.forEach((pessoa, indice) => {
            addTable(pessoa.nome, pessoa.peso, pessoa.altura, pessoa.imc, indice);
        });
    }
}
//-------------------------------------------------------------------------------------------------------------------------------
function deletarLinha(indice){
    let pessoas = JSON.parse(localStorage.getItem("listaIMC"));
    pessoas.splice(indice, 1);
    localStorage.setItem("listaIMC", JSON.stringify(pessoas));
    carregarLocalStorage();
    mostraMensagem("IMC deletado", "delete");
}
//-------------------------------------------------------------------------------------------------------------------------------
let mensagem = document.querySelector("#mensagem");
function mostraMensagem(msg, tipo){
    mensagem.innerHTML = msg;
    mensagem.classList.remove("d-none");

    if(tipo=="add"){
        mensagem.classList.add("alert-success");
    }else if(tipo == "delete"){
        mensagem.classList.add("alert-danger");
    }

    setTimeout(
        () => {
            mensagem.innerHTML="";
            mensagem.classList.remove("alert-success");
            mensagem.classList.remove("alert-danger");
            mensagem.classList.add("d-none");
        }, 2000);
    }

//-------------------------------------------------------------------------------------------------------------------------------
document.querySelector("#btn-calcular").addEventListener(//adicionei um evento ao botao
    "click",//digo que evento será usado
    (event)=>{//dou um apelido a esse apelido, o => é o mesmo que escrever function
        event.preventDefault();//previno que a pagina recarregue
        let imc = calcularIMC(peso.value,altura.value);//crio uma variavel para receber o calculo
        
        addLocalStorage(nome.value,peso.value,altura.value,imc);
        carregarLocalStorage();

        //addTable(nome.value,peso.value,altura.value,imc);//chamo a function
        
        console.log(imc.toFixed(2));//imprimo no console, o .toFixed diz quantas casas decimais eu vou pegar
        limparFormulario();

    }
);*/
//-------------------------------------------------------------------------------------------------------------------------------