const storedTasks = sessionStorage.getItem("listadeTasks");
if (storedTasks) {
    listadeTasks = JSON.parse(storedTasks);
}else{
    listadeTasks = []
}

let title
let description
let taskList

carregarTasks(listadeTasks);

function toggleModal() {
    const modal = document.getElementById('taskModal');
    modal.classList.toggle('hidden');
}

function addTask() {
    title = document.getElementById('taskTitle').value;
    description = document.getElementById('taskDescription').value;
    taskList = document.getElementById('lista-de-tarefas');

    if (!title || !description) return alert('Por favor, preencha todos os campos');

    // Cria novo item da tarefa
    const taskItem = document.createElement('li');
    taskItem.className = "dark:bg-[#575757] dark:text-white mt-2 shadow-md rounded-md p-4 cursor-pointer shadow-gray-400 hover:bg-blue-800 hover:text-white hover:font-medium duration-300";

    const currentDate = new Date().toLocaleDateString('pt-BR');

    taskItem.innerHTML = `
        <h3 class="font-semibold">${title}</h3>
        <p class="font-light">${description}</p>
        <div class="flex justify-between items-center mt-2">
            <p class="font-medium text-xs">${currentDate}</p>
            <div class="flex gap-2">
                <span class="material-symbols-outlined cursor-pointer hover:text-gray-500" onclick="editTask(this)">edit</span>
                <span class="material-symbols-outlined cursor-pointer hover:text-gray-500" onclick="deleteTask(this)">delete</span>
            </div>
        </div>
    `;

    console.log(title);
    console.log(description);
    console.log(currentDate);
    
   
    listadeTasks.push({
        tarefa: title,
        descricao: description,
        data: currentDate,
    })

    sessionStorage.setItem("listadeTasks", JSON.stringify(listadeTasks))

    taskList.appendChild(taskItem);
    document.getElementById('taskTitle').value = '';
    document.getElementById('taskDescription').value = '';
    toggleModal();
}

function deleteTask(element) {
 
    const taskItem = element.closest('li');
    const taskTitle = taskItem.querySelector('h3').textContent; // Obtém o título da tarefa

    // Filtra a lista removendo a tarefa com o mesmo título
    listadeTasks = listadeTasks.filter(task => task.tarefa !== taskTitle);
    
    // Atualiza o sessionStorage
    sessionStorage.setItem("listadeTasks", JSON.stringify(listadeTasks));

    // Remove a tarefa da interface
    taskItem.remove();
}

function editTask(element) {
    const taskItem = element.closest('li');
    const title = taskItem.querySelector('h3').textContent;
    const description = taskItem.querySelector('p').textContent;

    document.getElementById('taskTitle').value = title;
    document.getElementById('taskDescription').value = description;
    deleteTask(element);
    toggleModal();
}

function toggleDarkMode() {
    document.documentElement.classList.toggle('dark');
}

function searchTasks() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    const tasks = document.querySelectorAll('#lista-de-tarefas li');

    tasks.forEach(task => {
        const title = task.querySelector('h3').textContent.toLowerCase();
        const description = task.querySelector('p').textContent.toLowerCase();

        if (title.includes(query) || description.includes(query)) {
            task.style.display = 'block';
        } else {
            task.style.display = 'none';
        }
    });
}

function carregarTasks(lista){
    listadeTasks.forEach(task => {

        console.log(task);
        
        taskList = document.getElementById('lista-de-tarefas');
        // Cria novo item da tarefa
        const taskItem = document.createElement('li');
        taskItem.className = "dark:bg-[#575757] dark:text-white mt-2 shadow-md rounded-md p-4 cursor-pointer shadow-gray-400 hover:bg-blue-800 hover:text-white hover:font-medium duration-300";
    
        taskItem.innerHTML = `
            <h3 class="font-semibold">${task.tarefa}</h3>
            <p class="font-light">${task.descricao}</p>
            <div class="flex justify-between items-center mt-2">
                <p class="font-medium text-xs">${task.data}</p>
                <div class="flex gap-2">
                    <span class="material-symbols-outlined cursor-pointer hover:text-gray-500" onclick="editTask(this)">edit</span>
                    <span class="material-symbols-outlined cursor-pointer hover:text-gray-500" onclick="deleteTask(this)">delete</span>
                </div>
            </div>
        `;

        taskList.appendChild(taskItem);
    })
}