<template>
  <v-container>
    <header class="mb-16">
      <h1>F1 Results</h1>
    </header>

    <section>
      <p>F1 Results permite a você acompanhar os resultados das corridas da temporada corrida por corrida, vendo como o campeonato se desenvolveu até o resultado final.</p>

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
    </section>

    <section>
      <v-divider class="my-16"></v-divider>
        
      <p>Você sabia?</p>

      <ul>
        <li class="my-8">A temporada de 2007 foi uma das mais disputadas. O campeão da temporada chegou na rodada final em terceiro lugar no campeonato.</li>
        <li class="my-8">Em 2010 o campeão chegou a rodada final em segundo lugar, bem atrás do líder. Tudo resolvido na última corrida.</li>
      </ul>

      <v-divider class="my-16"></v-divider>

      <p>Esses detalhes não são vistos quando você olha o resultado final de um campeonato. Mas são percebidos quando você olha cada corrida individualmente, quando você observa como o campeonato se desenhou.</p>
    </section>
  </v-container>
</template>

<script>
export default {
  name: "HowToUse"
}
</script>