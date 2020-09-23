function Person(name, yearOfBirth, job){//constructor function
    this.name = name;
    this.yearOfBirth = yearOfBirth;
    this.job = job;
}

Person.prototype.calcAge = function(){//the prototype property of a constructor function allow us to add new object properties dynamically to its prototype
    console.log(2016 - this.yearOfBirth);
};

Person.prototype.lastName = 'Smith';
let john = new Person('John', 1991, 'driver');//create objuct using constructor
//the "new" operator points the "this" word to the just created empty john object
//instead of the global object


let jane = new Person('Jane', 1995, 'singer');
let mark = new Person('Mark', 1993, 'retired');

john.calcAge();
jane.calcAge();
mark.calcAge();



//object.create allows fine control of inheritance
let personProto = {
    caculateAge: function(){
        console.log(2016 - this.yearOfBirth);
    }
};

let tim = Object.create(null);
tim.name = 'Tim';
tim.yearOfBirth = 1995;
tim.job = 'teacher';