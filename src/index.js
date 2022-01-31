const { response } = require("express");
const express = require("express");
const { initializeApp, cert } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");

const credentials = require("../credentials.json");

initializeApp({
  credential: cert(credentials),
});

const db = getFirestore();

const app = express();

app.use(express.json());

app.get("/", (request, response) => {
  const userCollection = db.collection("users");

  userCollection.get().then((snapshot) => {
    // const users = []
    // snapshot.forEach(doc => {
    //     users.push({id: doc.id, ...doc.data()})
    // })

    response.send(snapshot.docs);
  });

  // response.send('Hello World!');
});

app.post("/users", (req, res) => {
  const { name, age, email } = req.body; //request.body => what is sent to server--
  //^const name1 = req.body.name;
  //^const age1 = req.body.age;
  //^const email1= req.body.email
  const user = { name, age, email }; //want to create an object with these variable----the key of these properties is name, age, and email
  //  ^ const user= {
  //       name: name,
  //       age: age,
  //       email:
  //   }
  const result = `My name is ${user.name}, I am ${user.age} years old and my email is ${user.email}`;
  res.send(result);
});

app.listen(3000, () => {
  console.log("We are listening on 3000");
});
