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
                url={member.url}
                color={member.color}
                backgroundPhoto={member.backgroundPhoto}
                />
            ))}
        </section>
    )
}