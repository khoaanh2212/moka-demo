import React from 'react';
import Header from 'commonComponents/Header';
import SideBar from 'commonComponents/SideBar';
import ReduxToastr from 'react-redux-toastr';
import 'react-redux-toastr/src/less/index.less';

class App extends React.Component {

  componentDidMount() {
  }

  render() {
    const { pathname } = this.props.location;
    /* return (
     <div>
        { React.Children.toArray(this.props.children) }
        <ReduxToastr
          timeOut={4000}
          newestOnTop={false}
          preventDuplicates="true"
          position="top-right"
          transitionIn="fadeIn"
          transitionOut="fadeOut"
        />
      </div>
    );*/

    if (pathname.includes('login')) {
      return (
        <div>
          { React.Children.toArray(this.props.children) }
          <ReduxToastr
            timeOut={4000}
            newestOnTop={false}
            preventDuplicates="true"
            position="top-right"
            transitionIn="fadeIn"
            transitionOut="fadeOut"
          />
        </div>
      );
    }
    return (
      <div className="wrapper">
        <Header />
        <SideBar />
        { React.Children.toArray(this.props.children) }
        <ReduxToastr
          timeOut={4000}
          newestOnTop={false}
          preventDuplicates="true"
          position="top-right"
          transitionIn="fadeIn"
          transitionOut="fadeOut"
        />
      </div>
    );
  }
}

App.defaultProps = {
  user: { name: '', permissions: [] },
  // loadCurrentUserInfo: () => {},
};

App.propTypes = {
  // user: React.PropTypes.object,
  children: React.PropTypes.node.isRequired,
  // loadCurrentUserInfo: React.PropTypes.func,
};

export default App;
