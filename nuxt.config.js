export default {
	// Global page headers: https://go.nuxtjs.dev/config-head
	head: {
		title: 'News Today | Nuxt Blog Concept',
		
		htmlAttrs: {
			lang: 'en'
		},
		
		meta: [
			{
				hid: 'description',
				name: 'description',
				content: 'Nuxt JS concept using Wordpress REST API. Designed and developed by Leonardo Funez'
			},
			{ charset:  'utf-8' },
			{ name:     'viewport',       content: 'width=device-width, initial-scale=1, user-scalable=no' },
			{ name:     'theme-color',    content: '#0138ff'},
			{ name:     'author',         content: 'Leonardo Funez' },
			{ property: 'og:title',       content: 'News Today | Nuxt Blog Concept' },
			{ property: 'og:description', content: 'Nuxt JS concept using Wordpress REST API. Designed and developed by Leonardo Funez' },
			{ property: 'og:type',        content: 'Website' },
			{ property: 'og:url',         content: 'https://news-today-nuxt.netlify.app' },
		],
		link: [
			{ rel: 'icon', type: 'image/png', href: '/favicons/32.png',  sizes: '32x32' },
			{ rel: 'icon', type: 'image/png', href: '/favicons/57.png',  sizes: '57x57' },
			{ rel: 'icon', type: 'image/png', href: '/favicons/76.png',  sizes: '76x76' },
			{ rel: 'icon', type: 'image/png', href: '/favicons/120.png', sizes: '120x120' },
			{ rel: 'icon', type: 'image/png', href: '/favicons/152.png', sizes: '152x152' },
			{ rel: 'icon', type: 'image/png', href: '/favicons/167.png', sizes: '167x167' },
			{ rel: 'icon', type: 'image/png', href: '/favicons/180.png', sizes: '180x180' },
			{ rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Oswald:wght@400;500;600&display=swap'}
		]
	},

	generate: {
		fallback: '404.html'
	},

	// Global CSS: https://go.nuxtjs.dev/config-css
	css: [
		'~/assets/css/normalize.css'
	],

	// Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
	plugins: [
	],

	// Auto import components: https://go.nuxtjs.dev/config-components
	components: true,

	// Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
	buildModules: [
		'@nuxtjs/composition-api/module',
	],

	// Modules: https://go.nuxtjs.dev/config-modules
	modules: [
		// https://go.nuxtjs.dev/axios
		'@nuxtjs/axios',
	],

	// Axios module configuration: https://go.nuxtjs.dev/config-axios
	axios: {},

	// Build Configuration: https://go.nuxtjs.dev/config-build
	build: {
	}
}
