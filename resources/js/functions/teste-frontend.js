$(document).ready(function () {
    const $form = $('#form-frontend');
    const $inputText = $form.find('.input-text');
    const $formName = $form.find('[name="name"]');
    const $formEmail = $form.find('[name="email"]');
    const $formPhone = $form.find('[name="phone"]');
    const $formSubject = $form.find('[name="subject"]');
    const $formMessage = $form.find('[name="message"]');
    const $formResponse = $form.find('.form-response');
    const formData = JSON.parse(sessionStorage.getItem('formData'));

    /*
        Validação de formulário
    */
    $form.form({
        on: 'blur',
        fields: {
            text: {
                identifier : 'name',
                rules: [
                    {
                        type   : 'empty',
                        prompt : 'Informe seu Nome'
                    }
                ]
            },
            email: {
                identifier : 'email',
                rules: [
                    {
                        type   : 'email',
                        prompt : 'Informe seu E-mail'
                    }
                ]
            },
            phone: {
                identifier : 'phone',
                rules: [{
                    type: 'regExp',
                    value: /(^|\()?\s*(\d{2})\s*(\s|\))*(9?\d{4})(\s|-)?(\d{4})($|\n)/u,
                    prompt: 'Telefone inválido. (Ex: (16) 3645-9857 ou (16) 98764-5316)'
                }]
            },
            subject: {
                identifier : 'subject',
                rules: [
                    {
                        type   : 'empty',
                        prompt : 'Informe o Assunto'
                    }
                ]
            },
            message: {
                identifier : 'message',
                rules: [
                    {
                        type   : 'empty',
                        prompt : 'Digite uma Mensagem'
                    }
                ]
            },
        },
        onSuccess: function() {
            let msgSuccess = formData ? 'Dados atualizados com sucesso!' : 'Dados gravados com sucesso!';

            sessionStorage.setItem(
                'formData', 
                JSON.stringify({
                    name: $formName.val().trim(),
                    email: $formEmail.val().trim(),
                    phone: $formPhone.val().trim(),
                    subject: $formSubject.val().trim(),
                    message: $formMessage.val().trim(),
                })
            );

            $formResponse.html('<span class="is-success">' + msgSuccess + '</span>');
            return false;
        },
        onFailure: function() {
            $formResponse.html('<span class="is-error">Erro ao gravar dados, preencha os campos corretamente!</span>');
            return false;
        }
    });

    /*
        Atualiza valores nos campos do formulário automaticamente se existir na sessionStorage
    */
    if(formData){
        $formName.val(formData.name);
        $formEmail.val(formData.email);
        $formPhone.val(formData.phone);
        $formSubject.val(formData.subject);
        $formMessage.val(formData.message);

        $('#input-value-name').html($formName.val().trim());
        $('#input-value-email').html($formEmail.val().trim());
        $('#input-value-phone').html($formPhone.val().trim());
        $('#input-value-subject').html($formSubject.val().trim());
        $('#input-value-message').html($formMessage.val().trim());
    }

    /*
        Mostra valores dos campos ao lado do formulário a medida que são preenchidos
    */
    $inputText.on('change keyup', function(){        
        $('#input-value-name').html($formName.val().trim());
        $('#input-value-email').html($formEmail.val().trim());
        $('#input-value-phone').html($formPhone.val().trim());
        $('#input-value-subject').html($formSubject.val().trim());
        $('#input-value-message').html($formMessage.val().trim());
    });
});