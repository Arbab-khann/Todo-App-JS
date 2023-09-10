// selector
let section = document.getElementsByTagName("section");
let header = document.getElementsByTagName("header");
header[1].style.display = "none";
// creating a text node in section
let textNode = document.createElement("div");
textNode.textContent = " No items in the todo list ";
section[0].appendChild(textNode);
//checking if textNode should visible or not
if (section[0].childNodes.length === 0) {
  textNode.style.display = "block";
}
// event listner on addItems it will show the "add new list" popUp
let addItems1 = document.getElementById("addItem1");
addItems1.addEventListener("click", () => {
  let heading = "Add new list";
  popUp(addItems1, heading);
});
// Funcrtion  one create popup
// button ------->button that triger the popUp function
//  heading----------->card heading
// newTast----->card div
function popUp(button, heading, newTask) {
  // disableing the buttons
  button.style.pointerEvents = "none";

  // popup
  let popUp = document.createElement("div");
  popUp.className = "popUp";
  popUp.id = "popUp";
  // popup header
  let popUpHead = document.createElement("div");
  popUpHead.className = "popUpHead";
  popUpHead.textContent = heading;
  // popup input
  let PopUpInput = document.createElement("input");
  PopUpInput.type = "text";
  PopUpInput.placeholder = heading;
  // popup buttons
  let popUpButtons = document.createElement("span");
  popUpButtons.className = "popUpButtons";
  // add Button
  let addBtn = document.createElement("div");
  addBtn.className = "addBtn";
  addBtn.textContent = "Add";

  // close Button
  let closeBtn = document.createElement("div");
  closeBtn.className = "closeBtn";
  closeBtn.textContent = "close";
  // connecting nodes
  document.body.appendChild(popUp);
  popUp.appendChild(popUpHead);
  popUp.appendChild(PopUpInput);
  popUp.appendChild(popUpButtons);
  popUpButtons.appendChild(addBtn);
  popUpButtons.appendChild(closeBtn);

  // ----------pop features-------

  // 1 bg blur
  section[0].classList.add("blur");
  header[0].classList.add("blur");
  header[1].classList.add("blur");
  // 2 transition
  // adding the animation class
  popUp.classList.add("popTransitionComing");

  // ----------close the popup-----------
  // close the popup by close btn
  closeBtn.addEventListener("click", () => {
    closeTask();
  });
  // status btn
  let statusAddBtn = true;

  // close popup function
  function closeTask() {
    section[0].classList.remove("blur");
    header[0].classList.remove("blur");
    header[1].classList.remove("blur");
    // enabling buttons
    button.style.pointerEvents = "auto";
    // removing the animation class
    popUp.classList.remove("popTransitionComing");
    popUp.classList.add("popTransitionGoing");
    //removing the pop from dom
    setTimeout(() => {
      popUp.remove();
    }, 500);
  }

  // close the popup by add btn and creating new task card by clicking on add
  addBtn.addEventListener("click", () => {
    // PopUpInput.value is give the value that is taken from user input
    if (PopUpInput.value) {
      let flag = "true"; //true is for subtask and false is for new task card
      if (heading === "Add new list") {
        addNewCard(PopUpInput.value, !flag);
        statusAddBtn = true;
      }
      if (heading === "Add new item") {
        // PopUpInput.value is give the value that is taken from user input
        // creating new subheading
        // close the popup by close btn and creating new task card by clicking on add
        subTask(PopUpInput.value, newTask);
        statusAddBtn = false;
      }
    }
    // this is removing the section text if any card is being added
    if (section[0].childNodes.length !== 0) {
      textNode.remove();
    }
    // cheching the status Add Btn
    statusOfPopUp(statusAddBtn);
    closeTask();
  });
}

