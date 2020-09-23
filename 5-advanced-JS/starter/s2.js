let john = {
    name: 'John',
    age: 26,
    job: 'teacher',
    presentation: function(style, timeOfDay){
        if(style === 'formal'){
            console.log('Good '+timeOfDay+', ladies and gents! I\'m ' +
            this.name+', I\'m '+ this.age+' years old.');
        }else if(style === 'friendly'){
            console.log('Hello! I\'m '+
            this.name+', I\'m '+ this.age+' years old. Have a nice '+
            timeOfDay+'!');
        }
    }
};

let emily = {
    name: 'Emily',
    age: 35,
    job: 'Designer'
};

john.presentation('formal', 'evening');

let johnFriendly = john.presentation.bind(john, 'friendly');
let emilyFormal = john.presentation.bind(emily, 'formal');
johnFriendly('morning');
emilyFormal('night');

let years = [1991, 1910, 1995, 2004, 2010];

function arrayCalc(arr, fun){
    let out = [];
    for(i = 0; i < arr.length; i++){
        out.push(fun(arr[i]));
    }
    return out;
}

function calcAge(arr){
    return 2020 - arr;
}

function isFullAge(limit, el){
    return el >= limit;
}

let ages = arrayCalc(years, calcAge);
let fullJapan = arrayCalc(ages, isFullAge.bind(this, 20));
console.log(ages);
console.log(fullJapan);

function myFunc(a, b){
    return a + b;
}

let myFunc2 = myFunc.bind(this, 'c');