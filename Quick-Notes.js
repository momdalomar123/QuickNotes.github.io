

//Dialog-always-opened-to-edit
/*window.addEventListener('DOMContentLoaded',()=>{
    document.getElementById('dialog-add-note').showModal();
});*/
const themeButtonState = JSON.parse(localStorage.getItem('themeButton')) || {
    name: 'Dark'
}
let colorPickerElement = document.getElementById('note-background-color-picker');
let colorPickerValue = colorPickerElement.value;
const notesBackgroundColor = JSON.parse(localStorage.getItem('notesbackground')) || [];
let currentIndex = null;
let flag = 0;
const notes = JSON.parse(localStorage.getItem('notes')) || [];
displayNotes();
const descriptionElement = document.getElementById('input-description-note');
const titleElement = document.getElementById('input-title-note');
const confirmElement = document.getElementById('confirm-note-button');
const themeBody = document.documentElement;
const dialogAdd = document.getElementById('dialog-add-note');
const themeElement = document.getElementById('dark-light-button');
let titleNeededMessage = document.getElementById('title-needed-message');
let descriptionNeededMessage = document.getElementById('description-needed-message');
let headerElement = document.getElementById('header-container-id');
let title = titleElement.value
let description = descriptionElement.value;
colorPicker();
changeThemeButtonText();
changeBodyTheme();
function changeThemeButtonText() {
    themeElement.innerHTML = themeButtonState.name;
}

clearInputs();

function clearInputs() {
    titleElement.value = '';
    descriptionElement.value = '';
}
function clearWarningMessages() {
    titleNeededMessage.innerHTML = '';
    descriptionNeededMessage.innerHTML = '';
}
function restoreAddButtonAndInputs() {
    clearInputs();
    addButton.classList.remove('toggle-display');
    confirmElement.classList.add('toggle-display');


}
function moveCursorToEnd(input) {
    const length = input.value.length;
    input.setSelectionRange(length, length);
    input.focus();
}
function openDialog() {

    dialogAdd.showModal();
    titleElement.focus();
    moveCursorToEnd(titleElement);

}
const addButton = document.getElementById('add-note-confirm-button');
const cancleButton = document.getElementById('cancel-note-button');
cancleButton.addEventListener('click', () => {
    dialogAdd.close()
    addButton.innerHTML = "Add"
})
titleElement.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        descriptionElement.focus();

    }
})

addButton.addEventListener('click', () => {
    pushToNotes();

})
deleteNoteButtons();
function deleteNoteButtons() {
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('js-delete-note-button')) {
            deleteNote(e.target);

        }
    });
}
editNoteButtons();
function editNoteButtons() {
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('js-edit-note-button')) {
            titleElement.focus();
            editNote(e.target);
        }
    });
}


function displayNotes() {
    let noteGridHTML = '';
    for (let i = 0; i < notes.length; i++) {
        noteGridHTML += `<div class="note-container-grid"
         id="note-container-grid-id-${i + 1}"
         style="background-color:${notesBackgroundColor[i]};">
         <div class="text-note-container">
         <h1 style="width:350px;">${notes[i].title}</h1>
    <p>${notes[i].description}</p></div>
    <div class="note-buttons-container">
    <div class="note-timestamp-container">
    <p class="note-timestamp">${notes[i].timeStampNote}</p></div>
    <button class="delete-note-button-style js-delete-note-button"data-delete-button-id="${i + 1}">Delete</button>
    <button class="edit-note-button-style js-edit-note-button" data-edit-button-id="${i + 1}">Edit</button></div>
    </div>`
    }
    document.getElementById('grid-notes-template').innerHTML = noteGridHTML;

}
lightDarkToggle();
function lightDarkToggle() {


    themeElement.addEventListener('click', () => {
        if (themeElement.innerHTML === 'Dark') {
            themeButtonState.name = 'Light';
            themeElement.innerHTML = 'Light'
            themeBody.classList.remove('light-background-button')
            themeBody.classList.add('dark-background-button');
            headerElement.classList.add('dark-background-header');
            headerElement.classList.remove('light-background-header');
            localStorage.setItem('theme', 'darkMode');

            saveTolocalStorage();
        }
        else {
            themeButtonState.name = 'Dark';
            themeElement.innerHTML = 'Dark'
            themeBody.classList.remove('dark-background-button');
            themeBody.classList.add('light-background-button');
            headerElement.classList.remove('dark-background-header');
            headerElement.classList.add('light-background-header');
            localStorage.setItem('theme', 'lightMode');

            saveTolocalStorage();
        }

    });
}
function pushToNotes() {
    title = titleElement.value;
    description = descriptionElement.value;
    checkTitleAndDescription();
    if (description && title) {
        notes.push({ title, description, timeStampNote: getTimeStamp() })
        if (titleElement.classList.contains('red-outline-input') || descriptionElement.classList.contains('red-outline-input')) {
            titleElement.classList.remove('red-outline-input');
            descriptionElement.classList.remove('red-outline-input');
        }
        displayNotes();
        changeNoteColor();
        saveTolocalStorage();
        dialogAdd.close();

    }

}
function getTimeStamp() {
    let timeStamp = new Date();
    const timeStampDate = timeStamp.toLocaleDateString();
    const timeStampTime = timeStamp.toLocaleTimeString();
    const timeStampNote = `${timeStampTime}
    ${timeStampDate}`;
    return timeStampNote;
}
function changeBodyTheme() {

    if (localStorage.getItem('theme') === 'darkMode') {
        themeBody.classList.add('dark-background-button');
        themeBody.classList.remove('light-background-button');
        headerElement.classList.add('dark-background-header');
        headerElement.classList.remove('light-background-header');


    }
    else {
        themeBody.classList.add('light-background-button');
        themeBody.classList.remove('dark-background-button');
        headerElement.classList.remove('dark-background-header');
        headerElement.classList.add('light-background-header');

    }
}

