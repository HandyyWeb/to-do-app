window.addEventListener('load', () => {

    const name = localStorage.getItem('name') // Get the registered name in the local storage
    const inputName = document.getElementById('name');
    inputName.textContent = name || ''; // Get wether the registered name or a fresh empty name
    
    inputName.addEventListener('blur', (e)=> {
        console.log(e.target.textContent)
        localStorage.setItem('name', e.target.textContent) // Use registered name to add a personal side to the website
    })

    todolist = JSON.parse(localStorage.getItem('todos')) || [] // Get wether the registered todolist or a fresh empty todolist
    tasks = document.body.querySelector('#todo-list');
    addTask = document.querySelector('#addTask');
    addButton = document.querySelector("#addButton");
    searchTask = document.querySelector('#searchTask');
    menu = document.querySelector('.menu')
    displayMenu = document.querySelector('.button-display');
    closeMenu = document.querySelector('.button-close')

    displayMenu.addEventListener('click', (e) => {
        menu.style.display = 'block'
        e.target.style.display = 'none'
        closeMenu.style.display = 'block'
    })

    closeMenu.addEventListener('click', (e) => {
        menu.style.display = 'none'
        e.target.style.display = 'none'
        displayMenu.style.display = 'block'
    })

    addButton.addEventListener('click', (e)=> {

        const newTodo = createTodo('')
        tasks.appendChild(newTodo);

        const newTodoInput = newTodo.childNodes[0].childNodes[0].childNodes[0] // Focus the input element in the h3 element in the section element in the todo ( a bit too long )
        newValue = newTodoInput.textContent;
    
        newTodoInput.setAttribute('contenteditable', true); // Remove the readonly attribute to make the todo editable
        newTodoInput.focus(); // Add a focus on the current edited element

        newTodoInput.addEventListener('blur', (e) => {
            newValue = e.target.textContent // Replace the todo value with the new entered value in the todolist

            newTodoStorage =  // Create the new todo in as an object
            { 
                'content' : newValue,
            }
            todolist.push(newTodoStorage);

            newTodoInput.setAttribute('contenteditable', false); // Remake the todo as readonly
            localStorage.setItem('todos', JSON.stringify(todolist)); 
        }) 
    })

    searchTask.addEventListener('change', (e) => {

        if (e.target.value != ''){
            todolist = todolist.filter(t => t.content == e.target.value) // Create a new todolist with only the searched todo
            e.target.value = '' // To reset the input field
            displayTask();
        }  
    })

    displayTask();
})

const displayTask = () => {
    
    tasks.innerHTML = ''; // Clear the current todolist to welcome the new todolist

    todolist.forEach(todo => {
        const newTodo = createTodo(todo);
        tasks.appendChild(newTodo);
    })
}

const createTodo = (todo) => {

        // Creating all the elements

        const newTodo = document.createElement('section');
        const content = document.createElement('section');
        const title = document.createElement('h3');
        const input = document.createElement('span');
        const buttons = document.createElement('buttons');
        const deleteButton = document.createElement('button');
        const editButton = document.createElement('button');

        // Add all the corresponding classes and contents

        newTodo.classList.add('todo');
        content.classList.add('todo-wrapper');
        title.classList.add('todo-title');
        input.classList.add('todo-input');
        buttons.classList.add('todo-button-list');

        deleteButton.classList.add('delete');
        deleteButton.classList.add('todo-button');
        deleteButton.textContent = 'Delete'
        editButton.classList.add('edit');
        editButton.classList.add('todo-button');
        editButton.textContent = 'Edit';

        input.setAttribute('contenteditable', false);

        if (todo.content){
            input.textContent = todo.content;
        }
        else{ // If the content is empty, just create an empty todo
            input.textContent = ''
        }

        // Creating the DOM tree

        buttons.appendChild(deleteButton);
        buttons.appendChild(editButton);
        title.appendChild(input);
        content.appendChild(title);
        content.appendChild(buttons);
        newTodo.appendChild(content);

        // Add the corresponding events

        deleteButton.addEventListener('click', () => {

            todolist = todolist.filter(t => t != todo); // Create a new todolist without the todo we want to delete
            localStorage.setItem('todos', JSON.stringify(todolist));
            displayTask();
        })

        editButton.addEventListener('click', (e) => {
            
            const input = content.querySelector('span')
            input.setAttribute('contenteditable', true); // Remove the readonly attribute to make the todo editable
            input.focus(); // Add a focus on the current edited element

            input.addEventListener('blur', (e) => {
                todo.content = e.target.textContent // Replace the todo value with the new entered value in the todolist
                input.setAttribute('contenteditable', false); // Remake the todo as readonly
                localStorage.setItem('todos', JSON.stringify(todolist));
                displayTask();
            })
        })

    return newTodo;
}