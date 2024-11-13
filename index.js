var toogle = document.querySelector("#toogle");
var bodyy = document.getElementById("boddy");
var count = Number(0)
var botaoAdicionarTarefa = document.getElementById("tarefas");
var listaDeTarefas = document.getElementById("lista-de-tarefas")

toogle.onclick = function (){
    if (count % 2 === Number(0)) {

        bodyy.classList.add('bg-slate-800');
        count ++
        console.log("DarkMode APLICADO");
        
    } else {
        
        count ++
        bodyy.classList.remove('bg-slate-800');
        console.log("DarkMode DESATIVADO");
        
    }
};


botaoAdicionarTarefa.onclick = function(){
    
    
    listaDeTarefas.innerHTML = " <li class= 'mt-2 shadow-md rounded-md p-4 cursor-pointer shadow-gray-400 hover:bg-pink-500 hover:text-white hover:font-medium duration-300'>Funcionando</li>"
}
