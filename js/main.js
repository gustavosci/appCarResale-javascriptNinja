(function(doc) {
  'use strict';

  function app(){
    var $spamCompanyData = new DOM('[data-js="spamCompanyData"');
    var $formCadastro = new DOM('[data-js="formCadastro"');
    var $tableResult = new DOM('[data-js="tableResult"');
    var $inputs = new DOM('input');
    var ajax = new XMLHttpRequest();

    $formCadastro.get().addEventListener("submit", handleFormSubmit, false);
    setInfoCompany();

    function handleFormSubmit(eve){
      eve.preventDefault();

      var docFragment = doc.createDocumentFragment();
      var newTR = doc.createElement("tr");      
      $inputs.forEach(function(element){
        var newTD = appendColumnOnTable(element);
        newTR.appendChild(newTD);  
      });
      docFragment.appendChild(newTR);
      $tableResult.get().firstElementChild.appendChild(docFragment);

      clearForm();
    }

    function appendColumnOnTable(element){
        if( isElementPic(element) ){
          return appendPicColumnOnTable(element.value);
        } else {
          return appendTextColumnOnTable(element.value);  
        }        
    }

    function isElementPic(element){
      return element.getAttribute('data-js') === 'inputPic';
    }

    function appendPicColumnOnTable(srcPic){      
      if( !srcPic )
        return appendTextColumnOnTable("Imagem não encontrada");
      var newTD = doc.createElement("td");
      var newImg = doc.createElement("img");
      newImg.setAttribute("src", srcPic);
      newImg.setAttribute("width", "200");
      newTD.appendChild(newImg);
      return newTD;
    }

    function appendTextColumnOnTable(newText){      
      var newTD = doc.createElement("td");
      if( !newText )
        newText = "-";
      var newContentTD = doc.createTextNode(newText);
      newTD.appendChild(newContentTD);
      return newTD;
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
      $spamCompanyData.get().textContent = dataCompany.name + " - " + dataCompany.phone;
    }

    function updateDataCompanyError(){
      $spamCompanyData.get().textContent = "Dados da empresa não encontrados";
    }
  }

  app();

})(document);
