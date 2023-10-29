const LOAD_JOURNALS = 'JOURNALS/GET_JOURNALS'
const CREATE_JOURNAL = 'JOURNALS/CREATE_JOURNAL'
const UPDATE_JOURNAL = 'JOURNALS/UPDATE_JOURNAL'
const DELETE_JOURNAL = 'JOURNALS/DELETE_JOURNAL'
const UNLOAD_JOURNALS = 'ACCOMPLISHMENTS/UNLOAD_JOURNAL'


const getJournals = (journal) => ({
    type: LOAD_JOURNALS,
    journal
});

const createJournal = (journal) => ({
    type: CREATE_JOURNAL,
    journal
})

const editJournal = (journal) => ({
    type: UPDATE_JOURNAL,
    journal
})

const deleteJournal = (journal) => ({
    type: DELETE_JOURNAL,
    journal

})

const unloadJournals = ()=>({
    type: UNLOAD_JOURNALS
})

export const unload_journals = () => async(dispatch)=>{
    dispatch(unloadJournals())
}

export const get_journals= (id) => async (dispatch) => {
    const response = await fetch(`/api/journals/${id}`);
    const data = await response.json()
    console.log(data)
    dispatch(getJournals(data));

}

export const create_journals = (
    firstname="",
    lastname="",
    highest_degree="",
    publications=[],
    awards=[]
       ) => async (dispatch) => {
    const response = await fetch(`/api/journals/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "firstname": firstname,
            "lastname": lastname,
            "highest_degree": highest_degree,
            "publications": publications,
            "awards": awards,


        })
    });

    if (response.ok) {
        const data = await response.json();
        console.log(data)
        dispatch(createJournal(data))
        return data;
    } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
            return data.errors;
        }
    } else {
        return ['An error occurred. Please try again.']
    }

}

export const update_journals = (
    id,
    firstname,
    lastname,
    highest_degree,
    publications,
    awards,

    ) => async (dispatch) => {
    const response = await fetch(`/api/journals/${id}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "firstname": firstname,
            "lastname": lastname,
            "highest_degree": highest_degree,
            "publications": publications,
            "awards": awards,

        })
    });

    const data = await response.json()


    dispatch(editJournal(data));


};


export const delete_journal = (journalId) => async (dispatch) => {

    const response = await fetch(`/api/journals/${journalId}`, {
        method: 'delete',
        headers: {
            'Content-Type': 'application/json'
        },

    });

    const data = await response.json()

    dispatch(deleteJournal(Number(data)));
}






let initialState = {};
export default function reducer(state = initialState, action) {
    switch (action.type) {
        case LOAD_JOURNALS:


            return {...state, ...action.journal}
        case CREATE_JOURNAL:

            state.list.push(action.journal)
            return {...state}
        case UPDATE_JOURNAL:
            let newstate = action.journal

            return newstate
        case DELETE_JOURNAL:

            return state.list.filter(journal=>(
                journal.id !== action.journal

            ))
        case UNLOAD_JOURNALS:

            return initialState


        default:
            return state;
    }
}
