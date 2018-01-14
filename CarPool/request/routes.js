Router.route('/request',  {
    template: 'request',
    name: 'request',
    title: 'REQUEST',
    data: function() {
        $().ready(function() {
            $('html').removeClass('nav-open');
        });
    }
});