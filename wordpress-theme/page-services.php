<?php
/*
Template Name: Services Page
*/
get_header();
?>

<main>
    <section class="hero">
        <div class="container">
            <h1>Local SEO Services</h1>
            <p>Comprehensive local search optimization to help your business get found by customers in Corona and Riverside.</p>
        </div>
    </section>

    <section class="section">
        <div class="container">
            <h2 class="text-center">Our Services</h2>
            <div class="cards">
                <div class="card">
                    <div class="card-icon">🗺️</div>
                    <h3>Google Business Profile Optimization</h3>
                    <p>Complete optimization of your Google Business Profile to dominate Google Maps and local search results.</p>
                    <ul>
                        <li>Profile setup and verification</li>
                        <li>Category optimization</li>
                        <li>Post management</li>
                        <li>Photo optimization</li>
                        <li>Review management</li>
                    </ul>
                    <a href="<?php echo esc_url(home_url('/services/google-business-profile-optimization/')); ?>" class="btn btn-primary">Learn More</a>
                </div>

                <div class="card">
                    <div class="card-icon">📄</div>
                    <h3>On-Page Local SEO</h3>
                    <p>Optimize your website content and structure for local search visibility.</p>
                    <ul>
                        <li>Title and meta tag optimization</li>
                        <li>Local schema markup</li>
                        <li>Location-specific content</li>
                        <li>Internal linking strategy</li>
                        <li>Keyword optimization</li>
                    </ul>
                    <a href="<?php echo esc_url(home_url('/services/on-page-local-seo/')); ?>" class="btn btn-primary">Learn More</a>
                </div>

                <div class="card">
                    <div class="card-icon">📋</div>
                    <h3>Local Citations & NAP Cleanup</h3>
                    <p>Build consistent citations and fix NAP inconsistencies across the web.</p>
                    <ul>
                        <li>Citation building</li>
                        <li>NAP consistency audit</li>
                        <li>Duplicate listing cleanup</li>
                        <li>Directory submissions</li>
                        <li>Data aggregator management</li>
                    </ul>
                    <a href="<?php echo esc_url(home_url('/services/local-citations-nap-cleanup/')); ?>" class="btn btn-primary">Learn More</a>
                </div>

                <div class="card">
                    <div class="card-icon">⭐</div>
                    <h3>Review & Reputation Management</h3>
                    <p>Generate positive reviews and manage your online reputation.</p>
                    <ul>
                        <li>Review generation system</li>
                        <li>Review monitoring</li>
                        <li>Response management</li>
                        <li>Reputation repair</li>
                        <li>Review widget setup</li>
                    </ul>
                    <a href="<?php echo esc_url(home_url('/services/review-reputation-system/')); ?>" class="btn btn-primary">Learn More</a>
                </div>

                <div class="card">
                    <div class="card-icon">⚙️</div>
                    <h3>Technical SEO</h3>
                    <p>Fix technical issues that prevent search engines from ranking your site.</p>
                    <ul>
                        <li>Site speed optimization</li>
                        <li>Mobile optimization</li>
                        <li>Crawl error fixes</li>
                        <li>XML sitemap setup</li>
                        <li>HTTPS implementation</li>
                    </ul>
                    <a href="<?php echo esc_url(home_url('/services/technical-seo/')); ?>" class="btn btn-primary">Learn More</a>
                </div>

                <div class="card">
                    <div class="card-icon">🤖</div>
                    <h3>Generative Engine Optimization (GEO)</h3>
                    <p>Optimize for AI search tools and prepare for the future of search.</p>
                    <ul>
                        <li>AI search optimization</li>
                        <li>Structured data enhancement</li>
                        <li>Content formatting for AI</li>
                        <li>Entity relationship building</li>
                        <li>Authority establishment</li>
                    </ul>
                    <a href="<?php echo esc_url(home_url('/services/generative-engine-optimization-geo/')); ?>" class="btn btn-primary">Learn More</a>
                </div>
            </div>
        </div>
    </section>

    <section class="section section-gray">
        <div class="container">
            <h2 class="text-center">Why Choose Our Local SEO Services?</h2>
            <div class="cards">
                <div class="card">
                    <h3>Transparent Pricing</h3>
                    <p>No hidden fees or surprise charges. Clear monthly pricing with detailed breakdown of services included.</p>
                </div>
                <div class="card">
                    <h3>Monthly Reporting</h3>
                    <p>Detailed reports showing rankings, traffic, calls, and ROI. You'll always know exactly what you're getting.</p>
                </div>
                <div class="card">
                    <h3>Local Expertise</h3>
                    <p>We specialize in Corona and Riverside markets. We understand local competition and search behavior.</p>
                </div>
                <div class="card">
                    <h3>Proven Results</h3>
                    <p>Track record of helping local businesses increase visibility, generate calls, and grow revenue.</p>
                </div>
            </div>
        </div>
    </section>

    <section class="section">
        <div class="container text-center">
            <h2>Ready to Get Started?</h2>
            <p style="font-size: 1.125rem;">Get your free local SEO analysis and custom strategy.</p>
            <a href="<?php echo esc_url(home_url('/contact/')); ?>" class="btn btn-primary btn-large">Get Free Analysis</a>
        </div>
    </section>
</main>

<?php get_footer(); ?>
