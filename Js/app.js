$(window).on('scroll', () => {
    const currentY = this.window.scrollY;
    const headerState = (currentY !== 0)
        ? $('header').addClass('not_top')
        : $('header').removeClass('not_top');
    $('#visual').css('background-color', `rgba(0, 0, 0, ${(0.3 + currentY / 1100)})`);
    $('.cate_box').css('opacity', (currentY / 400 - .9));

    if (currentY >= 650) $('.category').addClass('show');
    else $('.category').removeClass('show');
});