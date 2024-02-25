const loader=document.getElementById("loader");
const container=document.getElementById("container");
const questionText=document.getElementById("question-text");
const answerList=document.querySelectorAll(".answer-text");


const URL= "https://opentdb.com/api.php?amount=10&difficulty=medium&type=multiple";

let formattedData=null;
let questionIndex=0;
let correctAnswer=null;

const formatData= questionData =>{
    const result = questionData.map((item)=>{
        const questionObj={question : item.question};
        const answers = [...item.incorrect_answers];
        const correctAnswerIndex=Math.floor(Math.random() * 4);
        answers.splice(correctAnswerIndex,0,item.correct_answer);
        questionObj.answers=answers;
        questionObj.correctAnswerIndex=correctAnswerIndex;
        return questionObj;
    })
    return result;
}



const fetchData=async ()=>{
    const res= await fetch(URL);
    const json=await res.json();
    console.log(json)
    formattedData=formatData(json.results)
    console.log(formattedData)
    start()
}

const start=()=>{
    showQuestion();
   loader.style.display="none";
   container.style.display="block"
}


const showQuestion=()=>{
    const{question,answers,correctAnswerIndex}=formattedData[questionIndex];
    correctAnswer=correctAnswerIndex;
    questionText.innerText=question;
    answerList.forEach((button,index)=>{
        button.innerText=answers[index];
    })

}
const checkAnswer=()=>{
    
}
window.addEventListener("load",fetchData)
answerList.forEach((button,index)=>{
    button.addEventListener("click",checkAnswer)
})