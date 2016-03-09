/* eslint react/no-multi-comp: 0 */
import React, { Component } from 'react';

class Tag extends Component {
  static propTypes = {
    labelField: React.PropTypes.string,
    onDelete: React.PropTypes.func.isRequired,
    tag: React.PropTypes.object.isRequired,
    removeComponent: React.PropTypes.func,
    readOnly: React.PropTypes.bool
  }
  static defaultProps = {
    labelField: 'text'
  }
  render() {
    const label = this.props.tag[this.props.labelField];
    const { readOnly } = this.props;
    const CustomRemoveComponent = this.props.removeComponent;
    class RemoveComponent extends Component {
      render() {
        if (readOnly) {
          return <span/>;
        }

        if (CustomRemoveComponent) {
          return <CustomRemoveComponent {...this.props} />;
        }
        return <a {...this.props}>x</a>;
      }
    }

    return (
      <span className="ReactTags-tag">
        <RemoveComponent className="ReactTags-remove"
          onClick={this.props.onDelete} />
        <span className="ReactTags-label">{label}</span>
      </span>
    );
  }
}

module.exports = Tag;
