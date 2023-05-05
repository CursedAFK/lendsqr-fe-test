import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
import styles from './Pagination.module.scss'

interface Props {
	pageLists: number[]
	activePage: number
	changePage: (page: number) => void
}

const Pagination = ({ pageLists, activePage, changePage }: Props) => {
	const activePageList =
		activePage > pageLists.length - 3
			? pageLists.slice(activePage - 3, pageLists.length - 2)
			: activePage < 3
			? pageLists.slice(0, 3)
			: pageLists.slice(activePage - 2, activePage + 1)

	return (
		<>
			<form className={styles.paginatedForm}>
				<label>Showing</label>
				<select
					value={activePage * 10}
					onChange={e => {
						if (pageLists.length === 1) return
						changePage(Number(e.target.value) / 10)
					}}
				>
					{pageLists.map(pageNumber => (
						<option
							value={pageNumber * 10}
							key={pageNumber}
							hidden={pageLists.length === 1}
						>
							{pageLists.length === 1 ? pageNumber : pageNumber * 10}
						</option>
					))}
				</select>
				<label>out of {pageLists.length * 10}</label>
			</form>

			<ul className={styles.paginatedLists}>
				<li>
					<button
						disabled={activePage === 1}
						onClick={() => changePage(activePage - 1)}
					>
						<IoIosArrowBack />
					</button>
				</li>
				{pageLists.length > 5 ? (
					<>
						{activePageList.map(pageNumber => (
							<li
								key={pageNumber}
								className={pageNumber === activePage ? styles.active : ''}
								onClick={() => changePage(pageNumber)}
							>
								{pageNumber}
							</li>
						))}
						<li>...</li>
						<li
							className={
								pageLists[pageLists.length - 2] === activePage
									? styles.active
									: ''
							}
							onClick={() => changePage(pageLists[pageLists.length - 2])}
						>
							{pageLists[pageLists.length - 2]}
						</li>
						<li
							className={
								pageLists[pageLists.length - 1] === activePage
									? styles.active
									: ''
							}
							onClick={() => changePage(pageLists[pageLists.length - 1])}
						>
							{pageLists[pageLists.length - 1]}
						</li>
					</>
				) : (
					pageLists.map(pageNumber => (
						<li
							key={pageNumber}
							className={pageNumber === activePage ? styles.active : ''}
							onClick={() => changePage(pageNumber)}
						>
							{pageNumber}
						</li>
					))
				)}
				<li>
					<button
						disabled={activePage === pageLists.length}
						onClick={() => changePage(activePage + 1)}
					>
						<IoIosArrowForward />
					</button>
				</li>
			</ul>
		</>
	)
}

export default Pagination
