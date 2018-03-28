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
    if(pollQuestion){
        //console.log(data);
        pollQuestion.innerHTML=data.question;
    }
  });

  // schrijft data (na klik)
if(document.querySelector("#submit")){
  document.querySelector("#submit").addEventListener("click", function(e){
      console.log('submit');
    primus.write({ 
        question: document.getElementById("question").value,
        answer1: document.getElementById("answer1").value,
        answer2: document.getElementById("answer2").value
    });
    e.preventDefault();
  });

}