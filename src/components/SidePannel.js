import { useDispatch, useSelector } from 'react-redux'

const SidePannel = () => {
  const dispatch = useDispatch()
  const articles = useSelector((state) => state.articles.articles)
  console.log('articles', articles)
  let column = []
  for (let a of articles) {
    column.push(
      <button
        key={a.id}
        onClick={() => {
          console.log(a.id)
        }}
      >
        {a.name}
      </button>
    )
  }
  return <>{column}</>
}

export default SidePannel