// for add new task cards
function addNewCard(headingText, flag) {
  // -------------creating nodes------------
  // new task
  let newTask = document.createElement("div");
  newTask.className = "newTask";

  // new  Task Head
  let newTaskHeading = document.createElement("div");
  newTaskHeading.className = "newTaskHeading";
  newTaskHeading.innerHTML = headingText; //temporary
  // line
  let line = document.createElement("div");
  line.className = "line";
  // new Task Description
  let newTaskDescription = document.createElement("div");
  newTaskDescription.className = "newTaskDescription";
  // new Task Btn
  let newTaskBtn = document.createElement("button");
  newTaskBtn.className = "newTaskBtn";
  newTaskBtn.textContent = "Mark Done";
  // new Task buttons
  let newTaskbuttons = document.createElement("div");
  newTaskbuttons.className = "newTaskbuttons";
  // new Task Delete
  let newTaskDelete = document.createElement("i");
  newTaskDelete.className = "fa-solid fa-trash-can newTaskDelete";
  // new Task plus
  let newTaskplus = document.createElement("i");
  newTaskplus.className = "fa-sharp fa-solid fa-circle-plus newTaskplus";
  // ----------------checking whether we want to create a new card or just add new subtask --------------------
  // -----------if flag is true than subtask is being added---------
  if (flag) {
    section[0].appendChild(newTask);
    newTask.appendChild(newTaskHeading);
    newTask.appendChild(line);
    newTask.appendChild(newTaskbuttons);
    newTaskbuttons.appendChild(newTaskDelete);
    newTaskbuttons.appendChild(newTaskplus);
    newTask.appendChild(newTaskDescription);
    newTaskDescription.appendChild(newTaskBtn);
    console.log(headingText);
    newTaskDescription.innerHTML = headingText;
  } else {
    //-----------connecting nodes------------;
    section[0].appendChild(newTask);
    newTask.appendChild(newTaskHeading);
    newTask.appendChild(line);
    newTask.appendChild(newTaskbuttons);
    newTaskbuttons.appendChild(newTaskDelete);
    newTaskbuttons.appendChild(newTaskplus);
  }

  // when we click on mark as done text decoration will apply on description
  newTaskBtn.addEventListener("click", () => {
    change();
  });
  // change() function is for the subtask description
  function change() {
    newTaskDescription.style.textDecoration = "line-through";
    newTaskDescription.style.color = "red";
  }
  // create a sub task on clicking the plus btn
  newTaskplus.addEventListener("click", () => {
    let createSubTaskHeading = "Add new item";
    popUp(newTaskplus, createSubTaskHeading, newTask);
  });
  //   deleting the task card
  newTaskDelete.addEventListener("click", () => {
    newTask.remove();
    // this is taking back the section text if no card is left
    if (section[0].childNodes.length === 0) {
      section[0].appendChild(textNode);
    }
  });
  newTaskHeading.addEventListener("click", () => {
    selectCard(newTaskHeading.innerHTML, newTask);
  });

  //   for the second page
  window.value = newTask;
}

//subTask function is creating a subtask by taking the input value from user and
//the headNode is with a parent node of Task Description
function subTask(value, headNode) {
  // new Task Description
  let newTaskDescription = document.createElement("div");
  newTaskDescription.className = "newTaskDescription";
  newTaskDescription.textContent = value;
  // new Task Btn
  let newTaskBtn = document.createElement("button");
  newTaskBtn.className = "newTaskBtn";
  newTaskBtn.textContent = "Mark Done";
  headNode.appendChild(newTaskDescription);
  newTaskDescription.appendChild(newTaskBtn);

  // when we click on mark as done text decoration will apply on description
  newTaskBtn.addEventListener("click", () => {
    change();
  });
  function change() {
    newTaskBtn.remove();
    newTaskDescription.style.textDecoration = "line-through";
    newTaskDescription.style.color = "red";
  }
}
// -------------------------page 2---------------------------------------
//after clicking the heading of card changing the bg
function selectCard(cardHeading, node) {
  // changing the header
  header[1].style.display = "flex";
  header[0].style.display = "none";
  document.getElementById("addItemsContainer");
  addItemsContainer.innerHTML = cardHeading;
  // changing the section
  section[0].style.visibility = "hidden";
  //  center the selected div
  node.classList.add("newTask2");
}

//after clicking the back changing to main page
function unSelectCard() {
  //changing the header
  header[1].style.display = "none";
  header[0].style.display = "flex";
  document.getElementById("addItemsContainer");
  addItemsContainer.innerHTML = "";
  //changing the section
  section[0].style.visibility = "visible";
  //center the selected div
  console.log(section[0].childNodes.length);
  console.log(section[0].childNodes);
  // node.classList.remove('newTask2');
  for (let i = 0; i < section[0].childNodes.length; i++) {
    section[0].childNodes[i].classList.remove("newTask2");
  }
}

// second page function

let addItem2 = document.getElementById("addItem2");
let isBtnClick = false;

addItem2.addEventListener("click", () => {
  let statusAddBtn = false;
  popUp(addItem2, "Add new list", window.value, statusAddBtn);
});
// add btn is pressed
function statusOfPopUp(statusAddBtn) {
  if (statusAddBtn) {
    unSelectCard();
  }
}
// back btn
let backBtn = document.getElementById("backBtn");
backBtn.addEventListener("click", () => {
  unSelectCard();
});
