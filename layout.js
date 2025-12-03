// layout.js - VERSÃO CORRIGIDA PARA CONTROLE DE FUNÇÃO

// --- 1. MODELOS HTML DA SIDEBAR (SEPARADOS POR FUNÇÃO) ---

// layout.js - MODELOS SIMPLIFICADOS (SEM CLASSES DE VISIBILIDADE)

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
                <li><a href="index.html">Sair</a></li>
            </ul>
        </nav>
    </aside>
`;

// O restante do código de injeção (`carregarLayout`) permanece o mesmo,
// pois ele já está injetando o modelo HTML completo correto.

// --- 2. FUNÇÃO PRINCIPAL DE CARREGAMENTO DO LAYOUT ---

function carregarLayout(userType) {
    const sidebarElement = document.getElementById('sidebar-container');
    const headerElement = document.getElementById('header-container'); // (Se o header fosse carregado por aqui)
    
    // Define qual HTML injetar na sidebar
    let htmlParaInjetar = '';
    
    if (userType === 'professor') {
        htmlParaInjetar = sidebarProfessorHTML;
    } else { // Padrão para 'aluno' ou qualquer outro
        htmlParaInjetar = sidebarAlunoHTML;
    }

    if (sidebarElement) {
        sidebarElement.innerHTML = htmlParaInjetar;
    }
    
    // OBS: Seu HTML principal já tem o header estático, então não precisamos injetar o header aqui.
}

// --- 3. LÓGICA DE EXTRAÇÃO DE DADOS E INICIALIZAÇÃO ---

document.addEventListener('DOMContentLoaded', () => {
    // 1. Tenta obter o tipo de usuário do localStorage
    const userType = localStorage.getItem('userType'); // Deve ser 'aluno' ou 'professor'
    
    // 2. Chama a função de layout com o tipo de usuário correto
    // Se userType for null ou inválido, ele padroniza para Aluno (na função carregarLayout)
    carregarLayout(userType);
    
    // 3. Atualiza os nomes (essa função já estava correta, mas a chamamos aqui para garantir)
    setAlunoNameFromEmail();

    // 4. ATENÇÃO: Removemos a chamada fixa para carregarDashboardPorFuncao('professor');
    // Se você tiver conteúdos específicos na main (fora da sidebar), chame a função aqui:
    // carregarDashboardPorFuncao(userType);
});

// --- MANTENDO OUTRAS FUNÇÕES (Para evitar erros de referência) ---

// Você precisa manter a função setAlunoNameFromEmail e formatNameFromEmail
// em algum lugar do seu código (seja aqui ou no script.js)
// Como você não forneceu elas separadas, assumo que estão no script.js ou foram movidas.

// OBS: As demais funções de validação, popup e login permanecem no seu script.js.