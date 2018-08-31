const express = require('express');

const projectDb = require('../../data/helpers/projectModel.js');

const router = express.Router();

router.get('/', (req, res) => {
  projectDb.get().then(projects => {
    if (projects.length) {
      res.status(200).json(projects);
    }
    else {
      res.status(400).json({ message: 'Sorry, we could not fetch projects :('})
    }
  }).catch(err => {
    res.status(500).json({ message: 'Sorry, there was an issue with the server. Please try again.'})
  })
});

router.get('/:id', (req, res) => {
  projectDb.get(req.params.id).then(project => {
    if (project === undefined) {
      res.status(404).json({ message: 'Sorry - there is no project with the specified id.'})
    }
    else {
      res.status(200).json(project);
    }
  }).catch(err => {
    res.status(500).json({ message: 'Sorry, we were unable to retrieve your project from the server :('})
  })
});

router.post('/', (req, res) => {
  if (req.body.name && req.body.description) {
    projectDb.insert(req.body).then(id => {
      res.status(201).json({ message: 'Your project was successfully added'})
    }).catch(err => {
      res.status(500).json({ message: 'Sorry - your project could not be added. Please try again!'})
    });
  }
  else {
    res.status(422).json({ message: 'You must provide both a name and a description to save your project'})
  }
});

router.put('/:id', (req, res) => {
  if (req.body.name && req.body.description) {
    projectDb.update(req.params.id, req.body).then(project => {
      if (project === null) {
        res.status(404).json({ message: 'Sorry, a project with the specified id could not be located'})
      }
      else {
        res.status(201).json(project)
      }
    }).catch(err => {
      res.status(500).json({ message: 'Sorry, your updates could not be saved :('})
    })
  }
  else {
    res.status(422).json({ message: 'A project must have both a name and a description to be saved'})
  }
})

router.delete('/:id', (req, res) => {
  projectDb.delete(req.params.id).then(count => {
    if (count !== 1) {
      res.status(404).json({ message: 'Sorry, the project with the specified id could not be found'})
    }
    else {
      res.status(200).json({ message: 'The project was successfully deleted'})
    }
  }).catch(err => {
    res.status(500).json({ message: 'There was an error when deleting your project. Please try again!'})
  })
})

router.get('/:id/actions', (req, res) => {
  projectDb.getProjectActions(req.params.id).then(actions => {
    if (actions.length) {
      res.status(200).json(actions);
    }
    else {
      res.status(404).json({ message: 'Sorry, we could not find the actions you requested'})
    }
  }).catch(err => {
    res.status(500).json({ message: 'Sorry, something went wrong getting your actions. Please try agian!'})
  });
})

module.exports = router;