function changeNoteColor() {

    const noteContainerId = document.getElementById(`note-container-grid-id-${notes.length}`);
    if (noteContainerId)
        noteContainerId.style.background = colorPickerValue;
    notesBackgroundColor.push(colorPickerValue);

    saveTolocalStorage();

}
function colorPicker() {

    flag = 1;
    if (flag) {
        colorPickerElement.addEventListener('change', () => {
            colorPickerValue = colorPickerElement.value;
        });
    }
    flag = 0;
}

function closeDialogAfterTappingOutside() {
    dialogAdd.addEventListener('', () => {
        dialogAdd.close();
    });
}
function saveTolocalStorage() {
    localStorage.setItem('notes', JSON.stringify(notes));
    localStorage.setItem('themeButton', JSON.stringify(themeButtonState));
    localStorage.setItem('notesbackground', JSON.stringify(notesBackgroundColor));

}
function deleteNote(deleteButton) {
    const deleteButtonId = deleteButton.dataset.deleteButtonId;
    notes.splice(deleteButtonId - 1, 1);
    notesBackgroundColor.splice(deleteButtonId - 1, 1);
    displayNotes();
    saveTolocalStorage();

}

function editNote(editButton) {
    colorPicker();
    clearWarningMessages();
    const timeStampEdited = getTimeStamp();
    const editButtonId = editButton.dataset.editButtonId;
    currentIndex = editButtonId - 1;
    titleElement.value = notes[currentIndex].title;
    descriptionElement.value = notes[currentIndex].description;
    colorPickerElement.value = notesBackgroundColor[currentIndex];
    openDialog();
    titleElement.focus();
    addButton.classList.add('toggle-display');
    confirmElement.classList.remove('toggle-display');
    confirmElement.addEventListener('click', () => {
        if (currentIndex !== null) {
            title = titleElement.value;
            description = descriptionElement.value;
            checkTitleAndDescription();
            if (title && description) {
                titleElement.classList.remove('red-outline-input');
                descriptionElement.classList.remove('red-outline-input');
                notes[currentIndex].title = titleElement.value;
                notes[currentIndex].description = descriptionElement.value;
                notes[currentIndex].timeStampNote = timeStampEdited;
                notesBackgroundColor[currentIndex] = colorPickerValue;
                displayNotes();
                dialogAdd.close();
                saveTolocalStorage();
                currentIndex = null;
            }
        }
    });

}

function checkTitleAndDescription() {
    if (!title && !description) {
        titleElement.classList.add('red-outline-input');
        titleNeededMessage.innerHTML = "Please enter a note title"
        descriptionElement.classList.add('red-outline-input');
        descriptionNeededMessage.innerHTML = 'Please enter a note description';


    }
    if (!title && description) {
        descriptionNeededMessage.innerHTML = '';
        descriptionElement.classList.remove('red-outline-input');
        titleElement.classList.add('red-outline-input');
        titleNeededMessage.innerHTML = 'Please enter a note title'
    }
    if (!description && title) {
        titleNeededMessage.innerHTML = '';
        titleElement.classList.remove('red-outline-input');
        descriptionElement.classList.add('red-outline-input');
        descriptionNeededMessage.innerHTML = 'Please enter a note description'
    }

}
window.addEventListener("load", () => {
    document.documentElement.classList.add("enable-transition-body");
    document.documentElement.classList.add("enable-transition-header");

});