document.addEventListener('DOMContentLoaded', () => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks'))


    if (storedTasks) {
        storedTasks.forEach((task) => tasks.push(task))
        updateTaskList()
        updateState()
    }
})


let tasks = [];

const savetasks = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
}

const addTask = () => {

    const taskInput = document.getElementById('taskInput')

    const text = taskInput.value.trim()

    if (text) {
        tasks.push({ text: text, completed: false })
        taskInput.value = '';
        updateTaskList()
        updateState()
        savetasks()
    }
}

const toggleTaskCompleted = (index) => {
    tasks[index].completed = !tasks[index].completed;
    updateTaskList();
    console.log({ tasks })
    updateState();
    savetasks()
}

const deleteTask = (index) => {
    tasks.splice(index, 1);
    updateTaskList();
    updateState()
    savetasks()
}

const editTask = (index) => {
    const taskInput = document.getElementById('taskInput');
    taskInput.value = tasks[index].text;
    tasks.splice(index, 1);

    updateTaskList();
    updateState();
};

const updateState = (index) => {
    const completedTasks = tasks.filter(task => task.completed).length
    const totalTasks = tasks.length
    const progress = (completedTasks / totalTasks) * 100
    const progressBar = document.getElementById('progress') //

    progressBar.style.width = `${progress}%`

    document.getElementById('numbers').innerText = `${completedTasks} / ${totalTasks}`

    if (tasks.length && completedTasks === totalTasks) {
        blast()
    }
}

const updateTaskList = () => {

    const taskList = document.getElementById('task-list')
    taskList.innerHTML = ''

    tasks.forEach((task, index) => {
        const listItem = document.createElement('li')

        listItem.innerHTML = `
            <div class="taskItem">
                <div class="task ${task.completed ? 'completed' : ''}">
                    <input type="checkbox" class="checkbox" ${task.completed ? 'checked' : ''} />
                    <p>${task.text}</p>
                </div>
                <div class="icons">
                    <div onClick = 'editTask(${index})'>
                        <lord-icon src="https://cdn.lordicon.com/wuvorxbv.json" trigger="hover" colors="primary:#30c9e8" style=" width:35px;height:35px ">
                        </lord-icon>
                    </div>
                    <div onClick = 'deleteTask(${index})'>
                        <lord-icon src="https://cdn.lordicon.com/skkahier.json " trigger="hover" colors="primary:#e4e4e4" style="width:30px;height:30px ">
                        </lord-icon>
                    </div>
                </div>
            </div>`

        listItem.addEventListener('change', () => toggleTaskCompleted(index))
        taskList.append(listItem)
    })
}


document.getElementById('submit').addEventListener('click', (e) => {

    e.preventDefault();
    addTask();
})

const blast = () => {
    const defaults = {
        spread: 360,
        ticks: 50,
        gravity: 0,
        decay: 0.94,
        startVelocity: 30,
        shapes: ["star"],
        colors: ["FFE400", "FFBD00", "E89400", "FFCA6C", "FDFFB8"],
    };

    function shoot() {
        confetti({
            ...defaults,
            particleCount: 40,
            scalar: 1.2,
            shapes: ["star"],
        });

        confetti({
            ...defaults,
            particleCount: 10,
            scalar: 0.75,
            shapes: ["circle"],
        });
    }

    setTimeout(shoot, 0);
    setTimeout(shoot, 100);
    setTimeout(shoot, 200);
}