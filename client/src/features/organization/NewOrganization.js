import { useSelector } from 'react-redux'
import { selectAllUsers } from '../users/userApiSlice'
import NewOrganizationForm from './NewOrganizationForm'

const NewOrganization = () => {
    const users = useSelector(selectAllUsers)

    if (!users?.length) return <p>Not Currently Available</p>


    const content = <NewOrganizationForm users={users} />

    return content
}
export default NewOrganization