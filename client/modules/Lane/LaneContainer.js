import { connect } from 'react-redux';
import Lane from './Lane';
import { editLane, deleteLaneRequest, updateLaneRequest, moveBetweenLanes } from './LaneActions';
import { createNoteRequest, moveWithinLane } from '../Note/NoteActions';
import { compose } from 'redux';
import { DropTarget } from 'react-dnd';
import ItemTypes from '../Kanban/itemTypes';
// import { create } from 'domain';

const noteTarget = {
  drop(targetProps, monitor) {
    const sourceProps = monitor.getItem();
    // console.log('source props: ', sourceProps);
    const { id: noteId, laneId: sourceLaneId } = sourceProps;
    /*
    if (!targetProps.lane.notes.length) {
      targetProps.moveBetweenLanes(
        targetProps.lane.id,
        noteId,
        sourceLaneId,
      );
    }
   */
    if (targetProps.lane.id !== sourceLaneId) {
      targetProps.moveBetweenLanes(
        targetProps.lane.id,
        noteId,
        sourceLaneId,
      );
    }
  },
};

const mapStateToProps = (state, ownProps) => ({
  laneNotes: ownProps.lane.notes.map(noteId => state.notes[noteId])
});

const mapDispatchToProps = {
  editLane,
  deleteLane: deleteLaneRequest,
  updateLane: updateLaneRequest,
  addNote: createNoteRequest,
  moveBetweenLanes,
  moveWithinLane,
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  DropTarget(ItemTypes.NOTE, noteTarget, (dragConnect) => ({
    connectDropTarget: dragConnect.dropTarget()
  }))
)(Lane);
