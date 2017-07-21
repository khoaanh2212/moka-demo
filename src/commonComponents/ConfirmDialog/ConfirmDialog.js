
import React, { PropTypes } from 'react';
import { Modal, Button } from 'react-bootstrap';
const ConfirmDialog = (props) => (
  <Modal
    show={props.show}
    onHide={props.hideModal}
  >
    <Modal.Header>
      <Modal.Title>{ props.title }</Modal.Title>
    </Modal.Header>
    <Modal.Footer>
      <Button
        bsStyle="danger"
        onClick={props.cancelAction}
      >
        Hủy
      </Button>
      <Button
        bsStyle="success"
        onClick={props.okAction}
      >
        Xác nhận
      </Button>
    </Modal.Footer>
  </Modal>
);

ConfirmDialog.defaultProps = {
  title: 'Bạn có muốn thực hiện thao tác này ?',
  show: false,
};

ConfirmDialog.propTypes = {
  title: PropTypes.string,
  okAction: PropTypes.func.isRequired,
  cancelAction: PropTypes.func.isRequired,
  show: PropTypes.bool,
  hideModal: PropTypes.func.isRequired,
};

export default ConfirmDialog;
