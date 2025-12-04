
// Toggle de detalhes de atividade
document.querySelectorAll('.botao-pequeno').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const atividade = btn.closest('.atividade-item');
        if (!atividade) return;
        const detalhes = atividade.querySelector('.detalhes-atividade');
        if (!detalhes) return;
        detalhes.classList.toggle('hidden');
        const visivel = !detalhes.classList.contains('hidden');
        btn.textContent = visivel ? 'Esconder Detalhes' : 'Ver Detalhes' ;
    });
});

// Funções de controle de Popup
function openPopup(popup) {
    if (!popup) return;
    popup.classList.remove('hidden');
    const focusable = popup.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    if (focusable) focusable.focus();
}
function closePopup(popup) {
    if (!popup) return;
    popup.classList.add('hidden');
}

// Lógica de limpeza e revalidação do formulário de presença (usado nos listeners)
function cleanAndRevalidateForm() {
    const form = document.querySelector('.form-presenca');
    if (form) {
        // Tenta limpar o input (texto ou número) e o select
        const input = form.querySelector('input[type="text"], input[type="number"]');
        const select = form.querySelector('select');
        if (input) input.value = '';
        if (select) select.value = '';
        validarBotaoMarcar(); // revalidar após limpar
    }
}

// Função para validar e atualizar estado do botão (Presença)
function validarBotaoMarcar() {
    document.querySelectorAll('.botao-marcar').forEach(btn => {
        const form = btn.closest('.form-presenca');
        const input = form?.querySelector('input[type="text"], input[type="number"]');
        const select = form?.querySelector('select');

        if (input && select) {
            const temCodigo = input.value.trim().length > 0;
            const temDisciplina = select.value !== '';

            if (temCodigo && temDisciplina) {
                btn.disabled = false;
                btn.style.opacity = '1';
                btn.style.cursor = 'pointer';
            } else {
                btn.disabled = true;
                btn.style.opacity = '0.5';
                btn.style.cursor = 'not-allowed';
            }
        }
    });
}

// Listeners de validação e eventos de Popup
validarBotaoMarcar(); // Chamar validação ao carregar

document.querySelectorAll('.form-presenca input, .form-presenca select').forEach(campo => {
    campo.addEventListener('input', validarBotaoMarcar);
    campo.addEventListener('change', validarBotaoMarcar);
});

document.querySelectorAll('.botao-marcar').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        if (btn.disabled) return;
        const selector = btn.dataset.target || btn.getAttribute('href') || (btn.closest('a') && btn.closest('a').getAttribute('href'));
        if (!selector || selector === '#') return;
        const popup = document.querySelector(selector);
        openPopup(popup);
    });
});

document.querySelectorAll('.popup .close, .popup .fechar').forEach(closeBtn => {
    closeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        closePopup(closeBtn.closest('.popup'));
        cleanAndRevalidateForm(); // Limpa e revalida ao fechar
    });
});

document.querySelectorAll('.popup').forEach(popup => {
    popup.addEventListener('click', e => {
        if (e.target === popup) {
            closePopup(popup);
            cleanAndRevalidateForm(); // Limpa e revalida ao clicar fora
        }
    });
});

document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
        document.querySelectorAll('.popup:not(.hidden)').forEach(popup => {
            closePopup(popup);
            cleanAndRevalidateForm(); // Limpa e revalida ao pressionar ESC
        });
    }
});

/* QUIZ ALUNO */

function validarBotaoCodigo() {
    document.querySelectorAll('.botao-codigo').forEach(btn => {
        const form = btn.closest('.form-atividade');
        const input = form?.querySelector('input[type="text"], input[type="number"]');

        if (input) {
            const temCodigo = input.value.trim().length > 0;

            if (temCodigo) {
                btn.disabled = false;
                btn.style.opacity = '1';
                btn.style.cursor = 'pointer';
            } else {
                btn.disabled = true;
                btn.style.opacity = '0.5';
                btn.style.cursor = 'not-allowed';
            }
        }
    });
}

validarBotaoCodigo(); // Chamar validação ao carregar

document.querySelectorAll('.form-atividade input').forEach(campo => {
    campo.addEventListener('input', validarBotaoCodigo);
    campo.addEventListener('change', validarBotaoCodigo);
});

/* CAMPO QUIZ ALUNO */

