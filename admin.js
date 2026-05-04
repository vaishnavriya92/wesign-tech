
let contacts = JSON.parse(localStorage.getItem("contacts")) || [];

// LOAD DATA
function loadTable(data = contacts) {
  const table = document.getElementById("tableData");

  table.innerHTML = "";

  data.forEach((item, index) => {
    table.innerHTML += `
      <tr>
        <td>${index + 1}</td>
        <td contenteditable="true" onBlur="editData(${index}, 'name', this.innerText)">${item.name}</td>
        <td contenteditable="true" onBlur="editData(${index}, 'email', this.innerText)">${item.email}</td>
        <td contenteditable="true" onBlur="editData(${index}, 'message', this.innerText)">${item.message}</td>
        <td>
          <button class="btn btn-danger btn-sm" onclick="deleteData(${index})">Delete</button>
        </td>
      </tr>
    `;
  });
}

// DELETE
function deleteData(index) {
  if (confirm("Delete this record?")) {
    contacts.splice(index, 1);
    localStorage.setItem("contacts", JSON.stringify(contacts));
    loadTable();
  }
}

// EDIT
function editData(index, field, value) {
  contacts[index][field] = value;
  localStorage.setItem("contacts", JSON.stringify(contacts));
}

// SEARCH
document.getElementById("search").addEventListener("input", function () {
  const value = this.value.toLowerCase();

  const filtered = contacts.filter(item =>
    item.name.toLowerCase().includes(value) ||
    item.email.toLowerCase().includes(value)
  );

  loadTable(filtered);
});

// INITIAL LOAD
loadTable();
