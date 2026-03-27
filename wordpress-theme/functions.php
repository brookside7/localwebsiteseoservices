<?php

function lwss_setup() {
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
    add_theme_support('html5', array(
        'search-form',
        'comment-form',
        'comment-list',
        'gallery',
        'caption',
    ));

    register_nav_menus(array(
        'primary' => __('Primary Menu', 'lwss'),
        'footer' => __('Footer Menu', 'lwss'),
    ));
}
add_action('after_setup_theme', 'lwss_setup');

function lwss_enqueue_scripts() {
    wp_enqueue_style('lwss-style', get_stylesheet_uri(), array(), '1.0.0');
    wp_enqueue_script('lwss-main', get_template_directory_uri() . '/js/main.js', array(), '1.0.0', true);
}
add_action('wp_enqueue_scripts', 'lwss_enqueue_scripts');

function lwss_create_pages_on_activation() {
    $pages = array(
        'home' => array(
            'title' => 'Home',
            'template' => 'page-home.php'
        ),
        'about' => array(
            'title' => 'About',
            'template' => ''
        ),
        'services' => array(
            'title' => 'Services',
            'template' => 'page-services.php'
        ),
        'locations' => array(
            'title' => 'Locations',
            'template' => ''
        ),
        'contact' => array(
            'title' => 'Contact',
            'template' => 'page-contact.php'
        ),
        'pricing' => array(
            'title' => 'Pricing',
            'template' => ''
        ),
        'case-studies' => array(
            'title' => 'Case Studies',
            'template' => ''
        ),
    );

    foreach ($pages as $slug => $page_data) {
        $existing_page = get_page_by_path($slug);

        if (!$existing_page) {
            $page_id = wp_insert_post(array(
                'post_title' => $page_data['title'],
                'post_name' => $slug,
                'post_status' => 'publish',
                'post_type' => 'page',
                'post_content' => ''
            ));

            if ($page_data['template']) {
                update_post_meta($page_id, '_wp_page_template', $page_data['template']);
            }
        }
    }

    $homepage = get_page_by_path('home');
    if ($homepage) {
        update_option('page_on_front', $homepage->ID);
        update_option('show_on_front', 'page');
    }
}

function lwss_register_service_post_type() {
    $labels = array(
        'name' => 'Services',
        'singular_name' => 'Service',
        'add_new' => 'Add New',
        'add_new_item' => 'Add New Service',
        'edit_item' => 'Edit Service',
        'new_item' => 'New Service',
        'view_item' => 'View Service',
        'search_items' => 'Search Services',
        'not_found' => 'No services found',
        'not_found_in_trash' => 'No services found in Trash'
    );

    $args = array(
        'labels' => $labels,
        'public' => true,
        'has_archive' => true,
        'menu_icon' => 'dashicons-admin-tools',
        'supports' => array('title', 'editor', 'thumbnail', 'excerpt'),
        'rewrite' => array('slug' => 'services'),
    );

    register_post_type('service', $args);
}
add_action('init', 'lwss_register_service_post_type');

function lwss_register_location_post_type() {
    $labels = array(
        'name' => 'Locations',
        'singular_name' => 'Location',
        'add_new' => 'Add New',
        'add_new_item' => 'Add New Location',
        'edit_item' => 'Edit Location',
        'new_item' => 'New Location',
        'view_item' => 'View Location',
        'search_items' => 'Search Locations',
        'not_found' => 'No locations found',
        'not_found_in_trash' => 'No locations found in Trash'
    );

    $args = array(
        'labels' => $labels,
        'public' => true,
        'has_archive' => true,
        'menu_icon' => 'dashicons-location-alt',
        'supports' => array('title', 'editor', 'thumbnail', 'excerpt'),
        'rewrite' => array('slug' => 'locations'),
    );

    register_post_type('location', $args);
}
add_action('init', 'lwss_register_location_post_type');