document.querySelectorAll('.botao-codigo').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        if (btn.disabled) return;
        const form = btn.closest('.form-atividade');
        const input = form?.querySelector('input[type="text"], input[type="number"]');
        const codigo = input ? input.value.trim() : '';
        const campoQuiz = document.getElementById('campo-quiz');
        if (codigo && campoQuiz) {
            // Simula o carregamento do quiz
            campoQuiz.innerHTML = `
                <h3>Quiz Carregado!</h3>
                <p>Você inseriu o código: <strong>${codigo}</strong></p>
                <p>Aqui estaria o conteúdo do quiz para o aluno responder.</p>
            `;
        }
    });
});

// Simulação dos dados do quiz fornecidos pelo professor
// Na vida real, estes dados viriam de uma API após enviar o código
const QUIZ_DATA = {
    "HISTORIA101": {
        title: "Revolução Industrial",
        description: "Quiz sobre a primeira fase da Revolução Industrial.",
        questions: [
            {
                number: 1,
                text: "Qual a principal invenção que impulsionou a Revolução Industrial?",
                options: ["Motor a diesel", "Máquina a vapor", "Eletricidade"],
                name: "q1"
            },
            {
                number: 2,
                text: "Qual país é considerado o berço da Revolução Industrial?",
                options: ["França", "Alemanha", "Reino Unido"],
                name: "q2"
            }
        ]
    },
    // Você pode adicionar outros códigos e quizzes aqui
    "GEOGRAFIA202": {
        title: "Geografia dos Biomas",
        questions: [ /* ... */ ]
    }
};

/**
 * Função principal chamada ao clicar no botão "Confirmar código".
 */
function checkAndLoadQuiz() {
    const codeInput = document.getElementById('codigo-atividade');
    const quizCode = codeInput.value.trim().toUpperCase(); // Pega o valor e padroniza

    const quiz = QUIZ_DATA[quizCode];
    
    // 1. VERIFICAÇÃO DO CÓDIGO
    if (quiz) {
        // 2. CARREGAMENTO E RENDERIZAÇÃO
        renderQuiz(quiz);

        // Oculta a área de inserção do código e informações importantes
        document.querySelector('.conteudo-quiz > .form-atividade').style.display = 'none';
        document.querySelector('.conteudo-quiz > .info-presenca').style.display = 'none';
        
    } else {
        alert("🚨 Código do Quiz inválido ou expirado. Verifique com o professor.");
        // Opcional: Limpar o campo
        codeInput.value = ''; 
    }
}

/**
 * Renderiza (constrói) o formulário do quiz dinamicamente.
 * @param {object} quiz - O objeto do quiz a ser exibido.
 */
function renderQuiz(quiz) {
    const quizArea = document.getElementById('campo-quiz');
    let htmlContent = `
        <h3>${quiz.title}</h3>
        <p>${quiz.description || ""}</p>
        <form id="quiz-form">
    `;

    // Itera sobre as perguntas
    quiz.questions.forEach(q => {
        htmlContent += `
            <div class="question-block" style="margin-bottom: 20px; padding: 15px; border: 1px solid #ccc; border-radius: 5px;">
                <h4>${q.number}. ${q.text}</h4>
                <div class="options-group">
        `;

        // Itera sobre as opções de múltipla escolha
        q.options.forEach((option, index) => {
            const radioId = `${q.name}_${index}`; // Ex: q1_0, q1_1, etc.
            htmlContent += `
                <input type="radio" id="${radioId}" name="${q.name}" value="${option}" required>
                <label for="${radioId}">${option}</label><br>
            `;
        });

        htmlContent += `
                </div>
            </div>
        `;
    });

    // Adiciona o botão de envio
    htmlContent += `
        <button type="button" class="botao botao-enviar" onclick="submitQuiz()">
            Enviar Respostas
        </button>
        </form>
    `;

    // Insere o conteúdo dinâmico na área do quiz
    quizArea.innerHTML = htmlContent;
}

/**
 * Função para lidar com o envio das respostas.
 */
function submitQuiz() {
    // Nesta função, você deve coletar os dados do formulário
    const form = document.getElementById('quiz-form');
    const formData = new FormData(form);
    
    const results = {};
    let isComplete = true;

    // Converte os dados para um objeto para fácil visualização/envio
    for (const [key, value] of formData.entries()) {
        results[key] = value;
        // Se a chave começar com 'q' (pergunta), garantimos que foi respondida
        if (key.startsWith('q') && !value) {
            isComplete = false;
        }
    }

    if (!isComplete) {
        alert("⚠️ Por favor, responda a todas as perguntas antes de enviar.");
        return;
    }

    console.log("Respostas coletadas:", results);
    
    // Na vida real, você usaria 'fetch' para enviar 'results' para o servidor
    // Exemplo: fetch('/api/submit-quiz', { method: 'POST', body: JSON.stringify(results) });

    alert("✅ Quiz enviado com sucesso! Aguarde a correção do professor.");

    // Opcional: Recarregar a página ou voltar para a tela inicial
    // window.location.reload(); 
}

