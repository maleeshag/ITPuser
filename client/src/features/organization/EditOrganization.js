import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectOrganizationById } from './organizationApiSlice'
import { selectAllUsers } from '../users/userApiSlice'
import EditOrganizationForm from './EditOrganizationForm'

const EditOrganization = () => {
    const { id } = useParams()

    const organization = useSelector(state => selectOrganizationById(state, id))
    const users = useSelector(selectAllUsers)

    const content = organization && users ? <EditOrganizationForm organization={organization} users={users} /> : <p>Loading...</p>

    return content
}
export default EditOrganization