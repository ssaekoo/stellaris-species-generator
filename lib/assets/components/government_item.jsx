var React = require('react');
var PropTypes = React.PropTypes;
var GovernmentLocks = require('../constants/government_locks');
var GovernmentUnlocks = require('../constants/government_unlocks');
var GovernmentNames = require('../constants/government_names');
var EthosStore = require('../stores/ethos');
var GovernmentStore = require('../stores/government');

var GovernmentItem = React.createClass({
  getInitialState: function () {
    return({
      currentGovernment: GovernmentStore.currentGovernment(),
    });
  },

  componentWillReceiveProps: function () {
    var availableGovernments = this.props.availableGovernments;
    if (availableGovernments) {
      this.setState({ availableGovernments: availableGovernments });
    }
  },

  componentDidMount: function () {
    this.governmentListener = GovernmentStore.addListener(this._governmentChange);
  },

  componentWillUnmount: function () {
    this.governmentListener.remove();
  },

  _governmentChange: function () {
    this.setState({
      currentGovernment: GovernmentStore.currentGovernment(),
    });
  },

  render: function() {
    var government = this.props.government;
    var unlocked = this.props.unlocked;
    var CSSClass = "government-roundel " + GovernmentNames[government];
    if ( this.state.currentGovernment === government ) {
      CSSClass += " government-selected";
    }
    if (!unlocked) {
      CSSClass += " locked";
    }

    return (
      <div className={CSSClass} />
    );
  }

});

module.exports = GovernmentItem;
