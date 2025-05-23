import { SectionTitle } from '../sectionTitle'
import { SmallCard } from '../posts/smalCard'
import { getArticles } from '@/services/getArticles'
import { AdBanner } from '../google'

const LatestNews = async () => {
	const { articles } = await getArticles({
		orderBy: 'createdAt_DESC',
		pageSize: 1000,
	})
	return (
		<div className=''>
			<SectionTitle title='Posts rescentes' />
			<div className='grid grid-cols-1 md:grid-cols-3 items-center justify-between gap-6 mt-3'>
				{/* Espaço para anúncio 3 */}
				<div className='md:col-span-1 p-1'>
					<AdBanner dataAdFormat='auto' dataAdSlot='9849617003' />
				</div>
				<ul className='md:col-span-2 overflow-y-scroll max-h-[768px] space-y-3 scrollbar-custom grid grid-cols-1 gap-2 lg:grid-cols-2'>
					{articles.map((article) => (
						<SmallCard
							key={article.id}
							title={article.title}
							coverImage={article.coverImage?.url || ''}
							description={article.description}
							slug={article.slug}
						/>
					))}
				</ul>
			</div>
		</div>
	)
}

export { LatestNews }