function lwss_handle_contact_form() {
    if (isset($_POST['lwss_contact_form'])) {
        $name = sanitize_text_field($_POST['name']);
        $email = sanitize_email($_POST['email']);
        $phone = sanitize_text_field($_POST['phone']);
        $website = esc_url_raw($_POST['website']);
        $message = sanitize_textarea_field($_POST['message']);

        $to = get_option('admin_email');
        $subject = 'New Contact Form Submission from ' . $name;
        $body = "Name: $name\n";
        $body .= "Email: $email\n";
        $body .= "Phone: $phone\n";
        $body .= "Website: $website\n\n";
        $body .= "Message:\n$message";

        $headers = array('Content-Type: text/plain; charset=UTF-8');

        if (wp_mail($to, $subject, $body, $headers)) {
            wp_redirect(add_query_arg('contact', 'success', wp_get_referer()));
            exit;
        } else {
            wp_redirect(add_query_arg('contact', 'error', wp_get_referer()));
            exit;
        }
    }
}
add_action('admin_post_nopriv_lwss_contact', 'lwss_handle_contact_form');
add_action('admin_post_lwss_contact', 'lwss_handle_contact_form');

function lwss_register_tools_page() {
    add_menu_page(
        'SEO Tools',
        'SEO Tools',
        'read',
        'seo-tools',
        'lwss_tools_page_callback',
        'dashicons-chart-line',
        30
    );

    add_submenu_page(
        'seo-tools',
        'GBP Evaluator',
        'GBP Evaluator',
        'read',
        'gbp-evaluator',
        'lwss_gbp_tool_callback'
    );

    add_submenu_page(
        'seo-tools',
        'Instant Audit',
        'Instant Audit',
        'read',
        'instant-audit',
        'lwss_audit_tool_callback'
    );

    add_submenu_page(
        'seo-tools',
        'Landing Page Grader',
        'Landing Page Grader',
        'read',
        'landing-page-grader',
        'lwss_landing_page_tool_callback'
    );
}
add_action('admin_menu', 'lwss_register_tools_page');

function lwss_tools_page_callback() {
    echo '<div class="wrap">';
    echo '<h1>SEO Tools</h1>';
    echo '<p>Select a tool from the submenu to get started.</p>';
    echo '</div>';
}

function lwss_gbp_tool_callback() {
    include get_template_directory() . '/tools/gbp-evaluator.php';
}

function lwss_audit_tool_callback() {
    include get_template_directory() . '/tools/instant-audit.php';
}

function lwss_landing_page_tool_callback() {
    include get_template_directory() . '/tools/landing-page-grader.php';
}

function lwss_register_sidebars() {
    register_sidebar(array(
        'name' => __('Footer Column 1', 'lwss'),
        'id' => 'footer-1',
        'description' => __('Appears in the first column of the footer', 'lwss'),
        'before_widget' => '<div class="footer-widget">',
        'after_widget' => '</div>',
        'before_title' => '<h4>',
        'after_title' => '</h4>',
    ));

    register_sidebar(array(
        'name' => __('Footer Column 2', 'lwss'),
        'id' => 'footer-2',
        'description' => __('Appears in the second column of the footer', 'lwss'),
        'before_widget' => '<div class="footer-widget">',
        'after_widget' => '</div>',
        'before_title' => '<h4>',
        'after_title' => '</h4>',
    ));

    register_sidebar(array(
        'name' => __('Footer Column 3', 'lwss'),
        'id' => 'footer-3',
        'description' => __('Appears in the third column of the footer', 'lwss'),
        'before_widget' => '<div class="footer-widget">',
        'after_widget' => '</div>',
        'before_title' => '<h4>',
        'after_title' => '</h4>',
    ));

    register_sidebar(array(
        'name' => __('Footer Column 4', 'lwss'),
        'id' => 'footer-4',
        'description' => __('Appears in the fourth column of the footer', 'lwss'),
        'before_widget' => '<div class="footer-widget">',
        'after_widget' => '</div>',
        'before_title' => '<h4>',
        'after_title' => '</h4>',
    ));
}
add_action('widgets_init', 'lwss_register_sidebars');
