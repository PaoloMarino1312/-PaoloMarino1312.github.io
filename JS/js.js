class Question {
    constructor(text, choices, answer, theme) {
      this.text = text;
      this.choices = choices;
      this.answer = answer;
      this.theme = theme;
    }
    /**
     * 
     * @param {choice} choice 
     * @returns bool si le joueur à eu la bonne réponse
     */
    isCorrectAnswer(choice) {
      return this.answer === choice;
    }
  }
  let questions = [
    new Question("Dans « Home Alone », un film classique des Fêtes, comment s’appellent les cambrioleurs ?", ["Kevin\net\nFrank", "Rod\net\nPeter", "Harry\net\nMarvin", "Patt et Henry"], "Harry\net\nMarvin", "christmas"),
    new Question("Quel est le second sommet le plus haut du monde après l’Everest ?", ["Aconcagua", "K2", "Annapurna", "Makalu"], "K2", "snowy"),
    new Question("Ted Bundy, auteur d'au moins 32 meurtres s'en prenait à :", ["des retraitées isolées", "des jolies jeunes femmes", "des couples fraichement mariés", "des dirigeant de lobby pharmaceutique"], "des jolies jeunes femmes", "blood"),
    new Question("Quel est le plus grand lac d’Amérique du Nord ?", ["Le lac\nOntario", "Le lac\nMajeur", "Le lac\nHuron", "Le lac\nSupérieur"], "Le lac\nSupérieur", "water"),
    new Question("Dans quel jeu Mario a-t-il pu monter pour la première fois sur Yoshi ?", ["Super Mario 64", "Super Mario Bros.3", "Super Mario World", "Super Mario Bros."], "Super Mario World", "mario"),
    new Question("Combien de café Simon boit-il par jour ?", ["Il n'en boit pas", "1", "2", "Bieeeennn plus !!!"], "Bieeeennn plus !!!", "coffe"),
    new Question("Un trou noir se forme suite à : ", ["L'explosion d'un astéroïde", "L'explosion d'une étoile", "Un objet en hyper-vitess dans l'espace", "Une absance de lumière"], "L'explosion d'une étoile", "space"),
    new Question("Comment les abeilles indiquent-elles l’emplacement d’une fleur au reste de la colonie ?", ["En dansant", "En émettant des odeurs", "En émettant des bourdonements", "Toutes ces réponses"], "Toutes ces réponses", "bee's"),
    new Question("Comment appelle-t-on une zone sans arbres au milieu d'une forêt ?", ["Une claie", "Une clairière", "Une trouée", "Une coche"], "Une clairière", "forest"),
    new Question("Avec quel jeu de carte My Little Pony a-t-il fait un partenaria ?", ["Magic The Gathering", "YU-GI-OH", "Wankul", "Uno"], "Magic The Gathering", "pinky")
  ];
  
  class Quiz {
    constructor(questions) {
      this.score = 0;
      this.questions = questions;
      this.currentQuestionIndex = 0;
    }
    /**
     * Trouver la question actuel
     * 
     * @returns Question la question actuel
     * 
     */
    getCurrentQuestion() {
      return this.questions[this.currentQuestionIndex];
    }
    /**
     * Vérifier si le choix est la bonne réponse,
     * et augment le point et la question actuel
     * 
     * @param {answer} answer 
     */
    guess(answer) {
      if (this.getCurrentQuestion().isCorrectAnswer(answer)) {
        this.score++;
      }
      this.currentQuestionIndex++;
    }
    /**
     * Verifi si le groupe est terminer
     * 
     * @returns bool si le Quiz est terminer 
     */
    hasEnded() {
      return this.currentQuestionIndex >= this.questions.length;
    }
  }
  
  const display = {
    /**
     * Modifie le text d'un élément html
     * 
     * @param {string} id 
     * @param {string} text 
     */
    elementShown: function(id, text) {
      let element = document.getElementById(id);
      element.innerHTML = text;
    },
    /**
     * Affiche l'écran de fin
     */
    endQuiz: function() {
      endQuizHTML = `
        <h1>Quiz terminé !</h1>
        <h3> Votre score est de : ${quiz.score} / ${quiz.questions.length}</h3>`;
      this.elementShown("quiz", endQuizHTML);
    },
    /**
     * Affiche la question actuel
     */
    question: function() {
      this.elementShown("question", quiz.getCurrentQuestion().text);
    },
    /**
     * Affiche les choix,
     * gère le choix qui est choisi
     */
    choices: function() {
      let choices = quiz.getCurrentQuestion().choices;
      
      guessHandler = (id, guess) => {
        document.getElementById(id).onclick = function() {
          quiz.guess(guess);
          quizApp();
        }
      }
      // affichage choix + prise en compte du choix
      for(let i = 0; i < choices.length; i++) {
        this.elementShown("choice" + i, choices[i]);
        guessHandler("guess" + i, choices[i]);
      }
    },
    /**
     * Affiche le progrès (nb de question fait)
     */
    progress: function() {
      let currentQuestionNumber = quiz.currentQuestionIndex + 1;
      this.elementShown("progress", "Question " + currentQuestionNumber + " sur " + quiz.questions.length);
    },
  };

  /** 
  * La fonction changeTheme sert à verifier le thème actuel
  * puis de modifier le style des boutons, du text et du background
  * en fonction du thème
  **/
  function changeTheme() {
    let Actualtheme = quiz.getCurrentQuestion().theme;
    if (Actualtheme === "christmas")//Je verifie le thème
    {
      body.style.backgroundColor = "#d93016";//Je change la couleur de l'arrière plan

      text.forEach(element => {//Je fais une boucle pour passer dans toutes mes balises de text 
        element.style.color = "white";//Je change la couleur

      });
      
      buttons.forEach(element => {//Je fais une boucle pour passer dans tout mes boutons
        element.style.backgroundColor ="#ff292c";//Je change la couleur
        element.style.border = "4px solid #3c8d0d";//Je change ma bordure
        
      });
    }
    else if (Actualtheme === "snowy"){
      body.style.backgroundColor = "white";

      text.forEach(element => {
        element.style.color = "#6dd7fd";


        element.style.transitionDuration = "2000ms";
      });
      buttons.forEach(element => {
        element.style.backgroundColor ="#c8e7f2";
        element.style.border = "4px solid #6dd7fd";

        element.style.transitionDuration = "2000ms";
      });
    }
    else if (Actualtheme === "blood"){
      body.style.backgroundColor = "black";

      text.forEach(element => {
        element.style.color = "	#e60000";

        element.style.transitionDuration = "2000ms";
      });
      buttons.forEach(element => {
        element.style.backgroundColor ="#57504d";
        element.style.border = "4px inset #e60000";
        element.style.borderRadius = "0px";

        element.style.transitionDuration = "2000ms";
      });
    }
    else if (Actualtheme === "water"){
      body.style.backgroundColor = "#1ca3ec";

      text.forEach(element => {

        element.style.color = "aliceblue";

        element.style.transitionDuration = "2000ms";
      });
      buttons.forEach(element => {

        element.style.backgroundColor ="#ccf6ff";
        element.style.border = "4px solid #52dbfa";
        element.style.borderRadius = "50%";

        element.style.height = "210px";
        element.style.width = "min-content";
        element.style.whiteSpace = "pre-line"; 

        element.style.transitionDuration = "2000ms";
      });
    }
    else if (Actualtheme === "mario"){
      body.style.backgroundColor = "#279A18";

      text.forEach(element => {
        element.style.color = "black";

        element.style.transitionDuration = "2000ms";
      });
      

      buttons.forEach(element  => {
        if (element == buttons[0]){
          element.style.backgroundColor ="#FBD000";
        }
        else if (element == buttons[1]){
          element.style.backgroundColor ="#E52521";
        }
        else if (element == buttons[2]){
          element.style.backgroundColor ="#43B047";
        }
        else if (element == buttons[3]){
          element.style.backgroundColor ="#049CD8";
        }

        element.style.border = "4px solid black";
        element.style.borderRadius = "4px";

        element.style.height = "auto";
        element.style.width = "auto";

        element.style.transitionDuration = "2000ms";
      });
    }
    else if (Actualtheme === "coffe"){
      body.style.backgroundColor = "#964315";

      text.forEach(element => {
        element.style.color = "#3E1404";

        element.style.transitionDuration = "2000ms";
      });
      buttons.forEach(element => {
        element.style.backgroundColor ="#BB6B24";
        element.style.border = "4px solid #3E1404";

        element.style.transitionDuration = "2000ms";
      });
    }
    else if (Actualtheme === "space"){
      body.style.backgroundColor = "#1d1135";

      text.forEach(element => {
        element.style.color = "#7649fe";

        element.style.transitionDuration = "2000ms";
      });
      buttons.forEach(element => {
        element.style.backgroundColor ="#7b337d";
        element.style.border = "4px solid #430d4b";

        element.style.transitionDuration = "2000ms";
      });
    }
    else if (Actualtheme === "bee's"){
      body.style.backgroundColor = "#FCD615";

      text.forEach(element => {
        element.style.color = "#23212C";

        element.style.transitionDuration = "2000ms";
      });
      buttons.forEach(element => {
        element.style.backgroundColor ="#F3C622";
        element.style.border = "4px solid #23212C";

        element.style.transitionDuration = "2000ms";
      });
    }
    else if (Actualtheme === "forest"){
      body.style.backgroundColor = "#0f5132";

      text.forEach(element => {
        element.style.color = "black";

        element.style.transitionDuration = "2000ms";
      });
      buttons.forEach(element => {
        element.style.backgroundColor ="#7f4f24";
        element.style.border = "4px solid #633303";

        element.style.transitionDuration = "2000ms";
      });
    }
    else if (Actualtheme === "pinky"){
      body.style.backgroundColor = "#f0438c";

      text.forEach(element => {
        element.style.color = "#fefbb1";

        element.style.transitionDuration = "2000ms";
      });
      buttons.forEach(element => {
        element.style.backgroundColor ="#86d8f7";
        element.style.border = "4px solid #f9b8d2";

        element.style.transitionDuration = "2000ms";
      });
    }



  }

  let body = document.querySelector("body");
  body.style.transitionDuration = "2000ms";
  let buttons = document.querySelectorAll(".btn");
  let text = document.querySelectorAll(".text");


  // Game logic
  /**
   * La logique de jeu
   */
  quizApp = () => {
    if (quiz.hasEnded()) {
      display.endQuiz();
    } else {
      changeTheme();
      display.question();
      display.choices();
      display.progress();
    } 
  }

  
  // Create Quiz
  let quiz = new Quiz(questions);
  quizApp();


  