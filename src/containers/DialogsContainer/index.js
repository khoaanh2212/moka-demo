import React from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import {
  hideModal,
} from './actions';

const DialogsContainer = (props) => {
  const { id, options, dialogs } = props;
  const DialogComponent = dialogs[id];

  if (!DialogComponent) return null;
  return (
    <DialogComponent show {...options} hideModal={props.hideModal} />
  );
};

DialogsContainer.defaultProps = {
  id: '',
  options: {},
  hideModal: () => {},
  dialogs: {},
};

DialogsContainer.propTypes = {
  id: React.PropTypes.string,
  options: React.PropTypes.object,
  hideModal: React.PropTypes.func,
  dialogs: React.PropTypes.object,
};

const selectModalState = (state) => state.modal;
const selectModalId = createSelector(selectModalState, (modalState) => modalState.id);
const selectModalOptions = createSelector(selectModalState, (modalState) => modalState.options);

const mapStateToProps = (state) => ({
  id: selectModalId(state),
  options: selectModalOptions(state),
});

const mapDispatchToProps = {
  hideModal,
};

export default connect(mapStateToProps, mapDispatchToProps)(DialogsContainer);
