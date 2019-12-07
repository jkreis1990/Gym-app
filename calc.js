window.onload = function() {
    var buttons = document.getElementById("buttons");
    var clear = document.getElementById("clear");
    var answer = document.getElementById("answer");

    let previous = "";
    let num1 = "";
    let operator = "";
    let num2 = "";
    
    buttons.addEventListener('click', function(e) {
        if (e.target.nodeName == "LI") {

            let ops = new RegExp(/[\+\-\*\/]/, "g");
            let nums = new RegExp(/[0-9]+/)
            var current = e.target.innerHTML;
            
            if (current == "=") {
                try {
                    answer.innerHTML = eval(num1 + operator + num2);
                } catch (e) {
                    answer.innerHTML = e.message;
                }
                num1 = answer.innerHTML;
            } else if (current == ".") {
                if (operator.match(ops)) {
                    if (!num2.includes(".")) {
                        num2 += current;
                        answer.innerHTML += current;
                    }
                } else if (!num1.includes(".")) {
                    num1 += current;
                    answer.innerHTML += current;
                }
            } else if (current.match(ops) && !previous.match(ops)) {
                if (operator.match(ops)) {
                    try {
                        answer.innerHTML = eval(num1 + operator + num2);
                    } catch (e) {
                        answer.innerHTML = e.message;
                    }
                    num1 = answer.innerHTML;
                    num2 = "";
                }
                operator = current;
            } else if (current.match(nums)) {
                if (previous == "=") {
                    num1 = current;
                    num2 = "";
                    operator = "";
                    answer.innerHTML = num1;
                } else {
                    if (!operator.match(ops)) {
                        num1 += current;
                        answer.innerHTML = num1;
                    } else {
                        num2 += current;
                        answer.innerHTML = num2;
                    }
                }
            }
            previous = current;
        }
    });

    clear.addEventListener('click', function() {
        answer.innerHTML = "";
        previous = "";
        num1 = "";
        operator = "";
        num2 = "";
    });
}