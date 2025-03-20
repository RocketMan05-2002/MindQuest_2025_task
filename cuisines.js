// executing IIFE immidiately invoked function expression

(async function(){
    const response = await fetch('./data.json');
    const data= await response.json();
    console.log(data);
    let employees = data;
    let selectedEmployeeId = employees[0].id;
    let selectedEmployee = employees[0];

    const employeeList = document.querySelector('.employees__names--list');
    const employeeInfo = document.querySelector('.employees__single--info');


    //selected employee Logic and deleting
    employeeList.addEventListener("click",(e)=>{
        if(e.target.tagName==="SPAN" && selectedEmployeeId !== e.target.id){
            selectedEmployeeId = e.target.id;
            renderEmployees();
            renderSingleEmployee();
        }

        //deleting employee
        if(e.target.tagName === "I"){
            employees = employees.filter((emp)=>String(emp.id)!==e.target.parentNode.id);
            if(String(selectedEmployeeId===e.target.parentNode.id)){
                selectedEmployeeId = employees.length > 0 ? employees[0].id : -1;
                selectedEmployee = employees[0]|| {};
                renderSingleEmployee();
                renderEmployees();
            }
        }
    })

    // add employee Logic
    
    const createEmployee = document.querySelector('.createEmployee');
    const addEmployeeModal = document.querySelector('.addEmployee');
    const addEmployeeForm = document.querySelector('.addEmployee_create');

    createEmployee.addEventListener("click",()=>{
        addEmployeeModal.style.display = "flex";
    });
    addEmployeeModal.addEventListener("click",(e)=>{
        if(e.target.className === "addEmployee"){
            addEmployeeModal.style.display = "none";
        }
    })



    addEmployeeForm.addEventListener("submit",(e)=>{
        e.preventDefault();
        const formData = new FormData(addEmployeeForm);
        const values = [...formData.entries()];
        console.log(values);
        let empData = {};
        values.forEach((val)=>{
            empData[val[0]] = val[1]
        })
        empData.id = employees[employees.length-1].id +1;
        empData.age = new Date().getFullYear() - parseInt(empData.dob.slice(0,4),10);
        empData.imageUrl = empData.imageUrl || "https://cdn-icons-png.flaticon.com/512/0/93.png";
        employees.push(empData);
        renderEmployees();
        addEmployeeForm.reset();
        addEmployeeModal.style.display = "none";
    })


    // function to render the employees
    const renderEmployees= () =>{
        employeeList.innerHTML = ""
        employees.forEach((emp)=>{
            const employee = document.createElement("span");
            employee.classList.add("employee__names--item");
            if(parseInt(selectedEmployeeId,10)===emp.id){
                employee.classList.add("selected");
                selectedEmployee=emp;
            }
            employee.setAttribute("id",emp.id);
            employee.innerHTML = `${emp.name} <i class="deleteEmployee">❌</i>`;
            employeeList.append(employee);
        })
    }

    // render single employee
    const renderSingleEmployee = () =>{

        if(selectedEmployeeId === -1){
            employeeInfo.innerHTML = ""
            return;
        }

        employeeInfo.innerHTML = `
        <img src="${selectedEmployee.imageUrl}" />
        <span class="employees__single--heading">
        ${selectedEmployee.name}
        </span>
        <span>${selectedEmployee.description}</span>

        <span>Global Rating - ${selectedEmployee.globalRating}</span>
        <span>Popularity Index - ${selectedEmployee.popularityIndex}</span>
        <span>No. of Dishes - ${selectedEmployee.numberOfDishes}</span>
        `
    }

    if(selectedEmployee) renderSingleEmployee();
    renderEmployees();
})();