function displayTeacher(teachers) {
  const ul = document.getElementById("teacher-list");
  ul.innerHTML = "";
  if (teachers.length === 0) {
    ul.innerHTML = "<li>Teacher Not Found</li>";
  }

  const teacherHTML = teachers
    .map(
      (teacher) => `
        <li>
        <strong>${teacher.name}</strong>
        <button onclick="deleteTeacher('${teacher._id}')">Delete</button>
        </li>`,
    )
    .join("");

  ul.innerHTML = teacherHTML;
}

async function loadTeacher() {
  const token = localStorage.getItem("token");
  if (!token) {
    window.location.href = "index.html";
    return;
  }
  try {
    const res = await fetch("http://localhost:5000/api/users", {
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
      displayTeacher(data.users);
    } else {
      alert(data.error);
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

async function addTeacher() {
  const teacher = document.getElementById("teacher-form");
  teacher.addEventListener("submit", async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
      const res = await fetch("http://localhost:5000/api/users", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });
         if (res.status === 401) {
    alert("Session expired. Please login again.");
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    window.location.href = 'index.html';
    return;
}

      const data = await res.json();
   
      if (res.ok) {
        alert("Teacher Added successfully");
        teacher.reset();
        loadTeacher();
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.error("Error", error);
    }
  });
}

async function deleteTeacher(id) {
  const token = localStorage.getItem("token");
  try {
    const res = await fetch(`http://localhost:5000/api/users/${id}`, {
      method: "DELETE",
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
      alert("Teacher Delete Succesfully");
      loadTeacher();
      // displayTeacher();
    } else {
      alert(data.error);
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

async function displayStudents(stud){
  const ulsl = document.getElementById("student-list");
  ulsl.innerHTML ="";

  if(stud.length === 0){
    ulsl.innerHTML ="<tr><td colspan='5' style='text-align:center;'> Student not found</td></tr>";
    return;
  }

  const studentHTML = stud.map((student)=>`<tr>
  <td>${student.name} </td>
  <td> ${student.course}</td>
  <td>${student.email}</td>
  <td>${student.age}</td>
  <td>${student.userId? student.userId.name: 'Unassigned'}</td>
  </tr>`).join("");
  ulsl.innerHTML = studentHTML;
}

async function  loadstudent(){
  const token = localStorage.getItem("token");
  try {
    const res = await fetch('http://localhost:5000/api/students',{
      method:'GET',
      headers:{'Authorization': `Bearer ${token}`}
    });
    const data = await res.json();
    
if (res.status === 401) {
    alert("Session expired. Please login again.");
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    window.location.href = 'index.html';
    return;
}
    if(res.ok){
      displayStudents(data.students);
    }else{
      alert(data.error);
    }
    
  } catch (error) {
    console.error("Error Fetching students:",error);
    
  } 

}


  const btn = document.getElementById("cancel-btn")
  btn.addEventListener('click',()=>{
    localStorage.removeItem('token')
     localStorage.removeItem('role');
    alert("Logout Succesfully");
    window.location.href = 'index.html';
  })


loadstudent();
loadTeacher();
addTeacher();
