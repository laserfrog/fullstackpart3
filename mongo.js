const mongoose = require('mongoose')

if (process.argv.length === 3) {
    const password = process.argv[2]

    const url =
        `mongodb+srv://laserfrog:${password}@cluster0.alhw5gf.mongodb.net/phoneApp?retryWrites=true&w=majority`

    mongoose.set('strictQuery', false)
    mongoose.connect(url)

    const personSchema = new mongoose.Schema({
        name: String,
        number: String,
    })

    const Person = mongoose.model('Person', personSchema)

    Person.find({}).then(result => {
        result.forEach(thingy => {
            console.log(thingy)
        })
        mongoose.connection.close()
    })


}
else if (process.argv.length < 5) {
    console.log('give password, name and number as arguments')
    process.exit(1)
}
else if (process.argv.length === 5) {



    const password = process.argv[2]
    const name = process.argv[3]
    const number = process.argv[4]

    console.log(name, number)

    const url =
        `mongodb+srv://laserfrog:${password}@cluster0.alhw5gf.mongodb.net/phoneApp?retryWrites=true&w=majority`

    mongoose.set('strictQuery', false)
    mongoose.connect(url)

    const personSchema = new mongoose.Schema({
        name: String,
        number: String,
    })

    const Person = mongoose.model('Person', personSchema)

    const person = new Person({
        name: name,
        number: number,
    })

    person.save().then(result => {
        console.log(`added ${name} ${number} to phonebook`)
        mongoose.connection.close()
    })
}