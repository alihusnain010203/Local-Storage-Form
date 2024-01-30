const degree = document.getElementById("degree");
const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const email = document.getElementById("email");
const semester = document.getElementById("semester");
const table_body = document.getElementById("tbody");
const submitButton = document.getElementById("btn");
const booksDiv = document.getElementById("books");
const bookList = document.getElementById("bookList");
let number = 0;
const tableData = [];
const selectedBooks = [];



const bookData = {
  BSCS: ["MATH", "OS", "DB"],
  BSIT: ["STAT", "PHYSICS", "ENGLISH"],
  BSSE: ["OOP", "DSA", "Internet Programming"],
};
const rollNoGenerator = (degree, name, semester, Uniquenumber) => {
  if (Uniquenumber === undefined) {
    const roll = `${degree}-${name}-${semester}-${number}`;
    number++;
    return roll;
  } else {
    const roll = `${degree}-${name}-${semester}-${Uniquenumber}`;
    return roll;
  }
};
degree.addEventListener("change", () => {
  booksDiv.style.display = "block";
  bookList.innerHTML = "";

  console.log(bookData[degree.value]);
  bookData[degree.value].forEach((book) => {
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.name = "selectedBooks";
    checkbox.value = book;

    const label = document.createElement("label");
    label.textContent = book;
    label.appendChild(checkbox);

    bookList.appendChild(label);

    checkbox.addEventListener("click", () => {
      if (selectedBooks.includes(checkbox.value)) {
        let index0fBook = selectedBooks.indexOf(checkbox.value);
        selectedBooks.splice(index0fBook, 1);
        console.log(selectedBooks);
      } else {
        selectedBooks.push(checkbox.value);
        console.log(selectedBooks);
      }
    });
  });
});
const submitForm = () => {
  if (
    degree.value !== "" &&
    firstName.value !== "" &&
    lastName.value !== "" &&
    email.value !== "" &&
    semester.value !== ""
  ) {
    let user = {
      firstName: firstName.value,
      lastName: lastName.value,
      email: email.value,
      degree: degree.value,
      semester: semester.value,
      Uniquenumber: number,
      rollNo: rollNoGenerator(degree.value, firstName.value, semester.value),
      books: {
        selectedBooks,
      },
    };

    console.log(user);
    tableData.unshift(user);
    table_body.innerHTML = "";
    localStorage.setItem("tableData", JSON.stringify(tableData));

    alert(`Student Registered ${new Date().toLocaleString()}`);

    tableData.forEach((item, index) => {
      let row = document.createElement("tr");
      row.innerHTML = `
                <td>${item.firstName} ${item.lastName}</td>
                <td>${item.email}</td>
                <td>${item.rollNo}</td>
                <td>
                        <button class='delete-btn'>🧺Delete</button>
                        <button class='edit-btn'>📝Edit</button>
                        <button class='ok-btn'>✅OK</button>
                </td>`;

      row.querySelector(".delete-btn").addEventListener("click", () => {
        tableData.splice(index, 1);
        table_body.removeChild(row);
        localStorage.setItem("tableData", tableData);
      });

      row.querySelector(".edit-btn").addEventListener("click", () => {
        firstName.value = item.firstName;
        lastName.value = item.lastName;
        email.value = item.email;
        degree.value = item.degree;
        semester.value = item.semester;
        booksDiv.style.display = "block";
        bookList.querySelectorAll("input").values = item.books.selectedBooks;
      });

      row.querySelector(".ok-btn").addEventListener("click", () => {
        tableData[index].firstName = firstName.value;
        tableData[index].lastName = lastName.value;
        tableData[index].email = email.value;
        tableData[index].degree = degree.value;
        tableData[index].semester = semester.value;
        tableData[index].rollNo = rollNoGenerator(
          degree.value,
          firstName.value,
          semester.value,
          item.Uniquenumber
        );
        tableData[index].books = selectedBooks;

        localStorage.setItem("tableData", JSON.stringify(tableData));

        row.querySelector(
          "td:nth-child(1)"
        ).textContent = `${firstName.value} ${lastName.value}`;
        row.querySelector("td:nth-child(2)").textContent = email.value;
        row.querySelector("td:nth-child(3)").textContent =
          tableData[index].rollNo;
        firstName.value = "";
        lastName.value = "";
        email.value = "";
        degree.value = "";
        semester.value = "";
        degree.value = "";
        booksDiv.style.display = "none";
        bookList.querySelectorAll("input").values = "";
      });
      table_body.appendChild(row);
      degree.value = "";
      firstName.value = "";
      lastName.value = "";
      semester.value = "";
      email.value = "";
      booksDiv.style.display = "none";
    });
  } else {
    alert("Please Fill all details");
  }
};


submitButton.addEventListener("click", submitForm);
