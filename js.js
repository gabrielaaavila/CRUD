// Obtener referencia al formulario y a la lista en el HTML
const itemForm = document.getElementById('item-form');
const itemList = document.getElementById('item-list');

// Crear un array para almacenar los elementos; si no hay datos, se usa un array vacío
const items = JSON.parse(localStorage.getItem('items')) || [];

// Agregar un event listener al formulario para agregar elementos
itemForm.addEventListener('submit', addItem);

// Agregar un event listener a la lista para manejar clics en botones de editar y eliminar
itemList.addEventListener('click', handleListClick);

// Función para renderizar los elementos en la lista
function renderItems() {
    itemList.innerHTML = ''; // Limpiar la lista antes de renderizar

    // Recorrer el array de elementos y crear elementos DOM para cada uno
    items.forEach((item, index) => {
        const li = createListItem(item, index);
        itemList.appendChild(li);
    });
}

// Función para crear un elemento de lista con botones de editar y eliminar
function createListItem(item, index) {
    const li = document.createElement('li');

    // Crear un span para mostrar el texto del elemento
    const span = document.createElement('span');
    span.textContent = item;

    // Crear botones para editar y eliminar
    const editButton = document.createElement('button');
    editButton.textContent = 'Editar';
    editButton.classList.add('edit-button');
    editButton.setAttribute('data-index', index);

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Eliminar';
    deleteButton.classList.add('delete-button');
    deleteButton.setAttribute('data-index', index);

    // Agregar los elementos creados al elemento de lista
    li.appendChild(span);
    li.appendChild(editButton);
    li.appendChild(deleteButton);

    return li;
}

// Función para agregar un nuevo elemento a la lista
function addItem(event) {
    event.preventDefault(); // Prevenir el comportamiento por defecto del formulario

    // Obtener el valor del input
    const newItemText = document.getElementById('item').value;

    // Si hay texto en el input, agregarlo al array y renderizar la lista
    if (newItemText) {
        items.push(newItemText);
        localStorage.setItem('items', JSON.stringify(items)); // Guardar en localStorage
        renderItems();
        clearInput();
    }
}

// Función para manejar los clics en la lista (editar y eliminar)
function handleListClick(event) {
    if (event.target.classList.contains('delete-button')) {
        const index = event.target.getAttribute('data-index');
        items.splice(index, 1); // Eliminar el elemento del array
        localStorage.setItem('items', JSON.stringify(items)); // Actualizar localStorage
        renderItems();
    } else if (event.target.classList.contains('edit-button')) {
        const index = event.target.getAttribute('data-index');
        const newText = prompt('Editar elemento:', items[index]);
        if (newText !== null && newText !== '') {
            items[index] = newText; // Actualizar el elemento en el array
            localStorage.setItem('items', JSON.stringify(items)); // Actualizar localStorage
            renderItems();
        }
    }
}

// Función para limpiar el input después de agregar un elemento
function clearInput() {
    document.getElementById('item').value = '';
}

// Inicializar la lista renderizando los elementos
renderItems();
