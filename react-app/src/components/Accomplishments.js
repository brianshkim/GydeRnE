import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { create_accomplishment } from '../store/accomplishments'

const Accomplishments = () => {
    const dispatch = useDispatch()
    const accomplishments = useSelector(state => state.accomplishments)
    const user = useSelector(state => state.session.user)
    const [bio, setBio] = useState('')

    const [publications, setPublications] = useState([
        {
            title: "",
            authors: [""],
            url: "",
            year: "",

        }
    ])

    const [awards, setAwards] = useState([
        {
            year: "",
            title: "",
            association: "",
        }
    ])


    const onSubmit = async (e) => {
        e.preventDefault()
        await dispatch(create_accomplishment(bio, publications, awards))

    }

    const handleFormChange = (i, e, property, secondindex) => {


        if (property === "publications") {
            let data = [...publications]
            data[i][e.target.name] = e.target.value
            setPublications(data)
        }

        if (property === "awards") {
            let data = [...awards]
            data[i][e.target.name] = e.target.value
            setAwards(data)
        }

        if (property === "author") {
            let data = publications[i].authors
            data[secondindex] = e.target.value
            let newpublications = [...publications]
            newpublications[i].authors = data
            setPublications(newpublications)
        }


    }

    const addFields = (e, property) => {
        if (property === "publications") {
            let newfield = { title: '', authors: [''], url: "", year:"" }
            setPublications([...publications, newfield])
        }
        if (property === "awards") {
            let newfield = { year:"", title:"", association:"" }
            setAwards([...awards, newfield])
        }


    }

    const addAuthor = (e, i, authorindex) => {
        e.preventDefault()
        let newauthors = [...publications[i].authors, ""]
        let newpublication = {
            title: publications[i].title,
            authors: newauthors,
            association: publications[i].association
        }
        let newpublications = [...publications]
        newpublications[i] = newpublication
        setPublications(newpublications)

    }


    return (
        <div>
            Create Accomplishments Form
            <div>
                <form>
                    <input
                        type="text"
                        value={bio}
                        onChange={e => setBio(e.target.value)}
                    />
                    <h3>Publications</h3>
                    <div>{publications.map((publication, index) => {
                        return (
                            <div key={`p${index}`}>
                                <input
                                    name="title"
                                    placeholder="Title"
                                    value={publication.title}
                                    onChange={(e) => handleFormChange(index, e, "publications")}
                                />


                                {publication.authors.map((author, authorindex) => {
                                    return (
                                        <>

                                            <input
                                                name="author"
                                                placeholder="author"
                                                value={publications[index].authors[authorindex]}
                                                onChange={(e) => handleFormChange(index, e, "author", authorindex)}
                                            />
                                            {authorindex === publication.authors.length - 1 ? <button onClick={(e) => addAuthor(e, index, authorindex)} >Add Author</button> : null}
                                        </>
                                    )
                                })
                                }
                                <input
                                    name="url"
                                    placeholder="Url"
                                    value={publication.url}
                                    onChange={(e) => handleFormChange(index, e, "publications")}
                                />

                            </div>
                        )
                    })}
                    </div>

                </form>
                <button onClick={e => addFields(e, "publications")}>Add more</button>
                <form>
                    {awards.map((input, index) => {
                        return (
                            <div key={`a${index}`}>
                                <input
                                    name="year"
                                    placeholder="Year"
                                    value={input.year}
                                    onChange={(e) => handleFormChange(index, e, "awards")}
                                />
                                <input
                                    name="title"
                                    placeholder="Title"
                                    value={input.title}
                                    onChange={(e) => handleFormChange(index, e, "awards")}

                                />
                                <input
                                    name="association"
                                    placeholder="Association/Institute"
                                    value={input.association}
                                    onChange={(e) => handleFormChange(index, e, "awards")}
                                />
                            </div>

                        )
                    })}
                </form>
                <button onClick={e => addFields(e, "awards")}>Add more</button>
            </div>
            <button onClick={onSubmit}>Submit</button>
        </div>





    )
}

export default Accomplishments
