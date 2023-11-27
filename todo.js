const form = document.querySelector("#myForm");
const input = document.querySelector("input");
const button = document.querySelector(".sending");
const removingBTn = document.querySelector(".removing");

const paarentUl = document.querySelector("ul");

const todos = JSON.parse(localStorage.getItem("todos")) || [];

function AddAnElement(inputValue) {
  if (inputValue.trim() === "") {
    return;
  }

  const newItem = {
    inputValue,
    class: "",
  };

  todos.push(newItem);

  localStorage.setItem("todos", JSON.stringify(todos));
  return newItem;
}

function createAnElement({ inputValue, class: checkedClass }) {
  if (inputValue.trim() === "") {
    return;
  }

  const checkedAttribute = checkedClass === "checked" ? "checked" : "";

  paarentUl.innerHTML += `<li class="nextli ${checkedAttribute}"> ${inputValue}
  
  <span>\u00d7</span>
  
  </li>`;
}

todos.forEach(createAnElement);

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const newInput = AddAnElement(input.value);

  createAnElement(newInput);

  input.value = "";
});



removingBTn.addEventListener("click", (e) => {
  e.preventDefault();
  localStorage.clear();
  paarentUl.innerHTML = "";
 
});

paarentUl.addEventListener("click", (e) => {
  if (e.target.tagName === "LI") {
    e.target.classList.toggle("checked");

    const clickedElement = e.target;
    const listItemElements = Array.from(paarentUl.children);
    const clickedIndex = listItemElements.indexOf(clickedElement);

    todos[clickedIndex].class = e.target.classList.contains("checked")
      ? "checked"
      : "";

    localStorage.setItem("todos", JSON.stringify(todos));
  } else if (e.target.tagName === "SPAN") {
    e.target.parentElement.remove();

    let showArr = e.target.parentElement.textContent;
    let newArr = showArr.split(" ");

    const valueToDelete = newArr.filter((item) => item.trim() !== "")[0].trim();

    const indexToDelete = todos.findIndex(
      (item) => item.inputValue.trim().split(" ")[0] === valueToDelete
    );

    if (indexToDelete !== -1) {
      
      todos.splice(indexToDelete, 1);

      localStorage.setItem("todos", JSON.stringify(todos));
    }
 
  }

});
