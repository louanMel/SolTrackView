document.addEventListener("DOMContentLoaded", function() {
    var canvas = document.getElementById("curveCanvas");
    var context = canvas.getContext("2d");
    var infoDiv = document.getElementById("info");
    var data = []; // Les données de la courbe
    var cursorX = 0; // Position X du curseur
    var lastMouseMoveTime = 0; // Dernier temps de déplacement du curseur

    // Générer des données aléatoires jusqu'à 2 heures
    function generateData() {
        data = [];

        for (var i = 0; i <= 120; i += 5) { // Incrémenter de 5 minutes
            var value = Math.floor(Math.random() * 100); // Valeur aléatoire entre 0 et 99
            data.push([i, value]); // Ajouter la paire [temps, valeur] aux données
        }

        drawCurve();
    }

    // Dessiner la courbe
    function drawCurve() {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;

        context.clearRect(0, 0, canvas.width, canvas.height);

        context.beginPath();
        context.moveTo(0, canvas.height / 2);

        for (var i = 0; i < data.length; i++) {
            var x = (data[i][0] / 120) * canvas.width; // Convertir le temps en minutes en pourcentage de la largeur du canvas
            var y = (1 - data[i][1] / 100) * (canvas.height / 2); // Normaliser la valeur
            context.lineTo(x, y);
        }

        context.strokeStyle = "#00f";
        context.lineWidth = 2;
        context.stroke();
    }

    // Afficher les informations sur le curseur
    function showInfo() {
        var time = Math.round(cursorX / canvas.width * 120); // Convertir la position X du curseur en minutes
        var value = null;

        // Trouver la valeur associée au temps le plus proche dans les données
        for (var i = 0; i < data.length; i++) {
            if (data[i][0] >= time) {
                value = data[i][1];
                break;
            }
        }

        // Afficher les informations uniquement pour les intervalles de 5 minutes
        if (time % 5 === 0) {
            infoDiv.innerHTML = "Valeur à " + time + " minutes : " + value;
        } else {
            infoDiv.innerHTML = "";
        }
    }

    // Événement de déplacement du curseur
    canvas.addEventListener("mousemove", function(event) {
        var currentTime = new Date().getTime();

        // Vérifier si au moins 5 minutes se sont écoulées depuis le dernier déplacement du curseur
        if (currentTime - lastMouseMoveTime >= 5 * 60 * 1000) {
            var rect = canvas.getBoundingClientRect();
            cursorX = event.clientX - rect.left;
            drawCurve(); // Redessiner la courbe pour afficher le point
            showInfo();
            lastMouseMoveTime = currentTime; // Mettre à jour le dernier temps de déplacement du curseur
        }
    });

    // Générer des données initiales
    generateData();

    // Appeler la fonction generateData() toutes les 5 minutes
    setInterval(generateData, 5 * 60 * 1000); // 5 minutes en millisecondes
});
