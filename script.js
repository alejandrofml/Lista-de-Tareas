document.addEventListener('DOMContentLoaded', function() {
    const taskForm = document.getElementById('task-form');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');
  
    // Cargar tareas desde Local Storage
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => addTaskToList(task));
  
    // Evento para agregar una nueva tarea
    taskForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const taskText = taskInput.value.trim();
      if (taskText !== '') {
        const task = {
          text: taskText,
          completed: false
        };
        addTaskToList(task);
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        taskInput.value = '';
      }
    });
  
    // Función para agregar una tarea al DOM
    function addTaskToList(task) {
      const li = document.createElement('li');
      li.textContent = task.text;
      if (task.completed) {
        li.classList.add('completed');
      }
      // Botón para marcar como completada
      const completeBtn = document.createElement('button');
      completeBtn.textContent = '✔';
      completeBtn.addEventListener('click', function() {
        task.completed = !task.completed;
        li.classList.toggle('completed');
        localStorage.setItem('tasks', JSON.stringify(tasks));
      });
      li.appendChild(completeBtn);
      // Botón para eliminar tarea
      const deleteBtn = document.createElement('button');
      deleteBtn.textContent = '✖';
      deleteBtn.addEventListener('click', function() {
        const index = tasks.indexOf(task);
        tasks.splice(index, 1);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        taskList.removeChild(li);
      });
      li.appendChild(deleteBtn);
      taskList.appendChild(li);
    }
  });
  