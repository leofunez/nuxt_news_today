<template>
<!-- **** HOME **** -->
	<section class="page">
		<!-- Featured -->
			<section class="featured-block">
				<PostCard
					v-for="(post, index) in featuredPosts"
					:key="`${post.id}-${index}`"
					:title="post.title"
					:thumbnail="post.thumbnail"
					:link="post.link"
					:category="post.category"
					:category_slug="post.category_slug"
					:video_field="post.video_field"
					:type="index === 0 ? 'featured post-card--featured-main' : 'featured post-card--featured-list'"
				/>
			</section>
		<!-- .Featured -->
		
		<!-- List Large -->
			<section class="list-block">
				<PostCard
					v-for="(post, index) in listPosts"
					:key="`${post.id}-${index}`"
					:title="post.title"
					:thumbnail="post.thumbnail"
					:link="post.link"
					:category="post.category"
					:category_slug="post.category_slug"
					:video_field="post.video_field"
					type="medium"
				/>
			</section>
		<!-- .List Large -->

		<!-- Trending -->
			<section class="most-read" v-if="trendingPosts.length > 0">
    			<h2 class="section-title" v-text="'Trending'"></h2>
    
    			<div class="most-read__posts">
					<PostCount
						v-for="(post, index) in trendingPosts"
						:key="`${post.id}-${index}`"
						:number="index+1"
						:title="post.title"
						:thumbnail="post.thumbnail"
						:link="post.link"
					/>
				</div>
			</section>
		<!-- .Trending -->
		
		<!-- List Medium -->
			<section class="list-block list-block--medium">
				<PostCard
					v-for="(post, index) in listPosts2"
					:key="`${post.id}-${index}`"
					:title="post.title"
					:thumbnail="post.thumbnail"
					:link="post.link"
					:category="post.category"
					:category_slug="post.category_slug"
					:video_field="post.video_field"
					type="medium"
				/>
			</section>
		<!-- .List Medium -->
		
		<!-- More Top Stories -->
			<section v-if="listPosts3.length > 0">
				<h2 class="section-title" v-text="'More top stories'"></h2>
				<div class="list-block list-block--small">
					<PostCard
						v-for="(post, index) in listPosts3"
						:key="`${post.id}-${index}`"
						:title="post.title"
						:thumbnail="post.thumbnail"
						:link="post.link"
						:category="post.category"
						:category_slug="post.category_slug"
						:video_field="post.video_field"
						type="small"
					/>
				</div>
			</section>
		<!-- .More Top Stories -->
	</section>
<!-- **** .HOME **** -->
</template>

<script>
import { mapActions } from "vuex";
import APINews from "@/api/api";
import PostCard from "@/components/PostCard";
import PostCount from "@/components/PostCount";

export default {
	components: {
        PostCard,
		PostCount
    },

	data() {
		return {
			featuredPosts: [],
			listPosts: [],
			listPosts2: [],
			listPosts3: [],
			trendingPosts: []
		}
	},

	created() {
		this.getHomePosts();
		this.getTendingPosts();
		this.SET_IS_LOADING(true);
	},

	methods: {
		...mapActions(["SET_IS_LOADING"]),

		async getHomePosts() {
			try {
				const response = await APINews.getHomePosts();

				response.forEach(async (post, index) => {
					const category = post._embedded["wp:term"][0][0];
					const imageObj = post._embedded["wp:featuredmedia"][0];
					const videoField = post?.ACF?.video_url;
					const newPost = {
						id: post.id,
						link: `/${category.slug}/${post.slug}`,
						title: post.title.rendered,
						category: category.name,
						category_slug: category.slug,
						video_field: videoField,
						thumbnail: (index < 10) ? imageObj.media_details.sizes["featured-thumbnail"].source_url : imageObj.media_details.sizes["medium-thumbnail"].source_url || imageObj.source_url
					};
					
					(index < 3) && (this.featuredPosts = [...this.featuredPosts, newPost]);
					(index > 2 && index < 9) && (this.listPosts = [...this.listPosts, newPost]);
					(index > 8 && index < 21) && (this.listPosts2 = [...this.listPosts2, newPost]);
					(index > 20 && index < 33) && (this.listPosts3 = [...this.listPosts3, newPost]);
				});

				setTimeout(() => this.SET_IS_LOADING(false), 500);
			} catch(err) {
				console.log(err)
			}
		},

		async getTendingPosts() {
			try {
				const response = await APINews.getTendingPosts();

				response.forEach(async post => {
					const category = post._embedded["wp:term"][0][0];
					const imageObj = post._embedded["wp:featuredmedia"][0];
					const newPost = {
						id: post.id,
						link: `/${category.slug}/${post.slug}`,
						title: post.title.rendered,
						thumbnail: imageObj.media_details.sizes["small-thumbnail"].source_url || imageObj.source_url
					};
					
					this.trendingPosts = [...this.trendingPosts, newPost];
				});
			} catch(err) {
				console.log(err)
			}
		}
	}
}
</script>

<style lang="scss">
	// Featured Posts Block
		.featured-block {
			display: grid;
			grid-gap: 2px;
			grid-template-columns: 1fr 260px 260px;
			margin-bottom: 60px;
			min-height: 450px;

			@media screen and (max-width: 1000px) {
				grid-template-columns: 1fr 1fr;
				grid-template-rows: [main-post]1fr [list-posts] max-content;
				grid-gap: 30px;
				position: relative;
				padding: 15px 0 0;
			}

			@media screen and (max-width: 768px) {
				grid-template-columns: 1fr;
            	grid-template-rows: 1fr;
			}
		}
	// .Featured Posts Block

	// Most Read
		.most-read {
			margin-bottom: 140px;

			&__posts {
				column-count: 3;
				column-gap: 60px;

				@media screen and (max-width: 1000px) {
					column-count: 2;
				}
			}

			@media screen and (max-width: 768px) {
				margin-bottom: 100px;

				&__posts {
					display: grid;
				}
			}

			@media screen and (max-width: 480px) {
				margin-bottom: 80px;

				&__title {
					font-size: 24px;
				}
			}
		}
	// .Most Read

	// List Block
        .list-block {
			display: grid;
            grid-gap: 60px 30px;
            grid-template-columns: repeat(auto-fill, minmax(396px, 1fr));
            margin-bottom: 140px;

            &--medium,
            &--small {
                grid-template-columns: repeat(auto-fill, minmax(290px, 1fr));
            }

            &--small {
                grid-gap: 30px;
            }

            &--section {
                margin-bottom: 60px;
            }

			@media screen and (max-width: 768px) {
				margin-bottom: 100px;
			}

			@media screen and (max-width: 480px) {
				grid-gap: 30px;
				margin-bottom: 80px;
			}
        }
    // .List Block
</style>