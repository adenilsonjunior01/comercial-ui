<template>
    <section>
        <v-toolbar class="blue-grey lighten-5" >
            <v-container grid-list-md>
                <v-layout row wrap>
                    <v-flex xs12>
                        <v-toolbar-title class="text-uppercase text-xs-center">
                            <span class="font-weight-regular grey--text text--darken-2">Comercial</span>
                            <strong class="">Jobs!</strong>
                        </v-toolbar-title>
                    </v-flex>
                    <v-flex  offset-xs3>
                        <FormCadastro/>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-toolbar>
    </section>
</template>

<script>
import Listing from '@/components/Listing'
import FormCadastro from '@/components/FormCadastro'

export default {
    components: { FormCadastro },
    
}
</script>

<style>

</style>
