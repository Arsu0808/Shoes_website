import { useContext } from 'react'
import { SessionContext } from '../context/SessionContext.jsx'

export const useSession = () => useContext(SessionContext)

