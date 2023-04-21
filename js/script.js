/*---------------------------
        Testimonial Slider
        ---------------------------*/
        $(document).ready(function(){

          $(".review-slider").slick({
            slidesToShow: 3,
            loop: true,
            arrows: true,
            autoplay: false,
            autoplayTimeout: 5000,
            pauseOnFocus: false,
            pauseOnHover: false,
           prevArrow:'.priv-arrow',
           nextArrow:'.next-arrow',
            responsive: [
              {
                breakpoint: 992,
                settings: {
                  slidesToShow: 2,
                },
              },
              {
                breakpoint: 576,
                settings: {
                  slidesToShow: 1,
                },
              },
            ],
          });
      });
