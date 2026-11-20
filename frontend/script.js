window.addEventListener('load',()=>{
    const emailinput = document.getElementById("email");
    const passwordinput = document.getElementById("password");

})

// // const registerbtn = document.getElementById('show-register');
// const loginSection = document.getElementById('login-section');
// const registersection = document.getElementById('register-section');
// const loginbtn = document.getElementById('show-login');


// registerbtn.addEventListener('click', () => {
//     loginSection.style.display = 'none';
//     registersection.style.display = 'block'
// })

// loginbtn.addEventListener('click', () => {
//     registersection.style.display = 'none';
//     loginSection.style.display = 'block';
// })
const loginfrom = document.getElementById('login-form');
loginfrom.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    console.log("Email:", email, "password:", password)

    try {
        const res = await fetch('http://localhost:5000/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'

            },
            body: JSON.stringify({ email, password })
        });

        const data = await res.json();
        if (res.ok) {
            alert("login Successfully")
            localStorage.setItem('token', data.token);
            localStorage.setItem('role',data.user.role)
            window.location.href = 'dashboard.html'
        } else {
            alert(data.error)
        }

    } catch (error) {
        console.error('Error:', error)
        alert("Server Issuse")

    }
});


// const registerForm = document.getElementById('register-form');
// registerForm.addEventListener('submit', async (e) => {
//     e.preventDefault();
//     const name = document.getElementById('reg-name').value;
//     const email = document.getElementById('reg-email').value;
//     const password = document.getElementById('reg-password').value;
//     try {
//         const res = await fetch('http://localhost:5000/api/auth/register', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({ name, email, password })

//         })

//         const data = await res.json();

//         if (res.ok) {
//             alert('register Successfully');
//             registersection.style.display = 'none';
//             loginSection.style.display = 'block';

//             registerForm.reset()
//         } else {
//             alert(data.error)
//         }


//     } catch (error) {
//         console.error('Error:', error)
//         alert('Server Error')

//     }

// })