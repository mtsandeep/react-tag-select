import React, { Component } from 'react';
import Tag from './Tag';
import Suggestions from './Suggestions';

// Constants
const Keys = {
  ENTER: 13,
  TAB: 9,
  BACKSPACE: 8,
  UP_ARROW: 38,
  DOWN_ARROW: 40,
  ESCAPE: 27
};

class ReactTagSelect extends Component {
  static propTypes = {
    tags: React.PropTypes.array,
    placeholder: React.PropTypes.string,
    labelField: React.PropTypes.string,
    suggestions: React.PropTypes.array,
    delimeters: React.PropTypes.array,
    autofocus: React.PropTypes.bool,
    handleDelete: React.PropTypes.func.isRequired,
    handleAddition: React.PropTypes.func.isRequired,
    allowDeleteFromEmptyInput: React.PropTypes.bool,
    handleInputChange: React.PropTypes.func,
    minQueryLength: React.PropTypes.number,
    removeComponent: React.PropTypes.func,
    autocomplete: React.PropTypes.oneOfType([
      React.PropTypes.bool,
      React.PropTypes.number
    ]),
    readOnly: React.PropTypes.bool,
  }
  static defaultProps = {
    placeholder: 'Add new tag',
    tags: [],
    suggestions: [],
    delimeters: [Keys.ENTER, Keys.TAB],
    autofocus: true,
    allowDeleteFromEmptyInput: true,
    minQueryLength: 2,
    autocomplete: false,
    readOnly: false
  }
  constructor(props) {
    super(props);
    this.state = {
      suggestions: this.props.suggestions,
      query: '',
      selectedIndex: -1,
      selectionMode: false
    };
  }
  componentDidMount() {
    if (this.props.autofocus) {
      this.refs.input.focus();
    }
  }
  componentWillReceiveProps(props) {
    const suggestions = this.filteredSuggestions(this.state.query, props.suggestions);
    this.setState({
      suggestions: suggestions
    });
  }
  filteredSuggestions(query, suggestions) {
    return suggestions.filter((item) => {
      return item.toLowerCase().indexOf(query.toLowerCase()) === 0;
    });
  }

  handleDelete(i) {
    this.props.handleDelete(i);
    this.setState({ query: '' });
  }
  handleChange = (e) => {
    if (this.props.handleInputChange) {
      this.props.handleInputChange(e.target.value.trim());
    }

    const query = e.target.value.trim();
    const suggestions = this.filteredSuggestions(query, this.props.suggestions);

    this.setState({
      query: query,
      suggestions: suggestions
    });
  }
  handleKeyDown = (e) => {
    let { query, selectedIndex } = this.state;
    /*eslint-disable no-unused-vars*/
    const { suggestions } = this.state;
    /*eslint-enable no-unused-vars*/

    // hide suggestions menu on escape
    if (e.keyCode === Keys.ESCAPE) {
      e.preventDefault();
      this.setState({
        selectedIndex: -1,
        selectionMode: false,
        suggestions: []
      });
    }

    // When one of the terminating keys is pressed, add current query to the tags.
    // If no text is typed in so far, ignore the action - so we don't end up with a terminating
    // character typed in.
    if (this.props.delimeters.indexOf(e.keyCode) !== -1) {
      if (e.keyCode !== Keys.TAB || query !== '') {
        e.preventDefault();
      }

      if (query !== '') {
        if (this.state.selectionMode) {
          query = this.state.suggestions[this.state.selectedIndex];
        }
        this.addTag(query);
      }
    }

    // when backspace key is pressed and query is blank, delete tag
    if (e.keyCode === Keys.BACKSPACE && query === '' && this.props.allowDeleteFromEmptyInput) {
      this.handleDelete(this.props.tags.length - 1);
    }

    // up arrow
    if (e.keyCode === Keys.UP_ARROW) {
      e.preventDefault();
      selectedIndex = this.state.selectedIndex;
      // last item, cycle to the top
      if (selectedIndex <= 0) {
        this.setState({
          selectedIndex: this.state.suggestions.length - 1,
          selectionMode: true
        });
      } else {
        this.setState({
          selectedIndex: selectedIndex - 1,
          selectionMode: true
        });
      }
    }

    // down arrow
    if (e.keyCode === Keys.DOWN_ARROW) {
      e.preventDefault();
      this.setState({
        selectedIndex: (this.state.selectedIndex + 1) % suggestions.length,
        selectionMode: true
      });
    }
  }
  addTag(tag) {
    const input = this.refs.input;
    let matchTag = tag;

    if (this.props.autocomplete) {
      const possibleMatches = this.filteredSuggestions(tag, this.props.suggestions);

      if ( (this.props.autocomplete === 1 && possibleMatches.length === 1) ||
      this.props.autocomplete === true && possibleMatches.length) {
        matchTag = possibleMatches[0];
      }
    }

    // call method to add
    this.props.handleAddition(matchTag);

    // reset the state
    this.setState({
      query: '',
      selectionMode: false,
      selectedIndex: -1
    });

    // focus back on the input box
    input.value = '';
    input.focus();
  }
  handleSuggestionClick = (i) => {
    this.addTag(this.state.suggestions[i]);
  }
  handleSuggestionHover = (i) => {
    this.setState({
      selectedIndex: i,
      selectionMode: true
    });
  }
  render() {
    const tagItems = this.props.tags.map((tag, i) => {
      return (
        <Tag key={tag.id}
          tag={tag}
          labelField={this.props.labelField}
          onDelete={this.handleDelete.bind(this, i)}
          removeComponent={this.props.removeComponent}
          readOnly={this.props.readOnly} />
      );
    });

    // get the suggestions for the given query
    const query = this.state.query.trim();
    const selectedIndex = this.state.selectedIndex;
    const suggestions = this.state.suggestions;
    const placeholder = this.props.placeholder;

    const tagInput = !this.props.readOnly ? (
      <div className="ReactTags__tagInput">
        <input
          ref="input"
          type="text"
          placeholder={placeholder}
          aria-label={placeholder}
          onChange={this.handleChange}
          onKeyDown={this.handleKeyDown}/>
      </div>
    ) : null;

    return (
      <div className="ReactTags__tags">
      <div className="ReactTags__selected">
      {tagItems}
      {tagInput}
      </div>
      <Suggestions query={query}
      suggestions={suggestions}
      selectedIndex={selectedIndex}
      handleClick={this.handleSuggestionClick}
      handleHover={this.handleSuggestionHover}
      minQueryLength={this.props.minQueryLength}/>
      </div>
    );
  }
}

module.exports = ReactTagSelect;
