/**
 * Created by linhv on 3/14/2017.
 */
export const actionTypes = {
  SHOW_MODAL: 'modal/SHOW_MODAL',
  HIDE_MODAL: 'modal/HIDE_MODAL',
};

export const showModal = (id, options) => ({
  type: actionTypes.SHOW_MODAL,
  payload: {
    id,
    options,
  },
});

export const hideModal = () => ({
  type: actionTypes.HIDE_MODAL,
});
