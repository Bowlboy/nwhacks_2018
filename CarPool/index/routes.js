Router.route('/index',  {
    template: 'index',
    name: 'index',
    title: 'INDEX',
    data: function() {
        // this.layout("mainlayout");
        $().ready(function() {
            $('html').removeClass('nav-open');
        });
    }

});