import {createStore} from 'vuex'

export default createStore({
    state:{ 
        characters: [],
        charactersFilter:[]

    },
    //las mutaciones modifican al state
    mutations:{
        //para introducir el payload en el state que se nos da
        setCharacters(state,payload){
            state.characters = payload
        },
        setCharactersFilter(state,payload){
            state.charactersFilter = payload
        },
    },
    //las mutaciones usan las actions para modificar el state
    actions:{
        async getCharacters({commit}){
            try{
                const response = await fetch('https://rickandmortyapi.com/api/character') //como haremos la peticion get no haace falta especificar el metodo
                const data = await response.json()
                commit('setCharacters',data.results)
                commit('setCharactersFilter',data.results)
                console.log(data)
            }
            catch (error){
                console.error(error)
            }
        },
        filterByStatus({commit,state},status){
            const results = state.characters.filter((character) => { //vamos a recorrer todos los personajes de characters
                return character.status.includes(status) //retorna todos los caracteres con el status introducido por parametro
            })
            commit('setCharactersFilter',results)
        },
        filterByName({commit,state},name){
            const formatName = name.toLowerCase() //pasamos a minuscula el nombre que le pasamos nosotros
            const results = state.characters.filter((character)=>{
                const characterName = character.name.toLowerCase() //ponemos a minuscula todos los nombres

                if(characterName.includes(formatName)){
                    return character
                }
            })
            commit('setCharactersFilter',results)
        }
    },
    modules:{

    }

})