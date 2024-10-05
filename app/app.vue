<script setup lang="ts">
const categories = ref<string[]>([]);
const movies = ref<Movie[]>([]);
const trailers = ref<Trailer[]>([]);

const { data } = await useFetch<ApiResponse>('/api/movies');

if (data.value) {
  categories.value = data.value.categories;
  movies.value = data.value.movies;
  trailers.value = data.value.trailers;
}
</script>

<template>
  <Container>
    <Card>
      <div class="flex flex-col justify-center gap-6">
        <!-- Input and Categories Section -->
        <div class="flex gap-6">
          <div class="w-1/4 flex">
            <Input />
          </div>
          <div class="w-3/4 flex flex-col">
            <div class="flex justify-between items-center">
              <div class="flex items-center justify-center gap-3">
                <Button v-for="(category, index) in categories" :key="index">
                  <div class="px-1.5">{{ category }}</div>
                </Button>
              </div>
              <div class="flex items-center justify-center gap-3">
                <Button>
                  <Icon name="iconamoon:notification-light" size="24px" />
                  <div class="absolute top-0 right-0.5">
                    <span class="flex h-2.5 w-2.5">
                      <span class="inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400"></span>
                    </span>
                  </div>
                </Button>
                <Button>
                  <div class="flex gap-2">
                    <img alt="Avatar" class="w-6 h-6 rounded-full bg-white/30" src="https://avatars.githubusercontent.com/u/79358543?v=4" />
                    <div class="pr-1">Sefa Bulak</div>
                  </div>
                </Button>
              </div>
            </div>
          </div>
        </div>

        <!-- Movie Display Section -->
        <div class="flex gap-6">
          <div class="w-1/4">
            <ContentBox>
              <div class="flex flex-col w-full h-[34rem] px-6 pt-6 gap-5">
                <div class="justify-between flex">
                  <div class="text-lg font-medium">🔥 New Trailer</div>
                  <div class="flex">
                    <div>Sort:</div>
                    <div>Today</div>
                  </div>
                </div>
                <div class="overflow-auto flex flex-col gap-4 pb-6">
                  <div v-for="(trailer, index) in trailers" :key="index">
                    <div class="bg-cover w-full h-48 rounded-2xl flex bg-center items-end overflow-hidden" :style="{ backgroundImage: `url(${trailer.backgroundImage})` }">
                      <div class="py-3 px-4 backdrop-blur-3xl justify-center items-center flex">{{ trailer.title }}</div>
                    </div>
                  </div>
                </div>
              </div>
            </ContentBox>
          </div>
          <div class="w-3/4">
            <div
              v-for="(movie, index) in movies"
              :key="index"
              class="bg-cover bg-center w-full h-[34rem] rounded-3xl relative overflow-hidden shadow-lg"
              :style="{ backgroundImage: `url(${movie.backgroundImage})` }">
              <GradientBackdrop />
              <div class="flex p-6 justify-between h-full">
                <div class="items-start flex flex-col justify-between w-3/5 z-50">
                  <Chip v-if="movie.trending">🔥 Now Trending</Chip>
                  <div class="gap-6 flex-col flex">
                    <div class="flex flex-row gap-2">
                      <Chip v-for="(genre, i) in movie.genres" :key="i">{{ genre }}</Chip>
                    </div>
                    <div class="flex flex-col gap-2 ml-1">
                      <div class="text-4xl font-medium">{{ movie.title }}</div>
                      <div class="text-neutral-400">{{ movie.description }}</div>
                    </div>
                    <div class="flex items-center">
                      <Button>
                        <div class="px-1 py-0.5 flex items-center justify-center">
                          <Icon name="iconamoon:player-play-fill" size="30px" />
                          <div class="px-1.5 font-medium text-lg text">Watch</div>
                        </div>
                      </Button>
                    </div>
                  </div>
                </div>
                <div class="flex items-end z-50 gap-3">
                  <Button>
                    <div class="flex items-center justify-center p-0.5">
                      <Icon name="iconamoon:arrow-left-2" size="30px" />
                    </div>
                  </Button>
                  <Button>
                    <div class="flex items-center justify-center p-0.5">
                      <Icon name="iconamoon:arrow-right-2" size="30px" />
                    </div>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  </Container>
</template>

<style lang="postcss">
::-webkit-scrollbar {
  @apply w-0 h-0 bg-transparent;
}
::-webkit-scrollbar-track {
  @apply bg-transparent;
}
::-webkit-scrollbar-thumb {
  @apply bg-black/15 dark:bg-white/15 rounded-full border-solid border-white dark:border-black;
  border-width: 5px;
}
</style>
