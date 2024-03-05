// Obtener el nombre de usuario del localStorage
let savedName = localStorage.getItem('savedName');
// Verificar si el usuario está autenticado al cargar la página
window.addEventListener('load', function () {
    // Obtener el nombre de usuario del localStorage
    let savedName = localStorage.getItem('savedName');

    // Si no hay un nombre de usuario guardado, redirigir a la página de bienvenida
    if (!savedName) {
        window.location.href = '../welcome.html';
    } else {
        // Si hay un nombre guardado, establecerlo en la interfaz de usuario
        document.getElementById('userName').innerText = savedName;
    }
});


// Establecer el nombre de usuario en el elemento con el ID "userName"
document.getElementById('userName').textContent = savedName;
document.getElementById('userNameDisplay').textContent = savedName;

// Select Elements
let countSpan = document.querySelector(".count span");
let bullets = document.querySelector(".bullets");
let bulletsSpanContainer = document.querySelector(".bullets .spans");
let quizArea = document.querySelector(".quiz-area");
let answersArea = document.querySelector(".answers-area");
let submitButton = document.querySelector(".submit-button");
let resultsContainer = document.querySelector(".results");
let countdownElement = document.querySelector(".countdown");

// Set Options
let currentIndex = 0;
let rightAnswers = 0;
let countdownInterval;

// Al cargar la página
window.addEventListener('load', function () {
  // Obtener el nombre del usuario guardado en el localStorage
  let savedName = localStorage.getItem('savedName');

  // Si hay un nombre guardado, establecerlo en la interfaz de usuario
  if (savedName) {
      document.getElementById('userName').innerText = savedName;
  }
});

// Función para mostrar el ranking
function mostrarRanking() {
  // Obtener las puntuaciones del localStorage
  let scores = JSON.parse(localStorage.getItem('scores')) || [];

  // Ordenar las puntuaciones por puntaje descendente
  scores.sort((a, b) => b.score - a.score);

  // Mostrar el ranking en la consola
  console.log("Ranking:");
  scores.forEach((score, index) => {
      console.log(`${index + 1}. ${score.name}: ${score.score} puntos, Tiempo: ${score.time} segundos`);
  });
}

function getCategoryFromFileName(filename) {
  if (filename.includes("html_questions.json")) {
      return "HTML";
  } else if (filename.includes("css_questions.json")) {
      return "CSS";
  } else if (filename.includes("js_questions.json")) {
      return "JavaScript";
  } else {
      return "Unknown";
  }
}

function showCategory(category) {
  let categorySpan = document.querySelector(".category span");
  categorySpan.textContent = category;
}

function getQuestions() {
  let jsonFiles = ["html_questions.json", "css_questions.json", "js_questions.json"];
  let randomFile = jsonFiles[Math.floor(Math.random() * jsonFiles.length)];
  // Obtener la categoría del archivo JSON seleccionado
  let category = getCategoryFromFileName(randomFile);

  // Mostrar la categoría en el elemento HTML
  showCategory(category);
  let myRequest = new XMLHttpRequest();

  myRequest.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
          let questionsObject = JSON.parse(this.responseText);
          let qCount = questionsObject.length;

          // Create Bullets + Set Questions Count
          createBullets(qCount);

          // Add Question Data
          addQuestionData(questionsObject[currentIndex], qCount);

          // Start CountDown
          countdown(10, qCount);

          // Click On Submit
          submitButton.onclick = () => {
              // Get Right Answer
              let theRightAnswer = questionsObject[currentIndex].right_answer;

              // Increase Index
              currentIndex++;

              // Check The Answer
              checkAnswer(theRightAnswer, qCount);

              // Remove Previous Question
              quizArea.innerHTML = "";
              answersArea.innerHTML = "";

              // Add Question Data
              addQuestionData(questionsObject[currentIndex], qCount);

              // Handle Bullets Class
              handleBullets();

              // Start CountDown
              clearInterval(countdownInterval);
              countdown(10, qCount);

              // Show Results
              showResults(qCount);
          };
      }
  };

  myRequest.open("GET", randomFile, true);
  myRequest.send();
}

getQuestions();

