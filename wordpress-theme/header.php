<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>

<header class="header">
    <div class="container">
        <div class="header-content">
            <div class="logo">
                <a href="<?php echo esc_url(home_url('/')); ?>">
                    <?php bloginfo('name'); ?>
                </a>
            </div>

            <button class="mobile-toggle" aria-label="Toggle navigation">
                ☰
            </button>

            <?php
            wp_nav_menu(array(
                'theme_location' => 'primary',
                'container' => 'nav',
                'container_class' => 'nav',
                'menu_class' => '',
                'fallback_cb' => 'lwss_fallback_menu',
            ));
            ?>
        </div>
    </div>
</header>

<?php
function lwss_fallback_menu() {
    echo '<nav class="nav">';
    echo '<a href="' . esc_url(home_url('/')) . '">Home</a>';
    echo '<a href="' . esc_url(home_url('/about/')) . '">About</a>';
    echo '<a href="' . esc_url(home_url('/services/')) . '">Services</a>';
    echo '<a href="' . esc_url(home_url('/locations/')) . '">Locations</a>';
    echo '<a href="' . esc_url(home_url('/pricing/')) . '">Pricing</a>';
    echo '<a href="' . esc_url(home_url('/case-studies/')) . '">Case Studies</a>';
    echo '<a href="' . esc_url(home_url('/blog/')) . '">Blog</a>';
    echo '<a href="' . esc_url(home_url('/contact/')) . '" class="btn btn-primary">Contact Us</a>';
    echo '</nav>';
}
?>
