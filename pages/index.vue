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
					type="medium"
				/>
			</section>
		<!-- .List Large -->

		<!-- Trending -->
			<section class="most-read">
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
					type="medium"
				/>
			</section>
		<!-- .List Medium -->
		
		<!-- More Top Stories -->
			<section>
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
						type="small"
					/>
				</div>
			</section>
		<!-- .More Top Stories -->
	</section>
<!-- **** .HOME **** -->
</template>

<script>
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
	},

	methods: {
		async getHomePosts() {
			try {
				const response = await APINews.getHomePosts();

				response.forEach(async (post, index) => {
					const category = await APINews.getCategoryById(post.categories[0]);
					const imageObj = post._embedded["wp:featuredmedia"][0];
					const newPost = {
						id: post.id,
						link: `/${category.slug}/${post.slug}`,
						title: post.title.rendered,
						category: category.name,
						category_slug: category.slug,
						thumbnail: (index < 10) ? imageObj.media_details.sizes["featured-thumbnail"].source_url : imageObj.media_details.sizes["medium-thumbnail"].source_url || imageObj.source_url
					};
					
					(index < 3) && (this.featuredPosts = [...this.featuredPosts, newPost]);
					(index > 2 && index < 9) && (this.listPosts = [...this.listPosts, newPost]);
					(index > 8 && index < 21) && (this.listPosts2 = [...this.listPosts2, newPost]);
					(index > 20 && index < 33) && (this.listPosts3 = [...this.listPosts3, newPost]);
				});
			} catch(err) {
				console.log(err)
			}
		},

		async getTendingPosts() {
			try {
				const response = await APINews.getTendingPosts();

				response.forEach(async post => {
					const category = await APINews.getCategoryById(post.categories[0]);
					const imageObj = post._embedded["wp:featuredmedia"][0];
					const newPost = {
						id: post.id,
						link: `/${category.slug}/${post.slug}`,
						title: post.title.rendered,
						category: category.name,
						category_slug: category.slug,
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
