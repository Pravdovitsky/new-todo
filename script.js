let taskList = [];
const listContainer = document.getElementById('incomplete-task');
const newName = document.getElementById('new-name');

const addItemToList = (name) => {
    const newTask = {name: name, status: false};

    taskList.push(newTask);
    localStorage.setItem('savedList', JSON.stringify(taskList));
    printTask(newTask, taskList.length - 1);
};

const printList = () => {
    taskList.forEach(printTask);
};

const printTask = (task, index) => {
    listContainer.innerHTML += '<div class="style-item">' +
        '<div class="name-width">' + task.name + '</div>' +
        (task.status ? '<div class="completed">Выполнено</div>' : '<button onclick="finishTask()" id="complete-' + index + '">Выполнено</button>') +
        '<button onclick="deleteItem()" id=' + index + '>' + 'Удалить' + '</button>' + '</div>';
};


const saveToLS = () => {
    localStorage.setItem('savedList', JSON.stringify(taskList));
};

const finishTask = () => {
    const completeBtn = event.target;
    const buttonId = completeBtn.id;
    const taskId = +buttonId.replace('complete-', '');

    taskList[taskId].status = true;
    saveToLS();
    listContainer.innerHTML = '';
    printList();
};

const addTask = () => {
    if (newName.value) {
        addItemToList(newName.value);
    } else {
        alert('Заполните поля');
    }
    newName.value = '';
};

const loadSavedData = () => {
    let savedTaskList = JSON.parse(localStorage.getItem('savedList'));
    if (savedTaskList) {
        taskList = savedTaskList;
    } else {
        addItemToList('Example task');
    }
};

const cleaning = () => {
    taskList = [];
    listContainer.innerHTML = '';
    saveToLS();
};

const deleteItem = () => {
    let id = +event.target.id;
    taskList.splice(id, 1);
    listContainer.innerHTML = '';
    localStorage.setItem('savedList', JSON.stringify(taskList));
    printList();
};

loadSavedData();
printList();
