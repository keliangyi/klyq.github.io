import { defineConfig } from 'umi'

export default defineConfig({
	antd: false,
	hash: true,
	// base:"/gh-pages/",
	nodeModulesTransform: {
		type: 'none',
	},
	outputPath: 'build',
	// publicPath:"/gh-pages/",
	scripts: [
		`(function(){
			var redirect = sessionStorage.redirect;
			delete sessionStorage.redirect;
			if (redirect && redirect != location.href) {
				history.replaceState(null, null, redirect);
			}
		})();`,
	],
	proxy: {
		'/api': {
			target: 'http://192.168.1.250:9098/',
			changeOrigin: true,
			pathRewrite: { '^/': '' },
		},
	},
})
