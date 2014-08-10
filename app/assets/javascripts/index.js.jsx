/**
 * @jsx React.DOM
 */
  
var token = $( 'meta[name="csrf-token"]' ).attr( 'content' );
 
$.ajaxSetup( {
  beforeSend: function ( xhr ) {
    xhr.setRequestHeader( 'X-CSRF-Token', token );
  }
});

var HomeView = React.createClass({
  render : function() {
    var x = this.state.blogs.map(function(d){
      return <li key={"blogs_" + d.id}><a href={"#/blogs/" + d.id}>{d.name}</a></li>
    });
    return (
      <div>
      <p>{this.props.message}</p>
      <a href="#/blogs/new">New Blog</a>
      <br />
      <h3>All Blogs:</h3>
      <ul>{x}</ul>
      </div>
    );
  }
});



var NewBlogView = React.createClass({   
  handleSubmit: function(){
    var name = this.refs.name.getDOMNode().value.trim();
    $.ajax({
        url: '/blogs',
        dataType: 'json',
        type: 'POST',
        data: { 'blog': {'name': name} },
        success: function(data) {
          r.message = data.message;
          r.navigate('/', {trigger: true});
        }.bind(this)       
      });
    return false;
  },
  render : function() {
    return (
      <div>     
      <form onSubmit={this.handleSubmit}>
        <label>Name</label><br/>
        <input type="text" name="name" id="name" ref="name" /><br/>
        <input type="submit" value="Create Blog" />
      </form>
      <a href="/">Home</a>
      </div>
    );
  }
});
 
var Router = Backbone.Router.extend({
  message: '',
  routes : {
    "" : "index",
    "blogs/new" : "new_blog",
  },
  index : function() {
    var self = this;
    React.renderComponent(
      <HomeView message={self.message}/>,
      document.getElementById('new-blog')
    );
  },
  new_blog : function() {
    React.renderComponent(
      <NewBlogView message={self.message}/>,
      document.getElementById('new-blog')
    );
  }
});
 
var r = new Router();

Backbone.history.start();