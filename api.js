const apiUrl = 'https://vvri.pythonanywhere.com/api/courses';
const studentsApiUrl = 'https://vvri.pythonanywhere.com/api/students'; // Diákok API URL-je
const coursesApiUrl = 'https://vvri.pythonanywhere.com/api/courses'; // Kurzusok API URL-je

// Kurzusok betöltése
async function fetchCourses() {
    const response = await fetch(coursesApiUrl);
    const data = await response.json();
    return data;
}

// Diákok betöltése
async function fetchStudents() {
    const response = await fetch(studentsApiUrl);
    const data = await response.json();
    return data;
}

// Kurzus létrehozása
async function createCourse(course) {
    await fetch(coursesApiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(course),
    });
}

// Diák létrehozása
async function createStudent(student) {
    await fetch(studentsApiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(student),
    });
}

// Kurzus módosítása
async function updateCourse(course) {
    await fetch(`${coursesApiUrl}/${course.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(course),
    });
}

// Diák módosítása
async function updateStudent(student) {
    await fetch(`${studentsApiUrl}/${student.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(student),
    });
}

// Kurzus törlése
async function deleteCourse(courseId) {
    await fetch(`${coursesApiUrl}/${courseId}`, {
        method: 'DELETE',
    });
}

// Diák törlése
async function deleteStudent(studentId) {
    await fetch(`${studentsApiUrl}/${studentId}`, {
        method: 'DELETE',
    });
}
