(function(doc) {
  'use strict';

  function app(){
    var $spamCompanyData = new DOM('[data-js="spamCompanyData"');
    var $formCadastro = new DOM('[data-js="formCadastro"');
    var $tbodyResult = new DOM('[data-js="tbodyResult"');
    var $inputs = new DOM('input');
    var ajax = new XMLHttpRequest();
    var idCar = 0;

    $formCadastro.get().addEventListener("submit", handleFormSubmit, false);    
    setInfoCompany();

    function handleFormSubmit(eve){
      eve.preventDefault();
      idCar += 1;
      insertCarAtTable();      
      clearForm();
    }

    function insertCarAtTable(){
      var docFragment = doc.createDocumentFragment();
      var newTR = doc.createElement("tr");  
      newTR.setAttribute("id", idCar);   
      newTR.setAttribute("data-js", "trResult");      
      $inputs.forEach(function(element){
        newTR.appendChild(appendColumnOnTable(element));  
      });            ;
      newTR.appendChild(appendButtonRemove(idCar));        
      docFragment.appendChild(newTR);
      $tbodyResult.get().appendChild(docFragment);
      insertEventsButtonsRemove();
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

    function appendButtonRemove(idCar){
      var newTD = doc.createElement("td");
      var newButton = doc.createElement("button");
      newButton.setAttribute("data-js", "btnRemove");
      newButton.setAttribute("id", idCar);
      newButton.textContent = "Remover";
      newTD.appendChild(newButton);
      return newTD;
    }

    function insertEventsButtonsRemove(){
      var $buttonsRemove = new DOM('[data-js=btnRemove]');
      $buttonsRemove.off("click", handleButtonRemove);
      $buttonsRemove.on("click", handleButtonRemove);
    }

    function handleButtonRemove(eve){
      eve.preventDefault();    
      var id = eve.toElement.getAttribute("id");
      var $trResult = new DOM('[data-js="trResult"');
      $trResult.forEach(function(element){
        if(element.getAttribute("id") === id){
          $tbodyResult.get().removeChild(element);
          return
        }
      });                  
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
