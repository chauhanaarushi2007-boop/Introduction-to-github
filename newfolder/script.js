// Sample lesson data (expand with real content)
const lessons = {
    spanish: [
        { title: "Greetings", content: "Hola means Hello. Practice: Say 'Hola' aloud." },
        { title: "Numbers", content: "Uno (1), Dos (2), Tres (3). Quiz time!" }
    ],
    french: [
        { title: "Greetings", content: "Bonjour means Hello." },
        { title: "Numbers", content: "Un (1), Deux (2), Trois (3)." }
    ],
    german: [
        { title: "Greetings", content: "Hallo means Hello." },
        { title: "Numbers", content: "Eins (1), Zwei (2), Drei (3)." }
    ]
};

const quizzes = {
    spanish: [
        { question: "What is 'Hello' in Spanish?", options: ["Hola", "Bonjour", "Hallo"], answer: "Hola" },
        { question: "What is 2 in Spanish?", options: ["Uno", "Dos", "Tres"], answer: "Dos" }
    ],
    french: [
        { question: "What is 'Hello' in French?", options: ["Hola", "Bonjour", "Hallo"], answer: "Bonjour" },
        { question: "What is 2 in French?", options: ["Un", "Deux", "Trois"], answer: "Deux" }
    ],
    german: [
        { question: "What is 'Hello' in German?", options: ["Hola", "Bonjour", "Hallo"], answer: "Hallo" },
        { question: "What is 2 in German?", options: ["Eins", "Zwei", "Drei"], answer: "Zwei" }
    ]
};

let currentLanguage = '';
let currentLessonIndex = 0;
let progress = 0;

// Navigation
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = e.target.getAttribute('href').substring(1);
        showSection(target);
    });
});

function showSection(sectionId) {
    document.querySelectorAll('section').forEach(sec => sec.classList.add('hidden'));
    document.getElementById(sectionId).classList.remove('hidden');
}

// Start learning
document.getElementById('start-btn').addEventListener('click', () => {
    currentLanguage = document.getElementById('language-select').value;
    currentLessonIndex = 0;
    loadLesson();
    showSection('lessons');
});

// Load lesson
function loadLesson() {
    const lesson = lessons[currentLanguage][currentLessonIndex];
    document.getElementById('lesson-content').innerHTML = `<h3>${lesson.title}</h3><p>${lesson.content}</p>`;
}

// Next lesson
document.getElementById('next-lesson').addEventListener('click', () => {
    currentLessonIndex++;
    progress++;
    localStorage.setItem('progress', progress);
    if (currentLessonIndex < lessons[currentLanguage].length) {
        loadLesson();
    } else {
        showSection('quiz');
        loadQuiz();
    }
});

// Load quiz
function loadQuiz() {
    const quiz = quizzes[currentLanguage];
    let quizHtml = '';
    quiz.forEach((q, i) => {
        quizHtml += `<div><p>${q.question}</p>`;
        q.options.forEach(opt => {
            quizHtml += `<input type="radio" name="q${i}" value="${opt}"> ${opt}<br>`;
        });
        quizHtml += '</div>';
    });
    document.getElementById('quiz-content').innerHTML = quizHtml;
}

// Submit quiz
document.getElementById('submit-quiz').addEventListener('click', () => {
    const quiz = quizzes[currentLanguage];
    let score = 0;
    quiz.forEach((q, i) => {
        const selected = document.querySelector(`input[name="q${i}"]:checked`);
        if (selected && selected.value === q.answer) score++;
    });
    document.getElementById('quiz-result').textContent = `You scored ${score}/${quiz.length}`;
    showSection('progress');
});

// Load progress
document.addEventListener('DOMContentLoaded', () => {
    progress = localStorage.getItem('progress') || 0;
    document.getElementById('progress-display').textContent = `Completed: ${progress} lessons`;
});