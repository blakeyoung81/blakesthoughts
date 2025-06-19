import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
	const blog = await getCollection('blog', ({ data }) => {
		return import.meta.env.PROD ? !data.draft : true;
	});
	
	return rss({
		title: 'Blake\'s Thoughts',
		description: 'Medical musings, code experiments, and poetry by Blake Young.',
		site: context.site,
		items: blog.map((post) => ({
			title: post.data.title,
			pubDate: post.data.pubDate,
			description: post.data.description,
			link: `/blog/${post.slug}/`,
		})),
		customData: `<language>en-us</language>`,
	});
}
