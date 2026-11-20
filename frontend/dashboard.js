
function displayStudents(students) {
  const listContainer = document.getElementById("students-list");
  listContainer.innerHTML = ""; 

  students.forEach((student) => {
    const studentHTML = `
    <div class="student-item">
        <div class="student-info">
            <h3>${student.name}</h3>
            <p>Email: ${student.email} | Course: ${student.course}</p>
        </div>
        
        <div class="action-buttons"> 
            <button class="btn-edit" onclick="editStudent('${student._id}','${student.name}','${student.email}','${student.course}', ${student.age})">Edit</button>
            <button class="btn-delete" onclick="deleteStudent('${student._id}')">Delete</button>
        </div>
    </div>
    `;
    listContainer.innerHTML += studentHTML;
  });
}

async function loadStudents() {
  const token = localStorage.getItem("token");
  if (!token) {
    window.location.href = "index.html";
    return;
  }

  try {
    const res = await fetch("http://localhost:5000/api/students", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();

       if (res.status === 401) {
    alert("Session expired. Please login again.");
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    window.location.href = 'index.html';
    return;
}
    if (res.ok) {
      displayStudents(data.students);
    } else {
      alert(data.error);
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

const studentForm = document.getElementById("student-form");
studentForm.addEventListener("submit", async (e) => {
 
  e.preventDefault();

  const token = localStorage.getItem("token"); 

  const name = document.getElementById("s-name").value;
  const email = document.getElementById("s-email").value;
  const age = document.getElementById("s-age").value;
  const course = document.getElementById("s-course").value;

  try {
    const res = await fetch("http://localhost:5000/api/students", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name, age, email, course }),
    });

    const data = await res.json();
       if (res.status === 401) {
    alert("Session expired. Please login again.");
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    window.location.href = 'index.html';
    return;
}
    if (res.ok) {
      alert("Student Added Successfully");
      studentForm.reset();
      loadStudents();
    } else {
      alert(data.error);
    }
  } catch (error) {
    console.error("Error:", error);
  }
});

//Edit Student....//

const Editform = document.getElementById("edit-form");
const editModel = document.getElementById("edit-modal");

function editStudent(id, name, email, course, age) {
  document.getElementById("edit-id").value = id;
  document.getElementById("edit-name").value = name;
  document.getElementById("edit-email").value = email;
  document.getElementById("edit-course").value = course;
  document.getElementById("edit-age").value = age;
  if (editModel) {
    editModel.style.display = "block";
  }
}

function Cancel_model() {
  if (editModel) {
    editModel.style.display = "none";
  }
}

Editform.addEventListener("submit", async (e) => {
  e.preventDefault();
  const token = localStorage.getItem("token");
  const newId = document.getElementById("edit-id").value;
  const newName = document.getElementById("edit-name").value;
  const newEmail = document.getElementById("edit-email").value;
  const newCourse = document.getElementById("edit-course").value;
  const newAge = document.getElementById("edit-age").value;

  try {
    const res = await fetch(`http://localhost:5000/api/students/${newId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({

        name: newName,
        email: newEmail,
        course: newCourse,
        age: Number(newAge),
      }),
    });

    const data = await res.json();
       if (res.status === 401) {
    alert("Session expired. Please login again.");
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    window.location.href = 'index.html';
    return;
}
    if (res.ok) {
      alert("Updated Successfully");
      Cancel_model();
      loadStudents();
    } else {
      alert(data.error);
    }
  } catch (error) {
    console.error("Upadte Error", error);
  }
});



async function deleteStudent(id) {
  const token = localStorage.getItem("token");

  try {
    const res = await fetch(`http://localhost:5000/api/students/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });



    const data = await res.json();
       if (res.status === 401) {
    alert("Session expired. Please login again.");
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    window.location.href = 'index.html';
    return;
}
    if (res.ok) {
      alert("Student Deleted");
      loadStudents();
    } else {
      alert(data.error);
    }
  } catch (error) {
    console.error("Delete Issuse", error);
  }
}



const logbtn = document.getElementById("logout-btn");
logbtn.addEventListener('click',()=>{
 localStorage.removeItem("token");
 alert("LogOut Successfully")
  
  window.location.href = "index.html";
  return;
})


const role = localStorage.getItem("role")
localStorage .getItem("token")
const mangebtn = document.getElementById('manage-teachers-btn')

if(role ==='admin' && mangebtn){
  mangebtn.style.display = 'inline-block';

  mangebtn.addEventListener('click',(req,res)=>{
window.location.href='teacher.html';
  })
}

loadStudents();
