// Senhas para o líder e para os alunos
const leaderPassword = "wand123"; // Nova senha do líder de sala
const studentPassword = "aluno123"; // Senha dos alunos

// Variável para verificar o tipo de usuário
let isLeader = false;

// Função de Login
function login() {
    const password = document.getElementById("password").value;

    // Verifica a senha inserida
    if (password === leaderPassword) {
        isLeader = true;
        document.getElementById("login-section").style.display = "none";
        document.getElementById("input-section").style.display = "flex";
        alert("Bem-vindo, líder de sala!");
        loadActivities(); // Carrega as atividades após login bem-sucedido
    } else if (password === studentPassword) {
        isLeader = false;
        document.getElementById("login-section").style.display = "none";
        document.getElementById("input-section").style.display = "none";
        alert("Bem-vindo, aluno! Você pode visualizar as atividades.");
        loadActivities(); // Carrega as atividades após login bem-sucedido
    } else {
        alert("Senha incorreta. Tente novamente.");
    }
}

// Função para adicionar atividade (apenas para o líder)
function addActivity() {
    if (!isLeader) {
        alert("Apenas o líder pode adicionar atividades.");
        return;
    }

    const activityInput = document.getElementById("activity");
    const dueDateInput = document.getElementById("dueDate");
    
    const activityText = activityInput.value;
    const dueDate = dueDateInput.value;

    if (activityText === "" || dueDate === "") {
        alert("Por favor, preencha todos os campos!");
        return;
    }

    const activityItem = {
        text: activityText,
        dueDate: formatDate(dueDate)
    };

    // Salva a atividade no localStorage
    saveActivity(activityItem);

    // Adiciona a atividade na interface
    displayActivity(activityItem);

    // Limpa os campos de entrada
    activityInput.value = "";
    dueDateInput.value = "";
}

// Função para exibir uma atividade na lista
function displayActivity(activityItem) {
    const activityList = document.getElementById("activityList");

    const activityElement = document.createElement("li");
    activityElement.textContent = `${activityItem.text} - Data de entrega: ${activityItem.dueDate}`;

    // Adiciona o botão de exclusão apenas para o líder
    if (isLeader) {
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Remover";
        deleteButton.classList.add("delete-btn");
        deleteButton.onclick = function () {
            deleteActivity(activityElement, activityItem.text);
        };
        activityElement.appendChild(deleteButton);
    }

    activityList.appendChild(activityElement);
}

// Função para excluir atividade (apenas para o líder)
function deleteActivity(activityElement, activityText) {
    if (!isLeader) {
        alert("Apenas o líder pode remover atividades.");
        return;
    }

    // Remove a atividade do localStorage
    removeActivity(activityText);

    // Remove a atividade da interface
    activityElement.remove();
}

// Função para salvar uma atividade no localStorage
function saveActivity(activityItem) {
    const activities = JSON.parse(localStorage.getItem("activities")) || [];
    activities.push(activityItem);
    localStorage.setItem("activities", JSON.stringify(activities));
}

// Função para carregar atividades do localStorage e exibi-las na interface
function loadActivities() {
    const activityList = document.getElementById("activityList");
    activityList.innerHTML = ""; // Limpa a lista antes de carregar para evitar duplicações

    const activities = JSON.parse(localStorage.getItem("activities")) || [];
    activities.forEach(activityItem => displayActivity(activityItem));
}

// Função para remover uma atividade do localStorage
function removeActivity(activityText) {
    let activities = JSON.parse(localStorage.getItem("activities")) || [];
    activities = activities.filter(activity => activity.text !== activityText);
    localStorage.setItem("activities", JSON.stringify(activities));
}

// Função para formatar a data para o formato brasileiro (dia/mês/ano)
function formatDate(dateString) {
    const [year, month, day] = dateString.split("-"); // Separa ano, mês e dia
    return `${day}/${month}/${year}`; // Retorna no formato dd/mm/yyyy
}

// Carrega as atividades ao carregar a página
window.onload = loadActivities;
