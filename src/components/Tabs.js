import React from 'react';
import PropTypes from 'prop-types';
import './styles.css';

class Tabs extends React.PureComponent {
  static propTypes = {
    // todo: PropTypes.string.isRequired,
    // id: PropTypes.string.isRequired,
    // isCompleted: PropTypes.bool.isRequired,
    // isImportant: PropTypes.bool.isRequired,
    // toggleDeleteButton: PropTypes.func.isRequired,
    // toggleCompletition: PropTypes.func.isRequired,
    tabClick: PropTypes.func.isRequired
  }

  state = {
    status: 'all'
  }

  selectAll = () => {
    const {tabClick} = this.props;
    this.setState({status: 'all'});
    tabClick('all');
  };

  selectActive = () => {
    const {tabClick} = this.props;
    this.setState({status: 'active'});
    tabClick('active');
  };

  selectCompleted = () => {
    const {tabClick} = this.props;
    this.setState({status: 'completed'});
    tabClick('completed');
  };

  render() {
    const {status} = this.state;
    return (
      <div className="tabs-wrapper">
        <div role="presentation" onClick={this.selectAll} className={status === 'all' ? 'tab-active' : 'tab-default'}>All</div>
        <div role="presentation" onClick={this.selectActive} className={status === 'active' ? 'tab-active' : 'tab-default'}>Active</div>
        <div role="presentation" onClick={this.selectCompleted} className={status === 'completed' ? 'tab-active' : 'tab-default'}>Completed</div>

      </div>
    );
  }
}

export default Tabs;
