(function(){
Template.__checkName("MasterLayout");
Template["MasterLayout"] = new Template("Template.MasterLayout", (function() {
  var view = this;
  return Spacebars.include(view.lookupTemplate("yield"));
}));

}).call(this);
