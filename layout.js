const sidebarProfessorHTML = `
    <aside class="sidebar">
        <nav class="menu-lateral">
            <ul>
                <li><a href="atividades.html">Atividades</a></li>
                <li><a href="turmasprofessor.html">Minhas Turmas</a></li>
                <li><a href="presencaprofessor.html">Gerenciar Presença</a></li>
                <li><a href="quizprofessor.html">Criar Quiz</a></li>
                <li><a href="index.html">Sair</a></li>
            </ul>
        </nav>
    </aside>
`;

const sidebarAlunoHTML = `
    <aside class="sidebar">
        <nav class="menu-lateral">
            <ul>
                <li><a href="atividades.html">Minhas Atividades</a></li>
                <li><a href="turmas.html">Minhas Turmas</a></li>
                <li><a href="historico.html">Meu Histórico de Presença</a></li>
                <li><a href="marcar-presenca.html">Marcar Presença</a></li>
                <li><a href="quiz.html">Realizar Quiz</a></li>
                <li><a href="index.html">Sair</a></li>
            </ul>
        </nav>
    </aside>
`;


function carregarLayout(userType) {
    const sidebarElement = document.getElementById('sidebar-container');
    const headerElement = document.getElementById('header-container'); 
    let htmlParaInjetar = '';
    
    if (userType === 'professor') {
        htmlParaInjetar = sidebarProfessorHTML;
    } else {
        htmlParaInjetar = sidebarAlunoHTML;
    }

    if (sidebarElement) {
        sidebarElement.innerHTML = htmlParaInjetar;
    }
    
}

document.addEventListener('DOMContentLoaded', () => {
    const userType = localStorage.getItem('userType');
    
    carregarLayout(userType);
    
    setAlunoNameFromEmail();

});
