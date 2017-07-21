import React from 'react';
import Box from 'commonComponents/Box';
import FormGroup from 'commonComponents/FormGroup';

export default class FormEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
    };
  }

  render() {
    const EditBtn = (
      <span
        style={{ cursor: 'pointer' }}
        onClick={() => this.setState({ isEditing: true })}
      >
        Edit
      </span>
    );
    const childrenWithProps = React.Children.map(this.props.children,
      (child) => React.cloneElement(child, {
        editing: this.state.isEditing,
      })
    );

    return (
      <Box
        title="Contact Details"
        headerButton={this.state.isEditing ? undefined : EditBtn}
      >
        { childrenWithProps }
        {
          this.state.isEditing ?
            <div className="col-xs-12 body-footer">
              <button
                onClick={() => {
                  this.setState({ isEditing: false });
                  this.props.onSave();
                }}
                className="btn btn-primary"
              >
                Save
              </button>
              <button
                onClick={() => this.setState({ isEditing: false })}
                className="btn btn-default"
              >
                Cancel
              </button>
            </div>
            : <span />
        }

      </Box>
    );
  }
}

export const Column = ({ col = 6, editing, children }) => {
  const childrenWithProps = React.Children.map(children,
    (child) => React.cloneElement(child, {
      editing,
    })
  );

  return (
    <div className={`col-md-${col}`}>
      { childrenWithProps }
    </div>
  );
};


// TODO:
// Make Item edit workable with select, radio button, or checkbox
export const ItemEdit = ({ editing, title, value }) =>
  (
    <div className="col-md-12">
      <FormGroup title={title}>
        {
          editing ? <input type="text" className="form-control" value={value} /> : <span>{value}</span>
        }
      </FormGroup>
    </div>
  );

