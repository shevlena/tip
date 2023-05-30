// доступ до елементів введення
const billAmountInput = document.getElementById('bill-amount'); // доступ до поточної суми чеку
const numberOfPeopleinput = document.getElementById('number-of-people'); // доступ до кількості осіб
const customInput = document.getElementById('custom'); // доступ до відсотка з input
const label = document.getElementById('labelcustom'); // доступ до лейбла з користувацьким відсотком


// доступ до елементів виведення
const tipAmountText = document.getElementById('tip-amount'); // доступ до суми загальних чайових
const totalPerPersonText = document.getElementById('total-per-person'); // доступ до суми чеку з чайовими на одну особу
let calculateButton = document.getElementById('calculate'); // доступ до кнопки calculate
let resetButton = document.getElementById('reset'); // доступ до кнопки reset
const answerCalculate = document.getElementById('not-calculate'); // доступ до поля, в якому буде показана некоректність


// функція, яка дозволяє активувати кнопку за певних умов
function correct() {
    const originalBillAmount = Number(billAmountInput.value); //поточна сума чеку

    if ((billAmountInput.value === '') || (originalBillAmount <= 0)) { // якщо поле для введення суми порожнє або сума <= 0
        calculateButton.disabled = true; // кнопка calculate неактивна
        calculateButton.style.backgroundColor = '#00474B'; // зміна кольору calculate на неактивний

    } else {
        calculateButton.disabled = false; // кнопка calculate активна
        calculateButton.style.backgroundColor = '#9fe8df'; // зміна кольору calculate на активний
    }
}
billAmountInput.onkeyup = correct; // запуск функції активації кнопки




// функція, яка змінює радіокнопку на текстовий input
customInput.onclick = function () {
    if (customInput.getAttribute("type") === "radio") { // якщо атрибут у input з користувацьким відсотком type = radio
        customInput.setAttribute("type", "text"); // заміна type = radio на type = text
        customInput.classList.add('active'); // додавання нового класу з іншими стилями
        customInput.placeholder = 'Custom'; // додавання placeholderу
        label.style.display = 'none'; // приховування label
         customInput.focus();
    }
}



// функція необхідних обчислень по кліку кнопки
calculateButton.addEventListener('click', function () {
    billAmountInput.onclick = function () { // по кліку на полі введення суми чеку
        resetButton.disabled = true; // дезактивується кнопка reset
        resetButton.style.backgroundColor = '#0D686D'; // змінюється колір reset на неактивний
    }

    originalBillAmount = Number(billAmountInput.value); //поточна сума чеку
    const numberOfPeople = Number(numberOfPeopleinput.value); // кількість осіб

    // перевірка коректності введення кількості осіб
    if ((numberOfPeople === 0) || (numberOfPeople == '')) { // якщо кількість осіб = 0 або поле є пустим
        answerCalculate.innerText = `Can't be zero`; // то виводиться повідомлення про некоректність
        answerCalculate.style.color = '#e17457'; // встановлюється колір повідомлення
        numberOfPeopleinput.style.outline = '2px solid #e17052'; // рамка input змінює колір
        calculateButton.style.backgroundColor = '#0D686D'; // змінюється колір calculate на неактивний
        resetButton.style.backgroundColor = '#9FE8DF'; // зміна кольору reset на активний

        // робимо клік для введення нової кількості осіб ...
        numberOfPeopleinput.onclick = function () {
            answerCalculate.innerText = ``; // повідомлення про некоректність зникає
            numberOfPeopleinput.style.outline = 'none'; // рамка input зникає
            calculateButton.disabled = false; // кнопка calculate активна
            calculateButton.style.backgroundColor = '#9FE8DF'; // зміна кольору calculate на активний
        }

    } else { // якщо кількість осіб введена коректно

        calculateButton.style.backgroundColor = '#26C2AE'; // зміна кольору calculate на активний
        resetButton.disabled = false;// кнопка reset активна
        resetButton.style.backgroundColor = '#26C2AE'; // зміна кольору reset на активний

        tip = 0 // величина відсотка, якщо не буде обрана жодна радіокнопка
        let radios = document.querySelectorAll('input[type="radio"]'); // збираємо масив значень радіокнопок

        for (let radio of radios) { // "проходимо" по масиву змінною radio

            
            tip = 0 // на початку кожної ітерації відсоток обнульовується
                   
            if (radio.checked) { //якщо "шаблонний" відсоток checked;
                
                if (customInput.getAttribute("type") === "text") { // зміна текстового input на радіокнопку
                    customInput.value = ''; // обнульовується значення
                    customInput.setAttribute("type", "radio"); // заміна type = text на type = radio
                    customInput.classList.add('custom'); //додавання нового класу з іншими стилями
                    label.style.display = 'flex'; // повернення label
                    radio.checked = true // кнопка custom неактивна
                }
                tip = Number(radio.value) / 100; // переведення обраного відсотка в десятковий дріб
                break
            } 
            else { // якщо обрано input з індивідуальним відсотком чайових
                tip = Number(customInput.value) / 100; // відсоток з inputа, записаний десятковим дробом 
                continue
            }  
        }

        const totalTip = Math.round(originalBillAmount * tip * 100) / 100; // обчислення суми загальних чайових
        const totalBill = originalBillAmount + totalTip // обчислення суми чеку з чайовими
        const perPerson = Math.round(totalBill / numberOfPeople * 100) / 100; //обчислення суми з чайовими на одну особу

        tipAmountText.innerText = totalTip.toFixed(2) // виведення суми загальних чайових
        totalPerPersonText.innerText = perPerson.toFixed(2) // виведення суми з чайовими на одну особу
    }
})

// функція обнулення всіх даних та розрахунків
resetButton.addEventListener('click', function () {
    document.getElementById('bill-amount').value = ''; // обнулюється значенння чеку
    document.getElementById('number-of-people').value = ''; // обнулюється кількість осіб
    document.getElementById('custom').value = ''; // обнулюється значення custom
    document.getElementById('custom').placeholder = 'Custom'; // до кнопки custom додається placeholder

    calculateButton.disabled = false; // кнопка custom неактивна
    calculateButton.style.backgroundColor = '#0d686d';// зміна кольору calculate на неактивний
    resetButton.style.backgroundColor = '#26C2AE';// зміна кольору reset на неактивний

    let radios = document.querySelectorAll('input[type="radio"]'); // збираємо масив значень радіокнопок

    for (let radio of radios) { // "проходимо" по масиву змінною 
        radio.checked = false; // всі радіокнопки активні
    }

    tipAmountText.innerText = '0.00'; // обнулення суми загальних чайових
    totalPerPersonText.innerText = '0.00'; // обнулення суми з чайовими на одну особу
})
