let randomNumber = Math.floor(Math.random() * 10) + 1;

const guesses = document.querySelector('.guesses');
const lastResult = document.querySelector('.lastResult');
const lowOrHi = document.querySelector('.lowOrHi');
const guessSubmit = document.querySelector('.guessSubmit');
const guessField = document.querySelector('.guessField');

let maxGuesses = 3;
let maxNumber;
let difficulty = document.querySelector('#difficulty');
difficulty.addEventListener('change', setDifficulty);

let timerDuration; //Durée du timer
let timerInterval; //Intervalle pour le compte à rebours
let timeRemaining; //Temps restant
const timerDisplay = document.querySelector('.timerDisplay'); //Element pour afficher le timer
let remainingGuesses = document.querySelector(".remainingGuesses");
let guessCount = 1; //réinitialise le compteur des tentatives à 1. Indique que la première tentative du joueur commence. Ce compteur augmente à chaque tentative.
let resetButton;

guessField.focus();

// Sélectionne l'élément du paragraphe qui affiche la fourchette de nombres
const difficultyRange = document.getElementById('difficultyRange'); 

// Ajoute l'événement pour mettre à jour la difficulté et le texte
difficulty.addEventListener('change', setDifficulty);


//Fonction pour définir la difficulté
function setDifficulty() {
    let selectedDifficulty = difficulty.value;

    if (selectedDifficulty === 'easy') {
        maxGuesses = 3;
        maxNumber = 10;
        timerDuration = 30;
        guessField.setAttribute('min', '1'); //Définir le minimun
        guessField.setAttribute('max', '10'); //Définir le maximum
        difficultyRange.textContent = "Entrer un nombre entre 1 et 10";
    } else if (selectedDifficulty === 'medium') {
        maxGuesses = 2;
        maxNumber = 50;
        timerDuration = 20;
        guessField.setAttribute('min', '1');
        guessField.setAttribute('max', '50');
        difficultyRange.textContent = "Entrer un nombre entre 1 et 50";
    } else if (selectedDifficulty === 'hard') {
        maxGuesses = 1;
        maxNumber = 100;
        timerDuration = 10;
        guessField.setAttribute('min', '1');
        guessField.setAttribute('max', '100');
        difficultyRange.textContent = "Entrer un nombre entre 1 et 100";
    }
    startTimer(); //Démarre le timer en fonction du niveau choisi


    //Générer un nouveau nombre aléatoire en fonction de la difficulté
    randomNumber = Math.floor(Math.random() * maxNumber ) +1;

    //Réinitialiser l'affichage des essais restants
    remainingGuesses.textContent = "Nombre d'essais restants : " +maxGuesses; //Met à jour le texte de l'élément HTML qui affiche le nombre d'essais restants.
    guessCount = 1;
    lastResult.textContent = ''; //Efface le message indiquant si le joueur a gagné, perdu ... Les anciens ne restent pas affichés au début d'une nouvelle partie.
    lowOrHi.textContent = ''; //Réinitailise le texte, permet de commencer la partie sans indices précédents.
    guesses.textContent = ''; // Pareil
    guessField.value = ''; //Cette ligne vide le champ de saisie (input) où le joueur entre ses suppositions. Elle s'assure que le champ est prêt à recevoir une nouvelle valeur lors de la nouvelle tentative.
    guessField.focus(); //Cette ligne place le curseur automatiquement dans le champ de saisie (guessField), ce qui améliore l'expérience utilisateur en le rendant prêt à entrer une nouvelle valeur sans avoir à cliquer manuellement dans le champ.
    }

    function startTimer() {
        timeRemaining = timerDuration;
        timerDisplay.textContent = "Temps restant : " + timeRemaining + "s";

        //Efface tout le timer précédant
        if (timerInterval) {
            clearInterval(timerInterval);
        }

        //Démarre un nouveau compte à rebours
        timerInterval = setInterval(function () {
            timeRemaining--;
            timerDisplay.textContent = "Temps restant : " + timeRemaining + " s ";

            if (timeRemaining <=0) {
                clearInterval(timerInterval); //Arrête le timer
                lastResult.textContent = "Temps écoulé, vous avez perdu!";
                lastResult.style.backgroundColor = "transparent";
                setGameOver();
            }
        }, 1000) //Rèpète toutes les secondes
    }
    

