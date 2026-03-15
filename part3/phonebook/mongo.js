const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]



const url = `mongodb+srv://Fullstack:${password}@clusterlearning.yglbzyo.mongodb.net/peopleApp?retryWrites=true&w=majority&appName=ClusterLearning`

mongoose.set('strictQuery',false)

mongoose.connect(url, { family: 4 })

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 3)
{console.log('Phonebook:');
  Person.find({}).then(result => {
  result.forEach(note => {
    console.log(note.name , note.number)
  })
  mongoose.connection.close()
})}

else{

const name = process.argv[3]
const number = process.argv[4]

const note = new Person({name,number})

note.save().then(result => {
  console.log('New contact saved!')
  mongoose.connection.close()
})


}