/* funçao para extrair email e alterar nome do aluno */

/*Converte email em nome legível */
function formatNameFromEmail(email) {
    if (typeof email !== 'string' || !email.includes('@')) return null;
    const local = email.split('@')[0].trim() || '';
    const cleaned = local.replace(/[._\-]+/g, ' ').replace(/\s+/g, ' ').trim().toLowerCase();
    const parts = cleaned.split(' ').filter(Boolean);
    return parts.map(p => p.charAt(0).toUpperCase() + p.slice(1)).join(' ');
}

/*Define o nome do aluno em vários elementos da página.*/
function setAlunoNameFromEmail() {
    const email = localStorage.getItem('userEmail');
    const tipo = localStorage.getItem('userType'); // aluno ou professor

    if (!email) {
        console.warn('E-mail do usuário não encontrado no localStorage. O nome não será exibido.');
        return;
    }

    const nome = formatNameFromEmail(email);
    if (!nome) return;

    let prefixo = "";
    if (tipo === "professor") {
        prefixo = "Professor: ";
    } else {
        prefixo = "Aluno: ";
    }

    document.querySelectorAll('.usuario-info span').forEach(span => {
        span.textContent = prefixo + nome;
    });

    document.querySelectorAll('.bem-vindo').forEach(el => {
        el.textContent = 'Bem-vindo, ' + nome.replace(prefixo, '');
    });

    document.querySelectorAll('.user-name').forEach(el => {
        el.textContent = nome;
    });
}

document.addEventListener('DOMContentLoaded', () => {
    // Tenta atualizar o nome no carregamento (útil para a dashboard.html)
    setAlunoNameFromEmail();

    const loginForm = document.querySelector('form');
    const emailInput = document.getElementById('email');

    if (loginForm && emailInput) {
        loginForm.addEventListener('submit', function(event) {
            const userEmail = emailInput.value.trim();

            if (userEmail) {
                localStorage.setItem('userEmail', userEmail);
                console.log('E-mail salvo no localStorage para persistência:', userEmail);
            } else {
                alert('Por favor, insira seu e-mail.');
                event.preventDefault();
            }
        });
    }
});



