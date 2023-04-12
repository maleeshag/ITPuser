import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from 'react-router-dom'

import { useSelector } from 'react-redux'
import { selectOrganizationById } from './organizationApiSlice'

const Organization = ({ orgId }) => {
    const Organization = useSelector(state => selectOrganizationById(state, orgId))

    const navigate = useNavigate()

    if (Organization) {

        const created = new Date(Organization.createAt).toLocaleString('en-SL', { day: 'numeric', month: 'long' })

        const handleEdit = () => navigate(`/dash/organizations/${orgId}`)

        // const OrganizationRolesString = Organization.roles.toString().replaceAll(',', ', ')

        const cellStatus = Organization.active ? '' : 'table__cell--inactive'

        return (
            <tr className="table__row Organization">
                <td className={`table__cell ${cellStatus}`}>{Organization.orgname}</td>
                <td className={`table__cell ${cellStatus}`}>{Organization.email}</td>
                <td className="table__cell note__created">{created}</td>
                <td className={`table__cell ${cellStatus}`}>
                    <button
                        className="icon-button table__button"
                        onClick={handleEdit}
                    >
                        <FontAwesomeIcon icon={faPenToSquare} />
                    </button>
                </td>
            </tr>
        )

    } else return null
}
export default Organization