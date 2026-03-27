<?php
/*
Template Name: Contact Page
*/
get_header();
?>

<main>
    <section class="section">
        <div class="container-narrow">
            <h1 class="text-center">Contact Us</h1>
            <p class="text-center">Ready to grow your local business? Get in touch for a free consultation and local SEO analysis.</p>

            <?php if (isset($_GET['contact']) && $_GET['contact'] == 'success') : ?>
                <div class="alert alert-success">
                    <strong>Thank you!</strong> Your message has been sent. We'll get back to you within 24 hours.
                </div>
            <?php endif; ?>

            <?php if (isset($_GET['contact']) && $_GET['contact'] == 'error') : ?>
                <div class="alert alert-info">
                    <strong>Oops!</strong> There was an error sending your message. Please try again or email us directly.
                </div>
            <?php endif; ?>

            <div class="card" style="max-width: 600px; margin: 2rem auto;">
                <form method="post" action="<?php echo esc_url(admin_url('admin-post.php')); ?>">
                    <input type="hidden" name="action" value="lwss_contact">
                    <input type="hidden" name="lwss_contact_form" value="1">

                    <div class="form-group">
                        <label for="name">Name *</label>
                        <input type="text" id="name" name="name" required>
                    </div>

                    <div class="form-group">
                        <label for="email">Email *</label>
                        <input type="email" id="email" name="email" required>
                    </div>

                    <div class="form-group">
                        <label for="phone">Phone *</label>
                        <input type="tel" id="phone" name="phone" required>
                    </div>

                    <div class="form-group">
                        <label for="website">Website</label>
                        <input type="url" id="website" name="website" placeholder="https://yourwebsite.com">
                    </div>

                    <div class="form-group">
                        <label for="message">Message *</label>
                        <textarea id="message" name="message" rows="5" required></textarea>
                    </div>

                    <button type="submit" class="btn btn-primary btn-large" style="width: 100%;">
                        Send Message
                    </button>
                </form>
            </div>

            <div class="text-center" style="margin-top: 3rem;">
                <h3>Other Ways to Reach Us</h3>
                <p><strong>Email:</strong> <?php echo antispambot(get_option('admin_email')); ?></p>
                <p><strong>Serving:</strong> Corona, CA | Riverside, CA | Inland Empire</p>
            </div>
        </div>
    </section>

    <section class="section section-gray">
        <div class="container">
            <h2 class="text-center">What Happens Next?</h2>
            <div class="steps">
                <div class="step">
                    <div class="step-number">1</div>
                    <h3>We'll Review Your Business</h3>
                    <p>We analyze your current online presence and identify opportunities</p>
                </div>
                <div class="step">
                    <div class="step-number">2</div>
                    <h3>Free Consultation</h3>
                    <p>We'll discuss your goals and create a custom local SEO strategy</p>
                </div>
                <div class="step">
                    <div class="step-number">3</div>
                    <h3>Get Your Proposal</h3>
                    <p>Receive a detailed plan with pricing, timeline, and expected results</p>
                </div>
                <div class="step">
                    <div class="step-number">4</div>
                    <h3>Start Growing</h3>
                    <p>We begin optimizing your presence and generating local leads</p>
                </div>
            </div>
        </div>
    </section>
</main>

<?php get_footer(); ?>
