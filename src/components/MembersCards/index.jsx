import { Member } from "../Member"

export const MembersCards = ({ members = [] }) => {
    return (
        <section className="container-cardsMembers">
            {members.map(member => (
                <Member key={member.id}
                photo={member.photo}
                name={member.name}
                job={member.job}
                insta={member.insta}
                color={member.color}
                />
            ))}
        </section>
    )
}