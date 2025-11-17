document.querySelectorAll('.botao-pequeno').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const atividade = btn.closest('.atividade-item');
        if (!atividade) return;
        const detalhes = atividade.querySelector('.detalhes-atividade');
        if (!detalhes) return;
        detalhes.classList.toggle('hidden');
        const visivel = !detalhes.classList.contains('hidden');
        btn.textContent = visivel ? 'Esconder Detalhes' : 'Ver Detalhes';
    });
});

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

// Função para validar e atualizar estado do botão
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

// Chamar validação ao carregar
validarBotaoMarcar();

// Listener para todos os inputs e selects
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
        const popup = closeBtn.closest('.popup');
        closePopup(popup);
        
        // limpar campos do formulário
        const form = document.querySelector('.form-presenca');
        if (form) {
            form.querySelector('input[type="text"], input[type="number"]').value = '';
            form.querySelector('select').value = '';
            validarBotaoMarcar(); // revalidar após limpar
        }
    });
});

document.querySelectorAll('.popup').forEach(popup => {
    popup.addEventListener('click', e => {
        if (e.target === popup) {
            closePopup(popup);
            
            const form = document.querySelector('.form-presenca');
            if (form) {
                form.querySelector('input[type="text"], input[type="number"]').value = '';
                form.querySelector('select').value = '';
                validarBotaoMarcar(); // revalidar após limpar
            }
        }
    });
});

document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
        document.querySelectorAll('.popup:not(.hidden)').forEach(popup => {
            closePopup(popup);
            
            const form = document.querySelector('.form-presenca');
            if (form) {
                form.querySelector('input[type="text"], input[type="number"]').value = '';
                form.querySelector('select').value = '';
                validarBotaoMarcar(); // revalidar após limpar
            }
        });
    }
});