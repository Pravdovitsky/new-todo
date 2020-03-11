const listContainer = document.getElementById('incomplete-task');
const newName = document.getElementById('new-name');
let taskList = [];

const addItemToList = (name, date) => {
    const newTask = {name: name, date: date, status: false};

    taskList.push(newTask);
    localStorage.setItem('savedList', JSON.stringify(taskList));
    printTask(newTask, taskList.length - 1);
};

const printList = () => {
    taskList.forEach(printTask);
};

const printTask = (task, index) => {
    listContainer.innerHTML += `
        <div class="style-item">
            <div class="name-width">${task.name}</div>
            <div class="date">${task.date}</div>
            <div class = ${task.status ? 'completed' : 'not-completed'} onclick='finishTask()' id='complete-${index}'>Выполнено</div>
            <button onclick="deleteItem()" id=${index}>Удалить</button>
        </div>`
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
    const d = new Date();
    let day = d.getDate() < 10 ? '0' + d.getDate() : d.getDate(),
        month = d.getMonth() + 1 < 10 ? '0' + (d.getMonth() + 1) : d.getMonth() + 1,
        dateString;

    dateString = day + '.' + month + '.' + d.getFullYear();

    if (newName.value) {
        addItemToList(newName.value, dateString);
    } else {
        alert('Заполните поле задачи!');
    }

    newName.value = '';
};

const loadSavedData = () => {
    const savedTaskList = JSON.parse(localStorage.getItem('savedList'));

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
    const id = +event.target.id;

    taskList.splice(id, 1);
    listContainer.innerHTML = '';
    localStorage.setItem('savedList', JSON.stringify(taskList));
    printList();
};

loadSavedData();
printList();

document.querySelector('input').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        addTask();
    }
});
