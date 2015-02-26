Router.configure({
	layoutTemplate: 'layout',
	loadingTemplate: 'loading'
});

Router.route('/login', {name: 'loginForm'});
Router.route('/register', {name: 'registerForm'});
Router.route('/match', {name: 'match'});
Router.route('/', {name: 'usersList'});