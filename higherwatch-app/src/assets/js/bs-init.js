document.addEventListener('DOMContentLoaded',
	function () {

		let products = document.querySelectorAll('[data-bss-dynamic-product]');

		for (let product of products) {
			let param = product.dataset.bssDynamicProductParam;
			// eslint-disable-next-line no-restricted-globals
			product.dataset.reflowProduct = new URL(location.href).searchParams.get(param)
		}

	},
	false);