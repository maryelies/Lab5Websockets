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
    var countone = document.querySelector(".countone");
    var counttwo = document.querySelector(".counttwo");

    console.log(data.count1);

    if(pollQuestion){
        //console.log(data);
        pollQuestion.innerHTML=data.question;
        pollAnswer1.innerHTML=data.answer1;
        pollAnswer2.innerHTML=data.answer2;
        countone.innerHTML=data.count1;
        counttwo.innerHTML=data.count2;
    }
  });

  // schrijft data (na klik)
if(document.querySelector("#submit")){
  document.querySelector("#submit").addEventListener("click", function(e){
      console.log('submit');
    primus.write({ 
        question: document.getElementById("question").value,
        answer1: document.getElementById("answerone").value,
        answer2: document.getElementById("answertwo").value,
        count1: 0,
        count2: 0
    });
    e.preventDefault();
  });

}

if(document.querySelector(".pollQuestion")){

    document.querySelector(".pollAnswer1").addEventListener("click", function(e){
      primus.write({ 
          count1: parseInt(document.querySelector(".countone").innerHTML)+1,
          count2: parseInt(document.querySelector(".counttwo").innerHTML),
          question: document.querySelector(".pollQuestion").innerHTML,
          answer1: document.querySelector(".pollAnswer1").innerHTML,
          answer2: document.querySelector(".pollAnswer2").innerHTML

      });
      e.preventDefault();
    });

    document.querySelector(".pollAnswer2").addEventListener("click", function(e){
      primus.write({ 
          count1: parseInt(document.querySelector(".countone").innerHTML),
          count2: parseInt(document.querySelector(".counttwo").innerHTML)+1,
          question: document.querySelector(".pollQuestion").innerHTML,
          answer1: document.querySelector(".pollAnswer1").innerHTML,
          answer2: document.querySelector(".pollAnswer2").innerHTML

      });
      e.preventDefault();
    });
}

//console.log(parseInt(document.querySelector(".countone").innerHTML)+1);