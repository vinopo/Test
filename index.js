const COMMANDS = {
    R: 'R',
    W: 'W',
    I: 'I',
    Q: 'Q'
}

const DEFAULT_STOCK = {
    "$100": 10,
    "$50": 10,
    "$20": 10,
    "$10": 10,
    "$5": 10,
    "$1": 10
}

const BILLS_KIND = [100, 50, 20, 10, 5, 1];

function ATM() {
    let stock = { ...DEFAULT_STOCK }

    function displayCurrentStock(input) {
        console.log("Machine balance:")
        Object.entries(input).forEach(([key, value]) => {
            console.log(`${key} - ${value}`)
        })
    }

    return function (transaction) {
        const [command, ...args] = transaction.split(" ");
        console.log(`> ${transaction}`)
        switch (command) {


            case COMMANDS.R: {
                stock = DEFAULT_STOCK
                displayCurrentStock(stock)

                break;
            }
            case COMMANDS.W: {
                const [bill] = args
                let value = Number(bill.substring(1))
                const prevStock = { ...stock }

                BILLS_KIND.forEach(kind => {
                    while (value > 0 && value >= kind && stock[`$${kind}`] > 0) {
                        value -= kind
                        stock[`$${kind}`] -= 1
                    }
                })

                if (value === 0) {
                    console.log(`Success: Dispensed ${args.join('')}`)
                    displayCurrentStock(stock)
                } else {
                    console.log("Failure: insufficient funds")
                    stock = { ...prevStock }
                }

                break
            }
            case COMMANDS.I: {
                args.forEach(arg => {
                    console.log(`${arg} - ${stock[arg]}`)
                })
                break;
            }
            case COMMANDS.Q: {
                console.log('Goodbye!')
                break
            }

            default: {
                console.log('Failure: Invalid Command')
            }
        }
    }
}

const machine = ATM()

machine("W $208")
machine("W $9")
machine("W $9")
machine("I $20 $1 $100")
machine("R")
machine("K")