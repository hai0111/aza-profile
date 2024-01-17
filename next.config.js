const path = require('path')

/** @type {import('next').NextConfig} */
const nextConfig = {
	sassOptions: {
		includePaths: [path.join(__dirname, '/')],
	},
	images: {
		remotePatterns: [
			{
				hostname: '**',
			},
		],
	},
}

module.exports = nextConfig
