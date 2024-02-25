const loader=document.getElementById("loader");
const container=document.getElementById("container");

const URL= "https://opentdb.com/api.php?amount=10&difficulty=medium&type=multiple";
let formattedData=null;

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
   loader.style.display="none";
   container.style.display="block"
}

window.addEventListener("load",fetchData)