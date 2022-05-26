$.getJSON('https://servicodados.ibge.gov.br/api/v1/localidades/estados/', {id: 10, }, function (json) {

  var options = '<option value="">selecione um estado</option>';
		
  let estadosOrdenados = json.sort(function(a,b) {
      if(a.nome < b.nome) return -1;
      if(a.nome > b.nome) return 1;
      return 0;
  });	

  for (var i = 0; i < estadosOrdenados.length; i++) {
    options += '<option data-id="' + estadosOrdenados[i].id + '" value="' + estadosOrdenados[i].nome + '" >' + estadosOrdenados[i].nome + '</option>';
  }

  $("select[name='mauticform[estado]']").html(options);

});


    $("select[name='mauticform[estado]']").change(function () {

        if ($(this).val()) {
            $.getJSON('https://servicodados.ibge.gov.br/api/v1/localidades/estados/'+$(this).find("option:selected").attr('data-id')+'/municipios', {id: $(this).find("option:selected").attr('data-id')}, function (json) {

                var options = '<option value="">selecione uma cidade</option>';
				
				let cidadesOrdenados = json.sort(function(a,b) {
					if(a.nome < b.nome) return -1;
					if(a.nome > b.nome) return 1;
					return 0;
				});
				
                for (var i = 0; i < cidadesOrdenados.length; i++) {

                    options += '<option value="' + cidadesOrdenados[i].nome + '" >' + cidadesOrdenados[i].nome + '</option>';

                }

                $("select[name='mauticform[cidade]']").html(options);

            });

        } else {

            $("select[name='mauticform[cidade]']").html('<option value="">–  –</option>');

        }

});
	
var behavior = function(val)
    {
        return val.replace(/\D/g, '').length === 11 ? '(00) 00000-0000' : '(00) 0000-00009';
    },
    options = {
        onKeyPress: function(val, e, field, options)
        {
            field.mask(behavior.apply(
            {}, arguments), options);
        }
    };
$('input[name="mauticform[whatsapp11]"]').mask(behavior, options);
