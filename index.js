const cors = require('cors');
const users = { 
    users_list :
    [
       { 
          id : 'xyz789',
          name : 'Charlie',
          job: 'Janitor',
       },
       {
          id : 'abc123', 
          name: 'Mac',
          job: 'Bouncer',
       },
       {
          id : 'ppp222', 
          name: 'Mac',
          job: 'Professor',
       }, 
       {
          id: 'yat999', 
          name: 'Dee',
          job: 'Aspring actress',
       },
       {
          id: 'zap555', 
          name: 'Dennis',
          job: 'Bartender',
       }
    ]
 }

const express = require('express');
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

// app.get('/users', (req, res) => {
//     console.log("Users")
//     res.send(users);
// });

// app.get('/users', (req, res) => {
//     const name = req.query.name;

//     if (name != undefined){
//         let result = findUserByName(name);
//         result = {users_list: result};
//         res.send(result);
//     }
//     else{
//         res.send(users);
//     }


// });

app.get('/users', (req, res) => {
    const name = req.query["name"]; //or .name
    const job = req.query["job"];

    // 
    // console.log(job)
    // console.log(name)
    
    if (name != undefined && job != undefined){
        let result = findUserByNameJob(name, job);
        console.log(result)
        result = {users_list: result};
        res.send(result);
    }
    else{
        res.send(users);
    }


});

app.get('/users/:id', (req, res) => {
    const id = req.params['id']; //or req.params.id
    let result = findUserById(id);
    if (result === undefined || result.length == 0)
        res.status(404).send('Resource not found.');
    else {
        result = {users_list: result};
        res.send(result);
    }
});

function findUserById(id) {
    return users['users_list'].find( (user) => user['id'] === id); // or line below
    //return users['users_list'].filter( (user) => user['id'] === id);
}

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});      


// const findUserByName = (name) => { 
//     return users['users_list'].filter( (user) => user['name'] === name); 
// }

const findUserByNameJob = (name, job) => { 
    // console.log(users['users_list'].filter( ((user) => user['name'] === name) && ((user) => user['job'] === job)) );
    return users['users_list'].filter( ((user) => user['name'] === name) && ((user) => user['job'] === job)); 
}

app.post('/users', (req, res) => {
    // //ADDED THIS
    // const { v4: uuidV4 } = require('uuid');
    // console.log(uuidv4())
    req.body['id'] = Date.now().toString();
    // console.log(req.body['id'])
    // console.log(req.body)
    // //END OF ADD
    const userToAdd = req.body;
    addUser(userToAdd);
    // res.status(200).end();
    res.status(201).send(userToAdd);
});

function addUser(user){
    users['users_list'].push(user);
}


// app.get('/users/:id', (req, res) => {
//     const id = req.params['id']; //or req.params.id
//     let result = findUserById(id);
//     if (result === undefined || result.length == 0)
//         res.status(404).send('Resource not found.');
//     else {
//         result = {users_list: result};
//         res.send(result);
//     }
// });

// app.delete('/users', (req, res) => {
//     const userToDelete = req.body;
//     console.log(userToDelete)
//     deleteUser(userToDelete);
//     res.status(200).end();
// });

app.delete('/users/:id', (req, res) => {
    // const id = req.body['id']; //or req.params.id
    const id = req.params.id
    // console.log(id)
    let result = findUserById(id);
    console.log(result);
    if (result === undefined || result.length == 0)
        res.status(404).send('Resource not found.');
    else {
        // result = {users_list: result};
        console.log(result);
        // console.log(result)
        // res.send(result);
        deleteUser(result);
        res.status(204).end();
    }
});

function deleteUser(user){
    console.log("Popping user", user)
    const index = users['users_list'].indexOf(user);
    users['users_list'].splice(index, 1)
    
    // users['users_list'].pop(user)
    // delete users['users_list'].user
    // users['users_list'].remove(user)
}