var React = require('react');

var Tag = React.createClass({
  propTypes: {
      labelField: React.PropTypes.string,
      onDelete: React.PropTypes.func.isRequired,
      tag: React.PropTypes.object.isRequired,
      removeComponent: React.PropTypes.func
  },
  getDefaultProps: function() {
      return {
          labelField: 'text'
      };
  },
  render: function(){
      var label = this.props.tag[this.props.labelField];
      var { readOnly } = this.props;
      var CustomRemoveComponent = this.props.removeComponent;
      var RemoveComponent = React.createClass({
        render: function() {
          if (readOnly) {
              return <span/>;
          }

          if (CustomRemoveComponent) {
            return <CustomRemoveComponent {...this.props} />;
          }
          return <a {...this.props}>x</a>;
        }
      });

      return (
          <span className="ReactTags__tag">
              <RemoveComponent className="ReactTags__remove"
                     onClick={this.props.onDelete} />
              <span className="ReactTags-label">{label}</span>
          </span>
      );
  }
});

module.exports = Tag;
