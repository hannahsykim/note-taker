const router = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const { 
    readFromFile, 
    writeToFile, 
    readAndAppend 
} = require('../helpers/fsUtils');


// GET route
router.get('/', (req, res) => {
    
    console.info(`${req.method} request received to get notes!`);
    
    readFromFile('./db/db.json').then((data) => {
        console.log(data);
        notes = [].concat(JSON.parse(data))
        console.log(notes);
        res.json(notes);
    }) 
});

// DELETE Route for a specific tip
router.delete('/:id', (req, res) => {
    
    const noteId = req.params.id;
    readFromFile('./db/db.json')
      .then((data) => JSON.parse(data))
      .then((json) => {
        // Make a new array of all tips except the one with the ID provided in the URL
        const result = json.filter((note) => note.id !== noteId);
        
        // Save that array to the filesystem
        writeToFile('./db/db.json', result);
  
        // Respond to the DELETE request
        res.json(`Item ${noteId} has been deleted 🗑️`);
      });
      console.log('Item deleted');
  });
  

// POST route
router.post('/', (req, res)=> {
    console.info(`${req.method} request received to add a note`);
    
    const { title, text } = req.body;
    
    if(req.body) {
        const newNote = {
            title,
            text,
            id: uuidv4()
        };
        
        readAndAppend(newNote, './db/db.json')
        res.json(`Tip added successfully 🚀`);
    } else {
        res.error('Error in adding tip');
    }
    console.log(req.body);
    
});


module.exports = router;

