import React, { Component } from 'react';

class Suggestions extends Component {
  static propTypes = {
    query: React.PropTypes.string.isRequired,
    selectedIndex: React.PropTypes.number.isRequired,
    suggestions: React.PropTypes.array.isRequired,
    handleClick: React.PropTypes.func.isRequired,
    handleHover: React.PropTypes.func.isRequired,
    minQueryLength: React.PropTypes.number
  }
  markIt(input, query) {
    const escapedRegex = query.trim().replace(/[-\\^$*+?.()|[\]{}]/g, '\\$&');
    const r = RegExp(escapedRegex, 'gi');
    return {
      __html: input.replace(r, '<mark>$&</mark>')
    };
  }
  render() {
    const props = this.props;
    const suggestions = this.props.suggestions.map((item, i) => {
      return (
        <li key={i}
          onClick={props.handleClick.bind(null, i)}
          onMouseOver={props.handleHover.bind(null, i)}
          className={i === props.selectedIndex ? 'active' : ''}>
          <span dangerouslySetInnerHTML={this.markIt(item, props.query)} />
        </li>
      );
    });

    const minQueryLength = props.minQueryLength || 2;
    if (suggestions.length === 0 || props.query.length < minQueryLength) {
      return (
        <div className="ReactTags__suggestions"> </div>
      );
    }

    return (
      <div className="ReactTags-suggestions-outer">
        <div className="ReactTags-suggestions">
          <ul> { suggestions } </ul>
        </div>
      </div>
    );
  }
}

module.exports = Suggestions;
