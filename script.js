'use strict';
const fName = document.getElementById('txtFirstName');
const lName = document.getElementById('txtLastName');
const address = document.getElementById('txtAddress');
const frmOsoba = document.getElementById('frmOsoba');
const tableBody = document.getElementById('tBody');
let selectedRow = null;
fName.focus();

//Delete Data
tableBody.addEventListener('click', function (e) {
  e.preventDefault();
  let target = e.target;
  clear();
  if (target.classList.contains('delete')) {
    target.parentElement.parentElement.parentElement.remove();
    Swal.fire({
      position: 'top',
      icon: 'error',
      title: 'Item Deleted Succesfully',
      showConfirmButton: false,
      timer: 1500,
    });
  }
  //Edit
  else if (target.classList.contains('edit')) {
    selectedRow = target.parentElement.parentElement.parentElement;
    fName.value = selectedRow.children[0].textContent;
    lName.value = selectedRow.children[1].textContent;
    address.value = selectedRow.children[2].textContent;
  }
});
//Clear fields
let clear = () => (fName.value = lName.value = address.value = '');
//Add Data
frmOsoba.addEventListener('submit', function (e) {
  e.preventDefault();

  //validation
  if (fName.value == '' || lName.value == '' || address.value == '') {
    Swal.fire({
      icon: 'error',
      title: 'Empty Input',
      text: 'Morate upisati sva polja',
    });
  } else {
    if (selectedRow == null) {
      const row = document.createElement('tr');
      row.innerHTML = `
          <td>${fName.value}</td>
          <td>${lName.value}</td>
          <td>${address.value}</td>
          <td>
            <div>
              <button class="btn btn-warning edit">Edit</button>
              <button class="btn btn-danger delete">
                Delete
              </button>
            </div>
          </td>
        
`;
      tableBody.appendChild(row);
      selectedRow = null;
      clear();
      fName.focus();
    } else {
      selectedRow.children[0].textContent = fName.value;
      selectedRow.children[1].textContent = lName.value;
      selectedRow.children[2].textContent = address.value;
      selectedRow = null;
      clear();
    }
  }
});
