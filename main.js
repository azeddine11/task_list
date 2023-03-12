// ************************* WITHOUT LOCAL STORAGE *********************************** //

// // select the elements
// let form = document.querySelector("#newtask_form");
// let input = document.querySelector("#the_task");
// let tasks = document.querySelector("#tasks");

// // The preventDefault() : method cancels the event if it is 
// // cancelable, meaning that the default action that belongs to the 
// // event will not occur. For example, this can be useful when: 
// // Clicking on a "Submit" button, prevent it from submitting a form.

// // add event submit to the form 
// form.addEventListener('submit', (e) => {
//     e.preventDefault();

//     let task = input.value;

//     // test if the input zone empty
//     if(!task) 
//     {
//         alert("First u need to type a task");
//         return;
//     }

//     // create a div element and give it a class
//     let task_el = document.createElement("div");
//     task_el.classList.add("task");

//     // create a div element and give it a class
//     let task_content_el = document.createElement("div");
//     task_content_el.classList.add("content");

//     task_el.appendChild(task_content_el);

//     // create input element and give it some properties
//     let task_input_el = document.createElement("input");
//     task_input_el.classList.add("text");
//     task_input_el.type = "text" ;
//     task_input_el.value = task;
//     task_input_el.setAttribute("readonly", "readonly");

//     // let the content as a child of input element
//     task_content_el.appendChild(task_input_el);
    
//     // create a div that will conytain the buttons
//     let task_actions_el = document.createElement("div");
//     task_actions_el.classList.add("actions");
    
//     // create the edit button
//     let task_edit_el = document.createElement("button");
//     task_edit_el.classList.add("edit");
//     task_edit_el.innerHTML = "Edit"

//     // create the delete button
//     let task_delete_el = document.createElement("button");
//     task_delete_el.classList.add("delete");
//     task_delete_el.innerHTML = "Delete"

//     // put the childrean in the parent
//     task_actions_el.appendChild(task_edit_el)
//     task_actions_el.appendChild(task_delete_el)

//     task_el.appendChild(task_actions_el)

//     tasks.appendChild(task_el);

//     input.value ="";


//     // Working on edit button 
//     task_edit_el.addEventListener('click',()=> {
//         if (task_edit_el.innerText.toLocaleLowerCase() == "edit"){
//             task_input_el.removeAttribute("readonly");
//             task_input_el.focus();
//             task_edit_el.innerText = "Save";

//         }else{
//             task_input_el.setAttribute("readonly","readonly");
//             task_edit_el.innerText = "Edit"
//         }
//     });

//     // Working on delete button
//     task_delete_el.addEventListener('click', ()=> {
//         tasks.removeChild(task_el);
//     });

// })







// ****************************** WITH LOCAL STORAGE *********************************** //


// select the elements
let form = document.querySelector("#newtask_form");
let input = document.querySelector("#the_task");
let tasks = document.querySelector("#tasks");

// load tasks from local storage
let taskList = JSON.parse(localStorage.getItem("tasks")) || [];

// function to save tasks to local storage
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(taskList));
}

// function to render tasks on the page
function renderTasks() {
  tasks.innerHTML = "";
  taskList.forEach((task) => {
    // create a div element and give it a class
    let task_el = document.createElement("div");
    task_el.classList.add("task");

    // create a div element and give it a class
    let task_content_el = document.createElement("div");
    task_content_el.classList.add("content");

    task_el.appendChild(task_content_el);

    // create input element and give it some properties
    let task_input_el = document.createElement("input");
    task_input_el.classList.add("text");
    task_input_el.type = "text";
    task_input_el.value = task;
    task_input_el.setAttribute("readonly", "readonly");

    // let the content as a child of input element
    task_content_el.appendChild(task_input_el);

    // create a div that will contain the buttons
    let task_actions_el = document.createElement("div");
    task_actions_el.classList.add("actions");

    // create the edit button
    let task_edit_el = document.createElement("button");
    task_edit_el.classList.add("edit");
    task_edit_el.innerHTML = "Edit";

    // create the delete button
    let task_delete_el = document.createElement("button");
    task_delete_el.classList.add("delete");
    task_delete_el.innerHTML = "Delete";

    // put the children in the parent
    task_actions_el.appendChild(task_edit_el);
    task_actions_el.appendChild(task_delete_el);

    task_el.appendChild(task_actions_el);

    tasks.appendChild(task_el);

    // Working on edit button
    task_edit_el.addEventListener("click", () => {
      if (task_edit_el.innerText.toLocaleLowerCase() == "edit") {
        task_input_el.removeAttribute("readonly");
        task_input_el.focus();
        task_edit_el.innerText = "Save";
      } else {
        task_input_el.setAttribute("readonly", "readonly");
        task_edit_el.innerText = "Edit";

        // update task in the list
        let index = taskList.indexOf(task);
        taskList[index] = task_input_el.value;
        saveTasks();
      }
    });

    // Working on delete button
    task_delete_el.addEventListener("click", () => {
      tasks.removeChild(task_el);

      // remove task from the list
      let index = taskList.indexOf(task);
      taskList.splice(index, 1);
      saveTasks();
    });
  });
}

// render tasks on page load
renderTasks();

// add event submit to the form
form.addEventListener("submit", (e) => {
  e.preventDefault();

  let task = input.value;

  // test if the input zone empty
  if (!task) {
    alert("First u need to type a task");
    return;
  }

  taskList.push(task);
  saveTasks();
  renderTasks();

  input.value = "";
});
// // The preventDefault() : method cancels the event if it is 
// // cancelable, meaning that the default action that belongs to the 
// // event will not occur. For example, this can be useful when: 
// // Clicking on a "Submit" button, prevent it from submitting a form.