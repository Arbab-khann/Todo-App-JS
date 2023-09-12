// card container (section)
let section = document.getElementsByTagName("section");
let header = document.getElementsByTagName("header");
//hide the second page heading
header[1].style.display = "none";

//--> creating a text node in section and connecting it.
let textNode = document.createElement("div");
textNode.textContent = " No Items In The ToDo List... ";
section[0].appendChild(textNode);
//checking if textNode should visible or not
if (section[0].childNodes.length === 0) {
  textNode.style.display = "block";
}

//eventlistner on addItems1 it will show the "add new list" popUp
let addItems1 = document.getElementById("addItem1");
addItems1.addEventListener("click", () => {
  let heading = "Add new list";
  popUp(addItems1, heading);
});

//---> Function  one create popup
// button ------->button that triger the popUp function
// heading----------->card heading
// newTast----->card div because of sub task
function popUp(button, heading, newTask) {
  // disableing the buttons once it clicked
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
  // popup buttons (add & close)
  let popUpButtons = document.createElement("span");
  popUpButtons.className = "popUpButtons";
  // add Buttons on popup
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

  // ----------popup working-------

  // backgroud blur after openning pupop
  // to open smoothly add transition
  section[0].classList.add("blur");
  header[0].classList.add("blur");
  header[1].classList.add("blur");

  // adding the animation class which already css applied for transition
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

  // popup close by clicking add btn and creating new task card by clicking on add
  addBtn.addEventListener("click", () => {
    // PopUpInput.value is value that taken from user
    if (PopUpInput.value) {
      if (heading === "Add new list") {
        addNewCard(PopUpInput.value);
        statusAddBtn = true; //if true go to page one
      }

      if (heading === "Add new item") {
        // PopUpInput.value is value that is taken from user
        // creating new subheading
        // popup close by clicking add btn and creating new task card by clicking on add
        subTask(PopUpInput.value, newTask);
        statusAddBtn = false; //false then no change
      }
    }
    // this is removing the section text if any card is being added
    if (section[0].childNodes.length !== 0) {
      textNode.remove();
    }
    // checking the status Add Btn
    statusOfPopUp(statusAddBtn);
    closeTask();
  });
}
// add new task cards in Task list
function addNewCard(headingText) {
  // -------------creating nodes------------
  // new task
  let newTask = document.createElement("div");
  newTask.className = "newTask";

  // new  Task Heading div
  let newTaskHeading = document.createElement("div");
  newTaskHeading.className = "newTaskHeading";
  newTaskHeading.innerHTML = headingText; //temporary it will change
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
  // new Task buttons add and delete
  let newTaskbuttons = document.createElement("div");
  newTaskbuttons.className = "newTaskbuttons";
  // new Task button Delete
  let newTaskDelete = document.createElement("i");
  newTaskDelete.className = "fa-solid fa-trash-can newTaskDelete";
  // new Task button plus
  let newTaskplus = document.createElement("i");
  newTaskplus.className = "fa-sharp fa-solid fa-circle-plus newTaskplus";
  // ----------------checking whether we want to create a new card or just add new subtask --------------------
  //-----------connecting nodes------------;
  section[0].appendChild(newTask);
  newTask.appendChild(newTaskHeading);
  newTask.appendChild(line);
  newTask.appendChild(newTaskbuttons);
  newTaskbuttons.appendChild(newTaskDelete);
  newTaskbuttons.appendChild(newTaskplus);

  // when click on mark as done text decoration will apply
  newTaskBtn.addEventListener("click", () => {
    change();
  });
  // change function apply on subtask description
  function change() {
    newTaskDescription.style.textDecoration = "line-through";
    newTaskDescription.style.color = "red";
  }
  // in card create subtask on clicking the plus btn
  newTaskplus.addEventListener("click", () => {
    let createSubTaskHeading = "Add new item";
    popUp(newTaskplus, createSubTaskHeading, newTask);
  });
  //   deleting the task card
  newTaskDelete.addEventListener("click", () => {
    newTask.remove();
    // taking back the section text, main page text("no item in list")  if no card is left
    if (section[0].childNodes.length === 0) {
      section[0].appendChild(textNode);
    }
  });
  newTaskHeading.addEventListener("click", () => {
    selectCard(newTaskHeading.innerHTML, newTask);
  });

  //making it global variable to use in second page
  window.value = newTask;
}

//subTask function is creating a subtask by taking the userinput as a value from users
//parentCard is a parent node of Task Description
function subTask(value, parentCard) {
  // new Task Description
  let newTaskDescription = document.createElement("div");
  newTaskDescription.className = "newTaskDescription";
  newTaskDescription.textContent = value;
  // newTaskBtn is a markdone button
  let newTaskBtn = document.createElement("button");
  newTaskBtn.className = "newTaskBtn";
  newTaskBtn.textContent = "Mark Done";
  parentCard.appendChild(newTaskDescription);
  newTaskDescription.appendChild(newTaskBtn);

  // when we click on mark done text decoration apply on description
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
//after clicking the heading of card changing the background
function selectCard(cardHeading, selectedcard) {
  // changing the header
  header[1].style.display = "flex";
  header[0].style.display = "none";
  document.getElementById("addItemsContainer");
  addItemsContainer.innerHTML = cardHeading;
  // change section and hidded all cards except selected
  section[0].style.visibility = "hidden";
  //  center the selected div
  selectedcard.classList.add("newTask2");
}

//clicking back btn come to main page
function unSelectCard() {
  //header changing
  header[1].style.display = "none";
  header[0].style.display = "flex";
  document.getElementById("addItemsContainer");
  addItemsContainer.innerHTML = "";
  //section changing to visible all cards
  section[0].style.visibility = "visible";
  //center the selected div
  console.log(section[0].childNodes.length);
  console.log(section[0].childNodes);
  // remove classlist ('newTask2') in all cards
  for (let i = 0; i < section[0].childNodes.length; i++) {
    section[0].childNodes[i].classList.remove("newTask2");
  }
}

//function of second page

let addItem2 = document.getElementById("addItem2");

addItem2.addEventListener("click", () => {
  popUp(addItem2, "Add new list", window.value); //window.value=selected card(newTask)
});
// if statusaddBtn=true then go to page no1 else no change
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
