const express = require('express');

const actionDb = require('../../data/helpers/actionModel.js');

const router = express.Router();

router.get('/', (req, res) => {
  actionDb.get().then(actions => {
    if (actions.length) {
      res.status(200).json(actions);
    }
    else {
      res.status(400).json({ message: 'Sorry, we could not fetch actions :('})
    }
  }).catch(err => {
    res.status(500).json({ message: 'Sorry, there was an issue with the server. Please try again.'})
  })
});

router.get('/:id', (req, res) => {
  actionDb.get(req.params.id).then(action => {
    if (action === undefined) {
      res.status(404).json({ message: 'Sorry - there is no action with the specified id.'})
    }
    else {
      res.status(200).json(action);
    }
  }).catch(err => {
    res.status(500).json({ message: 'Sorry, we were unable to retrieve your action from the server :('})
  })
});

router.post('/', (req, res) => {
  if (req.body.project_id && req.body.description && req.body.notes) {
    actionDb.insert(req.body).then(id => {
      res.status(201).json({ message: 'Your action was successfully added'})
    }).catch(err => {
      res.status(500).json({ message: 'Sorry - your action could not be added. Please try again!'})
    });
  }
  else {
    res.status(422).json({ message: 'You must provide a description, a project id, and notes to save your action'})
  }
});

router.put('/:id', (req, res) => {
  if (req.body.project_id && req.body.notes && req.body.description) {
    actionDb.update(req.params.id, req.body).then(action => {
      if (action === null) {
        res.status(404).json({ message: 'Sorry, a action with the specified id could not be located'})
      }
      else {
        res.status(201).json(action)
      }
    }).catch(err => {
      res.status(500).json({ message: 'Sorry, your updates could not be saved :('})
    })
  }
  else {
    res.status(422).json({ message: 'You must provide a description, a project id, and notes to save your action'})
  }
})

router.delete('/:id', (req, res) => {
  actionDb.delete(req.params.id).then(count => {
    if (count !== 1) {
      res.status(404).json({ message: 'Sorry, the action with the specified id could not be found'})
    }
    else {
      res.status(200).json({ message: 'The action was successfully deleted'})
    }
  }).catch(err => {
    res.status(500).json({ message: 'There was an error when deleting your action. Please try again!'})
  })
})

module.exports = router;
