const quizData = [
  {
    question: "TRANG PHỤC TRUYỀN THỐNG CỦA NHẬT BẢN LÀ GÌ?",
    a: "Hanbok",
    b: "Kimono",
    c: "Sari",
    d: "Cheongsam",
    correct: "b",
  },
  {
    question: "THÀNH PHỐ NÀO LÀ CỦA NHẬT BẢN?",
    a: "Hồ Chí Minh",
    b: "New York",
    c: "Tokyo",
    d: "Seoul",
    correct: "c",
  },
  {
    question: "HOA NÀO ĐƯỢC COI LÀ BIỂU TƯỢNG CỦA NHẬT BẢN?",
    a: "Sakura",
    b: "Ume",
    c: "Momo",
    d: "Kiku",
    correct: "a",
  },
  {
    question: "NGHỆ THUẬT GẤP GIẤY TRUYỀN THỐNG CỦA NHẬT BẢN LÀ GÌ?",
    a: "Ikebana",
    b: "Ukiyo-e",
    c: "Origami",
    d: "Kirigami",
    correct: "c",
  },
  {
    question: "ĐƠN VỊ TIỀN TỆ CỦA NHẬT BẢN LÀ GÌ?",
    a: "Won",
    b: "Yuan",
    c: "Yen",
    d: "Ringgit",
    correct: "c",
  },
];

const quizContainer = document.getElementById("quiz-box");
const resultBox = document.getElementById("result-box");
const scoreText = document.getElementById("score-text");

let currentQuiz = 0;
let score = 0;

function loadQuiz() {
  if (!quizContainer) return;

  quizContainer.innerHTML = "";
  resultBox.style.display = "none";

  quizData.forEach((data, index) => {
    const questionEl = document.createElement("div");
    questionEl.classList.add("question-block");
    questionEl.style.marginBottom = "2rem";
    questionEl.innerHTML = `
            <h3 style="margin-bottom: 1rem;">${index + 1}. ${data.question}</h3>
            <button class="option-btn" onclick="selectOption(${index}, 'a', this)">A. ${data.a}</button>
            <button class="option-btn" onclick="selectOption(${index}, 'b', this)">B. ${data.b}</button>
            <button class="option-btn" onclick="selectOption(${index}, 'c', this)">C. ${data.c}</button>
            <button class="option-btn" onclick="selectOption(${index}, 'd', this)">D. ${data.d}</button>
        `;
    quizContainer.appendChild(questionEl);
  });

  const submitBtn = document.createElement("button");
  submitBtn.id = "submit-btn";
  submitBtn.className = "btn btn-primary";
  submitBtn.innerText = "Nộp Bài";
  submitBtn.onclick = submitQuiz;
  quizContainer.appendChild(submitBtn);
}

const userAnswers = {};

window.selectOption = function (questionIndex, answer, btnElement) {
  userAnswers[questionIndex] = answer;

  const parent = btnElement.parentElement;
  const buttons = parent.querySelectorAll(".option-btn");
  buttons.forEach((btn) => btn.classList.remove("selected"));
  btnElement.classList.add("selected");
};

function submitQuiz() {
  score = 0;
  let answeredAll = true;

  quizData.forEach((data, index) => {
    if (!userAnswers[index]) {
      answeredAll = false;
    } else if (userAnswers[index] === data.correct) {
      score++;
    }
  });

  if (!answeredAll) {
    if (
      !confirm(
        "Bạn chưa trả lời hết tất cả các câu hỏi. Bạn có muốn nộp bài không?",
      )
    ) {
      return;
    }
  }

  quizContainer.style.display = "none";
  resultBox.style.display = "block";

  let message = "";
  if (score === quizData.length)
    message = "Xuất sắc! Bạn là chuyên gia về Nhật Bản.";
  else if (score > quizData.length / 2)
    message = "Tuyệt vời! Bạn có kiến thức khá về Nhật Bản.";
  else message = "Cần cố gắng hơn nữa để hiểu biết về Nhật Bản.";

  scoreText.innerHTML = `Bạn đã trả lời đúng ${score}/${quizData.length} câu hỏi.<br><br>${message}`;
}
document.addEventListener("DOMContentLoaded", loadQuiz);
