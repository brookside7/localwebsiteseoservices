<?php
/*
Template Name: Home Page
*/
get_header();
?>

<main>
    <section class="hero">
        <div class="container">
            <h1>Corona & Riverside Local SEO That Actually Gets You Found</h1>
            <p>Generate qualified calls and leads from Google Maps and local search with proven local SEO strategies, transparent tracking, and detailed reporting.</p>

            <div class="hero-cta">
                <h3 style="color: var(--text-dark);">Get Your Free Local SEO Analysis</h3>
                <form method="post" action="<?php echo esc_url(admin_url('admin-post.php')); ?>">
                    <input type="hidden" name="action" value="lwss_contact">
                    <input type="hidden" name="lwss_contact_form" value="1">
                    <div class="form-group">
                        <input type="text" name="name" placeholder="Your Name" required>
                    </div>
                    <div class="form-group">
                        <input type="email" name="email" placeholder="Your Email" required>
                    </div>
                    <div class="form-group">
                        <input type="tel" name="phone" placeholder="Your Phone" required>
                    </div>
                    <div class="form-group">
                        <input type="url" name="website" placeholder="Your Website" required>
                    </div>
                    <button type="submit" class="btn btn-secondary btn-large" style="width: 100%;">Get Free Analysis</button>
                </form>
            </div>
        </div>
    </section>

    <section class="section">
        <div class="container">
            <h2 class="text-center">Why Local Businesses Choose Us</h2>
            <div class="cards">
                <div class="card">
                    <div class="card-icon">📍</div>
                    <h3>Local Market Experts</h3>
                    <p>We specialize in Corona and Riverside markets. We know the local search landscape, your competitors, and what it takes to rank in your area.</p>
                </div>
                <div class="card">
                    <div class="card-icon">📊</div>
                    <h3>Transparent Reporting</h3>
                    <p>No black box tactics. Get clear monthly reports showing your rankings, traffic, calls, and leads generated from local search.</p>
                </div>
                <div class="card">
                    <div class="card-icon">🎯</div>
                    <h3>Results-Focused</h3>
                    <p>We don't just increase rankings. We focus on what matters: qualified phone calls, form submissions, and real business growth.</p>
                </div>
                <div class="card">
                    <div class="card-icon">🛠️</div>
                    <h3>Complete Local SEO</h3>
                    <p>From Google Business Profile to on-page SEO, citations, reviews, and technical fixes - we handle everything to dominate local search.</p>
                </div>
            </div>
        </div>
    </section>

    <section class="section section-gray">
        <div class="container">
            <h2 class="text-center">Our Local SEO Process</h2>
            <p class="text-center">A proven system to get your business found by local customers</p>
            <div class="steps">
                <div class="step">
                    <div class="step-number">1</div>
                    <h3>Audit & Analysis</h3>
                    <p>We analyze your current online presence, identify gaps, and create a custom strategy for your market.</p>
                </div>
                <div class="step">
                    <div class="step-number">2</div>
                    <h3>Optimization</h3>
                    <p>Fix technical issues, optimize your Google Business Profile, build citations, and enhance your website for local search.</p>
                </div>
                <div class="step">
                    <div class="step-number">3</div>
                    <h3>Content & Authority</h3>
                    <p>Create location-specific content, earn local links, and establish your business as the authority in your area.</p>
                </div>
                <div class="step">
                    <div class="step-number">4</div>
                    <h3>Ongoing Growth</h3>
                    <p>Monitor rankings, track results, manage reviews, and continuously improve to stay ahead of competitors.</p>
                </div>
            </div>
        </div>
    </section>

    <section class="section">
        <div class="container">
            <h2 class="text-center">Our Local SEO Services</h2>
            <div class="cards">
                <div class="card">
                    <h3>Google Business Profile Optimization</h3>
                    <p>Complete setup, optimization, and management of your Google Business Profile to maximize visibility in Google Maps and local search.</p>
                    <a href="<?php echo esc_url(home_url('/services/google-business-profile-optimization/')); ?>" class="btn btn-outline">Learn More</a>
                </div>
                <div class="card">
                    <h3>On-Page Local SEO</h3>
                    <p>Optimize your website content, meta tags, schema markup, and internal linking for maximum local search visibility.</p>
                    <a href="<?php echo esc_url(home_url('/services/on-page-local-seo/')); ?>" class="btn btn-outline">Learn More</a>
                </div>
                <div class="card">
                    <h3>Local Citations & NAP Cleanup</h3>
                    <p>Build consistent citations across directories and fix NAP inconsistencies that hurt your local rankings.</p>
                    <a href="<?php echo esc_url(home_url('/services/local-citations-nap-cleanup/')); ?>" class="btn btn-outline">Learn More</a>
                </div>
                <div class="card">
                    <h3>Review & Reputation Management</h3>
                    <p>Generate more reviews, respond professionally, and build a 5-star reputation that converts searchers into customers.</p>
                    <a href="<?php echo esc_url(home_url('/services/review-reputation-system/')); ?>" class="btn btn-outline">Learn More</a>
                </div>
                <div class="card">
                    <h3>Technical SEO</h3>
                    <p>Fix site speed, mobile issues, crawl errors, and technical problems that prevent search engines from ranking you.</p>
                    <a href="<?php echo esc_url(home_url('/services/technical-seo/')); ?>" class="btn btn-outline">Learn More</a>
                </div>
                <div class="card">
                    <h3>Generative Engine Optimization (GEO)</h3>
                    <p>Prepare your business for AI search tools like ChatGPT, Perplexity, and Google's AI Overview results.</p>
                    <a href="<?php echo esc_url(home_url('/services/generative-engine-optimization-geo/')); ?>" class="btn btn-outline">Learn More</a>
                </div>
            </div>
        </div>
    </section>

    <section class="proof-block">
        <div class="container">
            <h2>Proven Results for Local Businesses</h2>
            <div class="trust-indicators">
                <div class="trust-item">
                    <strong>150+</strong>
                    <p>Local Businesses Served</p>
                </div>
                <div class="trust-item">
                    <strong>87%</strong>
                    <p>Average Increase in Local Traffic</p>
                </div>
                <div class="trust-item">
                    <strong>3x</strong>
                    <p>Average Growth in Phone Calls</p>
                </div>
            </div>
        </div>
    </section>

    <section class="section">
        <div class="container">
            <h2 class="text-center">Frequently Asked Questions</h2>
            <div class="faq-list">
                <div class="faq-item">
                    <button class="faq-question">
                        How long does it take to see results from local SEO?
                        <span class="faq-icon">▼</span>
                    </button>
                    <div class="faq-answer">
                        <p>Most businesses start seeing improvements in 30-60 days, with significant results in 3-6 months. Quick wins like Google Business Profile optimization can show results faster, while competitive keyword rankings take longer.</p>
                    </div>
                </div>

                <div class="faq-item">
                    <button class="faq-question">
                        Do you guarantee first page rankings?
                        <span class="faq-icon">▼</span>
                    </button>
                    <div class="faq-answer">
                        <p>We focus on qualified traffic and leads, not just rankings. While we can't guarantee specific positions, we do guarantee transparent reporting, consistent work, and data-driven strategies proven to improve local visibility.</p>
                    </div>
                </div>

                <div class="faq-item">
                    <button class="faq-question">
                        What makes local SEO different from regular SEO?
                        <span class="faq-icon">▼</span>
                    </button>
                    <div class="faq-answer">
                        <p>Local SEO focuses on proximity, Google Business Profile, local citations, and location-specific content. It targets "near me" searches and Google Maps results, which require different strategies than national SEO.</p>
                    </div>
                </div>

                <div class="faq-item">
                    <button class="faq-question">
                        How much does local SEO cost?
                        <span class="faq-icon">▼</span>
                    </button>
                    <div class="faq-answer">
                        <p>Pricing depends on your market competitiveness, current website state, and goals. Most local businesses invest between $1,000-$3,000 per month. We'll provide a custom quote after analyzing your specific situation.</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section class="section section-gray">
        <div class="container text-center">
            <h2>Ready to Dominate Local Search?</h2>
            <p style="font-size: 1.125rem;">Get your free local SEO analysis and see exactly what's holding you back from ranking on Google Maps.</p>
            <a href="<?php echo esc_url(home_url('/contact/')); ?>" class="btn btn-primary btn-large">Get Your Free Analysis</a>
        </div>
    </section>
</main>

<?php get_footer(); ?>
