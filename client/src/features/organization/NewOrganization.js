import { useSelector } from 'react-redux'
import { selectAllOrganizations } from '../organization/organization'
import NewOrganizationForm from './NewOrganizationForm'

const NewOrganization = () => {
    const organizations = useSelector(selectAllOrganizations)

    const content = organizations ? <NewOrganizationForm users={users} /> : <p>Loading...</p>

    return content
}
export default NewOrganization