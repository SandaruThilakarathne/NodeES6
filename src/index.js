let fs = require("fs")
const { getRandomWordSync, getRandomWord } = require('word-maker');
const { fork, exec, spawn } = require('child_process')

const forked = fork('./word-maker', {getRandomWord});

const subprocess = spawn(process.argv[0], ['./word-maker/index.js'], {
    detached: true,
    stdio: 'ignore'
});




console.log('It works!');
// YOUR CODE HERE

// Inintialize the file writing function
const stream = fs.createWriteStream('./log.txt', {flags:'a'})
// fs.truncate('C:\Users\ChampWk38\Desktop\exercise\log.txt', 0, () => {console.log('deleted')})

// Task 1 printing random words
const randomwordPrint = () => {
    stream.write('---------Task 1 Random Word Sync Function-----------\n')
    for(let i = 1; i < 101; i++) {
        
        stream.write(i + ': ' + getRandomWordSync() + '\n')
    }

}


// Task 2 Fizz Buzz Programe
const fizzBuzz = () => {
    stream.write('\n---------Task 2 FizzBuzz Sync Function-----------\n')
    for(let i = 1; i < 101; i++) {
        let word = getRandomWordSync()

        if (word.length % 3 == 0) {
            stream.write(i + ': Fizz' + '\n')
        } else if (word.length % 5 == 0) {
            stream.write(i + ': Buzz' + '\n')
        } else if (word.length % 3 == 0 && word.length % 5) {
            stream.write(i + ': FizzBuzz' + '\n')
        } else {
            stream.write(i + ': ' + word + '\n')
        }
    }

} 


// Task 3 with asynchronous function for task 1, 2
const asyncRandomWordPrint = async () => {
    stream.write('\n---------Task 3 Random Word Async Function-----------\n')
    for(let i = 1; i < 101; i++) {
        await getRandomWord().then(word => {
            stream.write(i + ': ' + word + '\n')
        }).catch(error => {
            stream.write(i + ': ' + error + '\n')
        })
    }
}

const asyncFizzBuzz = async () => {
    stream.write('\n---------Task 3 FizzBuzz Async Function-----------\n')
    for(let i = 1; i < 101; i++) {
        await getRandomWord().then(word => {
            if (word.length % 3 == 0) {
                stream.write(i + ': Fizz' + '\n')
            } else if (word.length % 5 == 0) {
                stream.write(i + ': Buzz' + '\n')
            } else if (word.length % 3 == 0 && word.length % 5) {
                stream.write(i + ': FizzBuzz' + '\n')
            } else {
                stream.write(i + ': ' + word + '\n')
            }
        }).catch(error => {
            stream.write(i + ': ' + error + '\n')
        })
    }
}

// Error handling for asyncrouns and syncronus functions

// Syncronus Functions
const randomwordPrintWithErrorHandled = () => {
    stream.write('\n---------Task 4 Random Word Sync Function Error Handled-----------\n')
    // here we adding a for loop to start from 1 and stop befor 101.
    for(let i = 1; i < 101; i++) {
        let word
        try{
            word = getRandomWordSync({ withErrors: true })
        }  catch(err) {
            word = "It shouldn't break anything!"
        }
        
        stream.write(i + ': ' + word + '\n')
    }
}

const fizzBuzzErrorHandled = () => {
    stream.write('\n---------Task 4 FizzBuzz Sync Function Error Handled-----------\n')
    // here we adding a for loop to start from 1 and stop befor 101.
    for(let i = 1; i < 101; i++) {

        let wordPrint = ''
        try{
            let word = getRandomWordSync({ withErrors: true })
            if (word.length % 3 == 0) {
                wordPrint = 'Fizz'
            } else if (word.length % 5 == 0) {
                wordPrint = 'Buzz'
            } else if (word.length % 3 == 0 && word.length % 5) {
                wordPrint = 'FizzBuzz'
            }  else {
                wordPrint = word
            }
    
        } catch(err) {
            wordPrint = "It shouldn't break anything!"
        }

        stream.write(i + ': ' + wordPrint + '\n')
    }
} 

// Asynchronus Functions
const asyncRandomWordPrintErrorHandled = async () => {
    stream.write('\n---------Task 4 Random Word Async Function Error Handled-----------\n')
    for(let i = 1; i < 101; i++) {
        let printWord;
        await getRandomWord({ withErrors: true }).then(word => {
            printWord = i + ': ' + word 
        }).catch(error => {
            printWord = "It shouldn't break anything!"
        })
        stream.write(printWord + '\n')
    }
}

const asyncFizzBuzzErrorHandled = async () => {

    stream.write('\n---------Task 4 FizzBuzz Async Function Error Handled-----------\n')
    for(let i = 1; i < 101; i++) {
        let printWord;
        await getRandomWord({ withErrors: true}).then(word => {
            if (word.length % 3 == 0) {
                printWord='Fizz'
            } else if (word.length % 5 == 0) {
                printWord='Buzz'
            } else if (word.length % 3 == 0 && word.length % 5) {
                printWord='FizzBuzz'
            } else {
                printWord=word
            }
        }).catch(error => {
            printWord = "It shouldn't break anything!"
        })
    
        stream.write(printWord + '\n')
    }
}

const asyncFizzBuzzErrorHandled1 = async () => {

    stream.write('\n---------Task 5 FizzBuzz Async Function Error Handled Slow true-----------\n')
    for(let i = 1; i < 101; i++) {
        let printWord;
        await getRandomWord({ withErrors: true, slow: true}).then(word => {
            if (word.length % 3 == 0) {
                printWord='Fizz'
            } else if (word.length % 5 == 0) {
                printWord='Buzz'
            } else if (word.length % 3 == 0 && word.length % 5) {
                printWord='FizzBuzz'
            } else {
                printWord=word
            }
        }).catch(error => {
            printWord = "It shouldn't break anything!"
        })
    
        stream.write(printWord + '\n')
    }
}



const main = async () => {
    // randomwordPrint();
    // fizzBuzz();

    // await asyncFizzBuzz();
    // await asyncRandomWordPrint()

    // randomwordPrintWithErrorHandled();
    // fizzBuzzErrorHandled();

    // await asyncRandomWordPrintErrorHandled();
    // await asyncFizzBuzzErrorHandled();
    // cp.on('message', (msg) => {
    //     console.log('Message from child', msg);
    // });
    
    stream.end();
}


main();