window.addEventListener('load', () => {
    localStorage.setItem('todos', null)

    todolist = JSON.parse(localStorage.getItem('todos')) || []

    addInput = document.querySelector('#addTask');
    searchTask = document.querySelector('#searchTask');

    addInput.addEventListener('change', (e)=> {
        newValue = e.target.value;
        newTodo = { // Create the new todo with an object 
            'content' : newValue,
        }
        todolist.push(newTodo);
        localStorage.setItem('todos', JSON.stringify(todolist))
        e.target.value = '' // To reset the input field

        displayTask();
    })

    displayTask();
})

const displayTask = () => {

    const tasks = document.body.querySelector('#todo-list');
    tasks.innerHTML = '';

    todolist.forEach(todo => {

        // Creating all the elements

        newTodo = document.createElement('section');
        content = document.createElement('section');
        title = document.createElement('h3');
        input = document.createElement('input');
        buttons = document.createElement('buttons');
        deleteButton = document.createElement('button');
        editButton = document.createElement('button');

        // Adding to all of them the corresponding class and content

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

        if (todo){
            input.value = todo.content;
        }
        else{
            input.value = ''
        }
        
        input.setAttribute('readonly', true)
        input.type = 'text'
        // Creating the DOM tree

        buttons.appendChild(deleteButton);
        buttons.appendChild(editButton);
        title.appendChild(input);
        content.appendChild(title);
        content.appendChild(buttons);
        newTodo.appendChild(content);

        tasks.appendChild(newTodo);

        // Adding the corresponding event

        deleteButton.addEventListener('click', () => {
            todolist = todolist.filter(t => t != todo);
            localStorage.setItem('todos', JSON.stringify(todolist));

            displayTask();
        })

        editButton.addEventListener('click', (e) => {
            
            const input = title.querySelector('input')
            console.log(input)
            input.removeAttribute('readonly');
            input.focus();
            input.addEventListener('blur', () => {
                input.value = e.target.value
                input.setAttribute('readonly', true);
                localStorage.setItem('todos', JSON.stringify(todolist));
                displayTask();
            })

        })

    })
}