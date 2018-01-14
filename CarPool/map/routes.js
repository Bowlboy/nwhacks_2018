Router.route('/map',  {
    template: 'map',
    name: 'map',
    title: 'MAP',
    data: function() {
        // this.layout("mainlayout");
        $().ready(function() {
            $('html').removeClass('nav-open');
        });
    }

});