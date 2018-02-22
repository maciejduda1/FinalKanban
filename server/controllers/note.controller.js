import Note from '../models/note';
import Lane from '../models/lane';
import uuid from 'uuid';
/*
export function getSomething(req, res) {
  return res.status(200).end();
}
*/
export function addNote(req, res) {
  const { note, laneId } = req.body;

  if (!note || !note.task || !laneId) {
    res.status(400).end();
  }

  const newNote = new Note({
    task: note.task,
  });

  newNote.id = uuid();
  newNote.save((err, saved) => {
    if (err) {
      res.status(500).send(err);
    }
    Lane.findOne({ id: laneId })
      .then(lane => {
        lane.notes.push(saved);
        return lane.save();
      })
      .then(() => {
        res.json(saved);
      });
  });
}

export function deleteNote(req, res) {
//  console.log('req body', req.body);
  Lane.findOne({ id: req.body.laneId })
  .then(lane => {
//    console.log('lane notes', lane.notes);
    const newArr = lane.notes.filter(singleNote => singleNote.id !== req.params.noteId);
    lane.notes = newArr;
    lane.save().then(() => {
      Note.findOne({ id: req.params.noteId }).exec((err, note) => {
        if (err) {
          res.status(500).send(err);
        }
        note.remove(() => {
          res.status(200).end();
        });
      });
    });
    // lane.notes = lane.notes.filter((note) => note.id !== req.params.noteId);
    // lane.notes.map((note) => { return note.id == req.params.noteId ? note.remove() : note; });
  });
}

export function editNote(req, res) {
//  console.log('req.body.task ', req.body.task);
//  console.log('req.params.noteId ', req.params.noteId);
  Note.update({ id: req.params.noteId }, { task: req.body.task }).exec((err, note) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ note });
  });
}

/*
export function moveNotesWithinLane(req, res) {
  Lane.findOne({ id: req.body.laneId })
    .then(lane => {
      const targetNoteIdIndex = lane.notes.indexOf({ id: req.params.noteId });
      const sourceNoteIdIndex = lane.notes.indexOf({ id: req.body.sourceId });
      console.log('targetNoteId ', targetNoteIdIndex);
      console.log('sourceNoteId ', sourceNoteIdIndex);
      lane.splice(targetNoteIdIndex, 0, lane.splice(sourceNoteIdIndex, 1)[0]);
      return lane.save();
    })
    .then(() => {
      res.status(200).end();
    });
}



function moveNotes(array, sourceNoteId, targetNoteId) {
  const sourceIndex = array.indexOf(sourceNoteId);
  const targetIndex = array.indexOf(targetNoteId);
  const arrayCopy = [...array];
 
  arrayCopy.splice(targetIndex, 0, arrayCopy.splice(sourceIndex, 1)[0]);
  return arrayCopy;
}
*/