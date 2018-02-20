import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Lanes from '../Lane/Lanes';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { compose } from 'redux';
import styles from '../Lane/Lane.css';
import { createLaneRequest, fetchLanes } from '../Lane/LaneActions';
// import zmieniłem
const Kanban = (props) => (
  <div className={styles.Kanban}>
    <div className={styles.NewLaneDiv}>
      <button
        className={styles.NewLaneButton}
        onClick={() => props.createLaneRequest({
          name: 'New lane',
        })}
      >Add lane</button>
    </div>
    <Lanes lanes={props.lanes} />
  </div>
);

Kanban.need = [() => { return fetchLanes(); }];

Kanban.propTypes = {
  lanes: PropTypes.array,
};

Kanban.propTypes = {
  lanes: PropTypes.array,
  createLaneRequest: PropTypes.func,
};

const mapStateToProps = state => ({
  lanes: Object.values(state.lanes)
});

const mapDispatchToProps = {
  createLaneRequest,
};
// tu podmieniłem createLane na createLaneRequest
export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  DragDropContext(HTML5Backend)
)(Kanban);