function createBullets(num) {
  countSpan.innerHTML = num;

  // Create Spans
  for (let i = 0; i < num; i++) {
      // Create Bullet
      let theBullet = document.createElement("span");

      // Check If Its First Span
      if (i === 0) {
          theBullet.className = "on";
      }

      // Append Bullets To Main Bullet Container
      bulletsSpanContainer.appendChild(theBullet);
  }
}

function addQuestionData(obj, count) {
  if (currentIndex < count) {
      // Create H2 Question Title
      let questionTitle = document.createElement("h2");

      // Create Question Text
      let questionText = document.createTextNode(obj["title"]);

      // Append Text To H2
      questionTitle.appendChild(questionText);

      // Append The H2 To The Quiz Area
      quizArea.appendChild(questionTitle);

      // Create The Answers
      for (let i = 1; i <= 4; i++) {
          // Create Main Answer Div
          let mainDiv = document.createElement("div");

          // Add Class To Main Div
          mainDiv.className = "answer";

          // Create Radio Input
          let radioInput = document.createElement("input");

          // Add Type + Name + Id + Data-Attribute
          radioInput.name = "question";
          radioInput.type = "radio";
          radioInput.id = `answer_${i}`;
          radioInput.dataset.answer = obj[`answer_${i}`];

          // Make First Option Selected
          if (i === 1) {
              radioInput.checked = true;
          }

          // Create Label
          let theLabel = document.createElement("label");

          // Add For Attribute
          theLabel.htmlFor = `answer_${i}`;

          // Create Label Text
          let theLabelText = document.createTextNode(obj[`answer_${i}`]);

          // Add The Text To Label
          theLabel.appendChild(theLabelText);

          // Add Input + Label To Main Div
          mainDiv.appendChild(radioInput);
          mainDiv.appendChild(theLabel);

          // Append All Divs To Answers Area
          answersArea.appendChild(mainDiv);
      }
  }
}

function checkAnswer(rAnswer, count) {
  let answers = document.getElementsByName("question");
  let theChoosenAnswer;

  for (let i = 0; i < answers.length; i++) {
      if (answers[i].checked) {
          theChoosenAnswer = answers[i].dataset.answer;
      }
  }

  if (rAnswer === theChoosenAnswer) {
      rightAnswers++;
  }
}

function handleBullets() {
  let bulletsSpans = document.querySelectorAll(".bullets .spans span");
  let arrayOfSpans = Array.from(bulletsSpans);
  arrayOfSpans.forEach((span, index) => {
      if (currentIndex === index) {
          span.className = "on";
      }
  });
}

function showResults(count) {
  let theResults;
  if (currentIndex === count) {
      quizArea.remove();
      answersArea.remove();
      submitButton.remove();
      bullets.remove();

      if (rightAnswers > count / 2 && rightAnswers < count) {
          theResults = `<span class="good">Good</span>, ${rightAnswers} From ${count}`;
      } else if (rightAnswers === count) {
          theResults = `<span class="perfect">Perfect</span>, All Answers Is Good`;
      } else {
          theResults = `<span class="bad">Bad</span>, ${rightAnswers} From ${count}`;
      }

      // Guardar el número de respuestas correctas en localStorage
      localStorage.setItem('quizResults', rightAnswers);

      // Obtener el tiempo restante del contador
      let countdownTime = countdownElement.textContent.split(":");
      let remainingSeconds = parseInt(countdownTime[0]) * 60 + parseInt(countdownTime[1]);

      // Obtener el nombre del usuario
      let userName = document.getElementById('userName').innerText;

      // Crear un objeto con el puntaje y el tiempo
      let scoreData = {
          name: userName,
          score: rightAnswers,
          time: remainingSeconds
      };

      // Obtener las puntuaciones del localStorage
      let scores = JSON.parse(localStorage.getItem('scores')) || [];

      // Agregar el nuevo puntaje al array de puntuaciones
      scores.push(scoreData);

      // Guardar las puntuaciones actualizadas en el localStorage
      localStorage.setItem('scores', JSON.stringify(scores));

      // Mostrar los resultados en la interfaz de usuario
      resultsContainer.innerHTML = theResults;
      resultsContainer.style.padding = "10px";
      resultsContainer.style.backgroundColor = "white";
      resultsContainer.style.marginTop = "10px";
  }
}