//Fonction pour vérifier la supposition de l'utilisateur
    function checkGuess() {
        let userGuess = Number(guessField.value); //Convertit l'entrée utilisateur en nombre

        //Vérifier si le nombre est dans la plage autorisée
        if (userGuess < parseInt(guessField.min) || userGuess > parseInt(guessField.max)) {
            lastResult.textContent = "Veuillez entrer un nombre entre " + guessField.min + "et" + guessField.max;
            lastResult.style.backgroundColor = "transparent";
            return;
        }
        

        if (guessCount === 1) {guesses.textContent = "Propositions précédentes : ";
        }
            guesses.textContent += userGuess +" ";

        if (userGuess === randomNumber) {
            lastResult.textContent = " Bravo, vous avez trouvé le nombre !";
            lastResult.style.backgroundColor = "transparent";
            lowOrHi.textContent = "";
                setGameOver();
        } else if (guessCount >= maxGuesses) {
            lastResult.textContent = "!!! PERDU!!!";
            lastResult.style.backgroundColor = "transparent";
                setGameOver();
        } else {
            lastResult.textContent ="Faux!";
            lastResult.style.backgroundColor = "transparent";
        if (userGuess < randomNumber) {
            lowOrHi.textContent = "Le nombre saisi est trop petit !";
        } else if (userGuess > randomNumber) {
            lowOrHi.textContent = "Le nombre saisi est trop grand !";
            
        }
        }

        let remaining = maxGuesses - guessCount;
        console.log(maxGuesses);
        remainingGuesses.textContent = "Nombre d'essais restants : " + remaining; //Met à jour le nombre d'essais restants après chaque tentative.

        guessCount++;
        
        guessField.value ="";
        guessField.focus();


    }

    guessSubmit.addEventListener("click", checkGuess);

    //Fonction pour terminer le jeu et proposer un redémarrage
    function setGameOver() {
        guessField.disabled = true; //Désactive le champ de saisie (disabled = true; = le champ devient inactif, grisé et non cliquale)
        guessSubmit.disabled = true; //Empêche de soumettre de nouvelles tentatives 

        clearInterval(timerInterval); //Arrête le timer si la partie est terminée

        resetButton = document.createElement("button"); //Crée dynamiquement un nouveau bouton en utilisant la méthode document.createdElement("button"). Redémarre le jeu.
        resetButton.textContent = "Nouvelle partie"; //Définit le texte à afficher à l'intérieur du bouton créé.
        // Ajoute une classe CSS définie dans ton fichier
        resetButton.classList.add("reset-button");
        // Ajoute le bouton à la page
        document.body.appendChild(resetButton); //Cette ligne ajoute le bouton nouvellement créé à la page HTML, précisement dans l'élément body. Cela le rend visible et cliquable pour l'utilisateur.
        resetButton.addEventListener("click", resetGame); //Cette ligne ajoute un gestionnaire d'événement au bouton, lorsque l'utilisateur clique sur le bouton "Nouvelle partie", la fonction resetGame() est appelée.
    }

    //Fonction pour réinitialiser le jeu, afin de commencer une nouvelle partie.
    function resetGame() {
    guessCount = 1; // Réinitialise le compteur de tentatives, remet la variable guessCount à 1.

    // Réinitialiser la difficulté pour définir maxGuesses
    setDifficulty();

    let resetParas = document.querySelectorAll(".resultParas p"); //Sélectione tous les paragraphes (<p>) à l'intérieur de l'élément ayant la classe .resultParas.
    for (let i = 0; i < resetParas.length; i++) {
        resetParas[i].textContent =""; //Boucle for qui parcourt chaque paragraphe et efface leur contenu (textContent = ""), ce qui supprime tous les messages affichés lors de la partie précédente.
    }

    resetButton.parentNode.removeChild(resetButton);

    guessField.disabled = false;
    guessSubmit.disabled = false;
    guessField.value = "";
    guessField.focus();

    lastResult.style.backgroundColor ="white";

    //randomNumber = Math.floor(Math.random() *100) + 1;

}