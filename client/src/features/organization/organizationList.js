import { useGetOrganizationsQuery } from "./organizationApiSlice"
import Organization from './organization'

const OrganizationsList = () => {

    const {
        data: organizations,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetOrganizationsQuery(undefined, {
        pollingInterval: 60000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    })

    let content

    if (isLoading) content = <p>Loading...</p>

    if (isError) {
        content = <p className="errmsg">{error?.data?.message}</p>
    }

    if (isSuccess) {

        const { ids } = organizations

        const tableContent = ids?.length
            ? ids.map(orgId => <Organization key={orgId} organizationId={orgId} />)
            : null

        content = (
            <table className="table table--organizations">
                <thead className="table__thead">
                    <tr>
                        <th scope="col" className="table__th organization__organizationname">Organization Name</th>
                        <th scope="col" className="table__th organization__email">Email</th>
                        <th scope="col" className="table__th organization__date">Date</th>
                        <th scope="col" className="table__th organization__edit">Edit</th>
                    </tr>
                </thead>
                <tbody>
                    {tableContent}
                </tbody>
            </table>
        )
    }

    return content
}
export default OrganizationsList