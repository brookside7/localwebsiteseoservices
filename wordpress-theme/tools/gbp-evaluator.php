<div class="wrap">
    <h1>Google Business Profile Evaluator</h1>
    <p>Rate your Google Business Profile optimization and get actionable recommendations.</p>

    <div class="wizard">
        <div id="checklistSection">
            <form id="gbpForm">
                <h2>Complete the checklist below</h2>
                <p>Check all items that apply to your Google Business Profile:</p>
                <div id="checklistItems"></div>
                <button type="submit" class="btn btn-primary btn-large">Calculate My Score</button>
            </form>
        </div>

        <div id="resultsSection" class="hidden">
            <div class="score-display">
                <div class="score-circle" id="gbpScoreCircle" style="--score: 0;">
                    <div class="score-inner">
                        <span id="gbpScore">0</span>
                    </div>
                </div>
                <h2 id="gbpScoreLabel">Your GBP Score</h2>
            </div>

            <h2>Priority Actions</h2>
            <div id="gbpActions"></div>

            <h2>Quick Wins (Do This Week)</h2>
            <div class="cards" id="quickWins"></div>

            <h2>30-Day Optimization Roadmap</h2>
            <div class="cards" id="roadmap"></div>

            <div style="margin-top: 2rem; text-align: center;">
                <a href="<?php echo esc_url(home_url('/contact/')); ?>" class="btn btn-primary btn-large">Get Professional Help</a>
            </div>
        </div>
    </div>
</div>

<script>
<?php include get_template_directory() . '/js/tools-gbp-evaluator.js'; ?>
</script>

<style>
.hidden { display: none; }
</style>
