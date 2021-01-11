var fs = require('fs');

var btnContainer = document.getElementById("operatorsDiv");
var btns = btnContainer.getElementsByClassName("btn");
var numA = ''
var numB = ''
var currentOperator =''
var result =''

for (var i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function() {
    currentOperator = document.getElementsByClassName("active");
    //currentOperator[0].className = currentOperator[0].className.replace(" active", "");
    
    if (currentOperator.length > 0) {
        currentOperator[0].className = currentOperator[0].className.replace(" active", "");
      }
    this.className += " active";
    showResult(currentOperator[0].id)
    //alert(current[0].value);
  //  switch(current[0].value){
  //      case'+':
   //       myFunction(); break;
  //  }
  });
}

function showResult(operator) {
  //var numA = parseFloat(document.getElementById("varA").value);
 numA = parseFloat(document.getElementById("varA").value);
 numB = parseFloat(document.getElementById("varB").value);
  switch(operator){
      case'plus':
      result=(numA+numB);break;
      case'minus':
      result=(numA-numB);break;
      case'multiply':
      result=(numA*numB);break;
      case'divide':
      result=(numA/numB);break;
      case'power':
      result=(Math.pow(numA,numB));break;
  }
  
  document.getElementById("result").value=result
  
}

//if uncheck
document.getElementById("saveBtn").addEventListener("click", function saveResult(){
    
  let saveData={
        numA:numA,
        numB:numB,
        operator:currentOperator[0].id,
        result:result
    }

    let data = JSON.stringify(saveData);
    
    if (document.getElementById("clouddriveCheckbox").checked == false){
    
      alert(data)
      fs.writeFile('lastestData.json', data, function (err) {
        if (err) throw err;
        console.log('Saved!');
    });
    } else{
        alert('test')
        fetch('localhost:3000/api/saveCalc', {
          method: 'PUT',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body:JSON.stringify(data)
        })
     
    }
})

document.getElementById("loadBtn").addEventListener("click", function loadResult(){
  if (document.getElementById("clouddriveCheckbox").checked == false){  
  fs.readFile('lastestData.json', (err, data) => {
        if (err) throw err;
        let lastestData = JSON.parse(data);
        //alert(lastestData.numA);
        document.getElementById("varA").value=lastestData.numA;
        document.getElementById("varB").value=lastestData.numB;

        switch(lastestData.operator) {
            case'plus':
            document.getElementById("plus").className+=" active";
            break;
            case'minus':
            document.getElementById("minus").className+=" active";
            break;
            case'multiply':
            document.getElementById("multiply").className+=" active";
            break;
            case'divide':
            document.getElementById("divide").className+=" active";
            break;
            case'power':
            document.getElementById("power").className+=" active";
            break;
        }
        
        document.getElementById("result").value=lastestData.result;
      });
      }else{
        fetch('http://localhost:3000/api/loadCalc')
        .then(function (response) {
         return response.json() 
          })
        .then(function (lastestData) {
          document.getElementById("varA").value=lastestData.numA;
          document.getElementById("varB").value=lastestData.numB;
  
          switch(lastestData.operator) {
              case'plus':
              document.getElementById("plus").className+=" active";
              break;
              case'minus':
              document.getElementById("minus").className+=" active";
              break;
              case'multiply':
              document.getElementById("multiply").className+=" active";
              break;
              case'divide':
              document.getElementById("divide").className+=" active";
              break;
              case'power':
              document.getElementById("power").className+=" active";
              break;
          }
          
          document.getElementById("result").value=lastestData.result;
})
      
  }
       
  
})





