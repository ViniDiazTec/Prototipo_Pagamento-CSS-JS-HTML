document.addEventListener('DOMContentLoaded', function() {
    const informarDadosBtn = document.getElementById('informar-dados');
    const payBtn = document.getElementById('pay');
    const valorInput = document.getElementById('valor');
    const pixRadio = document.getElementById('pix');
    const creditCardRadio = document.getElementById('credit-card');
    const pixPanel = document.getElementById('pix-panel');
    const creditCardPanel = document.getElementById('credit-card-panel');
    const pixTotal = document.getElementById('pix-total');
    const creditCardTotal = document.getElementById('credit-card-total');
    const cardNumberInput = document.getElementById('card-number');
    const cardFlag = document.getElementById('card-flag');
    const invalidCardMsg = document.getElementById('invalid-card-msg');
    const installmentsSelect = document.getElementById('installments');
    const successMsg = document.getElementById('success-msg');


    // Função para atualizar os valores das parcelas
    function updateInstallmentValues(value) {
        const installmentOptions = installmentsSelect.options;
        for (let i = 0; i < installmentOptions.length; i++) {
            let installmentValue = parseFloat(value);
            if (i === 3) { // 4 parcelas
                installmentValue *= 1.05;
            } else if (i === 4) { // 5 parcelas
                installmentValue *= 1.10;
            }
            installmentOptions[i].text = `${i + 1}x R$ ${(installmentValue / (i + 1)).toFixed(2)}`;
        }
    }

    // Função para exibir o total do valor em função das parcelas
    function updateTotal() {
        const selectedInstallment = installmentsSelect.selectedIndex + 1;
        const baseValue = parseFloat(valorInput.value);
        let totalValue = baseValue;

        if (selectedInstallment === 4) { // 4 parcelas
            totalValue *= 1.05;
        } else if (selectedInstallment === 5) { // 5 parcelas
            totalValue *= 1.10;
        }

        creditCardTotal.innerText = `R$ ${totalValue.toFixed(2)}`;
    }

    // Função para validar os campos do cartão de crédito
    function validateCreditCardFields() {
        const cardNumber = cardNumberInput.value.trim();
        const holderName = document.getElementById('holder-name').value.trim();
        const securityCode = document.getElementById('security-code').value.trim();
        const expirationDate = document.getElementById('expiration-date').value.trim();

        if (cardNumber === '' || holderName === '' || securityCode === '' || expirationDate === '') {
            alert('Todos os campos do cartão de crédito devem ser preenchidos.');
            return false;
        }
        return true;
    }

    // Função para validar o campo de valor
    function validateValor() {
        const valor = parseFloat(valorInput.value);
        if (isNaN(valor) || valor <= 0) {
            alert('O campo valor deve ser preenchido corretamente.');
            return false;
        }
        return true;
    }

    
    // Comportamento ao clicar em "Informar dados"
    informarDadosBtn.addEventListener('click', function() {
        if (!validateValor()) return;

        const valor = parseFloat(valorInput.value);
        pixPanel.style.display = 'none';
        creditCardPanel.style.display = 'none';
        successMsg.style.display = 'none';

        if (pixRadio.checked) {
            pixPanel.style.display = 'block';
            pixTotal.innerText = `R$ ${(valor * 0.90).toFixed(2)}`; // 10% de desconto
        } else if (creditCardRadio.checked) {
            creditCardPanel.style.display = 'block';
            updateInstallmentValues(valor);
            updateTotal();
        }
    });

    // Comportamento ao digitar no campo Número do cartão
    cardNumberInput.addEventListener('input', function() {
        const cardNumber = cardNumberInput.value.trim();
        invalidCardMsg.style.display = 'none';
        cardFlag.style.display = 'none';

        if (cardNumber.startsWith('1234')) {
            cardFlag.style.display = 'inline-block';
            cardFlag.innerText = '💳'; // Simboliza o ícone do cartão (pode ser alterado para uma imagem real)
        } else if (cardNumber.startsWith('4321')) {
            cardFlag.style.display = 'inline-block';
            cardFlag.innerText = '🏦'; // Outro ícone do cartão
        } else if (cardNumber.length >= 4) {
            invalidCardMsg.style.display = 'block';
        }
    });

    // Atualizar o total ao selecionar parcelas
    installmentsSelect.addEventListener('change', updateTotal);

    // Comportamento ao clicar em "Pagar"
    payBtn.addEventListener('click', function() {
        if (!validateValor()) return;

        if (pixRadio.checked) {
            alert('Pagamento realizado com sucesso!');
            successMsg.style.display = 'block';
        } else if (creditCardRadio.checked) {
            // Validar campos do cartão de crédito
            if (validateCreditCardFields()) {
                alert('Pagamento realizado com sucesso!');
                successMsg.style.display = 'block';
            }
        }
    });



});
