<?php get_header(); ?>

<main>
    <section class="section">
        <div class="container-narrow">
            <?php while (have_posts()) : the_post(); ?>
                <article>
                    <?php if (has_post_thumbnail()) : ?>
                        <div style="margin-bottom: 2rem;">
                            <?php the_post_thumbnail('large'); ?>
                        </div>
                    <?php endif; ?>

                    <h1><?php the_title(); ?></h1>

                    <div style="color: var(--text-light); margin-bottom: 1.5rem;">
                        <span>Published on <?php echo get_the_date(); ?></span>
                        <?php if (get_the_category()) : ?>
                            <span> | </span>
                            <span><?php the_category(', '); ?></span>
                        <?php endif; ?>
                    </div>

                    <div class="content">
                        <?php the_content(); ?>
                    </div>

                    <?php if (get_the_tags()) : ?>
                        <div style="margin-top: 2rem; padding-top: 2rem; border-top: 1px solid var(--border-light);">
                            <strong>Tags: </strong>
                            <?php the_tags('', ', ', ''); ?>
                        </div>
                    <?php endif; ?>
                </article>

                <div style="margin-top: 3rem;">
                    <?php
                    $prev_post = get_previous_post();
                    $next_post = get_next_post();
                    ?>
                    <?php if ($prev_post || $next_post) : ?>
                        <div style="display: flex; justify-content: space-between; gap: 1rem;">
                            <?php if ($prev_post) : ?>
                                <a href="<?php echo get_permalink($prev_post); ?>" class="btn btn-outline">← Previous Post</a>
                            <?php endif; ?>
                            <?php if ($next_post) : ?>
                                <a href="<?php echo get_permalink($next_post); ?>" class="btn btn-outline">Next Post →</a>
                            <?php endif; ?>
                        </div>
                    <?php endif; ?>
                </div>
            <?php endwhile; ?>
        </div>
    </section>
</main>

<?php get_footer(); ?>
