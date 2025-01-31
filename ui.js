let students = [];
let courses = [];

// HTML elem hivatkozások
const studentsList = document.getElementById('studentsList');
const coursesList = document.getElementById('coursesList');
const createStudentBtn = document.getElementById('createStudent');
const createCourseBtn = document.getElementById('createCourse');

// Kezdeti adat betöltése
async function initialize() {
    students = await fetchStudents(); // Diákok betöltése
    courses = await fetchCourses();   // Kurzusok betöltése
    displayStudents();
    displayCourses();
}

// Diákok megjelenítése
function displayStudents() {
    studentsList.innerHTML = '';
    students.forEach(student => {
        const studentDiv = document.createElement('div');
        studentDiv.classList.add('item');
        studentDiv.innerHTML = `
            ID: <span>${student.id}</span>
            Név: <span class="editable" data-type="student" data-id="${student.id}">${student.name}</span>
            <button class="edit-btn">Módosítás</button>
            <button class="delete-btn">Törlés</button>
        `;
        studentsList.appendChild(studentDiv);
        
        studentDiv.querySelector('.delete-btn').addEventListener('click', async () => {
            await deleteStudent(student.id);
            students = students.filter(s => s.id !== student.id);
            displayStudents();
        });
        
        studentDiv.querySelector('.edit-btn').addEventListener('click', () => {
            const newName = prompt("Új név a diáknak:", student.name);
            if (newName) {
                student.name = newName;
                updateStudent(student);
                displayStudents();
            }
        });
    });
}

// Kurzusok megjelenítése
function displayCourses() {
    coursesList.innerHTML = '';
    courses.forEach(course => {
        const courseDiv = document.createElement('div');
        courseDiv.classList.add('item');
        courseDiv.innerHTML = `
            ID: <span>${course.id}</span>
            Név: <span class="editable" data-type="course" data-id="${course.id}">${course.name}</span>
            <button class="edit-btn">Módosítás</button>
            <button class="delete-btn">Törlés</button>
        `;
        coursesList.appendChild(courseDiv);
        
        courseDiv.querySelector('.delete-btn').addEventListener('click', async () => {
            await deleteCourse(course.id);
            courses = courses.filter(c => c.id !== course.id);
            displayCourses();
        });
        
        courseDiv.querySelector('.edit-btn').addEventListener('click', () => {
            const newName = prompt("Új név a kurzusnak:", course.name);
            if (newName) {
                course.name = newName;
                updateCourse(course);
                displayCourses();
            }
        });
    });
}

// Kurzus és diák létrehozás
createStudentBtn.addEventListener('click', async () => {
    const newName = prompt("Adj meg egy új diák nevet:");
    if (newName) {
        const newStudent = { name: newName };
        await createStudent(newStudent);
        students.push(newStudent);
        displayStudents();
    }
});

createCourseBtn.addEventListener('click', async () => {
    const newName = prompt("Adj meg egy új kurzus nevet:");
    if (newName) {
        const newCourse = { name: newName };
        await createCourse(newCourse);
        courses.push(newCourse);
        displayCourses();
    }
});

// Kezdeti adat betöltése
initialize();