/* QUIZ PROFESSOR*/

    let perguntaCount = 0;

    /**
     * Adiciona um novo bloco de pergunta ao formulário.
     */
    function adicionarPergunta() {
        perguntaCount++;
        const form = document.getElementById('quiz-form');
        const perguntaId = `pergunta-${perguntaCount}`;

        const novoBloco = document.createElement('div');
        novoBloco.classList.add('quiz-card-pergunta');
        novoBloco.id = perguntaId;
        
        // --- INÍCIO DO HTML INJETADO ---
        novoBloco.innerHTML = `
            <hr style="margin-top: 0; margin-bottom: 25px; border-top: 2px solid #FFD700;">
            <h4 style="color: #2E86AB; font-weight: 900;">QUESTÃO ${perguntaCount}</h4>

            <div class="campo-form">
                <label for="pergunta-texto-${perguntaCount}">Texto da Questão (Pergunta Central)</label>
                <textarea id="pergunta-texto-${perguntaCount}" rows="3" placeholder="O que você quer perguntar?" required></textarea>
            </div>

            <div class="campo-form">
                <label for="pergunta-imagem-${perguntaCount}">Adicionar Mídia (Imagem/Vídeo - Opcional)</label>
                <input type="file" id="pergunta-imagem-${perguntaCount}" accept="image/*,video/*">
            </div>
            
            <div class="campo-form" style="max-width: 250px;">
                <label for="tempo-limite-${perguntaCount}">⏱️ Tempo Limite (Segundos)</label>
                <input type="number" id="tempo-limite-${perguntaCount}" value="30" min="5" max="300" required>
            </div>
            
            <h5 style="margin-bottom: 20px; color: #444; font-weight: 700;">Selecione a Opção Correta:</h5>
            
            <div class="opcoes-container" id="opcoes-container-${perguntaCount}">
                <div class="opcao-item" onclick="selecionarOpcao(this, event)">
                    <input type="radio" name="resposta-correta-${perguntaCount}" id="correta-1-${perguntaCount}" value="1" required>
                    <label for="correta-1-${perguntaCount}"> A</label>
                    <input type="text" placeholder="Digite o texto da Opção A" required>
                </div>
                <div class="opcao-item" onclick="selecionarOpcao(this, event)">
                    <input type="radio" name="resposta-correta-${perguntaCount}" id="correta-2-${perguntaCount}" value="2">
                    <label for="correta-2-${perguntaCount}"> B</label>
                    <input type="text" placeholder="Digite o texto da Opção B" required>
                </div>
                <div class="opcao-item" onclick="selecionarOpcao(this, event)">
                    <input type="radio" name="resposta-correta-${perguntaCount}" id="correta-3-${perguntaCount}" value="3">
                    <label for="correta-3-${perguntaCount}"> C</label>
                    <input type="text" placeholder="Digite o texto da Opção C">
                </div>
                <div class="opcao-item" onclick="selecionarOpcao(this, event)">
                    <input type="radio" name="resposta-correta-${perguntaCount}" id="correta-4-${perguntaCount}" value="4">
                    <label for="correta-4-${perguntaCount}"> D</label>
                    <input type="text" placeholder="Digite o texto da Opção D">
                </div>
            </div>
            
            <div class="botoes-acao">
                <button type="button" class="botao botao-remover" onclick="removerPergunta('${perguntaId}')">Excluir Questão ${perguntaCount}</button>
            </div>
        `;
        // --- FIM DO HTML INJETADO ---
        
        form.appendChild(novoBloco);
        // Faz o scroll para a nova pergunta
        novoBloco.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    /**
     * NOVA FUNÇÃO: Seleciona o rádio button quando o item pai é clicado.
     * @param {HTMLElement} elementoOpcao - O elemento .opcao-item que foi clicado.
     * @param {Event} event - O objeto Event do clique.
     */
    function selecionarOpcao(elementoOpcao, event) {
        const radio = elementoOpcao.querySelector('input[type="radio"]');
        const inputTexto = elementoOpcao.querySelector('input[type="text"]');
        
        // Se o clique for diretamente no INPUT DE TEXTO, não forçamos o rádio,
        // pois o usuário pode estar querendo editar o texto.
        const isClickedOnText = event.target === inputTexto;

        if (radio && !isClickedOnText) {
            radio.checked = true;
        }
    }


    /**
     * Remove um bloco de pergunta.
     */
    function removerPergunta(id) {
        const elemento = document.getElementById(id);
        if (elemento && confirm('Tem certeza que deseja remover esta questão?')) {
            elemento.remove();
        }
    }

    /**
     * Simula o salvamento dos dados do quiz.
     */
    function salvarQuiz() {
        const titulo = document.getElementById('titulo-quiz').value;
        const perguntas = document.querySelectorAll('.quiz-card-pergunta').length;

        if (!titulo || perguntas === 0) {
            alert("Por favor, preencha o título e adicione pelo menos uma questão.");
            return;
        }

        console.log("Coletando dados do quiz...");
        
        alert(`Quiz "${titulo}" pronto! Iniciando processo de publicação...`);
    }

    // Adiciona a primeira pergunta ao carregar a página
    document.addEventListener('DOMContentLoaded', () => {
         // Corrigir HTML injetado para incluir o onclick
         adicionarPergunta = (function(originalFunc) {
            return function() {
                originalFunc.apply(this, arguments);
                
                // Adiciona o listener de clique dinamicamente para garantir a funcionalidade
                document.querySelectorAll('.opcao-item:not([data-listener])').forEach(item => {
                    item.addEventListener('click', function(event) {
                        selecionarOpcao(this, event);
                    });
                    item.setAttribute('data-listener', 'true'); // Marca como já configurado
                });
            };
        })(adicionarPergunta);
        
        adicionarPergunta();
    });


    
    /* LAYOUT DINÂMICO DE SIDEBAR */

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

document.querySelector("form").addEventListener("submit", function (event) {
    event.preventDefault();

    const email = document.getElementById("email").value.trim();
    const tipo = document.getElementById("tipo-usuario").value;

    if (!email) {
        alert("Digite o email!");
        return;
    }

    localStorage.setItem("userEmail", email);
    localStorage.setItem("userType", tipo);

    if (tipo === "aluno") {
        window.location.href = "dashboard.html";
    } else if (tipo === "professor") {
        window.location.href = "dashboardprofessor.html";
    }
});
