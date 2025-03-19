const formContainer = document.getElementById("form-container");
const addInputBtn = document.getElementById("add-input");
const addTextareaBtn = document.getElementById("add-textarea");
const addCheckboxBtn = document.getElementById("add-checkbox");
const addSelectBtn = document.getElementById("add-select");
const saveFormBtn = document.getElementById("save-form");

let formElements = [{ 
    "id": "c0ac49c5-871e-4c72-a878-251de465e6b4", 
    "type": "input", 
    "label": "Sample Input", 
    "placeholder": "Sample placeholder" 
}, 
{ 
    "id": "146e69c2-1630-4a27-9d0b-f09e463a66e4", 
    "type": "select", 
    "label": "Sample Select", 
    "options": ["Sample Option", "Sample Option", "Sample Option"] 
}, 
{ 
    "id": "45002ecf-85cf-4852-bc46-529f94a758f5", 
    "type": "textarea", 
    "label": "Sample Textarea", 
    "placeholder": "Sample Placeholder" 
}, 
{ 
    "id": "680cff8d-c7f9-40be-8767-e3d6ba420952", 
    "type": "checkbox", 
    "label": "Sample Checkbox", 
}, ];

function renderForm(){

    formContainer.innerHTML = ""; 

    formElements.forEach((element, index) => {
        const div = document.createElement("div");
        div.className = "form-element";
        div.draggable = true;

        div.addEventListener("dragstart", (e) => dragStart(e, index));
        div.addEventListener("dragover", (e) => e.preventDefault());
        div.addEventListener("drop", (e) => drop(e, index));

        let field;
        if (element.type === "input") {
            field = `<input type="text" placeholder="${element.placeholder}">`;
        } else if (element.type === "textarea") {
            field = `<textarea placeholder="${element.placeholder}"></textarea>`;
        } else if (element.type === "checkbox") {
            field = `<label><input type= "checkbox"> ${element.label}</label>`;
        } else if (element.type === "select") {
            let options = element.options.map(opt => `<option>${opt}</option>`).join("");
            field = `<select>${options}</select>`;
        }
        const deleteBtn = document.createElement("button");
         deleteBtn.className = "delete-btn"; 
        deleteBtn.innerHTML = '<i class="fas fa-trash-alt"></i>'; 
        deleteBtn.addEventListener("click", () => removeElement(index));


        div.innerHTML = `<label contenteditable="true">${element.label}</label>${field}`;
        div.appendChild(deleteBtn); 
        formContainer.appendChild(div);
    });
}


function addElement(type) {
    const newElement = {
        id: Date.now().toString(),
        type,
        label: `New ${type.charAt(0).toUpperCase() + type.slice(1)}`,
        placeholder: type === "input" || type === "textarea" ? "Enter text..." : "",
        options: type === "select" ? ["Option 1", "Option 2"] : undefined
    };
    formElements.push(newElement);
    renderForm();
}


function removeElement(index) {
    formElements.splice(index, 1);
    renderForm();
}


let draggedIndex;
function dragStart(e, index) {
    draggedIndex = index;
}
function drop(e, index) {
    let temp = formElements[draggedIndex];
    formElements.splice(draggedIndex, 1);
    formElements.splice(index, 0, temp);
    renderForm();
}


function saveForm() {
    console.log(JSON.stringify(formElements, null, 2));
}


addInputBtn.addEventListener("click", () => addElement("input"));
addTextareaBtn.addEventListener("click", () => addElement("textarea"));
addCheckboxBtn.addEventListener("click", () => addElement("checkbox"));
addSelectBtn.addEventListener("click", () => addElement("select"));
saveFormBtn.addEventListener("click", saveForm);


renderForm();



