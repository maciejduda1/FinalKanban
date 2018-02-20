import React, { PropTypes } from 'react';
import Note from './Note';
import styles from './Notes.css';
import Edit from '../../components/Edit';

const Notes = ({ notes, laneId, editNote, updateNoteRequest, deleteNoteRequest, moveWithinLane }) => (
  <ul className={styles.Notes}>{notes.map((note) =>
    <Note
      id={note.id}
      key={note.id}
      moveWithinLane={moveWithinLane}
      laneId={laneId}
    >
      <Edit
        editing={note.editing}
        value={note.task}
        onValueClick={() => editNote(note.id)}
        onUpdate={task => updateNoteRequest({
          ...note,
          task,
          editing: false,
        })}
        onDelete={() => deleteNoteRequest(note.id, laneId)}
      />
    </Note>
  )}</ul>
);

Notes.propTypes = {
  deleteNoteRequest: PropTypes.func,
  updateNoteRequest: PropTypes.func,
  laneId: PropTypes.string,
  editNote: PropTypes.func,
  notes: PropTypes.array,
  moveWithinLane: PropTypes.func,
};

export default Notes;
