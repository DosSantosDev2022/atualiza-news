import { AdBanner } from '@/components/global/google'
import { CardSimple } from '@/components/global/posts/cardSimple'
import { SectionTitle } from '@/components/global/sectionTitle'
import { Pagination } from '@/components/ui'
import { getArticles } from '@/services/getArticles'
import type { Metadata } from 'next'

interface SearchResultsPageParms {
	searchParams: Promise<{ query: string | undefined; page: string }>
}

const dominio = 'https://www.ontech.blog/'

export async function generateMetadata({
	searchParams,
}: SearchResultsPageParms): Promise<Metadata> {
	const { query } = await searchParams
	const title = query
		? `Resultados da busca por "${query}" |onTech Blog`
		: 'onTech Blog'
	const description = query
		? `Veja os artigos encontrados relacionados a "${query}"`
		: 'Pesquise por artigos no blog.'

	return {
		title,
		description,
		openGraph: {
			title,
			description,
			url: query
				? `${dominio}busca?query=${encodeURIComponent(query)}`
				: `${dominio}`,
		},
	}
}

export default async function SearchResultsPage({
	searchParams,
}: SearchResultsPageParms) {
	const { query } = await searchParams
	const currentPage = Number((await searchParams).page || 1)
	const pageSize = 10
	const { articles, totalCount } = await getArticles({
		where: 'search',
		search: query,
		pageSize,
		page: currentPage,
	})

	const hasResults = articles && articles.length > 0

	return (
		<div className='container mx-auto py-8 px-4 sm:px-6 lg:px-8 lg:mt-24 mt-8'>
			<SectionTitle title={`Resultados da Busca para: "${query}"`} />
			<div className='mb-6'> </div>

			<div className='mb-8 flex flex-col items-start  p-4'>
				<p className='text-sm text-gray-500 mb-2 space-y-2'>Anúncio</p>
				<div className='flex flex-col gap-4 w-full'>
					<AdBanner dataAdFormat='auto' dataAdSlot='9849617003' />
				</div>
			</div>

			{hasResults ? (
				<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8 mt-6'>
					{articles.map((article, index) => (
						<CardSimple
							id={article.id}
							title={article.title || ''}
							slug={article.slug || ''}
							coverImage={article.coverImage?.url || ''}
							createdAt={article.createdAt || ''}
							alt={article.title || ''}
							key={article.id}
							authorImage={article.author.image.url || ''}
							authorName={article.author.name}
						/>
					))}
				</div>
			) : (
				<p className='mt-6 text-lg text-gray-700 text-center'>
					Nenhum resultado encontrado para a sua busca.
				</p>
			)}

			<div className='w-full flex items-center gap-3 justify-start px-2 py-3 mt-10'>
				<span className='font-light text-muted-foreground'>
					Mostrando{' '}
					{Math.min(pageSize, totalCount - (currentPage - 1) * pageSize)}{' '}
					de {totalCount}
				</span>
				<Pagination
					page={currentPage}
					limit={pageSize}
					total={totalCount}
				/>
			</div>
			{/* anúncio horizontal 2 */}
			<div className='mb-8 flex flex-col items-start  p-4'>
				<p className='text-sm text-gray-500 mb-2 space-y-2'>Anúncio</p>
				<div className='flex flex-col gap-4 w-full'>
					<AdBanner dataAdFormat='auto' dataAdSlot='9849617003' />
				</div>
			</div>
		</div>
	)
}