function countdown(duration, count) {
  if (currentIndex < count) {
      let minutes, seconds;
      countdownInterval = setInterval(function () {
          minutes = parseInt(duration / 60);
          seconds = parseInt(duration % 60);

          minutes = minutes < 10 ? `0${minutes}` : minutes;
          seconds = seconds < 10 ? `0${seconds}` : seconds;

          countdownElement.innerHTML = `${minutes}:${seconds}`;

          if (--duration < 0) {
              clearInterval(countdownInterval);
              submitButton.click();
          }
      }, 1000);
  }
}

// Mostrar botón de logout
document.getElementById('logoutButton').style.display = 'inline-block';

// Evento de clic para el botón de logout
document.getElementById('logoutButton').addEventListener('click', function (event) {
  event.preventDefault(); // Evitar que el enlace redireccione

  // Limpiar datos de sesión almacenados en el localStorage
  localStorage.removeItem('savedName');
  localStorage.removeItem('rememberStatus');
  localStorage.removeItem('rememberedName');

  // Redireccionar a la página de inicio de sesión
  window.location.href = '../welcome.html';
});

// Mostrar el ranking al cargar la página
mostrarRanking();

// Función para mostrar estadísticas del juego
document.getElementById('showStatsButton').addEventListener('click', function() {
    mostrarEstadisticas();
});


document.getElementById('mostrarEstadisticasButton').addEventListener('click', function() {
    mostrarEstadisticas();
});


function mostrarEstadisticas() {
    // Obtener nombre del usuario
    let userName = localStorage.getItem('savedName');
    if (!userName) {
        alert("No hay usuario registrado.");
        return;
    }

    // Obtener puntuaciones del usuario
    let scores = JSON.parse(localStorage.getItem('scores')) || [];

    // Objeto para almacenar estadísticas por categoría
    let categoryStats = {
        'HTML': { puntos: 0, vecesJugadas: 0 },
        'CSS': { puntos: 0, vecesJugadas: 0 },
        'JavaScript': { puntos: 0, vecesJugadas: 0 }
    };

    // Calcular estadísticas por categoría
    scores.forEach(score => {
        // Si la categoría no está definida en el objeto, asignarla a HTML por defecto
        let category = score.category || 'HTML';
        categoryStats[category].vecesJugadas++;
        categoryStats[category].puntos += score.score;
    });

    // Mostrar modal
    let modal = document.getElementById('myModal');
    let modalUserName = document.getElementById('modalUserName');
    let modalUserScore = document.getElementById('modalUserScore');
    let modalTotalTime = document.getElementById('modalTotalTime');
    let modalRanking = document.getElementById('modalRanking');
    let modalCategoryStats = document.getElementById('modalCategoryStats');

    modalUserName.textContent = userName;
    
    // Calcular el puntaje total del usuario
    let totalScore = scores.reduce((acc, score) => acc + score.score, 0);
    modalUserScore.textContent = totalScore;

    // Calcular el tiempo total de juego del usuario (solo como ejemplo, necesitarías implementar esto)
    let totalTime = 0; // Aquí deberías calcular el tiempo total de juego
    modalTotalTime.textContent = totalTime;

    // Calcular el ranking del usuario (por ejemplo, la posición basada en el puntaje total)
    let ranking = "1"; // Aquí deberías calcular la posición del usuario en función del puntaje total
    modalRanking.textContent = ranking;

    // Mostrar estadísticas por categoría en el modal
    modalCategoryStats.innerHTML = '';
    Object.entries(categoryStats).forEach(([category, stats]) => {
        let categoryItem = document.createElement('p');
        categoryItem.textContent = `Categoría ${category}: Puntos ${stats.puntos}, Veces jugadas ${stats.vecesJugadas}`;
        modalCategoryStats.appendChild(categoryItem);
    });

    modal.style.display = "block";

    // Cerrar modal al hacer clic en la X
    let closeBtn = document.getElementsByClassName("close")[0];
    closeBtn.onclick = function() {
        modal.style.display = "none";
    }

    // Cerrar modal al hacer clic fuera del contenido del modal
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}
