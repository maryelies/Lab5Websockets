var url = "/";
var primus = Primus.connect(url, {
    reconnect: {
        max: Infinity // Number: The max delay before we try to reconnect.
      , min: 500 // Number: The minimum delay before we try reconnect.
      , retries: 10 // Number: How many times we should try to reconnect.
    }
  });

  // leest data
  primus.on('data', function(data){
    var pollQuestion = document.querySelector(".pollQuestion");
    var pollAnswer1 = document.querySelector(".pollAnswer1");
    var pollAnswer2 = document.querySelector(".pollAnswer2");
    
    if(pollQuestion){
        //console.log(data);
        pollQuestion.innerHTML=data.question;
        pollAnswer1.innerHTML=data.answer1;
        pollAnswer2.innerHTML=data.answer2;
    }
  });

  // schrijft data (na klik)
if(document.querySelector("#submit")){
  document.querySelector("#submit").addEventListener("click", function(e){
      console.log('submit');
    primus.write({ 
        question: document.getElementById("question").value,
        answer1: document.getElementById("answerone").value,
        answer2: document.getElementById("answertwo").value
    });
    e.preventDefault();
  });

}