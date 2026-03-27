<?php get_header(); ?>

<main>
    <section class="hero">
        <div class="container">
            <h1><?php the_archive_title(); ?></h1>
            <?php if (is_category() || is_tag()) : ?>
                <p><?php echo term_description(); ?></p>
            <?php endif; ?>
        </div>
    </section>

    <section class="section">
        <div class="container">
            <?php if (have_posts()) : ?>
                <div class="cards">
                    <?php while (have_posts()) : the_post(); ?>
                        <article class="card">
                            <?php if (has_post_thumbnail()) : ?>
                                <a href="<?php the_permalink(); ?>">
                                    <?php the_post_thumbnail('medium'); ?>
                                </a>
                            <?php endif; ?>
                            <h3>
                                <a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
                            </h3>
                            <div style="color: var(--text-light); font-size: 0.9rem; margin-bottom: 0.5rem;">
                                <?php echo get_the_date(); ?>
                            </div>
                            <p><?php the_excerpt(); ?></p>
                            <a href="<?php the_permalink(); ?>" class="btn btn-outline">Read More</a>
                        </article>
                    <?php endwhile; ?>
                </div>

                <div style="margin-top: 3rem;">
                    <?php the_posts_pagination(array(
                        'mid_size' => 2,
                        'prev_text' => '← Previous',
                        'next_text' => 'Next →',
                    )); ?>
                </div>
            <?php else : ?>
                <p>No posts found.</p>
            <?php endif; ?>
        </div>
    </section>
</main>

<?php get_footer(); ?>
