$(window).on('scroll', () => {

    const currentY = this.window.scrollY;
    const headerState = (currentY !== 0)
        ? $('header').addClass('scrolled')
        : $('header').removeClass('scrolled');
    
    $('#visual').css('background-color', `rgba(0, 0, 0, ${(currentY / 1000) + .2})`);

    const visualState = (currentY >= 650)
        ? $('.category').addClass('show')
        : $('.category').removeClass('show');

});