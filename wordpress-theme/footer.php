<footer class="footer">
    <div class="container">
        <div class="footer-content">
            <?php if (is_active_sidebar('footer-1')) : ?>
                <div class="footer-column">
                    <?php dynamic_sidebar('footer-1'); ?>
                </div>
            <?php else : ?>
                <div class="footer-column">
                    <h4>About Us</h4>
                    <p>Local Website SEO Services specializes in helping businesses in Corona and Riverside dominate local search results.</p>
                </div>
            <?php endif; ?>

            <?php if (is_active_sidebar('footer-2')) : ?>
                <div class="footer-column">
                    <?php dynamic_sidebar('footer-2'); ?>
                </div>
            <?php else : ?>
                <div class="footer-column">
                    <h4>Services</h4>
                    <a href="<?php echo esc_url(home_url('/services/google-business-profile-optimization/')); ?>">Google Business Profile</a>
                    <a href="<?php echo esc_url(home_url('/services/on-page-local-seo/')); ?>">On-Page Local SEO</a>
                    <a href="<?php echo esc_url(home_url('/services/local-citations-nap-cleanup/')); ?>">Citations & NAP</a>
                    <a href="<?php echo esc_url(home_url('/services/review-reputation-system/')); ?>">Review Management</a>
                </div>
            <?php endif; ?>

            <?php if (is_active_sidebar('footer-3')) : ?>
                <div class="footer-column">
                    <?php dynamic_sidebar('footer-3'); ?>
                </div>
            <?php else : ?>
                <div class="footer-column">
                    <h4>Locations</h4>
                    <a href="<?php echo esc_url(home_url('/locations/corona-ca/')); ?>">Corona, CA</a>
                    <a href="<?php echo esc_url(home_url('/locations/riverside-ca/')); ?>">Riverside, CA</a>
                </div>
            <?php endif; ?>

            <?php if (is_active_sidebar('footer-4')) : ?>
                <div class="footer-column">
                    <?php dynamic_sidebar('footer-4'); ?>
                </div>
            <?php else : ?>
                <div class="footer-column">
                    <h4>Resources</h4>
                    <a href="<?php echo esc_url(home_url('/blog/')); ?>">Blog</a>
                    <a href="<?php echo esc_url(home_url('/case-studies/')); ?>">Case Studies</a>
                    <a href="<?php echo esc_url(home_url('/contact/')); ?>">Contact</a>
                </div>
            <?php endif; ?>
        </div>

        <div class="footer-bottom">
            <p>&copy; <?php echo date('Y'); ?> <?php bloginfo('name'); ?>. All rights reserved.</p>
        </div>
    </div>
</footer>

<?php wp_footer(); ?>
</body>
</html>
