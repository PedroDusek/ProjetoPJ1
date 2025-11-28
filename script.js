
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
    if (!email) {
        console.warn('E-mail do usuário não encontrado no localStorage. O nome não será exibido.');
        return;
    }
    
    const nome = formatNameFromEmail(email);
    if (!nome) return;

    document.querySelectorAll('.usuario-info span').forEach(span => {
        span.textContent = 'Aluno: ' + nome;
    });

    document.querySelectorAll('.bem-vindo').forEach(el => {
        el.textContent = 'Bem-vindo, ' + nome;
    });

    document.querySelectorAll('.user-name').forEach(el => {
        el.textContent = nome;
    });
}

document.addEventListener('DOMContentLoaded', () => {
    // Tenta atualizar o nome no carregamento (útil para a dashboard.html)
    setAlunoNameFromEmail();

    // Configuração de SUBMIT do Formulário de Login (útil para a login.html)
    const loginForm = document.querySelector('form');
    const emailInput = document.getElementById('email');

    if (loginForm && emailInput) {
        loginForm.addEventListener('submit', function(event) {
            const userEmail = emailInput.value.trim();

            if (userEmail) {
                // Salva o e-mail no localStorage ANTES de enviar o usuário para a dashboard
                localStorage.setItem('userEmail', userEmail);
                console.log('E-mail salvo no localStorage para persistência:', userEmail);
            } else {
                // Se o campo for vazio, o preventDefault é chamado para impedir o redirecionamento
                alert('Por favor, insira seu e-mail.');
                event.preventDefault();
            }
        });
    }
});