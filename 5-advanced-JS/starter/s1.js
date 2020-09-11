/*let years = [1991, 1910, 1995, 2004, 2010];

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

let ages = arrayCalc(years, calcAge);
console.log(ages);*/

let retirement = function(retireAge){
    let a = ' years left until retirement';
    return function(yearBirth){
        let age = 2016 - yearBirth;
        console.log((retireAge - age) + a);
    };
};
/* an inner function always has access to the variables and parameters
of its outer function even after the outer function has returned */

let retireAgeUS = retirement(66);
let retureGermany = retirement(65);
let retireIceland = retirement(67);
retireAgeUS(1990);
retureGermany(1990);
retireIceland(1990); 
//retirement(70)(1991);

function interviewQuestions(job){
    return function(name){
        if(job === 'writer'){
            console.log('What do you write, ' + name + '?');
        } else if (job === 'teacher'){
            console.log('Tell me about your teaching experiences, '+ 
            name + '?');
        }else if(job === 'driver'){
            console.log(name + ', how long have you been driving?');
        }else{
            console.log('Hello '+name+'!');
        }
    };
}

function interviewQuestions2(job, name){
    if(job === 'writer'){
        console.log('What do you write, ' + name + '?');
    } else if (job === 'teacher'){
        console.log('Tell me about your teaching experiences, '+ 
        name + '?');
    }else if(job === 'driver'){
        console.log(name + ', how long have you been driving?');
    }else{
        console.log('Hello '+name+'!');
    }
}

interviewQuestions('driver')('Mark');
interviewQuestions2('teacher', 'David');

