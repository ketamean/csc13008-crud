document
  .querySelector("#editUserModal")
  .addEventListener("shown.bs.modal", () => {
    document.querySelector("#firstNameEdit").focus();
  });

document
  .querySelector("#addUserModal")
  .addEventListener("shown.bs.modal", () => {
    document.querySelector("#firstName").focus();
  });

document.querySelectorAll(".delete-btn").forEach((btnConfirm) => {
  btnConfirm.addEventListener("click", (e) => {
    const {username, id} = e.target.dataset
    const options = {
      title: "Are you sure?",
      type: "danger",
      btnOkText: "Yes",
      btnCancelText: "No",
      onConfirm: () => {
        console.log("Confirm");
        deleteUser(username, id)
      },
      onCancel: () => {
        console.log("Cancel");
      },
    };
    const {
      el,
      content,
      options: confirmedOptions,
    } = bs5dialog.confirm("Do you really want to delete this user?", options);
  });
});

function showEditUserModal(btn) {
  const { id, firstName, lastName,username, mobile, isAdmin } = btn.dataset
  document.querySelector('#idEdit').value = id
  document.querySelector('#firstNameEdit').value = firstName
  document.querySelector('#lastNameEdit').value = lastName
  document.querySelector('#usernameEdit').value = username
  document.querySelector('#mobileEdit').value = mobile
  document.querySelector('#isAdminEdit').checked = isAdmin ? true : false
}

const editUserForm = document.querySelector('#editUserForm')
editUserForm.addEventListener('submit', async (e) => {
  e.preventDefault()
  try {
    const formData = new FormData(editUserForm)
    const data = Object.fromEntries(formData.entries())
    const res = await fetch('/users', {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })

    console.log(res)
    if (res.status == 200) {
      return location.reload()
    }

    throw new Error(await res.text())
  } catch (err) {
    document.querySelector('#errorMessageEdit').innerText = err
    console.error(err)
  }
})

async function deleteUser(username, id) {
  try {
    const res = await fetch('/users', {
      method: 'delete',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({username, id})
    })

    if (res.status == 200) {
      return location.reload() 
    }
    throw new Error(await res.text())
  } catch (err) {
    console.error(err)
    const toast = new boostrap.Toast(document.querySelector('.toast'), {})
    document.querySelector('.toast-body').innerText = err.message
    toast.show()
  }
}