<template>
  <Container>
    <Card>
      <div class="flex flex-col justify-center gap-6">
        <div class="flex gap-6">
          <div class="w-1/4 flex">
            <Input />
          </div>
          <div class="w-3/4 flex flex-col">
            <div class="flex justify-between items-center">
              <div class="flex items-center justify-center gap-3">
                <Button><div class="px-1.5">Movies</div></Button>
                <Button><div class="px-1.5">TV Series</div></Button>
                <Button><div class="px-1.5">Animation</div></Button>
                <Button><div class="px-1.5">Mistery</div></Button>
                <Button><div class="px-1.5">Documentary</div></Button>
                <Button><div class="px-1.5">Comedy</div></Button>
                <Button><div class="px-1.5">Horror</div></Button>
                <Button><div class="px-1.5">Thriller</div></Button>
                <Button><div class="px-1.5">More</div></Button>
              </div>
              <div class="flex items-center justify-center gap-3">
                <Button>
                  <Icon name="iconamoon:notification-light" size="24px" />
                  <div class="absolute top-0 right-0.5">
                    <span class="flex h-2.5 w-2.5">
                      <span class="inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
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

        <div class="flex gap-6">
          <div class="w-1/4">
            <ContentBox></ContentBox>
          </div>
          <div class="w-3/4">
            <div
              class="bg-cover bg-center w-full h-[34rem] rounded-3xl"
              style="background-image: url(https://m.media-amazon.com/images/M/MV5BNTYxOTYyMzE3NV5BMl5BanBnXkFtZTcwOTMxNDY3Mw@@._V1_.jpg)"></div>
          </div>
        </div>
      </div>
    </Card>
  </Container>
</template>
