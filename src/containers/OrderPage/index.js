import React, { Component } from 'react';
import { connect } from 'react-redux';
import ContentWrapper from 'components/ContentWrapper';


@connect(undefined, {})
class OrderPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ContentWrapper>
        <section className="content">
          Order Page
        </section>
      </ContentWrapper>
    );
  }
}

export default OrderPage;
