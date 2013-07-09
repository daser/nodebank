require.config({
paths: {
jQuery: '/js/libs/jquery',
Underscore: '/js/libs/underscore',
Backbone: '/js/libs/backbone',
models: 'models',
text: '/js/libs/text',
templates: '../templates',

NignuxView: '/js/NignuxView'
},
shim: {
'Backbone': ['Underscore', 'jQuery'],
'Nignux': ['Backbone']
}
});
require(['Nignux'], function(Nignux) {
	Nignux.initialize();
});

