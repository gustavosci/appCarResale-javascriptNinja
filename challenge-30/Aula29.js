(function(doc) {
  'use strict';


  /*
  Vamos estruturar um pequeno app utilizando módulos.
  Nosso APP vai ser um cadastro de carros. Vamos fazê-lo por partes.
  A primeira etapa vai ser o cadastro de veículos, de deverá funcionar da
  seguinte forma:
  - No início do arquivo, deverá ter as informações da sua empresa - nome e
  telefone (já vamos ver como isso vai ser feito)
  - Ao abrir a tela, ainda não teremos carros cadastrados. Então deverá ter
  um formulário para cadastro do carro, com os seguintes campos:
    - Imagem do carro (deverá aceitar uma URL)
    - Marca / Modelo
    - Ano
    - Placa
    - Cor
    - e um botão "Cadastrar"

  Logo abaixo do formulário, deverá ter uma tabela que irá mostrar todos os
  carros cadastrados. Ao clicar no botão de cadastrar, o novo carro deverá
  aparecer no final da tabela.

  Agora você precisa dar um nome para o seu app. Imagine que ele seja uma
  empresa que vende carros. Esse nosso app será só um catálogo, por enquanto.
  Dê um nome para a empresa e um telefone fictício, preechendo essas informações
  no arquivo company.json que já está criado.

  Essas informações devem ser adicionadas no HTML via Ajax.

  Parte técnica:
  Separe o nosso módulo de DOM criado nas últimas aulas em um arquivo DOM.js.

  E aqui nesse arquivo, faça a lógica para cadastrar os carros, em um módulo
  que será nomeado de "app".
  */

  function app(){
    var $spamCompanyData = new DOM('[data-js="spamCompanyData"');
    var $formCadastro = new DOM('[data-js="formCadastro"');
    var $tableResult = new DOM('[data-js="tableResult"');
    var $inputs = new DOM('input');
    var ajax = new XMLHttpRequest();

    $formCadastro.get()[0].addEventListener("submit", handleFormSubmit, false);
    setInfoCompany();

    function handleFormSubmit(eve){
      eve.preventDefault();

      var docFragment = doc.createDocumentFragment();
      var newTR = doc.createElement("tr");      
      $inputs.forEach(function(element){
        var newTH = appendColunOnTable(element.value);
        newTR.appendChild(newTH);  
      });
      docFragment.appendChild(newTR);
      $tableResult.get()[0].firstElementChild.appendChild(docFragment);

      clearForm();
    }

    function appendColunOnTable(newText){      
      var newTH = doc.createElement("th");
      if( !newText )
        newText = "-";
      var newContentTH = doc.createTextNode(newText);
      newTH.appendChild(newContentTH);
      return newTH;
    }

    function clearForm(){
      $inputs.forEach(function(element){
        element.value = "";
      });
    }

    function setInfoCompany(){
      var path = "json/company.json";
      try{
        getCompanyJson();
      }
      catch(e){
        updateDataCompanyError();
      }
    } 

    function getCompanyJson(){
      ajax.open("GET", path, true);
      ajax.send();  
      ajax.addEventListener("readystatechange", handleResponseAjax, false);

    }

    function handleResponseAjax(){
      if( isRequestOk() ){
        try{
          var dataResponse = JSON.parse(ajax.responseText);        
          updateDataCompanyOk(dataResponse);
        }
        catch(e){
          updateDataCompanyError();
        }      
      }
    }

    function isRequestOk(){
      return ajax.readyState === 4 && ajax.status === 200;
    }

    function updateDataCompanyOk(dataCompany){
      $spamCompanyData.get()[0].textContent = dataCompany.name + " - " + dataCompany.phone;
    }

    function updateDataCompanyError(){
      $spamCompanyData.get()[0].textContent = "Dados da empresa não encontrados";
    }
  }

  app();

})(document);
