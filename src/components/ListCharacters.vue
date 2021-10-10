
<template>
    <section>
        <div class="characters">
            <div class="characters__item" v-for="character in characters" :key="character.id"> 
                <CardCharacter :character="character"/>
            </div>
        </div>
    </section>
</template>

<script>
//v-for para recorrer cada uno de los personaje y key llave primaria de cada caracter
//CardCharacter :character="character" --> 2ndo character viene del v-for, para que lo haga en todos los personages y 1r character es el nombre que le hemos aasignado en las props


import {onMounted, computed} from 'vue'
import {useStore} from 'vuex'

import CardCharacter from '@/components/CardCharacter'
export default {
    components:{
        CardCharacter
    },
    setup(){
        const store = useStore()
        const characters = computed(()=>{
            return store.state.charactersFilter
        })
        onMounted(()=>{
            store.dispatch('getCharacters') //store.dispaatch para acceder a las actions, si quisiera acceder a los staates store.state
            })
        
        return {
            characters
        }

    }
}
</script>

<style lang="scss">
.characters {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 3rem;
  margin: 3rem 0;
}

</style>