<template>
    <v-container>
        <v-row>
            <v-col cols="12">
                <p class="text-h3 text-lg-h1 text-md-h3">F1 Results</p>
            </v-col>
        </v-row>
        <v-row justify="center">
            <v-col cols="12">
                <p class="text-justify text-body-1">F1 Results permite a você acompanhar os resultados das corridas da temporada corrida por corrida, vendo como o campeonato se desenvolveu até o resultado final.</p>

                <v-timeline
                    dense
                >
                    <v-timeline-item
                        small
                        color="red"
                    >
                    <v-card>
                        <v-card-text>
                            Selecione uma temporada para acompanhar
                        </v-card-text>
                    </v-card>
                    </v-timeline-item>

                    <v-timeline-item
                        small
                        color="red"
                    >
                    <v-card>
                        <v-card-text>
                            O resultado da qualificação e da corrida serão exibidos
                        </v-card-text>
                    </v-card>
                    </v-timeline-item>

                    <v-timeline-item
                        small
                        color="red"
                    >
                    <v-card>
                        <v-card-text>
                            A última tabela representa mostra a pontuação dos pilotos no campeonato após a corrida.
                        </v-card-text>
                    </v-card>
                    </v-timeline-item>
                </v-timeline>

                <v-divider class="my-5"></v-divider>
                
                <p  class="text-right font-weight-black text-h4">Você sabia?</p>

                <p class="text-right text-body-1 text--secondary">A temporada de 2007 foi uma das mais disputadas. O campeão da temporada chegou na rodada final em terceiro lugar no campeonato.</p>

                <p class="text-right text-body-1 text--secondary">Em 2010 o campeão chegou a rodada final em segundo lugar, bem atrás do líder. Tudo resolvido na última corrida.</p>

                <v-divider class="my-5"></v-divider>

                <p class="text-justify text-body-1">Esses detalhes não são vistos quando você olha o resultado final de um campeonato. Mas são percebidos quando você olha cada corrida individualmente, quando você observa como o campeonato se desenhou.</p>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
    name: "HowToUse"
}
</script>