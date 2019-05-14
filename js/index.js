var tContainer;
var context;

var length = 100;
var angel = 100;//25 * 180 / Math.PI;

const axiom = "F";
var sentence = axiom;
const rules = [{
  input: "F",
  output: "FF+[+F-F-F]-[-F+F+F]"  
}]; 

render = () => {
    var canvas = document.getElementById("canvas");
    context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);

    context.resetTransform();
    context.translate(canvas.width/2, canvas.height);

    context.strokeStyle = "red";

    for (let i = 0; i < sentence.length; i++) {
        const char = sentence.charAt(i);

        switch (char) {
            case "F":
                context.beginPath();
                context.moveTo(0, 0);
                context.lineTo(0, -length);
                context.stroke();
                context.translate(0, -length);
                break;
            case "+":
                context.rotate(angel);
                break;
            case "-":
                context.rotate(-angel);
                break;
            case "[":
                context.save();
                break;
            case "]":
                context.restore();
                break;
        
        }
    }
}

generate = () => {
    var newSentence = "";
    for(var i = 0; i < sentence.length; i++) {
        var char = sentence.charAt(i);
        var anyRuleAppaied = false;

        rules.forEach(rule => {
            if (char == rule.input) {
                newSentence += rule.output;
                anyRuleAppaied = true;
            }
        });    
        if (!anyRuleAppaied) 
            newSentence += char;
    };
    sentence = newSentence;

    length *= 0.5;
    render();

    var newElement = document.createElement("h1");
    newElement.innerText = sentence;
    document.body.appendChild(newElement);
}

setup = () => {
    tContainer = document.getElementById("textContainer");
    tContainer.innerHTML = axiom;
}

setup();
render();