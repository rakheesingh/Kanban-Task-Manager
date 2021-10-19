const addBtns = document.querySelectorAll(".add-btn:not(.solid)");
const saveItemBtns = document.querySelectorAll(".solid");
const addItemContainers = document.querySelectorAll(".add-container");
const addItems = document.querySelectorAll(".add-item");
// Item Lists
const listColumn = document.querySelectorAll(".drag-item-list");
const backlogList = document.getElementById("backlog-list");
const progressList = document.getElementById("progress-list");
const completeList = document.getElementById("complete-list");
const onHoldList = document.getElementById("on-hold-list");

// Items
let updateDOMOnLoad = false;

// Initialize Arrays
let listArray = [];

// Drag Functionality
let columnIndex;
let draggedItem;

//save items in array
function saveItemInArray(arrList, listEl) {
  arrList.length = 0;
  for (let i = 0; i < listEl.length; i++) {
    if (listEl[i].textContent.length > 0) arrList.push(listEl[i].textContent);
  }
  return arrList;
}

//Drag and drop
function allowDrop(ev) {
  ev.preventDefault();
}

function dragItem(ev) {
  draggedItem = ev.target;
}

function drop(ev) {
  ev.preventDefault();
  listColumn.forEach((col) => col.classList.remove("over"));
  // add dragged item to list
  listColumn[columnIndex].appendChild(draggedItem);
  rebuildList();
}

function dragEnter(col) {
  listColumn[col].classList.add("over");
  columnIndex = col;
}

//Rebuild List
function rebuildList() {
  for (i = 0; i < listColumn.length; i++) {
    let listChildren=listColumn[i].children;

    for(let j=0; j<listChildren.length; j++){
      if(listChildren[j].textContent==""){
        listColumn[i].removeChild(listChildren[j]);
      }
    }
    listArray[i] = saveItemInArray(listArray[i], listChildren);
  }
  //save new list in localstorage
  updateSavedColumns();
}

//edit list
function listenForDoubleClick(element) {
  element.contentEditable = true;
  setTimeout(function () {
    if (document.activeElement !== element) {
      element.contentEditable = false;
    }
  }, 300);
}

//remove edit option
function removeEditItem(event) {
  event.contentEditable = false;
  rebuildList();
}

// Create DOM Elements for each list item
function createItemEl(columnEl, column, item, index) {
  // List Item
  const listEl = document.createElement("li");
  listEl.classList.add("drag-item");
  listEl.textContent = item;
  listEl.draggable = true;
  listEl.setAttribute("ondragstart", "dragItem(event)");
  listEl.setAttribute("onclick", "listenForDoubleClick(event.target)");
  listEl.setAttribute("onfocusout", "removeEditItem(event)");

  columnEl.appendChild(listEl);
}

// Update Columns in DOM - Reset HTML, Filter Array, Update localStorage
function updateDOM() {
  // Check localStorage once
  if (!updateDOMOnLoad) {
    getSavedColumns(listArray);
    updateDOMOnLoad = true;
  }
  //Update all four Columns
  for (let i = 0; i < listColumn.length; i++) {
    listColumn[i].textContent = "";
    listArray[i].forEach((listItem, index) => {
      createItemEl(listColumn[i], 0, listItem, index);
    });
  }
}

//Add new entry into col and reset
function addToColoum(column) {
  let itemText = addItems[column].textContent;
  if (itemText.length > 0) {
    const selectedArray = listArray[column];
    selectedArray.push(itemText);
    updateDOM();
    updateSavedColumns();
  }
}

function showInputBox(col) {
  addBtns[col].style.visibility = "hidden";
  saveItemBtns[col].style.display = "flex";
  addItemContainers[col].style.display = "flex";
}

function hideInputBox(col) {
  addBtns[col].style.visibility = "visible";
  saveItemBtns[col].style.display = "none";
  addItemContainers[col].style.display = "none";
  addToColoum(col);
}

updateDOM();

//add button event listner
addBtns.forEach((addBtn, index) =>
  addBtn.addEventListener("click", () => showInputBox(index))
);
saveItemBtns.forEach((addBtn, index) =>
  addBtn.addEventListener("click", () => hideInputBox(index))
);
