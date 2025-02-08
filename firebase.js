
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getDatabase, ref, push, onValue, remove, set } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD72vMxTzuRcS8gv3DGAAqXuai9ONRT1oI",
    authDomain: "to-do-list-17c54.firebaseapp.com",
    projectId: "to-do-list-17c54",
    storageBucket: "to-do-list-17c54.firebasestorage.app",
    messagingSenderId: "167725168329",
    appId: "1:167725168329:web:a9ef499c0bcb5a6b3c7f18"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const createdatabase = getDatabase(app);
const collectionname = ref(createdatabase, "ToDo's");

let inputbox = document.getElementById("inputbox");
let list = document.getElementById("list");


inputbox.addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
        event.preventDefault();
        const todovalidation = inputbox.value;
        // alert(todovalidation);

        const creatingobject = {
            details: todovalidation
        }
        push(collectionname, creatingobject)
        cleardatas()
    }
})
function cleardatas() {
    inputbox.value = '';
}

onValue(collectionname, function (snapshot) {
    list.innerHTML = ""; // Clear the list before re-rendering
    if (snapshot.exists()) {
        let alldata = Object.entries(snapshot.val())
        console.log(alldata);
        alldata.forEach((dd, index) => {
            console.log(index, "index");
            console.log("dd", dd);
            const tododata = dd[1]
            console.log("tododata", tododata);

            let listitem = document.createElement("li");
            listitem.innerHTML = `${tododata.details}<i></i>`;

            listitem.addEventListener("click", function () {
                this.classList.toggle('done');
            })

            listitem.querySelector("i").addEventListener("click",
                () => {
                    listitem.remove();
                }
            )
            list.appendChild(listitem);
        })

    }
    else {

    }
})

// let filterInput = document.getElementById("filter");
// let listItems = Array.from(document.querySelectorAll("#list li"));

// filterInput.addEventListener("input", () => {
//     let filterValue = filterInput.value.toLowerCase();
    
//     listItems.forEach(item => {
//         item.style.display = listItems
//             .filter(li => li.textContent.toLowerCase().includes(filterValue))
//             .includes(item) ? "block" : "none";
//     });
// });



// let addItem = (inputbox)=>{
//     let listitem = document.createElement("li");
//     listitem.innerHTML = `${inputbox}<i></i>`;

//     listitem.addEventListener("click",function () {
//         this.classList.toggle('done');
//     })

//     listitem.querySelector("i").addEventListener("click",
//         ()=>{
//             listitem.remove();
//         }
//     )
//     list.appendChild(listitem);
// }