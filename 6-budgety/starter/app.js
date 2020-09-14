//IIFE is useful for building APIs that hides away its inner components(data privacy, like private variables)
//without creating a new function, which occupy resources
let DOMStrings = {//global object to store queryselector strings  
    inputType: ".add__type",
    inputDescription: ".add__description",
    inputValue: ".add__value",
    inputBtn: ".add__btn",
    incomeContainer: '.income__list',
    expenseContainer: '.expenses__list',
    incomeLabel: '.budget__income--value',
    expenseLabel: '.budget__expenses--value',
    totalBudgetLabel: '.budget__value',
    persentageLabel: '.budget__expenses--percentage'
};

//budget controller to do the backend calculation
let budgetController = (function(){
    function Expense(id, description, value){//interchangable?
        this.id = id;
        this.description = description;
        this.value = value;
    }

    let Income = function(id, description, value){
        this.id = id;
        this.description = description;
        this.value = value;
    };

    function calculateTotal(type){
        let sum = 0;
        database.allItems[type].forEach(function(cur){
            sum += cur.value;
        });
        database.totals[type] = sum;
    }

    let database = {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        },
        budget: 0,
        percent: -1//so that the initial value is not valid, so no percent info
    };

    return {
        addItem: function(type, desc, val){
            let newItem, ID;

            //create new id
            if (database.allItems[type].length === 0){
                ID = 1;
            } else{
                ID = database.allItems[type][database.allItems[type].length - 1].id + 1;
            }
            //ID = database.allItems[type][database.allItems[type].length - 1].id + 1;

            //create new item based on type
            if (type === 'exp'){
                newItem = new Expense(ID, desc, val);
            } else if (type === 'inc'){
                newItem = new Income(ID, desc, val);
            }

            //add item to database and return element
            database.allItems[type].push(newItem);
            return newItem;
        },

        calculateBudget: function(){
            //calc total inc and exp
            calculateTotal('exp');
            calculateTotal('inc');
            //calc the budget: inc - exp
            database.budget = database.totals.inc - database.totals.exp;
            //calc the persentage of spent inc
            if(database.totals.inc > 0){
                database.percent = Math.round(database.totals.exp / database.totals.inc * 100);
            }
        },

        getBudget: function(){
            return{
                totalInc: database.totals.inc,
                totalExp: database.totals.exp,
                budget: database.budget,
                percent: database.percent
            };
        },

        test: function(){
            console.log("current database:");//because database was a private variable
            console.log(database);//we need a function exposed to the public like this to view 
        }
    };
})();

//UI controller to update the frontend UI
let UIController = (function(){
    //code
    return{
        getInput: function(){
            /*let type = document.querySelector(".add__type").value; //will be either inc or exp
            let description = document.querySelector(".add__description").value;
            let value = document.querySelector(".add__value").value;
            let inputSet = {
                typeI: type,
                descriptionI: description,
                valueI: value
            };/
            return inputSet;*/
            return {
                type: document.querySelector(DOMStrings.inputType).value, //will be either inc or exp
                description: document.querySelector(DOMStrings.inputDescription).value,
                value: parseFloat(document.querySelector(DOMStrings.inputValue).value)
            };
        },

        addListItem: function(obj, type){
            let textHTML, newHTML, containerType;

            //create HTML strings with placeholder texts
            if (type === 'inc'){
                containerType = DOMStrings.incomeContainer;
                textHTML = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div>\
            <div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button \
            class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            } else {
                containerType = DOMStrings.expenseContainer;
                textHTML = '<div class="item clearfix" id="expense-%id%">\
            <div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div>\
            <div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline">\
            </i></button></div></div></div>';
            }
            
            //replace placeholder texts with input
            newHTML = textHTML.replace('%id%', obj.id).replace('%description%', obj.description).replace('%value%', obj.value);
            //insert into DOM
            document.querySelector(containerType).insertAdjacentHTML('beforeend', newHTML);
            
        },

        clearFields: function(){
            let fields, fieldsArray;
            fields = document.querySelectorAll(DOMStrings.inputDescription + ', ' +
            DOMStrings.inputValue);// this 'fields' is a DOM Node List, cannot be used as an array
            fieldsArray = Array.from(fields);//converts the node list to array
            fieldsArray.forEach(function(current) {
                current.value = ''; //this is doing document.querySelector(DOMStrings.inputDescription).value = "" and
                                    //document.querySelector(DOMStrings.inputValue).value = "" 
            });
            fieldsArray[0].focus();//refocus to the first input field
        },

        showBudget: function(obj){
            document.querySelector(DOMStrings.incomeLabel).textContent = obj.totalInc;
            document.querySelector(DOMStrings.expenseLabel).textContent = obj.totalExp;
            if(obj.budget > 0){
                document.querySelector(DOMStrings.totalBudgetLabel).textContent = '+' + obj.budget;
            }else{
                document.querySelector(DOMStrings.totalBudgetLabel).textContent = obj.budget;
            }
            if(obj.percent != -1){
                document.querySelector(DOMStrings.persentageLabel).textContent = obj.percent + '%';
            }else{
                document.querySelector(DOMStrings.persentageLabel).textContent = '--%';
            }
        }
    };
})();

//global controller to receive user inputs and manage other functions
let controller = (function(budgetCtrl, UICtrl){
    function setuptEventListeners(){
        document.querySelector(DOMStrings.inputBtn).addEventListener('click', ctrlAddItem);

        document.addEventListener('keypress', function(event){
            if(event.keyCode === 13 || event.which === 13){
                ctrlAddItem();
            }
        });
    }

    function updateBudget(){
        //calculate the new budget
        budgetCtrl.calculateBudget();
        //return the new budget
        let budget = budgetCtrl.getBudget();
        //update results on UI
        UICtrl.showBudget(budget);
    }

    function ctrlAddItem(){
        let input, newItem;
        //read input data
        input = UICtrl.getInput();

        if (input.description !== "" && input.value > 0/*!isNaN(input.value) or isNaN(input.value) === false*/){
            //console.log(input);
            //add the item to the budget controller
            newItem = budgetCtrl.addItem(input.type, input.description, input.value);//static newitem
            //console.log(newItem);
            //add item to UI & clear input fields
            UICtrl.addListItem(newItem, input.type);
            UICtrl.clearFields();
            //budgetCtrl.database.allItems[input.type][budgetCtrl.database.allItems[input.type].length -1];//dynamic newitem
            
            //caculate and add budget
            updateBudget();

            
        } else {
            alert("Inappropriate input data!");
            UICtrl.clearFields();
        }
        
    }

    return {
        init: function(){
            console.log("Started...");
            UICtrl.showBudget({
                totalInc: 0,
                totalExp: 0,
                budget: 0,
                percent: '--'
            });
            setuptEventListeners();
        }
    };

})(budgetController,UIController);


controller.init();

//adding comment to very github integration