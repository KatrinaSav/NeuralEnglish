import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCollections } from '../store/CollectionReducer'
import SidePannelCollection from './SidePannelCollection'
import ModsPannel from './ModsPannel'

const AccountModule = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user.userId)
  const curr_collection = useSelector((state) => state.currentCollection.name);
  console.log("curr", curr_collection)
  useEffect(() => {
    dispatch(getCollections(user))
    
  },  [])

  return (
    <div>
      <div className="readingPage">
        <div className="side">
          <SidePannelCollection />
        </div>
        <div className="cards">
          <>Cards:{curr_collection}</>
        </div>
        <div className="mods">
          <ModsPannel />
        </div>
      </div>
    </div>
  )
}

export default AccountModule
